import * as migration_20260126_191500_add_site_stats_only from './20260126_191500_add_site_stats_only';
import * as migration_20260217_043323_add_dossiers from './20260217_043323_add_dossiers';

export const migrations = [
  {
    up: migration_20260126_191500_add_site_stats_only.up,
    down: migration_20260126_191500_add_site_stats_only.down,
    name: '20260126_191500_add_site_stats_only',
  },
  {
    up: migration_20260217_043323_add_dossiers.up,
    down: migration_20260217_043323_add_dossiers.down,
    name: '20260217_043323_add_dossiers'
  },
];
