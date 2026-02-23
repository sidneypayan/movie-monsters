import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import ShareButtons from '@/components/ShareButtons'
import PreviewBanner from '@/components/PreviewBanner'
import ArticleCard from '@/components/ArticleCard'
import type { Dossier } from '@/payload-types'

interface DossierPageProps {
  slug: string
  isPreview?: boolean
}

export default async function DossierPage({ slug, isPreview }: DossierPageProps) {
  const payload = await getPayload({ config })

  // Fetch the dossier — skip status filter in preview mode
  const where: Record<string, any> = { slug: { equals: slug } }
  if (!isPreview) {
    where.status = { equals: 'published' }
  }

  const { docs: dossiers } = await payload.find({
    collection: 'dossiers',
    where,
    locale: 'fr',
    limit: 1,
    draft: isPreview || undefined,
  })

  const dossier = dossiers[0]

  if (!dossier) {
    notFound()
  }

  const featuredImage = typeof dossier.featuredImage === 'object' && dossier.featuredImage !== null
    ? dossier.featuredImage
    : null

  const category = typeof dossier.category === 'object' && dossier.category !== null
    ? dossier.category
    : null

  const author = typeof dossier.author === 'object' && dossier.author !== null
    ? dossier.author
    : null

  // Fetch related dossiers from the same category
  const { docs: relatedDossiers } = await payload.find({
    collection: 'dossiers',
    where: {
      category: { equals: category?.id },
      status: { equals: 'published' },
      id: { not_equals: dossier.id },
    },
    locale: 'fr',
    limit: 3,
    sort: '-publishedDate',
  })

  return (
    <article className="bg-dark-bg min-h-screen">
      {isPreview && <PreviewBanner />}
      {/* Dossier Header */}
      <header className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="inline-block px-4 py-2 bg-accent-purple/20 backdrop-blur-sm text-accent-purple border border-accent-purple/30 rounded-full mb-6 hover:bg-accent-purple/30 transition-all duration-300 text-sm uppercase tracking-wider font-light"
            >
              {category.name}
            </Link>
          )}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-text-primary neo-gothic-title leading-tight">
            {dossier.title}
          </h1>
          {dossier.excerpt && (
            <p className="text-xl md:text-2xl text-text-secondary mb-8 font-light leading-relaxed">
              {dossier.excerpt}
            </p>
          )}
          <div className="flex items-center gap-6 text-text-muted text-sm uppercase tracking-wider font-light">
            {dossier.publishedDate && (
              <time>
                {new Date(dossier.publishedDate).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            {author && author.email && (
              <span>par {author.email}</span>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {featuredImage && featuredImage.url && (
        <div className="container mx-auto px-4 -mt-10 relative z-20 max-w-5xl mb-16">
          <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl border border-accent-purple/20 bg-dark-bg">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || dossier.title || ''}
              fill
              className="object-contain transition-all duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gothic-purple/20 via-transparent to-gothic-crimson/20 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Dossier Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
        <div className="prose prose-invert prose-xl max-w-none">
          <RichText
            content={dossier.content}
            gallery={{
              images: (dossier as any).galleryImages,
              columns: (dossier as any).galleryColumns,
            }}
          />
        </div>

        {/* Share Buttons */}
        <div className="mt-16 pt-8 border-t border-dark-border">
          <h3 className="text-xl font-light mb-6 text-text-primary uppercase tracking-wider">
            {'Partager ce dossier'.split(' ').map((word, i, arr) => {
              const isLastWord = i === arr.length - 1
              return (
                <span key={i} className={isLastWord ? 'text-accent-red' : ''}>
                  {word}{i < arr.length - 1 ? ' ' : ''}
                </span>
              )
            })}
          </h3>
          <ShareButtons
            url={`https://yoursite.com/dossiers/${dossier.slug}`}
            title={dossier.title || ''}
          />
        </div>
      </div>

      {/* Related Dossiers */}
      {relatedDossiers.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gothic-purple/10 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-16 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-light text-text-primary neo-gothic-title mb-6 text-center">
                Dossiers similaires
              </h2>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-accent-purple to-transparent mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedDossiers.map((relatedDossier) => (
                <ArticleCard
                  key={relatedDossier.id}
                  article={relatedDossier as Dossier}
                  routePrefix="dossiers"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
