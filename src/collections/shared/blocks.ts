// Custom block for single image
export const ImageBlock = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  labels: {
    singular: { en: 'Image', fr: 'Image' },
    plural: { en: 'Images', fr: 'Images' },
  },
  fields: [
    {
      name: 'image',
      type: 'upload' as const,
      relationTo: 'media' as const,
      required: true,
      label: 'Image',
    },
    {
      name: 'caption',
      type: 'text' as const,
      label: { en: 'Caption', fr: 'Légende' },
      localized: true,
    },
    {
      name: 'width',
      type: 'select' as const,
      label: { en: 'Width', fr: 'Largeur' },
      options: [
        { label: { en: 'Full Width', fr: 'Pleine largeur' }, value: 'full' },
        { label: { en: 'Large (80%)', fr: 'Grand (80%)' }, value: 'large' },
        { label: { en: 'Medium (60%)', fr: 'Moyen (60%)' }, value: 'medium' },
        { label: { en: 'Small (40%)', fr: 'Petit (40%)' }, value: 'small' },
      ],
      defaultValue: 'full',
    },
  ],
}

// Custom block for image galleries
export const ImageGalleryBlock = {
  slug: 'image-gallery',
  interfaceName: 'ImageGalleryBlock',
  labels: {
    singular: { en: 'Image Gallery', fr: "Galerie d'images" },
    plural: { en: 'Image Galleries', fr: "Galeries d'images" },
  },
  fields: [
    {
      name: 'images',
      type: 'array' as const,
      label: 'Images',
      minRows: 2,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload' as const,
          relationTo: 'media' as const,
          required: true,
        },
        {
          name: 'caption',
          type: 'text' as const,
          label: { en: 'Caption', fr: 'Légende' },
          localized: true,
        },
      ],
    },
    {
      name: 'columns',
      type: 'select' as const,
      label: { en: 'Number of Columns', fr: 'Nombre de colonnes' },
      options: [
        { label: { en: '2 Columns', fr: '2 Colonnes' }, value: '2' },
        { label: { en: '3 Columns', fr: '3 Colonnes' }, value: '3' },
        { label: { en: '4 Columns', fr: '4 Colonnes' }, value: '4' },
      ],
      defaultValue: '3',
    },
  ],
}

// Custom block for YouTube embeds
export const YouTubeBlock = {
  slug: 'youtube',
  interfaceName: 'YouTubeBlock',
  labels: {
    singular: { en: 'YouTube Video', fr: 'Vidéo YouTube' },
    plural: { en: 'YouTube Videos', fr: 'Vidéos YouTube' },
  },
  fields: [
    {
      name: 'videoId',
      type: 'text' as const,
      label: { en: 'YouTube Video ID', fr: 'ID de la vidéo YouTube' },
      required: true,
      admin: {
        description: {
          en: 'YouTube video ID (e.g., dQw4w9WgXcQ from https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
          fr: 'ID de la vidéo YouTube (ex : dQw4w9WgXcQ depuis https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
        },
      },
    },
    {
      name: 'caption',
      type: 'text' as const,
      label: { en: 'Caption', fr: 'Légende' },
      localized: true,
    },
  ],
}
