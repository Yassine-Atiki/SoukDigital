// src/context/OrdersContext.js
// Implements TESTING_GUIDE Section 5.1: Flux d'achat complet
// Manages order persistence from CheckoutScreen to OrderHistoryScreen
// Ensures orders created appear in order history

import React, { createContext, useState, useContext, useEffect } from 'react';
import HttpService from '../services/HttpService';
import { API_ENDPOINTS } from '../config/api';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ne pas charger les commandes automatiquement au démarrage
        // Elles seront chargées après la connexion
        setLoading(false);
    }, []);

    const loadOrders = async (filters = {}) => {
        try {
            setLoading(true);
            
            // Vérifier si l'utilisateur est connecté
            const token = await HttpService.getToken();
            if (!token) {
                setOrders([]);
                setLoading(false);
                return;
            }
            
            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            
            const queryString = params.toString();
            const endpoint = queryString 
                ? `${API_ENDPOINTS.ORDERS}?${queryString}`
                : API_ENDPOINTS.ORDERS;

            const response = await HttpService.get(endpoint, true);

            if (response.success) {
                // Adapter le format des commandes
                const adaptedOrders = response.orders.map(o => ({
                    id: o.order_number,
                    date: o.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
                    status: o.status,
                    total: parseFloat(o.total_amount) + parseFloat(o.shipping_cost || 0),
                    items: o.items || [],
                    deliveryAddress: {
                        name: 'Livraison',
                        address: o.delivery_address,
                        phone: o.delivery_phone,
                    },
                    paymentMethod: {
                        type: o.payment_method === 'cash_on_delivery' ? 'cod' : 'card',
                        last4: '****',
                    },
                }));
                
                setOrders(adaptedOrders);
            }
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (orderData) => {
        try {
            // Préparer les items pour l'API
            const items = orderData.items.map(item => ({
                product_id: item.id || item.productId,
                quantity: item.quantity,
            }));

            const response = await HttpService.post(
                API_ENDPOINTS.CREATE_ORDER,
                {
                    items,
                    delivery_address: orderData.deliveryAddress?.address || '123 Rue Mohamed V, Casablanca',
                    delivery_city: orderData.deliveryAddress?.city || 'Casablanca',
                    delivery_phone: orderData.deliveryAddress?.phone || '+212 6 12 34 56 78',
                    payment_method: orderData.paymentMethod?.type === 'cod' ? 'cash_on_delivery' : 'credit_card',
                },
                true
            );

            if (response.success) {
                // Adapter la commande retournée
                const newOrder = {
                    id: response.order.order_number,
                    date: response.order.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
                    status: response.order.status,
                    total: parseFloat(response.order.total_amount) + parseFloat(response.order.shipping_cost || 0),
                    items: orderData.items.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        image: item.image,
                    })),
                    deliveryAddress: orderData.deliveryAddress || {
                        name: 'Domicile',
                        address: response.order.delivery_address,
                        phone: response.order.delivery_phone,
                    },
                    paymentMethod: orderData.paymentMethod || {
                        type: 'card',
                        last4: '4242',
                    },
                };
                
                setOrders(prev => [newOrder, ...prev]);
                return newOrder;
            } else {
                throw new Error(response.error || 'Erreur lors de la création de la commande');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            // Cette fonctionnalité nécessiterait un endpoint API pour modifier le statut
            // Pour l'instant, mise à jour locale uniquement
            const updatedOrders = orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            );
            setOrders(updatedOrders);
            return true;
        } catch (error) {
            console.error('Error updating order status:', error);
            return false;
        }
    };

    const getOrderById = (orderId) => {
        return orders.find(order => order.id === orderId);
    };

    const getOrdersByStatus = (status) => {
        if (status === 'all') return orders;
        return orders.filter(order => order.status === status);
    };

    const clearOrders = async () => {
        try {
            setOrders([]);
            return true;
        } catch (error) {
            console.error('Error clearing orders:', error);
            return false;
        }
    };

    const value = {
        orders,
        loading,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getOrdersByStatus,
        clearOrders,
        refreshOrders: loadOrders,
        loadOrders, // Exposer loadOrders directement pour AuthContext
        ordersCount: orders.length,
    };

    return (
        <OrdersContext.Provider value={value}>
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error('useOrders must be used within OrdersProvider');
    }
    return context;
};

export default OrdersContext;
