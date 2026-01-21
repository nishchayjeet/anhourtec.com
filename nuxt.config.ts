// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/seo'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  components: [
    {
      path: '~/components/common',
      pathPrefix: false
    },
    {
      path: '~/components/home',
      pathPrefix: false
    },
    {
      path: '~/components/blog',
      pathPrefix: false
    },
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // Runtime config for CMS
  runtimeConfig: {
    public: {
      cmsBase: 'https://content.iotkinect.com'
    }
  },

  // SEO Configuration
  site: {
    url: 'https://anhourtec.com',
    name: 'AnHourTec',
    description: 'Your trusted technology partner in Victoria, BC. We deliver innovative software solutions and reliable IT infrastructure services.',
    defaultLocale: 'en'
  },

  // Sitemap configuration
  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ]
  },

  // Robots configuration
  robots: {
    allow: '/',
    sitemap: 'https://anhourtec.com/sitemap.xml'
  },

  // OG Image configuration
  ogImage: {
    enabled: true,
    defaults: {
      component: 'NuxtSeo',
      width: 1200,
      height: 630
    }
  },

  // Schema.org configuration
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'AnHourTec',
      url: 'https://anhourtec.com',
      logo: 'https://anhourtec.com/logo.png'
    }
  }
})