<template>
  <TresPerspectiveCamera />
  <TresGridHelper />
  <TresAmbientLight />
  <TresMesh>
    <TresBoxGeometry />
    <TresMeshNormalMaterial />
    <Html
      center
      transform
      :distance-factor="4"
      :position="[0, 0, 0.65]"
      :scale="[0.75, 0.75, 0.75]"
    >
      <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
        I'm a Box 📦
      </h1>
    </Html>
  </TresMesh>
</template>

<script setup lang="ts">
import { Html } from '@tresjs/cientos'
</script>
