import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/payload-types'

interface ArticleCardProps {
  article: Article
  locale?: string
}

export default function ArticleCard({ article, locale = 'fr' }: ArticleCardProps) {
  const featuredImage = typeof article.featuredImage === 'object' && article.featuredImage !== null
    ? article.featuredImage
    : null

  const category = typeof article.category === 'object' && article.category !== null
    ? article.category
    : null

  return (
    <Link
      href={`/${locale}/articles/${article.slug}`}
      className="group block bg-dark-elevated border border-dark-border hover:border-accent-red transition-all duration-300 overflow-hidden"
    >
      {featuredImage && featuredImage.url && (
        <div className="aspect-[16/10] relative overflow-hidden bg-dark-surface">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || article.title || ''}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        {category && (
          <span className="inline-block text-xs uppercase tracking-wider text-accent-red mb-3 font-light">
            {category.name}
          </span>
        )}

        <h3 className="text-xl font-light mb-3 text-text-primary group-hover:text-white transition-colors uppercase tracking-wide">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="text-sm text-text-secondary mb-4 line-clamp-2 font-light">
            {article.excerpt}
          </p>
        )}

        {article.publishedDate && (
          <time className="text-xs text-text-muted uppercase tracking-wider font-light">
            {new Date(article.publishedDate).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        )}
      </div>
    </Link>
  )
}
