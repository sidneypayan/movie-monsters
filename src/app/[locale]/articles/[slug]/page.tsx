import ArticlePage from '@/components/ArticlePage'

interface ArticlePageRouteProps {
  params: Promise<{
    slug: string
    locale: 'en' | 'fr'
  }>
}

// Force dynamic rendering (no static generation during build)
export const dynamic = 'force-dynamic'

export default async function LocaleArticlePage({ params }: ArticlePageRouteProps) {
  const { slug, locale } = await params
  return <ArticlePage slug={slug} locale={locale} />
}
