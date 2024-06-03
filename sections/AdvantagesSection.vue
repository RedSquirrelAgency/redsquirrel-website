<template>
  <div>
    <h2 class="text-center">
      <span class="line"><span class="style-script">W</span>e value y<span class="style-script">o</span>ur time</span>
      <span class="line">and k<span class="style-script">e</span>ep our promi<span class="style-script">s</span>es</span>
    </h2>
    <v-container
      class="d-flex justify-center"
    >
      <v-card
        class="advantages glass"
        min-width="100%"
        flat
        :style="cardStyle"
        @mouseout="hoveredItem = -1"
      >
        <v-sheet class="bg-transparent">
          <v-row
            v-for="(item, index) in advantages"
            :key="index"
            class="item"
            :class="(hoveredItem === index) && 'hovered'"
            @mouseover="hoveredItem = index"
          >
            <v-col class="title d-flex h-100 align-center">
              <p>{{ item.title }}<span class="index">{{ formatIndex(index) }}</span></p>
            </v-col>
            <v-col
              cols="3"
              class="subtitle d-flex h-100 justify-end align-center"
            >
              <p
                :class="(hoveredItem === index) && 'show'"
                v-html="item.subtitle"
              />
            </v-col>
            <v-divider
              v-if="index < advantages.length - 1"
              class="d-flex align-self-end"
              thickness="1"
              opacity="1"
            />
          </v-row>
        </v-sheet>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

const hoveredItem = ref(-1)

const cardStyle = shallowRef({})
useScrollAnimation({
  valueFrom: 100,
  valueTo: 0,
  onChange: (value: number) => {
    const factor = value / 100
    cardStyle.value = {
      transform: `translateY(${factor * 150}%) rotateY(${factor * 50}deg)`,
      rotate: `${factor * 10}deg`
    }
  },
  onScrollUpOverflow: back,
  onScrollDownOverflow: next
})

const advantages = [
  {
    title: 'Expertise',
    subtitle: 'Our <b>12 years</b> of experience in design and development help us create effective strategies and optimal solutions'
  },
  {
    title: 'Comfortable Service',
    subtitle: 'We are trusted because we can explain complex things, stand by our decisions, and <b>exceed expectations</b>'
  },
  {
    title: 'Fast Communication',
    subtitle: 'We <b>respond within 20 minutes</b> during business hours, deliver on time, and aim to manage all website-related queries'
  },
  {
    title: 'Full Immersion',
    subtitle: '<b>We love what we do</b> and dive headfirst into each project to ensure our work meets your expectations and becomes an interesting case study in our portfolio'
  },
  {
    title: 'Transparent Contract',
    subtitle: 'We outline <b>all guarantees</b>, deadlines, and technical implementation details in the contract and provide invoices'
  }
]

function formatIndex(index: number) {
  return `(${(index + 1).toString().padStart(2, '0')})`
}
</script>

<style scoped lang="scss">
@import "styles/variables";

.glass {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 60px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.advantages {
  color: $redsquirrel-chocolate;
  padding: 20px 30px 20px;

  .item {
    height: 100px;
    transition: height .6s ease-in-out;

    &.hovered {
      transition: height .4s ease-in-out;
      height: 150px;
    }
  }

  .title p {
    font-size: 60px;
    text-transform: uppercase;

    .index {
      position: relative;
      top: -40px;
      left: 5px;
      font-size: 14px;
      font-style: italic;
    }
  }

  .subtitle p {
    font-size: 14px;
    width: 300px;
    filter: blur(12px);
    opacity: 0;

    &.show {
      filter: blur(0px);
      transition: filter .4s ease, opacity .4s ease;
      transition-delay: .1s;
      opacity: 1;
    }
  }
}
</style>
