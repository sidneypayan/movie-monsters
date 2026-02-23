import DossierPage from '@/components/DossierPage'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { draftMode } from 'next/headers'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

interface DossierPageRouteProps {
  params: Promise<{
    slug: string
  }>
}

export default async function FrontendDossierPage({ params }: DossierPageRouteProps) {
  const { slug } = await params
  const { isEnabled: isPreview } = await draftMode()
  return <DossierPage slug={slug} isPreview={isPreview} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs: dossiers } = await payload.find({
    collection: 'dossiers',
    where: {
      status: { equals: 'published' },
    },
    locale: 'fr',
    limit: 1000,
  })

  return dossiers
    .filter((dossier) => dossier.slug)
    .map((dossier) => ({
      slug: dossier.slug,
    }))
}
