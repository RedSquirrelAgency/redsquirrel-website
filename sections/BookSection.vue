<template>
  <v-container
    fluid
    class="container"
  >
    <v-row class="d-flex justify-center">
      <AnimatedText>
        <h2 class="gradient-2">
          <HeadingText
            :text="$t('Book a free online meeting to get a price proposal')"
            :font-replacements="[[1, 0], [3, 0], [6, 1], [8, 3], [9, 5]]"
            :line-breaks="[2, 4]"
            :word-spacers="{ 2: '3.8em', 9: '2.7em' }"
          />
        </h2>
      </AnimatedText>
    </v-row>
    <v-row>
      <v-col class="contacts">
        <div>Telegram</div>
        <div>Whatsapp</div>
        <div>Facebook</div>
        <div>Instagram</div>
        <div>Email</div>
      </v-col>
      <v-col class="meeting">
        <div class="about-meeting">
          <span class="avatar">
            <v-avatar
              tile
              size="100"
            >
              <v-img
                alt="Alena"
                src="/alena.png"
                eager
              />
            </v-avatar>
          </span>
          <p>
            {{ $t('During the 30 minute meeting, Alena will ask you questions to make an accurate assessment of the work and tell a little more about our team') }}
          </p>
        </div>
        <ConsultationButton />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  position: relative;
  width: 100%;
  background-color: $redsquirrel-cream-p1;
  padding: 100px 120px 100px 205px;
}

h2 {
  margin-bottom: 40px;
}

.contacts {
  color: $redsquirrel-chocolate-m1;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
}

.meeting {
  color: $redsquirrel-chocolate;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 26px;
  line-height: 39px;

  .about-meeting {
    margin-bottom: 30px;

    .avatar {
      vertical-align: bottom;
    }

    p {
      display: inline;
    }
  }

  .canvas {
    position: absolute;
    top: 400px;
    right: 200px;
    width: 300px;
    height: 300px;
    z-index: 2;
  }
}
</style>
