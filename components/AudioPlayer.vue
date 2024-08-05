<template>
  <GlassSheet
    :border="mdAndUp ? '1vw' : '0'"
    :class="showFullTranscription ? 'full-screen' : ''"
    :fill="0.5"
    class="player"
    plain
  >
    <v-toolbar
      class="toolbar"
      color="transparent"
      height="44"
    >
      <template #prepend>
        <div
          v-if="!mdAndUp"
          class="sound-name"
        >
          {{ props.sound.name || '' }}
        </div>
      </template>
      <template #append>
        <v-btn
          rounded
          color="#C38D72"
          :size="toolbarButtonsSize"
          @click="onFullButtonClick"
        >
          <v-icon :size="toolbarIconsSize">
            {{ showFullTranscription ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
          </v-icon>
        </v-btn>
        <v-btn
          icon="mdi-close"
          color="#C38D72"
          :size="toolbarButtonsSize"
          @click="emit('close')"
        >
          <v-icon :size="toolbarIconsSize">
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <v-skeleton-loader
      type="text@3"
      :loading="loading"
    >
      <Transition mode="out-in">
        <v-card-text
          v-if="showFullTranscription"
          class="subtitles full"
        >
          {{ fullTranscription }}
        </v-card-text>
        <v-card-text
          v-else-if="currentSubtitleFrame"
          class="subtitles"
        >
          <div
            v-if="mdAndUp"
            class="previous"
          >
            {{ currentSubtitleFrame.previous }}
          </div>
          <div class="current">
            {{ currentSubtitleFrame.current }}
          </div>
          <div
            v-if="mdAndUp"
            class="next"
          >
            {{ currentSubtitleFrame.next }}
          </div>
        </v-card-text>
      </Transition>
    </v-skeleton-loader>
    <v-card-actions class="pt-0">
      <v-container class="actions-container">
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
          <v-col
            v-if="mdAndUp"
            class="sound-name"
          >
            {{ props.sound.name || '' }}
          </v-col>
          <v-col class="controls">
            <v-btn
              rounded
              :size="controlsSize"
              :disabled="loading"
              @click="rewind(-15)"
            >
              <Rewind15Icon :color="CONTROLS_COLOR" />
            </v-btn>
            <v-btn
              v-if="playing"
              rounded
              :size="controlsSize"
              :disabled="loading"
              @click="player.pause()"
            >
              <PauseBoxFilledIcon :color="CONTROLS_COLOR" />
            </v-btn>
            <v-btn
              v-else
              rounded
              :size="controlsSize"
              :disabled="loading"
              @click="player.play()"
            >
              <PlayBoxFilledIcon :color="CONTROLS_COLOR" />
            </v-btn>
            <v-btn
              rounded
              :size="controlsSize"
              :disabled="loading"
              @click="rewind(15)"
            >
              <FastForward15Icon :color="CONTROLS_COLOR" />
            </v-btn>
          </v-col>
          <v-col
            v-if="mdAndUp"
            class="d-flex justify-center align-center"
          >
            <v-btn
              rounded
              class="mr-2"
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
import { useDisplay } from 'vuetify'

const CONTROLS_COLOR = '#85553D'
const controlsSize = computed(() => mdAndUp.value ? '48px' : '10vw')
const toolbarButtonsSize = computed(() => mdAndUp.value ? '24px' : '8vw')
const toolbarIconsSize = computed(() => mdAndUp.value ? '19px' : '6vw')

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

const model = defineModel<boolean>()

const props = defineProps({
  sound: { type: Object as PropType<ISound>, required: true }
})

const emit = defineEmits(['close'])
const { mdAndUp } = useDisplay()

const loading = ref(false)
const playing = ref(false)
const muted = ref(false)
const seek = ref(0)
const volume = ref(1)
const subtitles = ref<ISubtitleItem[] | undefined>()
const currentSubtitleFrame = ref<ISubtitleFrame | undefined>()
const showFullTranscription = ref(false)
const fullTranscription = computed(() => {
  return subtitles.value?.map(({ text }) => text).join(' ')
})

let seekInterval: ReturnType<typeof setInterval>
let player: Howl

function onFullButtonClick() {
  if (showFullTranscription.value) {
    if (document.documentElement.style.overflow === 'hidden') {
      document.documentElement.style.overflow = ''
    }
    showFullTranscription.value = false
  }
  else {
    if (!mdAndUp.value) {
      document.documentElement.style.overflow = 'hidden'
    }
    showFullTranscription.value = true
  }
}

async function setRecording(audioSrc: string, subtitlesSrc: string, volume: number) {
  loading.value = true
  subtitles.value = undefined
  currentSubtitleFrame.value = undefined

  const [loadedPlayer, loadedSubtitles] = await Promise.all([
    loadPlayer(audioSrc),
    loadSubtitles(subtitlesSrc)
  ])
  subtitles.value = loadedSubtitles
  player = loadedPlayer

  registerPlayerCallbacks(player)
  player.volume(volume)
  player.mute(muted.value)

  loading.value = false
  setInitialSubtitlesFrame()
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

async function loadSubtitles(src: string): Promise<ISubtitleItem[]> {
  const srt = await (await fetch(src)).text()
  const parser = new SrtParser2()
  return parser.fromSrt(srt)
}

function registerPlayerCallbacks(player: Howl) {
  player.on('play', () => {
    playing.value = true
    model.value = true
    seekInterval = setInterval(onSeekChange, 100)
  })

  player.on('end', () => {
    playing.value = false
    seek.value = 0
    model.value = false
    updateSubtitles()
    clearInterval(seekInterval)
  })

  player.on('pause', () => {
    playing.value = false
    model.value = false
    clearInterval(seekInterval)
  })

  player.on('stop', () => {
    playing.value = false
    model.value = false
    seek.value = 0
    updateSubtitles()
    clearInterval(seekInterval)
  })

  player.on('mute', () => {
    muted.value = player.mute()
  })

  player.on('seek', onSeekChange)
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

function onSeekChange() {
  seek.value = player.seek() / player.duration()
  updateSubtitles()
}

function setInitialSubtitlesFrame() {
  const currentSubtitles = subtitles.value
  if (!currentSubtitles || !currentSubtitles.length) return

  currentSubtitleFrame.value = {
    previous: '',
    current: currentSubtitles[0].text,
    next: currentSubtitles.length > 1 ? currentSubtitles[1].text : ''
  }
}

function updateSubtitles() {
  const currentSubtitles = subtitles.value
  if (!currentSubtitles) return

  currentSubtitles.find(({ startSeconds, endSeconds, text }, index) => {
    if (player.seek() >= startSeconds && player.seek() <= endSeconds) {
      currentSubtitleFrame.value = {
        previous: index >= 1 ? currentSubtitles[index - 1]?.text : '',
        current: text,
        next: index < currentSubtitles.length ? currentSubtitles[index + 1]?.text : ''
      }
      return true
    }
  })
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

watch(() => model.value, (value) => {
  if (value && !playing.value) {
    player.play()
  }
  else if (!value && playing.value) {
    player.pause()
  }
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
  if (document.documentElement.style.overflow === 'hidden') {
    document.documentElement.style.overflow = ''
  }
})
</script>

<style scoped lang="scss">
@import "styles/variables";
@import "vuetify/settings";

.player {
  position: fixed !important;
  margin-left: auto;
  margin-right: auto;
  z-index: 5;
  left: 0;
  right: 0;
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .player {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: auto !important;
    width: 600px;
    bottom: 20px;
  }

  .toolbar {
    padding: 0 12px;
  }

  .subtitles {
    padding: 0 20px;
    font-size: 15px;
    line-height: 20px;
    height: auto;
    max-height: 100%;
  }

  .sound-name {
    font-size: 15px;
  }

  .actions-container {
    padding: 16px 12px 12px;
  }

  .volume-slider {
    padding-left: 10px;
  }

  .controls {
    svg {
      height: 30px;
      width: 30px;
    }
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .player {
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 3.125vw;
    bottom: 0;

    width: 100%;
    height: auto !important;

    &.full-screen {
      height: 100% !important;
      z-index: 20000;
    }
  }

  .sound-name {
    font-size: 3.75vw;
    line-height: 5.625vw;
  }

  .toolbar {
    padding-left: 2vw;
  }

  .actions-container {
    padding: 2vw 0 5vw;
  }

  .controls {
    display: flex;
    justify-content: center;
    margin-top: 4vw;
    gap: 10vw;

    svg {
      height: 10vw;
      width: 10vw;
    }
  }

  .subtitles {
    font-size: 3.75vw;
    line-height: 5.625vw;
    padding: 0 2vw !important;

    &.full {
      max-height: 65vh;
      overflow-y: auto;
    }
  }
}

.sound-name {
  text-transform: uppercase;
  color: $redsquirrel-chocolate-m1;
  font-weight: 600;
}

.subtitles {
  color: $redsquirrel-chocolate-m1;

  .current {
    color: $redsquirrel-chocolate;
  }

  &.full {
    color: $redsquirrel-chocolate;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
