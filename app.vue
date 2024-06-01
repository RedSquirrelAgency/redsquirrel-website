<template>
  <v-app class="app">
    <transition
      :css="false"
      appear
      @enter="onEnter"
      @leave="onLeave"
    >
      <BackgroundContainer v-if="activeSection.background">
        <transition
          :css="false"
          @enter="onEnter"
          @leave="onLeave"
        >
          <component
            :is="activeSection.component"
            v-bind="currentProps"
            @next="onNext"
            @back="onBack"
          />
        </transition>
      </BackgroundContainer>
      <component
        :is="activeSection.component"
        v-else
        v-bind="currentProps"
        @next="onNext"
        @back="onBack"
      />
    </transition>
  </v-app>
</template>

<script setup lang="ts">
import HeroSection from '~/sections/HeroSection.vue'
import TestimonialsSection from '~/sections/TestimonialsSection.vue'
import PortfolioSection from '~/sections/PortfolioSection.vue'
import AdvantagesSection from '~/sections/AdvantagesSection.vue'

const sectionsOrder = [
  { component: HeroSection, background: false },
  { component: TestimonialsSection, background: false },
  { component: PortfolioSection, background: true },
  { component: AdvantagesSection, background: true }
]

const index = shallowRef(0)
const activeSection = computed(() => (sectionsOrder[index.value]))
const currentProps = shallowRef({})
const { $gsap } = useNuxtApp()

function onNext() {
  if (index.value + 1 > sectionsOrder.length - 1) return
  index.value++
  console.log('next')
}

function onBack() {
  if (index.value < 0) return
  index.value--
  console.log('back')
}

function onBeforeLeave(el: Element) {
  currentProps.value = {
    beforeLeave: { el }
  }
}

function onLeave(el: Element, done: () => void) {
  el.className = 'current-section'
  console.log('onEnter')
  $gsap.fromTo(el,
    {
      transform: 'scale(1)',
      filter: 'blur(0px)',
      opacity: 1
    },
    {
      transform: 'scale(2)',
      filter: 'blur(4px)',
      opacity: 0,
      duration: 3,
      ease: 'power4.out',
      onComplete: done
    })
}

function onEnter(el: Element, done: () => void) {
  el.className = 'next-section'
  console.log('onEnter')
  $gsap.fromTo(el,
    {
      transform: 'scale(2)',
      filter: 'blur(4px)',
      opacity: 0
    },
    {
      transform: 'scale(1)',
      filter: 'blur(0px)',
      opacity: 1,
      duration: 3,
      ease: 'power4.out',
      onComplete: done
    })
}

function onAfterEnter(el: Element) {
  currentProps.value = {
    afterEnter: { el }
  }
}

onMounted(() => {
  document.addEventListener('wheel', (e: WheelEvent) => e.preventDefault(), { passive: false })
})
</script>

<style lang="scss">
.app {
  position: relative;
}

.current-section {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
}

.next-section {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
