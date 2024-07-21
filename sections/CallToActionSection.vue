<template>
  <section
    ref="containerRef"
    class="container"
  >
    <h2 class="gradient-2">
      <HeadingText
        :text="$t('Book a free online meeting to get a price proposal')"
        :font-replacements="[[1, 0], [3, 0], [6, 1], [8, 3], [9, 5]]"
        :line-breaks="[2, 4]"
        :word-spacers="{ 2: '3.8em', 9: '2em' }"
      />
    </h2>
    <v-row>
      <v-col
        cols="4"
        class="contacts"
      >
        <SocialLinks />
      </v-col>
      <v-col
        cols="8"
        class="meeting"
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
        <ConsultationButton />
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
const containerRef = ref()
const { $gsap } = useNuxtApp()

onMounted(() => {
  const container = containerRef.value
  const header = container.querySelector('h2')
  const contacts = container.querySelector('.contacts')
  const meeting = container.querySelector('.meeting')
  const avatars = container.querySelectorAll('.avatar')

  $gsap.timeline({
    scrollTrigger: {
      pin: true,
      trigger: container,
      start: 'bottom bottom',
      toggleActions: 'play none resume reverse'
    }
  })
    .dissolve(
      container,
      { duration: 0.8 }
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
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  position: relative;
  width: 100%;
  background-color: $redsquirrel-cream-p1;
  padding: 7vw 8vw 7vw 14vw;

  text-transform: uppercase;
  font-weight: 300;
}

h2 {
  margin-bottom: 7vw;
}

.meeting {
  color: $redsquirrel-chocolate;

  .about-meeting {
    font-size: 1.75vw;
    line-height: 2.7vw;
    margin-bottom: 1.5vw;

    .avatars {
      display: inline-block;
      vertical-align: bottom;
      margin-right: 0.4vw;

      .avatar {
        height: 4.1vw;
        width: 4.1vw;
        outline: 1px solid rgba(255, 255, 255, 0.7);
      }

      .avatar:not(:first-child) {
        position: relative;
        left: -0.3vw;
      }
    }

    p {
      display: inline;
    }
  }
}
</style>
