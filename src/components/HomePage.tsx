import { getPayload } from 'payload'
import config from '@/payload.config'
import ArticleCard from '@/components/ArticleCard'
import NewsletterSignup from '@/components/NewsletterSignup'
import VisitorCounter from '@/components/VisitorCounter'
import type { Article } from '@/payload-types'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

interface HomePageProps {
  locale: 'en' | 'fr'
}

export default async function HomePage({ locale }: HomePageProps) {
  const t = await getTranslations('home')
  const payload = await getPayload({ config })

  // Get all published articles sorted by date
  const { docs: allArticles } = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
    },
    locale,
    limit: 12,
    sort: '-publishedDate',
  })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    locale,
    limit: 6,
    sort: 'order',
  })

  // Hero shows the latest published article (most recent)
  const latestArticle = allArticles[0]
  // Recent articles (including the one in hero)
  const recentArticles = allArticles.slice(0, 6)
  const latestArticleImage = latestArticle && typeof latestArticle.featuredImage === 'object' && latestArticle.featuredImage !== null
    ? latestArticle.featuredImage
    : null

  return (
    <div className="bg-dark-bg min-h-screen">
      {/* Hero - Organic flowing design */}
      <section className="relative z-10 bg-dark-bg min-h-[65vh] flex items-center justify-center pt-20 pb-10 overflow-hidden">
        {/* Intensified gradient blobs */}
        <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-gothic-purple/50 via-accent-purple/30 to-transparent blur-3xl" />
        <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-accent-red/40 via-gothic-crimson/20 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-red/20 blur-2xl" />

        {/* Additional atmospheric layers */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-accent-purple/20 to-transparent blur-3xl" />

        {/* Background video with cinema screen effect */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Video container */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 scale-125"
            style={{
              objectPosition: '50% 35%',
              filter: 'contrast(1.3) brightness(1.2)'
            }}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>

          {/* Vignette effect for cinema screen */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-10" />

          {/* Film grain overlay (subtle) */}
          <div className="absolute inset-0 opacity-[0.03] z-10 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]" />
        </div>

        {/* Gothic ornamental top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-red/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 border border-accent-red/20 rotate-45 blur-sm" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 text-text-primary neo-gothic-title leading-tight drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">
              {t('title').split(' ').map((word, i) => {
                const lowerWord = word.toLowerCase()
                const isMonster = lowerWord.includes('monster')
                const isMovie = lowerWord.includes('movie') || lowerWord.includes('film')

                return (
                  <span
                    key={i}
                    className={`inline-block transition-colors duration-500 ${
                      isMonster
                        ? 'text-accent-red'
                        : isMovie
                        ? ''
                        : 'hover:text-accent-red'
                    }`}
                  >
                    {word}{i === 0 ? <br/> : ' '}
                  </span>
                )
              })}
            </h1>

            <p className="text-lg md:text-xl text-text-secondary font-light max-w-2xl mx-auto mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
              {t('subtitle')}
            </p>

            <div className="flex justify-center mb-8">
              <VisitorCounter locale={locale} />
            </div>

            {latestArticle && latestArticleImage?.url && (
              <div className="relative max-w-2xl mx-auto">
                <a href={`/${locale}/articles/${latestArticle.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-accent-red/20 bg-dark-bg">
                    <Image
                      src={latestArticleImage.url}
                      alt={latestArticleImage.alt || latestArticle.title || ''}
                      fill
                      className="object-contain transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-accent-red/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <span className="inline-block px-3 py-1 rounded-full bg-accent-red/20 backdrop-blur-sm text-accent-red border border-accent-red/30 text-xs uppercase tracking-wider mb-2">
                        {t('latest')}
                      </span>
                      <h2 className="text-xl md:text-2xl font-light text-white mb-2 uppercase tracking-wide">
                        {latestArticle.title}
                      </h2>
                      {latestArticle.excerpt && (
                        <p className="text-xs md:text-sm text-text-secondary font-light line-clamp-2">
                          {latestArticle.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories - Flowing carousel */}
      {categories.length > 0 && (
        <section className="py-20 relative z-10 px-4">
          <div className="container mx-auto px-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-text-primary neo-gothic-title text-center drop-shadow-[0_0_20px_rgba(220,38,38,0.2)] oozing-divider">
              {t('categories')}
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 py-4 scrollbar-hide justify-center">
            {categories.map((category) => {
              const featuredImage = typeof category.featuredImage === 'object' && category.featuredImage !== null
                ? category.featuredImage
                : null

              return (
                <a
                  key={category.id}
                  href={`/${locale}/category/${category.slug}`}
                  className="group relative flex-shrink-0 w-72 h-96 overflow-hidden rounded-3xl hover:scale-105 transition-transform duration-500 border border-accent-red/20 hover:border-accent-red/50 shadow-[0_0_30px_rgba(220,38,38,0.1)] hover:shadow-[0_0_50px_rgba(220,38,38,0.3)]"
                >
                  {featuredImage?.url ? (
                    <>
                      <img
                        src={featuredImage.url}
                        alt={featuredImage.alt || category.name || ''}
                        className="w-full h-full object-cover transition-all duration-700 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-gothic-purple/50 to-transparent" />
                      <h3 className="absolute bottom-8 left-8 right-8 font-light text-lg uppercase tracking-wider text-white">
                        {category.name}
                      </h3>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-gothic-purple to-gothic-crimson">
                      <h3 className="font-light text-lg uppercase tracking-wider text-text-primary text-center">
                        {category.name}
                      </h3>
                    </div>
                  )}
                </a>
              )
            })}
          </div>
        </section>
      )}

      {/* Articles - Staggered flowing layout */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-light text-text-primary neo-gothic-title mb-6 text-center drop-shadow-[0_0_25px_rgba(220,38,38,0.25)] oozing-divider">
              {t('articles')}
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {allArticles.slice(1, 7).map((article, index) => {
              const featuredImage = typeof article.featuredImage === 'object' && article.featuredImage !== null
                ? article.featuredImage
                : null

              const isEven = index % 2 === 0

              return (
                <a
                  key={article.id}
                  href={`/${locale}/articles/${article.slug}`}
                  className={`group flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center hover:scale-[1.02] transition-all duration-500 p-4 rounded-2xl border border-transparent hover:border-accent-red/30 hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]`}
                  style={{
                    marginLeft: isEven ? '0' : 'auto',
                    marginRight: isEven ? 'auto' : '0',
                    maxWidth: index % 3 === 0 ? '100%' : '85%',
                  }}
                >
                  {featuredImage?.url && (
                    <div className="relative w-full md:w-2/5 h-80 rounded-2xl bg-dark-bg flex items-center justify-center">
                      <Image
                        src={featuredImage.url}
                        alt={featuredImage.alt || article.title || ''}
                        width={featuredImage.width || 800}
                        height={featuredImage.height || 600}
                        className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-700 rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-gothic-purple/30 via-transparent to-gothic-crimson/30 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  )}
                  <div className="w-full md:w-3/5 space-y-3 p-4">
                    <h3 className="text-xl md:text-2xl font-light text-text-primary group-hover:text-white transition-colors uppercase tracking-wide">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-text-secondary font-light leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    {article.publishedDate && (
                      <time className="block text-xs text-text-muted uppercase tracking-wider">
                        {new Date(article.publishedDate).toLocaleDateString(locale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    )}
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent - Flowing grid */}
      {recentArticles.length > 0 && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-16 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-light text-text-primary neo-gothic-title text-center drop-shadow-[0_0_25px_rgba(220,38,38,0.25)] oozing-divider">
                {t('recent').split(' ').map((word, i, arr) => {
                  const isLastWord = i === arr.length - 1
                  return (
                    <span key={i} className={isLastWord ? 'text-accent-red' : ''}>
                      {word}{i < arr.length - 1 ? ' ' : ''}
                    </span>
                  )
                })}
              </h2>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article as Article}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter - Organic centered */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-light text-text-primary neo-gothic-title mb-8 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)] oozing-divider">
            {t('newsletter').split(' ').map((word, i, arr) => {
              const isLastWord = i === arr.length - 1
              return (
                <span key={i} className={isLastWord ? 'text-accent-red' : ''}>
                  {word}{i < arr.length - 1 ? ' ' : ''}
                </span>
              )
            })}
          </h2>

          <p className="text-xl text-text-secondary font-light mb-12 leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            {t('newsletterDescription')}
          </p>
          <NewsletterSignup locale={locale} />
        </div>
      </section>
    </div>
  )
}
