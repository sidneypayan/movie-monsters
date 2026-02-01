import ArticlePage from '@/components/ArticlePage'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

interface ArticlePageRouteProps {
  params: Promise<{
    slug: string
    locale: 'en' | 'fr'
  }>
}

export default async function LocaleArticlePage({ params }: ArticlePageRouteProps) {
  const { slug, locale } = await params
  return <ArticlePage slug={slug} locale={locale} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const locales = ['en', 'fr'] as const
  const allParams: { slug: string; locale: string }[] = []

  // Generate params for each locale
  for (const locale of locales) {
    const { docs: articles } = await payload.find({
      collection: 'articles',
      where: {
        status: { equals: 'published' },
      },
      locale,
      limit: 1000,
    })

    articles.forEach((article) => {
      if (article.slug) {
        allParams.push({
          slug: article.slug,
          locale,
        })
      }
    })
  }

  return allParams
}
