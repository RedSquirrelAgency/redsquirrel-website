// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    baseURL: '/redsquirrel-website/',
    buildAssetsDir: 'assets'
  },
  build: {
    transpile: ['vuetify']
  },
  modules: [
    (_options: any, nuxt: any) => {
      nuxt.hooks.hook('vite:extendConfig', (config: any) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@tresjs/nuxt',
    '@hypernym/nuxt-gsap',
    '@nuxtjs/i18n',
    '@nuxt/eslint'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  eslint: {
    config: {
      stylistic: true
    }
  }
})
