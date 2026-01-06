import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainContainer from './MainContainer';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ArtisanProfileScreen from '../screens/ArtisanProfileScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AddressesScreen from '../screens/AddressesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import SearchScreen from '../screens/SearchScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import ManageProductsScreen from '../screens/ManageProductsScreen';
import AddEditProductScreen from '../screens/AddEditProductScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="Main" component={MainContainer} />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="ArtisanProfile"
                component={ArtisanProfileScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="Addresses"
                component={AddressesScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="PaymentMethods"
                component={PaymentMethodsScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="OrderHistory"
                component={OrderHistoryScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="ManageProducts"
                component={ManageProductsScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="AddEditProduct"
                component={AddEditProductScreen}
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
