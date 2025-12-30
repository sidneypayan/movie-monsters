import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Biography: GlobalConfig = {
  slug: 'biography',
  label: 'Biography',
  access: {
    read: () => true, // Public
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'authorPhoto',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biography',
      required: true,
      localized: true,
      editor: lexicalEditor(),
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Website', value: 'website' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
