import * as migration_20260126_191327_add_site_stats from './20260126_191500_add_site_stats_only';

export const migrations = [
  {
    up: migration_20260126_191327_add_site_stats.up,
    down: migration_20260126_191327_add_site_stats.down,
    name: '20260126_191327_add_site_stats'
  },
];
