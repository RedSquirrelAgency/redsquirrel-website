<template>
  <span
    v-for="(line, lineIndex) in transformedText"
    :key="lineIndex"
    :style="{ marginLeft: line.space || '0' }"
    class="line"
  >
    <span
      v-for="(linePart, linePartIndex) in line.parts"
      :key="linePartIndex"
      :style="{ marginRight: linePart.space || '100px' }"
      v-html="linePart.text"
    />
  </span>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  fontReplacements: Array as PropType<number[][]>,
  lineBreaks: Array as PropType<number[]>,
  lineSpacers: Array as PropType<{ [key: number]: string }>,
  wordSpacers: Array as PropType<{ [key: number]: string }>
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
    if (props.wordSpacers && Object.keys(props.wordSpacers).includes(wordIndex.toString())) {
      lineParts.push({ text: linePart.join(' '), space: props.wordSpacers[wordIndex] })
      linePart.length = 0
    }
    if (props.lineBreaks?.includes(wordIndex)) {
      lineParts.push({ text: linePart.join(' ') })
      linePart.length = 0

      lines.push({ parts: [...lineParts], space: props.lineSpacers?.[lines.length] })
      lineParts.length = 0
    }
  }

  lineParts.push({ text: linePart.join(' ') })
  lines.push({ parts: lineParts, space: props.lineSpacers?.[lines.length] })

  return lines
})
</script>

<style scoped lang="scss">
</style>
