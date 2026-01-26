# Configuration de Vercel Analytics

Vercel Analytics est maintenant intégré à votre site. Il ne reste plus qu'à l'activer dans votre tableau de bord Vercel.

## Activation (2 minutes)

### 1. Accédez à votre tableau de bord Vercel
- Allez sur https://vercel.com
- Sélectionnez votre projet **movie-monsters**

### 2. Activez Analytics
- Cliquez sur l'onglet **Analytics** dans le menu du projet
- Cliquez sur **Enable Analytics**
- Choisissez votre plan:
  - **Hobby (Gratuit)**: 2 500 événements/mois
  - **Pro**: 100 000 événements/mois

### 3. Déployez (si nécessaire)
Si votre site est déjà en production, les analytics commenceront à fonctionner immédiatement sans redéploiement.

## Ce que vous obtenez

### Métriques automatiques
- **Visiteurs uniques**: Nombre de visiteurs
- **Pages vues**: Total des pages consultées
- **Top Pages**: Pages les plus visitées
- **Top Referrers**: D'où viennent vos visiteurs
- **Pays**: Géolocalisation des visiteurs
- **Appareils**: Desktop vs Mobile

### Web Vitals
Vercel Analytics mesure automatiquement les performances:
- **LCP** (Largest Contentful Paint): Temps de chargement
- **FID** (First Input Delay): Interactivité
- **CLS** (Cumulative Layout Shift): Stabilité visuelle
- **FCP** (First Contentful Paint): Premier affichage
- **TTFB** (Time to First Byte): Temps de réponse serveur

### Événements personnalisés (Optionnel)

Vous pouvez tracker des événements spécifiques:

```tsx
import { track } from '@vercel/analytics'

// Exemple: tracker un clic sur un bouton
track('button_clicked', {
  button_name: 'subscribe',
  page: '/about'
})

// Exemple: tracker une conversion
track('article_read', {
  article_slug: 'mon-article',
  category: 'horror'
})
```

## Afficher les statistiques sur votre site

Si vous voulez afficher publiquement vos statistiques, vous pouvez utiliser l'API Vercel Analytics:

```tsx
// Exemple de composant
'use client'

import { useEffect, useState } from 'react'

export default function Stats() {
  const [views, setViews] = useState(0)

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => setViews(data.views))
  }, [])

  return <div>{views.toLocaleString()} vues</div>
}
```

## Conformité RGPD

Vercel Analytics est conçu pour être conforme au RGPD:
- Pas de cookies utilisés
- Pas de données personnelles collectées
- Anonymisation des adresses IP
- Pas de pistage cross-site

Aucun bandeau de cookies n'est nécessaire pour les analytics de base.

## Vérification

Pour vérifier que tout fonctionne:

1. Visitez votre site en production
2. Attendez quelques minutes (les données peuvent prendre 5-10 min à apparaître)
3. Retournez sur Vercel Dashboard > Analytics
4. Vous devriez voir vos visites

## Support

- Documentation: https://vercel.com/docs/analytics
- Pricing: https://vercel.com/docs/analytics/pricing
- Support Vercel: https://vercel.com/support
