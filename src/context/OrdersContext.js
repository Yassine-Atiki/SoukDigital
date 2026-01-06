// src/context/OrdersContext.js
// Implements TESTING_GUIDE Section 5.1: Flux d'achat complet
// Manages order persistence from CheckoutScreen to OrderHistoryScreen
// Ensures orders created appear in order history

import React, { createContext, useState, useContext, useEffect } from 'react';
import StorageService from '../services/StorageService';

const OrdersContext = createContext();

const ORDERS_KEY = 'souk_orders';

// Mock initial orders for demo purposes
const INITIAL_ORDERS = [
    {
        id: 'CMD001',
        date: '2024-12-20',
        status: 'delivered',
        total: 1730,
        items: [
            {
                name: 'Tajine Berbère',
                quantity: 1,
                price: 450,
                image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
            },
            {
                name: 'Tapis Amazigh',
                quantity: 1,
                price: 1200,
                image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
            },
        ],
        deliveryAddress: {
            name: 'Domicile',
            address: '123 Rue Mohamed V, Casablanca',
            phone: '+212 6 12 34 56 78',
        },
        paymentMethod: {
            type: 'card',
            last4: '4242',
        },
    },
    {
        id: 'CMD002',
        date: '2024-12-18',
        status: 'in_transit',
        total: 850,
        items: [
            {
                name: 'Théière en Argent',
                quantity: 1,
                price: 850,
                image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
            },
        ],
        deliveryAddress: {
            name: 'Bureau',
            address: '456 Avenue Hassan II, Rabat',
            phone: '+212 6 98 76 54 32',
        },
        paymentMethod: {
            type: 'card',
            last4: '8888',
        },
    },
    {
        id: 'CMD003',
        date: '2024-12-15',
        status: 'processing',
        total: 280,
        items: [
            {
                name: 'Babouches Cuir',
                quantity: 1,
                price: 280,
                image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400',
            },
        ],
        deliveryAddress: {
            name: 'Domicile',
            address: '123 Rue Mohamed V, Casablanca',
            phone: '+212 6 12 34 56 78',
        },
        paymentMethod: {
            type: 'card',
            last4: '4242',
        },
    },
];

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const saved = await StorageService.getItem(ORDERS_KEY);
            if (saved && Array.isArray(saved) && saved.length > 0) {
                setOrders(saved);
            } else {
                // Initialize with mock orders for demo
                setOrders(INITIAL_ORDERS);
                await StorageService.setItem(ORDERS_KEY, INITIAL_ORDERS);
            }
        } catch (error) {
            console.error('Error loading orders:', error);
            setOrders(INITIAL_ORDERS);
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (orderData) => {
        try {
            // Generate order ID
            const orderNumber = orders.length + 1;
            const orderId = `CMD${String(orderNumber).padStart(3, '0')}`;
            
            // Get current date
            const currentDate = new Date().toISOString().split('T')[0];
            
            // Create new order
            const newOrder = {
                id: orderId,
                date: currentDate,
                status: 'processing', // New orders start as processing
                total: orderData.total,
                items: orderData.items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image,
                })),
                deliveryAddress: orderData.deliveryAddress || {
                    name: 'Domicile',
                    address: '123 Rue Mohamed V, Casablanca',
                    phone: '+212 6 12 34 56 78',
                },
                paymentMethod: orderData.paymentMethod || {
                    type: 'card',
                    last4: '4242',
                },
            };

            // Add to orders list (newest first)
            const updatedOrders = [newOrder, ...orders];
            setOrders(updatedOrders);
            await StorageService.setItem(ORDERS_KEY, updatedOrders);

            return newOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const updatedOrders = orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            );
            setOrders(updatedOrders);
            await StorageService.setItem(ORDERS_KEY, updatedOrders);
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
            await StorageService.setItem(ORDERS_KEY, []);
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
