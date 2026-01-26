import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Get current stats
    const stats = await payload.findGlobal({
      slug: 'site-stats',
    })

    return NextResponse.json({
      totalVisits: stats.totalVisits || 0,
    })
  } catch (error) {
    console.error('Error fetching visitor count:', error)
    return NextResponse.json({ totalVisits: 0 }, { status: 200 })
  }
}

export async function POST() {
  try {
    const payload = await getPayload({ config })

    // Get current stats
    const stats = await payload.findGlobal({
      slug: 'site-stats',
    })

    const currentCount = stats.totalVisits || 0

    // Increment the counter
    await payload.updateGlobal({
      slug: 'site-stats',
      data: {
        totalVisits: currentCount + 1,
        lastVisit: new Date().toISOString(),
      },
    })

    return NextResponse.json({
      totalVisits: currentCount + 1,
    })
  } catch (error) {
    console.error('Error incrementing visitor count:', error)
    return NextResponse.json(
      { error: 'Failed to increment visitor count' },
      { status: 500 }
    )
  }
}
