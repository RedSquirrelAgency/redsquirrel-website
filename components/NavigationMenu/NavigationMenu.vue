<template>
  <div
    class="container"
    :class="mdAndUp ? 'desktop' : 'mobile'"
  >
    <v-col
      v-if="mdAndUp"
      class="d-flex flex-column h-100"
    >
      <v-row>
        <v-col class="my-auto text-left social-links">
          <SocialLinks />
        </v-col>
        <v-col
          cols="6"
          class="my-auto text-center"
        >
          <NavigationMenuLink
            v-for="(link, index) in navigationLinks"
            :key="index"
            :link="link"
            class="navigation-link"
            @click="emit('close')"
          />
        </v-col>
        <v-col class="d-flex justify-end my-auto text-right">
          <CompanyInfo class="company-info" />
        </v-col>
      </v-row>
      <v-row>
        <CopyRight class="copyright mx-auto mt-auto" />
      </v-row>
    </v-col>
    <v-col
      v-else
      class="menu-items"
    >
      <v-row class="d-flex flex-column">
        <NavigationMenuLink
          v-for="(link, index) in navigationLinks"
          :key="index"
          :link="link"
          class="navigation-link"
          @click="emit('close')"
        />
      </v-row>
      <v-row class="d-flex flex-column">
        <CompanyInfo />
      </v-row>
      <v-row class="d-flex flex-column align-center">
        <LanguageSwitcher
          inactive-color="#FFD2BB"
          active-color="#C38D72"
        />
      </v-row>
      <v-row class="d-flex flex-column">
        <div class="d-flex justify-space-between social-links">
          <SocialLinks />
        </div>
        <CopyRight class="copyright" />
      </v-row>
    </v-col>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

const emit = defineEmits(['close'])

const eventListener = (e: WheelEvent) => e.preventDefault()
onMounted(() => document.addEventListener('wheel', eventListener, { passive: false }))
onUnmounted(() => document.removeEventListener('wheel', eventListener))

const navigationLinks = [
  { title: 'Portfolio', to: '#cases' },
  { title: 'Approach', to: '#advantages' },
  { title: 'Stages', to: '#stages' },
  { title: 'Reviews', to: '#reviews' },
  { title: 'Get in touch', to: '#contact' }
]
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  background-color: #FFFBF7E5;
  color: $redsquirrel-chocolate-m1;
  text-transform: uppercase;

  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
}

.copyright {
  color: $redsquirrel-cream-p1;
}

.desktop {
  font-size: 1vw;
  line-height: 1.5vw;
  padding: 10vw 8vw 0.69vw;

  .navigation-link {
    font-size: 4vw;
    line-height: 5vw;
  }

  .social-links {
    font-size: 1.38vw;
    line-height: 2vw;

    display: flex;
    flex-direction: column;
    gap: 0.69vw;
  }

  .company-info {
    width: 11.59vw;
    font-size: 1.25vw;
    line-height: 1.875vw;
  }

  .copyright {
    gap: 1.38vw;
  }
}

.mobile {
  display: flex;
  align-items: end;

  font-size: 3.75vw;
  line-height: 5.625vw;
  padding: 1.56vw 1.56vw 2.81vw;

  .menu-items {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 8vh;
  }

  .navigation-link {
    font-size: 8.75vw;
    line-height: 13vw;
  }

  .social-links {
    margin-bottom: 3.125vw;
  }

  .copyright {
    gap: 6.25vw;
  }
}
</style>
