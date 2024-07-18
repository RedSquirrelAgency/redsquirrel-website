<template>
  <section class="container">
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
        <NuxtLink
          v-for="(link, index) in socialLinks"
          :key="index"
          :to="link.to"
          class="text-link"
        >
          {{ link.title }}
        </NuxtLink>
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
const socialLinks = [
  { title: 'Telegram', to: 'https://telegram.org/' },
  { title: 'Whatsapp', to: '/' },
  { title: 'Facebook', to: '/' },
  { title: 'Instagram', to: '/' },
  { title: 'Email', to: '/' }
]
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
