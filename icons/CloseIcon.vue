<template>
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 35L35 8.00006" :stroke="color" stroke-linecap="round"/>
    <path d="M8 8L35 35" :stroke="color" stroke-linecap="round"/>
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
