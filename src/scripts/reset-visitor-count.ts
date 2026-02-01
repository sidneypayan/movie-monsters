import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../../.env')
dotenv.config({ path: envPath })

console.log('📁 Loading .env from:', envPath)
console.log('🔑 PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✅ Loaded' : '❌ Missing')
console.log('🗄️  DATABASE_URL:', process.env.DATABASE_URL ? '✅ Loaded' : '❌ Missing')

// Import AFTER loading env
import { getPayload } from 'payload'
import config from '../payload.config'

async function resetVisitorCount() {
  try {
    const payload = await getPayload({ config })

    console.log('🔄 Resetting visitor counter...')

    // Update the site-stats global to reset totalVisits to 0
    await payload.updateGlobal({
      slug: 'site-stats',
      data: {
        totalVisits: 0,
        lastVisit: new Date().toISOString(),
      },
    })

    console.log('✅ Visitor counter has been reset to 0')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error resetting visitor counter:', error)
    process.exit(1)
  }
}

resetVisitorCount()
