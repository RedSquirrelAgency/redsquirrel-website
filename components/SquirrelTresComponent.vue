<template>
  <primitive :object="mesh">
    <Sparkles v-if="props.sparkle" />
  </primitive>
</template>

<script setup lang="ts">
import { useLoader } from '@tresjs/core'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { EquirectangularReflectionMapping, MeshPhysicalMaterial } from 'three'
import { RGBELoader } from 'three-stdlib'
import type { PropType } from 'vue'

const props = defineProps({
  position: {
    default: () => [0, 0, 0] as Array<number>,
    type: Array as PropType<Array<number>>
  },
  rotation: {
    default: () => [0, 2.5, 0] as Array<number>,
    type: Array as PropType<Array<number>>
  },
  roughness: {
    default: 0,
    type: Number
  },
  transmission: {
    default: 1,
    type: Number
  },
  thickness: {
    default: 1,
    type: Number
  },
  ior: {
    default: 1.5,
    type: Number
  },
  sparkle: {
    default: true,
    type: Boolean
  }
})

const { position, rotation } = toRefs(props)

const hdrEquirect = new RGBELoader().load('/redsquirrel-website/empty_warehouse_01_2k.hdr', () => {
  hdrEquirect.mapping = EquirectangularReflectionMapping
})
const material = new MeshPhysicalMaterial({
  envMap: hdrEquirect,
})

const { children } = await useLoader(OBJLoader, '/redsquirrel-website/Squirrel.obj')
const mesh = children[0]
mesh.scale.set(0.025, 0.025, 0.025)
mesh.material = material

watchEffect(() => {
  mesh.position.set(...position.value)
  mesh.rotation.set(...rotation.value)
  material.roughness = props.roughness
  material.transmission = props.transmission
  material.thickness = props.thickness
  material.ior = props.ior
})
</script>
