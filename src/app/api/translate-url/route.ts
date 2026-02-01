import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const currentPath = searchParams.get('path')
  const targetLocale = searchParams.get('locale') as 'en' | 'fr'

  if (!currentPath || !targetLocale) {
    return NextResponse.json({ url: `/${targetLocale}` })
  }

  // Check if this is an article page
  const articleMatch = currentPath.match(/^\/(?:en|fr)\/articles\/([^/]+)$/)

  if (articleMatch) {
    const currentSlug = articleMatch[1]
    const currentLocale = currentPath.startsWith('/fr') ? 'fr' : 'en'

    try {
      const payload = await getPayload({ config })

      // Find article by current slug
      const { docs: articles } = await payload.find({
        collection: 'articles',
        where: {
          slug: { equals: currentSlug },
        },
        locale: currentLocale,
        limit: 1,
      })

      if (articles.length > 0) {
        const articleId = articles[0].id

        // Get the same article in target locale
        const targetArticle = await payload.findByID({
          collection: 'articles',
          id: articleId,
          locale: targetLocale,
        })

        if (targetArticle && targetArticle.slug) {
          return NextResponse.json({
            url: `/${targetLocale}/articles/${targetArticle.slug}`,
          })
        }
      }
    } catch (error) {
      console.error('Error translating URL:', error)
    }
  }

  // Check if this is a category page
  const categoryMatch = currentPath.match(/^\/(?:en|fr)\/category\/([^/]+)$/)

  if (categoryMatch) {
    const currentSlug = categoryMatch[1]
    const currentLocale = currentPath.startsWith('/fr') ? 'fr' : 'en'

    try {
      const payload = await getPayload({ config })

      const { docs: categories } = await payload.find({
        collection: 'categories',
        where: {
          slug: { equals: currentSlug },
        },
        locale: currentLocale,
        limit: 1,
      })

      if (categories.length > 0) {
        const categoryId = categories[0].id

        const targetCategory = await payload.findByID({
          collection: 'categories',
          id: categoryId,
          locale: targetLocale,
        })

        if (targetCategory && targetCategory.slug) {
          return NextResponse.json({
            url: `/${targetLocale}/category/${targetCategory.slug}`,
          })
        }
      }
    } catch (error) {
      console.error('Error translating category URL:', error)
    }
  }

  // Default: just change the locale prefix
  const pathWithoutLocale = currentPath.replace(/^\/(en|fr)/, '')
  return NextResponse.json({
    url: `/${targetLocale}${pathWithoutLocale || ''}`,
  })
}
