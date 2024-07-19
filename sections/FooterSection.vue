<template>
  <div class="container d-flex justify-center">
    <GlassSheet
      class="sheet"
      :fill="0.3"
    >
      <v-row class="d-flex justify-center">
        <div class="heading">
          REDSQUIRREL
        </div>
      </v-row>
      <v-row>
        <v-col>
          <NuxtLink
            v-for="(link, index) in siteNavigationLinks"
            :key="index"
            :to="link.to"
            class="text-link"
          >
            {{ $t(link.title) }}
          </NuxtLink>
        </v-col>
        <v-col>
          <div class="highlight">
            Munich, 81927 Germany
          </div>
          <div>
            144/202/21135
          </div>
          <div>
            DE362321598
          </div>
        </v-col>
        <v-col>
          <NuxtLink
            v-for="(link, index) in socialLinks"
            :key="index"
            class="text-link highlight"
            :to="link.to"
          >
            {{ link.title }}
          </NuxtLink>
        </v-col>
      </v-row>
      <v-row class="footer">
        <v-col>
          <div>© 2024 RedSquirrel</div>
        </v-col>
        <v-col />
        <v-col>
          <div>By RedSquirrel</div>
        </v-col>
      </v-row>
    </GlassSheet>
  </div>
</template>

<script setup lang="ts">
const siteNavigationLinks = [
  { title: 'Home', to: '/' },
  { title: 'Cases', to: '/' },
  { title: 'Reviews', to: '/' },
  { title: 'FAQ', to: '/' },
  { title: 'Contacts', to: '/' },
  { title: 'Impressum', to: '/' },
  { title: 'Privacy Policy', to: '/' }
]

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
  padding: 5vw 8vw 0.8vw;
}

.sheet {
  text-transform: uppercase;
  color: $redsquirrel-chocolate-m1;
  padding: 2.3vw;
  width: 100%;

  .highlight {
    color: $redsquirrel-chocolate
  }

  .heading {
    font-size: 12.8vw;
    line-height: 11vw;
    font-weight: 400;
    color: $redsquirrel-cream-p1;
    text-align: center;
    margin-bottom: 3vw;
    text-shadow: 0 20px 30px #D3835B1A;
  }

  .footer {
    margin-top: 3vw;
  }
}
</style>
