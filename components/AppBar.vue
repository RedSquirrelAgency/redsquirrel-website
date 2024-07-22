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
          :color="colorScheme.activeLink"
        />
        <CloseIcon
          v-else
          :color="colorScheme.activeLink"
        />
      </v-app-bar-nav-icon>
      <v-spacer v-if="variant !== 'floating'" />
      <div
        v-if="variant !== 'floating'"
        class="location"
      >
        <span class="icon">
          <MapPinIcon color="#D49A87" />
        </span>
        <span>{{ $t('Munich, Germany') }}</span>
      </div>
      <v-spacer />
      <LanguageSwitcher
        :color="colorScheme.disabledLink"
        :selected-color="colorScheme.activeLink"
      />
      <v-spacer />
      <ConsultationButton
        variant="plain"
        :text-color="colorScheme.activeLink"
      />
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

const appBarProps = computed(() => {
  switch (variant.value) {
    case 'menu':
      return {
        class: 'fixed-bar',
        color: 'rgba(255, 255, 255, 0)',
        elevation: 0,
        flat: true,
        tile: true
      }
    case 'fixed':
      return {
        class: 'fixed-bar',
        color: 'rgba(255, 255, 255, 0)',
        elevation: 0,
        flat: true,
        tile: true
      }
    case 'floating':
      return {
        class: 'floating-bar',
        color: 'rgba(255, 255, 255, 0.6)',
        position: 'static',
        scrollBehavior: 'fully-hide',
        scrollThreshold: 1000
      }
    default:
      return {}
  }
})

const colorScheme = computed(() => {
  switch (variant.value) {
    case 'menu':
      return {
        text: '#C38D72',
        activeLink: '#C38D72',
        disabledLink: '#FFD2BB'
      }
    case 'fixed':
      return {
        text: '#D49A87',
        activeLink: '#FFD2BB',
        disabledLink: '#D49A87'
      }
    case 'floating':
      return {
        text: '#85553D',
        activeLink: '#85553D',
        disabledLink: '#E3B1A1'
      }
    default:
      return {}
  }
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.fixed-bar {
  display: flex;
  justify-content: center;
  height: 4vw;

  .bar-row {
    padding: 0 8vw;
  }
}

.floating-bar {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 1vw;

  top: 0.5vw !important;
  width: 41.6vw !important;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;

  .bar-row {
    padding: 0 2vw;
  }
}

.bar-row {
  display: flex;
  align-items: center;
}

.burger-button svg {
  width: 2.77vw;
  height: 0.97vw;
}

.close-button svg {
  width: 3vw;
  height: 3vw;
}

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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
