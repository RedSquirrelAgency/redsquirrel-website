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

const OVERFLOW_THRESHOLD = 10
const SCROLL_COOLDOWN = 3
const DELTA_DIVISION_FACTOR = 10

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
    const reverse = valueFrom > valueTo
    const shift = deltaY / DELTA_DIVISION_FACTOR * (reverse ? -1 : 1)
    scrollAnimation.scrollPosition += shift

    const fromCondition = reverse
      ? scrollAnimation.scrollPosition > valueFrom
      : scrollAnimation.scrollPosition < valueFrom
    if (fromCondition) {
      scrollAnimation.scrollPosition = valueFrom
      if (onScrollUpOverflow && checkOverflow(event.deltaY)) {
        wheelHandlerDisabled = true
        onScrollUpOverflow()
      }
    }

    const toCondition = reverse
      ? scrollAnimation.scrollPosition <= valueTo
      : scrollAnimation.scrollPosition >= valueTo
    if (toCondition) {
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
    return Math.abs(deltaY) > OVERFLOW_THRESHOLD
  }

  onUnmounted(() => {
    document.removeEventListener('wheel', onWheel)
  })

  onMounted(() => {
    scrollAnimation.scrollPosition
    onChange(valueFrom)
    const waitForCooldownCallback = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < SCROLL_COOLDOWN) {
        document.removeEventListener('wheel', waitForCooldownCallback)
        document.addEventListener('wheel', onWheel, { passive: false })
      }
    }
    document.addEventListener('wheel', waitForCooldownCallback, { passive: false })
  })

  return {}
}
