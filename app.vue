<template>
  <v-app class="app">
    <transition
      :css="false"
      appear
      @enter="onEnter"
      @leave="onLeave"
    >
      <BackgroundContainer v-if="activeSection.background">
        <transition
          :css="false"
          @enter="onEnter"
          @leave="onLeave"
        >
          <component
            :is="activeSection.component"
            v-bind="currentProps"
            @next="onNext"
            @back="onBack"
          />
        </transition>
      </BackgroundContainer>
      <component
        :is="activeSection.component"
        v-else
        v-bind="currentProps"
        @next="onNext"
        @back="onBack"
      />
    </transition>
  </v-app>
</template>

<script setup lang="ts">
import HeroSection from '~/sections/HeroSection.vue'
import TestimonialsSection from '~/sections/TestimonialsSection.vue'
import PortfolioSection from '~/sections/PortfolioSection.vue'
import AdvantagesSection from '~/sections/AdvantagesSection.vue'
import GoalSection from '~/sections/GoalSection.vue'
import StagesSection from '~/sections/StagesSection.vue'
import ReviewsSection from '~/sections/ReviewsSection.vue'
import BookSection from '~/sections/BookSection.vue'
import TeamSection from '~/sections/TeamSection.vue'

const sectionsOrder = [
  { hash: 'hero', component: HeroSection, background: false },
  { hash: 'testimonials', component: TestimonialsSection, background: false },
  { hash: 'cases', component: PortfolioSection, background: true },
  { hash: 'advantages', component: AdvantagesSection, background: true },
  { hash: 'goal', component: GoalSection, background: true },
  { hash: 'team', component: TeamSection, background: true },
  { hash: 'stages', component: StagesSection, background: true },
  { hash: 'reviews', component: ReviewsSection, background: true },
  { hash: 'book', component: BookSection, background: false }
]

const index = shallowRef(0)
const activeSection = computed(() => (sectionsOrder[index.value]))
const currentProps = shallowRef({})
const { $gsap } = useNuxtApp()
const router = useRouter()

function onNext() {
  if (index.value + 1 > sectionsOrder.length - 1) return
  index.value++
  router.replace(`#${activeSection.value.hash}`)
  console.log('next', activeSection.value.hash)
}

function onBack() {
  if (index.value < 0) return
  index.value--
  router.replace(`#${activeSection.value.hash}`)
  console.log('back', activeSection.value.hash)
}

function onLeave(el: Element, done: () => void) {
  el.classList.add('current-section')
  $gsap.fromTo(el,
    {
      transform: 'scale(1)',
      filter: 'blur(0px)',
      opacity: 1
    },
    {
      transform: 'scale(2)',
      filter: 'blur(4px)',
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      onComplete: () => {
        el.classList.remove('current-section')
        done()
      }
    })
}

function onEnter(el: Element, done: () => void) {
  el.classList.add('next-section')
  $gsap.fromTo(el,
    {
      transform: 'scale(2)',
      filter: 'blur(4px)',
      opacity: 0
    },
    {
      transform: 'scale(1)',
      filter: 'blur(0px)',
      opacity: 1,
      duration: 1,
      ease: 'power4.out',
      onComplete: () => {
        el.classList.remove('next-section')
        done()
      }
    })
}

onMounted(() => {
  document.addEventListener('wheel', (e: WheelEvent) => e.preventDefault(), { passive: false })
})

onBeforeMount(() => {
  const hash = router.currentRoute.value.hash
  const sectionIndex = sectionsOrder.findIndex(section => `#${section.hash}` === hash)
  if (sectionIndex != -1) {
    index.value = sectionIndex
  }
  else {
    index.value = 0
  }
})
</script>

<style lang="scss">
.app {
  position: relative;
}

.current-section {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
}

.next-section {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
