<script setup lang="ts">
interface Testimonial {
  body: string
  author: {
    name: string
    role: string
  }
}

const testimonials: Testimonial[] = [
  {
    body: "AnHourTec completely transformed our IT infrastructure. Their team handled everything from network setup to ongoing maintenance with exceptional professionalism.",
    author: {
      name: "Sarah Mitchell",
      role: "Operations Manager",
    },
  },
  {
    body: "The custom software solution they built for our business has streamlined our entire workflow. We've seen a 40% increase in productivity since implementation.",
    author: {
      name: "David Chen",
      role: "Tech Startup Founder",
    },
  },
  {
    body: "Their managed IT services have been a game changer. 24/7 monitoring means we never worry about downtime anymore.",
    author: {
      name: "Michael Torres",
      role: "Restaurant Owner",
    },
  },
  {
    body: "Outstanding network solutions! They set up our entire office infrastructure and it's been running flawlessly for over a year now.",
    author: {
      name: "Jennifer Walsh",
      role: "Law Firm Partner",
    },
  },
  {
    body: "The IoT solutions they implemented for our warehouse have given us real-time visibility into our inventory. Absolutely worth the investment.",
    author: {
      name: "Robert Kim",
      role: "Logistics Director",
    },
  },
  {
    body: "Professional, responsive, and incredibly knowledgeable. AnHourTec is now our go-to for all technology needs.",
    author: {
      name: "Amanda Foster",
      role: "Healthcare Administrator",
    },
  },
  {
    body: "They migrated our entire system to the cloud without any downtime. The transition was seamless and our team adapted quickly.",
    author: {
      name: "Chris Patel",
      role: "Financial Services",
    },
  },
  {
    body: "Best decision we made was switching to AnHourTec for our IT needs. Their response time is incredible and they truly understand small business challenges.",
    author: {
      name: "Lisa Thompson",
      role: "Retail Business Owner",
    },
  },
  {
    body: "The cybersecurity audit they performed identified vulnerabilities we didn't even know existed. Now we sleep better knowing our data is protected.",
    author: {
      name: "Mark Stevens",
      role: "Accounting Firm",
    },
  },
]

const featuredTestimonial: Testimonial = {
  body: "Working with AnHourTec has been exceptional. They modernized our entire IT setup and continue to provide outstanding support. Highly recommend for any business in Victoria!",
  author: {
    name: "James Anderson",
    role: "CEO, Pacific Tech Solutions",
  },
}
</script>

<template>
  <section class="py-6 md:py-16">
    <div class="container max-w-6xl mx-auto text-center">
      <BlurFade :delay="0.1">
        <h2 class="font-sans text-foreground text-[1.7rem] md:text-[2.5rem] font-bold leading-tight mx-auto max-w-[620px]">
          Trusted by businesses across Victoria
        </h2>
        <p class="font-sans text-muted-foreground text-lg max-w-[650px] mx-auto mt-2.5">
          Our clients love the reliability and expertise we bring to their technology.
        </p>
      </BlurFade>

      <div class="mt-6 md:mt-10">
        <!-- Mobile layout -->
        <div class="grid gap-4 text-sm leading-6 sm:hidden">
          <BlurFade
            v-for="(testimonial, index) in testimonials.slice(0, 5)"
            :key="testimonial.author.name"
            :delay="0.15 + index * 0.05"
          >
            <div class="testimonial-card text-left flex flex-col">
              <div class="p-6">
                <p class="font-sans text-muted-foreground text-base">
                  {{ testimonial.body }}
                </p>
              </div>
              <div class="p-6 border-t border-border flex items-center">
                <div class="flex items-center gap-4">
                  <div class="size-12 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                    <span class="text-foreground font-semibold">{{ testimonial.author.name.charAt(0) }}</span>
                  </div>
                  <div class="text-left">
                    <p class="font-sans text-foreground text-base font-semibold">
                      {{ testimonial.author.name }}
                    </p>
                    <p class="font-sans text-muted-foreground text-sm">
                      {{ testimonial.author.role }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>

        <!-- Desktop layout -->
        <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Featured testimonial -->
          <BlurFade :delay="0.15" class="sm:col-span-2 lg:col-span-3">
            <div class="testimonial-card text-left flex flex-col">
              <div class="p-6">
                <p class="font-sans text-foreground text-lg font-semibold leading-7 tracking-tight">
                  {{ featuredTestimonial.body }}
                </p>
              </div>
              <div class="p-6 border-t border-border flex items-center">
                <div class="flex items-center gap-4">
                  <div class="size-12 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                    <span class="text-foreground font-semibold">{{ featuredTestimonial.author.name.charAt(0) }}</span>
                  </div>
                  <div class="text-left">
                    <p class="font-sans text-foreground text-base font-semibold">
                      {{ featuredTestimonial.author.name }}
                    </p>
                    <p class="font-sans text-muted-foreground text-sm">
                      {{ featuredTestimonial.author.role }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>

          <!-- Regular testimonials -->
          <BlurFade
            v-for="(testimonial, index) in testimonials.slice(0, 6)"
            :key="testimonial.author.name"
            :delay="0.2 + index * 0.05"
          >
            <div class="testimonial-card text-left flex flex-col h-full">
              <div class="p-6 flex-1">
                <p class="font-sans text-muted-foreground text-base">
                  {{ testimonial.body }}
                </p>
              </div>
              <div class="p-6 border-t border-border flex items-center">
                <div class="flex items-center gap-4">
                  <div class="size-10 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                    <span class="text-foreground font-semibold text-sm">{{ testimonial.author.name.charAt(0) }}</span>
                  </div>
                  <div class="text-left">
                    <p class="font-sans text-foreground text-sm font-semibold">
                      {{ testimonial.author.name }}
                    </p>
                    <p class="font-sans text-muted-foreground text-xs">
                      {{ testimonial.author.role }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-card {
  @apply border border-border bg-card rounded-2xl;
  @apply shadow-[0px_3px_12px_0px_rgba(0,0,0,0.04)];
}

:global(.dark) .testimonial-card {
  @apply shadow-[0_0_0_1px_rgba(255,255,255,0.06)];
}
</style>
