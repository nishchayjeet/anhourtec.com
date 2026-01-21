import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const cmsBase = config.public.cmsBase

  // Fetch all blogs from CMS
  const response = await $fetch<{ data: any[] }>(`${cmsBase}/api/blogs?populate=*`)

  const blogUrls = response.data?.map((blog: any) => ({
    loc: `/blog/${blog.slug}`,
    lastmod: blog.updatedAt || blog.publishedAt,
    changefreq: 'weekly',
    priority: 0.8
  })) || []

  // Return dynamic URLs
  return [
    ...blogUrls
  ]
})
