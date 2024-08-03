<template>
  <section
    ref="containerRef"
    class="container"
    :class="mdAndUp ? 'desktop' : 'mobile'"
  >
    <AnimatedText>
      <h2 class="gradient-1">
        <HeadingText
          :text="$t('A-team dedicated to excellent results')"
          :font-replacements="[[0, 0], [1, 0], [1, 4], [3, 3], [4, 2]]"
          :line-breaks="mdAndUp ? [0, 3] : [0, 1, 3, 4]"
          :word-spacers="mdAndUp ? { 0: '3.5em' } : {}"
          :line-spacers="mdAndUp ? { 2: '1.5em' } : { 0: '0.5em' }"
        />
      </h2>
    </AnimatedText>
    <div
      class="sheets"
      :class="mdAndUp ? 'v-row' : 'v-col'"
    >
      <div :class="mdAndUp ? 'v-col d-flex justify-end' : 'v-row'">
        <div class="video-wrapper">
          <div
            class="overlay"
            :class="isPlaying ? 'playing' : ''"
            @click="isPlaying && onPause()"
          >
            <v-btn
              v-if="!isPlaying"
              class="play-button"
              rounded="circle"
              :size="mdAndUp ? '5vw' : '12.5vw'"
              @click="onPlay"
            >
              <PlayIcon color="#FFFBF7" />
            </v-btn>
          </div>
          <div
            ref="videoRef"
            class="team-video"
          />
        </div>
      </div>
      <div :class="mdAndUp ? 'v-col d-flex justify-start' : 'v-row'">
        <div class="about-team-wrapper">
          <GlassSheet
            class="about-team"
            :border="mdAndUp ? '3vw' : '6.25vw'"
          >
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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-expect-error
import Player from '@vimeo/player'
import { useDisplay } from 'vuetify'

const { $gsap } = useNuxtApp()
const containerRef = ref()

const videoRef = ref()
const isPlaying = shallowRef(false)
let player: Player = null

const technologiesExpanded = ref(false)

const { mdAndUp } = useDisplay()

onMounted(() => {
  player = new Player(videoRef.value, { id: 8837024, responsive: true, controls: false })
  player.on('play', () => {
    isPlaying.value = true
  })
  player.on('pause', () => {
    isPlaying.value = false
  })

  const container = containerRef.value
  const sheetsRow = container.querySelector('.sheets')
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

h3 {
  text-transform: uppercase;
  font-weight: 300;
}

.desktop {
  $cards-size: 41vw;
  $cards-border-radius: 3vw;

  $play-icon-size: 1.5vw;

  $nominee-tag-height: 4vw;
  $nominee-tag-width: 13vw;

  padding: 8vw 0;

  h2 {
    margin-bottom: 70px;
  }

  h3 {
    font-size: 2vw;
    line-height: 3vw;
  }

  .video-wrapper {
    width: $cards-size;
    height: $cards-size;

    .overlay {
      border-radius: $cards-border-radius;
    }

    .play-button svg {
      width: $play-icon-size;
      height: $play-icon-size;
    }
  }

  .about-team {
    width: $cards-size;
    height: $cards-size;
    padding: 4.2em 2.4em;

    .content {
      gap: 1.8em;
    }
  }

  .nominee-tag {
    left: calc($cards-size - $nominee-tag-width - 3vw);
    bottom: calc($cards-size + $nominee-tag-height / 2);
    height: $nominee-tag-height;
    width: $nominee-tag-width;
    border-radius: 1.527vw;

    .image {
      border-radius: 1.458vw;
    }
  }
}

.mobile {
  $cards-size: 93.75vw;
  $cards-border-radius: 6.25vw;

  $play-icon-size: 6.25vw;

  $nominee-tag-height: 9.71vw;
  $nominee-tag-width: 32.12vw;
  $nominee-tag-border-radius: 3.125vw;

  padding: 3.125vw;

  h2 {
    text-align: left;
    margin-bottom: 15.625vw;
  }

  h3 {
    font-size: 7.5vw;
    line-height: 9.375vw;
  }

  .video-wrapper {
    width: $cards-size;
    height: $cards-size;

    .overlay {
      border-radius: $cards-border-radius;
    }
  }

  .play-button svg {
    width: $play-icon-size;
    height: $play-icon-size;
  }

  .about-team {
    width: $cards-size;
    padding: 6.25vw 3.125vw;
    margin-top: 6.25vw;

    h3 {
      margin-bottom: 9.375vw;
    }

    .location {
      margin-bottom: 9.375vw;
    }
  }

  .nominee-tag {
    left: 62%;
    top: -90%;
    height: $nominee-tag-height;
    width: $nominee-tag-width;
    border-radius: $nominee-tag-border-radius;

    .image {
      border-radius: calc($nominee-tag-border-radius - 0.5vw);
    }
  }
}

.video-wrapper {
  position: relative;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #FFD6C3CC;
    z-index: 2;
    transition: opacity 0.3s ease;

    &.playing {
      background-color: transparent;
      cursor: pointer;
    }

    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      background-color: #EEEEEEB2;
      border: 1px solid #FFFFFF;
      box-shadow: 0 1.85px 3.15px 0 #67676704;
    }
  }
}

.about-team {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: $redsquirrel-chocolate;

  .content {
    display: flex;
    flex-direction: column;
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

    .more-about-technologies {
      cursor: pointer;
      text-decoration: underline;
    }

    .technologies-list {
      padding-inline-start: 2em;
    }
  }
}

.nominee-tag {
  position: relative;
  transform: rotate(3.8deg);

  border: 1px solid #FFFFFF;
  box-shadow: 0 4px 10px 0 #5050501A;

  background: rgb(255, 255, 255, 0);
  backdrop-filter: blur(5px) opacity(1);
  -webkit-backdrop-filter: blur(5px) opacity(1);

  .image {
    opacity: 0.7;
  }
}
</style>

<style lang="scss">
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .team-video iframe {
    border-radius: 3vw;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .team-video iframe {
    border-radius: 6.25vw;
  }
}

.team-video iframe {
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 1.85px 3.15px 0 #CA5E3C04;
}
</style>
