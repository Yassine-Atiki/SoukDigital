import { PRODUCTS, CATEGORIES, ARTISANS } from '../data/mockData';

/**
 * Service for handling data operations (Products, Categories, Artisans).
 * Simulates API calls with delays.
 */
const DataService = {
    /**
     * Get all products
     * @returns {Promise<Array>}
     */
    getProducts: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return PRODUCTS;
    },

    /**
     * Get product by ID
     * @param {number} id 
     * @returns {Promise<Object>}
     */
    getProductById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return PRODUCTS.find(p => p.id === id);
    },

    /**
     * Get products by category
     * @param {string} category 
     * @returns {Promise<Array>}
     */
    getProductsByCategory: async (category) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (category === 'Tout') return PRODUCTS;
        return PRODUCTS.filter(p => p.category === category);
    },

    /**
     * Get all categories
     * @returns {Promise<Array>}
     */
    getCategories: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return CATEGORIES;
    },

    /**
     * Get all artisans
     * @returns {Promise<Array>}
     */
    getArtisans: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return ARTISANS;
    },

    /**
     * Get artisan by ID
     * @param {number} id 
     * @returns {Promise<Object>}
     */
    getArtisanById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return ARTISANS.find(a => a.id === id);
    },

    /**
     * Search products
     * @param {string} query 
     * @returns {Promise<Array>}
     */
    searchProducts: async (query) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        return PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery) ||
            p.artisan.toLowerCase().includes(lowerQuery)
        );
    }
};

export default DataService;
