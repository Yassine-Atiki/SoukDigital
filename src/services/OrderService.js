import StorageService from './StorageService';

const ORDERS_KEY = 'souk_orders';

/**
 * Service for handling Orders.
 */
const OrderService = {
    /**
     * Create a new order
     * @param {Object} orderData 
     * @returns {Promise<{success: boolean, order?: Object, error?: string}>}
     */
    createOrder: async (orderData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing

            const orders = await StorageService.getItem(ORDERS_KEY) || [];

            const newOrder = {
                id: `CMD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                createdAt: new Date().toISOString(),
                status: 'En préparation', // En préparation, En transit, Livrée, Annulée
                ...orderData
            };

            orders.unshift(newOrder); // Add to beginning of list
            await StorageService.setItem(ORDERS_KEY, orders);

            return { success: true, order: newOrder };
        } catch (error) {
            console.error('Create order error:', error);
            return { success: false, error: 'Erreur lors de la création de la commande' };
        }
    },

    /**
     * Get orders for a specific user
     * @param {string} userId 
     * @returns {Promise<Array>}
     */
    getUserOrders: async (userId) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const orders = await StorageService.getItem(ORDERS_KEY) || [];
            return orders.filter(o => o.userId === userId);
        } catch (error) {
            console.error('Get user orders error:', error);
            return [];
        }
    },

    /**
     * Get order by ID
     * @param {string} orderId 
     * @returns {Promise<Object|null>}
     */
    getOrderById: async (orderId) => {
        try {
            const orders = await StorageService.getItem(ORDERS_KEY) || [];
            return orders.find(o => o.id === orderId) || null;
        } catch (error) {
            console.error('Get order error:', error);
            return null;
        }
    }
};

export default OrderService;
