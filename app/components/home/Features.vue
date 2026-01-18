<script setup lang="ts">
const features = [
  {
    number: '01',
    title: 'Custom Software Development',
    description:
      'Full-stack web applications, mobile apps, and enterprise software built with modern technologies. From MVP to production-ready solutions.',
    icon: 'code',
  },
  {
    number: '02',
    title: 'IT Server Administration',
    description:
      'Windows & Linux server management, virtualization (VMware, Hyper-V), Active Directory, cloud infrastructure (AWS, Azure, GCP).',
    icon: 'server',
  },
  {
    number: '03',
    title: 'Network Solutions',
    description:
      'Enterprise networking with Cisco, Sophos, SonicWall, Juniper, and TP-Link. Design, implementation, and security hardening.',
    icon: 'network',
  },
  {
    number: '04',
    title: 'Managed Services (MSP)',
    description:
      'Proactive IT management, 24/7 monitoring, helpdesk support, backup solutions, and disaster recovery for businesses of all sizes.',
    icon: 'shield',
  },
  {
    number: '05',
    title: 'Contract & Staff Augmentation',
    description:
      'Flexible contract arrangements for software development and IT projects. Scale your team with experienced professionals.',
    icon: 'users',
  },
  {
    number: '06',
    title: 'IoT & LoRaWAN',
    description:
      'Enterprise IoT infrastructure with LoRaWAN technology. Sensor deployment, data collection, and real-time monitoring solutions.',
    icon: 'wifi',
  },
]
</script>

<template>
  <section class="container max-w-6xl mx-auto relative py-20">
    <div class="text-center mb-16">
      <BlurFade :duration="0.8">
        <span class="rounded-full mb-4 px-4 py-2 border border-border text-sm font-medium inline-block">
          Our Services
        </span>
        <h2 class="text-3xl font-bold tracking-tight sm:text-5xl mb-4 mt-4">
          Technology solutions that scale
        </h2>
        <p class="text-xl text-muted-foreground max-w-[800px] mx-auto">
          From software development to IT infrastructure, we deliver end-to-end solutions
          that help businesses innovate and grow.
        </p>
      </BlurFade>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <BlurFade
        v-for="(feature, index) in features"
        :key="feature.number"
        :delay="index * 0.1"
        :duration="0.6"
      >
        <div class="group border border-border bg-card hover:bg-accent/50 transition-colors rounded-xl p-6 h-full">
          <div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <!-- Code icon -->
            <svg v-if="feature.icon === 'code'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16,18 22,12 16,6" />
              <polyline points="8,6 2,12 8,18" />
            </svg>
            <!-- Server icon -->
            <svg v-else-if="feature.icon === 'server'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
            <!-- Network icon -->
            <svg v-else-if="feature.icon === 'network'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <!-- Shield icon -->
            <svg v-else-if="feature.icon === 'shield'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <!-- Users icon -->
            <svg v-else-if="feature.icon === 'users'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <!-- Wifi icon -->
            <svg v-else-if="feature.icon === 'wifi'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-foreground">{{ feature.title }}</h3>
          <p class="text-muted-foreground text-sm">{{ feature.description }}</p>
        </div>
      </BlurFade>
    </div>
  </section>
</template>
