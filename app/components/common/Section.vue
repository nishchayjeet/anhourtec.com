<script setup lang="ts">
interface Props {
  id?: string
  class?: string
}

defineProps<Props>()
</script>

<template>
  <section :id="id" :class="['py-6 md:py-16 px-4 md:px-6 text-center', $props.class]">
    <slot />
  </section>
</template>
