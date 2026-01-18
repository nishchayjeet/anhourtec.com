import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  let lenis: Lenis | null = null

  const initLenis = () => {
    if (typeof window === 'undefined') return

    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    })

    const raf = (time: number) => {
      lenis?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => {
    if (lenis) {
      lenis.scrollTo(target, options)
    }
  }

  const stop = () => lenis?.stop()
  const start = () => lenis?.start()
  const destroy = () => {
    lenis?.destroy()
    lenis = null
  }

  // Initialize on app mount
  if (import.meta.client) {
    initLenis()
  }

  return {
    provide: {
      lenis: {
        instance: () => lenis,
        scrollTo,
        stop,
        start,
        destroy
      }
    }
  }
})
