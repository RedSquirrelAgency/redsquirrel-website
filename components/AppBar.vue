<template>
  <v-app-bar
    :key="variant"
    v-bind="appBarProps"
  >
    <v-row class="bar-row">
      <v-app-bar-nav-icon
        :class="menuOpen ? 'close-button' : 'burger-button'"
        :ripple="false"
        variant="plain"
        tile
        @click.stop="menuOpen = !menuOpen"
      >
        <BurgerIcon
          v-if="!menuOpen"
          :color="colorScheme.burger"
        />
        <CloseIcon
          v-else
          :color="colorScheme.burger"
        />
      </v-app-bar-nav-icon>

      <v-spacer v-if="variant !== 'floating' && mdAndUp" />
      <div
        v-if="variant !== 'floating' && mdAndUp"
        class="location"
        :style="{ color: colorScheme.location }"
      >
        <span class="icon">
          <MapPinIcon :color="colorScheme.location" />
        </span>
        <span>{{ $t('Munich, Germany') }}</span>
      </div>

      <v-spacer v-if="mdAndUp" />
      <LanguageSwitcher
        v-if="mdAndUp"
        :inactive-color="colorScheme.inactiveLanguage"
        :active-color="colorScheme.activeLanguage"
      />

      <v-spacer />
      <CTAButton
        variant="plain"
        :href="CONSULTATION_URL"
        :text-color="colorScheme.link"
      >
        {{ $t("Book a consultation") }}
      </CTAButton>
    </v-row>
  </v-app-bar>
  <Transition>
    <NavigationMenu
      v-if="menuOpen"
      @close="menuOpen = false"
    />
  </Transition>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useDisplay } from 'vuetify'
import { CONSULTATION_URL } from '~/constants/urls'

const menuOpen = ref<boolean>(false)

const props = defineProps({
  variant: {
    type: String as PropType<AppBarVariant>,
    default: 'fixed'
  }
})

const variant = computed(() => {
  if (menuOpen.value) return 'menu'
  return props.variant
})

const { mdAndUp } = useDisplay()
const appBarProps = computed(() => {
  const classes = []
  classes.push(mdAndUp.value ? 'desktop' : 'mobile')

  let specificProps = {}
  switch (variant.value) {
    case 'menu':
      classes.push('fixed-bar')
      specificProps = {
        color: 'rgba(255, 255, 255, 0)',
        elevation: 0,
        flat: true,
        tile: true
      }
      break
    case 'fixed':
      classes.push('fixed-bar')
      specificProps = {
        color: 'rgba(255, 255, 255, 0)',
        elevation: 0,
        flat: true,
        tile: true
      }
      break
    case 'floating':
      classes.push('floating-bar')
      specificProps = {
        color: 'rgba(255, 255, 255, 0.6)',
        position: 'static',
        scrollBehavior: 'fully-hide',
        scrollThreshold: 1000
      }
      break
  }

  return {
    ...specificProps,
    class: classes.join(' '),
    height: 0.07 * window.innerHeight
  }
})

const colorScheme = computed(() => {
  switch (variant.value) {
    case 'menu':
      return {
        burger: '#85553D', // $redsquirrel-chocolate
        location: '#C38D72', // $redsquirrel-chocolate-m1
        activeLanguage: '#C38D72', // $redsquirrel-chocolate-m1
        inactiveLanguage: '#FFD2BB', // $redsquirrel-cream-p1
        link: '#85553D' // $redsquirrel-chocolate
      }
    case 'fixed':
      return {
        burger: '#FFD2BB', // $redsquirrel-cream-p1
        location: '#D49A87',
        activeLanguage: '#FFD2BB', // $redsquirrel-cream-p1
        inactiveLanguage: '#D49A87',
        link: '#FFD2BB' // $redsquirrel-cream-p1
      }
    case 'floating':
      return {
        burger: '#85553D', // $redsquirrel-chocolate
        location: '#E3B1A1',
        activeLanguage: '#85553D', // $redsquirrel-chocolate
        inactiveLanguage: '#E3B1A1',
        link: '#85553D' // $redsquirrel-chocolate
      }
    default:
      return {}
  }
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.desktop {
  &.fixed-bar {
    .bar-row {
      padding: 0 8vw;
    }
  }

  &.floating-bar {
    top: 0.5vw !important;
    width: 41.6vw !important;
    border-radius: 1.38vw;

    .bar-row {
      padding: 0 2vw;
    }
  }

  .bar-row {
    .burger-button svg {
      width: 2.77vw;
      height: 0.97vw;
    }

    .close-button svg {
      width: 3vw;
      height: 3vw;
    }
  }
}

.mobile {
  &.fixed-bar {
    .bar-row {
      padding-left: 3vw;
      padding-right: 1vw;
    }
  }

  &.floating-bar {
    width: 96.8vw !important;
    border-radius: 3.125vw;

    .bar-row {
      padding: 0 3.125vw;
    }
  }

  .bar-row {
    .burger-button svg {
      width: 9.37vw;
      height: 4.37vw;
    }

    .close-button svg {
      width: 9.37vw;
      height: 9.37vw;
    }
  }
}

.fixed-bar {
  display: flex;
  justify-content: center;
}

.floating-bar {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.5);

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}

.bar-row {
  display: flex;
  align-items: center;

  .location {
    text-transform: uppercase;
    font-size: 1vw;
    color: #D49A87;

    .icon {
      margin-right: 0.7em;
      vertical-align: middle;

      svg {
        width: 1vw;
        height: 1vw;
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
