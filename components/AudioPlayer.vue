<template>
  <v-card
    class="player glass"
    min-width="600"
    max-width="600"
  >
    <v-toolbar color="transparent">
      <template #append>
        <v-btn
          color="#85553D"
          :icon="fullTranscription ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
          @click="fullTranscription = !fullTranscription"
        />
        <v-btn
          icon="mdi-close"
          color="#85553D"
          @click="emit('close')"
        />
      </template>
    </v-toolbar>
    <v-card-text v-if="fullTranscription">
      <div
        v-for="({ text }, index) in props.sound.transcription"
        :key="index"
      >
        {{ text }}
      </div>
    </v-card-text>
    <v-card-text v-else-if="subtitles">
      <div>{{ subtitles.previous }}</div>
      <div><b>{{ subtitles.current }}</b></div>
      <div>{{ subtitles.next }}</div>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-container>
        <v-slider
          v-model="seek"
          min="0"
          max="1"
          color="#85553D"
          track-size="4"
          thumb-size="12"
          elevation="0"
          @update:model-value="player.seek(player.duration() * seek)"
        />
        <v-row class="d-flex align-center justify-center">
          <v-col class="sound-name">
            {{ props.sound.name || '' }}
          </v-col>
          <v-col>
            <v-btn
              icon="mdi-rewind-15"
              color="#85553D"
              @click="rewind(-0.5)"
            />
            <v-btn
              v-if="playing"
              icon="mdi-pause-box"
              color="#85553D"
              @click="player.pause()"
            />
            <v-btn
              v-else
              icon="mdi-play-box"
              color="#85553D"
              @click="player.play()"
            />
            <v-btn
              icon="mdi-fast-forward-15"
              color="#85553D"
              @click="rewind(0.5)"
            />
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-btn
              v-if="muted"
              icon="mdi-volume-off"
              size="small"
              color="#85553D"
              @click="mute(false)"
            />
            <v-btn
              v-else-if="volume < 0.2"
              icon="mdi-volume-low"
              size="small"
              color="#85553D"
              @click="mute(true)"
            />
            <v-btn
              v-else
              icon="mdi-volume-high"
              size="small"
              color="#85553D"
              @click="mute(true)"
            />
            <v-slider
              v-model="volume"
              class="volume-slider"
              min="0"
              max="1"
              color="#85553D"
              track-color="#85553D"
              track-fill-color="#85553D"
              track-size="2"
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

  .sound-name {
    text-transform: uppercase;
    color: $redsquirrel-chocolate;
    font-weight: 600;
    font-size: 15px;
  }
}
</style>
