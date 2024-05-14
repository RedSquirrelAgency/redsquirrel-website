<template>
  <v-app>
    <v-main>
      <div class="container fill-height">
        <!-- Canvas -->
        <div class="canvas">
          <TresCanvas>
            <Stars
              :rotation="[0, yRotation, 0]"
              :radius="50"
              :depth="20"
              :count="2000"
              :size="0.3"
              :size-attenuation="true"
            />
            <TresPerspectiveCamera
              :fov="60"
              :rotate-x="0.15"
              :rotate-z="0"
            />
            <Suspense>
              <primitive :object="mesh">
                <Sparkles />
              </primitive>
            </Suspense>
            <TresDirectionalLight
              :position="new Vector3(0, 0, 30)"
              :intensity="10"
            />
          </TresCanvas>
        </div>
        <!-- Overlay elements -->
        <div
          class="overlay"
          @mousemove="mouseMove"
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
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoader } from '@tresjs/core'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import type { Mesh } from 'three'
import { EquirectangularReflectionMapping, MeshPhysicalMaterial, Vector3 } from 'three'
import { RGBELoader } from 'three-stdlib'
import {degToRad} from "three/src/math/MathUtils";

const hdrEquirect = new RGBELoader().load('/redsquirrel-website/empty_warehouse_01_2k.hdr', () => {
  hdrEquirect.mapping = EquirectangularReflectionMapping
})
const material = new MeshPhysicalMaterial({
  roughness: 0,
  transmission: 1, // Add transparency
  thickness: 1, // Add refraction!
  envMap: hdrEquirect
})

const { children } = await useLoader(OBJLoader, '/redsquirrel-website/Squirrel.obj')
const mesh = children[0]

mesh.material = material
mesh.scale.set(0.025, 0.025, 0.025)
mesh.rotateY(2.5)

const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.02 * delta
})

function mouseMove(e: MouseEvent) {
  const percentage = e.screenX / window.innerWidth
  mesh.rotation.y = degToRad(180 * percentage)
}
</script>

<style lang="scss">
  @import "styles/colors";

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

    .style-script {
      font-family: "Style Script", cursive;
      font-weight: 400;
      font-style: normal;
    }

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
