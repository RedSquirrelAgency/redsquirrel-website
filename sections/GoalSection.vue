<template>
  <section
    ref="containerRef"
    class="container"
  >
    <p>
      <FillingText
        :key="progress"
        :text="$t(text)"
        :progress="progress"
        color="#FFAE83"
        filled-color="#FEE4C9"
      />
    </p>
  </section>
</template>

<script setup lang="ts">
import FillingText from '~/components/FillingText.vue'

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
        progress.value = scroll.progress
      }
    },
    defaults: { ease: 'none' }
  })
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  padding: 8vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

p {
  font-size: 3.1vw;
  text-indent: 5vw;
  line-height: 3.5vw;
  text-transform: uppercase;
  font-weight: 400;
}
</style>
