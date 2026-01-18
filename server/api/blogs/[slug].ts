// Get single blog by slug from Strapi CMS

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug is required'
    })
  }

  const apiUrl = `${config.public.cmsBase}/api/blogs`

  try {
    const data = await $fetch<{ data: any[] }>(apiUrl, {
      params: {
        'filters[slug][$eq]': slug,
        'populate': '*'
      }
    })

    if (!data?.data || data.data.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Blog not found'
      })
    }

    return { data: data.data }
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('Strapi API error:', error?.message || error)
    throw createError({
      statusCode: error?.statusCode || 500,
      message: `Failed to fetch blog: ${error?.message || 'Unknown error'}`
    })
  }
})
