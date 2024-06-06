<template>
  <div class="d-flex justify-center">
    <div class="header">
      <h2 class="text-center">
        <span class="line">St<span class="style-script">a</span>ges tran<span class="style-script">s</span>paren<span class="style-script">c</span>y</span>
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
          :visible="stage.position[2] >= cameraPosition[2] - 7"
          :index="index"
        />
        <TresAmbientLight />
      </TresCanvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

const cameraPosition = shallowRef([0, 0, 0])

const gl = {
  clearColor: 0x000000,
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}

useScrollAnimation({
  valueFrom: 300,
  valueTo: -2000,
  onChange: (value: number) => {
    const z = value / 100
    cameraPosition.value = [0, 0, z]
  },
  onScrollUpOverflow: back,
  onScrollDownOverflow: next
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

.header {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
}

.canvas {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
