<template>
  <v-main>
    <div class="container fill-height">
      <div class="background">
        <img
          class="star"
          src="/figures/star.svg"
        >
        <img
          class="vector"
          src="/figures/vector.svg"
        >
        <img
          class="ellipse"
          src="/figures/ellipse.svg"
        >
        <img
          class="rectangle"
          src="/figures/rectangle.svg"
        >
      </div>
      <div class="content">
        <h1 class="header">
          <div class="first-line">
            Imme<span class="style-script">r</span>sing deeply
          </div>
          <div>into each pr<span class="style-script">o</span>ject and</div>
          <div>finding <span class="style-script">s</span>uccessful solutions</div>
        </h1>
        <v-row
          class="cards"
          :style="cardsStyle"
        >
          <v-col
            v-for="(item, index) in cases"
            :key="index"
          >
            <div v-if="item">
              <v-card
                class="card"
                min-width="357px"
                max-width="357px"
                height="400px"
                flat
                link
              >
                <v-img
                  class="card-image"
                  :src="item.image"
                  cover
                />
              </v-card>
              <div class="text-uppercase">
                {{ item.title }}
              </div>
              <div class="text-left text-caption">
                {{ item.subtitle }}
              </div>
            </div>
            <div
              v-else
              style="width: 357px; height: 400px;"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </v-main>
</template>

<script setup lang="ts">
import { transitionProps, useSectionTransition } from '~/composables/sectionTransition'
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useWheel } from '~/composables/wheel'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

const props = defineProps({ ...transitionProps })
useSectionTransition(props, {})

const { setScrollAnimation } = useWheel()
const cardsStyle = shallowRef({})
setScrollAnimation({
  valueFrom: 60,
  valueTo: -60,
  onChange: (value: number) => {
    cardsStyle.value = {
      transform: `translateX(${value}%)`
    }
  },
  onScrollUpOverflow: back,
  onScrollDownOverflow: next
})

const cases = [
  {
    title: 'Natalie Herzel Praxis',
    subtitle: 'Dental Clinic',
    image: 'banners/natalie_herzel_praxis.png'
  },
  null,
  {
    title: 'RAYTH',
    subtitle: 'Car Wash & Detailing Center',
    image: 'banners/rayth.png'
  },
  {
    title: 'EZdesign',
    subtitle: 'Bureau of Architecture',
    image: 'banners/ezdesign.png'
  },
  {
    title: 'Anna Soboleva',
    subtitle: 'Metaphysics Expert',
    image: 'banners/anna_soboleva.png'
  },
  null,
  {
    title: 'Yes! Mallorca Property',
    subtitle: 'Estate Agency',
    image: 'banners/yes!_mallorca_property.png'
  },
  {
    title: 'Bigmishka',
    subtitle: 'Tattoo Online Store',
    image: 'banners/bigmishka.png'
  }
]
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  background-color: $redsquirrel-peach;
}

.container .background, .content {
  position: absolute;
}

.background {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .star {
    position: absolute;
    left: -300px;
    top: -100px;
  }

  .vector {
    position: absolute;
    left: 300px;
    top: -100px;
  }

  .ellipse {
    position: absolute;
    left: 300px;
    top: 500px;
  }

  .rectangle {
    position: absolute;
    right: -50px;
    top: -280px;
  }
}

.content {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .header {
    margin: 120px 100px;
    font-size: 77px;
    line-height: 92.4px;
    text-transform: uppercase;
    font-weight: 200;

    div {
      background: -webkit-linear-gradient($redsquirrel-cream-m1, $redsquirrel-peach);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &.first-line {
        margin-left: 500px;
      }
    }
  }

  .cards {
    position: relative;
    top: -270px;
    width: max-content;

    .card {
      background: rgba(255, 255, 255, 0);
      border-radius: 16px;
      backdrop-filter: blur(5px) opacity(1);
      -webkit-backdrop-filter: blur(5px) opacity(1);
      transition: backdrop-filter .2s ease-in-out;

      .card-image {
        height: 100%;
        opacity: 0.6;
        transition: opacity .2s ease-in-out;
      }
    }

    .card:not(:hover) {
      .card-image {
        opacity: 0.3;
      }
    }
  }
}
</style>
