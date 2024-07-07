<script setup lang="ts">
import { computed, ref, shallowRef, toRefs, watchEffect } from 'vue'
import { Color, Spherical, TextureLoader, Vector3 } from 'three'

export interface FloatingStarsProps {
  /**
   * The size of the stars.
   *
   * @type {number}
   * @memberof FloatingStarsProps
   * @default 0.1
   */
  size?: number
  /**
   * keep the same size regardless distance.
   *
   * @type {boolean}
   * @memberof FloatingStarsProps
   * @default true
   */
  sizeAttenuation?: boolean
  /**
   * show transparency on the stars texture.
   *
   * @type {boolean}
   * @memberof FloatingStarsProps
   * @default true
   */
  transparent?: boolean
  /**
   * enables the WebGL to know when not to render the pixel.
   *
   * @type {number}
   * @memberof FloatingStarsProps
   * @default 0.01
   */
  alphaTest?: number
  /**
   * number of stars.
   *
   * @type {number}
   * @memberof FloatingStarsProps
   * @default 5000
   */
  count?: number
  /**
   * depth of star's shape.
   *
   * @type {number}
   * @memberof FloatingStarsProps
   * @default 50
   */
  depth?: number
  /**
   * Radius of star's shape.
   *
   * @type {number}
   * @memberof FloatingStarsProps
   * @default 100
   */
  radius?: number
  /**
   * texture of the stars.
   *
   * @type {Texture}
   * @memberof FloatingStarsProps
   * @default null
   */
  alphaMap?: string
  /**
   * color of the stars.
   *
   * @type {Color}
   * @memberof FloatingStarsProps
   * @default null
   */
  color?: string

  /**
   * speed of the stars floating
   *
   * @type {number}
   * @memberof FloatingStarsProps
   * @default 1
   */
  floatSpeed?: number

  /**
   * range of the stars floating
   *
   * @type {number[]}
   * @memberof FloatingStarsProps
   * @default [-0.01, 0.01]
   */
  floatRange?: [number, number]

  /**
   * range of the stars opacity
   *
   * @type {number[]}
   * @memberof FloatingStarsProps
   * @default [0.1, 1]
   */
  opacityRange?: [number, number]
}

const props = withDefaults(defineProps<FloatingStarsProps>(), {
  size: 0.1,
  sizeAttenuation: true,
  transparent: true,
  alphaTest: 0.01,
  count: 5000,
  depth: 50,
  radius: 100,
  color: 'white',
  floatSpeed: 1,
  floatRange: () => [-0.01, 0.01],
  opacityRange: () => [0.1, 1]
})

const scale = ref()
const stars = ref()

const starsArray: Float32Array[] = []

const { radius, depth, count, size, sizeAttenuation, transparent, alphaMap, alphaTest } = toRefs(props)

const setStars = () => {
  let circle = radius.value + depth.value
  const increment = computed(() => depth.value / count.value)

  const scaleArray: number[] = Array.from(
    { length: count.value },
    () => (0.5 + 0.5 * Math.random()) * 4
  )

  const generateStars = (circle: number): number[] => {
    return new Vector3()
      .setFromSpherical(new Spherical(circle, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI))
      .toArray()
  }

  for (let i = 0; i < count.value; i++) {
    circle -= increment.value * Math.random()
    starsArray.push(new Float32Array(generateStars(circle)))
  }
  stars.value = starsArray
  scale.value = new Float32Array(scaleArray)
}

const generateOpacity = () => {
  const min = props.opacityRange[0]
  const max = props.opacityRange[1]
  return Math.random() * (max - min) + min
}

const alphaMapTexture = computed(() => {
  if (alphaMap.value) {
    return new TextureLoader().load(alphaMap.value)
  }
  return null
})

watchEffect(() => {
  setStars()
})

const starsRef = shallowRef()

defineExpose({
  value: starsRef
})
</script>

<template>
  <Levioso
    v-for="(star, index) in stars"
    :key="index"
    :range="floatRange"
    :speed="floatSpeed"
  >
    <TresPoints>
      <TresBufferGeometry
        :position="[star, 3]"
        :a-scale="[scale, 1]"
      />
      <TresPointsMaterial
        :color="new Color(color)"
        :size="size"
        :size-attenuation="sizeAttenuation"
        :transparent="transparent"
        :alpha-test="alphaTest"
        :alpha-map="alphaMapTexture"
        :opacity="generateOpacity()"
      />
    </TresPoints>
  </Levioso>
</template>
