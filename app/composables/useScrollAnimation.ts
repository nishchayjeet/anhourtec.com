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

  onMounted(() => {
    nextTick(() => {
      if (!elementRef.value) return

      const { stop } = useIntersectionObserver(
        elementRef,
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            isVisible.value = true
            if (once) {
              stop()
            }
          } else if (!once) {
            isVisible.value = false
          }
        },
        { threshold, rootMargin }
      )
    })
  })

  return {
    elementRef,
    isVisible,
  }
}
