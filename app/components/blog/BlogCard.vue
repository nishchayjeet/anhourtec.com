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
  <article
    class="relative group hover-lift overflow-hidden transition-all duration-300 bg-card rounded-lg border border-border p-4 sm:p-6"
  >
    <header>
      <div
        v-if="imageUrl"
        class="overflow-hidden rounded-lg -mx-4 -mt-4 mb-4"
      >
        <NuxtImg
          :key="imageUrl"
          :src="imageUrl"
          :alt="image?.alt || title"
          class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          format="webp"
          quality="80"
        />
      </div>

      <!-- Blog badge -->
      <div class="mb-3">
        <span class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
          <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Blog
        </span>
      </div>

      <h3 class="text-xl font-bold line-clamp-2 text-foreground">
        <NuxtLink :to="to" class="hover:text-primary transition-colors duration-300">
          <span class="absolute inset-0 z-10" aria-hidden="true" />
          {{ title }}
        </NuxtLink>
      </h3>
    </header>

    <p class="mt-3 text-muted-foreground line-clamp-3 flex-grow">
      {{ description }}
    </p>

    <footer class="mt-4 pt-4 border-t border-border flex items-center justify-between">
      <time
        v-if="publishedAt"
        :datetime="publishedAt"
        class="text-sm text-muted-foreground"
      >
        {{ formatDate(publishedAt) }}
      </time>
      <span v-if="author" class="text-sm text-muted-foreground">
        {{ author.name }}
      </span>
    </footer>
  </article>
</template>

<style scoped>
.hover-lift {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.dark .hover-lift:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}
</style>
