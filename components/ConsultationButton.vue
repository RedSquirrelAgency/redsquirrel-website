<template>
  <v-btn
    href="https://cal.com/redsquirrel/30min"
    v-bind="buttonProps"
    append-icon="mdi-arrow-right"
    :class="!$vuetify.display.mdAndUp && 'mobile'"
  >
    {{ $t("Book a consultation") }}
  </v-btn>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

type ConsultationButtonVariant = 'default' | 'plain'

const { variant, block, textColor } = defineProps({
  variant: {
    type: String as PropType<ConsultationButtonVariant>,
    default: 'default'
  },
  block: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String
  }
})

const buttonProps = computed(() => {
  let props: any = {}
  switch (variant) {
    case 'default':
      props = {
        class: 'default',
        variant: 'flat'
      }
      break
    case 'plain':
      props = {
        class: 'plain',
        variant: 'plain',
        ripple: false
      }
      break
  }
  props.style = { color: textColor }
  props.block = block
  return props
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.default {
  background: #FFDFCFE5;

  border-radius: 0.7vw;
  border-width: 1px;
  border-color: $redsquirrel-cream-p1;
  box-shadow: 0 1rem 3rem 0 #D3835B1A;

  font-size: 0.8vw;
  font-weight: 400;
  letter-spacing: 0;
  color: $redsquirrel-chocolate;

  &.mobile {
    font-size: 3.75vw;
    line-height: 5.625vw;
    border-radius: 3.125vw;
  }
}

.plain {
  font-size: 1vw;
  color: $redsquirrel-cream-p1;

  &.mobile {
    font-size: 3.75vw;
    line-height: 5.625vw;
  }
}
</style>
