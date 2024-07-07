<template>
  <div ref="textRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()
const textRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!textRef.value) return
  const text = textRef.value

  $gsap.fromTo(
    text,
    {
      yPercent: 30,
      opacity: 0
    },
    {
      scrollTrigger: {
        trigger: text,
        start: 'top center',
        toggleActions: 'play none resume reverse'
      },
      yPercent: 0,
      opacity: 1,
      duration: 0.8
    }
  )
})
</script>
