import { useIntersectionObserver } from '@vueuse/core'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options

  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let stopObserver: (() => void) | null = null
  let fallbackTimeout: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    // Fallback: make visible after 100ms if observer hasn't triggered
    fallbackTimeout = setTimeout(() => {
      if (!isVisible.value) {
        isVisible.value = true
      }
    }, 100)

    const { stop } = useIntersectionObserver(
      elementRef,
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          if (fallbackTimeout) {
            clearTimeout(fallbackTimeout)
          }
          if (once) {
            stop()
          }
        } else if (!once) {
          isVisible.value = false
        }
      },
      { threshold, rootMargin }
    )
    stopObserver = stop
  })

  onUnmounted(() => {
    stopObserver?.()
    if (fallbackTimeout) {
      clearTimeout(fallbackTimeout)
    }
  })

  return {
    elementRef,
    isVisible,
  }
}
