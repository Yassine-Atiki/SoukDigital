// src/context/FavoritesContext.js
// Implements TESTING_GUIDE Section 5: Flux de favoris
// Provides global favorites management synchronized across ProductDetailScreen and FavoritesScreen

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import HttpService from '../services/HttpService';
import { API_ENDPOINTS } from '../config/api';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ne pas charger les favoris automatiquement au démarrage
        // Ils seront chargés après la connexion
        setLoading(false);
    }, []);

    const loadFavorites = async () => {
        try {
            setLoading(true);
            
            // Vérifier si l'utilisateur est connecté
            const token = await HttpService.getToken();
            if (!token) {
                setFavorites([]);
                setLoading(false);
                return;
            }
            
            const response = await HttpService.get(API_ENDPOINTS.FAVORITES, true);

            if (response.success) {
                // Adapter le format des favoris
                const adaptedFavorites = response.favorites.map(f => ({
                    id: f.id?.toString(),
                    name: f.name,
                    description: f.description,
                    price: parseFloat(f.price),
                    category: f.category,
                    image: f.image_url,
                    artisanId: f.artisan_id?.toString(),
                    artisanName: f.artisan_name,
                    artisanLocation: f.artisan_location,
                    rating: parseFloat(f.rating) || 0,
                }));
                
                setFavorites(adaptedFavorites);
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
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

            const response = await HttpService.post(
                API_ENDPOINTS.TOGGLE_FAVORITE,
                { productId: product.id },
                true
            );

            if (response.success && response.action === 'added') {
                const newFavorites = [...favorites, product];
                setFavorites(newFavorites);
                Alert.alert('Ajouté aux favoris', `${product.name} a été ajouté à vos favoris`);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error adding to favorites:', error);
            Alert.alert('Erreur', 'Impossible d\'ajouter aux favoris');
            return false;
        }
    };

    const removeFromFavorites = async (productId) => {
        try {
            const response = await HttpService.post(
                API_ENDPOINTS.TOGGLE_FAVORITE,
                { productId },
                true
            );

            if (response.success && response.action === 'removed') {
                const newFavorites = favorites.filter(item => item.id !== productId);
                setFavorites(newFavorites);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error removing from favorites:', error);
            Alert.alert('Erreur', 'Impossible de retirer des favoris');
            return false;
        }
    };

    const toggleFavorite = async (product) => {
        try {
            const response = await HttpService.post(
                API_ENDPOINTS.TOGGLE_FAVORITE,
                { productId: product.id },
                true
            );

            if (response.success) {
                if (response.action === 'added') {
                    // Charger le produit complet si nécessaire
                    const productResponse = await HttpService.get(
                        API_ENDPOINTS.PRODUCT_DETAIL(product.id)
                    );
                    if (productResponse.success) {
                        const adaptedProduct = {
                            id: productResponse.product.id?.toString(),
                            name: productResponse.product.name,
                            description: productResponse.product.description,
                            price: parseFloat(productResponse.product.price),
                            category: productResponse.product.category,
                            image: productResponse.product.image_url,
                            artisanId: productResponse.product.artisan_id?.toString(),
                            rating: parseFloat(productResponse.product.rating) || 0,
                        };
                        setFavorites(prev => [...prev, adaptedProduct]);
                    }
                    return true;
                } else {
                    // Retirer des favoris
                    setFavorites(prev => prev.filter(f => f.id !== product.id));
                    return true;
                }
            }
            
            return false;
        } catch (error) {
            console.error('Error toggle favorite:', error);
            return false;
        }
    };

    const isFavorite = (productId) => {
        return favorites.some(item => item.id === productId);
    };

    const clearFavorites = async () => {
        try {
            // Cette fonctionnalité nécessiterait un endpoint API pour supprimer tous les favoris
            // Pour l'instant, on peut les supprimer un par un
            setFavorites([]);
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
        loadFavorites, // Exposer loadFavorites directement pour AuthContext
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
