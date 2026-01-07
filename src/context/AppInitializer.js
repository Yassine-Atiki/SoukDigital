// src/context/AppInitializer.js
// Composant pour gérer l'initialisation de l'app après connexion

import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useOrders } from './OrdersContext';
import { useFavorites } from './FavoritesContext';

export const AppInitializer = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const { loadOrders } = useOrders();
    const { loadFavorites } = useFavorites();

    useEffect(() => {
        // Charger les données après la connexion
        if (isAuthenticated && !isLoading) {
            loadOrders();
            loadFavorites();
        }
    }, [isAuthenticated, isLoading]);

    return children;
};
