import type { CollectionConfig } from 'payload'

export const Newsletter: CollectionConfig = {
  slug: 'newsletter',
  labels: {
    singular: { en: 'Subscriber', fr: 'Abonné' },
    plural: { en: 'Subscribers', fr: 'Abonnés' },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'subscribedAt'],
    group: 'Marketing',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Allow public subscription
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      label: { en: 'Status', fr: 'Statut' },
      options: [
        { label: { en: 'Subscribed', fr: 'Abonné' }, value: 'subscribed' },
        { label: { en: 'Unsubscribed', fr: 'Désabonné' }, value: 'unsubscribed' },
      ],
      defaultValue: 'subscribed',
      required: true,
    },
    {
      name: 'subscribedAt',
      type: 'date',
      label: { en: 'Subscribed At', fr: "Date d'abonnement" },
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'locale',
      type: 'select',
      label: { en: 'Language', fr: 'Langue' },
      options: [
        { label: 'English', value: 'en' },
        { label: 'Français', value: 'fr' },
      ],
      admin: {
        description: {
          en: 'Preferred language for newsletters',
          fr: 'Langue préférée pour les newsletters',
        },
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.subscribedAt) {
          data.subscribedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
