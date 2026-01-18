<script setup lang="ts">
useHead({
  title: 'About Us - AnHourTec',
  meta: [
    { name: 'description', content: 'Learn about AnHourTec - your trusted technology partner in Victoria, BC.' },
  ],
})
</script>

<template>
  <div class="container py-20">
    <BlurFade>
      <h1 class="text-4xl font-bold tracking-tight mb-6">About AnHourTec</h1>
      <p class="text-lg text-muted-foreground mb-8 max-w-2xl">
        Your trusted technology partner in Victoria, BC.
      </p>
    </BlurFade>

    <div class="grid md:grid-cols-2 gap-12 mt-12">
      <BlurFade :delay="0.1">
        <div>
          <h2 class="text-2xl font-semibold mb-4">Our Mission</h2>
          <p class="text-muted-foreground leading-relaxed">
            We deliver innovative software solutions and reliable IT infrastructure services that
            help businesses thrive in the digital age. From custom development to enterprise
            networking, we're committed to excellence in every project.
          </p>
        </div>
      </BlurFade>

      <BlurFade :delay="0.15">
        <div>
          <h2 class="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <ul class="space-y-3 text-muted-foreground">
            <li class="flex items-start gap-2">
              <span class="text-primary mt-1">•</span>
              <span>Local expertise with global technology partnerships</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary mt-1">•</span>
              <span>Certified professionals in Cisco, Sophos, and more</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary mt-1">•</span>
              <span>Flexible engagement models - projects or staff augmentation</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary mt-1">•</span>
              <span>24/7 support for managed service clients</span>
            </li>
          </ul>
        </div>
      </BlurFade>
    </div>
  </div>
</template>
