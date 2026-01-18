<script setup lang="ts">
const logos = [
  { src: '/images/logos/resend.svg', alt: 'Resend', w: 158 },
  { src: '/images/logos/bytedance.svg', alt: 'ByteDance', w: 158 },
  { src: '/images/logos/zendesk.svg', alt: 'Zendesk', w: 158 },
  { src: '/images/logos/netflix.svg', alt: 'Netflix', w: 178 },
  { src: '/images/logos/doac.svg', alt: 'DOAC', w: 158 },
  { src: '/images/logos/joco.svg', alt: 'JOCO', w: 158 },
]

</script>

<template>
  <section class="border-y border-border bg-background/40">
    <div class="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <!-- WordReveal heading -->
      <BlurFade :delay="0.1">
        <h2 class="flex justify-center text-sm font-medium text-muted-foreground">
          Trusted by productive teams
        </h2>
      </BlurFade>

      <!-- Marquee container -->
      <BlurFade :delay="0.2">
        <div class="relative mt-10 overflow-hidden">
        <!-- Marquee track -->
        <div class="flex w-max animate-marquee gap-16">
          <!-- First copy -->
          <img
            v-for="(logo, i) in logos"
            :key="`a-${i}`"
            :src="logo.src"
            :alt="logo.alt"
            :width="logo.w"
            height="40"
            class="logo-img max-h-10 object-contain opacity-80"
          />
          <!-- Duplicated copy for seamless loop -->
          <img
            v-for="(logo, i) in logos"
            :key="`b-${i}`"
            :src="logo.src"
            :alt="logo.alt"
            :width="logo.w"
            height="40"
            class="logo-img max-h-10 object-contain opacity-80"
          />
        </div>
      </div>
      </BlurFade>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

/* Invert logo colors in dark mode */
:global(.dark) .logo-img {
  filter: invert(1) grayscale(100%) brightness(2);
}
</style>
