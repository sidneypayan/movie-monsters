import { getPayload, Where } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  if (!query || query.length < 3) {
    return NextResponse.json({ docs: [], totalDocs: 0 })
  }

  const payload = await getPayload({ config })

  const whereClause: Where = {
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
  }

  const [articleResults, dossierResults] = await Promise.all([
    payload.find({
      collection: 'articles',
      where: whereClause,
      locale: 'fr',
      limit: 20,
    }),
    payload.find({
      collection: 'dossiers',
      where: whereClause,
      locale: 'fr',
      limit: 20,
    }),
  ])

  const combinedDocs = [
    ...articleResults.docs.map((doc) => ({ ...doc, _collection: 'articles' as const })),
    ...dossierResults.docs.map((doc) => ({ ...doc, _collection: 'dossiers' as const })),
  ]

  return NextResponse.json({
    docs: combinedDocs,
    totalDocs: articleResults.totalDocs + dossierResults.totalDocs,
  })
}
