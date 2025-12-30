import CategoryPage from '@/components/CategoryPage'
import { getPayload } from 'payload'
import config from '@/payload.config'

interface CategoryPageRouteProps {
  params: Promise<{
    slug: string
    locale: 'en' | 'fr'
  }>
}

export default async function LocaleCategoryPage({ params }: CategoryPageRouteProps) {
  const { slug, locale } = await params
  return <CategoryPage slug={slug} locale={locale} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  return categories.map((category) => ({
    slug: category.slug,
  }))
}
