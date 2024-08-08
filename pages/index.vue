<template>
  <div>
    <Transition>
      <FullScreenPreloader
        v-if="loading < 1"
        :progress="loading"
      />
    </Transition>
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
    <AnchorTag hash="stages" />
    <StagesSection />
    <AnchorTag hash="reviews" />
    <ReviewsSection />
    <AnchorTag
      hash="contact"
      :offset="900"
    />
    <CallToActionSection />
    <BlogSection />
  </div>
</template>

<script setup lang="ts">
import { useGoTo } from 'vuetify'
import AnchorTag from '~/components/AnchorTag.vue'

const loading = ref(0)
const appBarVariant = ref<AppBarVariant>('fixed')
const router = useRouter()
const goTo = useGoTo()

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
        goTo(hash)
      }
    }
  }, 100)
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
