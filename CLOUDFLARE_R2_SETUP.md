# Guide de Configuration Cloudflare R2 pour Movie Monsters

## ✅ Étape 1 : Packages installés

Les packages suivants ont été installés :
```bash
npm install @payloadcms/plugin-cloud-storage @payloadcms/storage-s3
```

## 📋 Étape 2 : Créer un Bucket R2 sur Cloudflare

### 2.1 - Accéder à Cloudflare R2
1. Allez sur [dash.cloudflare.com](https://dash.cloudflare.com)
2. Dans le menu latéral, cliquez sur **R2**
3. Si c'est la première fois, acceptez les conditions d'utilisation

### 2.2 - Créer un nouveau Bucket
1. Cliquez sur **Create bucket**
2. **Nom du bucket** : `movie-monsters-media` (ou un nom de votre choix)
3. **Location** : Automatic (recommandé) ou choisissez une région proche de vos utilisateurs
4. Cliquez sur **Create bucket**

### 2.3 - Configurer l'accès public (pour les images)
1. Dans votre bucket, allez dans l'onglet **Settings**
2. Sous **Public access**, cliquez sur **Allow Access**
3. Cliquez sur **Connect domain** pour ajouter un domaine personnalisé (optionnel)
   - Exemple : `media.movie-monsters.com`
   - Ou utilisez l'URL publique générée : `https://pub-xxxxxxxxxxxx.r2.dev`

> ⚠️ **Note** : Si vous n'ajoutez pas de domaine personnalisé, Cloudflare génère automatiquement une URL publique.

## 🔑 Étape 3 : Obtenir les Credentials R2

### 3.1 - Créer des API Tokens
1. Depuis la page R2, cliquez sur **Manage R2 API Tokens**
2. Cliquez sur **Create API token**
3. Configurez le token :
   - **Token name** : `movie-monsters-production`
   - **Permissions** : Object Read & Write
   - **Specify bucket(s)** : Sélectionnez `movie-monsters-media`
   - **TTL** : Forever (ou définissez une durée)
4. Cliquez sur **Create API Token**

### 3.2 - Sauvegarder les credentials
Vous recevrez ces informations (sauvegardez-les immédiatement) :
```
Access Key ID: <votre_access_key>
Secret Access Key: <votre_secret_key>
Endpoint: https://<account_id>.r2.cloudflarestorage.com
```

> ⚠️ **IMPORTANT** : Le Secret Access Key ne sera affiché qu'une seule fois !

## 🔐 Étape 4 : Configurer les Variables d'Environnement

### 4.1 - Mettre à jour `.env`

Ajoutez ces variables à votre fichier `.env` :

```env
# Base de données (existant)
DATABASE_URL=postgresql://postgres:ZpyRHvLfTllFm6yb@db.mnkqpyslcmtxihseefuf.supabase.co:5432/postgres
PAYLOAD_SECRET=2fcb46ee1536a2366ad2e5b2

# Cloudflare R2
CLOUDFLARE_R2_ACCOUNT_ID=<votre_account_id>
CLOUDFLARE_R2_ACCESS_KEY_ID=<votre_access_key>
CLOUDFLARE_R2_SECRET_ACCESS_KEY=<votre_secret_key>
CLOUDFLARE_R2_BUCKET=movie-monsters-media
CLOUDFLARE_R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
CLOUDFLARE_R2_PUBLIC_URL=https://pub-xxxxxxxxxxxx.r2.dev
```

### 4.2 - Trouver votre Account ID
1. Sur Cloudflare Dashboard, cliquez sur **R2**
2. L'Account ID est affiché en haut à droite
3. Ou consultez votre URL d'endpoint fournie lors de la création du token

### 4.3 - Trouver votre URL publique
1. Allez dans votre bucket `movie-monsters-media`
2. Onglet **Settings** → **Public access**
3. L'URL publique R2.dev sera affichée
4. Si vous avez connecté un domaine personnalisé, utilisez-le à la place

## 🚀 Étape 5 : Configurer Vercel

### Variables d'environnement à ajouter sur Vercel :

1. Allez sur [vercel.com](https://vercel.com) → votre projet → **Settings** → **Environment Variables**

2. Ajoutez ces variables :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `DATABASE_URL` | `postgresql://postgres:xxx@db.xxx.supabase.co:6543/postgres?pgbouncer=true` | Production, Preview |
| `PAYLOAD_SECRET` | `2fcb46ee1536a2366ad2e5b2` | Production, Preview |
| `CLOUDFLARE_R2_ACCOUNT_ID` | Votre Account ID | Production, Preview |
| `CLOUDFLARE_R2_ACCESS_KEY_ID` | Votre Access Key | Production, Preview |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | Votre Secret Key | Production, Preview |
| `CLOUDFLARE_R2_BUCKET` | `movie-monsters-media` | Production, Preview |
| `CLOUDFLARE_R2_ENDPOINT` | `https://<account_id>.r2.cloudflarestorage.com` | Production, Preview |
| `CLOUDFLARE_R2_PUBLIC_URL` | `https://pub-xxx.r2.dev` ou votre domaine | Production, Preview |

> ⚠️ **Important** : Utilisez le port **6543** avec `?pgbouncer=true` pour DATABASE_URL sur Vercel !

## ✅ Étape 6 : Tester la Configuration

### 6.1 - Redémarrer le serveur de dev
```bash
npm run dev
```

### 6.2 - Tester l'upload
1. Connectez-vous à l'admin Payload : `http://localhost:3000/admin` (ou port affiché)
2. Allez dans **Media**
3. Uploadez une image de test
4. Vérifiez que l'image est visible

### 6.3 - Vérifier sur Cloudflare
1. Retournez sur Cloudflare → R2 → votre bucket
2. Vous devriez voir les fichiers uploadés
3. Testez l'URL publique de l'image

## 🔄 Migration des Fichiers Existants (Optionnel)

Si vous avez déjà des images dans le dossier `media/` local :

### Option 1 : Upload manuel via Admin
1. Téléchargez les images depuis `media/`
2. Re-uploadez-les via l'interface admin Payload

### Option 2 : Script de migration
Créez un script pour copier les fichiers vers R2 (je peux vous aider à créer ce script si nécessaire)

## 🎯 Résultat Final

✅ **Avant** : Images stockées localement dans `/media`
✅ **Après** : Images sur Cloudflare R2 avec :
- Accès global ultra-rapide via CDN Cloudflare
- Zéro frais de bande passante
- URLs directes : `https://pub-xxx.r2.dev/filename.jpg`

## 🐛 Troubleshooting

### Erreur : "Access Denied"
- Vérifiez que les credentials R2 sont corrects
- Vérifiez que le token a les permissions "Object Read & Write"
- Vérifiez que le bucket est bien spécifié dans le token

### Erreur : "Bucket not found"
- Vérifiez le nom du bucket dans `.env`
- Vérifiez que le bucket existe dans votre compte Cloudflare

### Images ne s'affichent pas
- Vérifiez que "Public access" est activé sur le bucket
- Vérifiez que `CLOUDFLARE_R2_PUBLIC_URL` est correcte
- Testez l'URL directement dans le navigateur

### En développement local
- Assurez-vous que toutes les variables R2 sont dans `.env`
- Redémarrez le serveur après avoir ajouté les variables

## 📊 Coûts Estimés

Pour un blog de cinéma avec 1000 images (500 MB) et 10,000 visiteurs/mois :

```
Stockage : 500 MB × $0.015/GB = $0.0075/mois
Opérations : ~50,000 requêtes = Gratuit (dans le free tier)
Bande passante : 0$ (pas de frais egress)

Total : ~$0.01/mois 🎉
```

Comparé à d'autres solutions :
- **AWS S3 + CloudFront** : ~$5-10/mois
- **Vercel Blob** : ~$20/mois (après free tier)
- **Supabase Storage** : ~$2-5/mois

## 📚 Ressources

- [Documentation Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Payload Storage Plugin](https://payloadcms.com/docs/upload/overview)
- [R2 Pricing](https://developers.cloudflare.com/r2/pricing/)

---

**Prochaines étapes** :
1. ✅ Packages installés
2. ✅ Configuration Payload modifiée
3. ⏳ Créer le bucket R2 sur Cloudflare (suivez le guide ci-dessus)
4. ⏳ Obtenir les credentials
5. ⏳ Ajouter les variables d'environnement
6. ⏳ Tester !
