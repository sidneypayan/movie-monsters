import ArticlePage from '@/components/ArticlePage'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { draftMode } from 'next/headers'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

interface ArticlePageRouteProps {
  params: Promise<{
    slug: string
  }>
}

export default async function FrontendArticlePage({ params }: ArticlePageRouteProps) {
  const { slug } = await params
  const { isEnabled: isPreview } = await draftMode()
  return <ArticlePage slug={slug} isPreview={isPreview} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
    },
    locale: 'fr',
    limit: 1000,
  })

  return articles
    .filter((article) => article.slug)
    .map((article) => ({
      slug: article.slug,
    }))
}
