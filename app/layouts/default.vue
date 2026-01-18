<template>
  <div class="min-h-screen bg-background text-foreground transition-colors duration-200">
    <ScrollProgressIndicator />
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <ScrollToTop />
  </div>
</template>
