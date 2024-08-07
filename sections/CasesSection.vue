<template>
  <section ref="containerRef">
    <div class="header">
      <AnimatedText>
        <h2 class="gradient-1">
          <HeadingText
            :text="$t('Immersing deeply into each project and finding successful solutions')"
            :font-replacements="[[0, 4], [4, 2], [7, 0], [8, 1], [8, 6]]"
            :line-breaks="mdAndUp ? [1, 5] : [0, 2, 4, 6, 7, 8]"
            :line-spacers="mdAndUp ? { 0: '5.5em' } : { 0: '0.5em', 4: '1.5em' }"
            :word-spacers="mdAndUp ? { 4: '4em' } : {}"
          />
        </h2>
      </AnimatedText>
    </div>
    <div class="overlay">
      <v-row class="cases">
        <v-col
          v-for="(item, index) in cases"
          :key="index"
        >
          <NuxtLink
            v-if="item"
            class="case-wrapper"
            :to="item.url"
            target="_blank"
          >
            <div class="case">
              <v-card
                class="backdrop"
                flat
              >
                <v-img
                  class="image"
                  :src="item.image"
                  cover
                  eager
                />
              </v-card>
              <div class="caption">
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="subtitle">
                  {{ $t(item.subtitle) }}
                </div>
              </div>
            </div>
          </NuxtLink>
          <div
            v-else-if="mdAndUp"
            class="spacer"
          />
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { $gsap } = useNuxtApp()
const { mdAndUp } = useDisplay()
const containerRef = ref()

onMounted(() => {
  const container = containerRef.value
  const cardsXRange = mdAndUp.value ? [50, -51] : [50, -83.5]
  $gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=2000px',
      scrub: true,
      pin: true
    },
    defaults: { ease: 'none' }
  }).fromTo(container.querySelector('.cases'),
    { xPercent: cardsXRange[0] },
    { xPercent: cardsXRange[1] }
  )
})

const cases = [
  {
    title: 'Natalie Herzel Praxis',
    subtitle: 'Dental Clinic',
    image: 'banners/natalieherzelpraxis.png',
    url: 'https://herzel-zahnarzt.de/'
  },
  null,
  {
    title: 'RAYTH',
    subtitle: 'Car Wash & Detailing Center',
    image: 'banners/rayth.png',
    url: 'https://www.behance.net/gallery/187262715/Landing-Page-for-Detailing-Center'
  },
  {
    title: 'EZdesign',
    subtitle: 'Bureau of Architecture',
    image: 'banners/ezdesign.png',
    url: 'https://www.behance.net/gallery/187262715/Landing-Page-for-Detailing-Center'
  },
  {
    title: 'Anna Soboleva',
    subtitle: 'Metaphysics Expert',
    image: 'banners/annasoboleva.png',
    url: 'https://www.behance.net/alenadomozhirova'
  },
  null,
  {
    title: 'Yes! Mallorca Property',
    subtitle: 'Estate Agency',
    image: 'banners/yesmallorcaproperty.png',
    url: 'https://www.behance.net/gallery/128711407/agentstvo-nedvizhimosti-na-majorke'
  },
  {
    title: 'Bigmishka',
    subtitle: 'Tattoo Online Store',
    image: 'banners/bigmishka.png',
    url: 'https://www.behance.net/alenadomozhirova'
  }
]
</script>

<style scoped lang="scss">
@import "styles/variables";
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  $case-card-width: 24vw;
  $case-card-height: calc($case-card-width * 0.9);
  $case-border-radius: 1.38vw;

  .header {
    padding: $section-padding-desktop;
  }

  .cases {
    top: 17vw;
  }

  .case {
    height: $case-card-height;
    width: $case-card-width;

    .backdrop {
      border-radius: $case-border-radius;
    }

    .image {
      border-radius: $case-border-radius;
    }

    .caption {
      margin-top: 0.347vw;
      margin-left: 0.694vw;

      .title {
        font-size: 1.18vw;
        line-height: 1.77vw;
      }

      .subtitle {
        font-size: 1vw;
        line-height: 1.56vw;
      }
    }
  }

  .spacer {
    width: $case-card-width;
    height: $case-card-height;
  }

  .case:not(:hover) {
    .image {
      opacity: 0.5;
    }

    .caption {
      opacity: 0.7;
    }
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  $case-card-width: 98.125vw;
  $case-card-height: calc($case-card-width * 0.9);
  $case-border-radius: 6.25vw;

  .header {
    padding: $section-padding-mobile;
  }

  .cases {
    top: 20vh;
  }

  .case {
    height: $case-card-height;
    width: $case-card-width;

    .backdrop {
      border-radius: $case-border-radius;
    }

    .image {
      border-radius: $case-border-radius;
    }

    .caption {
      margin-top: 1.56vw;
      margin-left: 3.125vw;

      .title {
        font-size: 4.68vw;
        line-height: 7vw;
      }

      .subtitle {
        font-size: 3.75vw;
        line-height: 5.625vw;
      }
    }
  }

  .spacer {
    width: $case-card-width;
    height: $case-card-height;
  }
}

section {
  display: flex;
  height: 100vh;
}

.overlay {
  width: 100%;
  position: absolute;
  overflow: hidden;
}

.cases {
  position: relative;
  width: max-content;
  height: 100vh;

  .case-wrapper {
    text-decoration: none;
  }

  .case {
    .backdrop {
      background: rgb(255, 255, 255, 0);
      backdrop-filter: blur(5px) opacity(1);
      -webkit-backdrop-filter: blur(5px) opacity(1);
    }

    .image {
      height: 100%;
      opacity: 0.8;
    }

    .caption {
      color: $redsquirrel-chocolate;

      .title {
        text-transform: uppercase;
      }
    }

    .image, .caption {
      transition: opacity .2s ease-in-out;
    }
  }
}
</style>
