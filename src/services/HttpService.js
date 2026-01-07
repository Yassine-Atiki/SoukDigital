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
        headers['Authorization'] = `Bearer ${token}`;
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
      const url = `${API_BASE_URL}${endpoint}`;

      console.log(`🌐 GET ${url}`);

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
      console.error(`❌ GET ${endpoint}:`, error);
      throw error;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Requête POST (supporte JSON et FormData)
  // ═══════════════════════════════════════════════════════════════
  async post(endpoint, body, requiresAuth = false) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      // Déterminer si c'est du FormData ou du JSON
      const isFormData = body instanceof FormData;
      
      let headers = {};
      if (requiresAuth) {
        const token = await this.getToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }
      
      // NE PAS définir Content-Type pour FormData (fetch le fait automatiquement)
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      console.log(`🌐 POST ${url}`, isFormData ? '[FormData]' : body);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: isFormData ? body : JSON.stringify(body),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        console.log(`📡 Réponse reçue, status: ${response.status}`);
        
        const data = await response.json();
        console.log(`📦 Data:`, data);

        if (!response.ok) {
          throw new Error(data.error || 'Erreur réseau');
        }

        console.log(`✅ POST ${endpoint}: Success`);
        return data;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          console.error(`⏱️ Timeout sur ${endpoint}`);
          throw new Error('Timeout - Le serveur ne répond pas');
        }
        throw fetchError;
      }
    } catch (error) {
      console.error(`❌ POST ${endpoint}:`, error);
      throw error;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Requête PUT (supporte JSON et FormData)
  // ═══════════════════════════════════════════════════════════════
  async put(endpoint, body, requiresAuth = true) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      // Déterminer si c'est du FormData ou du JSON
      const isFormData = body instanceof FormData;
      
      let headers = {};
      if (requiresAuth) {
        const token = await this.getToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }
      
      // NE PAS définir Content-Type pour FormData (fetch le fait automatiquement)
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      console.log(`🌐 PUT ${url}`, isFormData ? '[FormData]' : body);

      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: isFormData ? body : JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur réseau');
      }

      return data;
    } catch (error) {
      console.error(`❌ PUT ${endpoint}:`, error);
      throw error;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Requête DELETE
  // ═══════════════════════════════════════════════════════════════
  async delete(endpoint, requiresAuth = true) {
    try {
      const headers = await this.getHeaders(requiresAuth);
      const url = `${API_BASE_URL}${endpoint}`;

      console.log(`🌐 DELETE ${url}`);

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
      console.error(`❌ DELETE ${endpoint}:`, error);
      throw error;
    }
  }
}

// Export une instance unique (Singleton)
export default new HttpService();
