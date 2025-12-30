import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables FIRST
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../../.env')
dotenv.config({ path: envPath })

// Debug: Check if env vars are loaded
console.log('📁 Loading .env from:', envPath)
console.log('🔑 PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✅ Loaded' : '❌ Missing')
console.log('🗄️  DATABASE_URL:', process.env.DATABASE_URL ? '✅ Loaded' : '❌ Missing')

// Import AFTER loading env
import { getPayload } from 'payload'
import config from '../payload.config'
import https from 'https'
import fs from 'fs'

// Helper function to download image
async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        const fileStream = fs.createWriteStream(filepath)
        response.pipe(fileStream)
        fileStream.on('finish', () => {
          fileStream.close()
          resolve()
        })
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {}) // Delete the file if download fails
        reject(err)
      })
  })
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding categories...')

  const categoryData = [
    { name: { en: 'Universal Films', fr: 'Films Universal' }, slug: { en: 'universal-films', fr: 'films-universal' }, order: 1 },
    { name: { en: 'Hammer Films', fr: 'Films Hammer' }, slug: { en: 'hammer-films', fr: 'films-hammer' }, order: 2 },
    { name: { en: 'British Cinema', fr: 'Cinéma Britannique' }, slug: { en: 'british-cinema', fr: 'cinema-britannique' }, order: 3 },
    { name: { en: 'American Cinema', fr: 'Cinéma Américain' }, slug: { en: 'american-cinema', fr: 'cinema-americain' }, order: 4 },
    { name: { en: 'Italian Cinema', fr: 'Cinéma Italien' }, slug: { en: 'italian-cinema', fr: 'cinema-italien' }, order: 5 },
    { name: { en: 'Spanish-Mexican Cinema', fr: 'Cinéma Hispano-Mexicain' }, slug: { en: 'spanish-mexican-cinema', fr: 'cinema-hispano-mexicain' }, order: 6 },
  ]

  for (const cat of categoryData) {
    try {
      // Check if category already exists
      const { docs: existing } = await payload.find({
        collection: 'categories',
        where: {
          slug: { equals: cat.slug.fr },
        },
        locale: 'fr',
        limit: 1,
      })

      if (existing.length > 0) {
        console.log(`⏭️  Category "${cat.name.fr}" already exists, skipping...`)
        continue
      }

      // Create in French first
      const created = await payload.create({
        collection: 'categories',
        data: {
          name: cat.name.fr,
          slug: cat.slug.fr,
          order: cat.order,
          description: `Articles sur ${cat.name.fr.toLowerCase()}`,
        },
        locale: 'fr',
      })

      // Update English translation
      await payload.update({
        collection: 'categories',
        id: created.id,
        data: {
          name: cat.name.en,
          slug: cat.slug.en,
          description: `Articles about ${cat.name.en.toLowerCase()}`,
        },
        locale: 'en',
      })

      console.log(`✅ Created category: ${cat.name.fr} / ${cat.name.en}`)
    } catch (error) {
      console.error(`❌ Error creating category ${cat.name.fr}:`, error)
    }
  }

  // Get or create a user for authoring articles
  console.log('👤 Checking for users...')
  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1,
  })

  let authorId: number | string
  if (users.length === 0) {
    console.log('👤 Creating test user...')
    const user = await payload.create({
      collection: 'users',
      data: {
        name: 'Test Author',
        email: 'author@test.com',
        password: 'password123',
        roles: ['admin'] as any,
      },
      draft: false,
    })
    authorId = user.id
    console.log('✅ Created test user: author@test.com')
  } else {
    authorId = users[0].id
    console.log(`✅ Using existing user: ${users[0].email}`)
  }

  // Get a category for the article
  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 1,
    locale: 'fr',
  })

  if (categories.length === 0) {
    console.log('❌ No categories found. Please create categories first.')
    process.exit(1)
  }

  const categoryId: number | string = categories[0].id

  // Upload test images
  console.log('🖼️  Uploading test images...')
  const tempDir = path.resolve(__dirname, '../../temp')
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  // Check if test image already exists
  const { docs: existingMedia } = await payload.find({
    collection: 'media',
    where: {
      alt: { equals: 'Dracula featured image' },
    },
    limit: 1,
  })

  let featuredImageId: number | string | undefined
  if (existingMedia.length > 0) {
    console.log('⏭️  Test image already exists, using existing...')
    featuredImageId = existingMedia[0].id
  } else {
    try {
      // Download a placeholder image (1200x800 dark/gothic theme)
      const imagePath = path.join(tempDir, 'dracula-featured.jpg')
      console.log('📥 Downloading placeholder image...')
      await downloadImage('https://picsum.photos/1200/800?random=1', imagePath)

      // Upload to Payload
      const uploadedImage = await payload.create({
        collection: 'media',
        data: {
          alt: 'Dracula featured image',
          caption: 'Une image atmosphérique pour illustrer l\'article sur Dracula',
        },
        filePath: imagePath,
      })

      featuredImageId = uploadedImage.id
      console.log('✅ Uploaded featured image')

      // Clean up temp file
      fs.unlinkSync(imagePath)
    } catch (error) {
      console.error('❌ Error uploading image:', error)
      console.log('ℹ️  Continuing without featured image...')
      featuredImageId = '' // Will need to be added manually
    }
  }

  // Create test article
  console.log('📝 Creating test article...')

  // Check if test article already exists
  const { docs: existingArticles } = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: 'dracula-histoire-du-vampire' },
    },
    locale: 'fr',
    limit: 1,
  })

  if (existingArticles.length > 0) {
    console.log('⏭️  Test article already exists, skipping...')
  } else {
    try {
      const articleData: any = {
        title: 'Dracula : L\'histoire du vampire éternel',
        slug: 'dracula-histoire-du-vampire',
        excerpt: 'Découvrez l\'histoire fascinante du comte Dracula, de Bram Stoker aux adaptations cinématographiques qui ont marqué l\'histoire du cinéma d\'horreur.',
        category: categoryId,
        author: authorId,
        status: 'published',
        publishedDate: new Date().toISOString(),
        featured: true,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Le comte Dracula est sans doute le vampire le plus célèbre de la culture populaire. Créé par Bram Stoker en 1897, ce personnage a transcendé les pages de son roman pour devenir une icône du cinéma d\'horreur.',
                  },
                ],
              },
            ],
            direction: 'ltr',
          },
        },
      }

      // Add featuredImage if available
      if (featuredImageId) {
        articleData.featuredImage = featuredImageId
      }

      const article = await payload.create({
        collection: 'articles',
        data: articleData,
        locale: 'fr',
      })

      // Add English translation
      await payload.update({
        collection: 'articles',
        id: article.id,
        data: {
          title: 'Dracula: The Story of the Eternal Vampire',
          slug: 'dracula-story-eternal-vampire',
          excerpt: 'Discover the fascinating story of Count Dracula.',
        },
        locale: 'en',
      })

      console.log(`✅ Created test article: "Dracula : L'histoire du vampire éternel"`)
      console.log(`   View it at: http://localhost:3001/admin/collections/articles`)
    } catch (error) {
      console.error('❌ Error creating article:', error)
    }
  }

  console.log('✨ Seeding complete!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error)
  process.exit(1)
})
