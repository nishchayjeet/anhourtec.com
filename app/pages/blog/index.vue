<script lang="ts" setup>
import BlogCard from '~/components/blog/BlogCard.vue'
import BlogFeatured from '~/components/blog/BlogFeatured.vue'
import type { TransformedBlog } from '~/types/blog'

// Fetch blogs from API
const { data: blogsData } = await useFetch<{ data: TransformedBlog[] }>('/api/blogs')

const blogs = computed<TransformedBlog[]>(() => {
  return blogsData.value?.data || []
})

// Filter state
const searchQuery = ref('')

// Featured blogs (all marked as featured, or most recent if none)
const allFeaturedBlogs = computed(() => {
  const featured = blogs.value.filter(blog => blog.featured === true)
  if (featured.length === 0 && blogs.value.length > 0) {
    return [blogs.value[0]]
  }
  return featured
})

// Filter featured blogs based on search
const filteredFeaturedBlogs = computed(() => {
  return allFeaturedBlogs.value.filter((item) => {
    if (!item) return false

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      const title = item.title.toLowerCase()
      const description = item.description.toLowerCase()
      if (!title.includes(query) && !description.includes(query)) {
        return false
      }
    }

    return true
  })
})

// Current featured index for rotation
const currentFeaturedIndex = ref(0)
const isPaused = ref(false)

// Current featured blog
const featuredBlog = computed(() => {
  if (filteredFeaturedBlogs.value.length === 0) return null
  return filteredFeaturedBlogs.value[currentFeaturedIndex.value] || filteredFeaturedBlogs.value[0]
})

// Check if there are multiple featured
const hasMultipleFeatured = computed(() => filteredFeaturedBlogs.value.length > 1)

// Auto-rotate featured blogs
let featuredIntervalId: ReturnType<typeof setInterval> | null = null

function startFeaturedRotation() {
  if (featuredIntervalId) clearInterval(featuredIntervalId)
  if (hasMultipleFeatured.value) {
    featuredIntervalId = setInterval(() => {
      if (!isPaused.value && hasMultipleFeatured.value) {
        currentFeaturedIndex.value = (currentFeaturedIndex.value + 1) % filteredFeaturedBlogs.value.length
      }
    }, 6000)
  }
}

onMounted(() => {
  startFeaturedRotation()
})

onUnmounted(() => {
  if (featuredIntervalId) clearInterval(featuredIntervalId)
})

watch([filteredFeaturedBlogs], () => {
  currentFeaturedIndex.value = 0
  startFeaturedRotation()
})

function goToFeatured(index: number) {
  currentFeaturedIndex.value = index
  isPaused.value = true
  setTimeout(() => {
    isPaused.value = false
  }, 10000)
}

// Remaining blogs (excluding featured)
const remainingBlogs = computed(() => {
  const featuredPaths = allFeaturedBlogs.value
    .filter((blog): blog is TransformedBlog => blog !== undefined && blog !== null)
    .map(blog => blog.path)
  return blogs.value.filter(blog => !featuredPaths.includes(blog.path))
})

// Pagination state
const INITIAL_ITEMS = 9
const LOAD_MORE_COUNT = 6
const visibleCount = ref(INITIAL_ITEMS)

// Filtered blogs
const filteredBlogs = computed(() => {
  let results = remainingBlogs.value

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    results = results.filter((blog) => {
      const title = blog.title.toLowerCase()
      const description = blog.description.toLowerCase()
      return title.includes(query) || description.includes(query)
    })
  }

  return results
})

// Visible blogs (paginated)
const visibleBlogs = computed(() => {
  return filteredBlogs.value.slice(0, visibleCount.value)
})

// Check if there are more to load
const hasMoreToLoad = computed(() => {
  return visibleCount.value < filteredBlogs.value.length
})

// Load more function
function loadMore() {
  visibleCount.value += LOAD_MORE_COUNT
}

// Reset visible count when filters change
watch([searchQuery], () => {
  visibleCount.value = INITIAL_ITEMS
})

// SEO Meta tags
useSeoMeta({
  title: 'Blog | Tech Insights & Updates | AnHourTec',
  description: 'Explore the latest tech trends, tutorials, industry insights, and company updates from AnHourTec. Stay informed about software development, IT solutions, and technology best practices.',
  ogTitle: 'AnHourTec Blog | Tech Insights & Updates',
  ogDescription: 'Discover tech trends, tutorials, and expert insights. Stay updated on software development and IT solutions.',
  twitterCard: 'summary_large_image',
  twitterTitle: 'AnHourTec Blog | Tech Insights',
  twitterDescription: 'Explore the latest tech trends and industry insights.',
  robots: 'index, follow',
  ogType: 'website'
})

// Structured data for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'AnHourTec Blog',
        description: 'Tech insights, tutorials, and updates from AnHourTec.',
        url: 'https://anhourtec.com/blog',
        publisher: {
          '@type': 'Organization',
          name: 'AnHourTec',
          logo: {
            '@type': 'ImageObject',
            url: 'https://anhourtec.com/logo.png'
          }
        }
      })
    }
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-[hsl(var(--background))] py-16 md:py-20">
      <!-- Background Pattern -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[hsl(var(--primary))]/5 via-[hsl(var(--primary))]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <BlurFade>
          <div class="text-center max-w-3xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[hsl(var(--foreground))] tracking-tight">
              Blog
            </h1>
            <p class="mt-4 text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              Explore the latest tech trends, tutorials, industry insights, and updates from our team.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>

    <!-- Featured Blog -->
    <section
      v-if="featuredBlog"
      class="py-12 bg-[hsl(var(--muted))]/50"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <ClientOnly>
          <div class="mb-8 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(var(--primary))]/10">
                <svg class="w-5 h-5 text-[hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-[hsl(var(--foreground))]">Featured Article</h2>
                <p class="text-sm text-[hsl(var(--muted-foreground))]">Our top picks for you</p>
              </div>
            </div>

            <!-- Dot indicators for multiple featured -->
            <div v-if="hasMultipleFeatured" class="flex items-center gap-2">
              <button
                v-for="(_, index) in filteredFeaturedBlogs"
                :key="index"
                class="group p-1"
                :aria-label="`Go to featured article ${index + 1}`"
                @click="goToFeatured(index)"
              >
                <div
                  class="transition-all duration-300 rounded-full"
                  :class="[
                    index === currentFeaturedIndex
                      ? 'w-6 h-2 bg-[hsl(var(--primary))]'
                      : 'w-2 h-2 bg-[hsl(var(--muted-foreground))]/30 group-hover:bg-[hsl(var(--primary))]/50'
                  ]"
                />
              </button>
            </div>
          </div>

          <!-- Featured carousel -->
          <div
            class="relative"
            @mouseenter="isPaused = true"
            @mouseleave="isPaused = false"
          >
            <BlogFeatured
              v-if="featuredBlog"
              :key="featuredBlog.path"
              :to="featuredBlog.path"
              :title="featuredBlog.title"
              :description="featuredBlog.description"
              :image="featuredBlog.image || undefined"
              :author="featuredBlog.author || undefined"
              :published-at="featuredBlog.publishedAt"
            />
          </div>

          <template #fallback>
            <div class="animate-pulse">
              <div class="mb-8 flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-[hsl(var(--muted))]" />
                <div>
                  <div class="h-6 w-48 bg-[hsl(var(--muted))] rounded" />
                  <div class="h-4 w-32 bg-[hsl(var(--muted))] rounded mt-2" />
                </div>
              </div>
              <div class="h-80 bg-[hsl(var(--muted))] rounded-lg" />
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <!-- Blogs Grid -->
    <BlurFade :delay="0.3" class="py-16 bg-[hsl(var(--muted))]/50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Header with search and results count -->
        <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(var(--primary))]/10">
              <svg class="w-5 h-5 text-[hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-[hsl(var(--foreground))]">
                All Articles
              </h2>
              <p class="text-sm text-[hsl(var(--muted-foreground))]">Browse our collection</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <!-- Search Input -->
            <div class="relative">
              <svg
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search articles..."
                class="w-48 pl-9 pr-3 py-2 text-sm rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all"
              />
            </div>
            <p class="text-sm text-[hsl(var(--muted-foreground))] whitespace-nowrap">
              {{ filteredBlogs.length }} {{ filteredBlogs.length === 1 ? 'article' : 'articles' }}
            </p>
          </div>
        </div>

        <template v-if="filteredBlogs.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogCard
              v-for="blog in visibleBlogs"
              :key="blog.path"
              :to="blog.path"
              :title="blog.title"
              :description="blog.description"
              :image="blog.image || undefined"
              :author="blog.author || undefined"
              :published-at="blog.publishedAt"
            />
          </div>

          <!-- Load More Button -->
          <div v-if="hasMoreToLoad" class="mt-12 text-center">
            <button
              class="inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
              @click="loadMore"
            >
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Load More
            </button>
          </div>
        </template>

        <!-- No results -->
        <div
          v-else
          class="text-center py-16"
        >
          <div class="relative w-40 h-40 mx-auto mb-8">
            <!-- Animated signal rings -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="absolute w-32 h-32 rounded-full border-2 border-[hsl(var(--primary))]/20 animate-ping" style="animation-duration: 2s;" />
              <div class="absolute w-24 h-24 rounded-full border-2 border-[hsl(var(--primary))]/30 animate-ping" style="animation-duration: 2.5s;" />
              <div class="absolute w-16 h-16 rounded-full border-2 border-[hsl(var(--primary))]/40 animate-ping" style="animation-duration: 3s;" />
            </div>
            <!-- Center icon -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 rounded-2xl bg-[hsl(var(--primary))] flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-[hsl(var(--primary-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>
          </div>

          <h3 class="text-2xl font-bold mb-3 text-[hsl(var(--foreground))]">
            No matching articles
          </h3>
          <p class="text-[hsl(var(--muted-foreground))] mb-6 max-w-md mx-auto">
            We couldn't find any articles matching your search. Try a different search term.
          </p>
          <button
            class="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
            @click="searchQuery = ''"
          >
            Clear Search
          </button>
        </div>
      </div>
    </BlurFade>

    <!-- CTA Section -->
    <CTAProject
      title="Have a Project in Mind?"
      description="Let's discuss how we can help you build, scale, and secure your technology solutions."
    />
  </div>
</template>
