<template>
  <primitive
    v-if="props.visible"
    :position="props.position"
    :object="mesh"
  >
    <Html
      center
      transform
      :distance-factor="1"
      :position="[0, 0, 0.025]"
      :scale="[0.75, 0.75, 0.75]"
    >
      <div class="item">
        <div class="index">
          {{ formatIndex(props.index) }}
        </div>
        <div class="content">
          <div class="title">
            {{ props.title }}
          </div>
          <div class="subtitle">
            <ul v-if="Array.isArray(props.subtitle)">
              <li
                v-for="(bullet, bulletIndex) in props.subtitle"
                :key="bulletIndex"
              >
                {{ bullet }}
              </li>
            </ul>
            <span v-else>
              {{ props.subtitle }}
            </span>
          </div>
        </div>
      </div>
    </Html>
  </primitive>
</template>

<script setup lang="ts">
import { Html } from '@tresjs/cientos'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { Mesh, MeshPhysicalMaterial } from 'three'

const props = defineProps(
  {
    index: Number,
    title: String,
    subtitle: { type: [String, Array] },
    position: Array,
    visible: Boolean
  })

const geometry = new RoundedBoxGeometry(1, 1, 0.2, 6, 2)
const material = new MeshPhysicalMaterial({
  roughness: 0,
  transmission: 1,
  thickness: 1
})
const mesh = new Mesh(geometry, material)

function formatIndex(index: number | undefined) {
  if (index === undefined) return ''
  return `${(index + 1).toString().padStart(2, '0')}`
}
</script>

<style scoped lang="scss">
@import "styles/variables";

.item {
  width: 535px;
  height: 535px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .index {
    color: $redsquirrel-chocolate;
    font-size: 70px;
    font-style: italic;
    margin-bottom: auto;
  }

  .content {
    color: $redsquirrel-chocolate;

    .title {
      font-size: 28px;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 15px;

      ul {
        margin-left: 10px;

        li::marker {
          color: $redsquirrel-peach-p1;
        }
      }
    }
  }
}
</style>
