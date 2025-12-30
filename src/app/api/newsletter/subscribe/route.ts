import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, locale } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Check if email already exists
    const existing = await payload.find({
      collection: 'newsletter',
      where: {
        email: { equals: email },
      },
    })

    if (existing.docs.length > 0) {
      const subscriber = existing.docs[0]

      if (subscriber.status === 'unsubscribed') {
        // Resubscribe
        await payload.update({
          collection: 'newsletter',
          id: subscriber.id,
          data: {
            status: 'subscribed',
            locale,
          },
        })
        return NextResponse.json({ success: true, message: 'Resubscribed successfully' })
      }

      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    // Create new subscription
    await payload.create({
      collection: 'newsletter',
      data: {
        email,
        locale,
        status: 'subscribed',
      },
    })

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Subscription failed' },
      { status: 500 }
    )
  }
}
