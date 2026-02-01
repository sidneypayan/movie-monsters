# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL RULE

**NEVER commit or push changes without explicit user authorization.**
- Always ask for permission before running `git commit` or `git push`
- Wait for user confirmation before deploying to develop or main branches

## Project Overview

Movie Monsters is a bilingual (FR/EN) gothic horror cinema blog built with:
- **Next.js 15.4** with App Router
- **Payload CMS 3.69** for content management
- **PostgreSQL** (Supabase) for database
- **Cloudflare R2** for media storage
- **next-intl** for internationalization
- **Tailwind CSS** with custom gothic theme

## Development Commands

```bash
# Development
pnpm dev                    # Start dev server (localhost:3000)
pnpm devsafe               # Clean .next and start dev server

# Build & Deploy
pnpm build                 # Production build (NO migrations - manual only)
pnpm start                 # Start production server

# Database Migrations
pnpm payload migrate       # Run pending migrations (manual only, NOT in build)
pnpm payload migrate:status # Check migration status

# Code Quality
pnpm lint                  # Run ESLint
pnpm test                  # Run all tests (integration + e2e)
pnpm test:int              # Vitest integration tests
pnpm test:e2e              # Playwright e2e tests

# Payload
pnpm payload               # Payload CLI
pnpm generate:types        # Generate TypeScript types from Payload schema
pnpm generate:importmap    # Generate import map

# Seeding
pnpm seed                  # Seed database with sample data
```

## Critical Architecture Decisions

### Database Migrations (MANUAL ONLY)
**IMPORTANT**: Migrations are NOT run automatically during build. This is intentional to avoid slow deploys (25+ min).

**Workflow**:
1. Schema changes generate migration files in `src/migrations/`
2. Execute SQL manually in Supabase SQL Editor
3. Register migration in `payload_migrations` table
4. See `MIGRATIONS.md` for detailed workflow

### Bilingual Content Architecture

**Two-layer i18n system**:
1. **Content localization** (Payload): French/English articles, categories with different slugs per language
2. **UI localization** (next-intl): Navigation, labels in `src/i18n/messages/{locale}.json`

**Localized fields** in Payload collections:
- `title`, `slug`, `excerpt`, `content` → Different per language
- `featuredImage`, `author`, `category`, `status` → Shared across languages

**Route structure**: `/{locale}/articles/{slug}` where slug differs per language

### Smart Language Switching

**API route** `/api/translate-url` maps article/category slugs between locales:
- Finds article by current slug in current locale
- Retrieves same article ID in target locale
- Returns correct URL with translated slug
- Prevents 404 when switching languages on article pages

### Auto-generated Fields in Articles Collection

**beforeChange hooks** automatically generate:
1. **Slug**: From title, lowercased, hyphenated, accents removed
2. **Excerpt**: First sentence from Lexical content (max 160 chars)

Both can be manually overridden if needed.

### Lexical Rich Text Custom Blocks

Three custom blocks defined in `Articles.ts`:
1. **ImageBlock**: Single image with caption and width control (full/large/medium/small)
2. **ImageGalleryBlock**: Multiple images with lightbox, 2-4 columns
3. **YouTubeBlock**: Embedded YouTube videos with caption

Rendered via custom converters in `src/components/RichText.tsx`.

### ISR (Incremental Static Regeneration)

All public pages use ISR with 60-second revalidation:
- Homepage, articles, categories, books, about pages
- `generateStaticParams()` pre-generates pages for all locale+slug combinations
- New content appears within 60 seconds without rebuild

### Media Storage: Cloudflare R2

All uploads stored in Cloudflare R2 (S3-compatible):
- Collection: `media` with auto-generated sizes (thumbnail, card, hero)
- Focal point support for cropping
- Public URL format: `{CLOUDFLARE_R2_PUBLIC_URL}/{prefix}/{filename}`

## Key File Locations

```
src/
├── collections/           # Payload collections
│   ├── Articles.ts       # Main content (auto slug/excerpt generation)
│   ├── Categories.ts     # Article categories
│   ├── Books.ts         # Author's books
│   └── Media.ts         # Uploads (R2 storage)
├── globals/             # Payload globals
│   ├── Biography.ts     # Author bio
│   └── SiteStats.ts     # Visitor counter
├── components/          # React components
│   ├── Navigation.tsx   # Header with smart language switcher
│   ├── RichText.tsx     # Lexical renderer with custom blocks
│   └── *Page.tsx        # Page components (HomePage, ArticlePage, etc.)
├── app/
│   ├── [locale]/        # Localized routes
│   └── api/
│       └── translate-url/ # Slug translation API for language switching
├── i18n/
│   ├── messages/        # UI translations (en.json, fr.json)
│   └── request.ts       # next-intl config
└── migrations/          # DB migrations (manual execution only)
```

## Payload Collections Schema

**Collections**:
- `users`: Admin authentication
- `media`: Uploads with R2 storage
- `articles`: Blog posts (localized: title, slug, excerpt, content)
- `categories`: Article categories (localized: name, slug)
- `books`: Author's books (localized: title, description)
- `newsletter`: Email subscribers

**Globals**:
- `biography`: Author bio (localized)
- `site-stats`: Visitor counter (single global record)

## Environment Variables Required

```env
# Payload
PAYLOAD_SECRET=
DATABASE_URL=           # PostgreSQL connection string

# Cloudflare R2
CLOUDFLARE_R2_BUCKET=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_ENDPOINT=
CLOUDFLARE_R2_PUBLIC_URL=

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Styling Conventions

- **Tailwind classes** for all styling (no CSS files except globals.css)
- **Gothic theme** with custom colors: `gothic-purple`, `gothic-crimson`, `accent-red`, `accent-purple`
- **Typography**: Neo-gothic titles with font-light, uppercase tracking-wider
- **Prose classes**: `prose prose-invert prose-xl` for article content
- Image size reduction via `prose-img:max-w-4xl prose-img:mx-auto prose-img:w-4/5`

## Testing

- **Vitest** for integration tests (`test:int`)
- **Playwright** for e2e tests (`test:e2e`)
- Test files: `*.test.ts`, `*.spec.ts`

## Deployment (Vercel)

- Builds via `pnpm build` (NO automatic migrations)
- Branches: `develop` (staging) and `main` (production)
- ISR pages regenerate every 60 seconds
- Always verify deployment complete before checking changes in prod
