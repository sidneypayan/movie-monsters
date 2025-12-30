import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publicationDate', 'order'],
  },
  access: {
    read: () => true, // Public
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'publicationDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'purchaseLinks',
      type: 'array',
      label: 'Purchase Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Amazon', value: 'amazon' },
            { label: 'Fnac', value: 'fnac' },
            { label: 'Cultura', value: 'cultura' },
            { label: 'Other', value: 'other' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          validate: (value: unknown) => {
            if (typeof value === 'string' && !value.startsWith('http')) {
              return 'Must be a valid URL starting with http:// or https://'
            }
            return true
          },
        },
        {
          name: 'customLabel',
          type: 'text',
          localized: true,
          admin: {
            condition: (_data: any, siblingData: any) => siblingData?.platform === 'other',
          },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Display order (newest books first = lower number)',
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
