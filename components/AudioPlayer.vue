<template>
  <v-card
    class="player glass"
    min-width="600"
    max-width="600"
  >
    <v-toolbar
      class="toolbar"
      color="transparent"
      height="44"
    >
      <template #append>
        <v-btn
          rounded
          size="24"
          color="#85553D"
          @click="fullTranscription = !fullTranscription"
        >
          <v-icon size="16">
            {{ fullTranscription ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
          </v-icon>
        </v-btn>
        <v-btn
          size="24"
          icon="mdi-close"
          color="#85553D"
          @click="emit('close')"
        >
          <v-icon size="16">
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <v-card-text
      v-if="fullTranscription"
      class="subtitles full"
    >
      <div
        v-for="({ text }, index) in props.sound.transcription"
        :key="index"
      >
        {{ text }}
      </div>
    </v-card-text>
    <v-card-text
      v-else-if="subtitles"
      class="subtitles"
    >
      <div class="previous">
        {{ subtitles.previous }}
      </div>
      <div class="current">
        {{ subtitles.current }}
      </div>
      <div class="next">
        {{ subtitles.next }}
      </div>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-container class="controls-container">
        <v-slider
          v-model="seek"
          min="0"
          max="1"
          color="#85553D"
          track-size="4"
          thumb-size="12"
          elevation="0"
          :hide-details="true"
          @update:model-value="player.seek(player.duration() * seek)"
        />
        <v-row class="d-flex align-center justify-center">
          <v-col class="sound-name">
            {{ props.sound.name || '' }}
          </v-col>
          <v-col>
            <v-btn
              rounded
              :size="CONTROLS_SIZE"
              @click="rewind(-0.5)"
            >
              <Rewind15Icon :color="CONTROLS_COLOR" />
            </v-btn>
            <v-btn
              v-if="playing"
              rounded
              :size="CONTROLS_SIZE"
              @click="player.pause()"
            >
              <PauseIcon :color="CONTROLS_COLOR" />
            </v-btn>
            <v-btn
              v-else
              rounded
              :size="CONTROLS_SIZE"
              @click="player.play()"
            >
              <PlayIcon :color="CONTROLS_COLOR" />
            </v-btn>
            <v-btn
              rounded
              :size="CONTROLS_SIZE"
              @click="rewind(0.5)"
            >
              <FastForward15Icon :color="CONTROLS_COLOR" />
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-btn
              rounded
              size="24"
              color="#85553D"
              @click="mute(!muted)"
            >
              <v-icon
                size="20"
                :icon="volumeIcon"
              />
            </v-btn>
            <v-slider
              v-model="volume"
              class="volume-slider"
              min="0"
              max="1"
              color="#85553D"
              track-color="#85553D"
              track-fill-color="#85553D"
              track-size="3"
              thumb-size="8"
              elevation="0"
              :hide-details="true"
              @update:model-value="player.volume(volume)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Howl } from 'howler'
import type { PropType } from 'vue'

const CONTROLS_COLOR = '#85553D'
const CONTROLS_SIZE = 48

interface ISubtitles {
  previous: string
  current: string
  next: string
}

const props = defineProps({
  sound: { type: Object as PropType<ISound>, required: true }
})

const emit = defineEmits(['play', 'pause', 'stop', 'end', 'close'])

const playing = ref(false)
const muted = ref(false)
const seek = ref(0)
const volume = ref(1)
const subtitles = ref<ISubtitles | undefined>()
const fullTranscription = ref(false)

let seekInterval: ReturnType<typeof setInterval>
let player: Howl

function setRecording(src: string) {
  let volume = 1
  if (player) {
    volume = player.volume()
    player.unload()
  }

  player = new Howl({
    src: [src],
    volume: volume,
    mute: muted.value
  })

  player.on('play', () => {
    playing.value = true
    seekInterval = setInterval(onSeekInterval, 100)
    emit('play')
  })

  player.on('end', () => {
    playing.value = false
    seek.value = 0
    updateSubtitles()
    clearInterval(seekInterval)
    emit('end')
  })

  player.on('pause', () => {
    playing.value = false
    clearInterval(seekInterval)
    emit('pause')
  })

  player.on('stop', () => {
    playing.value = false
    seek.value = 0
    updateSubtitles()
    clearInterval(seekInterval)
    emit('stop')
  })

  player.on('mute', () => {
    muted.value = player.mute()
  })

  player.on('seek', () => {
    updateSubtitles()
  })

  player.play()
}

function mute(mute: boolean) {
  if (mute) {
    player.mute(true)
    volume.value = 0
  }
  else {
    player.mute(false)
    volume.value = player.volume()
  }
}

const volumeIcon = computed(() => {
  if (muted.value) {
    return 'mdi-volume-off'
  }
  if (volume.value < 0.2) {
    return 'mdi-volume-low'
  }
  return 'mdi-volume-high'
})

function rewind(seconds: number) {
  const seek = player.seek() + seconds
  if (seek < 0) {
    player.seek(0)
    return
  }
  if (seek > player.duration()) {
    player.seek(player.duration())
    return
  }
  player.seek(seek)
}

function onSeekInterval() {
  seek.value = player.seek() / player.duration()
  updateSubtitles()
}

function updateSubtitles() {
  const { transcription } = props.sound
  transcription.find(({ start, end, text }, index) => {
    if (player.seek() >= start && player.seek() <= end) {
      subtitles.value = {
        previous: index >= 1 ? transcription[index - 1]?.text : '',
        current: text,
        next: index < transcription.length ? transcription[index + 1]?.text : ''
      }
      return true
    }
  })
}

watch(() => props.sound, (sound) => {
  setRecording(sound.src)
})

onMounted(() => {
  setRecording(props.sound.src)
})

onUnmounted(() => {
  player.unload()
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.glass {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.player {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 20px;
  width: 600px;

  .toolbar {
    padding: 0 12px;
  }

  .controls-container {
    padding: 16px 12px 12px;
  }

  .sound-name {
    text-transform: uppercase;
    color: $redsquirrel-chocolate;
    font-weight: 600;
    font-size: 15px;
  }

  .volume-slider {
    padding-left: 10px;
  }

  .subtitles {
    padding: 0 20px;
    font-size: 15px;
    line-height: 20px;
    color: $redsquirrel-chocolate-m1;

    .current {
      color: $redsquirrel-chocolate;
    }

    &.full {
      font-size: 15px;
      line-height: 20px;
      color: $redsquirrel-chocolate;
    }
  }
}
</style>
