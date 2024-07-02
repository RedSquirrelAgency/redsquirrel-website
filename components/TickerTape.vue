<template>
  <div class="ticker-wrap">
    <div
      class="ticker"
      :style="style"
    >
      <span
        class="item-collection-1"
        :style="style"
      >
        <slot />
        <slot />
        <slot />
        <slot />
      </span>
      <span class="item-collection-2">
        <slot />
        <slot />
        <slot />
        <slot />
      </span>
    </div>
    <div />
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
.ticker-wrap {
  display: flex;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  white-space: nowrap;
}
.ticker {
  display: inline-block;
  margin-top: 5px;
  animation: marquee 20s linear infinite;
}
.item-collection-1 {
  position: relative;
  left: 0;
  animation: swap 20s linear infinite;
}

/* Transition */
@keyframes marquee {
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-100%)
  }
}

@keyframes swap {
  0%, 50% {
    left: 0;
  }
  50.01%,
  100% {
    left: 100%;
  }
}
</style>
