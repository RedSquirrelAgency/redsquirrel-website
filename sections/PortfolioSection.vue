<template>
  <section
    ref="containerRef"
    class="container"
  >
    <h2 class="gradient-1">
      <HeadingText
        text="Immersing deeply into each project and finding successful solutions"
        :font-replacements="[[0, 4], [4, 2], [7, 0]]"
        :line-breaks="[1, 5]"
        :line-spacers="{ 0: '4em' }"
        :word-spacers="{ 4: '2em' }"
      />
    </h2>
    <v-row
      ref="cardsRef"
      class="cards"
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
  </section>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()
const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!containerRef.value) return
  const container = containerRef.value
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=100%',
      scrub: true,
      pin: true
    },
    defaults: { ease: 'none' }
  })
  tl.fromTo(container.querySelector('.cards'), { xPercent: 100 }, { xPercent: -105 })
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
  padding: 120px 100px;
}

.cards {
  position: relative;
  top: -170px;
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
