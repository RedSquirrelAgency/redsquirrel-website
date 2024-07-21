<template>
  <NuxtLink
    v-for="(link, index) in socialLinks"
    :key="index"
    :to="link.to"
    :class="linkClass"
    target="_blank"
    class="text-link"
  >
    {{ link.title }}
  </NuxtLink>
</template>

<script setup lang="ts">
const { linkClass } = defineProps({
  linkClass: {
    type: String
  }
})

const socialLinks = [
  { title: 'Telegram', to: 'https://t.me/alenadomozhirova' },
  { title: 'Whatsapp', to: 'https://wa.me/+4915209064235' },
  { title: 'Facebook', to: 'https://www.facebook.com/domozhirovaalena' },
  { title: 'Instagram', to: 'https://www.instagram.com/redsquirrel_a/' },
  { title: 'Email', to: 'mailto: info@redsquirrel.agency' }
]
</script>
