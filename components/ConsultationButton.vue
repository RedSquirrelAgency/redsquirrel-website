<template>
  <v-btn
    href="https://cal.com/redsquirrel/30min"
    class="button"
    append-icon="mdi-arrow-right"
    variant="flat"
    :block="block"
  >
    {{ $t("Book a consultation") }}
  </v-btn>
</template>

<script setup lang="ts">
const { block } = defineProps({
  block: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.button {
  min-width: 13.2vw;
  height: 2.1vw;
  background: #FFDFCFE5;

  border-radius: 0.6vw;
  border-width: 1px;
  border-color: $redsquirrel-cream-p1;
  box-shadow: 0 1rem 3rem 0 #D3835B1A;

  font-size: 0.8rem;
  letter-spacing: 0.05rem;
  color: $redsquirrel-chocolate;
}
</style>
