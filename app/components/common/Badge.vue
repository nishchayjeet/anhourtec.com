<script setup lang="ts">
type BadgeVariant = 'blue' | 'purple' | 'green' | 'yellow' | 'orange' | 'red' | 'gray'
type BadgeSize = 'sm' | 'md'

interface Props {
  variant?: BadgeVariant
  size?: BadgeSize
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'orange',
  size: 'md',
})

// Light mode: dark background, white text
const variantClasses = {
  orange: {
    outer: 'text-white from-zinc-700 to-zinc-800',
    inner: 'from-zinc-800 to-zinc-900',
  },
  blue: {
    outer: 'text-white from-zinc-700 to-zinc-800',
    inner: 'from-zinc-800 to-zinc-900',
  },
  purple: {
    outer: 'text-white from-zinc-700 to-zinc-800',
    inner: 'from-zinc-800 to-zinc-900',
  },
  green: {
    outer: 'text-white from-zinc-700 to-zinc-800',
    inner: 'from-zinc-800 to-zinc-900',
  },
  yellow: {
    outer: 'text-white from-zinc-700 to-zinc-800',
    inner: 'from-zinc-800 to-zinc-900',
  },
  red: {
    outer: 'text-white from-zinc-700 to-zinc-800',
    inner: 'from-zinc-800 to-zinc-900',
  },
  gray: {
    outer: 'text-white from-zinc-700 to-zinc-800',
    inner: 'from-zinc-800 to-zinc-900',
  },
}

const sizeClasses = {
  sm: 'text-[9px] font-bold',
  md: 'text-xs',
}
</script>

<template>
  <div
    class="badge-wrapper rounded-lg w-fit h-fit font-medium p-[1px] bg-gradient-to-b shrink-0 shadow-sm"
    :class="variantClasses[variant].outer"
    :data-variant="variant"
  >
    <div
      class="badge-inner flex items-center gap-1 rounded-[7px] py-1 px-2.5 w-fit h-fit font-medium bg-gradient-to-b"
      :class="[variantClasses[variant].inner, sizeClasses[size]]"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Dark mode styles - light background, dark text */
:global(.dark) .badge-wrapper[data-variant="orange"],
:global(.dark) .badge-wrapper[data-variant="blue"],
:global(.dark) .badge-wrapper[data-variant="purple"],
:global(.dark) .badge-wrapper[data-variant="green"],
:global(.dark) .badge-wrapper[data-variant="yellow"],
:global(.dark) .badge-wrapper[data-variant="red"],
:global(.dark) .badge-wrapper[data-variant="gray"] {
  @apply text-zinc-900 from-zinc-200 to-zinc-300;
}

:global(.dark) .badge-wrapper[data-variant="orange"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="blue"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="purple"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="green"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="yellow"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="red"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="gray"] .badge-inner {
  @apply from-zinc-100 to-zinc-200;
}
</style>
