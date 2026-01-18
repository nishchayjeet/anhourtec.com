<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
    <ScrollProgressIndicator />
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <ScrollToTop />
  </div>
</template>
