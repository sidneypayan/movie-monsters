import DossierPage from '@/components/DossierPage'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { draftMode } from 'next/headers'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

interface DossierPageRouteProps {
  params: Promise<{
    slug: string
    locale: 'en' | 'fr'
  }>
}

export default async function LocaleDossierPage({ params }: DossierPageRouteProps) {
  const { slug, locale } = await params
  const { isEnabled: isPreview } = await draftMode()
  return <DossierPage slug={slug} locale={locale} isPreview={isPreview} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const locales = ['en', 'fr'] as const
  const allParams: { slug: string; locale: string }[] = []

  // Generate params for each locale
  for (const locale of locales) {
    const { docs: dossiers } = await payload.find({
      collection: 'dossiers',
      where: {
        status: { equals: 'published' },
      },
      locale,
      limit: 1000,
    })

    dossiers.forEach((dossier) => {
      if (dossier.slug) {
        allParams.push({
          slug: dossier.slug,
          locale,
        })
      }
    })
  }

  return allParams
}
