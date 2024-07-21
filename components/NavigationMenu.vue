<template>
  <div class="container">
    <v-row>
      <v-col class="my-auto text-left social-links">
        <SocialLinks />
      </v-col>
      <v-col
        cols="6"
        class="my-auto text-center"
      >
        <NuxtLink
          v-for="(link, index) in navigationLinks"
          :key="index"
          :to="link.to"
          class="text-link"
          :class="hoveredNavigationLink === index && 'style-script'"
          @mouseover="hoveredNavigationLink = index"
          @mouseleave="hoveredNavigationLink = -1"
        >
          <span>{{ $t(link.title) }}</span>
          <v-icon
            v-if="hoveredNavigationLink === index"
            size="3vw"
            icon="mdi-arrow-top-right"
            class="arrow-icon"
          />
        </NuxtLink>
      </v-col>
      <v-col class="my-auto text-right">
        <div>
          Munich, 81927
        </div>
        <div>
          Germany
        </div>
        <div>
          144/202/21135
        </div>
        <div>
          DE362321598
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const eventListener = (e: WheelEvent) => e.preventDefault()

onMounted(() => document.addEventListener('wheel', eventListener, { passive: false }))
onUnmounted(() => document.removeEventListener('wheel', eventListener))

const hoveredNavigationLink = ref(-1);

const navigationLinks = [
  { title: 'Portfolio', to: '/' },
  { title: 'Approach', to: '/' },
  { title: 'Stages', to: '/' },
  { title: 'Reviews', to: '/' },
  { title: 'Get in touch', to: '/' }
]
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  padding: 8vw;

  background-color: #FFFBF7E5;
  color: $redsquirrel-chocolate-m1;
  text-transform: uppercase;
}

.social-links {
  line-height: 2vw;
}

.text-link {
  font-size: 4vw;
  line-height: 5vw;
  color: $redsquirrel-peach-p1;

  &:hover {
    color: $redsquirrel-chocolate;
  }

  .arrow-icon {
    margin-left: 0.4vw;
    vertical-align: middle;
  }
}
</style>
