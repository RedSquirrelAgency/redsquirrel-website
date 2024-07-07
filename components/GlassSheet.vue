<template>
  <v-sheet class="glass">
    <slot />
  </v-sheet>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "styles/variables";

.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);

  border-radius: 3vw;
  border: 1px solid rgba(255, 255, 255, 0.3);

  box-shadow: 0 1.85px 3.15px 0 #CA5E3C04;
}
</style>
