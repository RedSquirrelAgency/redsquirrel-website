<template>
  <section
    ref="containerRef"
    class="container"
  >
    <AnimatedText>
      <h2 class="gradient-1">
        <HeadingText
          :text="$t('We value your time and keep our promises')"
          :line-breaks="[3]"
          :font-replacements="[[0, 0], [2, 1], [5, 1], [7, 5]]"
          :word-spacers="{ 0: '2.6em' }"
          :line-spacers="{ 1: '0.7em' }"
        />
      </h2>
    </AnimatedText>
    <div class="d-flex justify-center">
      <GlassSheet
        class="advantages"
        @mouseout="hoveredItem = -1"
      >
        <v-row
          v-for="(item, index) in advantages"
          :key="index"
          class="item"
          :class="(hoveredItem === index) && 'hovered'"
          @mouseover="hoveredItem = index"
        >
          <v-col class="title d-flex h-100 align-center">
            <p>
              {{ $t(item.title) }}<span class="index">{{ formatIndex(index) }}</span>
            </p>
          </v-col>
          <v-col
            cols="4"
            class="subtitle d-flex h-100 justify-end align-center"
          >
            <i18n-t
              tag="p"
              :keypath="item.subtitle"
            >
              <template #highlight>
                <b>{{ $t(item.highlight) }}</b>
              </template>
            </i18n-t>
          </v-col>
          <v-divider
            v-if="index < advantages.length - 1"
            class="d-flex align-self-end"
            thickness="1"
            opacity="1"
          />
        </v-row>
      </GlassSheet>
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
      end: '+=100%',
      scrub: true,
      pin: true
    },
    defaults: { ease: 'none' }
  })
  tl.fromTo(container.querySelector('.advantages'),
    { rotate: 10, yPercent: 150, rotationY: 40, opacity: 0 },
    { rotate: 0, yPercent: 0, rotationY: 0, opacity: 1 }
  )
})

const hoveredItem = ref(-1)

const advantages = [
  {
    title: 'Expertise',
    subtitle: 'Our {highlight} of experience in design and development help us create effective strategies and optimal solutions',
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

.container {
  padding: 8vw;
}

.advantages {
  color: $redsquirrel-chocolate;
  margin-top: 4vw;
  padding: 20px 30px 20px;
  font-size: 1vw;
  width: 80vw;

  .item {
    height: 6.5vw;
    transition: height .6s ease-in-out;

    .title p {
      font-size: 2.5em;
      font-weight: 300;
      text-transform: uppercase;

      .index {
        position: relative;
        top: -2.5em;
        left: 0.7em;
        font-size: 0.3em;
        font-style: italic;
      }
    }

    .subtitle p {
      font-size: 0.9em;
      width: 17vw;
      filter: blur(12px);
      opacity: 0;
    }

    &.hovered {
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
</style>
