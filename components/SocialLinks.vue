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
import { TELEGRAM_URL, WHATSAPP_URL, FACEBOOK_URL, INSTAGRAM_URL, EMAIL_URL } from '~/constants/urls'

defineProps({
  highlight: {
    type: Boolean,
    required: false,
    default: false
  }
})

const socialLinks = [
  { title: 'Telegram', to: TELEGRAM_URL },
  { title: 'Whatsapp', to: WHATSAPP_URL },
  { title: 'Facebook', to: FACEBOOK_URL },
  { title: 'Instagram', to: INSTAGRAM_URL },
  { title: 'Email', to: EMAIL_URL }
]
</script>
