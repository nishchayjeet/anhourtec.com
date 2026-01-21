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
  <section class="border-y border-[hsl(var(--border))] bg-[hsl(var(--background))]">
    <div class="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <!-- Heading -->
      <h2 class="flex justify-center text-sm font-medium text-[hsl(var(--muted-foreground))]">
        Trusted by productive teams
      </h2>

      <!-- Marquee container -->
      <div class="relative mt-10 overflow-hidden">
        <!-- Marquee track -->
        <div class="flex w-max gap-16 animate-[marquee_30s_linear_infinite]">
          <!-- First copy -->
          <img
            v-for="(logo, i) in logos"
            :key="`a-${i}`"
            :src="logo.src"
            :alt="logo.alt"
            :width="logo.w"
            height="40"
            class="max-h-10 object-contain opacity-70 dark:invert dark:grayscale"
          />
          <!-- Duplicated copy for seamless loop -->
          <img
            v-for="(logo, i) in logos"
            :key="`b-${i}`"
            :src="logo.src"
            :alt="logo.alt"
            :width="logo.w"
            height="40"
            class="max-h-10 object-contain opacity-70 dark:invert dark:grayscale"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
