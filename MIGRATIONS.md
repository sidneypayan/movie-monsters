# Migrations Guide

## ⚠️ IMPORTANT : Avant chaque déploiement

Vérifiez si de nouveaux fichiers apparaissent dans `src/migrations/` !

## Workflow des migrations

### 1. Quand vous modifiez le schéma Payload
- Ajout/modification de champs dans les collections
- Création de nouvelles collections
- Modification de globals

### 2. En développement local
```bash
npm run dev
# Payload génère automatiquement les fichiers de migration dans src/migrations/

# Testez la migration localement
npm run payload migrate
```

### 3. Déploiement en production

#### Étape A : Exécuter le SQL dans Supabase
1. Ouvrez le fichier `.ts` généré dans `src/migrations/`
2. Copiez le SQL de la fonction `up()`
3. Exécutez-le dans Supabase SQL Editor

#### Étape B : Enregistrer la migration
```sql
-- Remplacez le nom par celui de votre migration
INSERT INTO payload_migrations (name, batch, created_at, updated_at)
VALUES ('YYYYMMDD_HHMMSS_nom_de_la_migration', 1, NOW(), NOW());
```

#### Étape C : Vérification
```sql
-- Vérifiez que toutes les migrations sont enregistrées
SELECT * FROM payload_migrations ORDER BY created_at DESC;
```

### 4. Commit et déploiement
```bash
git add src/migrations/*
git commit -m "feat: Add migration for X"
git push
```

## Vérifier les migrations en prod

```sql
SELECT * FROM payload_migrations ORDER BY created_at DESC;
```

Comparez avec les fichiers dans `src/migrations/index.ts`.

## Migrations actuelles
- ✅ `20260126_191327_add_site_stats` - Table site_stats créée
