<template>
  <div class="container">
    <NuxtParticles
      id="tsparticles"
      url="particles.json"
    />
    <div class="underlay d-flex justify-center align-center">
      <h1>
        RedSquirrel
      </h1>
    </div>
    <div class="canvas">
      <TresCanvas v-bind="gl">
        <TresPerspectiveCamera
          :fov="70"
          :look-at="[0, 0, 0]"
          :zoom="1.5"
        />
        <Suspense>
          <SquirrelTresComponent
            :position="squirrelPosition"
            :rotation="squirrelRotation"
            :sparkle="false"
            :transmission="0.9"
            :roughness="0.1"
            :thickness="1"
            :ior="5"
          />
        </Suspense>
      </TresCanvas>
    </div>
    <div class="overlay">
      <div class="header" />
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
  </div>
</template>

<script setup lang="ts">
// import * as TWEEN from '@tweenjs/tween.js'
import { BasicShadowMap, Clock, NoToneMapping, SRGBColorSpace } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
import SquirrelTresComponent from '~/components/SquirrelTresComponent.vue'

const gl = {
  clearColor: 0x000000,
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}

const options = {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  particles: {
    color: {
      value: '#000'
    },
    links: {
      color: '#000',
      enable: true
    },
    move: {
      enable: true
    },
    number: {
      value: 100
    },
    interactivity: {
      detectOn: 'window',
      events: {
        onHover: {
          enable: true
        }
      }
    }
  }
}

const squirrelPosition = shallowRef([0, -1, 0])
const squirrelRotation = shallowRef([0, 0, 0])

onMounted(() => {
  const clock = new Clock()

  document.addEventListener('mousemove', (e) => {
    const percentageX = e.screenX / window.innerWidth
    squirrelRotation.value[1] = degToRad(180 * percentageX)
    squirrelRotation.value = [...squirrelRotation.value]
  })

  useRenderLoop().onLoop(() => {
    const time = clock.getElapsedTime()
    squirrelPosition.value[1] = Math.cos(time) * 0.1 - 1
    squirrelPosition.value = [...squirrelPosition.value]
  })
})

// useScrollAnimation({
//  valueFrom: 20,
//  valueTo: 0,
//  onChange: () => {},
//  onScrollDownOverflow: () => { squirrelTween.start() }
// })
// const zoom = shallowRef(1)
// const overlayStyle = shallowRef({})
// const squirrelTween = new TWEEN.Tween({ zoom: 0 })
//  .to({ zoom: 4 }, 1500)
//  .easing(TWEEN.Easing.Sinusoidal.In)
//  .onStart(() => {
//    overlayTween.start()
//  })
//  .onUpdate(({ zoom: updatedZoom }) => {
//    zoom.value = updatedZoom
//  })
//
// const overlayTween = new TWEEN.Tween({ opacity: 1, blur: 0 })
//  .to({ opacity: 0, blur: 20 }, 1500)
//  .easing(TWEEN.Easing.Sinusoidal.In)
//  .onUpdate(({ opacity, blur }) => {
//    overlayStyle.value = {
//      opacity,
//      filter: `blur(${blur}px)`
//    }
//  })
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  width: 100%;
  height: 100vh;
  background: -webkit-linear-gradient(#B87C6A, #DF8B6B, #EE936B, #FEAE79, #F4C5A1, #DDCABA);

  //.stars {
  //  position: fixed;
  //  top: 50%;
  //  left: 50%;
  //  height: 1px;
  //  width: 1px;
  //  background-color: $redsquirrel-cream-p1;
  //  border-radius: 100%;
  //  box-shadow: -47vw -47vh 2px 2px $redsquirrel-cream-p1,-50vw -38vh 2px 2px $redsquirrel-cream-p1,31vw 20vh 3px 3px $redsquirrel-cream-p1,-5vw -30vh 1px 1px $redsquirrel-cream-p1,-48vw -30vh 1px 1px $redsquirrel-cream-p1,20vw -48vh 3px 3px $redsquirrel-cream-p1,47vw -31vh 2px 2px $redsquirrel-cream-p1,42vw -8vh 1px 1px $redsquirrel-cream-p1,-13vw 34vh 3px 3px $redsquirrel-cream-p1,-45vw -41vh 3px 3px $redsquirrel-cream-p1,2vw 15vh 2px 2px $redsquirrel-cream-p1,-50vw -9vh 3px 3px $redsquirrel-cream-p1,11vw -49vh 3px 3px $redsquirrel-cream-p1,-3vw 18vh 2px 2px $redsquirrel-cream-p1,17vw 5vh 3px 3px $redsquirrel-cream-p1,7vw 11vh 1px 1px $redsquirrel-cream-p1,29vw 36vh 1px 1px $redsquirrel-cream-p1,-13vw -48vh 1px 1px $redsquirrel-cream-p1,30vw 5vh 1px 1px $redsquirrel-cream-p1,29vw -31vh 3px 3px $redsquirrel-cream-p1,38vw -3vh 1px 1px $redsquirrel-cream-p1,-16vw -34vh 3px 3px $redsquirrel-cream-p1,21vw -6vh 1px 1px $redsquirrel-cream-p1,39vw 29vh 1px 1px $redsquirrel-cream-p1,-28vw -3vh 3px 3px $redsquirrel-cream-p1,36vw 6vh 3px 3px $redsquirrel-cream-p1,-10vw 19vh 1px 1px $redsquirrel-cream-p1,16vw -35vh 2px 2px $redsquirrel-cream-p1,-5vw 43vh 1px 1px $redsquirrel-cream-p1,-24vw 20vh 2px 2px $redsquirrel-cream-p1,9vw 8vh 2px 2px $redsquirrel-cream-p1,-44vw -8vh 2px 2px $redsquirrel-cream-p1,49vw -22vh 1px 1px $redsquirrel-cream-p1,12vw 37vh 2px 2px $redsquirrel-cream-p1,45vw 18vh 1px 1px $redsquirrel-cream-p1,43vw -25vh 3px 3px $redsquirrel-cream-p1,-50vw 1vh 3px 3px $redsquirrel-cream-p1,-6vw -30vh 3px 3px $redsquirrel-cream-p1,-15vw -16vh 1px 1px $redsquirrel-cream-p1,-4vw 22vh 2px 2px $redsquirrel-cream-p1,38vw -30vh 3px 3px $redsquirrel-cream-p1,-25vw -3vh 3px 3px $redsquirrel-cream-p1,35vw -21vh 1px 1px $redsquirrel-cream-p1,-42vw 44vh 2px 2px $redsquirrel-cream-p1,29vw -26vh 1px 1px $redsquirrel-cream-p1,-41vw -39vh 2px 2px $redsquirrel-cream-p1,-21vw -19vh 2px 2px $redsquirrel-cream-p1,-21vw -19vh 3px 3px $redsquirrel-cream-p1,43vw -41vh 3px 3px $redsquirrel-cream-p1,-6vw -22vh 1px 1px $redsquirrel-cream-p1,39vw -25vh 3px 3px $redsquirrel-cream-p1,-45vw -35vh 1px 1px $redsquirrel-cream-p1,15vw -20vh 1px 1px $redsquirrel-cream-p1,-45vw 46vh 1px 1px $redsquirrel-cream-p1,49vw 7vh 2px 2px $redsquirrel-cream-p1,26vw 11vh 1px 1px $redsquirrel-cream-p1,-29vw 3vh 2px 2px $redsquirrel-cream-p1,19vw 16vh 3px 3px $redsquirrel-cream-p1,14vw -43vh 1px 1px $redsquirrel-cream-p1,14vw 37vh 2px 2px $redsquirrel-cream-p1;
  //  animation: zoom 200s linear infinite;
  //}

  @keyframes zoom {
    0%{
      rotate: 0;
    }
    100%{
      rotate: 360deg;
    }
  }
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
