import en from './translations/en.json'
import ru from './translations/ru.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    ru
  }
}))
