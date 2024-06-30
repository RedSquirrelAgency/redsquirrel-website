<template>
  <div
    ref="containerRef"
    class="container"
  >
    <div class="header">
      <h2 class="gradient-1 text-center">
        <HeadingText
          text="Stages transparency"
          :font-replacements="[[0, 2], [1, 4], [1, 10]]"
        />
      </h2>
      <h4 class="text-center">
        <span class="line">Thanks to aligning important stages and safeguarding our decisions,</span>
        <span class="line">we can manage to fully meet your expectations</span>
      </h4>
    </div>
    <div class="canvas">
      <TresCanvas v-bind="gl">
        <TresPerspectiveCamera :position="cameraPosition" />
        <StageTresComponent
          v-for="(stage, index) in stages"
          v-bind="stage"
          :key="index"
          :index="index"
          :visible="true"
        />
        <TresAmbientLight />
      </TresCanvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: 0x000000,
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}

const { $gsap } = useNuxtApp()
const containerRef = ref<HTMLElement | null>(null)
const cameraPosition = shallowRef([0, 0, 0])

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
        const start = 3
        const end = -13
        const coordinate = start + (end - start) * scroll.progress
        cameraPosition.value = [0, 0, coordinate]
      }
    },
    defaults: { ease: 'none' }
  })
})

const stages = [
  {
    title: 'Free Consultation',
    subtitle: 'We introduce ourselves, delve into your task, ask crucial questions, provide a price proposal (up to 3 working days), and sign the contract',
    position: [-1.5, 0, 0]
  },
  {
    title: 'Analytics',
    subtitle: [
      'Briefing in the format of an online meeting (usually up to 2 hours)',
      'Market and Competitor Analysis',
      'Audience research and creation of audience personas'
    ],
    position: [1.5, 0, -2.5]
  },
  {
    title: 'Prototyping',
    subtitle: [
      'Writing understandable texts',
      'Prototype development + approval'
    ],
    position: [-1, 0, -5]
  },
  {
    title: 'Design',
    subtitle: [
      'Selection of design references',
      'Preparation of mood board + approval',
      'Drawing up design concept + approval',
      'Drawing up the mobile version and UI kit'
    ],
    position: [1, 0, -7.5]
  },
  {
    title: 'Development',
    subtitle: [
      'Website layout and animation implementation',
      'Integration with CMS WordPress + approval',
      'Website hosting and domain linking',
      'Integration of additional solutions'
    ],
    position: [-1.5, 0, -10]
  },
  {
    title: 'Testing and Delivery',
    subtitle: [
      'Checking website functionality on different devices and browsers',
      'Basic SEO optimization',
      'Preparation of website management instructions',
      'Handover of all source files',
      '30-day free support'
    ],
    position: [1.5, 0, -12.5]
  }
]
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  padding: 50px 0;
  height: 100vh;
}

.canvas {
  position: relative;
  width: 100%;
  height: 1000px;
}

.header {
  position: absolute;
  width: 100%;
}
</style>
