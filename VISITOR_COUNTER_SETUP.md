# Compteur de visiteurs - Configuration

Un compteur de visiteurs fiable a été ajouté à votre page d'accueil. Il utilise votre base PostgreSQL existante via Payload CMS.

## Ce qui a été ajouté

### 1. Base de données (Payload Global)
- **Global**: `site-stats` pour stocker les statistiques
- Champs:
  - `totalVisits`: Nombre total de visiteurs
  - `lastVisit`: Date de la dernière visite

### 2. API Routes
- **GET** `/api/visitor-count`: Récupère le compteur actuel
- **POST** `/api/visitor-count`: Incrémente et retourne le nouveau compteur

### 3. Composant React
- `VisitorCounter.tsx`: Affiche le compteur avec une icône œil
- S'incrémente automatiquement à chaque visite de la page d'accueil
- Style harmonisé avec votre design gothique

### 4. Intégration
- Le compteur est affiché sur la page d'accueil, sous le sous-titre
- Design discret avec effet de transparence et bordure rouge

## Initialisation

### Étape 1: Redémarrer l'application

Le nouveau Global `SiteStats` doit être créé dans votre base de données:

```bash
npm run dev
```

### Étape 2: Initialiser le compteur (optionnel)

Si vous voulez partir avec un nombre spécifique:

1. Accédez à l'admin Payload: http://localhost:3000/admin
2. Allez dans **Globals** > **Site Statistics**
3. Définissez `totalVisits` à la valeur souhaitée (par défaut: 0)
4. Cliquez sur **Save**

## Comment ça fonctionne

1. **Visite de la page d'accueil**: Quand un utilisateur visite `/`, le composant `VisitorCounter` se charge
2. **Incrémentation**: Une requête POST est envoyée à `/api/visitor-count`
3. **Mise à jour**: Le compteur est incrémenté dans PostgreSQL
4. **Affichage**: Le nouveau total est affiché à l'utilisateur

## Caractéristiques

✅ **Fiable**: Stocké dans PostgreSQL, pas de perte de données
✅ **Rapide**: Requête simple, optimisée
✅ **Précis**: Compte chaque chargement de page d'accueil
✅ **Design intégré**: Style gothique cohérent avec votre site
✅ **Multilingue**: Affiche "visiteurs" en français, "visitors" en anglais

## Personnalisation

### Changer la position du compteur

Éditez `src/components/HomePage.tsx` et déplacez la ligne:
```tsx
<VisitorCounter locale={locale} />
```

### Changer le style

Éditez `src/components/VisitorCounter.tsx` pour modifier:
- Les couleurs (classe `bg-black/30`, `border-red-900/30`, etc.)
- La taille de l'icône (`w-5 h-5`)
- Le texte affiché

### Ajouter d'autres statistiques

Vous pouvez étendre le Global `SiteStats` dans `src/globals/SiteStats.ts`:

```typescript
{
  name: 'uniqueVisitors',
  type: 'number',
  defaultValue: 0,
},
{
  name: 'articlesRead',
  type: 'number',
  defaultValue: 0,
}
```

## Statistiques dans l'admin

Pour voir les statistiques dans votre tableau de bord Payload:

1. Connectez-vous à `/admin`
2. Allez dans **Globals** > **Site Statistics**
3. Vous verrez:
   - Le nombre total de visites
   - La date de la dernière visite

## Notes techniques

- Le compteur s'incrémente à chaque chargement, même pour le même utilisateur
- Si vous voulez compter uniquement les visiteurs uniques, il faudrait ajouter un système de cookies/localStorage
- Le compteur est affiché uniquement quand il est chargé (pas de "0" ou loading visible)
- En cas d'erreur API, le compteur ne s'affiche pas (silencieux)

## Performance

- Impact minimal: 1 requête POST par visite de page d'accueil
- PostgreSQL est très performant pour ce type d'opération
- Pas de cache nécessaire, la requête est rapide

## Vercel Analytics vs Compteur personnalisé

Les deux systèmes sont complémentaires:

- **Vercel Analytics**: Pour les statistiques détaillées (pages vues, référents, performances)
- **Compteur personnalisé**: Pour afficher publiquement un nombre de visites sur votre site

Vous pouvez garder les deux !
