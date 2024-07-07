<template>
  <v-app>
    <Transition>
      <FullScreenPreloader
        v-if="loading < 1"
        :progress="loading"
      />
    </Transition>
    <BackgroundContainer>
      <IntroSection :loaded="loading === 1" />
      <CasesSection />
      <AdvantagesSection />
      <GoalSection />
      <TeamSection />
      <!-- <StagesSection /> -->
      <ReviewsSection />
      <CallToActionSection />
      <FooterSection />
    </BackgroundContainer>
  </v-app>
</template>

<script setup lang="ts">
import CallToActionSection from "~/sections/CallToActionSection.vue";

const loading = ref(0)
const { $gsap } = useNuxtApp()

const effects = [
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

onMounted(() => {
  const interval = setInterval(() => {
    loading.value += 0.2
    if (loading.value >= 1) {
      clearInterval(interval)
    }
  }, 100)

  for (const effect of effects) {
    $gsap.registerEffect(effect)
  }
})
</script>

<style lang="scss">
.v-leave-active {
  transition: opacity 1s ease;
}

.v-leave-to {
  opacity: 0;
}
</style>
