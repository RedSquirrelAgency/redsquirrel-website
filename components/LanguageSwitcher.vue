<template>
  <div :class="mdAndUp ? 'desktop' : 'mobile'">
    <v-btn
      v-for="localeCode in localeCodes"
      :key="localeCode"
      class="button"
      :style="{ color: localeCode === locale ? activeColor : inactiveColor }"
      :ripple="false"
      variant="plain"
      @click.stop="setLocale(localeCode)"
    >
      {{ localeCode }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const { localeCodes, setLocale, locale } = useI18n()

const { inactiveColor, activeColor } = defineProps({
  inactiveColor: {
    type: String
  },
  activeColor: {
    type: String
  }
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.desktop .button {
  font-size: 1vw;
  line-height: 1.45vw;
  min-width: 2vw;
}

.mobile .button {
  font-size: 4.375vw;
  line-height: 6.562vw;
  min-width: 10vw;
}

.button {
  text-transform: uppercase;
  letter-spacing: 0;
  margin: 0;
  padding: 0;
}
</style>
