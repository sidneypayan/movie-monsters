import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import ShareButtons from '@/components/ShareButtons'
import ArticleCard from '@/components/ArticleCard'
import type { Article } from '@/payload-types'
import { getTranslations } from 'next-intl/server'

interface ArticlePageProps {
  slug: string
  locale: 'en' | 'fr'
}

export default async function ArticlePage({ slug, locale }: ArticlePageProps) {
  const t = await getTranslations('article')
  const payload = await getPayload({ config })

  // Fetch the article
  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    locale,
    limit: 1,
  })

  const article = articles[0]

  if (!article) {
    notFound()
  }

  const featuredImage = typeof article.featuredImage === 'object' && article.featuredImage !== null
    ? article.featuredImage
    : null

  const category = typeof article.category === 'object' && article.category !== null
    ? article.category
    : null

  const author = typeof article.author === 'object' && article.author !== null
    ? article.author
    : null

  // Fetch related articles from the same category
  const { docs: relatedArticles } = await payload.find({
    collection: 'articles',
    where: {
      category: { equals: category?.id },
      status: { equals: 'published' },
      id: { not_equals: article.id },
    },
    locale,
    limit: 3,
    sort: '-publishedDate',
  })

  return (
    <article className="bg-dark-bg min-h-screen">
      {/* Article Header */}
      <header className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          {category && (
            <Link
              href={`/${locale}/category/${category.slug}`}
              className="inline-block px-4 py-2 bg-accent-purple/20 backdrop-blur-sm text-accent-purple border border-accent-purple/30 rounded-full mb-6 hover:bg-accent-purple/30 transition-all duration-300 text-sm uppercase tracking-wider font-light"
            >
              {category.name}
            </Link>
          )}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-text-primary neo-gothic-title leading-tight">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="text-xl md:text-2xl text-text-secondary mb-8 font-light leading-relaxed">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-6 text-text-muted text-sm uppercase tracking-wider font-light">
            {article.publishedDate && (
              <time>
                {new Date(article.publishedDate).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            {author && author.email && (
              <span>{t('by')} {author.email}</span>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {featuredImage && featuredImage.url && (
        <div className="container mx-auto px-4 -mt-10 relative z-20 max-w-5xl mb-16">
          <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl border border-accent-purple/20">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || article.title || ''}
              fill
              className="object-cover transition-all duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gothic-purple/20 via-transparent to-gothic-crimson/20" />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
        <div className="prose prose-invert prose-xl max-w-none">
          <RichText content={article.content} />
        </div>

        {/* Share Buttons */}
        <div className="mt-16 pt-8 border-t border-dark-border">
          <h3 className="text-xl font-light mb-6 text-text-primary uppercase tracking-wider">
            {t('shareArticle').split(' ').map((word, i, arr) => {
              const isLastWord = i === arr.length - 1
              return (
                <span key={i} className={isLastWord ? 'text-accent-red' : ''}>
                  {word}{i < arr.length - 1 ? ' ' : ''}
                </span>
              )
            })}
          </h3>
          <ShareButtons
            url={`https://yoursite.com/${locale}/articles/${article.slug}`}
            title={article.title || ''}
          />
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gothic-purple/10 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-16 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-light text-text-primary neo-gothic-title mb-6 text-center">
                {t('similarArticles')}
              </h2>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-accent-purple to-transparent mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard
                  key={relatedArticle.id}
                  article={relatedArticle as Article}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
