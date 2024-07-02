<template>
  <section
    ref="containerRef"
    class="container"
  >
    <div class="content">
      <h2 class="gradient-1">
        <HeadingText
          :text="$t('Immersing deeply into each project and finding successful solutions')"
          :font-replacements="[[0, 4], [4, 2], [7, 0]]"
          :line-breaks="[1, 5]"
          :line-spacers="{ 0: '5.5em' }"
          :word-spacers="{ 4: '4em' }"
        />
      </h2>
      <v-row class="cases">
        <v-col
          v-for="(item, index) in cases"
          :key="index"
        >
          <NuxtLink
            v-if="item"
            class="link"
            :to="item.url"
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
                />
              </v-card>
              <div class="caption">
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="subtitle">
                  {{ item.subtitle }}
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
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=2000px',
      scrub: true,
      pin: true
    },
    defaults: { ease: 'none' }
  })
  tl.fromTo(container.querySelector('.cases'), { xPercent: 100 }, { xPercent: -105 })
})

const { t } = useI18n()
const cases = [
  {
    title: 'Natalie Herzel Praxis',
    subtitle: t('Dental Clinic'),
    image: 'banners/natalie_herzel_praxis.png',
    url: 'https://www.behance.net/alenadomozhirova'
  },
  null,
  {
    title: 'RAYTH',
    subtitle: t('Car Wash & Detailing Center'),
    image: 'banners/rayth.png',
    url: 'https://www.behance.net/alenadomozhirova'
  },
  {
    title: 'EZdesign',
    subtitle: t('Bureau of Architecture'),
    image: 'banners/ezdesign.png',
    url: 'https://www.behance.net/alenadomozhirova'
  },
  {
    title: 'Anna Soboleva',
    subtitle: t('Metaphysics Expert'),
    image: 'banners/anna_soboleva.png',
    url: 'https://www.behance.net/alenadomozhirova'
  },
  null,
  {
    title: 'Yes! Mallorca Property',
    subtitle: t('Estate Agency'),
    image: 'banners/yes!_mallorca_property.png',
    url: 'https://www.behance.net/alenadomozhirova'
  },
  {
    title: 'Bigmishka',
    subtitle: t('Tattoo Online Store'),
    image: 'banners/bigmishka.png',
    url: 'https://www.behance.net/alenadomozhirova'
  }
]
</script>

<style scoped lang="scss">
@import "styles/variables";

$case-card-width: 17.85vw;
$case-card-height: 20vw;

.container {
  height: 100vh;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.link {
  text-decoration: none;
}

.content {
  width: 100%;

  h2 {
    text-align: center;
    color: $redsquirrel-chocolate;
  }

  .cases {
    position: relative;
    width: max-content;
    top: -10vw;

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
      .image, .caption {
        opacity: 0.5;
      }
    }

    .spacer {
      width: $case-card-width;
      height: $case-card-height;
    }
  }
}
</style>
