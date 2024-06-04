<template>
  <div class="d-flex justify-center">
    <div class="header">
      <h2 class="text-center">
        <span class="line">St<span class="style-script">a</span>ges tran<span class="style-script">s</span>paren<span class="style-script">c</span>y</span>
      </h2>
      <div class="subtitle text-center text-uppercase">
        <span class="line">Thanks to aligning important stages and safeguarding our decisions,</span>
        <span class="line">we can manage to fully meet your expectations</span>
      </div>
    </div>
    <div class="canvas">
      <TresCanvas v-bind="gl">
        <TresPerspectiveCamera :position="cameraPosition" />
        <StageTresComponent
          v-for="(stage, index) in stages"
          v-bind="stage"
          :key="index"
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
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}

useScrollAnimation({
  valueFrom: 300,
  valueTo: -500,
  onChange: (value: number) => {
    const z = value / 100
    cameraPosition.value = [0, 0, z]
  },
  onScrollUpOverflow: back
})

const stages = [
  {
    title: 'Free Consultation',
    subtitle: 'We introduce ourselves, delve into your task, ask crucial questions, provide a price proposal (up to 3 working days), and sign the contract',
    position: [-1.5, -0.4, 0]
  },
  {
    title: 'Analytics',
    subtitle: [
      'Briefing in the format of an online meeting (usually up to 2 hours)',
      'Market and Competitor Analysis',
      'Audience research and creation of audience personas'
    ],
    position: [1.5, 0, -1]
  },
  {
    title: 'Prototyping',
    subtitle: [
      'Writing understandable texts',
      'Prototype development + approval'
    ],
    position: [-1, 0.4, -5]
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

.subtitle {
  color: $redsquirrel-cream;
}
</style>
