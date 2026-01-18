export interface SmoothScrollOptions {
  duration?: number
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  offset?: number
}

const easingFunctions = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t * t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const { duration = 800, easing = 'easeInOut', offset = 0 } = options

  const scrollTo = (target: string | number | HTMLElement) => {
    if (typeof window === 'undefined') return

    let targetPosition: number

    if (typeof target === 'number') {
      targetPosition = target
    } else if (typeof target === 'string') {
      const element = document.querySelector(target) as HTMLElement
      if (!element) return
      targetPosition = element.getBoundingClientRect().top + window.scrollY - offset
    } else {
      targetPosition = target.getBoundingClientRect().top + window.scrollY - offset
    }

    const startPosition = window.scrollY
    const distance = targetPosition - startPosition
    let startTime: number | null = null

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easingFunctions[easing](progress)

      window.scrollTo(0, startPosition + distance * easedProgress)

      if (elapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  const scrollToTop = () => scrollTo(0)

  return {
    scrollTo,
    scrollToTop
  }
}

export function useLenisScroll() {
  const nuxtApp = useNuxtApp()

  const scrollTo = (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (nuxtApp.$lenis) {
      nuxtApp.$lenis.scrollTo(target, options)
    } else {
      const { scrollTo: nativeScrollTo } = useSmoothScroll()
      nativeScrollTo(target)
    }
  }

  const scrollToTop = (options?: { duration?: number }) => {
    scrollTo(0, options)
  }

  return {
    scrollTo,
    scrollToTop,
    lenis: () => nuxtApp.$lenis?.instance()
  }
}
