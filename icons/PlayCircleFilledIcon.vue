<template>
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0ZM11.4583 26.7428L26.0833 18.299C27.0833 17.7217 27.0833 16.2783 26.0833 15.701L11.4583 7.25721C10.4583 6.67986 9.20833 7.40155 9.20833 8.55625L9.20833 25.4437C9.20833 26.5984 10.4583 27.3201 11.4583 26.7428Z" :fill="color"/>
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
