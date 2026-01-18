<script setup lang="ts">
interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What areas do you serve?',
    answer: 'We primarily serve businesses in Victoria, BC and the surrounding Greater Victoria area. For software development and remote IT support, we work with clients across Canada.',
  },
  {
    question: 'How quickly can you respond to IT emergencies?',
    answer: 'For managed service clients, we offer 24/7 monitoring with rapid response times. Critical issues are typically addressed within 1-2 hours during business hours.',
  },
  {
    question: 'Do you offer ongoing support or just one-time projects?',
    answer: 'Both! We offer one-time projects like software development or network setup, as well as ongoing managed IT services with monthly support plans tailored to your needs.',
  },
  {
    question: 'What industries do you work with?',
    answer: 'We work with businesses across various industries including healthcare, legal, retail, hospitality, logistics, and professional services. Our solutions are customized for each industry\'s unique requirements.',
  },
  {
    question: 'Can you help migrate our systems to the cloud?',
    answer: 'Yes! We specialize in cloud migrations to AWS, Azure, and Google Cloud Platform. We handle the entire process from planning to execution with minimal downtime.',
  },
  {
    question: 'How do I get started with AnHourTec?',
    answer: 'Simply contact us for a free consultation. We\'ll assess your needs, discuss your goals, and provide a detailed proposal with transparent pricing.',
  },
]
</script>

<template>
  <section class="py-6 md:py-16 text-center">
    <div class="container max-w-6xl mx-auto">
      <BlurFade :delay="0.1">
        <h2 class="font-sans text-foreground text-[1.7rem] md:text-[2.5rem] font-bold leading-tight mx-auto">
          Frequently asked questions
        </h2>
      </BlurFade>

      <div class="mt-6 md:mt-10">
        <BlurFade :delay="0.15">
          <div class="faq-wrapper text-left p-5 rounded-[52px]">
            <dl class="grid md:grid-cols-2 gap-6">
              <BlurFade
                v-for="(faq, index) in faqs"
                :key="index"
                :delay="0.2 + index * 0.05"
              >
                <div class="faq-card text-left flex flex-col gap-4">
                  <div class="p-6">
                    <dt class="font-sans text-foreground text-sm md:text-base font-semibold tracking-tight mb-4">
                      {{ faq.question }}
                    </dt>
                    <dd>
                      <p class="font-sans text-muted-foreground text-sm md:text-base">
                        {{ faq.answer }}
                      </p>
                    </dd>
                  </div>
                </div>
              </BlurFade>
            </dl>
          </div>
        </BlurFade>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-wrapper {
  @apply border border-border bg-gradient-to-b from-card to-muted/50;
}

.faq-card {
  @apply border border-border bg-card rounded-[32px];
  @apply shadow-[0px_3px_12px_0px_rgba(0,0,0,0.04)];
}

:global(.dark) .faq-wrapper {
  @apply bg-gradient-to-b from-[#111111] to-[#0D0D0D] border-[#2A2A2A];
}

:global(.dark) .faq-card {
  background: linear-gradient(to right, #1c1c1c 0%, #1c1c1c 100%);
  @apply border-[#2A2A2A]/50;
  @apply shadow-[0_0_0_1px_rgba(255,255,255,0.06)];
}
</style>
