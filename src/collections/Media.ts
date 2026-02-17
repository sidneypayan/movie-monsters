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
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 250,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 500,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
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
