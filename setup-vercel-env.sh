#!/bin/bash

# Script pour configurer les variables d'environnement sur Vercel
# Usage: sh setup-vercel-env.sh

echo "Configuration des variables d'environnement Vercel..."

# DATABASE_URL avec pooler (port 6543)
vercel env add DATABASE_URL production
# Entrez: postgresql://postgres:ZpyRHvLfTllFm6yb@db.mnkqpyslcmtxihseefuf.supabase.co:6543/postgres?pgbouncer=true

vercel env add DATABASE_URL preview
# Entrez la même valeur

# PAYLOAD_SECRET
vercel env add PAYLOAD_SECRET production
# Entrez: 2fcb46ee1536a2366ad2e5b2

vercel env add PAYLOAD_SECRET preview
# Entrez la même valeur

echo "✓ Configuration terminée!"
echo "Relancez votre déploiement pour appliquer les changements."
