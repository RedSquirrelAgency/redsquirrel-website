export const transitionProps = {
  enter: { type: Object },
  afterEnter: { type: Object },
  beforeLeave: { type: Object },
  leave: { type: Object }
}

export function useSectionTransition(componentProps: any, handlers: any) {
  onMounted(() => {
    watch(() => componentProps.enter, handleEnter)
    watch(() => componentProps.afterEnter, handleAfterEnter, { once: true })
    watch(() => componentProps.beforeLeave, handleBeforeLeave, { once: true })
    watch(() => componentProps.leave, handleLeave, { once: true })
  })

  onUnmounted(() => {
    watch(() => componentProps.enter, () => {})
    watch(() => componentProps.afterEnter, () => {})
    watch(() => componentProps.beforeLeave, () => {})
    watch(() => componentProps.leave, () => {})
  })

  function handleEnter(params: any) {
    if (!params) return
    console.log('handleEnter', params)
    const { el, done } = params
    if (handlers.onEnter) {
      handlers.onEnter(el, done)
      return
    }
    done()
  }

  function handleAfterEnter(params: any) {
    if (!params) return
    const { el } = params
    if (handlers.onAfterEnter) {
      handlers.onAfterEnter(el)
      return
    }
  }

  function handleBeforeLeave(params: any) {
    if (!params) return
    const { el } = params
    if (handlers.onBeforeLeave) {
      handlers.onBeforeLeave(el)
      return
    }
  }

  function handleLeave(params: any) {
    if (!params) return
    console.log('handleLeave')
    const { el, done } = params
    if (handlers.onLeave) {
      handlers.onLeave(el, done)
      return
    }
    done()
  }

  return {}
}
