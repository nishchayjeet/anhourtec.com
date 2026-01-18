<script setup lang="ts">
useHead({
  title: 'Our Services - AnHourTec',
  meta: [
    { name: 'description', content: 'Custom software development, IT infrastructure, networking solutions, and managed services.' },
  ],
})
</script>

<template>
  <div class="container py-20">
    <BlurFade>
      <h1 class="text-4xl font-bold tracking-tight mb-6">Our Services</h1>
      <p class="text-lg text-muted-foreground mb-12 max-w-2xl">
        Comprehensive technology solutions tailored to your business needs.
      </p>
    </BlurFade>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BlurFade :delay="0.1">
        <div class="p-6 rounded-lg border border-border bg-card">
          <h3 class="text-xl font-semibold mb-3">Custom Software Development</h3>
          <p class="text-muted-foreground">Full-stack web and mobile applications built with modern technologies.</p>
        </div>
      </BlurFade>

      <BlurFade :delay="0.15">
        <div class="p-6 rounded-lg border border-border bg-card">
          <h3 class="text-xl font-semibold mb-3">IT Server Administration</h3>
          <p class="text-muted-foreground">Windows and Linux server management, virtualization, and cloud infrastructure.</p>
        </div>
      </BlurFade>

      <BlurFade :delay="0.2">
        <div class="p-6 rounded-lg border border-border bg-card">
          <h3 class="text-xl font-semibold mb-3">Network Solutions</h3>
          <p class="text-muted-foreground">Enterprise networking with Cisco, Sophos, SonicWall, TP-Link, and Juniper.</p>
        </div>
      </BlurFade>

      <BlurFade :delay="0.25">
        <div class="p-6 rounded-lg border border-border bg-card">
          <h3 class="text-xl font-semibold mb-3">Managed Services (MSP)</h3>
          <p class="text-muted-foreground">24/7 monitoring, maintenance, and support for your IT infrastructure.</p>
        </div>
      </BlurFade>

      <BlurFade :delay="0.3">
        <div class="p-6 rounded-lg border border-border bg-card">
          <h3 class="text-xl font-semibold mb-3">Staff Augmentation</h3>
          <p class="text-muted-foreground">Contract developers and IT professionals to supplement your team.</p>
        </div>
      </BlurFade>

      <BlurFade :delay="0.35">
        <div class="p-6 rounded-lg border border-border bg-card">
          <h3 class="text-xl font-semibold mb-3">IoT & LoRaWAN</h3>
          <p class="text-muted-foreground">Smart device integration and long-range wireless network solutions.</p>
        </div>
      </BlurFade>
    </div>
  </div>
</template>
