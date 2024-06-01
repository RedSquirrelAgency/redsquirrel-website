<template>
  <v-main>
    <div class="container fill-height">
      <div class="content">
        <h1 class="header">
          <div>Cli<span class="style-script">e</span>nts' word<span class="style-script">s</span></div>
          <div>inspire us t<span class="style-script">o</span> new</div>
          <div>m<span class="style-script">a</span>sterpie<span class="style-script">c</span>es</div>
        </h1>
      </div>
      <div
        class="quotes"
        :style="quotesStyle"
      >
        <TickerTape
          v-for="quote in quotes"
          :key="quote.text"
          :direction="quote.direction"
          :duration="30"
          class="quote"
        >
          <span class="quote">{{ quote.text }}</span>
        </TickerTape>
      </div>
    </div>
  </v-main>
</template>

<script setup lang="ts">
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

const quotesStyle = shallowRef({})
useScrollAnimation({
  valueFrom: 100,
  valueTo: 0,
  onChange: (value: number) => {
    quotesStyle.value = {
      transform: `translateY(${value}%)`
    }
  },
  onScrollUpOverflow: back,
  onScrollDownOverflow: next
})

const { $gsap } = useNuxtApp()

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

function containerInAnimation() {
  const tl = $gsap.timeline()
  tl.fromTo(
    '.container',
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 5,
      ease: 'power4.out'
    })
  tl.fromTo(
    '.header div',
    {
      y: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 2,
      ease: 'power4.out'
    }, '>-4')
}
</script>

<style scoped lang="scss">
@import "styles/variables";
$backdrop-color: #a25b29;

.container .content, .quotes {
  position: absolute;
}

.container {
  background-image:
    radial-gradient(transparent 0, transparent 70%),
    radial-gradient(at 40% 9%, $backdrop-color 0px, transparent 50%),
    radial-gradient(at 69% 60%, $backdrop-color 0px, transparent 50%),
    radial-gradient(at 24% 89%, $backdrop-color 0px, transparent 50%),
    radial-gradient(at 51% 77%, $backdrop-color 0px, transparent 50%),
    radial-gradient(at 78% 92%, $backdrop-color 0px, transparent 50%);
  background-size: 150% 150%;
  animation: aura 15s linear infinite;
}

.content {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 120px;
  height: 100%;
  width: 100%;
  opacity: 60%;

  .header {
    font-size: 120px;
    line-height: 144px;
    text-transform: uppercase;
    color: $redsquirrel-peach;
    font-weight: 200;
  }
}

.quotes {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #10151B;

  .quote {
    text-transform: uppercase;
    font-size: 7.4vh;
    background-color: $redsquirrel-peach;
    background-size: 100%;
    background-repeat: repeat;
    background-attachment: scroll;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
