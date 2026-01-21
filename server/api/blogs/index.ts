// List all blogs from Strapi CMS

export interface StrapiBlog {
  id: number
  documentId: string
  title: string
  description: string
  slug: string
  img_alt: string
  featured: boolean
  publishedDate: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: {
    id: number
    url: string
    alternativeText?: string
  } | null
  author: {
    id: number
    name: string
    email?: string
    social?: string
  } | null
  blocks: Array<{
    __component: string
    id: number
    body: string
  }>
}

export interface TransformedBlog {
  id: number
  path: string
  title: string
  description: string
  slug: string
  featured: boolean
  image: {
    src: string
    alt: string
  } | null
  author: {
    name: string
    social?: string
  } | null
  publishedAt: string
  body: string
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiUrl = `${config.public.cmsBase}/api/blogs`

  try {
    const data = await $fetch<{ data: StrapiBlog[] }>(apiUrl, {
      params: {
        'populate': '*',
        'sort': 'publishedDate:desc'
      }
    })

    if (!data?.data) {
      return { data: [] }
    }

    // Transform to simplified format for listing
    const blogs: TransformedBlog[] = data.data.map((blog) => ({
      id: blog.id,
      path: `/blog/${blog.slug}`,
      title: blog.title,
      description: blog.description || '',
      slug: blog.slug,
      featured: blog.featured || false,
      image: blog.image ? {
        src: blog.image.url,
        alt: blog.img_alt || blog.image.alternativeText || blog.title
      } : null,
      author: blog.author ? {
        name: blog.author.name,
        social: blog.author.social
      } : null,
      publishedAt: blog.publishedDate || blog.publishedAt,
      body: blog.blocks?.find(b => b.__component === 'shared.rich-text')?.body || ''
    }))

    return { data: blogs }
  } catch (error: any) {
    console.error('Strapi API error:', error?.message || error)
    return { data: [] }
  }
})
