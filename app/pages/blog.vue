<script setup lang="ts">
useHead({
  title: 'Blog - AnHourTec',
  meta: [
    { name: 'description', content: 'Tech insights, tutorials, and company updates from AnHourTec.' },
  ],
})
</script>

<template>
  <div class="container py-20">
    <BlurFade>
      <h1 class="text-4xl font-bold tracking-tight mb-6">Blog</h1>
      <p class="text-lg text-muted-foreground mb-12 max-w-2xl">
        Tech insights, tutorials, and company updates.
      </p>
    </BlurFade>

    <BlurFade :delay="0.1">
      <div class="text-center py-16 border border-dashed border-border rounded-lg">
        <p class="text-muted-foreground">Blog posts coming soon.</p>
      </div>
    </BlurFade>
  </div>
</template>
