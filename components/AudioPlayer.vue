<template>
  <GlassSheet
    class="player"
    border="1vw"
    :fill="0.5"
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
          color="#C38D72"
          @click="fullTranscription = !fullTranscription"
        >
          <v-icon size="19">
            {{ fullTranscription ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
          </v-icon>
        </v-btn>
        <v-btn
          size="24"
          icon="mdi-close"
          color="#C38D72"
          @click="emit('close')"
        >
          <v-icon size="19">
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <v-skeleton-loader
      type="text@3"
      :loading="loading"
    >
      <v-card-text
        v-if="fullTranscription"
        class="subtitles full"
      >
        <div
          v-for="({ text }, index) in subtitles"
          :key="index"
        >
          {{ text }}
        </div>
      </v-card-text>
      <v-card-text
        v-else-if="currentSubtitleFrame"
        class="subtitles"
      >
        <div class="previous">
          {{ currentSubtitleFrame.previous }}
        </div>
        <div class="current">
          {{ currentSubtitleFrame.current }}
        </div>
        <div class="next">
          {{ currentSubtitleFrame.next }}
        </div>
      </v-card-text>
    </v-skeleton-loader>
    <v-card-actions class="pt-0">
      <v-container class="controls-container">
        <v-slider
          v-model="seek"
          min="0"
          max="1"
          color="#85553D"
          track-size="5"
          thumb-size="12"
          elevation="0"
          :hide-details="true"
          :disabled="loading"
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
              :disabled="loading"
              @click="rewind(-0.5)"
            >
              <Rewind15Icon :color="CONTROLS_COLOR" />
            </v-btn>
            <v-btn
              v-if="playing"
              rounded
              :size="CONTROLS_SIZE"
              :disabled="loading"
              @click="player.pause()"
            >
              <PauseBoxFilledIcon :color="CONTROLS_COLOR" />
            </v-btn>
            <v-btn
              v-else
              rounded
              :size="CONTROLS_SIZE"
              :disabled="loading"
              @click="player.play()"
            >
              <PlayBoxFilledIcon :color="CONTROLS_COLOR" />
            </v-btn>
            <v-btn
              rounded
              :size="CONTROLS_SIZE"
              :disabled="loading"
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
              :disabled="loading"
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
              :disabled="loading"
              @update:model-value="player.volume(volume)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </GlassSheet>
</template>

<script setup lang="ts">
import { Howl } from 'howler'
import type { PropType } from 'vue'
import SrtParser2 from 'srt-parser-2'

const CONTROLS_COLOR = '#85553D'
const CONTROLS_SIZE = 48

interface ISubtitleFrame {
  previous: string
  current: string
  next: string
}

interface ISubtitleItem {
  startSeconds: number
  endSeconds: number
  text: string
}

const props = defineProps({
  sound: { type: Object as PropType<ISound>, required: true }
})

const emit = defineEmits(['play', 'pause', 'stop', 'end', 'close'])

const loading = ref(false)
const playing = ref(false)
const muted = ref(false)
const seek = ref(0)
const volume = ref(1)
const subtitles = ref<ISubtitleItem[] | undefined>()
const currentSubtitleFrame = ref<ISubtitleFrame | undefined>()
const fullTranscription = ref(false)

let seekInterval: ReturnType<typeof setInterval>
let player: Howl

async function setRecording(audioSrc: string, subtitlesSrc: string, volume: number) {
  loading.value = true

  const [loadedPlayer, loadedSubtitles] = await Promise.all([
    loadPlayer(audioSrc),
    loadSubtitles(subtitlesSrc)
  ])

  subtitles.value = loadedSubtitles
  player = loadedPlayer
  registerPlayerCallbacks()
  player.volume(volume)
  player.mute(muted.value)

  loading.value = false

  player.play()
}

async function loadPlayer(audioSrc: string): Promise<Howl> {
  return new Promise((resolve) => {
    const howl = new Howl({
      src: [audioSrc]
    })
    const loadingInterval = setInterval(() => {
      if (howl.state() === 'loaded') {
        clearInterval(loadingInterval)
        return resolve(howl)
      }
    }, 50)
  })
}

function registerPlayerCallbacks() {
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
  const _subtitles = subtitles.value
  if (!_subtitles) return
  _subtitles.find(({ startSeconds, endSeconds, text }, index) => {
    if (player.seek() >= startSeconds && player.seek() <= endSeconds) {
      currentSubtitleFrame.value = {
        previous: index >= 1 ? _subtitles[index - 1]?.text : '',
        current: text,
        next: index < _subtitles.length ? _subtitles[index + 1]?.text : ''
      }
      return true
    }
  })
}

async function loadSubtitles(src: string): Promise<ISubtitleItem[]> {
  const srt = await (await fetch(src)).text()
  const parser = new SrtParser2()
  return parser.fromSrt(srt)
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

watch(() => props.sound, async (sound) => {
  let volume = 1
  if (player) {
    volume = player.volume()
    player.unload()
  }
  await setRecording(sound.src, sound.subtitlesSrc, volume)
})

onMounted(async () => {
  await setRecording(props.sound.src, props.sound.subtitlesSrc, 1)
})

onUnmounted(() => {
  player.fade(player.volume(), 0, 1000)
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.player {
  .toolbar {
    padding: 0 12px;
  }

  .controls-container {
    padding: 16px 12px 12px;
  }

  .sound-name {
    text-transform: uppercase;
    color: $redsquirrel-chocolate-m1;
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
