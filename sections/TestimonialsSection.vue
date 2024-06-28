<template>
  <section
    ref="containerRef"
    class="container"
  >
    <div class="header">
      <h2 class="gradient-1">
        <HeadingText
          text="Clients' words inspire us to new masterpieces"
          :font-replacements="[[0, 3], [1, 4], [4, 1], [6, 1]]"
          :line-breaks="[1, 5]"
        />
      </h2>
    </div>
    <div class="quotes">
      <TickerTape
        v-for="(quote, index) in quotes"
        :key="index"
        :direction="quote.direction"
        :duration="30"
      >
        <span
          class="quote"
          :class="(index % 2 === 0) && 'darker'"
        >{{ quote.text }}</span>
      </TickerTape>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import Timeline = gsap.core.Timeline

const { tl } = defineProps({
  tl: {
    type: Object as PropType<Timeline>,
    required: true
  }
})

const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!containerRef.value) return
  const container = containerRef.value
  tl.fromTo(container.querySelector('.quotes'),
    { yPercent: 0 },
    { yPercent: -100 },
    '<1.5'
  )
})

const quotes = [
  { text: 'Listening to the client\'s desires and vision', direction: 'normal' },
  { text: 'Able to listen without imposing personal opinions ', direction: 'reverse' },
  { text: 'Clearly explaining and organizing everything', direction: 'normal' },
  { text: 'Immersing deeply into the project from the first meeting', direction: 'reverse' },
  { text: 'Prompt responses in messenger and timely delivery', direction: 'normal' },
  { text: 'Showing great enthusiasm to work', direction: 'reverse' },
  { text: 'Working with great interest on the project', direction: 'normal' },
  { text: 'Taking calls seriously and being punctual', direction: 'reverse' },
  { text: 'Able to meet our expectations', direction: 'normal' }
]
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  width: 100%;
  height: 100vh;
  background-color: $redsquirrel-peach;
  //background-image:
  //  radial-gradient(transparent 0, transparent 70%),
  //  radial-gradient(at 40% 9%, $backdrop-color 0px, transparent 50%),
  //  radial-gradient(at 69% 60%, $backdrop-color 0px, transparent 50%),
  //  radial-gradient(at 24% 89%, $backdrop-color 0px, transparent 50%),
  //  radial-gradient(at 51% 77%, $backdrop-color 0px, transparent 50%),
  //  radial-gradient(at 78% 92%, $backdrop-color 0px, transparent 50%);
  // background-size: 150% 150%;
  // animation: aura 15s linear infinite;
}

.header {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 120px;
  height: 100%;
  width: 100%;

  h2 {
    font-size: 120px;
    line-height: 144px;
    text-transform: uppercase;
    font-weight: 200;
  }
}

.quotes {
  height: 100vh;
  width: 100%;
  background-color: #FFE2D3B2;

  .quote {
    text-transform: uppercase;
    font-size: 7.4vh;
    color: $redsquirrel-peach;

    &.darker {
      color: $redsquirrel-peach-p1;
    }
  }
}

@keyframes aura {
  0% {
    background-position: center, 50% 50%, 30% 100%, 100% 10%, 23% 23%, 0% 80%;
  }
  33.333% {
    background-position: center, 10% 75%, 40% 80%, 60% 20%, 43% 23%, 16% 30%;
  }
  66.666% {
    background-position: center, 25% 35%, 80% 50%, 10% 10%, 66% 5%, 30% 0%;
  }
  100% {
    background-position: center, 50% 50%, 30% 100%, 100% 10%, 23% 23%, 0% 80%;
  }
}
</style>
