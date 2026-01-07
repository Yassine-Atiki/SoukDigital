# 📱 GUIDE DE CONNEXION REACT NATIVE À L'API

## 🎯 OBJECTIF
Connecter votre application React Native SoukDigital à l'API backend MySQL que nous venons de créer.

---

## 📦 ÉTAPE 1: Installer AsyncStorage

AsyncStorage permet de stocker le token JWT localement sur l'appareil.

```bash
cd SoukDigital
npm install @react-native-async-storage/async-storage
```

---

## 🌐 ÉTAPE 2: Trouver Votre IP Locale

### Sur Windows PowerShell:
```powershell
ipconfig
```

Cherchez la ligne **IPv4 Address** sous votre connexion WiFi/Ethernet.  
Exemple: `192.168.1.10`

**⚠️ IMPORTANT:** Si vous changez de réseau WiFi, vous devrez mettre à jour cette IP!

---

## ⚙️ ÉTAPE 3: Créer la Configuration API

**Créer le fichier: `src/config/api.js`**

```javascript
// ═══════════════════════════════════════════════════════════════
// 🌐 Configuration API - SoukDigital
// ═══════════════════════════════════════════════════════════════

// 🔥 REMPLACER PAR VOTRE IP LOCALE (trouvée avec ipconfig)
export const API_BASE_URL = 'http://192.168.1.10:3000';

// 📡 Endpoints de l'API
export const API_ENDPOINTS = {
  // Authentification
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  VERIFY: '/api/auth/verify',
  
  // Produits
  PRODUCTS: '/api/products',
  PRODUCT_DETAIL: (id) => \`/api/products/\${id}\`,
  CREATE_PRODUCT: '/api/products',
  UPDATE_PRODUCT: (id) => \`/api/products/\${id}\`,
  DELETE_PRODUCT: (id) => \`/api/products/\${id}\`,
  
  // Commandes
  ORDERS: '/api/orders',
  ORDER_DETAIL: (id) => \`/api/orders/\${id}\`,
  CREATE_ORDER: '/api/orders',
  
  // Favoris
  FAVORITES: '/api/favorites',
  TOGGLE_FAVORITE: '/api/favorites/toggle',
  CHECK_FAVORITE: (id) => \`/api/favorites/check/\${id}\`,
  
  // Utilisateurs
  PROFILE: '/api/users/profile',
  UPDATE_PROFILE: '/api/users/profile',
  CHANGE_PASSWORD: '/api/users/password',
  USER_DETAIL: (id) => \`/api/users/\${id}\`,
  ARTISANS: '/api/users/artisans/all',
  
  // Adresses
  ADDRESSES: '/api/addresses',
  CREATE_ADDRESS: '/api/addresses',
  UPDATE_ADDRESS: (id) => \`/api/addresses/\${id}\`,
  DELETE_ADDRESS: (id) => \`/api/addresses/\${id}\`,
  SET_DEFAULT_ADDRESS: (id) => \`/api/addresses/\${id}/default\`,
  
  // Health Check
  HEALTH: '/api/health',
};

// 🔑 Clés de stockage
export const STORAGE_KEYS = {
  TOKEN: '@soukdigital_token',
  USER: '@soukdigital_user',
};
```

---

## 🔧 ÉTAPE 4: Créer le Service HTTP

**Créer le fichier: `src/services/HttpService.js`**

```javascript
// ═══════════════════════════════════════════════════════════════
// 📡 Service HTTP - SoukDigital
// Gestion centralisée des requêtes HTTP avec authentification JWT
// ═══════════════════════════════════════════════════════════════

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, STORAGE_KEYS } from '../config/api';

class HttpService {
  
  // ═══════════════════════════════════════════════════════════════
  // Récupérer le token stocké
  // ═══════════════════════════════════════════════════════════════
  async getToken() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('❌ Erreur récupération token:', error);
      return null;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Sauvegarder le token
  // ═══════════════════════════════════════════════════════════════
  async saveToken(token) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (error) {
      console.error('❌ Erreur sauvegarde token:', error);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Supprimer le token
  // ═══════════════════════════════════════════════════════════════
  async removeToken() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('❌ Erreur suppression token:', error);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Construire les headers de la requête
  // ═══════════════════════════════════════════════════════════════
  async getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = await this.getToken();
      if (token) {
        headers['Authorization'] = \`Bearer \${token}\`;
      }
    }

    return headers;
  }

  // ═══════════════════════════════════════════════════════════════
  // Requête GET
  // ═══════════════════════════════════════════════════════════════
  async get(endpoint, requiresAuth = false) {
    try {
      const headers = await this.getHeaders(requiresAuth);
      const url = \`\${API_BASE_URL}\${endpoint}\`;

      console.log(\`🌐 GET \${url}\`);

      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur réseau');
      }

      return data;
    } catch (error) {
      console.error(\`❌ GET \${endpoint}:\`, error);
      throw error;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Requête POST
  // ═══════════════════════════════════════════════════════════════
  async post(endpoint, body, requiresAuth = false) {
    try {
      const headers = await this.getHeaders(requiresAuth);
      const url = \`\${API_BASE_URL}\${endpoint}\`;

      console.log(\`🌐 POST \${url}\`, body);

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur réseau');
      }

      return data;
    } catch (error) {
      console.error(\`❌ POST \${endpoint}:\`, error);
      throw error;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Requête PUT
  // ═══════════════════════════════════════════════════════════════
  async put(endpoint, body, requiresAuth = true) {
    try {
      const headers = await this.getHeaders(requiresAuth);
      const url = \`\${API_BASE_URL}\${endpoint}\`;

      console.log(\`🌐 PUT \${url}\`, body);

      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur réseau');
      }

      return data;
    } catch (error) {
      console.error(\`❌ PUT \${endpoint}:\`, error);
      throw error;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Requête DELETE
  // ═══════════════════════════════════════════════════════════════
  async delete(endpoint, requiresAuth = true) {
    try {
      const headers = await this.getHeaders(requiresAuth);
      const url = \`\${API_BASE_URL}\${endpoint}\`;

      console.log(\`🌐 DELETE \${url}\`);

      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur réseau');
      }

      return data;
    } catch (error) {
      console.error(\`❌ DELETE \${endpoint}:\`, error);
      throw error;
    }
  }
}

// Export une instance unique (Singleton)
export default new HttpService();
```

---

## 🔐 ÉTAPE 5: Modifier AuthContext

Remplacer le mock data par les vraies requêtes API.

**Ouvrir: `src/context/AuthContext.js`**

**Ajouter les imports:**
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../services/HttpService';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config/api';
```

**Remplacer la fonction `login`:**
```javascript
const login = async (email, password) => {
  try {
    setLoading(true);
    setError(null);

    // Appel API
    const response = await HttpService.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    if (response.success) {
      // Sauvegarder le token
      await HttpService.saveToken(response.token);
      
      // Sauvegarder l'utilisateur
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      return { success: true };
    } else {
      setError(response.error || 'Erreur de connexion');
      return { success: false, error: response.error };
    }
  } catch (err) {
    const errorMessage = err.message || 'Erreur de connexion';
    setError(errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    setLoading(false);
  }
};
```

**Remplacer la fonction `register`:**
```javascript
const register = async (userData) => {
  try {
    setLoading(true);
    setError(null);

    // Appel API
    const response = await HttpService.post(API_ENDPOINTS.REGISTER, userData);

    if (response.success) {
      // Sauvegarder le token
      await HttpService.saveToken(response.token);
      
      // Sauvegarder l'utilisateur
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      return { success: true };
    } else {
      setError(response.error || 'Erreur d\'inscription');
      return { success: false, error: response.error };
    }
  } catch (err) {
    const errorMessage = err.message || 'Erreur d\'inscription';
    setError(errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    setLoading(false);
  }
};
```

**Remplacer la fonction `logout`:**
```javascript
const logout = async () => {
  await HttpService.removeToken();
  setUser(null);
  setIsAuthenticated(false);
};
```

**Ajouter la vérification au chargement dans `useEffect`:**
```javascript
useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = await HttpService.getToken();
      const userStr = await AsyncStorage.getItem(STORAGE_KEYS.USER);

      if (token && userStr) {
        // Vérifier que le token est toujours valide
        const response = await HttpService.post(API_ENDPOINTS.VERIFY, {}, true);
        
        if (response.success) {
          setUser(JSON.parse(userStr));
          setIsAuthenticated(true);
        } else {
          // Token invalide
          await HttpService.removeToken();
        }
      }
    } catch (error) {
      console.error('Erreur vérification auth:', error);
      await HttpService.removeToken();
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);
```

---

## 🎨 ÉTAPE 6: Modifier ProductsContext

**Ouvrir: `src/context/ProductsContext.js`**

**Ajouter les imports:**
```javascript
import HttpService from '../services/HttpService';
import { API_ENDPOINTS } from '../config/api';
```

**Remplacer `loadProducts`:**
```javascript
const loadProducts = async (filters = {}) => {
  try {
    setLoading(true);
    
    // Construire les query params
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.artisan_id) params.append('artisan_id', filters.artisan_id);
    
    const queryString = params.toString();
    const endpoint = queryString 
      ? \`\${API_ENDPOINTS.PRODUCTS}?\${queryString}\`
      : API_ENDPOINTS.PRODUCTS;

    const response = await HttpService.get(endpoint);

    if (response.success) {
      setProducts(response.products);
    }
  } catch (error) {
    console.error('Erreur chargement produits:', error);
  } finally {
    setLoading(false);
  }
};
```

**Remplacer `addProduct`:**
```javascript
const addProduct = async (productData) => {
  try {
    const response = await HttpService.post(
      API_ENDPOINTS.CREATE_PRODUCT,
      productData,
      true // Requires auth
    );

    if (response.success) {
      setProducts(prev => [response.product, ...prev]);
      return { success: true, product: response.product };
    }
    
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Erreur ajout produit:', error);
    return { success: false, error: error.message };
  }
};
```

**Remplacer `updateProduct`:**
```javascript
const updateProduct = async (productId, updates) => {
  try {
    const response = await HttpService.put(
      API_ENDPOINTS.UPDATE_PRODUCT(productId),
      updates,
      true
    );

    if (response.success) {
      setProducts(prev =>
        prev.map(p => p.id === productId ? response.product : p)
      );
      return { success: true };
    }
    
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Erreur mise à jour produit:', error);
    return { success: false, error: error.message };
  }
};
```

**Remplacer `deleteProduct`:**
```javascript
const deleteProduct = async (productId) => {
  try {
    const response = await HttpService.delete(
      API_ENDPOINTS.DELETE_PRODUCT(productId),
      true
    );

    if (response.success) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      return { success: true };
    }
    
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Erreur suppression produit:', error);
    return { success: false, error: error.message };
  }
};
```

---

## 📦 ÉTAPE 7: Modifier OrdersContext

**Ouvrir: `src/context/OrdersContext.js`**

**Ajouter les imports:**
```javascript
import HttpService from '../services/HttpService';
import { API_ENDPOINTS } from '../config/api';
```

**Remplacer `createOrder`:**
```javascript
const createOrder = async (orderData) => {
  try {
    const response = await HttpService.post(
      API_ENDPOINTS.CREATE_ORDER,
      orderData,
      true
    );

    if (response.success) {
      setOrders(prev => [response.order, ...prev]);
      return { success: true, order: response.order };
    }
    
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Erreur création commande:', error);
    return { success: false, error: error.message };
  }
};
```

**Remplacer `loadOrders`:**
```javascript
const loadOrders = async (filters = {}) => {
  try {
    setLoading(true);
    
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    
    const queryString = params.toString();
    const endpoint = queryString 
      ? \`\${API_ENDPOINTS.ORDERS}?\${queryString}\`
      : API_ENDPOINTS.ORDERS;

    const response = await HttpService.get(endpoint, true);

    if (response.success) {
      setOrders(response.orders);
    }
  } catch (error) {
    console.error('Erreur chargement commandes:', error);
  } finally {
    setLoading(false);
  }
};
```

---

## ❤️ ÉTAPE 8: Modifier FavoritesContext

**Ouvrir: `src/context/FavoritesContext.js`**

**Ajouter les imports:**
```javascript
import HttpService from '../services/HttpService';
import { API_ENDPOINTS } from '../config/api';
```

**Remplacer `toggleFavorite`:**
```javascript
const toggleFavorite = async (productId) => {
  try {
    const response = await HttpService.post(
      API_ENDPOINTS.TOGGLE_FAVORITE,
      { productId },
      true
    );

    if (response.success) {
      if (response.action === 'added') {
        // Charger le produit complet et l'ajouter aux favoris
        const productResponse = await HttpService.get(
          API_ENDPOINTS.PRODUCT_DETAIL(productId)
        );
        if (productResponse.success) {
          setFavorites(prev => [...prev, productResponse.product]);
        }
      } else {
        // Retirer des favoris
        setFavorites(prev => prev.filter(f => f.id !== productId));
      }
      return { success: true, action: response.action };
    }
    
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Erreur toggle favori:', error);
    return { success: false, error: error.message };
  }
};
```

**Remplacer `loadFavorites`:**
```javascript
const loadFavorites = async () => {
  try {
    setLoading(true);
    
    const response = await HttpService.get(API_ENDPOINTS.FAVORITES, true);

    if (response.success) {
      setFavorites(response.favorites);
    }
  } catch (error) {
    console.error('Erreur chargement favoris:', error);
  } finally {
    setLoading(false);
  }
};
```

---

## 🧪 ÉTAPE 9: Tester la Connexion

### 1. **S'assurer que l'API tourne:**
```powershell
cd soukdigital-api
npm run dev
```

Vous devez voir:
```
🚀 Serveur démarré sur le port 3000
✅ Connexion MySQL réussie!
```

### 2. **Démarrer l'app React Native:**
```bash
cd SoukDigital
npm start
```

### 3. **Se connecter avec un compte de test:**
- **Email:** `client@soukdigital.ma`
- **Mot de passe:** `test123`

**OU**

- **Email:** `artisan@soukdigital.ma`
- **Mot de passe:** `test123`

### 4. **Vérifier que:**
- ✅ La connexion fonctionne
- ✅ Les produits s'affichent (5 produits de test)
- ✅ Vous pouvez ajouter un produit (si artisan)
- ✅ Vous pouvez créer une commande
- ✅ Les favoris fonctionnent

---

## 🐛 DÉPANNAGE

### ❌ Erreur "Network request failed"
**Solution:** Vérifiez que:
1. Le serveur API tourne (`npm run dev` dans soukdigital-api)
2. L'IP dans `api.js` est correcte (utilisez `ipconfig`)
3. Votre téléphone/émulateur est sur le même réseau WiFi
4. Le firewall Windows n'bloque pas le port 3000

### ❌ Erreur "Unable to resolve module @react-native-async-storage"
**Solution:**
```bash
npm install @react-native-async-storage/async-storage
cd ios && pod install && cd ..  # Si iOS
npm start -- --reset-cache
```

### ❌ Produits ne s'affichent pas
**Solution:**
1. Vérifier que schema.sql a été exécuté dans phpMyAdmin
2. Vérifier la connexion MySQL dans le terminal du serveur
3. Tester l'endpoint: `http://localhost:3000/api/products` dans le navigateur

### ❌ Token expired / Unauthorized
**Solution:**
- Se déconnecter et se reconnecter
- Le token JWT expire après 30 jours

---

## 📝 CHECKLIST FINALE

- [ ] AsyncStorage installé
- [ ] IP locale trouvée avec `ipconfig`
- [ ] Fichier `src/config/api.js` créé avec la bonne IP
- [ ] Fichier `src/services/HttpService.js` créé
- [ ] `AuthContext.js` modifié
- [ ] `ProductsContext.js` modifié
- [ ] `OrdersContext.js` modifié
- [ ] `FavoritesContext.js` modifié
- [ ] Schema SQL exécuté dans phpMyAdmin
- [ ] Serveur API démarré (`npm run dev`)
- [ ] Application React Native testée
- [ ] Connexion avec compte test réussie

---

## 🎉 FÉLICITATIONS!

Votre application SoukDigital est maintenant connectée à une vraie base de données MySQL!

**Prochaines améliorations possibles:**
- Upload d'images avec Multer
- Notifications push
- Système de chat
- Intégration paiement en ligne
- Système de notation/reviews
- Géolocalisation

---

**Version:** 1.0.0  
**Auteur:** GitHub Copilot
