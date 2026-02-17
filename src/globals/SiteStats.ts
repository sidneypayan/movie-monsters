import type { GlobalConfig } from 'payload'

export const SiteStats: GlobalConfig = {
  slug: 'site-stats',
  label: { en: 'Site Statistics', fr: 'Statistiques du site' },
  access: {
    read: () => true, // Public - anyone can read the stats
    update: () => true, // Allow API to update (we'll secure via API route)
  },
  fields: [
    {
      name: 'totalVisits',
      type: 'number',
      label: { en: 'Total Visits', fr: 'Visites totales' },
      required: true,
      defaultValue: 0,
      admin: {
        description: {
          en: 'Total number of visits to the homepage',
          fr: "Nombre total de visites sur la page d'accueil",
        },
        readOnly: true,
      },
    },
    {
      name: 'lastVisit',
      type: 'date',
      label: { en: 'Last Visit', fr: 'Dernière visite' },
      admin: {
        description: {
          en: 'Last visit timestamp',
          fr: 'Horodatage de la dernière visite',
        },
        readOnly: true,
      },
    },
  ],
}
