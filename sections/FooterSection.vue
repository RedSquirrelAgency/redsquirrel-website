<template>
  <div class="container d-flex justify-center">
    <GlassSheet class="sheet">
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
            class="link"
            :to="link.to"
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
            class="link highlight"
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
  font-size: 1vw;
  font-weight: 300;
  padding: 2.3vw;
  width: 100%;

  .highlight {
    color: $redsquirrel-chocolate
  }

  .heading {
    line-height: 11vw;
    font-size: 12.8vw;
    font-weight: 400;
    color: $redsquirrel-cream-p1;
    text-align: center;
    margin-bottom: 3vw;
  }

  .footer {
    margin-top: 3vw;
  }

  a {
    display: block;
    color: $redsquirrel-chocolate-m1;

    &.highlight {
      color: $redsquirrel-chocolate;
    }
  }
}
</style>
