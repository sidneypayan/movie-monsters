import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Book } from '@/payload-types'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

interface BooksPageProps {
  locale: 'en' | 'fr'
}

export default async function BooksPage({ locale }: BooksPageProps) {
  const t = await getTranslations('books')
  const payload = await getPayload({ config })

  const { docs: books } = await payload.find({
    collection: 'books',
    locale,
    sort: 'order',
    limit: 100,
  })

  return (
    <div className="bg-dark-bg min-h-screen pt-32 pb-20">
      {/* Organic gradient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gothic-purple/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-tl from-gothic-crimson/15 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-2xl" />
      </div>

      {/* Hero Section */}
      <section className="relative mb-20">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-6xl md:text-7xl font-light text-text-primary neo-gothic-title text-center drop-shadow-[0_0_30px_rgba(220,38,38,0.3)] oozing-divider">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Books Grid */}
      <section className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => {
            const coverImage = typeof book.coverImage === 'object' && book.coverImage !== null
              ? book.coverImage
              : null

            return (
              <div
                key={book.id}
                className="group bg-dark-elevated border border-dark-border hover:border-accent-red transition-all duration-500 overflow-hidden rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]"
              >
                {/* Cover Image */}
                {coverImage?.url && (
                  <div className="relative aspect-[3/4] overflow-hidden bg-dark-surface">
                    <Image
                      src={coverImage.url}
                      alt={coverImage.alt || book.title || ''}
                      fill
                      className="object-cover transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  </div>
                )}

                {/* Book Info */}
                <div className="p-6">
                  <h2 className="text-2xl font-light text-text-primary mb-3 uppercase tracking-wide group-hover:text-white transition-colors">
                    {book.title}
                  </h2>

                  <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                    {book.description}
                  </p>

                  {book.publicationDate && (
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-4">
                      {new Date(book.publicationDate).getFullYear()}
                    </p>
                  )}

                  {/* Purchase Links */}
                  {book.purchaseLinks && book.purchaseLinks.length > 0 && (
                    <div className="space-y-2">
                      {book.purchaseLinks.map((link, index) => {
                        const platformLabels: Record<string, string> = {
                          amazon: t('platforms.amazon'),
                          fnac: t('platforms.fnac'),
                          cultura: t('platforms.cultura'),
                        }

                        const label = link.platform === 'other'
                          ? link.customLabel || 'Buy'
                          : platformLabels[link.platform as keyof typeof platformLabels] || link.platform

                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-2 px-4 text-center text-sm uppercase tracking-wider bg-accent-red/20 border border-accent-red/30 text-accent-red hover:bg-accent-red hover:text-white transition-all duration-300"
                          >
                            {label}
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {books.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">
              {locale === 'fr' ? 'Aucun livre disponible' : 'No books available'}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
