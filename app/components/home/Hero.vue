<script setup lang="ts">
interface Props {
  subtitle?: string
  badgeText?: string
  badgeVariant?: string
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: 'Custom software development, IT infrastructure, networking solutions, and managed services. We help businesses build, scale, and secure their technology.',
  badgeText: 'Based in Victoria, BC',
  badgeVariant: 'orange',
})
</script>

<template>
  <Section class="mt-7 md:mt-14">
    <!-- Badge -->
    <BlurFade :delay="0">
      <div class="flex justify-center mb-7">
        <Badge :variant="badgeVariant as any">
          <span class="flex items-center gap-3 text-base">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span class="font-medium">{{ badgeText }}</span>
          </span>
        </Badge>
      </div>
    </BlurFade>

    <!-- Title -->
    <BlurFade :delay="0.1">
      <h1 class="font-sans font-bold text-[hsl(var(--foreground))] text-[40px] sm:text-6xl md:text-7xl leading-tight mx-auto max-w-[900px] tracking-tight">
        SOFTWARE &amp; IT<br />EXPERTS
      </h1>
    </BlurFade>

    <!-- Tagline -->
    <BlurFade :delay="0.2">
      <p class="text-[hsl(var(--primary))] text-xl md:text-2xl font-medium mt-4">
        We build technology that works
      </p>
    </BlurFade>

    <!-- Subtitle -->
    <BlurFade :delay="0.3">
      <p class="text-[hsl(var(--muted-foreground))] text-lg max-w-[700px] mx-auto mt-6">
        {{ subtitle }}
      </p>
    </BlurFade>

    <!-- CTA Buttons -->
    <BlurFade :delay="0.4">
      <div class="mt-8 md:mt-10">
        <div class="space-y-4 mb-8">
          <CTAButtons />

          <div class="mt-8 flex flex-wrap items-center gap-4 justify-center text-sm">
            <p class="text-[hsl(var(--muted-foreground))]/60 text-sm">Services include</p>

            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-[hsl(var(--muted-foreground))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span class="font-medium text-[hsl(var(--foreground))]">Software</span>
            </div>
            <span class="text-[hsl(var(--muted-foreground))]">•</span>

            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-[hsl(var(--muted-foreground))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
              <span class="font-medium text-[hsl(var(--foreground))]">IT Infrastructure</span>
            </div>
            <span class="text-[hsl(var(--muted-foreground))]">•</span>

            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-[hsl(var(--muted-foreground))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span class="font-medium text-[hsl(var(--foreground))]">Networking</span>
            </div>
            <span class="text-[hsl(var(--muted-foreground))]">•</span>

            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-[hsl(var(--muted-foreground))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span class="font-medium text-[hsl(var(--foreground))]">MSP</span>
            </div>
          </div>
        </div>

        <!-- Hero Image/Video -->
        <slot />
      </div>
    </BlurFade>
  </Section>
</template>
