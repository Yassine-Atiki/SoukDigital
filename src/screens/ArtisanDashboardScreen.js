import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { useProducts } from '../context/ProductsContext';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const ArtisanDashboardScreen = ({ navigation }) => {
    const { getProductsByArtisan, products } = useProducts();
    const { user } = useAuth();
    const [myProducts, setMyProducts] = useState([]);

    // Function to load products
    const loadMyProducts = useCallback(() => {
        const artisanProducts = getProductsByArtisan(user?.id || 'artisan_1');
        setMyProducts(artisanProducts.slice(0, 3)); // Show only first 3 in dashboard
    }, [getProductsByArtisan, user]);

    // Load products when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadMyProducts();
        }, [loadMyProducts])
    );

    // Also load when products context changes
    useEffect(() => {
        loadMyProducts();
    }, [products, loadMyProducts]);

    const renderProductItem = ({ item }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} MAD</Text>
                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Ionicons name="eye-outline" size={14} color={COLORS.textTertiary} />
                        <Text style={styles.statText}>{item.views || 0}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Ionicons name="heart-outline" size={14} color={COLORS.textTertiary} />
                        <Text style={styles.statText}>{item.likes || 0}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.editButton}
                onPress={() => navigation.navigate('AddEditProduct', { productId: item.id })}
            >
                <Ionicons name="create-outline" size={20} color={COLORS.surface} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Tableau de bord</Text>
                    <Text style={styles.title}>Mon Atelier</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Stats Overview */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>12,450</Text>
                        <Text style={styles.statLabel}>Ventes (MAD)</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>24</Text>
                        <Text style={styles.statLabel}>Commandes</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>4.8</Text>
                        <Text style={styles.statLabel}>Note</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('AddEditProduct')}
                    >
                        <View style={[styles.actionIcon, { backgroundColor: COLORS.primaryLight }]}>
                            <Ionicons name="add" size={24} color={COLORS.primary} />
                        </View>
                        <Text style={styles.actionText}>Ajouter un produit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('ManageProducts')}
                    >
                        <View style={[styles.actionIcon, { backgroundColor: COLORS.secondaryLight }]}>
                            <Ionicons name="grid-outline" size={24} color={COLORS.secondary} />
                        </View>
                        <Text style={styles.actionText}>Gérer mes produits</Text>
                    </TouchableOpacity>
                </View>

                {/* My Products */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Mes Créations</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ManageProducts')}>
                        <Text style={styles.seeAllText}>Voir tout</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={myProducts}
                    renderItem={renderProductItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.productsList}
                />

                {/* Recent Orders */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Commandes Récentes</Text>
                </View>

                {/* Mock Order Item */}
                <View style={styles.orderCard}>
                    <View style={styles.orderHeader}>
                        <Text style={styles.orderId}>#CMD-284</Text>
                        <Text style={styles.orderStatus}>En cours</Text>
                    </View>
                    <Text style={styles.orderDate}>Aujourd'hui, 14:30</Text>
                    <Text style={styles.orderTotal}>450 MAD</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
        paddingVertical: SPACING.m,
    },
    greeting: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    title: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: COLORS.gold,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        paddingBottom: SPACING.xxl,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.l,
        marginBottom: SPACING.l,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        marginHorizontal: 4,
        alignItems: 'center',
        ...SHADOWS.subtle,
    },
    statValue: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textTertiary,
    },
    actionsContainer: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.l,
        marginBottom: SPACING.xl,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        marginRight: SPACING.m,
        ...SHADOWS.subtle,
    },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.s,
    },
    actionText: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.text,
        flex: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
        marginBottom: SPACING.m,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    seeAllText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
    productsList: {
        paddingHorizontal: SPACING.l,
        marginBottom: SPACING.xl,
    },
    productCard: {
        width: 160,
        marginRight: SPACING.m,
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.medium,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    productInfo: {
        padding: SPACING.s,
    },
    productName: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: FONTS.sizes.sm,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    statText: {
        fontSize: 10,
        color: COLORS.textTertiary,
        marginLeft: 2,
    },
    editButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: COLORS.primary,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.subtle,
    },
    orderCard: {
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.l,
        padding: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.subtle,
        marginBottom: SPACING.s,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    orderId: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    orderStatus: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.secondary,
        fontWeight: 'bold',
        backgroundColor: COLORS.secondaryLight,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    orderDate: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textTertiary,
        marginBottom: 8,
    },
    orderTotal: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
});

export default ArtisanDashboardScreen;
