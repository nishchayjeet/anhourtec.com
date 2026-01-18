<script setup lang="ts">
interface Props {
  /** Base delay before animation starts (in seconds) */
  delay?: number
  /** Stagger delay between child elements (in seconds) */
  stagger?: number
  /** Animation duration (in seconds) */
  duration?: number
  /** Y offset for the slide effect (in pixels) */
  yOffset?: number
  /** Blur amount */
  blur?: string
  /** HTML tag to render */
  tag?: string
  /** Intersection observer threshold */
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  stagger: 0.1,
  duration: 0.6,
  yOffset: 6,
  blur: '6px',
  tag: 'section',
  threshold: 0.1,
})

const { elementRef, isVisible } = useScrollAnimation({ threshold: props.threshold })

// Provide stagger context to child components
provide('animatedSection', {
  isVisible,
  stagger: props.stagger,
  baseDelay: props.delay,
})
</script>

<template>
  <component
    :is="tag"
    ref="elementRef"
    class="animated-section"
    :class="{ 'animated-section--visible': isVisible }"
    :style="{
      '--anim-delay': `${delay}s`,
      '--anim-duration': `${duration}s`,
      '--anim-y': `${yOffset}px`,
      '--anim-blur': blur,
      '--anim-stagger': `${stagger}s`,
    }"
  >
    <slot :is-visible="isVisible" :stagger="stagger" />
  </component>
</template>

<style scoped>
.animated-section {
  opacity: 0;
  transform: translateY(var(--anim-y, 6px));
  filter: blur(var(--anim-blur, 6px));
  transition:
    opacity var(--anim-duration, 0.6s) ease-out var(--anim-delay, 0s),
    transform var(--anim-duration, 0.6s) ease-out var(--anim-delay, 0s),
    filter var(--anim-duration, 0.6s) ease-out var(--anim-delay, 0s);
}

.animated-section--visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .animated-section {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}
</style>
