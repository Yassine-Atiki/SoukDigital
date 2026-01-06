// src/context/ProductsContext.js
// Context for managing artisan products (CRUD operations)
// - Add new products
// - Edit existing products
// - Delete products
// - Get products by artisan

import React, { createContext, useContext, useState, useEffect } from 'react';
import StorageService from '../services/StorageService';
import { PRODUCTS } from '../data/mockData';

const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};

const PRODUCTS_STORAGE_KEY = 'souk_products';

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load products from storage on mount
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const storedProducts = await StorageService.getItem(PRODUCTS_STORAGE_KEY);
            if (storedProducts && storedProducts.length > 0) {
                setProducts(storedProducts);
            } else {
                // Initialize with mock data
                await StorageService.setItem(PRODUCTS_STORAGE_KEY, PRODUCTS);
                setProducts(PRODUCTS);
            }
        } catch (error) {
            console.error('Error loading products:', error);
            setProducts(PRODUCTS);
        } finally {
            setIsLoading(false);
        }
    };

    // Add new product
    const addProduct = async (productData) => {
        try {
            const newProduct = {
                id: Date.now().toString(),
                ...productData,
                createdAt: new Date().toISOString(),
                views: 0,
                likes: 0,
                sales: 0,
            };

            const updatedProducts = [...products, newProduct];
            await StorageService.setItem(PRODUCTS_STORAGE_KEY, updatedProducts);
            setProducts(updatedProducts);

            return { success: true, product: newProduct };
        } catch (error) {
            console.error('Error adding product:', error);
            return { success: false, error: 'Erreur lors de l\'ajout du produit' };
        }
    };

    // Update existing product
    const updateProduct = async (productId, updates) => {
        try {
            const updatedProducts = products.map(product =>
                product.id === productId
                    ? { ...product, ...updates, updatedAt: new Date().toISOString() }
                    : product
            );

            await StorageService.setItem(PRODUCTS_STORAGE_KEY, updatedProducts);
            setProducts(updatedProducts);

            return { success: true };
        } catch (error) {
            console.error('Error updating product:', error);
            return { success: false, error: 'Erreur lors de la mise à jour' };
        }
    };

    // Delete product
    const deleteProduct = async (productId) => {
        try {
            const updatedProducts = products.filter(product => product.id !== productId);
            await StorageService.setItem(PRODUCTS_STORAGE_KEY, updatedProducts);
            setProducts(updatedProducts);

            return { success: true };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, error: 'Erreur lors de la suppression' };
        }
    };

    // Get product by ID
    const getProductById = (productId) => {
        return products.find(product => product.id === productId);
    };

    // Get products by artisan
    const getProductsByArtisan = (artisanId) => {
        return products.filter(product => product.artisanId === artisanId);
    };

    // Get all products
    const getAllProducts = () => {
        return products;
    };

    const value = {
        products,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByArtisan,
        getAllProducts,
        refreshProducts: loadProducts,
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};
