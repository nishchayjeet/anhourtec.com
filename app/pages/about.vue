<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: 'About Us | AnHourTec - Technology Partner in Victoria, BC',
  description: 'Learn about AnHourTec - your trusted technology partner in Victoria, BC. We deliver innovative software solutions and reliable IT infrastructure services.',
  ogTitle: 'About AnHourTec',
  ogDescription: 'Your trusted technology partner in Victoria, BC. Local expertise with global technology partnerships.',
  twitterCard: 'summary_large_image',
  robots: 'index, follow'
})

// Structured data for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About AnHourTec',
        description: 'Learn about AnHourTec - your trusted technology partner in Victoria, BC.',
        url: 'https://anhourtec.com/about',
        mainEntity: {
          '@type': 'Organization',
          name: 'AnHourTec',
          url: 'https://anhourtec.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Victoria',
            addressRegion: 'BC',
            addressCountry: 'CA'
          },
          areaServed: {
            '@type': 'Place',
            name: 'Victoria, British Columbia, Canada'
          }
        }
      })
    }
  ]
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">
    <BlurFade>
      <h1 class="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] mb-6">About AnHourTec</h1>
      <p class="text-lg text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl">
        Your trusted technology partner in Victoria, BC.
      </p>
    </BlurFade>

    <div class="grid md:grid-cols-2 gap-12 mt-12">
      <BlurFade :delay="0.1">
        <div>
          <h2 class="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">Our Mission</h2>
          <p class="text-[hsl(var(--muted-foreground))] leading-relaxed">
            We deliver innovative software solutions and reliable IT infrastructure services that
            help businesses thrive in the digital age. From custom development to enterprise
            networking, we're committed to excellence in every project.
          </p>
        </div>
      </BlurFade>

      <BlurFade :delay="0.15">
        <div>
          <h2 class="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">Why Choose Us</h2>
          <ul class="space-y-3 text-[hsl(var(--muted-foreground))]">
            <li class="flex items-start gap-2">
              <span class="text-[hsl(var(--primary))] mt-1">•</span>
              <span>Local expertise with global technology partnerships</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[hsl(var(--primary))] mt-1">•</span>
              <span>Certified professionals in Cisco, Sophos, and more</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[hsl(var(--primary))] mt-1">•</span>
              <span>Flexible engagement models - projects or staff augmentation</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[hsl(var(--primary))] mt-1">•</span>
              <span>24/7 support for managed service clients</span>
            </li>
          </ul>
        </div>
      </BlurFade>
    </div>
  </div>
</template>
