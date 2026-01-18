<script lang="ts" setup>
import { formatDate } from '~/utils/date'

interface Props {
  to: string
  title: string
  description: string
  image?: {
    src: string
    alt?: string
  }
  author?: {
    name: string
  }
  publishedAt?: string
}

const props = defineProps<Props>()

const imageUrl = computed(() => props.image?.src || '')
</script>

<template>
  <div class="group relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-8 rounded-2xl bg-card overflow-hidden shadow-lg border border-border hover:border-primary/50 transition-all duration-500">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
    </div>
    <!-- Hover gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <!-- Content -->
    <div class="relative z-10 flex flex-col md:order-1">
      <div class="mb-4">
        <span class="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground">
          <svg class="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Featured Article
        </span>
      </div>

      <h2 class="text-3xl md:text-4xl font-bold text-foreground">
        <NuxtLink :to="to" class="hover:text-primary transition-colors duration-300">
          <span class="absolute inset-0 z-20" />
          {{ title }}
        </NuxtLink>
      </h2>

      <p class="mt-4 text-lg text-muted-foreground line-clamp-4">
        {{ description }}
      </p>

      <div class="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
        <time v-if="publishedAt" :datetime="publishedAt">
          {{ formatDate(publishedAt) }}
        </time>
        <span v-if="author && publishedAt">•</span>
        <span v-if="author">{{ author.name }}</span>
      </div>

      <NuxtLink
        :to="to"
        class="mt-6 w-fit relative z-20 inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Read Article
        <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Image -->
    <div
      v-if="imageUrl"
      class="overflow-hidden rounded-xl md:order-2 shadow-2xl"
    >
      <NuxtImg
        :key="imageUrl"
        :src="imageUrl"
        :alt="image?.alt || title"
        class="aspect-[16/9] w-full object-cover transition-transform transform duration-700 ease-out group-hover:scale-110"
        loading="eager"
        format="webp"
        quality="90"
      />
    </div>
  </div>
</template>
