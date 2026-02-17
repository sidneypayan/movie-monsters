import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Articles } from './collections/Articles'
import { Dossiers } from './collections/Dossiers'
import { Categories } from './collections/Categories'
import { Books } from './collections/Books'
import { Newsletter } from './collections/Newsletter'
import { Biography } from './globals/Biography'
import { SiteStats } from './globals/SiteStats'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Articles, Dossiers, Categories, Books, Newsletter],
  globals: [Biography, SiteStats],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,

  // Localization for content
  localization: {
    locales: [
      {
        label: 'Français',
        code: 'fr',
      },
      {
        label: 'English',
        code: 'en',
      },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },

  // i18n for admin UI
  i18n: {
    supportedLanguages: { en, fr },
    fallbackLanguage: 'fr',
    translations: {
      fr: {
        general: {
          createNew: 'Créer',
          createNewLabel: 'Créer un nouveau {{label}}',
          none: 'Aucun',
          noResults: "Aucun {{label}} trouvé. Soit aucun {{label}} n'existe encore, soit aucun ne correspond aux filtres que vous avez spécifiés ci-dessus",
          noRowsFound: 'Aucun {{label}} trouvé',
        },
      },
    },
  },

  plugins: [
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          prefix: 'images',
          generateFileURL: ({ filename, prefix = '' }) => {
            const path = prefix ? `${prefix}/` : ''
            return `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${path}${filename}`
          },
        },
      },
      bucket: process.env.CLOUDFLARE_R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],
})
