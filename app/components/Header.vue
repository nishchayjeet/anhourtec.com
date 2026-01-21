<script setup lang="ts">
const colorMode = useColorMode()

// Logo switching based on color mode
const logoUrl = computed(() => {
  return colorMode.value === 'dark' ? '/anhourtec_logo_darkbg.svg' : '/anhourtec_logo_lightbg.svg'
})

// Navigation state
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
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="bg-[hsl(var(--background))]/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-[hsl(var(--border))]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center h-10 w-[180px]">
        <img
          v-if="mounted"
          :src="logoUrl"
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
            class="flex items-center gap-1 text-sm font-medium text-[hsl(var(--foreground))] hover:opacity-80 transition-colors py-2"
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
              <div class="w-72 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-lg p-2">
                <NuxtLink
                  v-for="item in servicesMenu"
                  :key="item.name"
                  :to="item.href"
                  class="block rounded-lg p-3 hover:bg-[hsl(var(--accent))] transition-colors"
                  @click="activeDropdown = null"
                >
                  <div class="font-medium text-sm text-[hsl(var(--foreground))]">{{ item.name }}</div>
                  <div class="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{{ item.description }}</div>
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
            class="flex items-center gap-1 text-sm font-medium text-[hsl(var(--foreground))] hover:opacity-80 transition-colors py-2"
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
              <div class="w-72 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-lg p-2">
                <NuxtLink
                  v-for="item in solutionsMenu"
                  :key="item.name"
                  :to="item.href"
                  class="block rounded-lg p-3 hover:bg-[hsl(var(--accent))] transition-colors"
                  @click="activeDropdown = null"
                >
                  <div class="font-medium text-sm text-[hsl(var(--foreground))]">{{ item.name }}</div>
                  <div class="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{{ item.description }}</div>
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
          class="text-sm font-medium text-[hsl(var(--foreground))] hover:opacity-80 transition-colors"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- Right side actions -->
      <div class="flex items-center gap-2">
        <!-- Search button -->
        <button
          aria-label="Search"
          class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] text-sm transition-colors"
          @click="searchOpen = true"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span class="hidden lg:inline">Search...</span>
          <kbd class="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[hsl(var(--muted))] text-xs font-mono text-[hsl(var(--muted-foreground))]">
            <span class="text-xs">⌘</span>K
          </kbd>
        </button>

        <!-- Theme toggle -->
        <ColorModeButton />

        <!-- CTA button (desktop) -->
        <NuxtLink
          to="/quote"
          class="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
        >
          <UButton size="md">
            Get a Quote
          </UButton>
        </NuxtLink>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-[hsl(var(--accent))] transition-colors"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="!mobileMenuOpen" class="w-5 h-5 text-[hsl(var(--foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg v-else class="w-5 h-5 text-[hsl(var(--foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2">
        <!-- Services section -->
        <div class="py-2">
          <p class="text-xs font-semibold text-[hsl(var(--foreground))] uppercase tracking-wider mb-2">Services</p>
          <NuxtLink
            v-for="item in servicesMenu"
            :key="item.name"
            :to="item.href"
            class="block text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors py-2"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Solutions section -->
        <div class="py-2 border-t border-[hsl(var(--border))]">
          <p class="text-xs font-semibold text-[hsl(var(--foreground))] uppercase tracking-wider mb-2 mt-2">Solutions</p>
          <NuxtLink
            v-for="item in solutionsMenu"
            :key="item.name"
            :to="item.href"
            class="block text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors py-2"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Other links -->
        <div class="py-2 border-t border-[hsl(var(--border))]">
          <NuxtLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            class="block text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors py-2"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <NuxtLink
          to="/quote"
          class="mt-2"
          @click="mobileMenuOpen = false"
        >
          <UButton block size="sm">
            Get a Quote
          </UButton>
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
          class="fixed inset-0 z-[100] bg-[hsl(var(--background))]/80 backdrop-blur-sm"
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
          <div class="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl overflow-hidden">
            <!-- Search input -->
            <div class="flex items-center gap-3 px-4 border-b border-[hsl(var(--border))]">
              <svg class="w-5 h-5 text-[hsl(var(--muted-foreground))] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search services, solutions, and more..."
                class="flex-1 py-4 bg-transparent text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none"
                autofocus
              />
              <kbd class="hidden sm:inline-flex items-center px-2 py-1 rounded bg-[hsl(var(--muted))] text-xs font-mono text-[hsl(var(--muted-foreground))]">
                ESC
              </kbd>
            </div>

            <!-- Search results -->
            <div class="max-h-80 overflow-y-auto p-2">
              <template v-if="searchQuery && searchResults.length === 0">
                <div class="text-center py-8 text-[hsl(var(--muted-foreground))]">
                  <p>No results found for "{{ searchQuery }}"</p>
                </div>
              </template>

              <template v-else-if="searchResults.length > 0">
                <NuxtLink
                  v-for="result in searchResults"
                  :key="result.href"
                  :to="result.href"
                  class="flex flex-col gap-1 rounded-lg p-3 hover:bg-[hsl(var(--accent))] transition-colors"
                  @click="closeSearch"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-[hsl(var(--muted-foreground))]">{{ result.category }}</span>
                  </div>
                  <div class="font-medium text-[hsl(var(--foreground))]">{{ result.name }}</div>
                  <div v-if="result.description" class="text-sm text-[hsl(var(--muted-foreground))]">{{ result.description }}</div>
                </NuxtLink>
              </template>

              <template v-else>
                <div class="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider px-3 py-2">Quick Links</div>
                <NuxtLink
                  v-for="item in servicesMenu.slice(0, 3)"
                  :key="item.href"
                  :to="item.href"
                  class="flex flex-col gap-1 rounded-lg p-3 hover:bg-[hsl(var(--accent))] transition-colors"
                  @click="closeSearch"
                >
                  <div class="font-medium text-sm text-[hsl(var(--foreground))]">{{ item.name }}</div>
                  <div class="text-xs text-[hsl(var(--muted-foreground))]">{{ item.description }}</div>
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
