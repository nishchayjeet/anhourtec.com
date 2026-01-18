<script setup lang="ts">
// SEO Meta for the homepage
useSeoMeta({
  title: 'AnHourTec - Software & IT Solutions | Victoria, BC',
  description: 'Custom software development, IT infrastructure, networking solutions, and managed services in Victoria, BC. Cisco, Sophos, SonicWall, and more.',
  ogTitle: 'AnHourTec - Software & IT Solutions | Victoria, BC',
  ogDescription: 'Custom software development, IT infrastructure, networking solutions, and managed services in Victoria, BC.',
  ogImage: 'https://res.cloudinary.com/dpurlknvy/image/upload/v1760466147/logo-lightbg-hp-transparent_qjb47d.png',
  ogUrl: 'https://anhourtec.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'AnHourTec - Software & IT Solutions | Victoria, BC',
  twitterDescription: 'Custom software development, IT infrastructure, networking solutions, and managed services in Victoria, BC.',
})

// Define JSON-LD structured data for the homepage
useSchemaOrg([
  defineWebPage({
    name: 'AnHourTec - Software & IT Solutions',
    description: 'Custom software development, IT infrastructure, networking solutions, and managed services in Victoria, BC.',
  }),
  defineLocalBusiness({
    name: 'AnHourTec',
    image: 'https://res.cloudinary.com/dpurlknvy/image/upload/v1760466147/logo-lightbg-hp-transparent_qjb47d.png',
    address: {
      addressLocality: 'Victoria',
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
    priceRange: '$$',
  }),
])
</script>

<template>
  <div>
    <!-- Hero Section -->
    <AnimatedSection tag="div" :delay="0" :stagger="0.1">
      <Hero />
    </AnimatedSection>

    <!-- Technology Partners -->
    <AnimatedSection tag="div" :delay="0.1" :stagger="0.1">
      <LogoCloud />
    </AnimatedSection>

    <!-- Services Grid -->
    <AnimatedSection tag="div" :delay="0.1" :stagger="0.15">
      <Features />
    </AnimatedSection>

    <!-- Testimonials -->
    <AnimatedSection tag="div" :delay="0.1" :stagger="0.1">
      <Testimonials />
    </AnimatedSection>

    <!-- FAQ -->
    <AnimatedSection tag="div" :delay="0.1" :stagger="0.1">
      <FAQ />
    </AnimatedSection>

    <!-- CTA Section -->
    <AnimatedSection tag="div" :delay="0.1" :stagger="0.1">
      <CTASection />
    </AnimatedSection>
  </div>
</template>
