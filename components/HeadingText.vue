<template>
  <span
    v-for="(line, lineIndex) in transformedText"
    :key="lineIndex"
    class="line"
  >
    <span
      v-for="(linePart, linePartIndex) in line"
      :key="linePartIndex"
      :class="line.length > 1 && 'line-part'"
      v-html="linePart"
    />
  </span>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  fontReplacements: Array as PropType<number[][]>,
  lineBreaks: Array as PropType<number[]>,
  spacers: Array as PropType<number[]>
})

const transformedText = computed(() => {
  const fontReplacementsMap = new Map()
  props.fontReplacements?.forEach(([wordIndex, letterIndex]) => {
    if (fontReplacementsMap.has(wordIndex)) {
      fontReplacementsMap.get(wordIndex).push(letterIndex)
    }
    else {
      fontReplacementsMap.set(wordIndex, [letterIndex])
    }
  })

  const words = props.text.split(' ')
  const lines = []
  const lineParts = []
  const linePart = []
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    let word = words[wordIndex]

    if (fontReplacementsMap.has(wordIndex)) {
      word = word.split('').map((letter, letterIndex) => {
        return fontReplacementsMap.get(wordIndex).includes(letterIndex) ? `<span class="style-script">${letter}</span>` : letter
      }).join('')
    }

    linePart.push(word)
    if (props.spacers?.includes(wordIndex) || props.lineBreaks?.includes(wordIndex)) {
      lineParts.push(linePart.join(' '))
      linePart.length = 0
    }
    if (props.lineBreaks?.includes(wordIndex)) {
      lines.push([...lineParts])
      lineParts.length = 0
    }
  }

  lineParts.push(linePart.join(' '))
  lines.push(lineParts)

  return lines
})
</script>

<style scoped lang="scss">
.line-part {
  margin-left: 100px;
}
</style>
