interface ScrollAnimation {
  scrollPosition: number
  onScroll: (event: WheelEvent) => void
}

interface ScrollAnimationOptions {
  valueFrom: number
  valueTo: number
  onChange: (value: number) => void
  onScrollDownOverflow?: () => void
  onScrollUpOverflow?: () => void
}

export function useScrollAnimation(scrollAnimationOptions: ScrollAnimationOptions) {
  const {
    valueFrom,
    valueTo,
    onChange,
    onScrollDownOverflow,
    onScrollUpOverflow
  } = scrollAnimationOptions

  let wheelHandlerDisabled = false

  const onScroll = (event: WheelEvent) => {
    const { deltaY } = event
    const shift = -deltaY / 10
    scrollAnimation.scrollPosition += shift
    if (scrollAnimation.scrollPosition > valueFrom) {
      scrollAnimation.scrollPosition = valueFrom
      if (onScrollUpOverflow && checkOverflow(event.deltaY)) {
        wheelHandlerDisabled = true
        onScrollUpOverflow()
      }
    }
    if (scrollAnimation.scrollPosition <= valueTo) {
      scrollAnimation.scrollPosition = valueTo
      if (onScrollDownOverflow && checkOverflow(event.deltaY)) {
        wheelHandlerDisabled = true
        onScrollDownOverflow()
      }
    }
    onChange(scrollAnimation.scrollPosition)
  }

  const scrollAnimation: ScrollAnimation = {
    scrollPosition: valueFrom,
    onScroll
  }

  function onWheel(event: WheelEvent) {
    if (wheelHandlerDisabled) return
    scrollAnimation.onScroll(event)
  }

  function checkOverflow(deltaY: number) {
    return Math.abs(deltaY) > 8
  }

  function init() {
    onChange(valueFrom)
    const waitForCooldownCallback = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 3) {
        document.removeEventListener('wheel', waitForCooldownCallback)
        document.addEventListener('wheel', onWheel, { passive: false })
      }
    }
    document.addEventListener('wheel', waitForCooldownCallback, { passive: false })
  }

  onUnmounted(() => {
    document.removeEventListener('wheel', onWheel)
  })

  init()

  return {}
}
