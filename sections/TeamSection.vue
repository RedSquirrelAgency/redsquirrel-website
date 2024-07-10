<template>
  <section
    ref="containerRef"
    class="container"
  >
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
    <v-row class="sheets-row">
      <v-col class="d-flex justify-end">
        <div class="video-wrapper">
          <div
            class="overlay"
            :class="isPlaying ? 'playing' : ''"
            @click="isPlaying && onPause()"
          >
            <v-btn
              v-if="!isPlaying"
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
      <v-col class="d-flex justify-start">
        <div class="about-team-wrapper">
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
                v-if="!technologiesExpanded"
                tag="p"
                keypath="We use {highlight} technologies in development. {link}"
              >
                <template #highlight>
                  <b>{{ $t('modern reliable') }}</b>
                </template>
                <template #link>
                  <span
                    v-if="!technologiesExpanded"
                    class="more-about-technologies"
                    @click="technologiesExpanded = !technologiesExpanded"
                  >
                    {{ $t('More about technologies.') }}
                  </span>
                </template>
              </i18n-t>
              <i18n-t
                v-else
                tag="p"
                keypath="We use {highlight} technologies in development:{technologies}"
              >
                <template #highlight>
                  <b>{{ $t('modern reliable') }}</b>
                </template>
                <template #technologies>
                  <ul class="technologies-list">
                    <li>{{ $t("Frontend: html5, css3, js, jquery js library (if necessary).") }}</li>
                    <li>{{ $t("Frontend assembly: gulp, node js, nunjucks, stylus.") }}</li>
                    <li>{{ $t("Backend: PHP, MySQL, apache or Nginx, CMS WordPress.") }}</li>
                  </ul>
                </template>
              </i18n-t>
            </div>
          </GlassSheet>
          <v-card
            class="nominee-tag"
            flat
          >
            <v-img
              class="image"
              alt="Awwwards nominee"
              src="/awwwards.jpg"
              eager
              cover
            />
          </v-card>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
// @ts-expect-error
import Player from '@vimeo/player'

const { $gsap } = useNuxtApp()
const containerRef = ref<HTMLElement | null>(null)

const videoRef = ref<HTMLElement | null>(null)
const isPlaying = shallowRef(false)
let player: Player = null

const technologiesExpanded = ref(false)

onMounted(() => {
  player = new Player(videoRef.value, { id: 8837024, responsive: true, controls: false })
  player.on('play', () => {
    isPlaying.value = true
  })
  player.on('pause', () => {
    isPlaying.value = false
  })

  if (!containerRef.value) return
  const container = containerRef.value
  const sheetsRow = container.querySelector('.sheets-row')
  const videoWrapper = container.querySelector('.video-wrapper')
  const aboutTeam = container.querySelector('.about-team')
  const nomineeTag = container.querySelector('.nominee-tag')

  $gsap.timeline({
    scrollTrigger: {
      trigger: sheetsRow,
      start: 'top center',
      toggleActions: 'play none resume reverse'
    }
  }).slideTop(videoWrapper, { duration: 0.8 })
    .slideTop(aboutTeam, { duration: 0.8 }, '>-0.3')
    .slideBottom(nomineeTag, { duration: 0.5 }, '>-0.3')
})

function onPlay() {
  if (!player) return
  player.play()
}

function onPause() {
  if (!player) return
  player.pause()
}
</script>

<style scoped lang="scss">
@import "styles/variables";

$cards-size: 41vw;
$nominee-tag-height: 4vw;
$nominee-tag-width: 13vw;

.container {
  padding: 8vw;

  h2 {
    margin-bottom: 70px;
  }
}

.nominee-tag {
  position: relative;
  left: calc($cards-size - $nominee-tag-width - 3vw);
  bottom: calc($cards-size + $nominee-tag-height / 2);
  transform: rotate(3.8deg);

  height: $nominee-tag-height;
  width: $nominee-tag-width;

  border: 1px solid #FFFFFF;
  border-radius: 22px;
  box-shadow: 0 4px 10px 0 #5050501A;

  background: rgb(255, 255, 255, 0);
  backdrop-filter: blur(5px) opacity(1);
  -webkit-backdrop-filter: blur(5px) opacity(1);

  .image {
    border-radius: 21px;
    opacity: 0.7;
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

    font-size: 1em;
    font-weight: 300;
    gap: 1.8em;

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

    .more-about-technologies {
      cursor: pointer;
      text-decoration: underline;
    }

    .technologies-list {
      padding-inline-start: 2em;
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
    transition: opacity 0.3s ease;

    &.playing {
      opacity: 0;
      cursor: pointer;
    }
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
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0 1.85px 3.15px 0 #CA5E3C04;
  }
}
</style>
