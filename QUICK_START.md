# 🎯 QUICK START - Connexion Rapide# ⚡ Quick Start Guide - SoukDigital



## 📧 Comptes de Test## 🚀 Démarrage en 5 Minutes



### **CLIENT** 👤### 1️⃣ Installation

```

📧 Email:    client@soukdigital.ma```bash

🔑 Password: test123# Installer les dépendances

👥 Type:     customernpm install

```

# Démarrer l'application

### **ARTISAN (Poterie)** 🏺npx expo start

``````

📧 Email:    artisan@soukdigital.ma

🔑 Password: test123### 2️⃣ Scanner le QR Code

👥 Type:     artisan

```- **iOS**: Ouvrir l'app Camera et scanner

- **Android**: Installer Expo Go, puis scanner

### **ARTISAN (Bijouterie)** 💍

```### 3️⃣ Tester l'Application

📧 Email:    fatima@soukdigital.ma

🔑 Password: test123#### Compte Test

👥 Type:     artisan```

```Email: test@soukdigital.ma

Password: test123

---Type: Client ou Artisan

```

## ⚠️ ERREUR COMMUNE

## 📱 Fonctionnalités Principales

### ❌ **INCORRECT:**

- `client@soukdigital.com` ← **.com**### En tant que CLIENT

- `artisan@soukdigital.com` ← **.com**

1. **Découvrir les Produits**

### ✅ **CORRECT:**   - Page d'accueil avec produits artisanaux

- `client@soukdigital.ma` ← **.ma**   - Recherche par nom

- `artisan@soukdigital.ma` ← **.ma**   - Filtres par catégorie (Tissage, Zellige, Poterie...)



---2. **Voir les Détails**

   - Cliquer sur un produit

## 🚀 Checklist Avant Login   - Voir description, prix, artisan

   - Choisir quantité

- [ ] Serveur API tourne (Terminal: `cd soukdigital-api; npm run dev`)   - Ajouter au panier ✅

- [ ] Email avec `.ma` (pas `.com`)

- [ ] Password: `test123`3. **Gérer le Panier**

- [ ] Type: `customer` ou `artisan`   - Icône panier avec badge (nombre d'articles)

   - Modifier quantités

---   - Supprimer articles

   - Voir total

## 🔧 Si ça ne marche pas

4. **Commander**

### **1. Vérifier le serveur API:**   - Cliquer "Passer la commande"

```bash   - Remplir adresse de livraison

cd soukdigital-api   - Choisir mode de paiement

npm run dev   - Confirmer ✅

```

5. **Explorer les Artisans**

**Doit afficher:**   - Cliquer sur profil artisan

```   - Voir biographie, spécialité

✅ Connexion MySQL réussie!   - Découvrir ses créations

🚀 Serveur démarré sur le port 3000

```### En tant que ARTISAN



### **2. Tester l'API manuellement:**1. **Dashboard**

Ouvrir dans le navigateur:   - Statistiques de ventes

```   - Nombre de commandes

http://192.168.1.101:3000/api/health   - Note moyenne

```

2. **Mes Produits**

**Doit retourner:**   - Voir liste de créations

```json   - Statistiques (vues, likes)

{"status":"ok","database":"connected"}   - Éditer (interface prête)

```

3. **Commandes**

### **3. Vérifier les utilisateurs en base:**   - Voir commandes récentes

```bash   - Statut en temps réel

cd soukdigital-api

node -e "const mysql = require('mysql2/promise'); (async () => { const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'soukdigital' }); const [users] = await conn.query('SELECT email FROM users'); console.log(users); await conn.end(); })()"## 🎨 Personnalisation

```

### Changer les Couleurs

---

```javascript

## 📱 Expo Go// src/constants/theme.js

export const COLORS = {

1. Scanner le QR code  primary: '#8B2942',  // Modifier ici

2. Attendre le chargement  gold: '#D4A853',     // Modifier ici

3. Login avec `client@soukdigital.ma` / `test123`  // ...

4. ✅};

```

---

### Ajouter des Produits

**Dernière mise à jour:** 6 janvier 2026

```javascript
// src/data/mockData.js
export const PRODUCTS = [
  // ... produits existants
  {
    id: 7,
    name: 'Mon Nouveau Produit',
    price: 600,
    category: 'Tissage',
    rating: 4.9,
    reviews: 50,
    artisan: 'Mon Atelier',
    image: 'https://votre-image-url.com/image.jpg',
    description: 'Description du produit...',
  },
];
```

### Ajouter une Catégorie

```javascript
// src/data/mockData.js
export const CATEGORIES = [
  // ... catégories existantes
  { id: 8, name: 'Ma Catégorie', icon: 'diamond' },
];
```

## 🔧 Commandes Utiles

```bash
# Démarrer en mode développement
npx expo start

# Démarrer avec clear cache
npx expo start -c

# Voir les logs
npx expo start --log-level debug

# Build iOS
npx expo build:ios

# Build Android
npx expo build:android
```

## 🐛 Problèmes Courants

### L'app ne démarre pas

```bash
# Nettoyer le cache
npx expo start -c

# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### Erreur "Cannot find module"

```bash
# Vérifier les imports
# Mauvais:
import Button from './Button'  ❌

# Bon:
import CustomButton from '../components/CustomButton'  ✅
```

### Panier ne se met pas à jour

```javascript
// Vérifier que vous utilisez le hook
import { useCart } from '../context/CartContext';

function MyComponent() {
  const { addToCart } = useCart();  // ✅
  // Ne PAS utiliser useState local ❌
}
```

## 📚 Ressources

### Documentation
- **React Native**: https://reactnative.dev
- **Expo**: https://docs.expo.dev
- **React Navigation**: https://reactnavigation.org

### Icônes (Ionicons)
Rechercher des icônes sur: https://ionic.io/ionicons

```javascript
<Ionicons 
  name="heart-outline"  // Nom de l'icône
  size={24} 
  color={COLORS.primary} 
/>
```

### Images
Utiliser Unsplash pour images gratuites:
```
https://images.unsplash.com/photo-[ID]?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
```

## ⚙️ Configuration Avancée

### Modifier le Port

```bash
# Fichier package.json
"scripts": {
  "start": "expo start --port 19001"
}
```

### Activer le Mode Sombre

```javascript
// À implementer dans src/constants/theme.js
export const DARK_COLORS = {
  background: '#1A1A1A',
  surface: '#2C2C2C',
  // ...
};
```

## 🎯 Checklist de Test

- [ ] ✅ Inscription Client
- [ ] ✅ Connexion Client
- [ ] ✅ Parcourir produits
- [ ] ✅ Rechercher un produit
- [ ] ✅ Filtrer par catégorie
- [ ] ✅ Voir détails produit
- [ ] ✅ Ajouter au panier
- [ ] ✅ Badge panier mis à jour
- [ ] ✅ Modifier quantité dans panier
- [ ] ✅ Supprimer du panier
- [ ] ✅ Voir profil artisan
- [ ] ✅ Remplir checkout
- [ ] ✅ Confirmer commande
- [ ] ✅ Se déconnecter
- [ ] ✅ Connexion Artisan
- [ ] ✅ Dashboard artisan
- [ ] ✅ Voir mes produits

## 💡 Conseils

### Performance
- Utiliser `FlatList` pour listes longues ✅
- Optimiser les images (format WebP)
- Éviter `console.log` en production

### UX
- Toujours donner du feedback (loading, success)
- Utiliser des animations douces
- Valider les formulaires

### Code
- Suivre la structure des fichiers existants
- Réutiliser les composants personnalisés
- Utiliser le thème pour la cohérence

## 🆘 Aide

### Où trouver de l'aide?

1. **README.md** - Vue d'ensemble
2. **DEVELOPMENT_GUIDE.md** - Guide complet
3. **Ce fichier** - Démarrage rapide

### Créer une Issue

Si vous trouvez un bug:
1. Décrire le problème
2. Étapes pour reproduire
3. Version d'Expo/React Native
4. Captures d'écran si possible

---

**Bon développement! 🚀**

**Questions?** Consultez le DEVELOPMENT_GUIDE.md pour plus de détails.
