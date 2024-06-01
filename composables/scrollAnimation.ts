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

export function useScrollAnimation(scrollAnimationOptions: ScrollAnimationOptions) {
  let wheelHandlerDisabled = false

  const { valueFrom, valueTo, onChange, onScrollDownOverflow, onScrollUpOverflow } = scrollAnimationOptions
  const scrollPosition = valueFrom
  onChange(scrollPosition)

  const onScroll = (event: WheelEvent) => {
    const shift = -event.deltaY / 10
    scrollAnimation.scrollPosition += shift
    if (scrollAnimation.scrollPosition > valueFrom) {
      scrollAnimation.scrollPosition = valueFrom
      if (checkOverflow(event.deltaY)) {
        wheelHandlerDisabled = true
        onScrollUpOverflow()
      }
    }
    if (scrollAnimation.scrollPosition <= valueTo) {
      scrollAnimation.scrollPosition = valueTo
      if (checkOverflow(event.deltaY)) {
        wheelHandlerDisabled = true
        onScrollDownOverflow()
      }
    }
    onChange(scrollAnimation.scrollPosition)
  }

  const scrollAnimation: ScrollAnimation = {
    scrollPosition,
    onScroll
  }

  function onWheel(event: WheelEvent) {
    event.preventDefault()
    if (wheelHandlerDisabled) return
    scrollAnimation.onScroll(event)
  }

  function checkOverflow(deltaY: number) {
    return Math.abs(deltaY) > 3
  }

  function init() {
    const waitForCooldownCallback = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 3) {
        document.removeEventListener('wheel', waitForCooldownCallback)
        document.addEventListener('wheel', onWheel, { passive: false })
      }
    }
    document.addEventListener('wheel', waitForCooldownCallback, { passive: false })
  }

  init()

  onUnmounted(() => {
    document.removeEventListener('wheel', onWheel)
  })

  return {}
}
