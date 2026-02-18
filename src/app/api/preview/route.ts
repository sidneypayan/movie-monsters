import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')
  const collection = searchParams.get('collection')
  const slug = searchParams.get('slug')
  const locale = searchParams.get('locale') || 'fr'

  // Validate secret
  if (secret !== process.env.PAYLOAD_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  if (!collection || !slug) {
    return new Response('Missing collection or slug', { status: 400 })
  }

  if (collection !== 'articles' && collection !== 'dossiers') {
    return new Response('Invalid collection', { status: 400 })
  }

  // Verify the document exists
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    locale: locale as 'en' | 'fr',
    limit: 1,
    draft: true,
  })

  if (!docs.length) {
    return new Response('Document not found', { status: 404 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the page
  redirect(`/${locale}/${collection}/${slug}`)
}
