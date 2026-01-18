const STORAGE_KEY = 'theme-mode'

export const useTheme = () => {
  // Read initial theme from DOM (set by inline script) or localStorage
  const theme = useState<'light' | 'dark'>('theme', () => {
    if (import.meta.client) {
      // Check what the inline script already set
      if (document.documentElement.classList.contains('dark')) return 'dark'
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'dark') return 'dark'
    }
    return 'light'
  })

  const applyTheme = (mode: 'light' | 'dark') => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    // Add new class first, then remove old to avoid flash
    root.classList.add(mode)
    root.classList.remove(mode === 'dark' ? 'light' : 'dark')
    root.style.colorScheme = mode
  }

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, newTheme)
      applyTheme(newTheme)
    }
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  // Only sync state, don't touch DOM - inline script already handled it
  const initTheme = () => {
    if (import.meta.client) {
      const isDark = document.documentElement.classList.contains('dark')
      theme.value = isDark ? 'dark' : 'light'
    }
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme,
  }
}
