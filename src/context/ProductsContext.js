// src/context/ProductsContext.js
// Context for managing artisan products (CRUD operations)
// - Add new products
// - Edit existing products
// - Delete products
// - Get products by artisan

import React, { createContext, useContext, useState, useEffect } from 'react';
import HttpService from '../services/HttpService';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';

const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load products from API on mount
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async (filters = {}) => {
        try {
            setIsLoading(true);
            
            // Construire les query params
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category);
            if (filters.search) params.append('search', filters.search);
            if (filters.artisan_id) params.append('artisan_id', filters.artisan_id);
            
            const queryString = params.toString();
            const endpoint = queryString 
                ? `${API_ENDPOINTS.PRODUCTS}?${queryString}`
                : API_ENDPOINTS.PRODUCTS;

            const response = await HttpService.get(endpoint);

            if (response.success) {
                // Adapter le format des produits pour correspondre au format attendu
                const adaptedProducts = response.products.map(p => ({
                    id: p.id.toString(),
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
                    stock: p.stock,
                    views: p.views || 0,
                    likes: p.likes || 0,
                    rating: parseFloat(p.rating) || 0,
                    sales: p.sales || 0,
                    createdAt: p.created_at,
                }));
                
                console.log('📦 Produits chargés:', adaptedProducts.length);
                if (adaptedProducts.length > 0) {
                    console.log('🖼️ Première image:', adaptedProducts[0].image);
                }
                
                setProducts(adaptedProducts);
            }
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Add new product
    const addProduct = async (productData) => {
        try {
            console.log('📦 Ajout produit - productData reçu:', {
                name: productData.name,
                category: productData.category,
                price: productData.price,
                stock: productData.stock,
                hasImage: !!productData.image,
                imageUri: productData.image,
            });

            // Créer un FormData pour l'upload de l'image
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('price', productData.price.toString());
            formData.append('category', productData.category);
            formData.append('stock', productData.stock.toString());

            // Ajouter l'image si elle existe
            if (productData.image) {
                const uri = productData.image;
                const filename = uri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : 'image/jpeg';

                formData.append('image', {
                    uri,
                    name: filename,
                    type,
                });

                console.log('🖼️ Image ajoutée au FormData:', { 
                    uri, 
                    filename, 
                    type,
                    uriLength: uri.length 
                });
            } else {
                console.warn('⚠️ Aucune image fournie!');
            }

            console.log('📤 Envoi de la requête POST...');

            const response = await HttpService.post(
                API_ENDPOINTS.CREATE_PRODUCT,
                formData,
                true // Requires auth
            );

            if (response.success) {
                // Adapter le produit retourné
                const newProduct = {
                    id: response.product.id.toString(),
                    name: response.product.name,
                    description: response.product.description,
                    price: parseFloat(response.product.price),
                    category: response.product.category,
                    image: response.product.image_url 
                        ? `${API_BASE_URL}${response.product.image_url}`
                        : null,
                    artisanId: response.product.artisan_id?.toString(),
                    artisanName: response.product.artisan_name,
                    stock: response.product.stock || 0,
                };

                // Ajouter au state local
                setProducts(prev => [newProduct, ...prev]);

                console.log('✅ Produit ajouté avec succès:', newProduct);

                return { success: true, product: newProduct };
            }

            return { success: false, error: response.error };
        } catch (error) {
            console.error('❌ Error adding product:', error);
            return { success: false, error: error.message };
        }
    };

    // Update existing product
    const updateProduct = async (productId, updates) => {
        try {
            const response = await HttpService.put(
                API_ENDPOINTS.UPDATE_PRODUCT(productId),
                {
                    name: updates.name,
                    description: updates.description,
                    price: updates.price ? parseFloat(updates.price) : undefined,
                    category: updates.category,
                    image_url: updates.image,
                    stock: updates.stock ? parseInt(updates.stock) : undefined,
                },
                true
            );

            if (response.success) {
                // Adapter le produit retourné
                const updatedProduct = {
                    id: response.product.id.toString(),
                    name: response.product.name,
                    description: response.product.description,
                    price: parseFloat(response.product.price),
                    category: response.product.category,
                    image: response.product.image_url,
                    artisanId: response.product.artisan_id?.toString(),
                    stock: response.product.stock,
                    views: response.product.views || 0,
                    likes: response.product.likes || 0,
                    rating: parseFloat(response.product.rating) || 0,
                    createdAt: response.product.created_at,
                };
                
                setProducts(prev =>
                    prev.map(p => p.id === productId ? updatedProduct : p)
                );
                return { success: true };
            }
            
            return { success: false, error: response.error };
        } catch (error) {
            console.error('Error updating product:', error);
            return { success: false, error: error.message || 'Erreur lors de la mise à jour' };
        }
    };

    // Delete product
    const deleteProduct = async (productId) => {
        try {
            const response = await HttpService.delete(
                API_ENDPOINTS.DELETE_PRODUCT(productId),
                true
            );

            if (response.success) {
                setProducts(prev => prev.filter(p => p.id !== productId));
                return { success: true };
            }
            
            return { success: false, error: response.error };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, error: error.message || 'Erreur lors de la suppression' };
        }
    };

    // Get product by ID
    const getProductById = (productId) => {
        return products.find(product => product.id === productId);
    };

    // Get products by artisan
    const getProductsByArtisan = (artisanId) => {
        // Convertir l'ID en string pour la comparaison
        const artisanIdStr = artisanId?.toString();
        return products.filter(product => product.artisanId === artisanIdStr);
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
