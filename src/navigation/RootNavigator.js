import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainContainer from './MainContainer';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ArtisanProfileScreen from '../screens/ArtisanProfileScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

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
        </Stack.Navigator>
    );
};

export default RootNavigator;
