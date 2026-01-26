import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Only create the site_stats table if it doesn't exist
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "site_stats" (
      "id" serial PRIMARY KEY NOT NULL,
      "total_visits" numeric DEFAULT 0 NOT NULL,
      "last_visit" timestamp(3) with time zone,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- Insert initial row if table is empty
    INSERT INTO "site_stats" ("total_visits", "created_at", "updated_at")
    SELECT 0, NOW(), NOW()
    WHERE NOT EXISTS (SELECT 1 FROM "site_stats" LIMIT 1);
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "site_stats" CASCADE;
  `)
}
