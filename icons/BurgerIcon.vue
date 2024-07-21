<template>
  <svg width="42" height="15" viewBox="0 0 42 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M41 0.5L1 0.499997" :stroke="color" stroke-linecap="round"/>
    <path d="M31 7.5L1 7.5" :stroke="color" stroke-linecap="round"/>
    <path d="M41 14.5L1 14.5" :stroke="color" stroke-linecap="round"/>
  </svg>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  color: {
    type: String,
    default: 'black'
  }
})
</script>
