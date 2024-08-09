<script setup lang="ts">
import { TextureLoader, SRGBColorSpace } from 'three'

const { texture } = defineProps({
  texture: {
    type: String,
    required: true
  }
})

const { scene } = useTresContext()

onBeforeMount(() => {
  const loader = new TextureLoader()
  const loadedTexture = loader.load(texture)
  loadedTexture.colorSpace = SRGBColorSpace

  scene.value.background = loadedTexture
})
</script>
