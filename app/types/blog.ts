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
