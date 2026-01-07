import HttpService from './HttpService';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';

/**
 * Service pour les opérations de données (Produits, Catégories, Artisans).
 * TOUTES LES DONNÉES VIENNENT DE L'API/BASE DE DONNÉES - AUCUNE DONNÉE MOCK
 */
const DataService = {
    /**
     * Récupérer tous les produits depuis l'API
     * @returns {Promise<Array>}
     */
    getProducts: async () => {
        try {
            const response = await HttpService.get(API_ENDPOINTS.PRODUCTS);
            if (response.success && response.products) {
                // Adapter le format API → App
                return response.products.map(p => ({
                    id: p.id?.toString(),
                    name: p.name,
                    description: p.description,
                    price: parseFloat(p.price),
                    category: p.category,
                    image: p.image_url 
                        ? (p.image_url.startsWith('http') 
                            ? p.image_url 
                            : `${API_BASE_URL}${p.image_url}`)
                        : null,
                    artisanId: p.artisan_id?.toString(),
                    artisanName: p.artisan_name,
                    artisanLocation: p.artisan_location,
                    artisan: p.artisan_name, // Compatibilité ancien code
                    rating: parseFloat(p.rating) || 0,
                    reviews: parseInt(p.total_reviews) || 0,
                    stock: parseInt(p.stock_quantity) || 0,
                }));
            }
            return [];
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    },

    /**
     * Récupérer un produit par ID depuis l'API
     * @param {number} id 
     * @returns {Promise<Object|null>}
     */
    getProductById: async (id) => {
        try {
            const response = await HttpService.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
            if (response.success && response.product) {
                const p = response.product;
                return {
                    id: p.id?.toString(),
                    name: p.name,
                    description: p.description,
                    price: parseFloat(p.price),
                    category: p.category,
                    image: p.image_url 
                        ? (p.image_url.startsWith('http') 
                            ? p.image_url 
                            : `${API_BASE_URL}${p.image_url}`)
                        : null,
                    artisanId: p.artisan_id?.toString(),
                    artisanName: p.artisan_name,
                    artisanLocation: p.artisan_location,
                    artisan: p.artisan_name,
                    rating: parseFloat(p.rating) || 0,
                    reviews: parseInt(p.total_reviews) || 0,
                    stock: parseInt(p.stock_quantity) || 0,
                };
            }
            return null;
        } catch (error) {
            console.error('Error loading product:', error);
            return null;
        }
    },

    /**
     * Récupérer les produits par catégorie depuis l'API
     * @param {string} category 
     * @returns {Promise<Array>}
     */
    getProductsByCategory: async (category) => {
        try {
            const url = category === 'Tout' 
                ? API_ENDPOINTS.PRODUCTS 
                : `${API_ENDPOINTS.PRODUCTS}?category=${encodeURIComponent(category)}`;
            
            const response = await HttpService.get(url);
            if (response.success && response.products) {
                return response.products.map(p => ({
                    id: p.id?.toString(),
                    name: p.name,
                    description: p.description,
                    price: parseFloat(p.price),
                    category: p.category,
                    image: p.image_url 
                        ? (p.image_url.startsWith('http') 
                            ? p.image_url 
                            : `${API_BASE_URL}${p.image_url}`)
                        : null,
                    artisanId: p.artisan_id?.toString(),
                    artisanName: p.artisan_name,
                    artisan: p.artisan_name,
                    rating: parseFloat(p.rating) || 0,
                    reviews: parseInt(p.total_reviews) || 0,
                }));
            }
            return [];
        } catch (error) {
            console.error('Error loading products by category:', error);
            return [];
        }
    },

    /**
     * Catégories (données statiques UI - légitime)
     * @returns {Promise<Array>}
     */
    getCategories: async () => {
        // Les catégories sont des données UI statiques, pas des données dynamiques
        return [
            { id: 1, name: 'Tout', icon: 'apps' },
            { id: 2, name: 'Tissage', icon: 'color-palette' },
            { id: 3, name: 'Zellige', icon: 'grid' },
            { id: 4, name: 'Poterie', icon: 'flask' },
            { id: 5, name: 'Bois', icon: 'leaf' },
            { id: 6, name: 'Cuir', icon: 'briefcase' },
            { id: 7, name: 'Bijoux', icon: 'diamond' },
        ];
    },

    /**
     * Récupérer tous les artisans depuis l'API
     * @returns {Promise<Array>}
     */
    getArtisans: async () => {
        try {
            const response = await HttpService.get(API_ENDPOINTS.ARTISANS);
            if (response.success && response.artisans) {
                return response.artisans.map(a => ({
                    id: a.id?.toString(),
                    name: a.full_name,
                    specialty: a.specialty,
                    location: a.location,
                    rating: parseFloat(a.rating) || 0,
                    bio: a.bio,
                    image: a.avatar_url,
                }));
            }
            return [];
        } catch (error) {
            console.error('Error loading artisans:', error);
            return [];
        }
    },

    /**
     * Récupérer un artisan par ID depuis l'API
     * @param {number} id 
     * @returns {Promise<Object|null>}
     */
    getArtisanById: async (id) => {
        try {
            const response = await HttpService.get(`${API_ENDPOINTS.USER_DETAIL(id)}`);
            if (response.success && response.user) {
                const a = response.user;
                return {
                    id: a.id?.toString(),
                    name: a.full_name,
                    specialty: a.specialty,
                    location: a.location,
                    rating: parseFloat(a.rating) || 0,
                    bio: a.bio,
                    image: a.avatar_url,
                };
            }
            return null;
        } catch (error) {
            console.error('Error loading artisan:', error);
            return null;
        }
    },

    /**
     * Rechercher des produits depuis l'API
     * @param {string} query 
     * @returns {Promise<Array>}
     */
    searchProducts: async (query) => {
        try {
            if (!query || query.trim() === '') return [];
            
            const response = await HttpService.get(
                `${API_ENDPOINTS.PRODUCTS}?search=${encodeURIComponent(query)}`
            );
            
            if (response.success && response.products) {
                return response.products.map(p => ({
                    id: p.id?.toString(),
                    name: p.name,
                    description: p.description,
                    price: parseFloat(p.price),
                    category: p.category,
                    image: p.image_url 
                        ? (p.image_url.startsWith('http') 
                            ? p.image_url 
                            : `${API_BASE_URL}${p.image_url}`)
                        : null,
                    artisanId: p.artisan_id?.toString(),
                    artisanName: p.artisan_name,
                    artisan: p.artisan_name,
                    rating: parseFloat(p.rating) || 0,
                    reviews: parseInt(p.total_reviews) || 0,
                }));
            }
            return [];
        } catch (error) {
            console.error('Error searching products:', error);
            return [];
        }
    }
};

export default DataService;
