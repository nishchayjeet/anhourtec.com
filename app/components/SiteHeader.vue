<script setup lang="ts">
const { theme, setTheme, initTheme } = useTheme()
const colorMode = useColorMode()

// Dropdown menu data
const servicesMenu = [
  { name: 'Custom Software', href: '/services/software', description: 'Web apps, mobile apps, enterprise solutions' },
  { name: 'IT Infrastructure', href: '/services/infrastructure', description: 'Server administration, cloud, virtualization' },
  { name: 'Network Solutions', href: '/services/networking', description: 'Cisco, Sophos, SonicWall, security' },
  { name: 'Managed Services', href: '/services/msp', description: '24/7 monitoring, helpdesk, backup' },
]

const solutionsMenu = [
  { name: 'For Startups', href: '/solutions/startups', description: 'MVP development, cloud infrastructure' },
  { name: 'For Enterprise', href: '/solutions/enterprise', description: 'Legacy modernization, integrations' },
  { name: 'For Healthcare', href: '/solutions/healthcare', description: 'HIPAA compliance, secure systems' },
  { name: 'For Legal', href: '/solutions/legal', description: 'Document management, security' },
]

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const mobileMenuOpen = ref(false)
const mounted = ref(false)
const searchOpen = ref(false)
const activeDropdown = ref<string | null>(null)
let dropdownTimeout: ReturnType<typeof setTimeout> | null = null

const openDropdown = (name: string) => {
  if (dropdownTimeout) clearTimeout(dropdownTimeout)
  activeDropdown.value = name
}

const closeDropdown = () => {
  dropdownTimeout = setTimeout(() => {
    activeDropdown.value = null
  }, 150)
}

const keepDropdownOpen = () => {
  if (dropdownTimeout) clearTimeout(dropdownTimeout)
}

// Logo URLs - named by what background they're designed for
const lightLogo = 'https://res.cloudinary.com/dpurlknvy/image/upload/v1760466147/logo-lightbg-hp-transparent_qjb47d.png'
const darkLogo = 'https://res.cloudinary.com/dpurlknvy/image/upload/v1749425792/logo-darkbg-hpp_btsxy8.png'

// Use colorMode for reactive logo switching (tracks DOM state)
const logoSrc = computed(() => {
  const isDark = colorMode.value === 'dark'
  return isDark ? lightLogo : darkLogo
})

const nextTheme = computed(() => (theme.value === 'dark' ? 'light' : 'dark'))

const switchTheme = () => {
  setTheme(nextTheme.value)
}

const startViewTransition = (event: MouseEvent) => {
  // Fallback for browsers that don't support View Transitions
  // @ts-expect-error - startViewTransition is not yet in TypeScript DOM types
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

  // @ts-expect-error - startViewTransition is not yet in TypeScript DOM types
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

// Search functionality
const searchQuery = ref('')
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  const query = searchQuery.value.toLowerCase()
  const allItems = [
    ...servicesMenu.map(item => ({ ...item, category: 'Services' })),
    ...solutionsMenu.map(item => ({ ...item, category: 'Solutions' })),
    ...navItems.map(item => ({ ...item, description: '', category: 'Pages' })),
  ]
  return allItems.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  )
})

const closeSearch = () => {
  searchOpen.value = false
  searchQuery.value = ''
}

// Keyboard shortcut for search
const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    searchOpen.value = !searchOpen.value
  }
  if (e.key === 'Escape' && searchOpen.value) {
    closeSearch()
  }
}

onMounted(() => {
  mounted.value = true
  initTheme() // Sync theme state with DOM on mount
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="bg-background/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-border">
    <div class="container flex h-16 items-center justify-between">
      <NuxtLink to="/" class="flex items-center h-10 w-[180px]">
        <img
          v-if="mounted"
          :src="logoSrc"
          alt="AnHourTec"
          width="180"
          height="60"
          class="h-10 w-auto max-w-[180px] object-contain transition-all duration-300"
        />
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-6">
        <!-- Services dropdown -->
        <div
          class="relative"
          @mouseenter="openDropdown('services')"
          @mouseleave="closeDropdown"
        >
          <button
            class="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Services
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeDropdown === 'services' }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <div
              v-if="activeDropdown === 'services'"
              class="absolute left-0 top-full pt-6"
              @mouseenter="keepDropdownOpen"
              @mouseleave="closeDropdown"
            >
              <div class="w-72 rounded-xl border border-border bg-card shadow-lg p-2">
                <NuxtLink
                  v-for="item in servicesMenu"
                  :key="item.name"
                  :to="item.href"
                  class="block rounded-lg p-3 hover:bg-accent transition-colors"
                >
                  <div class="font-medium text-sm text-foreground">{{ item.name }}</div>
                  <div class="text-xs text-muted-foreground mt-0.5">{{ item.description }}</div>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Solutions dropdown -->
        <div
          class="relative"
          @mouseenter="openDropdown('solutions')"
          @mouseleave="closeDropdown"
        >
          <button
            class="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Solutions
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeDropdown === 'solutions' }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <div
              v-if="activeDropdown === 'solutions'"
              class="absolute left-0 top-full pt-6"
              @mouseenter="keepDropdownOpen"
              @mouseleave="closeDropdown"
            >
              <div class="w-72 rounded-xl border border-border bg-card shadow-lg p-2">
                <NuxtLink
                  v-for="item in solutionsMenu"
                  :key="item.name"
                  :to="item.href"
                  class="block rounded-lg p-3 hover:bg-accent transition-colors"
                >
                  <div class="font-medium text-sm text-foreground">{{ item.name }}</div>
                  <div class="text-xs text-muted-foreground mt-0.5">{{ item.description }}</div>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Regular nav items -->
        <NuxtLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.href"
          class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <!-- Search button -->
        <button
          aria-label="Search"
          class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground text-sm transition-colors"
          @click="searchOpen = true"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span class="hidden lg:inline">Search...</span>
          <kbd class="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground">
            <span class="text-xs">⌘</span>K
          </kbd>
        </button>

        <!-- Theme toggle with View Transition animation -->
        <ClientOnly>
          <button
            :aria-label="`Switch to ${nextTheme} mode`"
            class="p-2 rounded-full hover:bg-accent transition-colors relative w-9 h-9"
            @click="startViewTransition"
          >
            <!-- Sun icon (shown in dark mode, click to switch to light) -->
            <svg
              class="w-5 h-5 text-foreground absolute top-2 left-2 transition-opacity duration-200"
              :class="theme === 'dark' ? 'opacity-100' : 'opacity-0'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
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
            <!-- Moon icon (shown in light mode, click to switch to dark) -->
            <svg
              class="w-5 h-5 text-foreground absolute top-2 left-2 transition-opacity duration-200"
              :class="theme === 'light' ? 'opacity-100' : 'opacity-0'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
          <template #fallback>
            <div class="w-9 h-9" />
          </template>
        </ClientOnly>

        <!-- CTA button (desktop) -->
        <NuxtLink
          to="/contact"
          class="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Get a Quote
        </NuxtLink>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="!mobileMenuOpen" class="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg v-else class="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-border bg-background">
      <nav class="container py-4 flex flex-col gap-2">
        <!-- Services section -->
        <div class="py-2">
          <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Services</p>
          <NuxtLink
            v-for="item in servicesMenu"
            :key="item.name"
            :to="item.href"
            class="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Solutions section -->
        <div class="py-2 border-t border-border">
          <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-2">Solutions</p>
          <NuxtLink
            v-for="item in solutionsMenu"
            :key="item.name"
            :to="item.href"
            class="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Other links -->
        <div class="py-2 border-t border-border">
          <NuxtLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            class="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <NuxtLink
          to="/contact"
          class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mt-2"
          @click="mobileMenuOpen = false"
        >
          Get a Quote
        </NuxtLink>
      </nav>
    </div>

    <!-- Search Dialog -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="searchOpen"
          class="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          @click="closeSearch"
        />
      </Transition>

      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="searchOpen"
          class="fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2 p-4"
        >
          <div class="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            <!-- Search input -->
            <div class="flex items-center gap-3 px-4 border-b border-border">
              <svg class="w-5 h-5 text-muted-foreground shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search services, solutions, and more..."
                class="flex-1 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                autofocus
              />
              <kbd class="hidden sm:inline-flex items-center px-2 py-1 rounded bg-muted text-xs font-mono text-muted-foreground">
                ESC
              </kbd>
            </div>

            <!-- Search results -->
            <div class="max-h-80 overflow-y-auto p-2">
              <template v-if="searchQuery && searchResults.length === 0">
                <div class="text-center py-8 text-muted-foreground">
                  <p>No results found for "{{ searchQuery }}"</p>
                </div>
              </template>

              <template v-else-if="searchResults.length > 0">
                <NuxtLink
                  v-for="result in searchResults"
                  :key="result.href"
                  :to="result.href"
                  class="flex flex-col gap-1 rounded-lg p-3 hover:bg-accent transition-colors"
                  @click="closeSearch"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-muted-foreground">{{ result.category }}</span>
                  </div>
                  <div class="font-medium text-foreground">{{ result.name }}</div>
                  <div v-if="result.description" class="text-sm text-muted-foreground">{{ result.description }}</div>
                </NuxtLink>
              </template>

              <template v-else>
                <div class="text-xs text-muted-foreground uppercase tracking-wider px-3 py-2">Quick Links</div>
                <NuxtLink
                  v-for="item in servicesMenu.slice(0, 3)"
                  :key="item.href"
                  :to="item.href"
                  class="flex flex-col gap-1 rounded-lg p-3 hover:bg-accent transition-colors"
                  @click="closeSearch"
                >
                  <div class="font-medium text-sm text-foreground">{{ item.name }}</div>
                  <div class="text-xs text-muted-foreground">{{ item.description }}</div>
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style>
/* View Transition styles for theme toggle animation */
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
