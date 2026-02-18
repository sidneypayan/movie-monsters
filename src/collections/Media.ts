import type { CollectionConfig } from 'payload'

const generateAltFromFilename = (filename: string): string => {
  return filename
    .replace(/\.[^.]+$/, '') // Remove extension
    .replace(/[-_]+/g, ' ') // Replace hyphens/underscores with spaces
    .replace(/\s+/g, ' ') // Normalize multiple spaces
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()) // Capitalize each word
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { en: 'Media', fr: 'Média' },
    plural: { en: 'Media', fr: 'Médias' },
  },
  admin: {
    pagination: {
      defaultLimit: 100,
      limits: [50, 100],
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    // Compress and limit original image size
    resizeOptions: {
      width: 2560,
      height: 2560,
      fit: 'inside',
      withoutEnlargement: true,
    },
    formatOptions: {
      format: 'webp',
      options: {
        quality: 82,
      },
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 250,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
      {
        name: 'card',
        width: 800,
        height: 500,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 80 },
        },
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 82 },
        },
      },
    ],
    adminThumbnail: 'card',
    focalPoint: true,
    crop: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: { en: 'Alt Text', fr: 'Texte alternatif' },
      required: true,
      localized: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: { en: 'Caption', fr: 'Légende' },
      localized: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (data && !data.alt) {
          const filename = req.file?.name || data.filename
          if (filename) {
            data.alt = generateAltFromFilename(filename)
          }
        }
        return data
      },
    ],
  },
}
