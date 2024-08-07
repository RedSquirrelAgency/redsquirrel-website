<template>
  <section ref="containerRef">
    <div
      v-if="mdAndUp"
      class="overlay"
    >
      <v-row class="footer d-flex align-end">
        <v-col class="d-flex justify-start">
          <FacebookRating />
        </v-col>
        <v-spacer />
        <v-col class="d-flex justify-end">
          <div class="button-container">
            <p>
              <HeadingText
                :text="$t('A website with a creative design and complex SEO promotion')"
                :line-breaks="[5]"
              />
            </p>
            <ConsultationButton block />
          </div>
        </v-col>
      </v-row>
    </div>
    <div
      v-else
      class="overlay"
    >
      <v-col class="content">
        <v-row class="header d-flex justify-center text-center">
          <FacebookRating />
        </v-row>
        <v-row class="footer">
          <p>
            <HeadingText
              :text="$t('A website with a creative design and complex SEO promotion')"
              :line-breaks="[5]"
            />
          </p>
          <ConsultationButton block />
        </v-row>
      </v-col>
    </div>

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
          <Suspense v-if="$vuetify.display.mdAndUp">
            <TexturedText
              map="text_gradient.png"
              text="REDSQUIRREL"
              :size="0.8"
              :position="textPosition"
              :opacity="textOpacity"
            />
          </Suspense>
          <TresGroup
            v-else
            :position="textPosition"
          >
            <TresMesh>
              <Suspense>
                <TexturedText
                  map="text_gradient.png"
                  text="RED"
                  :size="2.9"
                  :opacity="textOpacity"
                  :position="[0, 0.65, 0]"
                />
              </Suspense>
              <Suspense>
                <TexturedText
                  map="text_gradient.png"
                  text="SQUIRREL"
                  :size="1.2"
                  :opacity="textOpacity"
                  :position="[0, -0.65, 0]"
                />
              </Suspense>
            </TresMesh>
          </TresGroup>
          <Levioso>
            <Suspense>
              <SquirrelComponent
                :position="squirrelPosition"
                :rotation="squirrelRotation"
                :scale="squirrelScale"
                :sparkle="true"
                :transmission="1"
                :roughness="0"
                :thickness="1"
                :ior="5"
              />
            </Suspense>
          </Levioso>
        </TextureBackground>
      </TresCanvas>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace, Vector3 } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
import { useDisplay } from 'vuetify'
import type { PropType } from 'vue'
import Timeline = gsap.core.Timeline

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
const { mdAndUp } = useDisplay()

const containerRef = ref()

const cameraPositionVector = new Vector3()
const cameraPosition = shallowRef(cameraPositionVector.toArray())

const getTextPositionVectorDefault = () => mdAndUp.value
  ? new Vector3(0, 0, -2)
  : new Vector3(0, 0.5, -2)
const textPositionVector = getTextPositionVectorDefault()
const textPosition = shallowRef(textPositionVector.toArray())

const getSquirrelPositionVectorDefault = () => mdAndUp.value
  ? new Vector3(0, -1, 0)
  : new Vector3(0, -0.7, 0)
const squirrelPositionVector = getSquirrelPositionVectorDefault()
const squirrelPosition = shallowRef(squirrelPositionVector.toArray())

const squirrelRotationVector = new Vector3()
const squirrelRotation = shallowRef(squirrelRotationVector.toArray())

const textOpacity = shallowRef(0)
const squirrelScale = computed(() => mdAndUp.value ? 0.016 : 0.045)

const mouseMoveEnabled = shallowRef(false)

function onMouseUpdate(e: MouseEvent) {
  if (!mouseMoveEnabled.value) {
    return
  }
  const mouseMoveFactor = e.x / window.innerWidth
  squirrelRotationVector.y = degToRad(180 * mouseMoveFactor - 90)
  squirrelRotation.value = squirrelRotationVector.toArray()
}

onMounted(() => {
  document.addEventListener('mouseenter', onMouseUpdate)
  document.addEventListener('mousemove', onMouseUpdate)

  if (!containerRef.value) {
    return
  }
  const container = containerRef.value
  const header = container.querySelector('.header')
  const footer = container.querySelector('.footer')

  watch(() => mdAndUp.value, () => {
    squirrelPositionVector.copy(getSquirrelPositionVectorDefault())
    squirrelPosition.value = squirrelPositionVector.toArray()

    textPositionVector.copy(getTextPositionVectorDefault())
    textPosition.value = textPositionVector.toArray()
  })

  props.tl.fromTo(cameraPositionVector,
    { z: 4 },
    { z: 3, onUpdate: () => { cameraPosition.value = cameraPositionVector.toArray() } }
  )

  watch(() => props.displayed, (displayed) => {
    if (!props.loaded) {
      return
    }
    if (displayed) {
      $gsap.set(header, { opacity: 1 })
      $gsap.set(footer, { opacity: 1 })

      container.style.display = 'block'

      $gsap.timeline()
        .to(container, { opacity: 1, duration: 0.5 })
    }
    else {
      const tl = $gsap.timeline({
        onComplete: () => {
          container.style.display = 'none'
        }
      })

      // Squirrel fly away animation
      tl.to(cameraPositionVector, {
        z: 1,
        duration: 0.7,
        onUpdate: () => { cameraPosition.value = cameraPositionVector.toArray() }
      }).to(container, { opacity: 0, duration: 0.5 }, '<0.3')

      tl.to(header,
        { opacity: 0, duration: 0.5 }, '>-0.8'
      )

      tl.to(footer,
        { opacity: 0, duration: 0.5 }, '<'
      )
    }
  })

  watch(() => props.loaded, (loaded) => {
    if (loaded) {
      mouseMoveEnabled.value = false
      const tl = $gsap.timeline(
        {
          delay: 0.7,
          onComplete: () => { mouseMoveEnabled.value = true }
        }
      )

      // REDSQUIRREL text zoom out animation
      tl.fromTo(textOpacity,
        { value: 0 },
        {
          value: 1,
          duration: 1
        }
      ).fromTo(textPositionVector,
        { z: 3 },
        {
          z: textPositionVector.z,
          duration: 1,
          onUpdate: () => { textPosition.value = textPositionVector.toArray() }
        },
        '<='
      )

      // Footer appear from bottom animation
      tl.fromTo(footer,
        { yPercent: 120 },
        { yPercent: 0, duration: 1, ease: 'circ.out' },
        '>-0.5'
      )

      // Squirrel fall down animation
      tl.fromTo(squirrelPositionVector,
        { y: 5 },
        {
          y: squirrelPositionVector.y,
          duration: 3,
          ease: 'circ.out',
          onUpdate: () => { squirrelPosition.value = squirrelPositionVector.toArray() }
        },
        '>-0.5'
      )

      // Header dissolve animation
      tl.dissolve(header,
        { duration: 1 },
        '>-0.5'
      )
    }
  })
})
</script>

<style scoped lang="scss">
@import "styles/variables";
@import "vuetify/settings";

section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: -webkit-linear-gradient(#B87C6A, #DF8B6B, #EE936B, #FEAE79, #F4C5A1, #DDCABA);
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;
  color: transparent;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;
  display: flex;
  z-index: 10;
  color: $redsquirrel-cream-m1;
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .overlay {
    padding: 2vw 8vw;
    font-size: 1vw;

    .button-container {
      width: 18vw;
      text-align: right;

      p {
        text-transform: uppercase;
        margin-bottom: 2vw;
      }
    }
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .overlay {
    padding: 18.75vw 3.125vw 25vw;
    font-size: 3vw;
    line-height: 4vw;

    .content {
      display: flex;
      flex-direction: column;
    }

    .footer {
      display: flex;
      align-content: flex-end;
      text-align: left;

      font-size: 4.68vw;
      line-height: 7vw;

      p {
        text-transform: uppercase;
        margin-bottom: 6.25vw;
      }
    }
  }
}
</style>
