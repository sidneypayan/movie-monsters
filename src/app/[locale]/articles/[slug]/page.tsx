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

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
    },
    limit: 1000,
  })

  return articles.map((article) => ({
    slug: article.slug,
  }))
}
