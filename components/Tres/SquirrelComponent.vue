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
  }
})

const { position, rotation } = toRefs(props)

const hdrEquirect = new RGBELoader().load('evening_road_01_puresky_2k.hdr', () => {
  hdrEquirect.mapping = EquirectangularReflectionMapping
})
const material = new MeshPhysicalMaterial({
  envMap: hdrEquirect,
  color: 'white',
  envMapIntensity: 0.4
})

const { children } = await useLoader(OBJLoader, 'Squirrel.obj')
const mesh = children[0]
mesh.material = material

const { width, height } = useWindowSize()

watch([width, height], () => updateMeshPositionAndScale())
watchEffect(() => {
  updateMeshPositionAndScale()
  mesh.rotation.set(...rotation.value)
  material.roughness = props.roughness
  material.transmission = props.transmission
  material.thickness = props.thickness
  material.ior = props.ior
})
onMounted(() => updateMeshPositionAndScale())

function updateMeshPositionAndScale() {
  const scale = (width.value / height.value) * props.scale
  const adjustedPosition = [...position.value]
  mesh.scale.set(scale, scale, scale)
  mesh.position.set(...adjustedPosition)
}
</script>
