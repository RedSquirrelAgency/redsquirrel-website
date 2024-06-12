// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/redsquirrel-website/',
    buildAssetsDir: 'assets'
  },
  build: {
    transpile: ['vuetify']
  },
  css: ['~/styles/main.scss'],
  modules: [
    (_options: any, nuxt: any) => {
      nuxt.hooks.hook('vite:extendConfig', (config: any) => {
        config.plugins.push(vuetify({
          autoImport: true,
          styles: {
            configFile: 'styles/settings.scss'
          }
        }))
      })
    },
    '@tresjs/nuxt',
    '@hypernym/nuxt-gsap',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    'nuxt-icon'
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
  },
  googleFonts: {
    families: {
      'Poppins': true,
      'Style Script': true
    },
    download: true
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    },
    {
      path: '~/icons',
      pathPrefix: false
    }
  ]
})
