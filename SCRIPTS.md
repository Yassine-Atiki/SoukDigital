# 🛠️ Scripts Utiles - SoukDigital

## 📱 Commandes de Développement

### Démarrage
```bash
# Démarrer en mode développement
npm start

# Démarrer avec clear cache
npm run start:clean

# Mode iOS
npm run ios

# Mode Android
npm run android

# Mode Web
npm run web
```

### Nettoyage
```bash
# Nettoyer le cache Metro
npx expo start -c

# Nettoyer node_modules
rm -rf node_modules && npm install

# Nettoyer tout
rm -rf node_modules package-lock.json && npm install
```

## 🧪 Tests

```bash
# Exécuter les tests (à configurer)
npm test

# Tests avec coverage
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

## 📦 Build Production

### iOS
```bash
# Build pour App Store
eas build --platform ios

# Build locale
eas build --platform ios --local

# Créer un IPA
expo build:ios
```

### Android
```bash
# Build pour Play Store
eas build --platform android

# Build APK
eas build --platform android --profile preview

# Build locale
eas build --platform android --local
```

## 🔍 Debugging

```bash
# Afficher les logs
npx react-native log-android
npx react-native log-ios

# Ouvrir React DevTools
npx react-devtools

# Debug avec Flipper
npx react-native doctor
```

## 📊 Analyse

```bash
# Analyser la taille du bundle
npx expo-cli customize:web

# Vérifier les dépendances
npm outdated

# Audit de sécurité
npm audit

# Corriger automatiquement
npm audit fix
```

## 🎨 Code Quality

```bash
# Linter (à configurer)
npm run lint

# Formater le code avec Prettier
npm run format

# Type checking (si TypeScript)
npm run type-check
```

## 📱 Simulateurs

### iOS
```bash
# Lister les simulateurs
xcrun simctl list devices

# Ouvrir Simulator
open -a Simulator

# Installer sur simulateur
npx react-native run-ios
```

### Android
```bash
# Lister les AVD
emulator -list-avds

# Démarrer un AVD
emulator -avd Pixel_5_API_31

# Installer sur émulateur
npx react-native run-android
```

## 🚀 Déploiement

### Expo
```bash
# Publier sur Expo
expo publish

# Créer un build
eas build --platform all

# Soumettre à App Store
eas submit --platform ios

# Soumettre à Play Store
eas submit --platform android
```

### Over-the-Air Updates
```bash
# Publier une mise à jour OTA
expo publish --release-channel production

# Vérifier les updates
expo updates
```

## 🔐 Configuration

### Variables d'environnement
```bash
# Créer .env
cp .env.example .env

# Variables de production
export NODE_ENV=production
export API_URL=https://api.soukdigital.ma
```

### Secrets
```bash
# Ajouter un secret EAS
eas secret:create --scope project --name API_KEY --value xxx

# Lister les secrets
eas secret:list

# Supprimer un secret
eas secret:delete --name API_KEY
```

## 📱 Device Testing

```bash
# Tester sur appareil physique iOS
expo start --ios

# Tester sur appareil physique Android
expo start --android

# Générer un QR code
expo start --tunnel
```

## 🗄️ Base de Données (Future)

```bash
# Migrations (Supabase/Firebase)
npm run db:migrate

# Seed data
npm run db:seed

# Reset database
npm run db:reset
```

## 📈 Performance

```bash
# Profiler React
npm run profile

# Analyser le bundle
npx react-native-bundle-visualizer

# Mesurer les performances
npm run perf
```

## 🎯 Scripts Personnalisés

### Ajouter dans package.json
```json
{
  "scripts": {
    "start": "expo start",
    "start:clean": "expo start -c",
    "ios": "expo start --ios",
    "android": "expo start --android",
    "web": "expo start --web",
    "eject": "expo eject",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write \"**/*.{js,jsx,json,md}\"",
    "build:ios": "eas build --platform ios",
    "build:android": "eas build --platform android",
    "deploy": "expo publish"
  }
}
```

## 🔧 Utilitaires

### Générer des icônes
```bash
# Générer toutes les icônes
npm run generate:icons

# Générer splash screens
npm run generate:splash
```

### Optimiser les images
```bash
# Installer imagemin
npm install -g imagemin-cli

# Optimiser
imagemin assets/*.png --out-dir=assets/optimized
```

## 📝 Documentation

```bash
# Générer documentation (JSDoc)
npm run docs

# Ouvrir documentation
npm run docs:serve
```

## 🌐 Backend (Future)

```bash
# Démarrer serveur local
npm run server

# Seed database
npm run db:seed

# Migrer base de données
npm run db:migrate

# Reset tout
npm run reset
```

## 📱 Notifications

```bash
# Tester notification push
expo push:android:upload
expo push:ios:upload

# Envoyer notification test
curl -H "Content-Type: application/json" -X POST \
  -d '{"to":"ExponentPushToken[...]","title":"Test","body":"Message"}' \
  https://exp.host/--/api/v2/push/send
```

## 🎬 Animations

```bash
# Tester performances animations
npm run perf:animations

# Debug Reanimated
REANIMATED_PLUGIN=true npm start
```

## 🔄 Git Hooks (Husky)

```bash
# Installer Husky
npm install --save-dev husky

# Initialiser
npx husky install

# Ajouter pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
```

## 📊 Analytics

```bash
# Vérifier analytics
npm run analytics:check

# Envoyer événement test
npm run analytics:test
```

---

## 💡 Astuces

### Raccourcis Expo Dev Menu
- **iOS Simulator**: `Cmd + D`
- **Android Emulator**: `Cmd + M` (Mac) ou `Ctrl + M` (Windows)
- **Appareil physique**: Secouer le téléphone

### Clear Cache Complet
```bash
# Tout nettoyer d'un coup
rm -rf node_modules package-lock.json .expo .expo-shared && \
npm install && \
npx expo start -c
```

### Debug Mode
```bash
# Activer remote debugging
Dans Dev Menu → Debug Remote JS

# React Native Debugger
open "rndebugger://set-debugger-loc?host=localhost&port=19000"
```

---

**Note**: Certains scripts nécessitent une configuration supplémentaire.
