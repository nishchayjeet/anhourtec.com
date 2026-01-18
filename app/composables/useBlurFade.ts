export function useBlurFade(delay: number = 0, duration: number = 0.6) {
  const isVisible = ref(false)
  const elementRef = ref<HTMLElement | null>(null)

  const { stop } = useIntersectionObserver(
    elementRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold: 0.1 }
  )

  const animationStyle = computed(() => ({
    opacity: isVisible.value ? 1 : 0,
    transform: isVisible.value ? 'translateY(0)' : 'translateY(10px)',
    filter: isVisible.value ? 'blur(0px)' : 'blur(6px)',
    transition: `all ${duration}s ease-out ${delay}s`,
  }))

  return {
    elementRef,
    isVisible,
    animationStyle,
  }
}
