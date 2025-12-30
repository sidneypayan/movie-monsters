import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const localeParam = searchParams.get('locale') || 'fr'
  const locale = (localeParam === 'en' || localeParam === 'fr') ? localeParam : 'fr' as 'en' | 'fr'

  const payload = await getPayload({ config })

  const categories = await payload.find({
    collection: 'categories',
    locale,
    sort: 'order',
    limit: 100,
  })

  return NextResponse.json(categories)
}
