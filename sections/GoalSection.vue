<template>
  <section
    ref="containerRef"
    class="container"
  >
    <h2 class="header">
      <span
        v-for="(letter, index) in text.split('')"
        :key="index"
        :class="(index < progress) && 'filled'"
      >
        {{ letter }}
      </span>
    </h2>
  </section>
</template>

<script setup lang="ts">
const text
    = 'Our goal is to be a beneficial partner for you and develop a solution that helps achieve your business goals and automate processes. We value eco-friendly interaction with our clients.'

const { $gsap } = useNuxtApp()
const containerRef = ref<HTMLElement | null>(null)
const progress = shallowRef(0)

onMounted(() => {
  if (!containerRef.value) return
  const container = containerRef.value
  $gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=100%',
      scrub: true,
      pin: true,
      onUpdate: (scroll) => {
        progress.value = Math.round(scroll.progress * text.length)
      }
    },
    defaults: { ease: 'none' }
  })
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  padding: 120px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header {
  font-size: 50px;
  line-height: 57.5px;
  text-transform: uppercase;
  font-weight: 400;

  span {
    color: #FFAE83;

    &.filled {
      color: $redsquirrel-cream;
    }
  }
}
</style>
