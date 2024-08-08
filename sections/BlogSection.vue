<template>
  <section ref="containerRef">
    <AnimatedText>
      <h2 class="gradient-1">
        <HeadingText
          :text="$t('Follow the Instagram blog to get closer and get life hacks for your website!')"
          :font-replacements="[[0, 4], [2, 2], [3, 0], [4, 0], [6, 0], [6, 0], [9, 3], [10, 3], [12, 1], [13, 3]]"
          :line-breaks="mdAndUp ? [3, 9] : [1, 2, 5, 7, 10, 12]"
        />
      </h2>
    </AnimatedText>
    <div class="section-subtitle">
      <p class="quote">
        {{ $t('“In my blog, I talk about major mistakes on websites and give recommendations how to fix it, show the working process of our team, and also share a bit of my life, filled with travels and puzzles. And there\'s also a lot of humor and simple human situations. Nice to meet you :) “') }}
      </p>
      <p class="author">
        {{ $t('Alena, cofounder of RedSquirrel') }}
      </p>
    </div>
    <div class="overlay" />
    <div class="blog-presentation">
      <div class="video-wrapper">
        <div
          id="blog-video"
          ref="videoRef"
        />
        <CTAButton
          :href="INSTAGRAM_URL"
          open-in-new-tab
          block
        >
          {{ $t("Follow") }}
        </CTAButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-expect-error
import Player from '@vimeo/player'
import { useDisplay } from 'vuetify'
import { INSTAGRAM_URL } from '~/constants/urls'

const { $gsap } = useNuxtApp()
const { mdAndUp } = useDisplay()
const containerRef = ref()
const videoRef = ref()

let player: Player

onMounted(() => {
  player = new Player(videoRef.value, { id: 988400344, responsive: true, controls: false, autoplay: true, loop: true, muted: true })

  const container = containerRef.value
  const sectionSubtitle = container.querySelector('.section-subtitle')
  const overlay = container.querySelector('.overlay')
  const blogPresentation = container.querySelector('.blog-presentation')

  $gsap.timeline({
    scrollTrigger: {
      trigger: sectionSubtitle,
      start: 'bottom bottom',
      toggleActions: 'play none resume reverse'
    }
  }).slideTop(sectionSubtitle, { duration: 0.8 })

  $gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: mdAndUp.value ? 'top top' : '+=20% top',
      end: '+=150%',
      scrub: true,
      pin: true
    },
    onStart: () => player.setCurrentTime(0),
    defaults: { ease: 'none' }
  }).dissolve(overlay)
    .slideTop(blogPresentation, { duration: 0.8 }, '>-0.3')
})
</script>

<style scoped lang="scss">
@import "styles/variables";
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  section {
    height: 100vh;
    padding: 8vw;
  }

  .section-subtitle {
    margin: 2vw 14.34vw 0;

    .quote {
      margin-bottom: 1.38vw;
    }

    .author {
      font-size: 1vw;
      line-height: 1.5vw;
    }
  }

  .video-wrapper {
    width: 292px;
    gap: 1.8vw;
  }

  .blog-presentation {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  section {
    padding: $section-padding-mobile;
    height: 150vh;
  }

  .section-subtitle {
    margin-top: 3.125vw;

    .quote {
      margin-bottom: 6.25vw;
    }

    .author {
      font-size: 3.75vw;
      line-height: 5.625vw;
    }
  }

  .video-wrapper {
    width: 70vw;
    gap: 8.43vw;
  }

  .blog-presentation {
    top: 20%;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

section {
  .overlay {
    position: absolute;
    z-index: 8;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .blog-presentation {
    position: absolute;
    z-index: 10;
    margin: auto;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .video-wrapper {
    display: flex;
    flex-direction: column;
  }
}
</style>

<style lang="scss">
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  #blog-video iframe {
    border-radius: 2.5vw;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  #blog-video iframe {
    border-radius: 11.25vw;
  }
}
</style>
