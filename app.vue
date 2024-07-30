<template>
  <v-app>
    <Transition>
      <FullScreenPreloader
        v-if="loading < 1"
        :progress="loading"
      />
    </Transition>
    <BackgroundContainer>
      <AppBar :variant="appBarVariant" />
      <IntroSection
        :loaded="loading === 1"
        @slide-change="onSlideChange"
      />
      <AnchorTag hash="cases" />
      <CasesSection />
      <AnchorTag hash="advantages" />
      <AdvantagesSection />
      <GoalSection />
      <TeamSection />
      <AnchorTag hash="reviews" />
      <ReviewsSection />
      <AnchorTag
        hash="contact"
        :offset="900"
      />
      <CallToActionSection />
      <BlogSection />
      <FooterSection />
    </BackgroundContainer>
  </v-app>
</template>

<script setup lang="ts">
const loading = ref(0)
const appBarVariant = ref<AppBarVariant>('fixed')
const { $gsap } = useNuxtApp()
const router = useRouter()

function onSlideChange(slideName: string) {
  if (slideName === 'HeroSection') appBarVariant.value = 'fixed'
  else appBarVariant.value = 'floating'
}

onMounted(() => {
  const interval = setInterval(() => {
    loading.value += 0.2
    if (loading.value >= 1) {
      clearInterval(interval)

      const { hash } = router.currentRoute.value
      if (hash) {
        router.push({ hash })
      }
    }
  }, 100)

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

<style lang="scss">
.v-leave-active {
  transition: opacity 1s ease;
}

.v-leave-to {
  opacity: 0;
}
</style>
