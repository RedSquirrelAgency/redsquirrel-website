<template>
  <section
    ref="containerRef"
    class="container"
  >
    <div class="canvas">
      <TresCanvas v-bind="gl">
        <TextureBackground>
          <TresPerspectiveCamera
            :fov="70"
            :look-at="[0, 0, 0]"
            :position="cameraPosition"
          />
          <TresDirectionalLight
            color="white"
            :position="new Vector3(0, 10, 40)"
            :intensity="3"
          />
          <FloatingStarsParticle
            alpha-map="star_alpha_map.png"
            color="#FFD2BB"
            :radius="50"
            :depth="40"
            :count="500"
            :size="1"
          />
          <Suspense>
            <TexturedText
              map="text_gradient.png"
              :size="0.8"
              :position="textPosition"
              :opacity="textOpacity"
            />
          </Suspense>
          <Levioso>
            <Suspense>
              <SquirrelComponent
                :position="squirrelPosition"
                :rotation="squirrelRotation"
                :sparkle="true"
                :transmission="1"
                :roughness="0"
                :thickness="1"
                :ior="5"
                :scale="0.016"
              />
            </Suspense>
          </Levioso>
        </TextureBackground>
      </TresCanvas>
    </div>
    <div class="overlay">
      <v-row class="footer d-flex align-end">
        <v-col class="d-flex justify-start">
          <FacebookRating />
        </v-col>
        <v-spacer />
        <v-col class="d-flex justify-end">
          <div class="button-container text-right">
            <p>{{ $t("A website with a creative design and complex SEO promotion") }} </p>
            <ConsultationButton block />
          </div>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace, Vector3 } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
import type { PropType } from 'vue'
import SquirrelComponent from '~/components/SquirrelComponent.vue'
import TextureBackground from '~/components/TextureBackground.vue'
import Timeline = gsap.core.Timeline
import TexturedText from '~/components/TexturedText.vue'
import ConsultationButton from '~/components/ConsultationButton.vue'

const props = defineProps({
  tl: {
    type: Object as PropType<Timeline>,
    required: true
  },
  loaded: {
    type: Boolean,
    required: true
  },
  displayed: {
    type: Boolean,
    required: true
  }
})

const gl = {
  shadows: true,
  alpha: false,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}

const { $gsap } = useNuxtApp()
const containerRef = ref<HTMLElement | null>(null)
const squirrelPosition = shallowRef([0, -2, 0])
const squirrelRotation = shallowRef([0, 0, 0])
const cameraPosition = shallowRef([0, 0, 0])
const textOpacity = ref(0)
const textPosition = ref([0, 0, -2])
const mouseMoveEnabled = shallowRef(false)

const cameraPositionVector = new Vector3()
function updateCameraPosition() {
  cameraPosition.value = [
    cameraPositionVector.x,
    cameraPositionVector.y,
    cameraPositionVector.z
  ]
}

const squirrelPositionVector = new Vector3()
function updateSquirrelPosition() {
  squirrelPosition.value = [
    squirrelPositionVector.x,
    squirrelPositionVector.y,
    squirrelPositionVector.z
  ]
}

const squirrelRotationVector = new Vector3()
function updateSquirrelRotation() {
  squirrelRotation.value = [
    squirrelRotationVector.x,
    squirrelRotationVector.y,
    squirrelRotationVector.z
  ]
}

const textPositionVector = new Vector3()
function updateTextPosition() {
  textPosition.value = [
    textPositionVector.x,
    textPositionVector.y,
    textPositionVector.z
  ]
}

function onMouseUpdate(e: MouseEvent) {
  if (!mouseMoveEnabled.value) return
  const mouseMoveFactor = e.x / window.innerWidth
  squirrelRotationVector.y = degToRad(180 * mouseMoveFactor - 90)
  updateSquirrelRotation()
}

onMounted(() => {
  document.addEventListener('mouseenter', onMouseUpdate)
  document.addEventListener('mousemove', onMouseUpdate)

  if (!containerRef.value) return
  const container = containerRef.value

  props.tl.fromTo(cameraPositionVector,
    { z: 4 },
    { z: 3, onUpdate: () => updateCameraPosition() }
  )

  watch(() => props.displayed, (displayed) => {
    if (!props.loaded) return
    if (displayed) {
      container.style.display = 'block'
      $gsap.timeline().to(container, { opacity: 1, duration: 0.5 })
    }
    else {
      $gsap.timeline({
        onComplete: () => {
          container.style.display = 'none'
        }
      }).to(cameraPositionVector, {
        z: 1,
        duration: 0.7,
        onUpdate: () => updateCameraPosition()
      }).to(container, { opacity: 0, duration: 0.5 }, '<0.3')
    }
  })

  watch(() => props.loaded, (loaded) => {
    if (loaded) {
      mouseMoveEnabled.value = false
      $gsap.timeline(
        {
          delay: 0.7,
          onComplete: () => { mouseMoveEnabled.value = true }
        }
      ).fromTo(textOpacity,
        { value: 0 },
        {
          value: 1,
          duration: 1
        }
      ).fromTo(textPositionVector,
        { z: 3 },
        {
          z: -2,
          duration: 1,
          onUpdate: () => updateTextPosition()
        },
        '<='
      ).fromTo(container.querySelector('.footer'),
        { yPercent: 120 },
        { yPercent: 0, duration: 1, ease: 'circ.out' },
        '>-0.5'
      ).fromTo(squirrelPositionVector,
        { y: 5 },
        {
          y: -1,
          duration: 3,
          ease: 'circ.out',
          onUpdate: () => updateSquirrelPosition()
        },
        '>-0.5'
      )
    }
  })
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: -webkit-linear-gradient(#B87C6A, #DF8B6B, #EE936B, #FEAE79, #F4C5A1, #DDCABA);
}

#particles {
  position: absolute;
  width: 100%;
  height: 100vh;
}

.underlay {
  position: absolute;
  width: 100%;
  height: 100vh;
}

.canvas {
  position: absolute;
  width: 100%;
  height: inherit;
  color: transparent;
}

.overlay {
  width: 100%;
  height: inherit;
  display: flex;
  padding: 2vw 8vw;

  .footer {
    display: flex;
    align-self: end;
    color: $redsquirrel-cream-m1;
    font-size: 1vw;

    .button-container {
      width: 18vw;

      p {
        text-transform: uppercase;
        margin-bottom: 2vw;
      }
    }
  }
}
</style>
