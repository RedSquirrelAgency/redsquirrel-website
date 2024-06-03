<template>
  <CustomisedStars
    :rotation="[0, yRotation, 0]"
    :radius="50"
    :depth="40"
    :count="500"
    :size="0.7"
    :alpha-map="starsAlpha"
    :color="new Color('#FC8243')"
  />
  <TresPerspectiveCamera
    :fov="60"
  />
  <Suspense>
    <primitive :object="mesh">
      <Sparkles />
    </primitive>
  </Suspense>
  <TresDirectionalLight
    :position="new Vector3(0, 0, 30)"
    :intensity="10"
  />
</template>

<script setup lang="ts">
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { degToRad } from 'three/src/math/MathUtils'
import { Clock, Color, type PerspectiveCamera, TextureLoader } from 'three'
import {
  EquirectangularReflectionMapping,
  MeshPhysicalMaterial,
  Vector3
} from 'three'
import { useLoader, useTresContext } from '@tresjs/core'
import { RGBELoader } from 'three-stdlib'
import * as TWEEN from '@tweenjs/tween.js'
import CustomisedStars from '~/components/CustomisedStars.vue'

const props = defineProps({
  zoom: Number
})

const starsAlpha = new TextureLoader().load('/redsquirrel-website/star_alpha_map.png')
const hdrEquirect = new RGBELoader().load('/redsquirrel-website/empty_warehouse_01_2k.hdr', () => {
  hdrEquirect.mapping = EquirectangularReflectionMapping
})
const { children } = await useLoader(OBJLoader, '/redsquirrel-website/Squirrel.obj')
const mesh = children[0]
mesh.scale.set(0.025, 0.025, 0.025)
mesh.rotateY(2.5)

const material = new MeshPhysicalMaterial({
  roughness: 0,
  transmission: 1, // Add transparency
  thickness: 1, // Add refraction!
  envMap: hdrEquirect
})
mesh.material = material

const yRotation = shallowRef(0)
onMounted(() => {
  const { camera } = useTresContext()
  const perspectiveCamera = camera.value as PerspectiveCamera
  const clock = new Clock()

  const direction = new Vector3()
  const startPosition = new Vector3()
  perspectiveCamera.lookAt(mesh.position)
  perspectiveCamera.rotateX(0.1)
  perspectiveCamera.getWorldDirection(direction)
  startPosition.copy(perspectiveCamera.position)

  document.addEventListener('mousemove', (e) => {
    const percentageX = e.screenX / window.innerWidth
    mesh.rotation.y = degToRad(180 * percentageX)
  })

  useRenderLoop().onLoop(({ delta }) => {
    yRotation.value += 0.02 * delta

    const time = clock.getElapsedTime()
    mesh.position.y = Math.cos(time) * 0.1

    TWEEN.update()
  })

  watch(() => props.zoom, (zoom) => {
    if (!zoom) return
    const newPosition = new Vector3()
    const multipliedDirection = new Vector3()
    multipliedDirection.copy(direction).multiplyScalar(zoom)
    newPosition.addVectors(startPosition, multipliedDirection)
    perspectiveCamera.position.copy(newPosition)
  })
})
</script>
