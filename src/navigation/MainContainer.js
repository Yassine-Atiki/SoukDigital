import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ArtisanDashboardScreen from '../screens/ArtisanDashboardScreen';
import { COLORS, SHADOWS, FONTS } from '../constants/theme';

const Tab = createBottomTabNavigator();

const MainContainer = ({ route }) => {
    const { userType } = route.params || { userType: 'customer' };

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
                    height: Platform.OS === 'ios' ? 88 : 60,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
                    paddingTop: 8,
                    ...SHADOWS.medium,
                },
                tabBarLabelStyle: {
                    fontFamily: FONTS.medium,
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

export default MainContainer;
