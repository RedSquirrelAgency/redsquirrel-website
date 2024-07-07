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
      <v-col class="contacts">
        <div>Telegram</div>
        <div>Whatsapp</div>
        <div>Facebook</div>
        <div>Instagram</div>
        <div>Email</div>
      </v-col>
      <v-col class="meeting">
        <div class="about-meeting">
          <div class="avatar-1">
            <v-avatar
              tile
              size="6vw"
            >
              <v-img
                alt="Alena"
                src="/alena.png"
                eager
              />
            </v-avatar>
          </div>
          <div class="avatar-2">
            <v-avatar
              tile
              size="6vw"
            >
              <v-img
                alt="Kate"
                src="/kate.jpg"
                eager
              />
            </v-avatar>
          </div>
          <p>
            {{ $t('During the 30 minute meeting, Alena will ask you questions to make an accurate assessment of the work and tell a little more about our team') }}
          </p>
        </div>
        <ConsultationButton />
      </v-col>
    </v-row>
  </section>
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

    .avatar-1 {
      display: inline-block;
      transform: rotate(-5deg);
      vertical-align: bottom;
    }

    .avatar-2 {
      display: inline-block;
      position: relative;
      transform: rotate(5deg);
      vertical-align: bottom;
      margin-right: 20px;
      margin-bottom: 10px;
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
