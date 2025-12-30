import CategoryPage from '@/components/CategoryPage'

interface CategoryPageRouteProps {
  params: Promise<{
    slug: string
    locale: 'en' | 'fr'
  }>
}

// Force dynamic rendering (no static generation during build)
export const dynamic = 'force-dynamic'

export default async function LocaleCategoryPage({ params }: CategoryPageRouteProps) {
  const { slug, locale } = await params
  return <CategoryPage slug={slug} locale={locale} />
}
