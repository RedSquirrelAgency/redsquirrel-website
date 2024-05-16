<template>
  <v-app>
    <v-main>
      <Transition
        name="fade"
        mode="out-in"
      >
        <component
          :is="activeComponent"
          @next="onNext"
        />
      </Transition>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HeroSection from '~/components/HeroSection.vue'
import SecondSection from '~/components/SecondSection.vue'

const componentsOrder = [
  HeroSection,
  SecondSection
]

const activeComponent = shallowRef(componentsOrder[0])

function onNext() {
  const index = componentsOrder.indexOf(activeComponent.value)
  activeComponent.value = componentsOrder[index + 1]
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
