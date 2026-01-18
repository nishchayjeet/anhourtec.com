<script setup lang="ts">
interface Props {
  variant?: 'heading' | 'pageHeading' | 'subheading' | 'sectionHeading' | 'paragraph'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'default'
  color?: 'default' | 'light' | 'dark' | 'muted' | 'foreground'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'paragraph',
  size: 'default',
  color: 'default',
})

const headingClass = 'font-title text-foreground text-[34px] sm:text-5xl md:text-6xl leading-tight'
const pageHeadingClass = `${headingClass} mx-auto max-w-[780px]`
const subheadingClass = 'font-title text-foreground text-[1.7rem] md:text-[2.5rem] leading-tight'
const sectionHeadingClass = `${subheadingClass} mx-auto`

const colorClasses = {
  default: 'text-muted-foreground',
  light: 'text-muted-foreground/60',
  dark: 'text-foreground',
  muted: 'text-muted-foreground',
  foreground: 'text-foreground',
}

const sizeClasses = {
  default: 'text-sm md:text-base',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

const computedClass = computed(() => {
  switch (props.variant) {
    case 'heading':
      return headingClass
    case 'pageHeading':
      return pageHeadingClass
    case 'subheading':
      return subheadingClass
    case 'sectionHeading':
      return sectionHeadingClass
    case 'paragraph':
    default:
      return `${colorClasses[props.color]} ${sizeClasses[props.size]}`
  }
})

const tag = computed(() => {
  switch (props.variant) {
    case 'heading':
    case 'pageHeading':
      return 'h1'
    case 'subheading':
    case 'sectionHeading':
      return 'h2'
    default:
      return 'p'
  }
})
</script>

<template>
  <component :is="tag" :class="[computedClass, $props.class]">
    <slot />
  </component>
</template>
