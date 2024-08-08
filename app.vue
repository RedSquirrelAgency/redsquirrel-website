<template>
  <BackgroundContainer>
    <NuxtPage />
    <FooterSection />
  </BackgroundContainer>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()

onBeforeMount(() => {
  for (const effect of effects) {
    $gsap.registerEffect(effect)
  }
})

const effects = [
  {
    name: 'dissolve',
    effect: (targets: any, config: any) => {
      return $gsap.fromTo(targets,
        {
          opacity: 0
        },
        {
          opacity: 1,
          ...config
        })
    },
    extendTimeline: true
  },
  {
    name: 'scaleIn',
    effect: (targets: any, config: any) => {
      return $gsap.fromTo(targets,
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          ...config
        })
    },
    extendTimeline: true
  },
  {
    name: 'slideTop',
    effect: (targets: any, config: any) => {
      return $gsap.fromTo(targets,
        {
          yPercent: 30,
          opacity: 0
        },
        {
          yPercent: 0,
          opacity: 1,
          ...config
        })
    },
    extendTimeline: true
  },
  {
    name: 'slideBottom',
    effect: (targets: any, config: any) => {
      return $gsap.fromTo(targets,
        {
          yPercent: -30,
          opacity: 0
        },
        {
          yPercent: 0,
          opacity: 1,
          ...config
        })
    },
    extendTimeline: true
  },
  {
    name: 'slideRight',
    effect: (targets: any, config: any) => {
      return $gsap.fromTo(targets,
        {
          xPercent: -30,
          opacity: 0
        },
        {
          xPercent: 0,
          opacity: 1,
          ...config
        })
    },
    extendTimeline: true
  },
  {
    name: 'slideLeft',
    effect: (targets: any, config: any) => {
      return $gsap.fromTo(targets,
        {
          xPercent: 30,
          opacity: 0
        },
        {
          xPercent: 0,
          opacity: 1,
          ...config
        })
    },
    extendTimeline: true
  }
]
</script>

<style scoped lang="scss">

</style>
