<template>
  <v-btn
    :href="href"
    v-bind="buttonProps"
    class="button"
    append-icon="mdi-arrow-right"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useDisplay } from 'vuetify'

type CTAButtonVariant = 'default' | 'plain'

const { mdAndUp } = useDisplay()
const { variant, block, textColor, openInNewTab } = defineProps({
  href: {
    type: String,
    required: true
  },
  variant: {
    type: String as PropType<CTAButtonVariant>,
    default: 'default'
  },
  block: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String
  },
  openInNewTab: {
    type: Boolean,
    default: false
  }
})

const buttonProps = computed(() => {
  let props: any = {}

  switch (variant) {
    case 'default':
      props = {
        variant: 'flat',
        height: mdAndUp.value ? '2.36vw' : '10.625vw'
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
  props.class = variant
  props.block = block
  props.baseColor = textColor
  props.color = textColor

  if (openInNewTab) {
    props.target = '_blank'
  }

  return props
})
</script>

<style scoped lang="scss">
@import "styles/variables";
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .default {
    font-size: 0.8vw;
    font-weight: 400;
    letter-spacing: 0;
    border-radius: 0.7vw;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .default {
    font-size: 3.75vw;
    line-height: 5.625vw;
    border-radius: 3.125vw;
  }
}

.button {
  letter-spacing: 0;
}

.default {
  background: #FFDFCFE5;
  border-width: 1px;
  border-color: $redsquirrel-cream-p1;
  box-shadow: 0 1rem 3rem 0 #D3835B1A;
  color: $redsquirrel-chocolate;
}

.plain {
  color: $redsquirrel-cream-p1;
}
</style>
