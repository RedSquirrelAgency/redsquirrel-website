<template>
  <v-btn
    href="https://cal.com/redsquirrel/30min"
    v-bind="buttonProps"
    append-icon="mdi-arrow-right"
  >
    {{ $t("Book a consultation") }}
  </v-btn>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useDisplay } from 'vuetify'

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

const { mdAndUp } = useDisplay()
const buttonProps = computed(() => {
  let props: any = {}

  const classes = []
  classes.push('button')
  classes.push(variant)
  classes.push(mdAndUp.value ? 'desktop' : 'mobile')

  switch (variant) {
    case 'default':
      props = {
        variant: 'flat'
      }
      break
    case 'plain':
      props = {
        variant: 'plain',
        ripple: false
      }
      break
  }

  props.style = { color: textColor, opacity: 1 }
  props.class = classes.join(' ')
  props.block = block
  props.baseColor = textColor
  props.color = textColor

  return props
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.button {
  letter-spacing: 0;
}

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
