<script setup lang="ts">
interface Props {
  projectId?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  projectId: '7EOg9x6JDnLX6WDUJiAj',
})

declare global {
  interface Window {
    _unicornInitialized?: boolean
  }
  var UnicornStudio: {
    init: () => void
  } | undefined
}

onMounted(() => {
  if (typeof window === 'undefined') return

  if (!window._unicornInitialized) {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js'
    script.onload = () => {
      if (!window._unicornInitialized && globalThis.UnicornStudio) {
        globalThis.UnicornStudio.init()
        window._unicornInitialized = true
      }
    }
    ;(document.head || document.body).appendChild(script)
  }
})
</script>

<template>
  <div
    :data-us-project="projectId"
    :class="['w-full h-full absolute top-0 left-0 -z-10', props.class]"
  />
</template>
