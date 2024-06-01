<template>
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

  .star {
    position: absolute;
    left: -300px;
    top: -100px;
  }

  .vector {
    position: absolute;
    left: 300px;
    top: -100px;
  }

  .ellipse {
    position: absolute;
    left: 300px;
    top: 500px;
  }

  .rectangle {
    position: absolute;
    right: -50px;
    top: -280px;
  }
}

.content {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
