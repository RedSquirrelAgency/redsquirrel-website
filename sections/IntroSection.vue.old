<template>
  <div
    ref="containerRef"
    class="container"
  >
    <HeroSection :tl="heroTl" />
    <TestimonialsSection :tl="testimonialsTl" />
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()
const heroTl = $gsap.timeline()
const testimonialsTl = $gsap.timeline()

const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!containerRef.value) return
  const container = containerRef.value
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=100%',
      scrub: true,
      pin: true
    },
    defaults: { ease: 'none' }
  })
  tl.add(heroTl)
  tl.add(testimonialsTl)
})
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100%;
}
</style>
