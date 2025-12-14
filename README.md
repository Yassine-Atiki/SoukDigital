# 🎨 Souk Digital - Artisanat du Maroc

<div align="center">

![Version](https://img.shields.io/badge/version-2.0-D97853)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB)
![Expo](https://img.shields.io/badge/Expo-~54.0-000020)
![Style](https://img.shields.io/badge/Style-Marocain%20Moderne-D4AF37)

**Application mobile moderne inspirée de l'artisanat marocain traditionnel**

[Fonctionnalités](#-fonctionnalités) •
[Installation](#-installation) •
[Documentation](#-documentation) •
[Design](#-design-marocain-moderne)

</div>

---

## 📱 Aperçu

Souk Digital est une application React Native Expo qui célèbre l'artisanat marocain avec un design moderne et élégant. L'interface combine des éléments traditionnels marocains (zellige, arcs, motifs géométriques) avec une expérience utilisateur contemporaine.

### ✨ Points Forts

- 🎨 **Design Marocain Authentique** - Palette de couleurs inspirée des souks, zellige et jardins
- 🏛️ **Motifs Traditionnels** - Étoiles à 8 branches, arcs, motifs géométriques
- ✨ **Accents Dorés** - Ornements subtils inspirés de l'artisanat
- 📱 **100% React Native** - Compatible iOS & Android
- 🚀 **Performance Optimisée** - Pas de bibliothèques externes lourdes
- 🎯 **Composants Réutilisables** - Architecture modulaire

---

## 🎨 Design Marocain Moderne

### Palette de Couleurs

| Couleur | Hex | Inspiration |
|---------|-----|-------------|
| 🔥 Terre Cuite | `#D97853` | Poteries marocaines |
| 🌿 Vert Émeraude | `#0D4D4D` | Zellige traditionnels |
| ✨ Or | `#D4AF37` | Motifs et décorations |
| 💙 Bleu Majorelle | `#5B7BDB` | Jardin Majorelle |
| 🌟 Safran | `#F4B942` | Épices du souk |
| 🍃 Menthe | `#98D8C8` | Thé à la menthe |

### Éléments de Design

- **Arcs Marocains** - Border radius de 40px pour simuler les arcs traditionnels
- **Motifs Zellige** - Composant `MoroccanPattern` avec 4 variantes
- **Coins Décoratifs** - Ornements aux angles des boutons
- **Accents Dorés** - Bordures et lignes décoratives
- **Ombres Colorées** - Profondeur avec teintes terre cuite

---

## 🚀 Fonctionnalités

### Écrans Disponibles

#### 🔐 Login Screen
- Formulaire de connexion élégant
- Validation des champs email/mot de passe
- Lien "Mot de passe oublié"
- Motifs décoratifs marocains en arrière-plan
- État de chargement

#### 📝 Sign Up Screen
- Inscription avec validation complète
- Confirmation du mot de passe
- Design cohérent avec LoginScreen
- Variantes de motifs pour différenciation

### Composants Personnalisés

#### `CustomButton`
- Variantes primaire et secondaire
- Coins décoratifs inspirés des cadres marocains
- Bordure dorée subtile
- Ombre colorée
- État de chargement intégré

#### `CustomInput`
- Label avec ornement doré
- Accent doré au focus (barre verticale)
- Validation d'erreur stylisée
- Support de tous les types de clavier
- Gestion du texte sécurisé

#### `MoroccanPattern` ⭐
Motifs décoratifs avec 4 variantes :
- `default` : Cercles concentriques
- `star` : Étoile à 8 branches
- `arch` : Arcs marocains
- `geometric` : Grille zellige

#### `MoroccanDivider` ⭐
Séparateurs élégants avec 4 styles :
- `simple` : Ligne minimaliste
- `ornate` : Diamant central
- `dots` : Trois points
- `geometric` : Motifs carrés

---

## 📦 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Expo CLI
- iOS Simulator (Mac) ou Android Studio

### Étapes d'Installation

```bash
# 1. Cloner ou naviguer vers le projet
cd SoukDigital

# 2. Installer les dépendances
npm install
# ou
yarn install

# 3. Démarrer le serveur Expo
npm start
# ou
yarn start

# 4. Lancer sur un émulateur/appareil
# iOS
npm run ios

# Android
npm run android

# Web (pour prévisualisation)
npm run web
```

---

## 📁 Structure du Projet

```
SoukDigital/
├── App.js                      # Point d'entrée
├── index.js                    # Export principal
├── package.json                # Dépendances
├── app.json                    # Configuration Expo
│
├── assets/                     # Images et assets
│
├── src/
│   ├── components/             # Composants réutilisables
│   │   ├── CustomButton.js     # Bouton stylisé
│   │   ├── CustomInput.js      # Input avec ornements
│   │   ├── MoroccanPattern.js  # Motifs décoratifs ⭐
│   │   └── MoroccanDivider.js  # Séparateurs élégants ⭐
│   │
│   ├── constants/
│   │   └── theme.js            # Système de design complet
│   │
│   ├── navigation/
│   │   └── AuthNavigator.js    # Navigation authentification
│   │
│   └── screens/
│       ├── LoginScreen.js      # Écran de connexion
│       └── SignUpScreen.js     # Écran d'inscription
│
├── STYLE_GUIDE.md             # Guide de style détaillé
├── CHANGELOG.md               # Historique des modifications
├── EXAMPLES.md                # Exemples d'utilisation
└── VISUAL_SUMMARY.md          # Résumé visuel ASCII
```

---

## 🎯 Utilisation Rapide

### Importer les Composants

```jsx
import CustomButton from './src/components/CustomButton';
import CustomInput from './src/components/CustomInput';
import MoroccanPattern from './src/components/MoroccanPattern';
import MoroccanDivider from './src/components/MoroccanDivider';
import { COLORS, SPACING, FONTS } from './src/constants/theme';
```

### Créer un Bouton

```jsx
<CustomButton 
  title="Se Connecter" 
  onPress={handleLogin}
  isLoading={loading}
/>
```

### Créer un Input

```jsx
<CustomInput
  label="Email"
  placeholder="artisan@souk.ma"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  keyboardType="email-address"
/>
```

### Ajouter des Motifs

```jsx
<View style={styles.header}>
  <MoroccanPattern variant="star" style={{ top: -20, right: -30 }} />
  <Text style={styles.title}>Mon Titre</Text>
</View>
```

---

## 📚 Documentation

Documentation complète disponible dans :

- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - Guide complet du système de design
- **[EXAMPLES.md](./EXAMPLES.md)** - Exemples pratiques d'utilisation
- **[CHANGELOG.md](./CHANGELOG.md)** - Historique détaillé des modifications
- **[VISUAL_SUMMARY.md](./VISUAL_SUMMARY.md)** - Résumé visuel ASCII

### Thème Configuration

Le fichier `src/constants/theme.js` contient :
- **COLORS** : 25+ couleurs organisées
- **SPACING** : Système d'espacement (4-64px)
- **FONTS** : Tailles modulaires (12-42px)
- **SHADOWS** : 4 niveaux d'élévation
- **BORDER_RADIUS** : Rayons prédéfinis
- **PATTERNS** : Configuration des motifs

---

## 🎨 Exemples Visuels

### Header avec Motifs

```jsx
<View style={styles.header}>
  <MoroccanPattern variant="star" style={{ top: -40, right: -30 }} />
  <Text style={styles.title}>Souk Digital</Text>
  <View style={styles.titleUnderline} />
  <Text style={styles.subtitle}>✦ Artisanat du Maroc ✦</Text>
</View>
```

### Formulaire Complet

```jsx
<View style={styles.form}>
  <CustomInput
    label="Email"
    value={email}
    onChangeText={setEmail}
    placeholder="votre@email.com"
  />
  
  <CustomInput
    label="Mot de passe"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    placeholder="••••••••"
  />
  
  <MoroccanDivider variant="ornate" />
  
  <CustomButton 
    title="Se Connecter"
    onPress={handleSubmit}
  />
</View>
```

---

## 🛠️ Technologies Utilisées

- **React Native** 0.81.5 - Framework mobile
- **Expo** ~54.0 - Plateforme de développement
- **React Navigation** 7.x - Navigation
- **React** 19.1.0 - Bibliothèque UI

**Aucune dépendance UI externe** - Tous les composants sont créés en React Native pur pour :
- ⚡ Performance maximale
- 📦 Bundle size minimal
- 🎨 Personnalisation totale
- 🔧 Maintenance simplifiée

---

## 🎯 Philosophie de Design

> *"Allier la modernité du digital à la richesse de l'artisanat marocain"*

Notre approche équilibre :

| Tradition | ↔ | Modernité |
|-----------|---|-----------|
| Motifs zellige | ↔ | Interface épurée |
| Arcs marocains | ↔ | Border radius modernes |
| Couleurs authentiques | ↔ | Palette contemporaine |
| Ornements subtils | ↔ | Minimalisme fonctionnel |

---

## 🚀 Performance

- ✅ **Pas d'images lourdes** - Tout en CSS/React Native
- ✅ **Composants optimisés** - StyleSheet.create()
- ✅ **Bundle size minimal** - Pas de bibliothèques UI
- ✅ **Animations natives** - Performance 60 FPS
- ✅ **Lazy loading ready** - Architecture modulaire

---

## 🌍 Compatibilité

| Plateforme | Version Minimale | Status |
|------------|------------------|--------|
| iOS | 12.0+ | ✅ Supporté |
| Android | 6.0+ (API 23) | ✅ Supporté |
| Web | Moderne browsers | ✅ Compatible |

---

## 📝 Roadmap

### Version 2.1 (À venir)
- [ ] Mode sombre avec palette marocaine de nuit
- [ ] Animations avancées (Animated API)
- [ ] Plus de variantes MoroccanPattern
- [ ] Composant Card décoré
- [ ] Header avec effet parallax

### Version 3.0 (Future)
- [ ] Écrans produits artisanaux
- [ ] Panier d'achat
- [ ] Profil utilisateur
- [ ] Liste de favoris
- [ ] Intégration API backend

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour proposer des changements :

1. Respecter le guide de style (`STYLE_GUIDE.md`)
2. Utiliser les couleurs du thème
3. Maintenir la cohérence visuelle marocaine
4. Documenter les nouveaux composants
5. Tester sur iOS et Android

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

## 🎨 Crédits & Inspiration

### Inspiration Design
- **Zellige de Fès** - Mosaïques géométriques traditionnelles
- **Jardin Majorelle** - Palette de couleurs iconique
- **Riads marocains** - Architecture avec arcs et cours
- **Souks traditionnels** - Couleurs chaudes et ambiance
- **Artisanat local** - Détails et ornements délicats

### Resources
- Palette de couleurs authentiques du Maroc
- Motifs géométriques islamiques
- Architecture marocaine traditionnelle
- Design moderne et responsive

---

## 📞 Contact & Support

Pour toute question ou suggestion concernant le design ou l'implémentation :

- 📧 Email : support@soukdigital.ma (fictif)
- 🐛 Issues : Utilisez le système d'issues GitHub
- 📖 Documentation : Voir les fichiers MD du projet

---

<div align="center">

**Fait avec ❤️ pour l'artisanat marocain**

```
╔═══════════════════════════════════╗
║                                   ║
║      🎨 Souk Digital 2.0 🎨      ║
║      ═══════════════════          ║
║   ✦ Artisanat du Maroc ✦        ║
║                                   ║
╚═══════════════════════════════════╝
```

[⬆ Retour en haut](#-souk-digital---artisanat-du-maroc)

</div>
