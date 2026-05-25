Lukas Lemonnier

# CinéCatalogue

Application mobile de catalogue de films et séries, développée avec React Native, Expo et TypeScript.

---

## Description

CinéCatalogue permet de consulter un catalogue de 37 titres (films et séries), de rechercher et filtrer des titres, d'accéder à une fiche détail, de gérer ses favoris et de soumettre des recommandations via un formulaire. Toutes les données sont locales — aucune API externe.

---

## Fonctionnalités réalisées

- **Accueil** : nom de l'application, présentation, 5 statistiques (total, films, séries, genres, favoris), accès rapide au catalogue et au formulaire
- **Catalogue** : liste complète avec `FlatList`, composant `MovieCard` réutilisable affichant titre, type, genre, année, note, durée/saisons, placeholder et état favori
- **Recherche** : recherche en temps réel par titre, genre, créateur ou tag
- **Filtres** : filtre par type (Tous / Films / Séries) et par genre, combinables avec la recherche ; affichage du nombre de résultats et message si aucun résultat
- **Écran détail** : informations complètes, synopsis, tags, bouton retour natif, bouton favori
- **Favoris** : ajout/retrait depuis la carte ou le détail, écran dédié "Mes Favoris", message si aucun favori
- **Formulaire de recommandation** : 7 champs (titre, type, genre, créateur, année, note, commentaire), validation par champ, message d'erreur et écran de confirmation

---

## Installation et lancement

```bash
npm install
npx expo start
```

Scanner le QR code avec **Expo Go** (iOS / Android), ou appuyer sur :
- `a` pour ouvrir l'émulateur Android
- `i` pour ouvrir le simulateur iOS
- `w` pour ouvrir la version web

---

## Difficultés rencontrées

- **Partage d'état des favoris entre les onglets** : l'état favori doit être cohérent entre le catalogue, l'écran détail et l'onglet Favoris. Résolu avec React Context (`FavoritesProvider`) placé à la racine du layout, sans recourir à Redux ou Zustand.
- **Filtres combinés** : faire fonctionner simultanément la recherche textuelle, le filtre par type et le filtre par genre sans recalcul inutile. Résolu avec `useMemo` sur les trois critères combinés.
- **Typage strict TypeScript** : le champ `isFavorite` présent dans les données n'était pas dans le type `Movie` du cahier des charges. Ajout explicite dans `types/movie.ts` pour éviter les erreurs TypeScript.

---

## Bonus réalisés

- **Compteur de favoris** : badge rouge sur l'onglet "Favoris" indiquant le nombre de titres en favori
- **Thème sombre / clair** : toutes les couleurs s'adaptent automatiquement au thème système via `useColorScheme` et le système de tokens `Colors`