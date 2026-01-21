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

const variantClasses = {
  orange: {
    outer: 'text-white from-[#3f3f46] to-[#27272a]',
    inner: 'from-[#27272a] to-[#18181b]',
  },
  blue: {
    outer: 'text-white from-[#3f3f46] to-[#27272a]',
    inner: 'from-[#27272a] to-[#18181b]',
  },
  purple: {
    outer: 'text-white from-[#3f3f46] to-[#27272a]',
    inner: 'from-[#27272a] to-[#18181b]',
  },
  green: {
    outer: 'text-white from-[#3f3f46] to-[#27272a]',
    inner: 'from-[#27272a] to-[#18181b]',
  },
  yellow: {
    outer: 'text-white from-[#3f3f46] to-[#27272a]',
    inner: 'from-[#27272a] to-[#18181b]',
  },
  red: {
    outer: 'text-white from-[#3f3f46] to-[#27272a]',
    inner: 'from-[#27272a] to-[#18181b]',
  },
  gray: {
    outer: 'text-white from-[#3f3f46] to-[#27272a]',
    inner: 'from-[#27272a] to-[#18181b]',
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
:global(.dark) .badge-wrapper[data-variant="orange"],
:global(.dark) .badge-wrapper[data-variant="blue"],
:global(.dark) .badge-wrapper[data-variant="purple"],
:global(.dark) .badge-wrapper[data-variant="green"],
:global(.dark) .badge-wrapper[data-variant="yellow"],
:global(.dark) .badge-wrapper[data-variant="red"],
:global(.dark) .badge-wrapper[data-variant="gray"] {
  color: #18181b;
  --tw-gradient-from: #e4e4e7;
  --tw-gradient-to: #d4d4d8;
}

:global(.dark) .badge-wrapper[data-variant="orange"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="blue"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="purple"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="green"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="yellow"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="red"] .badge-inner,
:global(.dark) .badge-wrapper[data-variant="gray"] .badge-inner {
  --tw-gradient-from: #f4f4f5;
  --tw-gradient-to: #e4e4e7;
}
</style>
