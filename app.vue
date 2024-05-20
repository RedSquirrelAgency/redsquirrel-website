<template>
  <v-app>
    <v-main>
      <component
        :is="activeComponent"
        @next="onNext"
        @back="onBack"
      />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HeroSection from '~/components/HeroSection.vue'
import TestimonialsSection from '~/components/TestimonialsSection.vue'

const componentsOrder = [
  HeroSection,
  TestimonialsSection
]

const activeComponent = shallowRef(componentsOrder[0])

function onNext() {
  const index = componentsOrder.indexOf(activeComponent.value)
  if (index + 1 > componentsOrder.length - 1) return
  activeComponent.value = componentsOrder[index + 1]
}

function onBack() {
  const index = componentsOrder.indexOf(activeComponent.value)
  if (index < 0) return
  activeComponent.value = componentsOrder[index - 1]
}
</script>

<style lang="scss">
</style>
