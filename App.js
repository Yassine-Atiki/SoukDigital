import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { OrdersProvider } from './src/context/OrdersContext';
import { ProductsProvider } from './src/context/ProductsContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <OrdersProvider>
              <ProductsProvider>
                <NavigationContainer>
                  <StatusBar style="light" />
                  <RootNavigator />
                </NavigationContainer>
              </ProductsProvider>
            </OrdersProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
