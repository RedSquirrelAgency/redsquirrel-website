<template>
  <section
    ref="containerRef"
    class="container"
  >
    <div class="underlay d-flex justify-center align-center">
      <NuxtParticles
        id="particles"
        :options="particlesOptions"
      />
      <h1>
        RedSquirrel
      </h1>
    </div>
    <div class="canvas">
      <TresCanvas v-bind="gl">
        <TresPerspectiveCamera
          :fov="70"
          :look-at="[0, 0, 0]"
          :position="cameraPosition"
        />
        <Suspense>
          <SquirrelTresComponent
            :position="squirrelPosition"
            :rotation="squirrelRotation"
            :sparkle="true"
            :transmission="0.9"
            :roughness="0.1"
            :thickness="1"
            :ior="5"
          />
        </Suspense>
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
            <p>The website with a creative design and persuasive content</p>
            <v-btn
              class="consultation-button"
              rounded="lg"
              append-icon="mdi-arrow-right"
              color="#FFDFCFE5"
              variant="flat"
              block
            >
              {{ $t("Book a consultation") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BasicShadowMap, Clock, NoToneMapping, SRGBColorSpace, Vector3 } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
import type { PropType } from 'vue'
import SquirrelTresComponent from '~/components/SquirrelTresComponent.vue'
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
  clearColor: 0x000000,
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}

const particlesOptions = {
  fullScreen: { enable: false },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' }
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
        factor: 100,
        speed: 1,
        maxSpeed: 20,
        easing: 'ease-out-quad'
      }
    }
  },
  particles: {
    number: {
      value: 160
    },
    color: {
      value: '#FFD2BB'
    },
    shape: {
      type: 'circle',
      close: true,
      fill: true
    },
    opacity: {
      value: {
        min: 0.1,
        max: 1
      }
    },
    size: {
      value: {
        min: 2,
        max: 4
      }
    },
    collisions: {
      absorb: {
        speed: 2
      },
      bounce: {
        horizontal: {
          value: 1
        },
        vertical: {
          value: 1
        }
      },
      enable: true,
      maxSpeed: 50,
      mode: 'bounce',
      overlap: {
        enable: true,
        retries: 0
      }
    },
    move: {
      enable: true,
      speed: 1,
      random: true
    }
  },
  detectRetina: true
}

const { $gsap } = useNuxtApp()
const containerRef = ref<HTMLElement | null>(null)
const squirrelPosition = shallowRef([0, 0, 0])
const squirrelRotation = shallowRef([0, 0, 0])
const cameraPosition = shallowRef([0, 0, 1])
const mouseMoveEnabled = shallowRef(false)

const cameraPositionVector = new Vector3()
function updateCameraPosition() {
  cameraPosition.value = [
    cameraPositionVector.x,
    cameraPositionVector.y,
    cameraPositionVector.z
  ]
}

onMounted(() => {
  const clock = new Clock()

  document.addEventListener('mousemove', (e) => {
    if (!mouseMoveEnabled.value) return
    const percentageX = e.x / window.innerWidth
    squirrelRotation.value[1] = degToRad(180 * percentageX - 90)
    squirrelRotation.value = [...squirrelRotation.value]
  })

  useRenderLoop().onLoop(() => {
    const time = clock.getElapsedTime()
    squirrelPosition.value[1] = Math.cos(time) * 0.1 - 1
    squirrelPosition.value = [...squirrelPosition.value]
  })

  if (!containerRef.value) return
  const container = containerRef.value

  props.tl.fromTo(cameraPositionVector,
    { z: 4 },
    { z: 3,
      onUpdate: () => updateCameraPosition()
    }
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
      $gsap.timeline({
        delay: 0.7,
        onComplete: () => { mouseMoveEnabled.value = true }
      })
        .fromTo(container.querySelector('.canvas'),
          { opacity: 0 },
          { opacity: 1, duration: 1 }
        )
        .fromTo(cameraPositionVector,
          { z: 20 },
          {
            z: 4,
            duration: 1,
            onUpdate: () => updateCameraPosition(),
            ease: 'circ.out'
          }, '<0.1')
        .fromTo(container.querySelector('h1'),
          { letterSpacing: '-0.5em', opacity: 0 },
          {
            letterSpacing: '0',
            opacity: 1,
            duration: 0.7,
            keyframes: {
              '0%': { opacity: 0 },
              '40%': { opacity: 0.6 },
              '100%': { opacity: 1 }
            }
          },
          '>-0.7'
        )
        .fromTo(container.querySelector('.footer'),
          { yPercent: 100 },
          { yPercent: 0, duration: 1, ease: 'elastic.out(1,0.3)' },
          '>'
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

  @keyframes zoom {
    0% {
      rotate: 0;
    }
    100% {
      rotate: 360deg;
    }
  }
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
}

.overlay {
  width: 100%;
  height: inherit;
  display: flex;
  padding: 30px 120px;

  .footer {
    display: flex;
    align-self: end;
    color: $redsquirrel-cream-m1;
    font-size: 15px;

    .button-container {
      width: 260px;

      p {
        text-transform: uppercase;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
