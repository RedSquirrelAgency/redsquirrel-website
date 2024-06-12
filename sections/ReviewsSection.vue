<template>
  <div
    class="container d-flex justify-center"
    :style="containerStyle"
  >
    <div class="offer">
      <FacebookRating class="facebook-rating text-center" />
      <h2 class="text-center">
        <HeadingText
          text="We are chosen for our high level of expertise and service"
          :line-breaks="[4, 8]"
          :font-replacements="[[0, 0], [2, 2], [6, 2], [8, 3], [10, 0]]"
        />
      </h2>
      <h4 class="text-center">
        <span class="line">Photos and voices are generated</span>
        <span class="line">by AI due to the confidentiality of</span>
        <span class="line">our clients</span>
      </h4>
    </div>
    <v-card
      v-for="(review, index) in reviews"
      :key="index"
      :style="{ position: 'absolute', ...review.position }"
      class="review-card glass"
      min-width="190"
      max-width="190"
      @click="onReviewClick(review, index)"
    >
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <div
          class="avatar-wrapper"
          :class="(selected === index && playing) && 'pulsate'"
        >
          <v-avatar
            class="avatar"
            size="100"
          >
            <v-img
              :alt="review.company"
              :src="review.avatar"
            />
          </v-avatar>
        </div>
        <div class="company text-center">
          {{ review.company }}
        </div>
        <div class="niche text-center">
          {{ review.niche }}
        </div>
      </div>
    </v-card>
  </div>
  <AudioPlayer
    v-if="sound"
    :sound="sound"
    @play="playing = true"
    @end="playing = false"
    @stop="playing = false"
    @pause="playing = false"
    @close="onAudioPlayerClose()"
  />
</template>

<script setup lang="ts">
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'
import AudioPlayer from '~/components/AudioPlayer.vue'

const emit = defineEmits([...navigationEmits])
const { back, next } = useSectionNavigation(emit)

interface IReviewPosition {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

interface IReview {
  company: string
  niche: string
  avatar: string
  sound: ISound
  position: IReviewPosition
}

const sound = ref<ISound>()
const selected = ref<number>()
const playing = ref(false)

const containerStyle = ref({})
useScrollAnimation({
  valueFrom: 0,
  valueTo: -200,
  onChange: (value: number) => {
    containerStyle.value = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: `${value}px`
    }
  },
  onScrollUpOverflow: back,
  onScrollDownOverflow: next
})

function onReviewClick(review: IReview, index: number) {
  selected.value = index
  sound.value = { name: review.company, ...review.sound }
}

function onAudioPlayerClose() {
  selected.value = undefined
  sound.value = undefined
  playing.value = false
}

const transcription = [
  {
    start: 0.06,
    end: 3.57,
    text: 'Deciding to create my own website was difficult for some reasons.'
  },
  {
    start: 3.6,
    end: 8.43,
    text: 'Firstly, there was a very vivid negative experience several years ago'
  },
  {
    start: 8.43,
    end: 11.7,
    text: 'when we got something completely different from what we wanted and'
  },
  {
    start: 11.7,
    end: 14.58,
    text: 'for a very large sum of money. Secondly,'
  },
  {
    start: 14.58,
    end: 18.72,
    text: 'I thought that if I really tried, I could build the website myself.'
  }
]

const reviews: IReview[] = [
  {
    company: 'Anna Soboleva',
    niche: 'Metaphysics Expert',
    avatar: 'avatars/anna_soboleva.png',
    sound: { src: 'adam.mp3', transcription },
    position: { top: '150px', left: '488px' }
  },
  {
    company: 'Rayth',
    niche: 'Car Wash & Detailing Center',
    avatar: 'avatars/rayth.png',
    sound: { src: 'test.mp3', transcription },
    position: { top: '100px', right: '488px' }
  },
  {
    company: 'Natalie Herzel',
    niche: 'Dental Clinic',
    avatar: 'avatars/natalie_herzel.png',
    sound: { src: 'adam.mp3', transcription },
    position: { top: '120px', left: '215px' }
  },
  {
    company: 'Ambre Akadeemia',
    niche: 'Language School',
    avatar: 'avatars/ambre_akadeemia.png',
    sound: { src: 'adam.mp3', transcription },
    position: { top: '180px', right: '215px' }
  },
  {
    company: 'Dreamlis',
    niche: 'Jewelry Brand',
    avatar: 'avatars/dreamlis.png',
    sound: { src: 'adam.mp3', transcription },
    position: { top: '404px', left: '120px' }
  },
  {
    company: 'Nuga Best Eesti',
    niche: 'Medical Equipment',
    avatar: 'avatars/nuga_best_eesti.png',
    sound: { src: 'adam.mp3', transcription },
    position: { top: '464px', right: '120px' }
  },
  {
    company: 'LandyStyle',
    niche: 'Landscape Agency',
    avatar: 'avatars/landystyle.png',
    sound: { src: 'adam.mp3', transcription },
    position: { top: '688px', left: '215px' }
  },
  {
    company: 'EZdesign',
    niche: 'Bureau of Architecture',
    avatar: 'avatars/ezdesign.png',
    sound: { src: 'adam.mp3', transcription },
    position: { top: '728px', right: '215px' }
  },
  {
    company: 'Kare',
    niche: 'Beauty Saloon',
    avatar: 'avatars/kare.png',
    sound: { src: 'adam.mp3', transcription },
    position: { top: '820px', left: '488px' }
  },
  {
    company: 'Ekaterina U.',
    niche: 'Beauty Expert',
    avatar: 'avatars/ekaterina_u.png',
    sound: { src: 'adam.mp3', transcription },
    position: { top: '790px', right: '488px' }
  }
]
</script>

<style scoped lang="scss">
@import "styles/variables";

.glass {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.offer {
  position: absolute;
  top: 398px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .facebook-rating {
    color: $redsquirrel-cream;
  }

  h2 {
    font-size: 46px;
    font-weight: 200;
    line-height: 69.92px;
    text-transform: uppercase;
    color: $redsquirrel-cream;
    margin: 20px 0;
  }
}

.review-card {
  padding: 11px 20px 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);

  .avatar-wrapper {
    height: 116px;
    width: 116px;
    display: flex;
    justify-content: center;
    border-radius: 100%;
    margin-bottom: 5px;

    .avatar {
      outline: 1px solid rgba(255, 255, 255, 0.7);
      margin: auto 0;
    }

    &.pulsate {
      .avatar {
        outline: 0;
      }
      animation: pulsate 1s linear infinite alternate;
    }
  }

  .company {
    text-transform: uppercase;
    font-size: 16px;
    line-height: 24px;
    color: $redsquirrel-cream-m1;
  }

  .niche {
    font-size: 15px;
    line-height: 15px;
    color: $redsquirrel-cream-p1;
  }
}

@keyframes pulsate {
  0% {
    background: rgba($redsquirrel-cream-m1, 0);
    outline: 7px solid rgba($redsquirrel-cream-m1, 0);
  }
  50% {
    background: rgba($redsquirrel-cream-m1, 0.5);
    outline: 7px solid rgba($redsquirrel-cream-m1, 0);
  }
  100% {
    background: rgba($redsquirrel-cream-m1, 0.5);
    outline: 7px solid rgba($redsquirrel-cream-m1, 0.2);
  }
}
</style>
