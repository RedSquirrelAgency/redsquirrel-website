<template>
  <div class="container">
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
            :position="[0, -1, 0]"
            :rotation="[0, 0, 0]"
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
      <v-row class="footer">
        <v-col>
          <FacebookRating class="facebook-rating" />
        </v-col>
        <v-col>
          <p>The website with a creative design and persuasive content</p>
          <v-btn
            class="consultation-button"
            rounded="lg"
            append-icon="mdi-arrow-right"
            color="#FFDFCFE5"
            variant="flat"
          >
            {{ $t("Book a consultation") }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as TWEEN from '@tweenjs/tween.js'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import SquirrelTresScene from '~/components/SquirrelTresScene.vue'
import SquirrelTresComponent from '~/components/SquirrelTresComponent.vue'

// useScrollAnimation({
//  valueFrom: 20,
//  valueTo: 0,
//  onChange: () => {},
//  onScrollDownOverflow: () => { squirrelTween.start() }
// })

const zoom = shallowRef(1)
const overlayStyle = shallowRef({})

const gl = {
  clearColor: 0x000000,
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}

const squirrelTween = new TWEEN.Tween({ zoom: 0 })
  .to({ zoom: 4 }, 1500)
  .easing(TWEEN.Easing.Sinusoidal.In)
  .onStart(() => {
    overlayTween.start()
  })
  .onUpdate(({ zoom: updatedZoom }) => {
    zoom.value = updatedZoom
  })

const overlayTween = new TWEEN.Tween({ opacity: 1, blur: 0 })
  .to({ opacity: 0, blur: 20 }, 1500)
  .easing(TWEEN.Easing.Sinusoidal.In)
  .onUpdate(({ opacity, blur }) => {
    overlayStyle.value = {
      opacity,
      filter: `blur(${blur}px)`
    }
  })
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  width: 100%;
  height: 100vh;
  background: -webkit-linear-gradient(#B87C6A, #DF8B6B, #EE936B, #FEAE79, #F4C5A1, #DDCABA);
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
  }
}
</style>
