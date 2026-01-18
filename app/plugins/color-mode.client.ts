export default defineNuxtPlugin({
  name: 'color-mode',
  enforce: 'pre',
  setup() {
    const { initTheme } = useTheme()
    initTheme()
  },
})
