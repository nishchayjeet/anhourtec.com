<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-center gap-3 items-center">
    <NuxtLink
      to="/contact"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-center font-semibold transition-all duration-200 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 active:opacity-80 border border-transparent shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--primary))] transform hover:scale-[1.02] active:scale-[0.98] px-8 py-3 text-sm rounded-lg"
    >
      Get a Quote
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </NuxtLink>
    <NuxtLink
      to="/services"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-center font-semibold transition-all duration-200 border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] active:opacity-80 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--primary))] transform hover:scale-[1.02] active:scale-[0.98] px-8 py-3 text-sm rounded-lg"
    >
      View Services
    </NuxtLink>
  </div>
</template>
