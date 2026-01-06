// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import StorageService from '../services/StorageService';

const CartContext = createContext();
const CART_KEY = 'souk_cart';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from storage on mount
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await StorageService.getItem(CART_KEY);
      if (savedCart) {
        setCartItems(savedCart);
      }
      setIsLoaded(true);
    };
    loadCart();
  }, []);

  // Calculate total and item count whenever cart changes, and save to storage
  useEffect(() => {
    if (!isLoaded) return;

    const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotal(newTotal);
    setItemCount(newCount);

    StorageService.setItem(CART_KEY, cartItems);
  }, [cartItems, isLoaded]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }];
      }
    });

    Alert.alert(
      'Ajouté au panier',
      `${product.name} a été ajouté à votre panier`,
      [{ text: 'OK' }]
    );
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, change) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
