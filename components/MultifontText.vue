<template>
  <span
    :class="props.line && 'line'"
    v-html="props.positions ? applyFontReplacement(props.text, props.positions) : props.text"
  />
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  positions: Array as PropType<number[]>,
  line: { type: Boolean, default: true }
})

function applyFontReplacement(text: string, positions: number[]) {
  return text.split('').map((letter, index) => {
    return positions.includes(index) ? `<span class="style-script">${letter}</span>` : letter
  }).join('')
}
</script>
