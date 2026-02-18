import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const R2_PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL

async function cleanupOrphans() {
  const payload = await getPayload({ config })

  const { docs: allMedia } = await payload.find({
    collection: 'media',
    limit: 500,
    sort: 'createdAt',
  })

  console.log(`Checking ${allMedia.length} media documents...`)

  const orphans: { id: number; filename: string }[] = []

  for (const doc of allMedia) {
    const prefix = (doc as any).prefix || 'images'
    const imageUrl = `${R2_PUBLIC_URL}/${prefix}/${doc.filename}`

    try {
      const response = await fetch(imageUrl, { method: 'HEAD' })
      if (!response.ok) {
        orphans.push({ id: doc.id as number, filename: doc.filename! })
      }
    } catch {
      orphans.push({ id: doc.id as number, filename: doc.filename! })
    }
  }

  console.log(`\nFound ${orphans.length} orphan entries (file missing from R2):\n`)

  if (orphans.length === 0) {
    console.log('Nothing to clean up!')
    process.exit(0)
  }

  for (const orphan of orphans) {
    console.log(`  - [${orphan.id}] ${orphan.filename}`)
  }

  console.log(`\nDeleting ${orphans.length} orphan entries...`)

  let deleted = 0
  let errors = 0

  for (const orphan of orphans) {
    try {
      await payload.delete({
        collection: 'media',
        id: orphan.id,
      })
      console.log(`[DELETED] ${orphan.filename}`)
      deleted++
    } catch (err: any) {
      console.log(`[ERROR] ${orphan.filename}: ${err.message}`)
      errors++
    }
  }

  console.log(`\n--- Done ---`)
  console.log(`Deleted: ${deleted}`)
  console.log(`Errors: ${errors}`)

  process.exit(0)
}

cleanupOrphans()
