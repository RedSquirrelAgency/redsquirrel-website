<template>
  <div>
    <h1 class="header text-center">
      <div><span class="style-script">W</span>e value y<span class="style-script">o</span>ur time</div>
      <div>and k<span class="style-script">e</span>ep our promi<span class="style-script">s</span>es</div>
    </h1>
    <v-container class="d-flex justify-center">
      <v-card
        class="card"
        min-width="100%"
        flat
        @mouseout="hoveredItem = -1"
      >
        <v-sheet class="bg-transparent">
          <v-row
            v-for="(item, index) in advantages"
            :key="index"
            class="item"
            :class="(hoveredItem === index) && 'hovered'"
            @mouseover="hoveredItem = index"
            @mouseenter="hoveredItem = index"
          >
            <v-col class="title">
              <p>{{ item.title }}<span class="index">{{ formatIndex(index) }}</span></p>
            </v-col>
            <v-col
              cols="3"
              class="subtitle d-flex justify-end"
            >
              <p v-if="hoveredItem === index">
                {{ item.subtitle }}
              </p>
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
import { transitionProps, useSectionTransition } from '~/composables/sectionTransition'
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

const props = defineProps({ ...transitionProps })
useSectionTransition(props, {})

const hoveredItem = ref(-1)

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

const advantages = [
  {
    title: 'Expertise',
    subtitle: 'Our 12 years of experience in design and development help us create effective strategies and optimal solutions'
  },
  {
    title: 'Comfortable Service',
    subtitle: 'We are trusted because we can explain complex things, stand by our decisions, and exceed expectations'
  },
  {
    title: 'Fast Communication',
    subtitle: 'We respond within 20 minutes during business hours, deliver on time, and aim to manage all website-related queries'
  },
  {
    title: 'Full Immersion',
    subtitle: 'We love what we do and dive headfirst into each project to ensure our work meets your expectations and becomes an interesting case study in our portfolio'
  },
  {
    title: 'Transparent Contract',
    subtitle: 'We outline all guarantees, deadlines, and technical implementation details in the contract and provide invoices'
  }
]

function formatIndex(index: number) {
  return `(${(index + 1).toString().padStart(2, '0')})`
}
</script>

<style scoped lang="scss">
@import "styles/variables";

.header {
  font-size: 77px;
  line-height: 92.4px;
  text-transform: uppercase;
  font-weight: 200;

  div {
    background: -webkit-linear-gradient($redsquirrel-cream-m1, $redsquirrel-peach);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 60px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: $redsquirrel-chocolate;
  padding: 30px 30px;

  .item {
    height: 100px;
    transition: height .4s ease-in-out;

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
  }
}
</style>
