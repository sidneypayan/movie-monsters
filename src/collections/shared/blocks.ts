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

// Lightweight gallery placeholder (no upload fields — images are managed in the Gallery tab)
export const GalleryPlaceholderBlock = {
  slug: 'gallery',
  interfaceName: 'GalleryPlaceholderBlock',
  labels: {
    singular: { en: 'Image Gallery', fr: "Galerie d'images" },
    plural: { en: 'Image Galleries', fr: "Galeries d'images" },
  },
  fields: [
    {
      name: 'placeholder',
      type: 'text' as const,
      admin: {
        readOnly: true,
        description: {
          en: 'The gallery images from the Gallery tab will be displayed here.',
          fr: "Les images de l'onglet Galerie seront affichées ici.",
        },
      },
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
