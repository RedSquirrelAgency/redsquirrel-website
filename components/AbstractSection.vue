<template>
  <v-main>
    <slot />
  </v-main>
</template>

<script setup lang="ts">
const emits = defineEmits(['next', 'back'])
const props = defineProps({
  enter: { type: Object },
  afterEnter: { type: Object },
  beforeLeave: { type: Object },
  leave: { type: Object }
})

watch(() => props.enter, onEnter)
watch(() => props.afterEnter, onAfterEnter)
watch(() => props.beforeLeave, onBeforeLeave)
watch(() => props.leave, onLeave)

function onEnter(params: any) {
  const { el, done } = params
}

function onAfterEnter(params: any) {
}

function onBeforeLeave(params: any) {
}

function onLeave(params: any) {
  const { el, done } = params
}
</script>

<style scoped lang="scss">

</style>
