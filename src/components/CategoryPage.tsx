import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import type { Article } from '@/payload-types'
import Image from 'next/image'

interface CategoryPageProps {
  slug: string
}

export default async function CategoryPage({ slug }: CategoryPageProps) {
  const payload = await getPayload({ config })

  // Fetch the category
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: slug },
    },
    locale: 'fr',
    limit: 1,
  })

  const category = categories[0]

  if (!category) {
    notFound()
  }

  // Fetch articles in this category
  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      category: { equals: category.id },
      status: { equals: 'published' },
    },
    locale: 'fr',
    sort: '-publishedDate',
    limit: 50,
  })

  const featuredImage = typeof category.featuredImage === 'object' && category.featuredImage !== null
    ? category.featuredImage
    : null

  const articleCountText = articles.length === 0
    ? '0 article(s)'
    : articles.length === 1
    ? '1 article(s)'
    : `${articles.length} article(s)`

  return (
    <div className="bg-dark-bg min-h-screen">
      {/* Organic gradient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gothic-purple/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-tl from-gothic-crimson/15 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-2xl" />
      </div>

      {/* Category Hero */}
      <section className="relative pt-32 pb-20">
        {featuredImage && featuredImage.url && (
          <>
            <div className="absolute inset-0 z-0">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || category.name || ''}
                fill
                className="object-cover opacity-20 grayscale"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/60 via-dark-bg/80 to-dark-bg z-0" />
          </>
        )}
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-text-primary neo-gothic-title leading-tight">
            {category.name}
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-accent-purple to-transparent mx-auto rounded-full mb-8" />
          {category.description && (
            <p className="text-xl text-text-secondary max-w-3xl mx-auto font-light leading-relaxed mb-6">
              {category.description}
            </p>
          )}
          <div className="text-text-muted text-sm uppercase tracking-wider font-light">
            {articleCountText}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gothic-purple/10 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {articles.map((article, index) => (
                <div
                  key={article.id}
                  style={{
                    marginTop: index % 3 === 1 ? '4rem' : '0',
                  }}
                >
                  <ArticleCard article={article as Article} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 max-w-2xl mx-auto">
              <div className="bg-dark-elevated/50 backdrop-blur-sm rounded-3xl p-12 border border-gothic-purple-light">
                <p className="text-xl text-text-secondary font-light">
                  {"Aucun article dans cette cat\u00E9gorie pour le moment."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
