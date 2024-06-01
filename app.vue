<template>
  <v-app class="app">
    <transition
      @before-enter="() => { console.log('before-enter') }"
      @enter="() => { console.log('enter') }"
      @after-enter="() => { console.log('after-enter') }"
      @enter-cancelled="() => { console.log('enter-cancelled') }"
      @before-leave="() => { console.log('before-leave') }"
      @leave="() => { console.log('leave') }"
      @after-leave="() => { console.log('after-leave') }"
      @leave-cancelled="() => { console.log('leave-cancelled') }"
    >
      <v-main>
        <BackgroundContainer v-if="activeSection.background">
          <component
            :is="activeSection.component"
            v-bind="currentProps"
            @next="onNext"
            @back="onBack"
          />
        </BackgroundContainer>
        <component
          :is="activeSection.component"
          v-else
          v-bind="currentProps"
          @next="onNext"
          @back="onBack"
        />
      </v-main>
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
  currentProps.value = {
    leave: { el, done }
  }
}

function onEnter(el: Element, done: () => void) {
  el.className = 'next-section'
  currentProps.value = {
    enter: { el, done }
  }
}

function onAfterEnter(el: Element) {
  currentProps.value = {
    afterEnter: { el }
  }
}
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
