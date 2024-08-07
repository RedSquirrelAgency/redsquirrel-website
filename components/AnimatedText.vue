<template>
  <div ref="textRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()
const textRef = ref<HTMLElement | null>(null)

const { start } = defineProps({
  start: {
    type: String,
    default: 'top center'
  }
})

onMounted(() => {
  if (!textRef.value) return
  const text = textRef.value

  $gsap.effects.slideTop(
    text,
    {
      duration: 0.8,
      scrollTrigger: {
        trigger: text,
        start,
        toggleActions: 'play none resume reverse'
      }
    }
  )
})
</script>
