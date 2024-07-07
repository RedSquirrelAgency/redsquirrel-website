<template>
  <svg width="24" height="24" viewBox="0 0 24 24" :fill="color" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 0C1.34314 0 0 1.34314 0 3V21C0 22.6569 1.34314 24 3 24H21C22.6569 24 24 22.6569 24 21V3C24 1.34314 22.6569 0 21 0H3ZM6.5 5C6.5 4.44772 6.94771 4 7.5 4H9.5C10.0523 4 10.5 4.44772 10.5 5V19C10.5 19.5523 10.0523 20 9.5 20H7.5C6.94771 20 6.5 19.5523 6.5 19V5ZM13.5 5C13.5 4.44772 13.9477 4 14.5 4H16.5C17.0523 4 17.5 4.44772 17.5 5V19C17.5 19.5523 17.0523 20 16.5 20H14.5C13.9477 20 13.5 19.5523 13.5 19V5Z" />
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
