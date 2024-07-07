<template>
  <section class="container">
    <AnimatedText>
      <h2 class="gradient-1">
        <HeadingText
          :text="$t('A-team dedicated to excellent results')"
          :font-replacements="[[0, 0], [1, 0], [1, 4], [3, 3], [4, 2]]"
          :line-breaks="[0, 3]"
          :word-spacers="{ 0: '3.5em' }"
          :line-spacers="{ 2: '1.5em' }"
        />
      </h2>
    </AnimatedText>
    <v-row>
      <v-col class="d-flex justify-center">
        <div class="video-wrapper">
          <div
            v-if="!isPlaying"
            class="overlay"
          >
            <v-btn
              class="play-button"
              rounded
              @click="onPlay"
            >
              <PlayIcon
                class="icon"
                color="#FFFBF7"
              />
            </v-btn>
          </div>
          <div
            ref="videoRef"
            class="video"
          />
        </div>
      </v-col>
      <v-col class="d-flex justify-center">
        <GlassSheet class="about-team">
          <h3>{{ $t('Using modern technologies in development, we make reliable fast websites') }}</h3>
          <div class="content">
            <div class="location">
              <span class="icon">
                <MapPinIcon color="#85553D" />
              </span>
              <span>{{ $t('Based in Munich') }}</span>
            </div>
            <i18n-t
              tag="p"
              keypath="We do not use template solutions, builders, or ready-made themes. Instead of it, we develop a theme {highlight-1} to avoid unnecessary plugins and other clutter. All of this ultimately results {highlight-2} of a website."
            >
              <template #highlight-1>
                <b>{{ $t('from scratch') }}</b>
              </template>
              <template #highlight-2>
                <b>{{ $t('in a high loading speed') }}</b>
              </template>
            </i18n-t>
            <i18n-t
              tag="p"
              keypath="We use {highlight} technologies in development. {link}"
            >
              <template #highlight>
                <b>{{ $t('modern reliable') }}</b>
              </template>
              <template #link>
                <a
                  href=""
                  target="_blank"
                >{{ $t('More about technologies.') }}</a>
              </template>
            </i18n-t>
          </div>
        </GlassSheet>
      </v-col>
    </v-row>
  </section>
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

$cards-size: 35vw;

.container {
  padding: 100px 120px 130px 150px;

  h2 {
    margin-bottom: 70px;
  }
}

.about-team {
  width: $cards-size;
  height: $cards-size;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-size: 1vw;
  color: $redsquirrel-chocolate;
  padding: 4.2em 2.4em;

  h3 {
    text-transform: uppercase;
    font-size: 1.8em;
    font-weight: 300;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.8em;

    font-size: 0.9em;
    font-weight: 300;

    p b {
      font-weight: 400;
    }

    p a {
      color: inherit;
    }

    .location {
      font-weight: 400;

      .icon {
        margin-right: 0.7em;
        vertical-align: middle;

        svg {
          width: 1.44em;
          height: 1.44em;
        }
      }
    }
  }
}

.video-wrapper {
  position: relative;
  width: $cards-size;
  height: $cards-size;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #FFD6C3CC;
    border-radius: 3vw;
    z-index: 2;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5vw;
    height: 5vw;

    transform: translate(-50%, -50%);

    background-color: #EEEEEEB2;
    border-radius: 50%;
    border: 1px solid #FFFFFF;
    box-shadow: 0 1.85px 3.15px 0 #67676704;

    .icon {
      width: 1.5vw;
      height: 1.5vw;
    }
  }
}
</style>

<style lang="scss">
.video {
  iframe {
    border-radius: 3vw;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 1.85px 3.15px 0 #CA5E3C04;
  }
}
</style>
