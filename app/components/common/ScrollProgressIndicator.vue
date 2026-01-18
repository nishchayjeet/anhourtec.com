<script setup lang="ts">
const scrollProgress = ref(0)
const isVisible = ref(false)

function updateScrollProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  scrollProgress.value = Math.min(100, Math.max(0, progress))
  isVisible.value = scrollTop > 50
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none transition-opacity duration-300"
    :class="isVisible ? 'opacity-100' : 'opacity-0'"
  >
    <div
      class="h-full bg-primary transition-all duration-100 ease-out"
      :style="{ width: `${scrollProgress}%` }"
    />
  </div>
</template>
