<script lang="ts" setup>
import { marked } from 'marked'
import BlogCard from '~/components/blog/BlogCard.vue'
import type { TransformedBlog } from '~/types/blog'
import { formatDate } from '~/utils/date'

const route = useRoute()
const requestURL = useRequestURL()

// Dynamic site URL
const siteUrl = computed(() => {
  return requestURL.origin
})

// Fetch the specific blog via server proxy
const slug = computed(() => route.params.slug as string)

const { data: blogData } = await useFetch<{ data: any[] }>(
  () => `/api/blogs/${slug.value}`,
  { watch: [slug] }
)

// Transform the blog data
const blog = computed<TransformedBlog | null>(() => {
  if (!blogData.value?.data?.[0]) return null
  const raw = blogData.value.data[0]
  return {
    id: raw.id,
    path: `/blog/${raw.slug}`,
    title: raw.title,
    description: raw.description || '',
    slug: raw.slug,
    featured: raw.featured || false,
    image: raw.image ? {
      src: raw.image.url,
      alt: raw.img_alt || raw.image.alternativeText || raw.title
    } : null,
    author: raw.author ? {
      name: raw.author.name,
      social: raw.author.social
    } : null,
    publishedAt: raw.publishedDate || raw.publishedAt,
    body: raw.blocks?.find((b: any) => b.__component === 'shared.rich-text')?.body || ''
  }
})

// Decode HTML entities
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&#x27;': "'",
    '&nbsp;': ' '
  }
  return text.replace(/&[^;]+;/g, (entity) => entities[entity] || entity)
}

// Generate slug from text for TOC
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim()
}

// Process markdown and extract headings together
const processedContent = computed(() => {
  if (!blog.value?.body) return { html: '', headings: [] as Array<{ id: string; text: string; depth: number }> }

  let html = marked(blog.value.body) as string
  const headings: Array<{ id: string; text: string; depth: number }> = []

  // Add IDs to headings and extract for TOC
  html = html.replace(/<h([2-3])>([\s\S]*?)<\/h\1>/gi, (_match, level, text) => {
    const cleanText = text.replace(/<[^>]*>/g, '').trim()
    const decodedText = decodeHtmlEntities(cleanText)
    const id = slugify(cleanText)
    headings.push({ id, text: decodedText, depth: parseInt(level) })
    return `<h${level} id="${id}">${text}</h${level}>`
  })

  return { html, headings }
})

// Render markdown body to HTML
const renderedBody = computed(() => processedContent.value.html)

// TOC links derived from rendered headings
const tocLinks = computed(() => processedContent.value.headings)

// Scroll to heading function
function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Fetch related blog posts
const { data: allBlogsData } = await useFetch<{ data: TransformedBlog[] }>('/api/blogs')

const relatedPosts = computed<TransformedBlog[]>(() => {
  if (!allBlogsData.value?.data || !blog.value) return []

  return allBlogsData.value.data
    .filter(item => item.slug !== blog.value?.slug)
    .slice(0, 3)
})

// Social platform detection helper
interface SocialPlatform {
  name: string
  icon: string
  username?: string
}

function getSocialPlatform(url: string): SocialPlatform | null {
  if (!url) return null

  const urlLower = url.toLowerCase()

  if (urlLower.includes('linkedin.com')) {
    return { name: 'LinkedIn', icon: 'linkedin' }
  }
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
    const username = url.split('/').pop()
    return { name: 'X', icon: 'x', username }
  }
  if (urlLower.includes('github.com')) {
    const username = url.split('/').pop()
    return { name: 'GitHub', icon: 'github', username }
  }
  if (urlLower.includes('instagram.com')) {
    const username = url.split('/').filter(Boolean).pop()
    return { name: 'Instagram', icon: 'instagram', username }
  }

  return { name: 'Website', icon: 'link' }
}

// Social share handlers
const shareUrl = computed(() => `${siteUrl.value}${blog.value?.path || ''}`)

function handleTwitterShare() {
  const message = encodeURIComponent(`${blog.value?.title || ''} ${shareUrl.value}`)
  window.open(`https://twitter.com/intent/tweet?text=${message}`, '_blank')
}

function handleLinkedInShare() {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl.value)}`, '_blank')
}

function handleFacebookShare() {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`, '_blank')
}

// SEO Meta tags
useSeoMeta({
  title: () => `${blog.value?.title || 'Blog'} | AnHourTec Blog`,
  description: () => blog.value?.description || '',
  ogTitle: () => `${blog.value?.title || 'Blog'} | AnHourTec Blog`,
  ogDescription: () => blog.value?.description || '',
  ogImage: () => blog.value?.image?.src || '/images/default-og.jpg',
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${blog.value?.title || 'Blog'} | AnHourTec`,
  twitterDescription: () => blog.value?.description || '',
  twitterImage: () => blog.value?.image?.src || '/images/default-og.jpg',
  articlePublishedTime: () => blog.value?.publishedAt,
  robots: 'index, follow'
})

// Structured data for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.value?.title,
        description: blog.value?.description,
        image: blog.value?.image?.src || '/images/default-og.jpg',
        datePublished: blog.value?.publishedAt,
        author: blog.value?.author ? {
          '@type': 'Person',
          name: blog.value.author.name
        } : {
          '@type': 'Organization',
          name: 'AnHourTec'
        },
        publisher: {
          '@type': 'Organization',
          name: 'AnHourTec',
          logo: {
            '@type': 'ImageObject',
            url: 'https://anhourtec.com/logo.png'
          }
        }
      }))
    }
  ]
})
</script>

<template>
  <!-- Loading or Not Found State -->
  <div v-if="!blog" class="container py-20">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
      <p class="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or is not available.</p>
      <NuxtLink
        to="/blog"
        class="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        View All Blog Posts
      </NuxtLink>
    </div>
  </div>

  <div v-else class="container py-12">
    <!-- Blog Header -->
    <div class="max-w-4xl mx-auto">
      <!-- Badge -->
      <div class="flex items-center gap-2 mb-6">
        <span class="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground">
          <svg class="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Blog
        </span>
      </div>

      <!-- Title & Description -->
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
        {{ blog.title }}
      </h1>
      <p class="mt-4 text-xl text-muted-foreground">
        {{ blog.description }}
      </p>

      <!-- Featured Image -->
      <NuxtImg
        v-if="blog.image"
        :src="blog.image.src"
        :alt="blog.image.alt"
        class="mt-8 w-full object-cover rounded-lg aspect-video"
      />

      <!-- Meta info -->
      <dl class="mt-6 flex justify-between text-muted-foreground text-sm">
        <dt class="sr-only">Published at</dt>
        <dd v-if="blog.publishedAt">
          <time :datetime="blog.publishedAt">
            {{ formatDate(blog.publishedAt) }}
          </time>
        </dd>
        <dd v-if="blog.author" class="flex items-center gap-2">
          <span>By {{ blog.author.name }}</span>
          <a
            v-if="blog.author.social && getSocialPlatform(blog.author.social)"
            :href="blog.author.social"
            target="_blank"
            rel="noopener noreferrer"
            :title="getSocialPlatform(blog.author.social)?.name"
            class="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.193-9.193a4.5 4.5 0 00-6.364 6.364l4.5 4.5a4.5 4.5 0 007.072-6.364l-1.757-1.757" />
            </svg>
          </a>
        </dd>
      </dl>
    </div>

    <!-- 3-Column Layout -->
    <div class="mt-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[96px_768px_1fr] gap-8">
      <!-- Left: Social Share Buttons -->
      <div class="lg:px-4 flex lg:flex-col lg:items-end gap-2 mb-8 lg:mb-0">
        <button
          class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Share on X"
          @click="handleTwitterShare"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Share on LinkedIn"
          @click="handleLinkedInShare"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </button>
        <button
          class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Share on Facebook"
          @click="handleFacebookShare"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
      </div>

      <!-- Center: Main Content -->
      <div class="w-full max-w-4xl">
        <!-- Rendered Markdown Content -->
        <div
          class="prose prose-lg max-w-none markdown-content"
          v-html="renderedBody"
        />
      </div>

      <!-- Right: Sidebar -->
      <div class="row-start-2 lg:row-start-1 lg:col-start-3 lg:px-8 space-y-8 mt-8 lg:mt-0">
        <NuxtLink
          to="/contact"
          class="w-full justify-center hidden lg:inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Get in Touch
        </NuxtLink>

        <div class="hidden lg:block h-px bg-border" />

        <!-- Table of Contents -->
        <nav v-if="tocLinks.length > 0" class="hidden lg:block">
          <h3 class="text-sm font-semibold text-foreground mb-3">On this page</h3>
          <ul class="space-y-2 text-sm">
            <li
              v-for="link in tocLinks"
              :key="link.id"
              :class="link.depth === 3 ? 'ml-4' : ''"
            >
              <button
                type="button"
                class="text-left text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                @click="scrollToHeading(link.id)"
              >
                {{ link.text }}
              </button>
            </li>
          </ul>
        </nav>

        <div v-if="tocLinks.length > 0 && blog.author" class="hidden lg:block h-px bg-border" />

        <!-- Author Info -->
        <div v-if="blog.author" class="hidden lg:block">
          <h3 class="text-sm font-semibold text-foreground mb-3">Written by</h3>
          <div class="flex items-center gap-3">
            <div>
              <p class="font-medium text-foreground">{{ blog.author.name }}</p>
              <a
                v-if="blog.author.social && getSocialPlatform(blog.author.social)"
                :href="blog.author.social"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-1"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.193-9.193a4.5 4.5 0 00-6.364 6.364l4.5 4.5a4.5 4.5 0 007.072-6.364l-1.757-1.757" />
                </svg>
                <span>{{ getSocialPlatform(blog.author.social)?.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Blog Posts -->
    <section v-if="relatedPosts.length > 0" class="mt-16 max-w-7xl mx-auto">
      <h2 class="text-2xl text-foreground font-bold">
        More Blog Posts
      </h2>

      <div class="mt-3 border-b border-border" />

      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard
          v-for="related in relatedPosts"
          :key="related.path"
          :to="related.path"
          :title="related.title"
          :description="related.description"
          :image="related.image || undefined"
          :author="related.author || undefined"
          :published-at="related.publishedAt"
        />
      </div>
    </section>

    <!-- CTA Section -->
    <CTAProject
      title="Have a Project in Mind?"
      description="Let's discuss how we can help you build, scale, and secure your technology solutions."
    />
  </div>
</template>

<style scoped>
/* Markdown content styling */
.markdown-content {
  font-size: 1.125rem;
  line-height: 1.75;
}

.markdown-content :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  scroll-margin-top: 100px;
  color: hsl(var(--foreground));
}

.markdown-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  scroll-margin-top: 100px;
  color: hsl(var(--foreground));
}

.markdown-content :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.75;
  color: hsl(var(--muted-foreground));
}

.markdown-content :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  list-style-type: disc;
}

.markdown-content :deep(ol) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  list-style-type: decimal;
}

.markdown-content :deep(li) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: hsl(var(--muted-foreground));
}

.markdown-content :deep(strong) {
  font-weight: 700;
  color: hsl(var(--foreground));
}

.markdown-content :deep(a) {
  color: hsl(var(--primary));
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(blockquote) {
  margin: 1.5rem 0;
  padding-left: 1rem;
  border-left: 4px solid hsl(var(--primary));
  font-style: italic;
  color: hsl(var(--muted-foreground));
}

.markdown-content :deep(code) {
  background-color: hsl(var(--muted));
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.markdown-content :deep(pre) {
  background-color: hsl(var(--muted));
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.markdown-content :deep(img) {
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}
</style>
