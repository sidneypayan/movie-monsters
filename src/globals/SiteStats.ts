import type { GlobalConfig } from 'payload'

export const SiteStats: GlobalConfig = {
  slug: 'site-stats',
  label: 'Site Statistics',
  access: {
    read: () => true, // Public - anyone can read the stats
    update: () => true, // Allow API to update (we'll secure via API route)
  },
  fields: [
    {
      name: 'totalVisits',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Total number of visits to the homepage',
        readOnly: true,
      },
    },
    {
      name: 'lastVisit',
      type: 'date',
      admin: {
        description: 'Last visit timestamp',
        readOnly: true,
      },
    },
  ],
}
