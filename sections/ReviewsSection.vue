<template>
  <div class="container d-flex justify-center">
    <div class="offer text-center">
      <FacebookRating class="facebook-rating" />
      <h2>
        <HeadingText
          text="We are chosen for our high level of expertise and service"
          :line-breaks="[4, 8]"
          :font-replacements="[[0, 0], [2, 2], [6, 2], [8, 3], [10, 0]]"
        />
      </h2>
      <p class="ai-note">
        <span class="line">Photos and voices are generated</span>
        <span class="line">by AI due to the confidentiality of</span>
        <span class="line">our clients</span>
      </p>
    </div>
    <GlassSheet
      v-for="(review, index) in reviews"
      :key="index"
      :style="{ position: 'absolute', ...review.position }"
      border="1vw"
      class="review-card"
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
          <v-avatar class="avatar">
            <v-img
              :alt="review.company"
              :src="review.avatar"
              eager
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
    </GlassSheet>
    <AudioPlayer
      v-if="sound"
      :sound="sound"
      @play="playing = true"
      @end="playing = false"
      @stop="playing = false"
      @pause="playing = false"
      @close="onAudioPlayerClose()"
    />
  </div>
</template>

<script setup lang="ts">
import AudioPlayer from '~/components/AudioPlayer.vue'

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

function onReviewClick(review: IReview, index: number) {
  selected.value = index
  sound.value = { name: review.company, ...review.sound }
}

function onAudioPlayerClose() {
  selected.value = undefined
  sound.value = undefined
  playing.value = false
}

const reviews: IReview[] = [
  {
    company: 'Anna Soboleva',
    niche: 'Metaphysics Expert',
    avatar: 'avatars/anna_soboleva.png',
    sound: { src: 'adam.mp3', subtitlesSrc: 'subtitles/landystyle.srt' },
    position: { top: '8.7vw', left: '35vw' }
  },
  {
    company: 'Rayth',
    niche: 'Car Wash & Detailing Center',
    avatar: 'avatars/rayth.png',
    sound: { src: 'adam.mp3', subtitlesSrc: 'subtitles/landystyle.srt' },
    position: { top: '5.8vw', right: '35vw' }
  },
  {
    company: 'Natalie Herzel',
    niche: 'Dental Clinic',
    avatar: 'avatars/natalie_herzel.png',
    sound: { src: 'adam.mp3', subtitlesSrc: 'subtitles/landystyle.srt' },
    position: { top: '7.0vw', left: '17vw' }
  },
  {
    company: 'Ambre Akadeemia',
    niche: 'Language School',
    avatar: 'avatars/ambre_akadeemia.png',
    sound: { src: 'adam.mp3', subtitlesSrc: 'subtitles/landystyle.srt' },
    position: { top: '10.44vw', right: '17vw' }
  },
  {
    company: 'Dreamlis',
    niche: 'Jewelry Brand',
    avatar: 'avatars/dreamlis.png',
    sound: { src: 'adam.mp3', subtitlesSrc: 'subtitles/landystyle.srt' },
    position: { top: '23.43vw', left: '6.96vw' }
  },
  {
    company: 'Nuga Best Eesti',
    niche: 'Medical Equipment',
    avatar: 'avatars/nuga_best_eesti.png',
    sound: { src: 'adam.mp3', subtitlesSrc: 'subtitles/landystyle.srt' },
    position: { top: '26.91vw', right: '6.96vw' }
  },
  {
    company: 'LandyStyle',
    niche: 'Landscape Agency',
    avatar: 'avatars/landystyle.png',
    sound: { src: 'audio/landystyle.mp3', subtitlesSrc: 'subtitles/landystyle.srt' },
    position: { top: '39.94vw', left: '17vw' }
  },
  {
    company: 'EZdesign',
    niche: 'Bureau of Architecture',
    avatar: 'avatars/ezdesign.png',
    sound: { src: 'audio/landystyle_ru.mp3', subtitlesSrc: 'subtitles/landystyle_ru.srt' },
    position: { top: '42.22vw', right: '17vw' }
  },
  {
    company: 'Kare',
    niche: 'Beauty Saloon',
    avatar: 'avatars/kare.png',
    sound: { src: 'adam.mp3', subtitlesSrc: 'subtitles/landystyle.srt' },
    position: { top: '47.56vw', left: '35vw' }
  },
  {
    company: 'Ekaterina U.',
    niche: 'Beauty Expert',
    avatar: 'avatars/ekaterina_u.png',
    sound: { src: 'adam.mp3', subtitlesSrc: 'subtitles/landystyle.srt' },
    position: { top: '45.82vw', right: '35vw' }
  }
]
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  position: relative;
  height: 66vw;
}

.offer {
  position: absolute;
  top: 23vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .facebook-rating {
    color: $redsquirrel-cream;
  }

  h2 {
    font-size: 3vw;
    font-weight: 400;
    line-height: 4vw;
    text-transform: uppercase;
    color: $redsquirrel-cream;
    margin: 1vw 0;
  }

  .ai-note {
    font-size: 1vw;
    font-weight: 400;
    line-height: 1.5vw;
    text-transform: uppercase;
    color: $redsquirrel-cream;
  }
}

.review-card {
  width: 11.8vw;
  padding: 0.7vw 1.5vw 1.2vw;
  border: 1px solid rgba(255, 255, 255, 0.7);

  .avatar-wrapper {
    height: 7vw;
    width: 7vw;
    display: flex;
    justify-content: center;
    border-radius: 100%;
    margin-bottom: 0.7vw;

    .avatar {
      height: 6vw;
      width: 6vw;
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
    font-size: 0.94vw;
    line-height: 1.9vw;
    color: $redsquirrel-cream-m1;
  }

  .niche {
    font-size: 0.9vw;
    line-height: 0.9vw;
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
