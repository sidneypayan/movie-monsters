import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  labels: {
    singular: { en: 'Book', fr: 'Livre' },
    plural: { en: 'Books', fr: 'Livres' },
  },
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
      label: { en: 'Title', fr: 'Titre' },
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: { en: 'Cover Image', fr: 'Image de couverture' },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'publicationDate',
      type: 'date',
      label: { en: 'Publication Date', fr: 'Date de publication' },
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
      label: { en: 'Purchase Links', fr: "Liens d'achat" },
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: { en: 'Platform', fr: 'Plateforme' },
          options: [
            { label: 'Amazon', value: 'amazon' },
            { label: 'Fnac', value: 'fnac' },
            { label: 'Cultura', value: 'cultura' },
            { label: { en: 'Other', fr: 'Autre' }, value: 'other' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
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
          label: { en: 'Custom Label', fr: 'Libellé personnalisé' },
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
      label: { en: 'Order', fr: 'Ordre' },
      admin: {
        position: 'sidebar',
        description: {
          en: 'Display order (newest books first = lower number)',
          fr: "Ordre d'affichage (livres récents en premier = nombre plus petit)",
        },
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
