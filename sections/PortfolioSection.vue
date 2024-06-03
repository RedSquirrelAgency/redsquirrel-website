<template>
  <div>
    <h2>
      <span class="line">Imme<span class="style-script">r</span>sing deeply</span>
      <span class="line">into each pr<span class="style-script">o</span>ject and</span>
      <span class="line">finding <span class="style-script">s</span>uccessful solutions</span>
    </h2>
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
</template>

<script setup lang="ts">
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

const cardsStyle = shallowRef({})
useScrollAnimation({
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

h2 {
  margin: 120px 100px;
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
</style>
