<template>
  <section
    ref="containerRef"
    class="container"
  >
    <AnimatedText>
      <h2 class="gradient-1">
        <HeadingText
          :text="$t('Follow the Instagram blog to get closer and get life hacks for your website!')"
          :font-replacements="[[0, 4], [2, 2], [3, 0], [4, 0], [6, 0], [6, 0], [9, 3], [10, 3], [12, 1], [13, 3]]"
          :line-breaks="[3, 9]"
        />
      </h2>
    </AnimatedText>
    <div class="about-blog">
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
          ref="videoRef"
          class="blog-vimeo-video"
        />
      </div>
      <v-btn
        href="https://www.instagram.com/redsquirrel_a/"
        target="_blank"
        class="follow-button"
        append-icon="mdi-arrow-right"
        elevation="0"
        plain
      >
        {{ $t('Follow') }}
      </v-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-expect-error
import Player from '@vimeo/player'

const { $gsap } = useNuxtApp()
const containerRef = ref()
const videoRef = ref()

let player: Player

onMounted(() => {
  player = new Player(videoRef.value, { id: 988400344, responsive: true, controls: false, autoplay: true, loop: true, muted: true })

  const container = containerRef.value
  const aboutBlog = container.querySelector('.about-blog')
  const overlay = container.querySelector('.overlay')
  const blogPresentation = container.querySelector('.blog-presentation')

  $gsap.timeline({
    scrollTrigger: {
      trigger: aboutBlog,
      start: 'bottom bottom',
      toggleActions: 'play none resume reverse'
    }
  }).slideTop(aboutBlog, { duration: 0.8 })

  $gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=100%',
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

.container {
  height: 100vh;
  padding: 8vw;

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
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .video-wrapper {
      width: 292px;
      height: 632px;
    }

    .follow-button {
      width: 292px;
      margin-top: 1.8vw;
      border: 1px #F8DACA;
      border-radius: 0.69vw;
      color: $redsquirrel-chocolate;
      background-color: #FFDFCFE5;
    }
  }

  .about-blog {
    text-transform: uppercase;
    margin: 2vw 14.34vw 0;
    color: $redsquirrel-cream;

    .quote {
      text-align: center;
      font-size: 1.38vw;
      line-height: 2vw;
      margin-bottom: 1.38vw;
    }

    .author {
      text-align: center;
    }
  }
}
</style>

<style lang="scss">
.blog-vimeo-video {
  iframe {
    border-radius: 2.5vw;
  }
}
</style>
