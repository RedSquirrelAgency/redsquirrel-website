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
      <StagesSection />
      <ReviewsSection />
      <BookSection />
      <FooterSection />
    </BackgroundContainer>
  </v-app>
</template>

<script setup lang="ts">
const loading = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    loading.value += 0.2
    if (loading.value >= 1) {
      clearInterval(interval)
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
