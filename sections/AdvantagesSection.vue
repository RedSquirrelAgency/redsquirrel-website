<template>
  <section ref="containerRef">
    <AnimatedText>
      <h2 class="gradient-1">
        <HeadingText
          :text="$t('We value your time and keep our promises')"
          :line-breaks="mdAndUp ? [3] : [1, 3, 5]"
          :font-replacements="[[0, 0], [2, 1], [5, 1], [7, 5]]"
          :word-spacers="mdAndUp ? { 0: '2.6em' } : {}"
          :line-spacers="mdAndUp ? { 1: '0.7em' } : { 0: '0.5em', 2: '1.3em' }"
        />
      </h2>
    </AnimatedText>
    <div class="d-flex justify-center">
      <GlassSheet
        class="advantages"
        :border="mdAndUp ? '3vw' : '6.25vw'"
        @mouseout="hoveredItem = -1"
      >
        <div
          v-for="(item, index) in advantages"
          :key="index"
          class="item"
          :class="mdAndUp ? 'v-row' : ''"
          @mouseover="hoveredItem = index"
        >
          <div
            class="title"
            :class="mdAndUp ? 'v-col d-flex align-center h-100' : ''"
          >
            <p>
              {{ $t(item.title) }}
              <span
                v-if="mdAndUp"
                class="index"
              >
                {{ formatIndex(index) }}
              </span>
            </p>
            <div
              v-if="!mdAndUp"
              class="index"
            >
              {{ formatIndex(index) }}
            </div>
          </div>
          <div
            class="subtitle"
            :class="mdAndUp ? 'v-col-4 d-flex justify-end align-center h-100' : ''"
          >
            <i18n-t
              tag="p"
              :keypath="item.subtitle"
            >
              <template #highlight>
                <b>{{ $t(item.highlight) }}</b>
              </template>
            </i18n-t>
          </div>
          <v-divider
            v-if="index < advantages.length - 1"
            class="d-flex align-self-end"
            thickness="1"
            opacity="1"
          />
        </div>
      </GlassSheet>
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

  if (mdAndUp.value) {
    $gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        pin: true
      },
      defaults: { ease: 'none' }
    }).fromTo(container.querySelector('.advantages'),
      { rotate: 10, yPercent: 150, rotationY: 40, opacity: 0 },
      { rotate: 0, yPercent: 0, rotationY: 0, opacity: 1 }
    )
  }
  else {
    const items = container.querySelectorAll('.item')
    const itemsArray = $gsap.utils.toArray(items) as HTMLElement[]

    for (const item of itemsArray) {
      $gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top center',
          end: '+=200px',
          scrub: true
        }
      }).fromTo(item,
        { opacity: 0.2 },
        { opacity: 1 }
      ).to(item,
        { opacity: 0.2 }
      )
    }
  }
})

const hoveredItem = ref(-1)

const advantages = [
  {
    title: 'Expertise',
    subtitle: 'Our {highlight} of experience in design, development, and SEO help us create effective strategies and optimal solutions',
    highlight: '12 years'
  },
  {
    title: 'Comfortable Service',
    subtitle: 'We are trusted because we can explain complex things, stand by our decisions, and {highlight}',
    highlight: 'exceed expectations'
  },
  {
    title: 'Fast Communication',
    subtitle: 'We {highlight} during business hours, deliver on time, and aim to manage all website-related queries',
    highlight: 'respond within 20 minutes'
  },
  {
    title: 'Full Immersion',
    subtitle: '{highlight} and dive headfirst into each project to ensure our work meets your expectations and becomes an interesting case study in our portfolio',
    highlight: 'We love what we do'
  },
  {
    title: 'Transparent Contract',
    subtitle: 'We outline {highlight}, deadlines, and technical implementation details in the contract and provide invoices',
    highlight: 'all guarantees'
  }
]

function formatIndex(index: number) {
  return `(${(index + 1).toString().padStart(2, '0')})`
}
</script>

<style scoped lang="scss">
@import "styles/variables";
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  section {
    padding: 8vw;
  }

  .advantages {
    padding: 20px 30px 20px;
    margin-top: 4vw;
    width: 80vw;

    .item {
      transition: height .6s ease-in-out;
      height: 6.5vw;

      .title p {
        font-size: 2.5em;

        .index {
          position: relative;
          font-size: 0.3em;
          top: -2.5em;
          left: 0.7em;
        }
      }

      .subtitle p {
        font-size: 1em;
        width: 20.5vw;
        filter: blur(12px);
        opacity: 0;
      }

      &:hover {
        height: 9vw;
        transition: height .4s ease-in-out;

        .title p {
          font-weight: 400;
        }

        .subtitle p {
          filter: blur(0px);
          transition: filter .4s ease, opacity .4s ease;
          transition-delay: .1s;
          opacity: 1;
        }
      }
    }
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  section {
    padding: $section-padding-mobile;
  }

  .advantages {
    padding: 0 3.125vw;
    margin-top: 18.75vw;
    width: 93.75vw;

    .item {
      margin-top: 6.25vw;

      .title {
        display: flex;
        justify-content: space-between;

        p {
          font-size: 7.5vw;
          line-height: 10.25vw;
          margin-bottom: 3.125vw;
        }

        .index {
          font-size: 3.125vw;
          line-height: 4.68vw;
        }
      }

      .subtitle {
        margin-bottom: 6.25vw;
      }
    }
  }
}

.advantages {
  color: $redsquirrel-chocolate;

  .item {
    .title p {
      font-weight: 300;
      text-transform: uppercase;
    }

    .index {
      font-style: italic;
    }
  }
}
</style>
