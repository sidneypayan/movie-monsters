import { getPayload } from 'payload'
import config from '@/payload.config'
import ArticleCard from '@/components/ArticleCard'
import type { Dossier } from '@/payload-types'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

export default async function FrontendDossiersPage() {
  const payload = await getPayload({ config })

  const { docs: dossiers } = await payload.find({
    collection: 'dossiers',
    where: {
      status: { equals: 'published' },
    },
    locale: 'fr',
    limit: 50,
    sort: '-publishedDate',
  })

  return (
    <div className="bg-dark-bg min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light text-text-primary neo-gothic-title mb-6 text-center drop-shadow-[0_0_25px_rgba(220,38,38,0.25)] oozing-divider">
            Dossiers
          </h1>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dossiers.map((dossier) => (
            <ArticleCard
              key={dossier.id}
              article={dossier as Dossier}
              routePrefix="dossiers"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
