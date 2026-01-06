# 🧪 Guide de Test - SoukDigital

## 📋 Checklist de test complète

Suivez ce guide pour tester toutes les fonctionnalités de l'application.

---

## 1️⃣ Authentification

### LoginScreen
- [ ] Ouvrir l'application
- [ ] Vérifier l'affichage du logo et des motifs marocains
- [ ] Entrer un email invalide → Vérifier le message d'erreur
- [ ] Entrer un mot de passe court → Vérifier le message d'erreur
- [ ] Se connecter avec email: `user@test.com` / mot de passe: `password`
- [ ] Vérifier la redirection vers HomeScreen

### SignUpScreen
- [ ] Cliquer sur "Créer un compte"
- [ ] Vérifier l'animation du RoleSelector
- [ ] Sélectionner "Client" puis "Artisan"
- [ ] Remplir le formulaire
- [ ] Vérifier la création du compte
- [ ] Vérifier la redirection selon le rôle

---

## 2️⃣ Navigation Client

### HomeScreen
- [ ] Vérifier l'affichage de "Bonjour, Digital Souk"
- [ ] Voir le badge de notification (point rouge)
- [ ] **Cliquer sur la barre de recherche** → Redirection vers SearchScreen
- [ ] Défiler les catégories horizontalement
- [ ] Cliquer sur "Cuisine", "Décoration", "Mode", etc.
- [ ] Vérifier le filtrage des produits
- [ ] Cliquer sur "Tout" pour tout afficher
- [ ] Scroller la grille de produits
- [ ] Cliquer sur un produit → ProductDetailScreen

### SearchScreen (NOUVEAU ✨)
- [ ] Vérifier l'autoFocus sur la barre de recherche
- [ ] Voir les "Recherches populaires"
- [ ] Cliquer sur "Tajine" → Voir les résultats
- [ ] Taper "tapis" → Voir le compteur de résultats
- [ ] Taper "xyz" → Voir l'état vide
- [ ] Cliquer sur un résultat → ProductDetailScreen
- [ ] Cliquer sur X pour effacer
- [ ] Retour avec le bouton ←

### ProductDetailScreen
- [ ] Vérifier l'affichage de l'image du produit
- [ ] Voir le nom, le prix, la note (étoiles)
- [ ] Lire la description complète
- [ ] Cliquer sur - pour diminuer la quantité (min: 1)
- [ ] Cliquer sur + pour augmenter la quantité
- [ ] **Cliquer sur "Ajouter au panier"**
- [ ] Vérifier l'Alert "Produit ajouté au panier"
- [ ] Vérifier que le badge du panier s'incrémente
- [ ] Cliquer sur le nom de l'artisan → ArtisanProfileScreen

### CartScreen
- [ ] Voir les articles ajoutés
- [ ] Vérifier le badge sur l'icône (nombre d'articles)
- [ ] Cliquer sur + pour augmenter la quantité
- [ ] Cliquer sur - pour diminuer
- [ ] Cliquer sur la poubelle → Alert de confirmation
- [ ] Confirmer la suppression
- [ ] Vérifier la mise à jour du total
- [ ] Ajouter plusieurs produits
- [ ] **Cliquer sur "Commander"** → CheckoutScreen

### CheckoutScreen
- [ ] Voir le récapitulatif de la commande
- [ ] Vérifier les articles, quantités, prix
- [ ] Voir le sous-total
- [ ] Voir les frais de livraison (50 DH)
- [ ] Voir le total final
- [ ] Vérifier l'adresse de livraison
- [ ] Vérifier le mode de paiement
- [ ] **Cliquer sur "Confirmer la commande"**
- [ ] Vérifier l'Alert "Commande confirmée"
- [ ] Vérifier que le panier est vidé

---

## 3️⃣ Profil utilisateur

### ProfileScreen
- [ ] Aller sur l'onglet "Profil"
- [ ] Voir l'avatar, le nom, l'email
- [ ] **Cliquer sur l'icône crayon** → EditProfileScreen
- [ ] Revenir et tester chaque menu:

#### Menu "Mon Profil"
- [ ] Cliquer → EditProfileScreen

#### Menu "Mes adresses"
- [ ] Cliquer → AddressesScreen

#### Menu "Moyens de paiement"
- [ ] Cliquer → PaymentMethodsScreen

#### Menu "Favoris"
- [ ] Cliquer → FavoritesScreen

#### Menu "Paramètres"
- [ ] Cliquer → SettingsScreen

#### Menu "Aide & Support"
- [ ] Cliquer → Alert avec email de contact

### EditProfileScreen (NOUVEAU ✨)
- [ ] Voir la photo de profil
- [ ] Cliquer sur le bouton caméra (UI)
- [ ] Modifier le nom
- [ ] Modifier l'email
- [ ] Entrer un numéro de téléphone
- [ ] Écrire une bio
- [ ] **Cliquer sur "Enregistrer"**
- [ ] Vérifier l'Alert "Profil mis à jour"
- [ ] Vérifier le retour au ProfileScreen

### AddressesScreen (NOUVEAU ✨)
- [ ] Voir 2 adresses (Domicile, Bureau)
- [ ] Vérifier l'adresse "Par défaut"
- [ ] Cliquer sur l'icône check d'une autre adresse
- [ ] Vérifier le changement d'adresse par défaut
- [ ] Cliquer sur la poubelle
- [ ] Confirmer la suppression
- [ ] Vérifier que l'adresse disparaît
- [ ] Cliquer sur "Ajouter une nouvelle adresse" (Alert)

### PaymentMethodsScreen (NOUVEAU ✨)
- [ ] Voir 2 cartes bancaires
- [ ] Vérifier le badge "Par défaut"
- [ ] Voir les icônes Visa/Mastercard
- [ ] Cliquer sur l'icône check (carte non-défaut)
- [ ] Vérifier l'Alert "Définie par défaut"
- [ ] Cliquer sur la poubelle
- [ ] Confirmer la suppression
- [ ] Vérifier que la carte disparaît
- [ ] Voir le message de sécurité en bas
- [ ] Cliquer sur "Ajouter une carte bancaire" (Alert)

### FavoritesScreen (NOUVEAU ✨)
- [ ] Voir 3 produits favoris
- [ ] Cliquer sur "Retirer" sur un produit
- [ ] Vérifier que le produit disparaît
- [ ] Cliquer sur un produit → ProductDetailScreen
- [ ] Retirer tous les favoris
- [ ] Voir l'état vide
- [ ] Cliquer sur "Découvrir les produits" → Retour Home

### SettingsScreen (NOUVEAU ✨)

#### Section Notifications
- [ ] Toggle "Notifications push" ON/OFF
- [ ] Toggle "Notifications par email" ON/OFF

#### Section Apparence
- [ ] Toggle "Mode Sombre" ON/OFF (UI)
- [ ] Cliquer sur "Langue" → Affiche "Français"

#### Section Compte
- [ ] **Cliquer sur "Historique des commandes"** → OrderHistoryScreen
- [ ] Cliquer sur "Changer le mot de passe" (console log)
- [ ] Cliquer sur "Confidentialité" (console log)
- [ ] Cliquer sur "Gestion du compte" (console log)

#### Section À propos
- [ ] Cliquer sur "Conditions d'utilisation" (console log)
- [ ] Cliquer sur "À propos de SoukDigital" (console log)
- [ ] Vérifier "Version: 2.0.0"

### OrderHistoryScreen (NOUVEAU ✨)
- [ ] Voir 3 commandes par défaut (tab "Toutes")
- [ ] Vérifier les statuts avec icônes:
  - ✅ Livrée (vert)
  - 🚗 En transit (bleu)
  - ⏰ En préparation (orange)
- [ ] Cliquer sur "En préparation" → Voir 1 commande
- [ ] Cliquer sur "En transit" → Voir 1 commande
- [ ] Cliquer sur "Livrées" → Voir 1 commande
- [ ] Pour chaque commande, vérifier:
  - Numéro (CMD001, etc.)
  - Date
  - Articles avec images
  - Total
  - Bouton "Détails"
- [ ] Retour avec le bouton ←

### Déconnexion
- [ ] Revenir au ProfileScreen
- [ ] Scroller en bas
- [ ] **Cliquer sur "Se déconnecter"**
- [ ] Vérifier l'Alert de confirmation
- [ ] Confirmer
- [ ] Vérifier la redirection vers LoginScreen
- [ ] Vérifier que le panier est vidé

---

## 4️⃣ Navigation Artisan

### Connexion en tant qu'Artisan
- [ ] Se déconnecter
- [ ] S'inscrire avec le rôle "Artisan"
- [ ] Ou utiliser un compte artisan existant

### ArtisanDashboardScreen
- [ ] Vérifier l'onglet "Dashboard"
- [ ] Voir les statistiques:
  - Ventes du mois
  - Commandes en cours
  - Produits actifs
  - Taux de satisfaction
- [ ] Voir le graphique des ventes
- [ ] Voir les tendances (pourcentages)
- [ ] Scroller les dernières commandes
- [ ] Cliquer sur "Voir mon profil" → ArtisanProfileScreen

### ArtisanProfileScreen
- [ ] Voir la bannière et l'avatar
- [ ] Voir le nom de l'artisan
- [ ] Voir la ville et les membres
- [ ] Vérifier les statistiques (ventes, produits, avis)
- [ ] Scroller la galerie de produits
- [ ] Lire la section "À propos"
- [ ] Voir les boutons de contact (Téléphone, Email)

### Navigation tabs
- [ ] Vérifier que les tabs sont: Dashboard / Orders / Profile
- [ ] Cliquer sur "Orders" (placeholder)
- [ ] Cliquer sur "Profile" → Même ProfileScreen que client

---

## 5️⃣ Tests de flux complets

### Flux d'achat complet
1. [ ] Se connecter en tant que client
2. [ ] Aller sur HomeScreen
3. [ ] Cliquer sur la recherche
4. [ ] Chercher "tapis"
5. [ ] Cliquer sur un tapis
6. [ ] Ajouter au panier (quantité 2)
7. [ ] Retourner à Home
8. [ ] Ajouter un autre produit
9. [ ] Aller au panier
10. [ ] Vérifier les 2 articles
11. [ ] Commander
12. [ ] Confirmer la commande
13. [ ] Aller dans Paramètres → Historique des commandes
14. [ ] Vérifier que la nouvelle commande apparaît

### Flux de personnalisation profil
1. [ ] Aller sur Profil
2. [ ] Éditer le profil
3. [ ] Modifier toutes les infos
4. [ ] Sauvegarder
5. [ ] Aller dans Mes adresses
6. [ ] Changer l'adresse par défaut
7. [ ] Aller dans Moyens de paiement
8. [ ] Supprimer une carte
9. [ ] Revenir au profil
10. [ ] Vérifier que tout est à jour

### Flux de favoris
1. [ ] Aller sur HomeScreen
2. [ ] Cliquer sur un produit
3. [ ] (Note: Le bouton favoris est UI only pour l'instant)
4. [ ] Aller dans Favoris depuis le Profil
5. [ ] Voir les favoris mock
6. [ ] Retirer un favori
7. [ ] Cliquer sur un produit favori
8. [ ] Ajouter au panier

---

## 6️⃣ Tests de design

### Motifs Marocains
- [ ] Vérifier les motifs sur LoginScreen
- [ ] Vérifier les motifs sur SignUpScreen
- [ ] Vérifier les dividers MoroccanDivider

### Couleurs Premium
- [ ] Vérifier le bordeaux (#8B2942) sur les boutons
- [ ] Vérifier l'or (#D4A853) sur les accents
- [ ] Vérifier l'ivoire (#FAF8F5) sur les fonds

### Animations
- [ ] TouchableOpacity avec activeOpacity={0.7}
- [ ] Transitions entre écrans
- [ ] Feedback visuel sur les boutons

### Responsive
- [ ] Tester en mode portrait
- [ ] Tester en mode paysage (si possible)
- [ ] Vérifier le scroll sur tous les écrans

---

## 7️⃣ Tests de contexte

### AuthContext
- [ ] Se connecter → `isAuthenticated` = true
- [ ] Vérifier `user.name` et `user.email`
- [ ] Modifier le profil → Vérifier `updateProfile()`
- [ ] Se déconnecter → `isAuthenticated` = false

### CartContext
- [ ] Ajouter un produit → Vérifier `itemCount`
- [ ] Ajouter le même produit → Vérifier que la quantité s'incrémente
- [ ] Modifier la quantité → Vérifier `updateQuantity()`
- [ ] Supprimer un article → Vérifier `removeFromCart()`
- [ ] Commander → Vérifier `clearCart()`
- [ ] Vérifier que le badge se met à jour partout

---

## 8️⃣ Tests d'erreurs

### Formulaires
- [ ] Email invalide → Voir le message d'erreur
- [ ] Mot de passe court → Voir le message d'erreur
- [ ] Champs vides → Voir les messages d'erreur

### Panier vide
- [ ] Aller au panier sans articles
- [ ] Vérifier l'état vide
- [ ] Cliquer sur "Découvrir les produits"

### Recherche sans résultats
- [ ] Chercher "xyz123"
- [ ] Vérifier l'état vide
- [ ] Voir le message "Aucun résultat"

---

## ✅ Résultat attendu

À la fin de ces tests, vous devez avoir validé:

- ✅ **16 écrans** fonctionnels
- ✅ **Navigation** fluide entre tous les écrans
- ✅ **AuthContext** opérationnel
- ✅ **CartContext** opérationnel
- ✅ **Tous les boutons** cliquables et fonctionnels
- ✅ **Design Marocain** présent partout
- ✅ **Aucune erreur** dans la console

---

## 🐛 Rapport de bugs

Si vous trouvez un bug, notez:
1. L'écran concerné
2. L'action effectuée
3. Le comportement attendu
4. Le comportement observé
5. Message d'erreur (si applicable)

---

## 📱 Commandes de test

```bash
# Lancer l'application
npx expo start

# Lancer avec clear cache
npx expo start --clear

# Vérifier les erreurs
npx expo start --dev-client
```

---

**Bonne chance pour les tests ! 🚀**
