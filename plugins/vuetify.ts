import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const sunrise: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#000000'
  }
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'sunrise',
      themes: {
        sunrise
      }
    }
  })
  app.vueApp.use(vuetify)
})
