<template>
  <section ref="containerRef">
    <h2 class="gradient-2">
      <HeadingText
        :text="$t('Book a free online meeting to get a price proposal')"
        :font-replacements="[[1, 0], [3, 0], [6, 1], [8, 3], [9, 5]]"
        :line-breaks="mdAndUp ? [2, 4] : [2, 4, 8]"
        :word-spacers="mdAndUp ? { 2: '3.8em', 9: '2em' } : {}"
        :line-spacers="mdAndUp ? {} : { 0: '0.5em', 3: '2.5em' }"
      />
    </h2>
    <div :class="mdAndUp ? 'v-row' : 'v-col'">
      <v-col
        v-if="mdAndUp"
        cols="4"
        class="contacts"
      >
        <SocialLinks />
      </v-col>
      <div
        class="meeting"
        :class="mdAndUp ? 'v-col-8': 'v-row'"
      >
        <div class="about-meeting">
          <div class="avatars">
            <v-avatar class="avatar">
              <v-img
                alt="Alena"
                src="/alena.jpg"
                eager
              />
            </v-avatar>
            <v-avatar class="avatar">
              <v-img
                alt="Kate"
                src="/kate.jpg"
                eager
              />
            </v-avatar>
          </div>
          <p>
            {{ $t('During the 30-min meeting, Alena and Kate will ask you questions to make an accurate assessment of the work and tell a little more about our team') }}
          </p>
        </div>
        <CTAButton
          :href="CONSULTATION_URL"
          :block="!mdAndUp"
        >
          {{ $t("Book a consultation") }}
        </CTAButton>
      </div>
      <v-row
        v-if="!mdAndUp"
        class="contacts"
      >
        <SocialLinks />
      </v-row>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { CONSULTATION_URL } from '~/constants/urls'

const containerRef = ref()
const { $gsap } = useNuxtApp()
const { mdAndUp } = useDisplay()

onMounted(() => {
  const container = containerRef.value
  const header = container.querySelector('h2')
  const contacts = container.querySelector('.contacts')
  const meeting = container.querySelector('.meeting')
  const avatars = container.querySelectorAll('.avatar')

  if (mdAndUp.value) {
    $gsap.timeline({
      scrollTrigger: {
        pin: true,
        trigger: container,
        start: 'bottom bottom',
        end: '+=30%',
        toggleActions: 'play none resume reverse'
      }
    })
      .dissolve(
        container,
        { duration: 0.4 }
      )
      .slideTop(
        header,
        { duration: 0.8 }
      )
      .slideRight(
        contacts,
        { duration: 0.8 },
        '<'
      )
      .slideLeft(
        meeting,
        { duration: 0.8 },
        '<'
      )
      .scaleIn(
        avatars,
        { duration: 1.3, stagger: 0.3, ease: 'elastic.out(1,0.5)' }
      )
  }
  else {
    $gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: '-=10% top',
        end: '+=100px',
        toggleActions: 'play none resume reverse'
      }
    }).dissolve(
      container,
      { duration: 0.8 }
    )
  }
})
</script>

<style scoped lang="scss">
@import "styles/variables";
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  $avatar-size: 4.1vw;

  section {
    padding: 7vw 7vw 7vw 14vw;
  }

  h2 {
    margin-bottom: 7vw;
  }

  .about-meeting {
    font-size: 1.75vw;
    line-height: 2.7vw;
    margin-top: -1.75vw;
    margin-bottom: 1.5vw;
  }

  .avatars {
    margin-right: 0.4vw;
  }

  .avatar {
    height: $avatar-size;
    width: $avatar-size;
  }

  .avatar:not(:first-child) {
    left: -0.3vw;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  $avatar-size: 15vw;

  section {
    padding: $section-padding-mobile;
  }

  h2 {
    margin-bottom: 17.5vw;
  }

  .about-meeting {
    font-size: 6.875vw;
    line-height: 10.31vw;
    margin-bottom: 6.25vw;
  }

  .avatars {
    margin-right: 1.5vw;
  }

  .avatar {
    height: $avatar-size;
    width: $avatar-size;
  }

  .avatar:not(:first-child) {
    left: -2vw;
  }

  .contacts {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 5vw;
    line-height: 7.5vw;
    margin-top: 12.5vw;
  }
}

section {
  position: relative;
  width: 100%;
  background-color: $redsquirrel-cream-p1;

  text-transform: uppercase;
  font-weight: 300;
}

.meeting {
  color: $redsquirrel-chocolate;

  .avatars {
    display: inline-block;
    vertical-align: bottom;

    .avatar {
      outline: 1px solid rgba(255, 255, 255, 0.7);
      box-shadow: 0 8px 20px 0 #67524733;
    }

    .avatar:not(:first-child) {
      position: relative;
    }
  }

  p {
    display: inline;
  }
}
</style>
