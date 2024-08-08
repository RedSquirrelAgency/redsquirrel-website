import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const elem = document.querySelector(to.hash)
      const offset = elem && elem.getAttribute('anchor-offset')
      console.log(elem, offset)
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
