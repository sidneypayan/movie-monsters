import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_dossiers_status" AS ENUM('draft', 'published');
  CREATE TABLE "dossiers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer NOT NULL,
  	"status" "enum_dossiers_status" DEFAULT 'draft' NOT NULL,
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"author_id" integer NOT NULL,
  	"featured_image_id" integer,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dossiers_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar,
  	"content" jsonb NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "articles_locales" ALTER COLUMN "excerpt" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "dossiers_id" integer;
  ALTER TABLE "dossiers" ADD CONSTRAINT "dossiers_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dossiers" ADD CONSTRAINT "dossiers_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dossiers" ADD CONSTRAINT "dossiers_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dossiers" ADD CONSTRAINT "dossiers_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dossiers_locales" ADD CONSTRAINT "dossiers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dossiers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "dossiers_category_idx" ON "dossiers" USING btree ("category_id");
  CREATE INDEX "dossiers_author_idx" ON "dossiers" USING btree ("author_id");
  CREATE INDEX "dossiers_featured_image_idx" ON "dossiers" USING btree ("featured_image_id");
  CREATE INDEX "dossiers_meta_image_idx" ON "dossiers" USING btree ("meta_image_id");
  CREATE INDEX "dossiers_updated_at_idx" ON "dossiers" USING btree ("updated_at");
  CREATE INDEX "dossiers_created_at_idx" ON "dossiers" USING btree ("created_at");
  CREATE UNIQUE INDEX "dossiers_slug_idx" ON "dossiers_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "dossiers_locales_locale_parent_id_unique" ON "dossiers_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dossiers_fk" FOREIGN KEY ("dossiers_id") REFERENCES "public"."dossiers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_dossiers_id_idx" ON "payload_locked_documents_rels" USING btree ("dossiers_id");
  ALTER TABLE "articles" DROP COLUMN "featured";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "dossiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dossiers_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "dossiers" CASCADE;
  DROP TABLE "dossiers_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_dossiers_fk";
  
  DROP INDEX "payload_locked_documents_rels_dossiers_id_idx";
  ALTER TABLE "articles_locales" ALTER COLUMN "excerpt" SET NOT NULL;
  ALTER TABLE "articles" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "dossiers_id";
  DROP TYPE "public"."enum_dossiers_status";`)
}
