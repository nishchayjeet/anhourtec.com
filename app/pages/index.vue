<script setup lang="ts">
// SEO Meta for the homepage
useSeoMeta({
  title: 'AnHourTec - Software & IT Solutions | Victoria, BC',
  description: 'Custom software development, IT infrastructure, networking solutions, and managed services in Victoria, BC. Cisco, Sophos, SonicWall, and more.',
  ogTitle: 'AnHourTec - Software & IT Solutions | Victoria, BC',
  ogDescription: 'Custom software development, IT infrastructure, networking solutions, and managed services in Victoria, BC.',
  ogUrl: 'https://anhourtec.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'AnHourTec - Software & IT Solutions | Victoria, BC',
  twitterDescription: 'Custom software development, IT infrastructure, networking solutions, and managed services in Victoria, BC.',
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <Hero />

    <!-- Technology Partners -->
    <LogoCloud />

    <!-- Services Grid -->
    <Features />

    <!-- Testimonials -->
    <Testimonials />

    <!-- FAQ -->
    <FAQ />

    <!-- CTA Section -->
    <CTASection />
  </div>
</template>
