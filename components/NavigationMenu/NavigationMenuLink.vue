<template>
  <a
    :href="link.to"
    class="text-link navigation-menu-link"
    @click.stop="emit('click')"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <span>{{ $t(link.title) }}</span>
    <v-icon
      v-if="hovered"
      size="3vw"
      icon="mdi-arrow-top-right"
      class="arrow-icon"
    />
  </a>
</template>

<script setup lang="ts">
const hovered = ref(false)

interface INavigationLink {
  title: string
  to: string
}

const emit = defineEmits(['click'])

defineProps({
  link: {
    type: Object as PropType<INavigationLink>,
    required: true
  }
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.navigation-menu-link {
  color: $redsquirrel-peach-p1;
  font-weight: 300;

  &:hover {
    color: $redsquirrel-chocolate;
    font-family: "Style Script", cursive;
    font-weight: 400;
    font-style: normal;
  }

  .arrow-icon {
    margin-left: 0.4vw;
    vertical-align: middle;
  }
}
</style>
