<template>
  <slot />
</template>

<script setup lang="ts">
import { TextureLoader, SRGBColorSpace } from 'three'

const { scene } = useTresContext()

const loader = new TextureLoader()
const texture = loader.load('background_gradient.png')
texture.colorSpace = SRGBColorSpace
scene.value.background = texture
</script>
