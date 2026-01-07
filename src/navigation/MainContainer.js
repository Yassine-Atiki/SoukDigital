import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ArtisanDashboardScreen from '../screens/ArtisanDashboardScreen';
import { COLORS, SHADOWS, FONTS } from '../constants/theme';
import { useCart } from '../context/CartContext';

const Tab = createBottomTabNavigator();

const MainContainer = ({ route }) => {
    const { userType } = route.params || { userType: 'customer' };
    const { itemCount } = useCart();
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textTertiary,
                tabBarStyle: {
                    backgroundColor: COLORS.surface,
                    borderTopWidth: 0,
                    elevation: 10,
                    height: (Platform.OS === 'ios' ? 50 : 60) + insets.bottom,
                    paddingBottom: insets.bottom,
                    paddingTop: 8,
                    ...SHADOWS.medium,
                },
                tabBarLabelStyle: {
                    fontWeight: FONTS.weights.medium,
                    fontSize: 12,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (userType === 'artisan') {
                        if (route.name === 'Dashboard') {
                            iconName = focused ? 'grid' : 'grid-outline';
                        } else if (route.name === 'Orders') {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                    } else {
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Cart') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                    }

                    // Show badge for cart icon
                    if (route.name === 'Cart' && itemCount > 0) {
                        return (
                            <View>
                                <Ionicons name={iconName} size={size} color={color} />
                                <View style={styles.cartBadge}>
                                    <Text style={styles.cartBadgeText}>{itemCount > 9 ? '9+' : itemCount}</Text>
                                </View>
                            </View>
                        );
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            {userType === 'artisan' ? (
                <>
                    <Tab.Screen name="Dashboard" component={ArtisanDashboardScreen} />
                    <Tab.Screen name="Orders" component={CartScreen} options={{ title: 'Commandes' }} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </>
            ) : (
                <>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Cart" component={CartScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </>
            )}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    cartBadge: {
        position: 'absolute',
        top: -4,
        right: -8,
        backgroundColor: COLORS.error,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    cartBadgeText: {
        color: COLORS.surface,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default MainContainer;
