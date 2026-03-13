# SportSee - Dashboard de Sport

## Description

SportSee est une application de tableau de bord analytique pour le coaching sportif, développée avec **React** et **React Router**. Ce projet fait partie de la formation Développeur Front-End d'**OpenClassrooms** (Projet 6).

L'application permet aux utilisateurs de suivre leur progression quotidienne (activité, sessions moyennes, types d'entraînement) ainsi que leurs apports nutritionnels via des graphiques interactifs performants.

## Fonctionnalités

- **Profil Utilisateur** : Affichage personnalisé des informations utilisateur.
- **Tableau de Bord** : 
  - Graphique à barres pour l'activité quotidienne (Poids et Calories).
  - Graphique linéaire pour la durée des sessions moyennes.
  - Graphique radar pour les types d'activités (Performance).
  - Graphique radial pour le score de progression.
- **Compteurs de Nutriments** : Suivi des calories, protéines, glucides et lipides.

## Technologies Utilisées

- **React** (v19)
- **React Router** (v7)
- **Recharts** (pour la visualisation de données)
- **Sass** (pour le stylisme)
- **Vite** (outil de build)

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Étapes d'installation

1. Clonez le dépôt :
   ```bash
   git clone [URL_DU_DEPOT]
   ```

2. Accédez au dossier du projet :
   ```bash
   cd dashboard-sport-react
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

## Utilisation

### Lancement du projet en mode développement

```bash
npm run dev
```
L'application sera accessible par défaut sur [http://localhost:5173](http://localhost:5173).

### Configuration des données (Mock vs API)

Vous pouvez choisir de faire tourner l'application avec des données locales (mockées) ou via une API réelle (backend).

Cette configuration se trouve dans le fichier `src/config.js` :

- **Pour utiliser les données locales** :
  Réglez `USE_MOCK` sur `true`.
  ```javascript
  export const USE_MOCK = true;
  ```

- **Pour utiliser l'API réelle** :
  Réglez `USE_MOCK` sur `false` et assurez-vous que le backend est lancé sur le port 8000.
  ```javascript
  export const USE_MOCK = false;
  ```

## Backend (API)

Pour faire tourner le projet avec les données réelles, vous devez installer et lancer le backend.

Le dépôt du backend et ses instructions d'installation se trouvent ici :
[https://github.com/OpenClassrooms-Student-Center/P6JS/](https://github.com/OpenClassrooms-Student-Center/P6JS/)

### Lancement rapide du backend (via Docker ou Node)

Référez-vous au `README.md` du dossier backend pour les instructions détaillées. Par défaut, le frontend attend l'API sur `http://localhost:8000`.

---
*Projet réalisé dans le cadre de la formation OpenClassrooms.*
