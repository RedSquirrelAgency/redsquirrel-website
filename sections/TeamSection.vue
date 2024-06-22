<template>
  <div class="container">
    <h2 class="text-center gradient-1">
      <HeadingText
        text="A-team dedicated to excellent results"
        :font-replacements="[[0, 0], [1, 0], [1, 4], [3, 3], [4, 2]]"
        :line-breaks="[0, 3]"
      />
    </h2>
    <v-row>
      <v-col class="d-flex justify-center">
        <div class="video-wrapper">
          <div
            v-if="!isPlaying"
            class="overlay"
          >
            <v-btn
              variant="flat"
              class="play-button"
              icon="mdi-play"
              color="#EEEEEEB2"
              @click="onPlay"
            >
              <v-icon
                color="white"
                size="30"
              >
                mdi-play
              </v-icon>
            </v-btn>
          </div>
          <div
            ref="videoRef"
            class="video"
          />
        </div>
      </v-col>
      <v-col class="d-flex justify-center">
        <v-sheet
          class="glass about-team"
          min-width="590px"
          max-width="590px"
          height="590px"
          flat
        >
          <h3>
            Using modern technologies in development, we make reliable fast websites
          </h3>
          <div class="text">
            <div class="location">
              <span class="icon"><MapPinIcon color="#85553D" /></span>
              <span>Based in Munich</span>
            </div>
            <p>We do not use template solutions, builders, or ready-made themes. Instead of it, we develop a theme from scratch to avoid unnecessary plugins and other clutter. All of this ultimately results <b>in a high loading speed</b> of a website.</p>
            <p>We use <b>modern reliable</b> technologies in development. More about technologies.</p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
// @ts-expect-error
import Player from '@vimeo/player'

const videoRef = ref<HTMLElement | null>(null)
const isPlaying = shallowRef(false)
let player: Player = null

onMounted(() => {
  player = new Player(videoRef.value, { id: 8837024, responsive: true, controls: false })
  player.on('play', () => {
    isPlaying.value = true
  })
  player.on('pause', () => {
    isPlaying.value = false
  })
})

function onPlay() {
  if (!player) return
  player.play()
}
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  width: 100%;
  padding: 100px 120px 130px 150px;

  h2 {
    margin-bottom: 70px;
  }
}

.glass {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 60px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.about-team {
  padding: 70px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: $redsquirrel-chocolate;

  h3 {
    text-transform: uppercase;
    font-size: 30px;
    font-weight: 300;
    line-height: 45px;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-size: 15px;
    font-weight: 300;
    line-height: 22.5px;

    p b {
      font-weight: 700;
    }

    .location .icon {
        margin-right: 10px;
        vertical-align: middle;
    }
  }
}

.video-wrapper {
  position: relative;
  width: 590px;
  height: 590px;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #EEEEEE66;
  border-radius: 60px;
  z-index: 2;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
}
</style>

<style lang="scss">
.video {
  iframe {
    border-radius: 60px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}
</style>
