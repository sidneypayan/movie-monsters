import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { en: 'User', fr: 'Utilisateur' },
    plural: { en: 'Users', fr: 'Utilisateurs' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { en: 'Name', fr: 'Nom' },
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      label: { en: 'Roles', fr: 'Rôles' },
      hasMany: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: { en: 'Editor', fr: 'Éditeur' }, value: 'editor' },
      ],
      defaultValue: ['editor'],
      required: true,
      saveToJWT: true,
      access: {
        update: ({ req: { user } }) => !!user?.roles?.includes('admin'),
      },
    },
  ],
}
