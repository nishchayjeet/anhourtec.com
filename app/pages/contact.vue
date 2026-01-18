<script setup lang="ts">
useHead({
  title: 'Contact Us - AnHourTec',
  meta: [
    { name: 'description', content: 'Get in touch with AnHourTec for your software and IT needs.' },
  ],
})
</script>

<template>
  <div class="container py-20">
    <div class="max-w-2xl mx-auto">
      <BlurFade>
        <h1 class="text-4xl font-bold tracking-tight mb-6">Contact Us</h1>
        <p class="text-lg text-muted-foreground mb-12">
          Ready to start your project? Get in touch with our team.
        </p>
      </BlurFade>

      <BlurFade :delay="0.1">
        <form class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium mb-2">Name</label>
            <input
              id="name"
              type="text"
              class="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your name"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              class="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label for="service" class="block text-sm font-medium mb-2">Service Interest</label>
            <select
              id="service"
              class="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a service</option>
              <option value="software">Custom Software Development</option>
              <option value="it-admin">IT Server Administration</option>
              <option value="networking">Network Solutions</option>
              <option value="msp">Managed Services (MSP)</option>
              <option value="staff">Staff Augmentation</option>
              <option value="iot">IoT & LoRaWAN</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium mb-2">Message</label>
            <textarea
              id="message"
              rows="5"
              class="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Tell us about your project..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      </BlurFade>

      <BlurFade :delay="0.15">
        <div class="mt-12 pt-12 border-t border-border">
          <h2 class="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
          <div class="space-y-3 text-muted-foreground">
            <p>Victoria, BC, Canada</p>
            <p>info@anhourtec.com</p>
          </div>
        </div>
      </BlurFade>
    </div>
  </div>
</template>
