-- Reset visitor counter to 0
-- Run this in Supabase SQL Editor

UPDATE "site_stats"
SET "total_visits" = 0,
    "last_visit" = NOW(),
    "updated_at" = NOW();

-- Verify the update
SELECT id, total_visits, last_visit, updated_at
FROM "site_stats";
