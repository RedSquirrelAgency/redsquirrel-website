<template>
  <section
    ref="containerRef"
    class="container"
  >
    <div class="header">
      <h2 class="gradient-1">
        <HeadingText
          :text="$t('Clients\' words inspire us to new masterpieces')"
          :font-replacements="[[0, 3], [1, 4], [4, 1], [6, 1]]"
          :line-breaks="[1, 5]"
          :line-spacers="{ 0: '1em', 2: '3.5em' }"
        />
      </h2>
    </div>
    <div class="quotes">
      <TickerTape
        v-for="(quote, index) in quotes"
        :key="index"
        :direction="(index % 2 === 0) ? 'normal' : 'reverse'"
        :duration="quote.length * 5"
      >
        <span
          class="quote"
          :class="(index % 2 === 0) && 'darker'"
        >{{ $t(quote) }}</span>
      </TickerTape>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import Timeline = gsap.core.Timeline

const props = defineProps({
  tl: {
    type: Object as PropType<Timeline>,
    required: true
  },
  displayed: {
    type: Boolean,
    required: true
  }
})

const quotes = [
  'Listening to the client\'s desires and vision',
  'Able to listen without imposing personal opinions',
  'Clearly explaining and organizing everything',
  'Immersing deeply into the project from the first meeting',
  'Prompt responses in messenger and timely delivery',
  'Showing great enthusiasm to work',
  'Working with great interest on the project',
  'Taking calls seriously and being punctual',
  'Work like a Swiss watch'
]

const { $gsap } = useNuxtApp()
const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!containerRef.value) return
  const container = containerRef.value

  props.tl.fromTo(container.querySelector('.quotes'),
    { yPercent: 0 },
    { yPercent: -100, delay: 0.5, duration: 1.5 }
  )

  watch(() => props.displayed, (displayed) => {
    if (displayed) {
      const headerStyle = { opacity: 50, blur: 100 }
      $gsap.timeline()
        .fromTo(headerStyle,
          {
            opacity: 0,
            blur: 10
          },
          {
            opacity: 1,
            blur: 0,
            delay: 0.4,
            duration: 1.5,
            onUpdate: () => {
              $gsap.set(container.querySelector('.header'), {
                webkitFilter: `blur(${headerStyle.blur}px)`,
                filter: `blur(${headerStyle.blur}px)`,
                opacity: headerStyle.opacity
              })
            }
          }
        )
    }
  })
})
</script>

<style scoped lang="scss">
@import "styles/variables";

$backdrop-color: #fc7733;

.container {
  width: 100%;
  height: 100vh;
  background-color: $redsquirrel-peach;
  background-image:
    radial-gradient(transparent 0, transparent 70%),
    radial-gradient(at 40% 9%, $backdrop-color 0px, transparent 30%),
    radial-gradient(at 69% 60%, $backdrop-color 0px, transparent 30%),
    radial-gradient(at 24% 89%, $backdrop-color 0px, transparent 30%),
    radial-gradient(at 51% 77%, $backdrop-color 0px, transparent 30%),
    radial-gradient(at 78% 92%, $backdrop-color 0px, transparent 30%);
   background-size: 150% 150%;
   animation: aura 7s linear infinite;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  h2 {
    text-align: left;
    font-size: 7vw;
    line-height: 7vw;
    text-transform: uppercase;
    font-weight: 300;
  }
}

.quotes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #FFE2D3B2;
  backdrop-filter: blur(7px);

  .quote {
    text-transform: uppercase;
    font-size: 6.5vh;
    line-height: 10.1vh;
    margin-right: 1.3em;
    color: $redsquirrel-peach;

    &.darker {
      color: $redsquirrel-peach-p1;
    }
  }
}

@keyframes aura {
  0% {
    background-position: center, 50% 50%, 30% 100%, 100% 10%, 23% 23%, 0 80%;
  }
  33.333% {
    background-position: center, 10% 75%, 40% 80%, 60% 20%, 43% 23%, 16% 30%;
  }
  66.666% {
    background-position: center, 25% 35%, 80% 50%, 10% 10%, 66% 5%, 30% 0;
  }
  100% {
    background-position: center, 50% 50%, 30% 100%, 100% 10%, 23% 23%, 0 80%;
  }
}
</style>
