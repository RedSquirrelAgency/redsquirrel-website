<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list-item
        link
        title="English"
        @click="setLocale('en')"
      />
      <v-list-item
        link
        title="Русский"
        @click="setLocale('ru')"
      />
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title class="title">
        {{ $t('Welcome') }}
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <TresCanvas window-size>
        <TresPerspectiveCamera />
        <TresMesh>
          <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
          <TresMeshBasicMaterial color="orange" />
        </TresMesh>
      </TresCanvas>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)
const { $gsap } = useNuxtApp()
const { setLocale } = useI18n()

onMounted(() => {
  $gsap.to('.title', { rotation: 2, duration: 1 })
})
</script>

<script>
export default {
  data: () => ({ drawer: null })
}
</script>
