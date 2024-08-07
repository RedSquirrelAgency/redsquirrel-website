<template>
  <div>
    <NuxtLink
      v-for="(link, index) in socialLinks"
      :key="index"
      :to="link.to"
      :class="highlight ? 'highlight' : ''"
      target="_blank"
      class="text-link"
    >
      {{ link.title }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { linkClass } = defineProps({
  highlight: {
    type: Boolean,
    required: false,
    default: false
  }
})

const socialLinks = [
  { title: 'Telegram', to: 'https://t.me/alenadomozhirova' },
  { title: 'Whatsapp', to: 'https://wa.me/+4915209064235' },
  { title: 'Facebook', to: 'https://www.facebook.com/domozhirovaalena' },
  { title: 'Instagram', to: 'https://www.instagram.com/redsquirrel_a/' },
  { title: 'Email', to: 'mailto:info@redsquirrel.agency' }
]
</script>
