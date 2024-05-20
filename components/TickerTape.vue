<template>
  <div
    class="ticker-tape-container"
  >
    <div
      class="ticker-tape"
      :style="style"
    >
      <slot />
    </div>
    <div
      class="ticker-tape"
      aria-hidden="true"
      :style="style"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  direction: String,
  duration: Number
})

const style = shallowRef({
  'animation-direction': props.direction,
  'animation-duration': `${props.duration}s`
})
</script>

<style scoped lang="scss">
.ticker-tape-container {
  overflow-x: hidden;
  display: flex;
  max-width: 100vw;
  width: 100%;
}

.ticker-tape {
  display: flex;
  align-items: start;
  flex: 0 0 auto;
  gap: 0;
  margin-right: 100px;
  min-width: 100%;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
    background-position: 0 center;
  }
  100% {
    transform: translateX(-100%);
    background-position: 100vw center;
  }
}
</style>
