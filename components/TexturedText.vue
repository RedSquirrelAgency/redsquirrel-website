<template>
  <Text3D
    font="Poppins_Medium_Regular.json"
    text="REDSQUIRREL"
    :size="relativeSize"
    :position="props.position"
    :height="0"
    :bevel-enabled="false"
    need-updates
    center
  >
    <TresMeshBasicMaterial
      :map="mapTexture"
      :transparent="opacity < 1"
      :opacity="props.opacity"
    />
  </Text3D>
</template>

<script setup lang="ts">
import { SRGBColorSpace, TextureLoader } from 'three'
import type { Texture } from 'three/src/textures/Texture'

const props = defineProps({
  size: {
    type: Number,
    default: 1
  },
  position: {
    type: Array as PropType<Array<number>>,
    required: false
  },
  opacity: {
    type: Number,
    required: false,
    default: 1
  },
  map: {
    type: String,
    required: false
  }
})

const mapTexture = ref<Texture | null>(null)
const opacity = ref(props.opacity)
const position = ref(props.position)
const { width, height } = useWindowSize()

const relativeSize = computed(() => {
  return ((width.value) / (height.value)) * props.size
})

onBeforeMount(() => {
  if (props.map) {
    const loader = new TextureLoader()
    const texture = loader.load(props.map)
    texture.colorSpace = SRGBColorSpace
    mapTexture.value = texture
  }
})

watchEffect(() => {
  opacity.value = props.opacity
  position.value = props.position
})
</script>
