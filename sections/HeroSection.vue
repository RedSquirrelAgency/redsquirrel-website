<template>
  <div class="container fill-height">
    <!-- Canvas -->
    <div class="canvas">
      <TresCanvas>
        <Suspense>
          <SquirrelTresScene :zoom="zoom" />
        </Suspense>
      </TresCanvas>
    </div>
    <!-- Overlay elements -->
    <div
      class="overlay"
      :style="overlayStyle"
    >
      <div class="content">
        <!-- Benefits, consultation and rating -->
        <div class="d-flex justify-end">
          <div class="benefit d-flex align-start flex-column">
            <p>Conducting in-depth research on the target audience and market, crafting modern design solutions, and writing compelling texts to ensure <span class="highlights">the website effectively sells</span> to your audience and achieves business objectives</p>
            <v-btn
              class="consultation-button"
              rounded="xl"
              append-icon="mdi-arrow-right"
            >
              {{ $t("Book a consultation") }}
            </v-btn>
            <div class="facebook-rating">
              {{ $t("5/5 rating on Facebook") }}
            </div>
          </div>
        </div>
        <!-- Main offer -->
        <h1>
          <div>
            <span>A website with</span>
            <span class="spacer" />
            <span>a cr<span class="style-script">e</span>ative</span>
          </div>
          <div>d<span class="style-script">e</span>sign and persuasive content</div>
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as TWEEN from '@tweenjs/tween.js'
import SquirrelTresScene from '~/components/SquirrelTresScene.vue'
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useWheel } from '~/composables/wheel'

const emit = defineEmits([...navigationEmits])
const { next } = useSectionNavigation(emit)

const { disableWheelHandler, setWheelEventHandler } = useWheel()
setWheelEventHandler((e: WheelEvent) => {
  if (e.deltaY <= 10) return
  disableWheelHandler()
  squirrelTween.start()
})

const zoom = shallowRef(1)
const overlayStyle = shallowRef({})

const squirrelTween = new TWEEN.Tween({ zoom: 0 })
  .to({ zoom: 4 }, 1500)
  .easing(TWEEN.Easing.Sinusoidal.In)
  .onStart(() => {
    overlayTween.start()
  })
  .onUpdate(({ zoom: updatedZoom }) => {
    zoom.value = updatedZoom
  })
  .onComplete(() => {
    next()
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
  position: relative;
}

.overlay {
  width: 100%;
  height: 100%;
}

.canvas {
  width: 100%;
  height: 100%;
}

.container .canvas, .overlay {
  position: absolute;
}

.content {
  margin: 120px 100px;
}

h1 {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  text-align: center;
  font-weight: 300;
  font-size: 72px;
  text-transform: uppercase;
  color: $redsquirrel-cream-p1;

  .spacer {
    margin-left: 250px;
  }
}

.facebook-rating {
  margin-top: 135px;
  text-transform: uppercase;
  color: $redsquirrel-cream-p1;
}

.benefit {
  width: 372px;

  p {
    font-size: 16px;
    color: $redsquirrel-cream-p2;
  }

  .highlights {
    color: $redsquirrel-cream-p1;
  }

  .consultation-button {
    margin-top: 40px;
  }
}
</style>
