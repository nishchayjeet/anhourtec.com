<script setup lang="ts">
// SEO
useSeoMeta({
  title: 'Contact Us | Get in Touch with AnHourTec',
  description: 'Contact AnHourTec for software development, IT solutions, and managed services. Reach our team in Victoria, BC, Canada.',
  ogTitle: 'Contact AnHourTec',
  ogDescription: 'Get in touch with our team for software development, IT solutions, and managed services.',
  twitterCard: 'summary_large_image',
  robots: 'index, follow'
})

// Form data
const form = reactive({
  name: '',
  email: '',
  service: '',
  message: '',
  honeypot: '' // Hidden field for bot detection
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const formError = ref('')
const formStartTime = ref(0)

// Validation patterns
const patterns = {
  name: /^[a-zA-Z\s'-]{2,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: /^[\s\S]{10,2000}$/
}

// Sanitize input
function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'"`;(){}[\]\\]/g, '')
    .trim()
}

// Start timing when form is interacted with
function startFormTimer() {
  if (!formStartTime.value) {
    formStartTime.value = Date.now()
  }
}

// Validate form
function validateForm(): boolean {
  formError.value = ''

  // Bot detection: honeypot field should be empty
  if (form.honeypot) {
    return false
  }

  // Bot detection: form filled too quickly (less than 3 seconds)
  const fillTime = Date.now() - formStartTime.value
  if (fillTime < 3000) {
    formError.value = 'Please take your time filling out the form.'
    return false
  }

  // Validate name (required)
  if (!form.name || !patterns.name.test(form.name)) {
    formError.value = 'Please enter a valid name (2-50 characters, letters only).'
    return false
  }

  // Validate email (required)
  if (!form.email || !patterns.email.test(form.email)) {
    formError.value = 'Please enter a valid email address.'
    return false
  }

  // Validate service (required)
  if (!form.service) {
    formError.value = 'Please select a service.'
    return false
  }

  // Validate message (required, min 10 chars)
  if (!form.message || form.message.length < 10) {
    formError.value = 'Please enter a message (at least 10 characters).'
    return false
  }

  if (form.message.length > 2000) {
    formError.value = 'Message is too long (max 2000 characters).'
    return false
  }

  return true
}

// Handle form submission
async function handleFormSubmit() {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  showSuccess.value = false
  formError.value = ''

  // Sanitize inputs
  const sanitizedData = {
    name: sanitize(form.name),
    email: sanitize(form.email),
    service: form.service,
    message: sanitize(form.message)
  }

  // Simulate form submission (replace with actual endpoint)
  try {
    // For now, simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    showSuccess.value = true
    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      service: '',
      message: '',
      honeypot: ''
    })
    formStartTime.value = 0
  } catch {
    formError.value = 'Failed to send message. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Contact info items
const contactItems = [
  {
    icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>`,
    title: 'Our Office',
    content: 'Victoria, BC, Canada',
    subtext: 'Mon-Fri, 9:00 AM - 5:00 PM PST'
  },
  {
    icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>`,
    title: 'Email',
    content: 'info@anhourtec.com',
    href: 'mailto:info@anhourtec.com',
    subtext: "We'll respond within 24 hours"
  }
]

// Service options
const serviceOptions = [
  { value: 'software', label: 'Custom Software Development' },
  { value: 'it-admin', label: 'IT Server Administration' },
  { value: 'networking', label: 'Network Solutions' },
  { value: 'msp', label: 'Managed Services (MSP)' },
  { value: 'staff', label: 'Staff Augmentation' },
  { value: 'iot', label: 'IoT & LoRaWAN' },
  { value: 'other', label: 'Other' }
]

// Social links
const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/anhourtec',
    icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>`
  },
  {
    name: 'X',
    href: 'https://x.com/anhourtec',
    icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>`
  }
]

// Structured data for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact AnHourTec',
        description: 'Get in touch with software development and IT experts',
        url: 'https://anhourtec.com/contact',
        mainEntity: {
          '@type': 'Organization',
          name: 'AnHourTec',
          email: 'info@anhourtec.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Victoria',
            addressRegion: 'BC',
            addressCountry: 'CA'
          }
        }
      })
    }
  ]
})
</script>

<template>
  <section class="relative overflow-hidden bg-[hsl(var(--background))] min-h-screen">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[hsl(var(--primary))]/10 via-[hsl(var(--primary))]/5 to-transparent rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-t from-[hsl(var(--primary))]/5 to-transparent rounded-full blur-3xl" />
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
      <!-- Header -->
      <BlurFade>
        <div class="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/20">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--primary))] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--primary))]"></span>
            </span>
            <span class="text-sm font-medium text-[hsl(var(--primary))]">
              Let's Build Something Great
            </span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[hsl(var(--foreground))] tracking-tight">
            Contact
            <span class="text-[hsl(var(--primary))]">Us</span>
          </h1>
          <p class="mt-6 text-lg lg:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed">
            Have questions about our services? Our team is here to help you find the perfect solution for your business.
          </p>
        </div>
      </BlurFade>

      <!-- Main Content - Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <!-- Left Side: Contact Info -->
        <BlurFade :delay="0.1">
          <div class="space-y-6">
            <!-- Contact Cards -->
            <div class="space-y-4">
              <component
                :is="item.href ? 'a' : 'div'"
                v-for="(item, index) in contactItems"
                :key="item.title"
                :href="item.href"
                class="group flex items-start gap-4 p-5 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/30 hover:shadow-lg transition-all duration-300"
              >
                <div class="w-12 h-12 shrink-0 rounded-xl bg-[hsl(var(--primary))]/10 flex items-center justify-center text-[hsl(var(--primary))] group-hover:scale-110 transition-transform duration-300" v-html="item.icon" />
                <div>
                  <h3 class="text-lg font-semibold text-[hsl(var(--foreground))] mb-1">
                    {{ item.title }}
                  </h3>
                  <p class="text-base text-[hsl(var(--foreground))]/80">
                    {{ item.content }}
                  </p>
                  <p class="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                    {{ item.subtext }}
                  </p>
                </div>
              </component>
            </div>

            <!-- Stay Connected -->
            <div class="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
              <div class="flex items-center gap-3 mb-4">
                <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(var(--primary))]/10">
                  <svg class="w-5 h-5 text-[hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-[hsl(var(--foreground))]">Stay Connected</h3>
              </div>
              <p class="text-[hsl(var(--muted-foreground))] mb-4">
                Follow us for the latest tech trends and updates.
              </p>
              <div class="flex items-center gap-3">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.name"
                  class="w-10 h-10 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200"
                  v-html="social.icon"
                />
              </div>
            </div>

            <!-- Quick Contact Card -->
            <a
              href="mailto:info@anhourtec.com"
              class="block p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/5 to-[hsl(var(--primary))]/10 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/30 transition-all group"
            >
              <div class="flex items-center gap-4">
                <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(var(--primary))]/10 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                  <svg class="w-7 h-7 text-[hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-lg font-semibold text-[hsl(var(--foreground))]">Quick Response</p>
                  <p class="text-sm text-[hsl(var(--muted-foreground))]">Email us directly at info@anhourtec.com</p>
                </div>
                <div class="flex items-center gap-2 text-[hsl(var(--primary))]">
                  <span class="text-sm font-medium">Send Email</span>
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </BlurFade>

        <!-- Right Side: Form -->
        <BlurFade :delay="0.2">
          <div class="p-8 rounded-3xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-xl">
            <div class="flex items-center gap-3 mb-6">
              <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(var(--primary))]/10">
                <svg class="w-5 h-5 text-[hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-[hsl(var(--foreground))]">Send Us a Message</h2>
                <p class="text-sm text-[hsl(var(--muted-foreground))]">We'll get back to you within 24 hours</p>
              </div>
            </div>

            <form class="space-y-5" @submit.prevent="handleFormSubmit">
              <!-- Honeypot field for bot detection (hidden from users) -->
              <div class="absolute -left-full opacity-0 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <label for="website_url">Website</label>
                <input
                  id="website_url"
                  v-model="form.honeypot"
                  type="text"
                  name="website_url"
                  tabindex="-1"
                  autocomplete="off"
                />
              </div>

              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Name <span class="text-[hsl(var(--destructive))]">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  maxlength="50"
                  required
                  placeholder="Your name"
                  autocomplete="name"
                  class="w-full px-4 py-3 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-xl text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all"
                  @focus="startFormTimer"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Email <span class="text-[hsl(var(--destructive))]">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  maxlength="100"
                  required
                  placeholder="you@example.com"
                  autocomplete="email"
                  class="w-full px-4 py-3 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-xl text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all"
                  @focus="startFormTimer"
                />
              </div>

              <!-- Service -->
              <div>
                <label class="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Service Interest <span class="text-[hsl(var(--destructive))]">*</span>
                </label>
                <select
                  v-model="form.service"
                  required
                  class="w-full px-4 py-3 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-xl text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all"
                  @focus="startFormTimer"
                >
                  <option value="" disabled>Select a service</option>
                  <option v-for="option in serviceOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Message <span class="text-[hsl(var(--destructive))]">*</span>
                  <span class="text-xs text-[hsl(var(--muted-foreground))] ml-2">({{ form.message.length }}/2000)</span>
                </label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  minlength="10"
                  maxlength="2000"
                  required
                  placeholder="Tell us about your project..."
                  class="w-full px-4 py-3 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-xl text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all resize-none"
                  @focus="startFormTimer"
                ></textarea>
              </div>

              <!-- Error Message -->
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div v-if="formError" class="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))]/20">
                  <div class="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--destructive))]/20">
                    <svg class="w-5 h-5 text-[hsl(var(--destructive))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <p class="text-[hsl(var(--destructive))] text-sm">{{ formError }}</p>
                </div>
              </Transition>

              <!-- Submit Button -->
              <UButton
                type="submit"
                :disabled="isSubmitting"
                block
                size="lg"
              >
                <svg v-if="!isSubmitting" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                <svg v-else class="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </UButton>

              <!-- Success Message -->
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
              >
                <div v-if="showSuccess" class="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div class="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                    <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-green-700 dark:text-green-300 font-medium">Message sent successfully!</p>
                    <p class="text-green-600 dark:text-green-400 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              </Transition>
            </form>
          </div>
        </BlurFade>
      </div>
    </div>

    <!-- Partners Carousel -->
    <BlurFade :delay="0.3">
      <div class="mt-16 lg:mt-20 pb-16 lg:pb-24">
        <PartnersCarousel title="Trusted by Industry Leaders" />
      </div>
    </BlurFade>
  </section>
</template>
