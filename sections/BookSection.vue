<template>
  <v-main>
    <v-container
      fluid
      class="container"
    >
      <v-row>
        <h2 class="gradient-2">
          <HeadingText
            text="Book a free online meeting to get a price proposal"
            :font-replacements="[[1, 0], [3, 0], [6, 1], [8, 3], [9, 5]]"
            :line-breaks="[2, 4]"
          />
        </h2>
      </v-row>
      <v-row>
        <v-col class="contacts">
          <div>Telegram</div>
          <div>Whatsapp</div>
          <div>Facebook</div>
          <div>Instagram</div>
          <div>Email</div>
        </v-col>
        <v-col class="meeting">
          <div class="canvas">
            <TresCanvas v-bind="gl">
              <TresPerspectiveCamera
                :fov="70"
                :look-at="[0, 0, 0]"
                :zoom="2.5"
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
          <div class="about-meeting">
            <span class="avatar">
              <v-avatar
                tile
                size="100"
              >
                <v-img
                  alt="Alena"
                  src="/alena.png"
                />
              </v-avatar>
            </span>
            <p>
              During the 30 minute meeting, Alena will ask you questions to make an accurate
              assessment of the work and tell a little more about our team
            </p>
          </div>
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
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'
import SquirrelTresComponent from '~/components/SquirrelTresComponent.vue'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

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
  valueFrom: 0,
  valueTo: 100,
  onChange: () => {},
  onScrollUpOverflow: back
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  height: 100%;
  width: 100%;
  background-color: $redsquirrel-cream-p1;
  padding: 100px 120px 100px 205px;
}

h2 {
  margin-bottom: 40px;
}

.contacts {
  color: $redsquirrel-chocolate-m1;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
}

.meeting {
  color: $redsquirrel-chocolate;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 26px;
  line-height: 39px;

  .about-meeting {
    margin-bottom: 30px;

    .avatar {
      vertical-align: bottom;
    }

    p {
      display: inline;
    }
  }

  .canvas {
    position: absolute;
    top: 400px;
    right: 200px;
    width: 300px;
    height: 300px;
    z-index: 2;
  }
}
</style>
