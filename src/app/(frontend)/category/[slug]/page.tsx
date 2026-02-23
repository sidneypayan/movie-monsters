import CategoryPage from '@/components/CategoryPage'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

interface CategoryPageRouteProps {
  params: Promise<{
    slug: string
  }>
}

export default async function FrontendCategoryPage({ params }: CategoryPageRouteProps) {
  const { slug } = await params
  return <CategoryPage slug={slug} />
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
