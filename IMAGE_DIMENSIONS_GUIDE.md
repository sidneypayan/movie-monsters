# Guide des dimensions d'images

Ce guide vous indique les dimensions optimales pour vos images afin qu'elles s'affichent parfaitement sur votre site.

## Dimensions recommandées

### Pour les cartes d'articles (sections "Récents", "Articles", "Similaires")

**Ratio requis** : 16:10 (1.6:1)

- **Recommandé** : 1600 × 1000 px
- **Minimum** : 800 × 500 px
- **Maximum** : 2400 × 1500 px

### Pour le hero et la page d'article (grande image en haut)

**Ratio requis** : 16:9 (1.78:1)

- **Recommandé** : 1920 × 1080 px (Full HD)
- **Minimum** : 1280 × 720 px (HD)
- **Maximum** : 3840 × 2160 px (4K)

## Images automatiquement générées

Quand vous uploadez une image, Payload CMS génère automatiquement 3 versions :

1. **thumbnail** : 400 × 250 px (16:10) - pour les aperçus admin
2. **card** : 800 × 500 px (16:10) - pour les cartes d'articles
3. **hero** : 1920 × 1080 px (16:9) - pour les grandes images

## Conseils pour de meilleurs résultats

### Format de fichier
- **JPEG/JPG** : Pour les photos (meilleure compression)
- **PNG** : Pour les images avec texte ou transparence
- **WebP** : Format moderne (si disponible)

### Qualité
- **Résolution** : 72 DPI minimum (pour le web)
- **Qualité JPEG** : 80-90% (bon compromis qualité/poids)
- **Taille de fichier** : Idéalement < 500 KB par image

### Composition
- **Cartes 16:10** : Placez le sujet principal au centre
- **Hero 16:9** : Composition cinématographique, horizon au tiers

## Utilisation de l'outil de recadrage

Lorsque vous uploadez une image dans Payload :

1. **Télécharger l'image** : Utilisez une image de haute qualité
2. **Définir le point focal** : Cliquez sur la partie importante de l'image
3. **Recadrer (optionnel)** :
   - Utilisez les **poignées visuelles** (coins blancs) pour ajuster la zone
   - Les champs largeur/hauteur se mettent à jour automatiquement
   - Ne tapez pas manuellement si vous avez plus de 2 chiffres, utilisez les poignées

## Vérifier vos dimensions avant upload

### Avec un éditeur d'images (Photoshop, GIMP, Photopea)
1. Ouvrir l'image
2. Vérifier les dimensions (Image > Taille de l'image)
3. Recadrer ou redimensionner si nécessaire

### Calculateur de ratio rapide
- **16:10** → Largeur ÷ 1.6 = Hauteur
  - Exemples : 1600×1000, 1200×750, 800×500
- **16:9** → Largeur ÷ 1.78 = Hauteur
  - Exemples : 1920×1080, 1280×720, 3840×2160

## Tableau récapitulatif

| Utilisation | Ratio | Dimensions idéales | Dimensions min |
|-------------|-------|-------------------|----------------|
| Cartes d'articles | 16:10 | 1600 × 1000 px | 800 × 500 px |
| Hero / Article | 16:9 | 1920 × 1080 px | 1280 × 720 px |
| Catégories | Libre | 1200 × 1600 px | 600 × 800 px |

## Si votre image n'est pas au bon ratio

### Option 1 : Recadrer avant upload
Utilisez un outil comme :
- [Photopea](https://www.photopea.com) (gratuit, en ligne)
- [Canva](https://www.canva.com) (gratuit)
- Photoshop, GIMP (logiciels desktop)

### Option 2 : Utiliser le recadrage Payload
Après upload, utilisez l'outil de recadrage intégré pour ajuster l'image.

## Exemple de workflow

1. **Préparer l'image**
   - Résolution : 1920 × 1080 px (hero) ou 1600 × 1000 px (carte)
   - Format : JPEG, qualité 85%
   - Poids : < 500 KB

2. **Upload dans Payload**
   - Aller dans Media
   - Cliquer sur "Upload"
   - Sélectionner votre image

3. **Renseigner les métadonnées**
   - **Alt text** : Description de l'image (important pour SEO et accessibilité)
   - **Caption** : Légende (optionnel)

4. **Point focal & recadrage**
   - Cliquer sur le point important de l'image
   - Ajuster la zone de recadrage si nécessaire

5. **Sauvegarder**
   - Les 3 versions sont générées automatiquement
   - L'image est prête à être utilisée !

## Questions fréquentes

**Q : Puis-je utiliser des images verticales ?**
R : Pour les cartes et le hero, non. Elles seront recadrées. Pour les catégories, oui.

**Q : Que se passe-t-il si mon image est trop petite ?**
R : Elle sera étirée et perdra en qualité. Utilisez toujours les dimensions minimales.

**Q : Puis-je utiliser des images plus grandes ?**
R : Oui, mais elles seront automatiquement redimensionnées. Attention au poids du fichier.

**Q : Comment optimiser le poids de mes images ?**
R : Utilisez des outils comme [TinyPNG](https://tinypng.com) ou [Squoosh](https://squoosh.app) avant upload.
