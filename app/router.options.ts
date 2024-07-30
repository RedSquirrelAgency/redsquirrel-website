import type { RouterConfig } from '@nuxt/schema'
import App from '~/app.vue'

export default <RouterConfig>{
  routes: _routes => [
    {
      name: 'Home',
      path: '/',
      component: App
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const elem = document.querySelector(to.hash)
      const offset = elem && elem.getAttribute('anchor-offset')
      return elem && offset
        ? { top: elem.getBoundingClientRect().top + window.scrollY + parseInt(offset) }
        : { selector: to.hash }
    }

    if (savedPosition) {
      return savedPosition
    }

    return {
      top: 0
    }
  }
}
