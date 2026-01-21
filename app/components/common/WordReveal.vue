<script setup lang="ts">
interface Props {
  words: string[]
  duration?: number
  delay?: number
  spaceBetween?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0.06,
  delay: 0,
  spaceBetween: 'w-3',
})
</script>

<template>
  <span class="inline">
    <template v-for="(word, index) in words" :key="index">
      <span class="inline-block">
        <span v-html="word" />
        <span v-if="index < words.length - 1" :class="['inline-block', spaceBetween]">&nbsp;</span>
      </span>
    </template>
  </span>
</template>
