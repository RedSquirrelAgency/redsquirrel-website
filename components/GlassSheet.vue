<template>
  <v-sheet
    class="glass"
    :style="style"
    :class="`elevation-${elevation}`"
  >
    <slot />
  </v-sheet>
</template>

<script setup lang="ts">
const { border, fill, plain} = defineProps({
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
  },
  plain: {
    type: Boolean,
    required: false,
    default: false
  }
})

const style = computed(() => {
  return {
    border: plain ? 'none' : '1px solid rgba(255, 255, 255, 0.7)',
    borderRadius: border,
    background: `rgba(255, 255, 255, ${fill})`
  }
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.glass {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
