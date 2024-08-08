<template>
  <div
    :key="progress"
    :class="mdAndUp ? 'desktop' : 'mobile'"
    class="container"
  >
    <div>{{ formatPercentage(progress) }}</div>
    <div>
      <FillingText
        :text="$t('Please wait until the website is ready.')"
        :progress="progress"
        color="#FFD2BB"
        filled-color="#FFFBF7"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const { progress } = defineProps({
  progress: {
    type: Number,
    required: true
  }
})

function formatPercentage(value: number) {
  if (value < 0) return '0%'
  if (value > 1) return '100%'
  return `${Math.round(value * 100)}%`
}
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  position: fixed;
  z-index: 20000;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: $redsquirrel-peach;

  text-transform: uppercase;
  font-weight: 500;
}

.desktop {
  font-size: 1.38vw;
  line-height: 2vw;
}

.mobile {
  font-size: 4.5vw;
  line-height: 6.75vw;
}
</style>
