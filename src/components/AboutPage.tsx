import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import RichText from '@/components/RichText'

export default async function AboutPage() {
  const payload = await getPayload({ config })

  const biography = await payload.findGlobal({
    slug: 'biography',
    locale: 'fr',
  })

  const authorPhoto = typeof biography.authorPhoto === 'object' && biography.authorPhoto !== null
    ? biography.authorPhoto
    : null

  const platformIcons: Record<string, string> = {
    twitter: '\uD835\uDD4F',
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
        {/* Hero Image Section */}
        {authorPhoto && authorPhoto.url && (
          <div className="max-w-6xl mx-auto mb-16">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-accent-purple/30 shadow-2xl bg-dark-bg">
              <Image
                src={authorPhoto.url}
                alt={biography.authorName || 'Author'}
                fill
                className="object-contain transition-all duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <h1 className="text-5xl md:text-7xl font-light text-white neo-gothic-title mb-4 drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]">
                  {biography.authorName}
                </h1>
                <p className="text-xl md:text-2xl text-text-secondary font-light max-w-2xl drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]">
                  {"D\u00E9couvrez l\u2019univers de Movie Monsters"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Author Bio Section */}
          <div className="bg-dark-elevated/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gothic-purple-light relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gothic-purple/10 via-transparent to-gothic-crimson/10" />

            <div className="relative z-10">
              <div className="prose prose-invert prose-lg max-w-none mb-8">
                <RichText content={biography.bio} />
              </div>

              {/* Social Links */}
              {biography.socialLinks && biography.socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-6 border-t border-dark-border">
                  {biography.socialLinks.map((link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-dark-bg border border-accent-purple/30 text-text-primary rounded-full hover:border-accent-purple hover:bg-accent-purple/10 transition-all duration-300 text-sm uppercase tracking-wider font-light"
                    >
                      <span className="mr-2">{platformIcons[link.platform] || '\u2192'}</span>
                      <span>{link.platform}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* About the Site */}
          <div className="bg-dark-surface rounded-3xl p-8 md:p-12 relative overflow-hidden border border-gothic-crimson-light">
            <div className="absolute inset-0 bg-gradient-to-br from-gothic-crimson/10 via-transparent to-gothic-purple/10" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-text-primary text-center neo-gothic-title">
                Movie Monsters
              </h2>

              <div className="space-y-6 text-base md:text-lg leading-relaxed text-text-secondary font-light">
                <p>
                  {"Bienvenue sur Movie Monsters, votre destination pour explorer l\u2019\u00E2ge d\u2019or du cin\u00E9ma d\u2019horreur et fantastique."}
                </p>

                <p>
                  {"Nous c\u00E9l\u00E9brons les films classiques qui ont d\u00E9fini le genre, des monstres Universal aux chefs-d\u2019\u0153uvre de la Hammer."}
                </p>

                <div className="border-l-2 border-accent-red pl-6 py-4 my-8 italic bg-accent-purple/5 rounded-r-xl">
                  <p className="text-text-primary font-light">
                    {"Le cin\u00E9ma fantastique nous rappelle que la magie existe encore"}
                  </p>
                </div>

                <p>
                  {"Rejoignez-nous dans ce voyage \u00E0 travers l\u2019histoire du cin\u00E9ma fantastique."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
