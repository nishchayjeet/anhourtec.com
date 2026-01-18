<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  delay?: number
  duration?: number
  yOffset?: number
  blur?: string
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  duration: 0.6,
  yOffset: 6,
  blur: '6px',
  tag: 'div',
})

const isVisible = ref(false)
const elementRef = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    if (!elementRef.value) return

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
  })
})
</script>

<template>
  <component
    :is="tag"
    ref="elementRef"
    class="blur-fade-element"
    :class="{ 'blur-fade-visible': isVisible }"
    :style="{
      '--blur-fade-delay': `${0.04 + delay}s`,
      '--blur-fade-duration': `${duration}s`,
      '--blur-fade-y': `${yOffset}px`,
      '--blur-fade-blur': blur,
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
.blur-fade-element {
  opacity: 0;
  transform: translateY(var(--blur-fade-y, 6px));
  filter: blur(var(--blur-fade-blur, 6px));
  transition:
    opacity var(--blur-fade-duration, 0.6s) ease-out var(--blur-fade-delay, 0.04s),
    transform var(--blur-fade-duration, 0.6s) ease-out var(--blur-fade-delay, 0.04s),
    filter var(--blur-fade-duration, 0.6s) ease-out var(--blur-fade-delay, 0.04s);
}

.blur-fade-visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
}
</style>
