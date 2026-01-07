# 📊 INSTRUCTIONS SQL - SOUKDIGITAL

## 🎯 ÉTAPES À SUIVRE

### 1️⃣ Ouvrir phpMyAdmin
- URL: **http://localhost/phpmyadmin**
- Connexion automatique (root sans mot de passe)

### 2️⃣ Sélectionner la base de données
- Cliquer sur **`soukdigital`** dans la liste à gauche

### 3️⃣ Aller dans l'onglet SQL
- Cliquer sur l'onglet **"SQL"** en haut

### 4️⃣ Copier et exécuter le schéma
- Ouvrir le fichier: **`soukdigital-api/database/schema.sql`**
- Copier **TOUT** le contenu
- Coller dans la zone de texte de phpMyAdmin
- Cliquer sur **"Exécuter"** (bouton en bas à droite)

### 5️⃣ Vérifier la création
Vous devriez voir:
- ✅ 8 tables créées
- ✅ Données de test insérées
- ✅ Message de succès

---

## 📋 TABLES CRÉÉES (8)

| # | Table | Description | Lignes Test |
|---|-------|-------------|-------------|
| 1 | **users** | Utilisateurs (clients + artisans) | 3 |
| 2 | **products** | Produits artisanaux | 5 |
| 3 | **orders** | Commandes | 3 |
| 4 | **order_items** | Articles des commandes | 5 |
| 5 | **favorites** | Produits favoris | 2 |
| 6 | **addresses** | Adresses de livraison | 1 |
| 7 | **payment_methods** | Méthodes de paiement | 0 |
| 8 | **reviews** | Avis produits | 0 |

---

## 👥 COMPTES DE TEST CRÉÉS

### 🛍️ Client
```
Email: client@soukdigital.ma
Mot de passe: test123
Type: customer
```

### 🎨 Artisan 1 (Potier)
```
Email: artisan@soukdigital.ma
Mot de passe: test123
Type: artisan
Spécialité: Poterie
```

### 💍 Artisan 2 (Bijoutière)
```
Email: fatima@soukdigital.ma
Mot de passe: test123
Type: artisan
Spécialité: Bijouterie
```

---

## 🎨 PRODUITS DE TEST CRÉÉS (5)

| ID | Nom | Prix | Catégorie | Artisan |
|----|-----|------|-----------|---------|
| 1 | Tajine Traditionnel | 300 MAD | Poterie | artisan@soukdigital.ma |
| 2 | Vase Berbère | 250 MAD | Poterie | artisan@soukdigital.ma |
| 3 | Collier en Argent | 450 MAD | Bijouterie | fatima@soukdigital.ma |
| 4 | Boucles d'Oreilles | 180 MAD | Bijouterie | fatima@soukdigital.ma |
| 5 | Assiette Décorée | 120 MAD | Poterie | artisan@soukdigital.ma |

---

## 📦 COMMANDES DE TEST (3)

- **Commande #1:** 2 Tajines + 1 Vase = 850 MAD (client@soukdigital.ma)
- **Commande #2:** 1 Collier + 2 Boucles d'Oreilles = 810 MAD (client@soukdigital.ma)
- **Commande #3:** 1 Assiette = 120 MAD (client@soukdigital.ma)

---

## ✅ VÉRIFICATION APRÈS EXÉCUTION

### Dans phpMyAdmin, vérifiez:

#### 1. Table `users` (3 lignes)
```sql
SELECT id, full_name, email, user_type FROM users;
```

**Résultat attendu:**
```
id | full_name          | email                     | user_type
---|--------------------|---------------------------|----------
1  | Client Test        | client@soukdigital.ma     | customer
2  | Ahmed Artisan      | artisan@soukdigital.ma    | artisan
3  | Fatima Bennani     | fatima@soukdigital.ma     | artisan
```

#### 2. Table `products` (5 lignes)
```sql
SELECT id, name, price, category FROM products;
```

**Résultat attendu:**
```
id | name                    | price  | category
---|-------------------------|--------|----------
1  | Tajine Traditionnel     | 300.00 | Poterie
2  | Vase Berbère            | 250.00 | Poterie
3  | Collier en Argent       | 450.00 | Bijouterie
4  | Boucles d'Oreilles      | 180.00 | Bijouterie
5  | Assiette Décorée        | 120.00 | Poterie
```

#### 3. Table `orders` (3 lignes)
```sql
SELECT id, order_number, total_amount, status FROM orders;
```

**Résultat attendu:**
```
id | order_number      | total_amount | status
---|-------------------|--------------|--------
1  | CMD1737849...     | 850.00       | pending
2  | CMD1737849...     | 810.00       | pending
3  | CMD1737849...     | 120.00       | delivered
```

---

## 🔄 COMMANDES UTILES

### Voir toutes les tables
```sql
SHOW TABLES;
```

### Compter les lignes dans chaque table
```sql
SELECT 
    'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'favorites', COUNT(*) FROM favorites
UNION ALL
SELECT 'addresses', COUNT(*) FROM addresses;
```

### Voir la structure d'une table
```sql
DESCRIBE users;
DESCRIBE products;
DESCRIBE orders;
```

### Voir les produits avec le nom de l'artisan
```sql
SELECT 
    p.name as produit,
    p.price as prix,
    p.category as categorie,
    u.full_name as artisan
FROM products p
JOIN users u ON p.artisan_id = u.id
ORDER BY p.id;
```

### Voir les commandes avec les détails
```sql
SELECT 
    o.order_number,
    u.full_name as client,
    o.total_amount,
    o.status,
    o.created_at
FROM orders o
JOIN users u ON o.customer_id = u.id
ORDER BY o.created_at DESC;
```

---

## 🗑️ RÉINITIALISER LA BASE DE DONNÉES

Si vous voulez repartir de zéro:

### Option 1: Supprimer et recréer la base
```sql
DROP DATABASE IF EXISTS soukdigital;
CREATE DATABASE soukdigital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE soukdigital;
-- Puis exécuter schema.sql
```

### Option 2: Supprimer uniquement les tables
```sql
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS payment_methods;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;
-- Puis exécuter schema.sql
```

---

## 🚨 EN CAS D'ERREUR

### Erreur: "Table already exists"
**Solution:** Les tables existent déjà. Deux options:
1. Supprimer les tables existantes (voir section ci-dessus)
2. Modifier `schema.sql` en remplaçant `CREATE TABLE` par `CREATE TABLE IF NOT EXISTS`

### Erreur: "Foreign key constraint fails"
**Solution:** 
1. Désactiver temporairement les foreign keys:
```sql
SET FOREIGN_KEY_CHECKS = 0;
-- Votre code SQL ici
SET FOREIGN_KEY_CHECKS = 1;
```

### Erreur: "Access denied"
**Solution:**
- Vérifier que vous utilisez bien le compte `root`
- Vérifier que XAMPP/WAMP est démarré
- Redémarrer MySQL dans le panneau de contrôle XAMPP

---

## 📊 STATISTIQUES ATTENDUES

Après exécution du schema.sql:

```
✅ 8 tables créées
✅ 3 utilisateurs insérés
✅ 5 produits insérés
✅ 3 commandes insérées
✅ 5 articles de commande insérés
✅ 2 favoris insérés
✅ 1 adresse insérée
✅ 14 index créés
✅ 7 foreign keys créées
```

**Taille approximative:** ~50 Ko

---

## 🎯 PROCHAINE ÉTAPE

Une fois le SQL exécuté avec succès:

1. ✅ Vérifier que les tables sont créées
2. ✅ Vérifier que les données de test sont présentes
3. ➡️ Retourner au fichier **`MYSQL_CONNECTION_COMPLETE.md`**
4. ➡️ Passer à l'étape "Démarrer le Serveur API"

---

**Fichier SQL:** `soukdigital-api/database/schema.sql`  
**Taille:** ~94,000 tokens  
**Temps d'exécution:** ~2-3 secondes
