<template>
  <section
    ref="containerRef"
    class="container"
  >
    <div class="content">
      <AnimatedText>
        <h2 class="gradient-1">
          <HeadingText
            :text="$t('Immersing deeply into each project and finding successful solutions')"
            :font-replacements="[[0, 4], [4, 2], [7, 0]]"
            :line-breaks="[1, 5]"
            :line-spacers="{ 0: '5.5em' }"
            :word-spacers="{ 4: '4em' }"
          />
        </h2>
      </AnimatedText>
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
            v-else
            class="spacer"
          />
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()
const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!containerRef.value) return
  const container = containerRef.value
  $gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=2000px',
      scrub: true,
      pin: true
    },
    defaults: { ease: 'none' }
  }).fromTo(container.querySelector('.cases'), { xPercent: 100 }, { xPercent: -14 })
})

const cases = [
  {
    title: 'Natalie Herzel Praxis',
    subtitle: 'Dental Clinic',
    image: 'banners/natalie_herzel_praxis.png',
    url: 'https://www.behance.net/alenadomozhirova'
  },
  null,
  {
    title: 'RAYTH',
    subtitle: 'Car Wash & Detailing Center',
    image: 'banners/rayth.png',
    url: 'https://www.behance.net/alenadomozhirova'
  },
  {
    title: 'EZdesign',
    subtitle: 'Bureau of Architecture',
    image: 'banners/ezdesign.png',
    url: 'https://www.behance.net/alenadomozhirova'
  },
  {
    title: 'Anna Soboleva',
    subtitle: 'Metaphysics Expert',
    image: 'banners/anna_soboleva.png',
    url: 'https://www.behance.net/alenadomozhirova'
  },
  null,
  {
    title: 'Yes! Mallorca Property',
    subtitle: 'Estate Agency',
    image: 'banners/yes!_mallorca_property.png',
    url: 'https://www.behance.net/alenadomozhirova'
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

$case-card-width: 24vw;
$case-card-height: calc($case-card-width * 0.9);

.container {
  height: 100vh;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content {
  width: 100%;

  .cases {
    position: relative;
    width: max-content;
    top: -10vw;

    .case-wrapper {
      text-decoration: none;
    }

    .case {
      height: $case-card-height;
      width: $case-card-width;

      .backdrop {
        border-radius: 5%;
        background: rgb(255, 255, 255, 0);
        backdrop-filter: blur(5px) opacity(1);
        -webkit-backdrop-filter: blur(5px) opacity(1);
      }

      .image {
        border-radius: 5%;
        height: 100%;
        opacity: 0.8;
      }

      .caption {
        margin-top: 5px;
        margin-left: 10px;
        font-size: 17px;
        line-height: 25.5px;
        color: $redsquirrel-chocolate;

        .title {
          text-transform: uppercase;
        }
      }

      .image, .caption {
        transition: opacity .2s ease-in-out;
      }
    }

    .case:not(:hover) {
      .image {
        opacity: 0.5;
      }

      .caption {
        opacity: 0.7;
      }
    }

    .spacer {
      width: $case-card-width;
      height: $case-card-height;
    }
  }
}
</style>
