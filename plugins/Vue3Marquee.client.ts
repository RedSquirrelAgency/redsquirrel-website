import Vue3Marquee from 'vue3-marquee'

export default defineNuxtPlugin((app) => {
  app.vueApp.use(Vue3Marquee, { name: 'Vue3Marquee' })
})
