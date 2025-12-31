import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { getTranslations } from 'next-intl/server'

interface AboutPageProps {
  locale: 'en' | 'fr'
}

export default async function AboutPage({ locale }: AboutPageProps) {
  const t = await getTranslations('about')
  const payload = await getPayload({ config })

  const biography = await payload.findGlobal({
    slug: 'biography',
    locale,
  })

  const authorPhoto = typeof biography.authorPhoto === 'object' && biography.authorPhoto !== null
    ? biography.authorPhoto
    : null

  const platformIcons: Record<string, string> = {
    twitter: '𝕏',
    facebook: 'F',
    instagram: 'IG',
    linkedin: 'in',
    website: 'Web',
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-32 pb-20">
      {/* Organic gradient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gothic-purple/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-tl from-gothic-crimson/15 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-light text-text-primary neo-gothic-title oozing-divider">
            {t('title')}
          </h1>
          <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Author Section */}
          <div className="bg-dark-elevated/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gothic-purple-light relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gothic-purple/10 via-transparent to-gothic-crimson/10" />

            <div className="grid md:grid-cols-3 gap-8 items-start relative z-10">
              {/* Author Photo */}
              {authorPhoto && authorPhoto.url && (
                <div className="md:col-span-1">
                  <div className="relative aspect-square rounded-3xl overflow-hidden border border-accent-purple/30">
                    <Image
                      src={authorPhoto.url}
                      alt={biography.authorName || 'Author'}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-gothic-purple/20 via-transparent to-gothic-crimson/20" />
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="md:col-span-2">
                <h2 className="text-3xl md:text-4xl font-light mb-6 text-text-primary uppercase tracking-wide">
                  {biography.authorName}
                </h2>

                <div className="prose prose-invert max-w-none mb-6">
                  <RichText content={biography.bio} />
                </div>

                {/* Social Links */}
                {biography.socialLinks && biography.socialLinks.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {biography.socialLinks.map((link: any, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-dark-bg border border-accent-purple/30 text-text-primary rounded-full hover:border-accent-purple hover:bg-accent-purple/10 transition-all duration-300 text-sm uppercase tracking-wider font-light"
                      >
                        <span className="mr-2">{platformIcons[link.platform] || '→'}</span>
                        <span>{link.platform}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* About the Site */}
          <div className="bg-dark-surface rounded-3xl p-8 md:p-12 relative overflow-hidden border border-gothic-crimson-light">
            <div className="absolute inset-0 bg-gradient-to-br from-gothic-crimson/10 via-transparent to-gothic-purple/10" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-text-primary text-center neo-gothic-title">
                {t('siteTitle')}
              </h2>

              <div className="space-y-6 text-base md:text-lg leading-relaxed text-text-secondary font-light">
                <p>
                  {t('siteDescription1')}
                </p>

                <p>
                  {t('siteDescription2')}
                </p>

                <div className="border-l-2 border-accent-red pl-6 py-4 my-8 italic bg-accent-purple/5 rounded-r-xl">
                  <p className="text-text-primary font-light">
                    {t('siteQuote')}
                  </p>
                </div>

                <p>
                  {t('siteDescription3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
