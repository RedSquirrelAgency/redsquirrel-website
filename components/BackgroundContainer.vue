<template>
  <v-main>
    <div class="container fill-height">
      <div class="background">
        <img
          class="star"
          src="/figures/star.svg"
        >
        <img
          class="vector"
          src="/figures/vector.svg"
        >
        <img
          class="ellipse"
          src="/figures/ellipse.svg"
        >
        <img
          class="rectangle"
          src="/figures/rectangle.svg"
        >
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </v-main>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  background-color: $redsquirrel-peach;
}

.container .background, .content {
  position: absolute;
}

.background {
  width: 100%;
  height: 100%;
  overflow: hidden;
  perspective: 1000px;
  perspective-origin: 50% 50%;

  .star {
    position: absolute;
    left: -300px;
    top: -100px;
    animation: movement-1 7s ease-in-out infinite alternate;
  }

  .vector {
    position: absolute;
    left: 300px;
    top: -100px;
    animation: movement-1 7s ease-in-out infinite alternate-reverse;
    animation-delay: .1s;
  }

  .ellipse {
    position: absolute;
    left: 300px;
    top: 500px;
    animation: movement-1 7s ease-in-out infinite alternate;
  }

  .rectangle {
    position: absolute;
    right: -50px;
    top: -280px;
    animation: movement-2 7s ease-in-out infinite alternate-reverse;
    animation-delay: .2s;
  }
}

@keyframes movement-1 {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(10deg) rotateY(20deg);
  }
}

@keyframes movement-2 {
  0% {
    scale: 0.98;
  }
  100% {
    scale: 1.1;
  }
}

.content {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
