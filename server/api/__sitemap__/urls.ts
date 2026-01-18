// Dynamic sitemap URLs from CMS

interface SitemapUrl {
  loc: string
  priority?: number
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  lastmod?: string
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const urls: SitemapUrl[] = []

  // Static pages with priorities
  const staticPages: SitemapUrl[] = [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/about', priority: 0.8, changefreq: 'monthly' },
    { loc: '/services', priority: 0.9, changefreq: 'monthly' },
    { loc: '/blog', priority: 0.8, changefreq: 'daily' },
    { loc: '/contact', priority: 0.8, changefreq: 'monthly' },
  ]

  // Add static pages
  urls.push(...staticPages)

  try {
    // Fetch Blogs from CMS
    const blogs = await $fetch<{ data: any[] }>(`${config.public.cmsBase}/api/blogs`, {
      params: { 'sort': 'publishedDate:desc' }
    }).catch(() => ({ data: [] }))

    if (blogs?.data) {
      for (const blog of blogs.data) {
        if (blog.slug) {
          urls.push({
            loc: `/blog/${blog.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
            lastmod: blog.updatedAt || blog.publishedDate || new Date().toISOString()
          })
        }
      }
    }

  } catch (error) {
    console.error('Error generating sitemap URLs:', error)
  }

  return urls
})
