<template>
  <div class="container fill-height">
    <div class="header-wrapper">
      <h1 class="header">
        <div>Cli<span class="style-script">e</span>nts' word<span class="style-script">s</span></div>
        <div>inspire us t<span class="style-script">o</span> new</div>
        <div>m<span class="style-script">a</span>sterpie<span class="style-script">c</span>es</div>
      </h1>
    </div>
    <div
      class="quotes-container"
      :style="quotesContainerStyle"
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
</template>

<script setup lang="ts">
const emit = defineEmits(['next', 'back'])
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

let quotesContainerPosition = 100
const quotesContainerStyle = shallowRef({
  transform: `translateY(${quotesContainerPosition}%)`
})

function moveTickers(shift: number): number {
  let returnValue = 0
  quotesContainerPosition += shift
  if (quotesContainerPosition >= 100) {
    quotesContainerPosition = 100
    returnValue = -1
  }
  if (quotesContainerPosition <= 0) {
    quotesContainerPosition = 0
    returnValue = 1
  }
  quotesContainerStyle.value = {
    transform: `translateY(${quotesContainerPosition}%)`
  }
  return returnValue
}

function wheelEventListener(e: WheelEvent) {
  e.preventDefault()
  const result = moveTickers(-e.deltaY / 10)
  if (result === 1) {
    emit('next')
  }
  if (result === -1) {
    emit('back')
  }
}

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

onMounted(() => {
  containerInAnimation()
  document.addEventListener('wheel', wheelEventListener, { passive: false })
})

onUnmounted(() => {
  document.removeEventListener('wheel', wheelEventListener)
})
</script>

<style scoped lang="scss">
@import "styles/variables";
$backdrop-color: #a25b29;

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
  overscroll-behavior: none;
  padding-top: 120px;
  padding-left: 120px;
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

.header-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  opacity: 60%;
}

.header {
  font-size: 120px;
  line-height: 144px;
  text-transform: uppercase;
  color: $redsquirrel-peach;
  font-weight: 200;
}

.style-script {
  font-family: "Style Script", cursive;
  font-weight: 400;
  font-style: normal;
}

.quotes-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #10151B;
}

.quote {
  text-transform: uppercase;
  font-size: 7.4vh;
  background-color: #CA4246;
  background-image: linear-gradient(
          45deg,
          #CA4246 16.666%,
          #E16541 16.666%,
          #E16541 33.333%,
          #F18F43 33.333%,
          #F18F43 50%,
          #8B9862 50%,
          #8B9862 66.666%,
          #476098 66.666%,
          #476098 83.333%,
          #A7489B 83.333%);

  background-size: 100%;
  background-repeat: repeat;
  background-attachment: scroll;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
