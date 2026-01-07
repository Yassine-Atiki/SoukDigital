// src/services/ArtisanService.js
import HttpService from './HttpService';

const API_ENDPOINTS = {
    STATS: '/api/artisans/stats',
    RECENT_ORDERS: '/api/artisans/recent-orders',
};

class ArtisanService {
    /**
     * Récupère les statistiques de l'artisan connecté
     * @returns {Promise<{totalSales: number, totalOrders: number, rating: string, totalReviews: number, activeProducts: number}>}
     */
    static async getArtisanStats() {
        try {
            const response = await HttpService.get(API_ENDPOINTS.STATS, true);
            
            if (response.success) {
                console.log('📊 Statistiques artisan récupérées:', response.stats);
                return {
                    success: true,
                    stats: response.stats
                };
            }
            
            return {
                success: false,
                stats: {
                    totalSales: 0,
                    totalOrders: 0,
                    rating: '0.0',
                    totalReviews: 0,
                    activeProducts: 0
                }
            };
        } catch (error) {
            console.error('❌ Erreur récupération stats artisan:', error);
            return {
                success: false,
                stats: {
                    totalSales: 0,
                    totalOrders: 0,
                    rating: '0.0',
                    totalReviews: 0,
                    activeProducts: 0
                }
            };
        }
    }

    /**
     * Récupère les commandes récentes de l'artisan
     * @param {number} limit - Nombre de commandes à récupérer (défaut: 5)
     * @returns {Promise<Array>}
     */
    static async getRecentOrders(limit = 5) {
        try {
            const response = await HttpService.get(`${API_ENDPOINTS.RECENT_ORDERS}?limit=${limit}`, true);
            
            if (response.success) {
                console.log(`📦 ${response.orders.length} commandes récentes récupérées`);
                return {
                    success: true,
                    orders: response.orders
                };
            }
            
            return {
                success: false,
                orders: []
            };
        } catch (error) {
            console.error('❌ Erreur récupération commandes récentes:', error);
            return {
                success: false,
                orders: []
            };
        }
    }

    /**
     * Formate un montant en MAD
     * @param {number} amount
     * @returns {string}
     */
    static formatAmount(amount) {
        return new Intl.NumberFormat('fr-MA', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    /**
     * Traduit le statut d'une commande
     * @param {string} status
     * @returns {string}
     */
    static translateStatus(status) {
        const translations = {
            'processing': 'En préparation',
            'in_transit': 'En livraison',
            'delivered': 'Livrée',
            'cancelled': 'Annulée'
        };
        return translations[status] || status;
    }

    /**
     * Retourne la couleur associée au statut
     * @param {string} status
     * @returns {string}
     */
    static getStatusColor(status) {
        const colors = {
            'processing': '#FF9800',
            'in_transit': '#2196F3',
            'delivered': '#4CAF50',
            'cancelled': '#F44336'
        };
        return colors[status] || '#757575';
    }
}

export default ArtisanService;
