<template>
  <div>
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
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .button {
    font-size: 1vw;
    line-height: 1.45vw;
    min-width: 2vw;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .button {
    font-size: 4.375vw;
    line-height: 6.562vw;
    min-width: 10vw;
  }
}

.button {
  text-transform: uppercase;
  letter-spacing: 0;
  margin: 0;
  padding: 0;
}
</style>
