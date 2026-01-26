# Guide d'utilisation des galeries de photos

Votre site dispose d'un système complet de galeries de photos intégré à l'éditeur d'articles avec lightbox pour agrandir les images.

## Fonctionnalités disponibles

### 1. Image simple
Insérez une seule image dans votre article avec différentes tailles.
- **✨ Cliquez sur l'image pour l'agrandir en plein écran**

### 2. Galerie de photos
Créez des galeries de 2 à 12 images avec plusieurs options de colonnes.
- **✨ Cliquez sur n'importe quelle image pour ouvrir le lightbox**
- **✨ Naviguez entre les images avec les flèches**
- **✨ Utilisez le clavier : ← → pour naviguer, Échap pour fermer**

### 3. Vidéo YouTube
Intégrez des vidéos YouTube directement dans vos articles.

## Comment créer une galerie de photos

### Étape 1 : Ouvrir l'éditeur d'article

1. Connectez-vous à l'admin Payload (`/admin`)
2. Allez dans **Collections** > **Articles**
3. Créez un nouvel article ou modifiez un article existant
4. Positionnez votre curseur dans le contenu où vous voulez insérer la galerie

### Étape 2 : Insérer un bloc de galerie

1. Dans l'éditeur Lexical, cliquez sur le bouton **"+"** (ou tapez `/` pour ouvrir le menu)
2. Sélectionnez **"Image Gallery"** dans la liste des blocs

### Étape 3 : Configurer la galerie

#### Nombre de colonnes
- **2 colonnes** : Idéal pour des images larges
- **3 colonnes** : Par défaut, bon équilibre
- **4 colonnes** : Pour beaucoup de petites images

#### Ajouter des images

1. Cliquez sur **"Add Image"**
2. Pour chaque image :
   - Sélectionnez l'image depuis votre bibliothèque média
   - Ou uploadez une nouvelle image
   - Ajoutez une légende (optionnel)
3. Répétez pour ajouter jusqu'à 12 images

### Étape 4 : Organiser les images

- **Réorganiser** : Glissez-déposez les images pour changer l'ordre
- **Supprimer** : Cliquez sur la poubelle pour retirer une image
- **Minimum** : 2 images requises
- **Maximum** : 12 images par galerie

## Dimensions recommandées pour les galeries

### Images carrées (recommandé)
- **1000 × 1000 px** : Idéal pour les galeries
- **800 × 800 px** : Minimum acceptable

### Images rectangulaires (paysage)
- **1200 × 800 px** : Ratio 3:2
- **1600 × 1000 px** : Ratio 16:10

### Conseils
- Toutes les images d'une même galerie devraient avoir le **même ratio** pour un meilleur rendu
- Évitez de mélanger images verticales et horizontales
- Gardez une cohérence de taille pour un aspect professionnel

## Insérer une image simple

### Étape 1 : Insérer le bloc
1. Cliquez sur **"+"** ou tapez `/`
2. Sélectionnez **"Image"**

### Étape 2 : Configurer l'image
- **Image** : Sélectionnez ou uploadez
- **Caption** : Ajoutez une légende (optionnel)
- **Width** : Choisissez la largeur
  - **Full Width** : Toute la largeur (100%)
  - **Large** : 80% de largeur
  - **Medium** : 60% de largeur
  - **Small** : 40% de largeur

## Insérer une vidéo YouTube

### Étape 1 : Obtenir l'ID de la vidéo
De l'URL YouTube : `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
L'ID est : `dQw4w9WgXcQ` (la partie après `v=`)

### Étape 2 : Insérer le bloc
1. Cliquez sur **"+"** ou tapez `/`
2. Sélectionnez **"YouTube"**
3. Collez l'**ID de la vidéo** (pas l'URL complète !)
4. Ajoutez une légende (optionnel)

## Exemples d'utilisation

### Galerie de screenshots de films
```
- 3 colonnes
- 6 à 9 images
- Images en 16:9 (1920×1080px)
- Légendes avec nom du film et année
```

### Galerie de posters vintage
```
- 4 colonnes
- 8 à 12 images
- Images verticales (600×900px)
- Légendes avec titre et studio
```

### Comparaison avant/après
```
- 2 colonnes
- 2 images
- Même dimension exacte
- Légendes descriptives
```

## Style des galeries

Les galeries sont automatiquement stylisées avec :
- **Bordures rouges** au survol (cohérent avec le design gothique)
- **Effet de zoom** au survol des images
- **Icône loupe** au survol pour indiquer que l'image est cliquable
- **Responsive** : S'adapte automatiquement aux mobiles
- **Overlay gradient** au survol
- **Légendes** en italique, style sobre

## Lightbox (Agrandissement des images)

Les visiteurs peuvent agrandir les images pour une meilleure expérience de lecture.

### Comment utiliser le lightbox

1. **Ouvrir** : Cliquez sur n'importe quelle image
2. **Naviguer** :
   - Boutons **← →** pour passer d'une image à l'autre (galeries)
   - Touches clavier **← →** pour naviguer
   - Compteur **1 / 10** pour voir la position
3. **Fermer** :
   - Bouton **✕** en haut à droite
   - Touche **Échap** du clavier
   - Cliquer en dehors de l'image

### Fonctionnalités du lightbox

- **Plein écran** : L'image s'affiche en très haute résolution
- **Navigation fluide** : Transitions douces entre les images
- **Compteur** : Affiche la position (ex: 3 / 10)
- **Légendes visibles** : Les légendes sont affichées sous l'image
- **Scroll bloqué** : La page ne défile pas quand le lightbox est ouvert
- **Responsive** : Fonctionne parfaitement sur mobile et tablette

## Responsive (mobile)

Les galeries s'adaptent automatiquement :

| Desktop | Tablet | Mobile |
|---------|--------|--------|
| 2 colonnes → 2 colonnes | 2 colonnes | 1 colonne |
| 3 colonnes → 3 colonnes | 2 colonnes | 1 colonne |
| 4 colonnes → 4 colonnes | 3 colonnes | 2 colonnes |

## Bonnes pratiques

### ✅ À faire
- Utiliser des images de qualité similaire
- Maintenir un ratio cohérent dans une même galerie
- Ajouter des légendes descriptives
- Limiter à 6-9 images pour une galerie optimale
- Optimiser le poids des images (< 500 KB chacune)

### ❌ À éviter
- Mélanger images verticales et horizontales
- Utiliser trop d'images (> 12)
- Images trop lourdes (> 1 MB)
- Oublier les textes alternatifs (accessibilité)
- Galeries trop nombreuses dans un même article

## Accessibilité

Pour chaque image, n'oubliez pas :

1. **Alt text** : Description de l'image
   - Exemple : "Affiche du film Dracula (1931) avec Bela Lugosi"
2. **Caption** : Légende visible
   - Exemple : "Dracula (Universal, 1931)"

## Dépannage

**Q : La galerie ne s'affiche pas**
R : Vérifiez qu'il y a au moins 2 images dans la galerie

**Q : Les colonnes ne fonctionnent pas**
R : Assurez-vous d'avoir sauvegardé l'article après modification

**Q : Les images sont déformées**
R : Utilisez des images avec le même ratio dans une galerie

**Q : Je ne vois pas le bouton "Image Gallery"**
R : Tapez `/` dans l'éditeur pour ouvrir le menu des blocs

## Exemple complet

### Article sur "Les Monstres Universal"

**Contenu :**
- Introduction (texte)
- Image simple : Affiche Universal (Large, 80%)
- Paragraphe sur Dracula
- Galerie 3 colonnes : Screenshots de Dracula, Frankenstein, La Momie
- Paragraphe sur l'évolution
- Vidéo YouTube : Making-of documentaire
- Galerie 4 colonnes : Collection de posters vintage
- Conclusion

C'est ainsi que vous créez un article riche et visuellement attractif !

## Support

Pour toute question, consultez la documentation Payload :
- [Lexical Editor](https://payloadcms.com/docs/rich-text/lexical)
- [Custom Blocks](https://payloadcms.com/docs/rich-text/lexical#custom-blocks)
