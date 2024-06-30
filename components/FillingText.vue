<template>
  <span
    v-for="(letter, index) in text.split('')"
    :key="index"
    :style="{ color: (index < textProgress) ? filledColor : color }"
  >
    {{ letter }}
  </span>
</template>

<script setup lang="ts">
const { text, progress, color, filledColor } = defineProps({
  text: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: '#ffffff'
  },
  filledColor: {
    type: String,
    default: '#afafaf'
  }
})

const textProgress = computed(() => {
  return text.length * progress
})
</script>
