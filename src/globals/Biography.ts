import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Biography: GlobalConfig = {
  slug: 'biography',
  label: { en: 'Biography', fr: 'Biographie' },
  access: {
    read: () => true, // Public
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      label: { en: 'Author Name', fr: "Nom de l'auteur" },
      required: true,
      localized: true,
    },
    {
      name: 'authorPhoto',
      type: 'upload',
      label: { en: 'Author Photo', fr: "Photo de l'auteur" },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      type: 'richText',
      label: { en: 'Biography', fr: 'Biographie' },
      required: true,
      localized: true,
      editor: lexicalEditor(),
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: { en: 'Social Links', fr: 'Liens sociaux' },
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: { en: 'Platform', fr: 'Plateforme' },
          options: [
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: { en: 'Website', fr: 'Site web' }, value: 'website' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
  ],
}
