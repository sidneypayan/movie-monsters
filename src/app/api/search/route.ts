import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const localeParam = searchParams.get('locale') || 'fr'
  const locale = (localeParam === 'en' || localeParam === 'fr') ? localeParam : 'fr' as 'en' | 'fr'

  if (!query || query.length < 3) {
    return NextResponse.json({ docs: [], totalDocs: 0 })
  }

  const payload = await getPayload({ config })

  const results = await payload.find({
    collection: 'articles',
    where: {
      and: [
        {
          status: { equals: 'published' },
        },
        {
          or: [
            {
              title: {
                contains: query,
              },
            },
            {
              excerpt: {
                contains: query,
              },
            },
          ],
        },
      ],
    },
    locale,
    limit: 20,
  })

  return NextResponse.json(results)
}
