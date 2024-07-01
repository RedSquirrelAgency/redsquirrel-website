<template>
  <div
    :key="progress"
    class="container"
  >
    <div>{{ formatPercentage(progress) }}</div>
    <div>
      <FillingText
        text="Please wait until the website is ready."
        :progress="progress"
        color="#FFD2BB"
        filled-color="#FFFBF7"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
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
  z-index: 10;
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
  font-size: 20px;
  line-height: 30px;
  font-weight: 500;
}
</style>
