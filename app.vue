<template>
  <v-app class="app">
    <transition>
      <component
        :is="activeComponent"
        v-bind="currentProps"
        @next="onNext"
        @back="onBack"
      />
    </transition>
  </v-app>
</template>

<script setup lang="ts">
import HeroSection from '~/components/HeroSection.vue'
import TestimonialsSection from '~/components/TestimonialsSection.vue'
import PortfolioSection from '~/components/PortfolioSection.vue'

const componentsOrder = [
  HeroSection,
  TestimonialsSection,
  PortfolioSection
]

const index = shallowRef(0)
const activeComponent = computed(() => (componentsOrder[index.value]))
const currentProps = shallowRef({})

function onNext() {
  if (index.value + 1 > componentsOrder.length - 1) return
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
