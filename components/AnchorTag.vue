<template>
  <div
    :id="hash"
    class="anchor-tag"
    :anchor-offset="offset"
  />
</template>

<script setup lang="ts">
const { hash, offset } = defineProps({
  hash: {
    type: String,
    required: true
  },
  offset: {
    type: Number,
    required: false
  }
})
</script>

<style scoped lang="scss">
.anchor-tag {
  width: 100%;
}
</style>
