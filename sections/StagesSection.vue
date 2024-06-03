<template>
  <div class="d-flex justify-center">
    <h2 class="text-center">
      <span class="line">St<span class="style-script">a</span>ges tran<span class="style-script">s</span>paren<span class="style-script">c</span>y</span>
    </h2>
    <div class="subtitle text-center">
      <span class="line">Thanks to aligning important stages and safeguarding our decisions,</span>
      <span class="line">we can manage to fully meet your expectations</span>
    </div>
    <div class="stages">
      <TresCanvas
        :clear-color="0x000000"
        :alpha="true"
      >
        <CasesTresScene />
      </TresCanvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'
import CasesTresScene from '~/components/CasesTresScene.vue'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

const stages = [
  { title: 'Research', subtitle: 'We analyze the market and your competitors to find the best solutions' }
]

const stageStyles = shallowRef(stages.map(() => ({})))
useScrollAnimation({
  valueFrom: 0,
  valueTo: 100,
  onChange: (value: number) => {
    const zStart = -500
    const zEnd = 0
    const z = zStart + (zEnd - zStart) * (value / 100)

    const xStart = 400
    const xEnd = 0
    const x = xStart + (xEnd - xStart) * (value / 100)

    const stage1Style = {
      transform: `translateZ(${z}px) translateX(${x}px)`,
      opacity: value / 100
    }

    stageStyles.value = [stage1Style]
  },
  onScrollUpOverflow: back
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.stages {
  position: absolute;
  width: 100%;
  height: 100%;
}

.subtitle {
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  color: $redsquirrel-cream;
  text-transform: uppercase;
  width: 70%;
  margin: 20px auto 0;
}
</style>
