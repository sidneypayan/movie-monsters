import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: { en: 'Category', fr: 'Catégorie' },
    plural: { en: 'Categories', fr: 'Catégories' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true, // Public
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { en: 'Name', fr: 'Nom' },
      required: true,
      localized: true,
      index: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      localized: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: { en: 'Featured Image', fr: 'Image mise en avant' },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'order',
      type: 'number',
      label: { en: 'Order', fr: 'Ordre' },
      admin: {
        position: 'sidebar',
        description: {
          en: 'Display order in navigation',
          fr: "Ordre d'affichage dans la navigation",
        },
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
