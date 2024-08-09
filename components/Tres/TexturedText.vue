<template>
  <Text3D
    :font="font"
    :text="text"
    :size="relativeSize"
    :position="position"
    :height="0"
    :bevel-enabled="false"
    :need-updates="needUpdates"
    center
  >
    <TresMeshBasicMaterial
      :map="mapTexture"
      :transparent="opacity < 1"
      :opacity="opacity"
    />
  </Text3D>
</template>

<script setup lang="ts">
import { SRGBColorSpace, TextureLoader } from 'three'
import type { Texture } from 'three/src/textures/Texture'

const { map, size } = defineProps({
  text: {
    type: String,
    required: true
  },
  font: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 1
  },
  position: {
    type: Array as PropType<Array<number>>
  },
  opacity: {
    type: Number,
    default: 1
  },
  map: {
    type: String,
  },
  needUpdates: {
    type: Boolean,
    default: false
  }
})

const mapTexture = ref<Texture | null>(null)
const relativeSize = ref()

onBeforeMount(() => {
  if (map) {
    const loader = new TextureLoader()
    const texture = loader.load(map)
    texture.colorSpace = SRGBColorSpace
    mapTexture.value = texture
  }
})

const { width, height } = useWindowSize()
watch([width, height], updateRelativeSize)
onMounted(updateRelativeSize)

function updateRelativeSize() {
  relativeSize.value = ((width.value) / (height.value)) * size
}
</script>
