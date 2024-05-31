interface ScrollAnimation {
  scrollPosition: number
  onScroll: (event: WheelEvent) => void
}

interface ScrollAnimationOptions {
  valueFrom: number
  valueTo: number
  onChange: (value: number) => void
  onScrollDownOverflow: () => void
  onScrollUpOverflow: () => void
}

export function useWheel() {
  let wheelHandlerDisabled = false
  let scrollAnimation: ScrollAnimation
  let handler: (event: WheelEvent) => void

  function onWheel(event: WheelEvent) {
    event.preventDefault()
    if (wheelHandlerDisabled) return
    if (scrollAnimation) {
      scrollAnimation.onScroll(event)
    }
    if (handler) {
      handler(event)
    }
  }

  function disableWheelHandler() {
    wheelHandlerDisabled = true
  }

  function setWheelEventHandler(wheelEventHandler: (event: WheelEvent) => void) {
    handler = wheelEventHandler
  }

  function setScrollAnimation(scrollAnimationOptions: ScrollAnimationOptions) {
    const { valueFrom, valueTo, onChange, onScrollDownOverflow, onScrollUpOverflow } = scrollAnimationOptions
    const scrollPosition = valueFrom
    onChange(scrollPosition)

    const onScroll = (event: WheelEvent) => {
      const shift = -event.deltaY / 10
      scrollAnimation.scrollPosition += shift
      if (scrollAnimation.scrollPosition > valueFrom) {
        scrollAnimation.scrollPosition = valueFrom
        disableWheelHandler()
        onScrollUpOverflow()
      }
      if (scrollAnimation.scrollPosition <= valueTo) {
        scrollAnimation.scrollPosition = valueTo
        disableWheelHandler()
        onScrollDownOverflow()
      }
      onChange(scrollAnimation.scrollPosition)
    }

    scrollAnimation = {
      scrollPosition,
      onScroll
    }
  }

  onMounted(() => {
    document.addEventListener('wheel', onWheel, { passive: false })
  })

  onUnmounted(() => {
    document.removeEventListener('wheel', onWheel)
  })

  return { setScrollAnimation, setWheelEventHandler, disableWheelHandler }
}
