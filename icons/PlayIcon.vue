<template>
  <svg width="24" height="24" viewBox="0 0 24 24" :fill="color" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 0C1.34314 0 0 1.34314 0 3V21C0 22.6569 1.34314 24 3 24H21C22.6569 24 24 22.6569 24 21V3C24 1.34314 22.6569 0 21 0H3ZM17.75 13.299C18.75 12.7217 18.75 11.2783 17.75 10.701L8.75 5.50482C7.75 4.92746 6.5 5.64914 6.5 6.80383V17.1961C6.5 18.3509 7.75 19.0725 8.75 18.4952L17.75 13.299Z" />
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
