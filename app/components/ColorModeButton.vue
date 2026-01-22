<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const switchTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const startViewTransition = (event: MouseEvent) => {
  if (!document.startViewTransition) {
    switchTheme()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    switchTheme()
  })

  transition.ready.then(() => {
    const duration = 600
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: duration,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}
</script>

<template>
  <ClientOnly>
    <button
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      class="theme-toggle"
      :class="{ 'is-dark': isDark }"
      @click="startViewTransition"
    >
      <span class="toggle-track">
        <!-- Sun icon -->
        <span class="icon sun-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </span>
        <!-- Moon icon -->
        <span class="icon moon-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>
        <!-- Sliding thumb -->
        <span class="toggle-thumb" />
      </span>
    </button>
    <template #fallback>
      <div class="w-14 h-7" />
    </template>
  </ClientOnly>
</template>

<style scoped>
.theme-toggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.toggle-track {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 56px;
  height: 28px;
  padding: 4px;
  border-radius: 9999px;
  background: hsl(var(--muted));
  transition: background-color 0.3s ease;
}

.theme-toggle.is-dark .toggle-track {
  background: hsl(var(--muted));
}

.icon {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.icon svg {
  width: 14px;
  height: 14px;
}

.sun-icon {
  color: hsl(var(--primary));
  opacity: 1;
  transform: scale(1);
}

.theme-toggle.is-dark .sun-icon {
  color: hsl(var(--muted-foreground));
  opacity: 0.5;
  transform: scale(0.9);
}

.moon-icon {
  color: hsl(var(--muted-foreground));
  opacity: 0.5;
  transform: scale(0.9);
}

.theme-toggle.is-dark .moon-icon {
  color: hsl(var(--primary));
  opacity: 1;
  transform: scale(1);
}

.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 9999px;
  background: hsl(var(--background));
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle.is-dark .toggle-thumb {
  transform: translateX(28px);
}

.theme-toggle:hover .toggle-thumb {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}

.theme-toggle:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  border-radius: 9999px;
}
</style>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}

::view-transition-old(root) {
  z-index: 1;
}
</style>
