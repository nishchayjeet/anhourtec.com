<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  showEmailButton?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Ready to get started?',
  description: "Let's discuss how AnHourTec can help with your software development, IT infrastructure, or managed services needs.",
  primaryButtonText: 'Schedule a Consultation',
  primaryButtonLink: '/contact',
  showEmailButton: true
})
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="container max-w-6xl mx-auto px-4">
      <BlurFade :delay="0.1">
        <div class="bg-gradient-to-br from-primary/5 via-primary/10 to-transparent border border-border rounded-3xl p-8 md:p-16 text-center">
          <h2 class="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {{ title }}
          </h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {{ description }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              :to="primaryButtonLink"
              class="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-[1.02]"
            >
              {{ primaryButtonText }}
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </NuxtLink>
            <a
              v-if="showEmailButton"
              href="mailto:hello@anhourtec.com"
              class="inline-flex items-center justify-center px-8 py-4 text-base font-semibold border border-border bg-background rounded-lg hover:bg-accent transition-all duration-200"
            >
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              hello@anhourtec.com
            </a>
          </div>
        </div>
      </BlurFade>
    </div>
  </section>
</template>
