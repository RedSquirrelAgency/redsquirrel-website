<template>
  <v-btn
    v-for="localeCode in localeCodes"
    :key="localeCode"
    class="language-switcher-button"
    :style="{ color: localeCode === locale ? selectedColor : color }"
    :ripple="false"
    variant="plain"
    min-width="2.5vw"
    @click.stop="setLocale(localeCode)"
  >
    {{ localeCode }}
  </v-btn>
</template>

<script setup lang="ts">
const { localeCodes, setLocale, locale } = useI18n()

const { color, selectedColor } = defineProps({
  color: {
    type: String
  },
  selectedColor: {
    type: String
  }
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.language-switcher-button {
  font-size: 1vw;
  text-transform: uppercase;

  margin: 0;
  padding: 0;
}
</style>
