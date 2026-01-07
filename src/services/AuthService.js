import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from './HttpService';
import { API_ENDPOINTS, STORAGE_KEYS, API_BASE_URL } from '../config/api';

/**
 * Service for handling User Authentication and Management with API.
 */
const AuthService = {
    /**
     * Login user
     * @param {string} email 
     * @param {string} password 
     * @param {string} userType 
     * @returns {Promise<{success: boolean, user?: Object, error?: string}>}
     */
    login: async (email, password, userType) => {
        try {
            console.log('🔐 Tentative de login:', { email, userType });
            
            const response = await HttpService.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
                userType, // L'API backend attend 'userType' en camelCase
            });

            console.log('📥 Réponse login reçue:', response);

            if (response.success) {
                console.log('✅ Login réussi, token reçu');
                // Sauvegarder le token JWT
                await HttpService.saveToken(response.token);
                
                // L'API retourne déjà les données en camelCase (name, userType, avatar)
                const user = {
                    id: response.user.id,
                    name: response.user.name,  // L'API retourne 'name' pas 'full_name'
                    email: response.user.email,
                    userType: response.user.userType,  // L'API retourne 'userType' pas 'user_type'
                    phone: response.user.phone,
                    bio: response.user.bio,
                    avatar: response.user.avatar 
                        ? (response.user.avatar.startsWith('http') 
                            ? response.user.avatar 
                            : `${API_BASE_URL}${response.user.avatar}`)
                        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                    specialty: response.user.specialty,
                    location: response.user.location,
                    rating: response.user.rating,
                };
                
                console.log('✅ Utilisateur après adaptation:', user);
                
                // Sauvegarder l'utilisateur localement
                await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
                
                return { success: true, user };
            } else {
                console.log('❌ Login échoué:', response.error);
                return { success: false, error: response.error || 'Erreur de connexion' };
            }
        } catch (error) {
            console.error('❌ Erreur login (exception):', error);
            return { success: false, error: error.message || 'Erreur de connexion' };
        }
    },

    /**
     * Sign up new user
     * @param {string} fullName 
     * @param {string} email 
     * @param {string} password 
     * @param {string} userType 
     * @returns {Promise<{success: boolean, user?: Object, error?: string}>}
     */
    signup: async (fullName, email, password, userType) => {
        try {
            const response = await HttpService.post(API_ENDPOINTS.REGISTER, {
                fullName, // L'API backend attend 'fullName' en camelCase
                email,
                password,
                userType, // L'API backend attend 'userType' en camelCase
            });

            if (response.success) {
                // Sauvegarder le token JWT
                await HttpService.saveToken(response.token);
                
                // L'API retourne déjà les données en camelCase (name, userType, avatar)
                const user = {
                    id: response.user.id,
                    name: response.user.name,  // L'API retourne 'name' pas 'full_name'
                    email: response.user.email,
                    userType: response.user.userType,  // L'API retourne 'userType' pas 'user_type'
                    phone: response.user.phone,
                    bio: response.user.bio,
                    avatar: response.user.avatar 
                        ? (response.user.avatar.startsWith('http') 
                            ? response.user.avatar 
                            : `${API_BASE_URL}${response.user.avatar}`)
                        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                    specialty: response.user.specialty,
                    location: response.user.location,
                    rating: response.user.rating,
                };
                
                // Sauvegarder l'utilisateur localement
                await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
                
                return { success: true, user };
            } else {
                return { success: false, error: response.error || 'Erreur lors de l\'inscription' };
            }
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: error.message || 'Erreur lors de l\'inscription' };
        }
    },

    /**
     * Logout user
     */
    logout: async () => {
        try {
            // Supprimer le token JWT
            await HttpService.removeToken();
            
            // Supprimer l'utilisateur du cache AsyncStorage
            await AsyncStorage.removeItem(STORAGE_KEYS.USER);
            
            console.log('✅ Logout: Token et cache utilisateur supprimés');
        } catch (error) {
            console.error('Erreur lors du logout:', error);
        }
    },

    /**
     * Get current authenticated user
     * @returns {Promise<Object|null>}
     */
    getCurrentUser: async () => {
        try {
            const token = await HttpService.getToken();
            if (!token) {
                return null;
            }

            // Vérifier le token et récupérer les données fraîches de la BD
            try {
                const response = await HttpService.post(API_ENDPOINTS.VERIFY, {}, true);
                console.log('🔍 Réponse API /verify:', response);
                
                if (response.success) {
                    // Adapter le format de l'utilisateur retourné par l'API
                    const user = {
                        id: response.user.id,
                        name: response.user.name,  // L'API retourne déjà 'name'
                        email: response.user.email,
                        userType: response.user.userType,  // L'API retourne déjà 'userType'
                        phone: response.user.phone,
                        bio: response.user.bio,
                        avatar: response.user.avatar 
                            ? (response.user.avatar.startsWith('http') 
                                ? response.user.avatar 
                                : `${API_BASE_URL}${response.user.avatar}`)
                            : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                        specialty: response.user.specialty,
                        location: response.user.location,
                        rating: response.user.rating,
                    };

                    console.log('✅ Utilisateur récupéré de la BD:', user);

                    // Mettre à jour le cache local avec les données fraîches
                    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

                    return user;
                }
            } catch (error) {
                // Token invalide, déconnecter
                await HttpService.removeToken();
                await AsyncStorage.removeItem(STORAGE_KEYS.USER);
                return null;
            }
            
            return null;
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    },

    /**
     * Update user profile
     * @param {Object} updates 
     * @returns {Promise<{success: boolean, user?: Object}>}
     */
    updateProfile: async (updates) => {
        try {
            console.log('📝 Mise à jour du profil - Données reçues:', updates);

            // Créer un FormData pour envoyer les données et l'avatar
            const formData = new FormData();
            
            if (updates.name) {
                formData.append('full_name', updates.name);
                console.log('✏️ Nom à mettre à jour:', updates.name);
            }
            if (updates.phone) {
                formData.append('phone', updates.phone);
                console.log('📞 Téléphone à mettre à jour:', updates.phone);
            }
            if (updates.bio !== undefined) {
                formData.append('bio', updates.bio);
                console.log('📄 Bio à mettre à jour:', updates.bio);
            }
            if (updates.specialty) {
                formData.append('specialty', updates.specialty);
                console.log('🎨 Spécialité à mettre à jour:', updates.specialty);
            }
            if (updates.location) {
                formData.append('location', updates.location);
                console.log('📍 Localisation à mettre à jour:', updates.location);
            }
            
            // Si l'avatar est un URI local (nouvelle photo sélectionnée)
            if (updates.avatar && updates.avatar.startsWith('file://')) {
                const uri = updates.avatar;
                const filename = uri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : 'image/jpeg';
                
                formData.append('avatar', {
                    uri,
                    name: filename,
                    type,
                });
                
                console.log('📸 Avatar à uploader:', { uri, filename, type });
            }

            const response = await HttpService.put(API_ENDPOINTS.UPDATE_PROFILE, formData, true);

            if (response.success) {
                // Adapter le format de l'utilisateur retourné
                const user = {
                    id: response.user.id,
                    name: response.user.full_name,  // L'API /users/profile retourne 'full_name'
                    email: response.user.email,
                    userType: response.user.user_type,  // L'API /users/profile retourne 'user_type'
                    phone: response.user.phone,
                    bio: response.user.bio,
                    avatar: response.user.avatar_url 
                        ? `${API_BASE_URL}${response.user.avatar_url}`
                        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                    specialty: response.user.specialty,
                    location: response.user.location,
                    rating: response.user.rating,
                };
                
                console.log('✅ Profil mis à jour:', user);
                
                // Mettre à jour l'utilisateur local
                await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
                
                return { success: true, user };
            } else {
                return { success: false, error: response.error };
            }
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, error: error.message };
        }
    }
};

export default AuthService;
