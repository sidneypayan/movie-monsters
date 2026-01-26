import { getPayload } from 'payload'
import config from '../payload.config.js'
import dotenv from 'dotenv'

dotenv.config()

async function convertImagesToGallery() {
  const payload = await getPayload({ config })

  try {
    // Get article with ID 78
    const article = await payload.findByID({
      collection: 'articles',
      id: 78,
      locale: 'fr',
    })

    if (!article) {
      console.error('Article with ID 78 not found')
      process.exit(1)
    }

    console.log('='.repeat(60))
    console.log('Article found:', article.title)
    console.log('='.repeat(60))
    console.log('\nArticle URL: /fr/articles/' + article.slug)
    console.log('\nCurrent content structure:')
    console.log(JSON.stringify(article.content, null, 2))

  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }

  process.exit(0)
}

convertImagesToGallery()
