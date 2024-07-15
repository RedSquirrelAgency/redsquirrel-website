<template>
  <v-sheet
    class="glass"
    :style="{ 'border-radius': border, 'background': `rgba(255, 255, 255, ${fill})` }"
    :class="`elevation-${elevation}`"
  >
    <slot />
  </v-sheet>
</template>

<script setup lang="ts">
const { border, elevation } = defineProps({
  border: {
    type: String,
    required: false,
    default: '3vw'
  },
  elevation: {
    type: Number,
    required: false,
    default: 8
  },
  fill: {
    type: Number,
    required: false,
    default: 0.2
  }
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.glass {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
}
</style>
