<template>
  <div>
    <h1 class="header">
      <span
        v-for="(letter, index) in text.split('')"
        :key="index"
        :class="(index <= progress) && 'filled'"
      >
        {{ letter }}
      </span>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

const text
    = 'Our goal is to be a beneficial partner for you and develop a solution that helps achieve your business goals and automate processes. We value eco-friendly interaction with our clients.'

const progress = shallowRef(0)

useScrollAnimation({
  valueFrom: 0,
  valueTo: text.length,
  onChange: (value: number) => {
    progress.value = value
  },
  onScrollUpOverflow: back,
  onScrollDownOverflow: next
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.header {
  font-size: 50px;
  line-height: 57.5px;
  text-transform: uppercase;
  font-weight: 400;
  margin: 120px;

  span {
    color: #FFAE83;

    &.filled {
      color: $redsquirrel-cream;
    }
  }
}
</style>
