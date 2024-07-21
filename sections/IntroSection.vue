<template>
  <div
    ref="containerRef"
    class="container"
  >
    <component
      :is="slide"
      v-for="(slide, index) in Object.values(slides)"
      :key="index"
      :displayed="index === currentSlideIndex"
      :tl="timelines[index]"
      :loaded="loaded"
    />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/sections/HeroSection.vue'
import QuotesSection from '~/sections/QuotesSection.vue'

const emit = defineEmits(['slideChange'])

const { loaded } = defineProps({
  loaded: {
    type: Boolean,
    required: true
  }
})

const { $gsap } = useNuxtApp()
const containerRef = ref<HTMLElement | null>(null)

const slides = {
  HeroSection: HeroSection,
  QuotesSection: QuotesSection
}

const timelines = Object.values(slides).map(() => {
  return $gsap.timeline()
})
const currentSlideIndex = ref(0)
watch(currentSlideIndex, (slideIndex) => {
  emit('slideChange', Object.keys(slides)[slideIndex])
})

onMounted(() => {
  if (!containerRef.value) return
  const container = containerRef.value

  const scrollTl = $gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=3000px',
      scrub: true,
      pin: true,
      onUpdate: () => {
        const label = scrollTl.previousLabel()
        currentSlideIndex.value = parseInt(label)
      }
    },
    defaults: { ease: 'none' }
  })

  timelines.forEach((tl, index) => {
    scrollTl.addLabel(`${index}`)
    scrollTl.add(tl)
  })
})
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100%;
}
</style>
