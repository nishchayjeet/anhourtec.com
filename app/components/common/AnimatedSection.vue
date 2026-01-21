<script setup lang="ts">
interface Props {
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'
  delay?: number // in milliseconds
  duration?: number // in milliseconds
  tag?: string
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'slide-up',
  delay: 0,
  duration: 600,
  tag: 'div',
  threshold: 0.1,
})

const { elementRef, isVisible } = useScrollAnimation({ threshold: props.threshold })

// Convert milliseconds to seconds for CSS
const delayInSeconds = computed(() => props.delay / 1000)
const durationInSeconds = computed(() => props.duration / 1000)
</script>

<template>
  <component
    :is="tag"
    ref="elementRef"
    class="animated-section"
    :class="[
      `animated-section--${animation}`,
      { 'animated-section--visible': isVisible }
    ]"
    :style="{
      '--anim-delay': `${delayInSeconds}s`,
      '--anim-duration': `${durationInSeconds}s`,
    }"
  >
    <slot :is-visible="isVisible" />
  </component>
</template>

<style scoped>
.animated-section {
  transition:
    opacity var(--anim-duration, 0.6s) ease-out var(--anim-delay, 0s),
    transform var(--anim-duration, 0.6s) ease-out var(--anim-delay, 0s),
    filter var(--anim-duration, 0.6s) ease-out var(--anim-delay, 0s);
}

/* Fade animation */
.animated-section--fade {
  opacity: 0;
}

.animated-section--fade.animated-section--visible {
  opacity: 1;
}

/* Slide-up animation */
.animated-section--slide-up {
  opacity: 0;
  transform: translateY(24px);
}

.animated-section--slide-up.animated-section--visible {
  opacity: 1;
  transform: translateY(0);
}

/* Slide-down animation */
.animated-section--slide-down {
  opacity: 0;
  transform: translateY(-24px);
}

.animated-section--slide-down.animated-section--visible {
  opacity: 1;
  transform: translateY(0);
}

/* Slide-left animation */
.animated-section--slide-left {
  opacity: 0;
  transform: translateX(24px);
}

.animated-section--slide-left.animated-section--visible {
  opacity: 1;
  transform: translateX(0);
}

/* Slide-right animation */
.animated-section--slide-right {
  opacity: 0;
  transform: translateX(-24px);
}

.animated-section--slide-right.animated-section--visible {
  opacity: 1;
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  .animated-section {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    transition: none !important;
  }
}
</style>
