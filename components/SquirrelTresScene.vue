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
  <SquirrelTresComponent
    :position="squirrelPosition"
    :rotation="squirrelRotation"
    :sparkle="false"
    :transmission="0.9"
    :roughness="0.1"
    :thickness="1"
    :ior="5"
  />
</template>

<script setup lang="ts">
import { degToRad } from 'three/src/math/MathUtils'
import {
  Clock,
  Color,
  type PerspectiveCamera,
  TextureLoader
} from 'three'
import {
  Vector3
} from 'three'
import { useTresContext } from '@tresjs/core'
import * as TWEEN from '@tweenjs/tween.js'
import CustomisedStars from '~/components/CustomisedStars.vue'
import SquirrelTresComponent from "~/components/SquirrelTresComponent.vue";

const props = defineProps({
  zoom: Number
})

const starsAlpha = new TextureLoader().load('/redsquirrel-website/star_alpha_map.png')
const yRotation = shallowRef(0)
const squirrelPosition = shallowRef([0, 0, 0])
const squirrelRotation = shallowRef([0, 0, 0])

onMounted(() => {
  const { camera } = useTresContext()
  const perspectiveCamera = camera.value as PerspectiveCamera
  const clock = new Clock()

  const direction = new Vector3()
  const startPosition = new Vector3()
  perspectiveCamera.lookAt(arrayToVector3(squirrelPosition.value))
  perspectiveCamera.rotateX(0.1)
  perspectiveCamera.getWorldDirection(direction)
  startPosition.copy(perspectiveCamera.position)

  function arrayToVector3(array: number[]): Vector3 {
    return new Vector3(array[0], array[1], array[2])
  }

  document.addEventListener('mousemove', (e) => {
    const percentageX = e.screenX / window.innerWidth
    squirrelRotation.value[1] = degToRad(180 * percentageX)
    squirrelRotation.value = [...squirrelRotation.value]
  })

  useRenderLoop().onLoop(({ delta }) => {
    yRotation.value += 0.02 * delta

    const time = clock.getElapsedTime()
    squirrelPosition.value[1] = Math.cos(time) * 0.1
    squirrelPosition.value = [...squirrelPosition.value]

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
