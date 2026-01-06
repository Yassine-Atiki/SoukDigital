// src/context/FavoritesContext.js
// Implements TESTING_GUIDE Section 5: Flux de favoris
// Provides global favorites management synchronized across ProductDetailScreen and FavoritesScreen

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import StorageService from '../services/StorageService';
import { PRODUCTS } from '../data/mockData';

const FavoritesContext = createContext();

const FAVORITES_KEY = 'souk_favorites';

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const saved = await StorageService.getItem(FAVORITES_KEY);
            if (saved && Array.isArray(saved)) {
                setFavorites(saved);
            } else {
                // Initialize with first 3 products for demo
                const initialFavorites = PRODUCTS.slice(0, 3);
                setFavorites(initialFavorites);
                await StorageService.setItem(FAVORITES_KEY, initialFavorites);
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = async (product) => {
        try {
            // Check if already in favorites
            const exists = favorites.find(item => item.id === product.id);
            if (exists) {
                Alert.alert('Déjà dans les favoris', 'Ce produit est déjà dans vos favoris');
                return false;
            }

            const newFavorites = [...favorites, product];
            setFavorites(newFavorites);
            await StorageService.setItem(FAVORITES_KEY, newFavorites);
            Alert.alert('Ajouté aux favoris', `${product.name} a été ajouté à vos favoris`);
            return true;
        } catch (error) {
            console.error('Error adding to favorites:', error);
            Alert.alert('Erreur', 'Impossible d\'ajouter aux favoris');
            return false;
        }
    };

    const removeFromFavorites = async (productId) => {
        try {
            const newFavorites = favorites.filter(item => item.id !== productId);
            setFavorites(newFavorites);
            await StorageService.setItem(FAVORITES_KEY, newFavorites);
            return true;
        } catch (error) {
            console.error('Error removing from favorites:', error);
            Alert.alert('Erreur', 'Impossible de retirer des favoris');
            return false;
        }
    };

    const toggleFavorite = async (product) => {
        const isFavorite = favorites.find(item => item.id === product.id);
        if (isFavorite) {
            return await removeFromFavorites(product.id);
        } else {
            return await addToFavorites(product);
        }
    };

    const isFavorite = (productId) => {
        return favorites.some(item => item.id === productId);
    };

    const clearFavorites = async () => {
        try {
            setFavorites([]);
            await StorageService.setItem(FAVORITES_KEY, []);
            return true;
        } catch (error) {
            console.error('Error clearing favorites:', error);
            return false;
        }
    };

    const value = {
        favorites,
        loading,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        favoritesCount: favorites.length,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
};

export default FavoritesContext;
