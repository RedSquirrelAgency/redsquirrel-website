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

const SQUIRREL_MESH_PATH = 'squirrel.obj'

const props = defineProps({
  scale: {
    default: 1,
    type: Number
  },
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
  },
  reflectionMap: {
    type: String
  }
})

const { position, rotation } = toRefs(props)
const { width, height } = useWindowSize()

const material = new MeshPhysicalMaterial({
  color: 'white',
  envMapIntensity: 0.4,
  roughness: props.roughness,
  transmission: props.transmission,
  thickness: props.thickness,
  ior: props.ior
})

if (props.reflectionMap) {
  const hdrEquirect = new RGBELoader().load(props.reflectionMap, () => {
    hdrEquirect.mapping = EquirectangularReflectionMapping
  })
  material.envMap = hdrEquirect
}

const { children } = await useLoader(OBJLoader, SQUIRREL_MESH_PATH)
const mesh = children[0]
mesh.material = material

onMounted(() => {
  updateScale()
  updatePosition()
  updateRotation()
})

watch([width, height], updateScale)
watch(() => props.position, updatePosition)
watch(() => props.rotation, updateRotation)

function updatePosition() {
  mesh.position.set(...position.value)
}

function updateRotation() {
  mesh.rotation.set(...rotation.value)
}

function updateScale() {
  const scale = (width.value / height.value) * props.scale
  mesh.scale.set(scale, scale, scale)
}
</script>
