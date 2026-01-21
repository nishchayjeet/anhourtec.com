<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'AnHourTec - Technology Solutions & IT Services'
const description = 'Your trusted technology partner in Victoria, BC. We deliver innovative software solutions and reliable IT infrastructure services that help businesses thrive.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://anhourtec.com/og-image.png',
  twitterImage: 'https://anhourtec.com/og-image.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <ScrollProgressIndicator />
    <Header />

    <UMain>
      <NuxtPage />
    </UMain>

    <Footer />
    <ScrollToTop />
  </UApp>
</template>
