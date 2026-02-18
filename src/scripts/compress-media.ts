import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import sharp from 'sharp'

const R2_PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL

async function compressAllMedia() {
  const payload = await getPayload({ config })

  const { docs: allMedia } = await payload.find({
    collection: 'media',
    limit: 500,
    sort: 'createdAt',
  })

  console.log(`Found ${allMedia.length} media documents to process`)

  let processed = 0
  let skipped = 0
  let errors = 0

  for (const doc of allMedia) {
    try {
      // Skip if already WebP
      if (doc.mimeType === 'image/webp') {
        console.log(`[SKIP] ${doc.filename} - already WebP`)
        skipped++
        continue
      }

      // Skip non-image files
      if (!doc.mimeType?.startsWith('image/')) {
        console.log(`[SKIP] ${doc.filename} - not an image`)
        skipped++
        continue
      }

      // Build the URL to download the original
      const prefix = (doc as any).prefix || 'images'
      const imageUrl = `${R2_PUBLIC_URL}/${prefix}/${doc.filename}`

      console.log(`[PROCESSING] ${doc.filename} (${doc.filesize ? Math.round(doc.filesize / 1024) : '?'}KB)...`)

      // Download the original image
      const response = await fetch(imageUrl)
      if (!response.ok) {
        console.log(`[ERROR] Failed to download ${imageUrl}: ${response.status}`)
        errors++
        continue
      }

      const originalBuffer = Buffer.from(await response.arrayBuffer())
      const originalSize = originalBuffer.length

      // Compress with Sharp: convert to WebP, resize if too large
      const processedBuffer = await sharp(originalBuffer)
        .resize({
          width: 2560,
          height: 2560,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toBuffer()

      const newSize = processedBuffer.length
      const savings = Math.round((1 - newSize / originalSize) * 100)

      // Generate new filename with .webp extension
      const newFilename = doc.filename!.replace(/\.[^.]+$/, '.webp')

      // Re-upload via Payload API (triggers size regeneration + R2 upload)
      await payload.update({
        collection: 'media',
        id: doc.id,
        file: {
          data: processedBuffer,
          mimetype: 'image/webp',
          name: newFilename,
          size: processedBuffer.length,
        },
      })

      console.log(
        `[OK] ${doc.filename} → ${newFilename} | ${Math.round(originalSize / 1024)}KB → ${Math.round(newSize / 1024)}KB (${savings}% saved)`,
      )
      processed++
    } catch (err: any) {
      console.log(`[ERROR] ${doc.filename}: ${err.message}`)
      errors++
    }
  }

  console.log(`\n--- Done ---`)
  console.log(`Processed: ${processed}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Errors: ${errors}`)

  process.exit(0)
}

compressAllMedia()
