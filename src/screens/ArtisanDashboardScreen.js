import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { useProducts } from '../context/ProductsContext';
import { useAuth } from '../context/AuthContext';
import ArtisanService from '../services/ArtisanService';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { API_BASE_URL } from '../config/api';

const { width } = Dimensions.get('window');

const ArtisanDashboardScreen = ({ navigation }) => {
    const { getProductsByArtisan, products } = useProducts();
    const { user } = useAuth();
    const [myProducts, setMyProducts] = useState([]);
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        rating: '0.0',
        totalReviews: 0,
        activeProducts: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Function to load all data
    const loadDashboardData = useCallback(async () => {
        // Ne pas charger si l'utilisateur n'est pas connecté
        if (!user) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);

            // Charger les produits
            const artisanProducts = getProductsByArtisan(user?.id || 'artisan_1');
            setMyProducts(artisanProducts.slice(0, 3));

            // Charger les statistiques
            const statsResult = await ArtisanService.getArtisanStats();
            if (statsResult.success) {
                setStats(statsResult.stats);
            }

            // Charger les commandes récentes
            const ordersResult = await ArtisanService.getRecentOrders(3);
            if (ordersResult.success) {
                setRecentOrders(ordersResult.orders);
            }

        } catch (error) {
            console.error('❌ Erreur chargement dashboard:', error);
        } finally {
            setIsLoading(false);
        }
    }, [getProductsByArtisan, user]);

    // Fonction de refresh
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadDashboardData();
        setRefreshing(false);
    }, [loadDashboardData]);

    // Load products when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadDashboardData();
        }, [loadDashboardData])
    );

    // Also load when products context changes
    useEffect(() => {
        loadDashboardData();
    }, [products, loadDashboardData]);

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
        <SafeAreaWrapper backgroundColor={COLORS.background} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Tableau de bord</Text>
                    <Text style={styles.title}>Mon Atelier</Text>
                </View>
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }
            >
                {/* Stats Overview */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color={COLORS.primary} />
                        ) : (
                            <>
                                <Text style={styles.statValue}>
                                    {ArtisanService.formatAmount(stats.totalSales)}
                                </Text>
                                <Text style={styles.statLabel}>Ventes (MAD)</Text>
                            </>
                        )}
                    </View>
                    <View style={styles.statCard}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color={COLORS.primary} />
                        ) : (
                            <>
                                <Text style={styles.statValue}>{stats.totalOrders}</Text>
                                <Text style={styles.statLabel}>Commandes</Text>
                            </>
                        )}
                    </View>
                    <View style={styles.statCard}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color={COLORS.primary} />
                        ) : (
                            <>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.statValue}>{stats.rating}</Text>
                                    <Ionicons name="star" size={20} color={COLORS.gold} style={styles.starIcon} />
                                </View>
                                <Text style={styles.statLabel}>Note ({stats.totalReviews} avis)</Text>
                            </>
                        )}
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
                    {recentOrders.length > 0 && (
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Voir tout</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                ) : recentOrders.length === 0 ? (
                    <View style={styles.emptyOrdersContainer}>
                        <Ionicons name="receipt-outline" size={64} color={COLORS.textTertiary} />
                        <Text style={styles.emptyOrdersText}>Aucune commande pour le moment</Text>
                        <Text style={styles.emptyOrdersSubtext}>
                            Les commandes de vos produits apparaîtront ici
                        </Text>
                    </View>
                ) : (
                    recentOrders.map((order) => (
                        <TouchableOpacity 
                            key={order.id}
                            style={styles.orderCard}
                            activeOpacity={0.7}
                        >
                            <View style={styles.orderHeader}>
                                <View style={styles.orderLeft}>
                                    <Image 
                                        source={{ 
                                            uri: order.productImage 
                                                ? `${API_BASE_URL}${order.productImage}`
                                                : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80'
                                        }}
                                        style={styles.productImage}
                                    />
                                    <View style={styles.orderInfo}>
                                        <Text style={styles.orderId}>#{order.orderNumber}</Text>
                                        <Text style={styles.customerName}>{order.customerName}</Text>
                                    </View>
                                </View>
                                <View 
                                    style={[
                                        styles.orderStatusBadge, 
                                        { backgroundColor: `${ArtisanService.getStatusColor(order.status)}20` }
                                    ]}
                                >
                                    <Text 
                                        style={[
                                            styles.orderStatus, 
                                            { color: ArtisanService.getStatusColor(order.status) }
                                        ]}
                                    >
                                        {ArtisanService.translateStatus(order.status)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.orderFooter}>
                                <View style={styles.orderDetails}>
                                    <Ionicons name="cube-outline" size={16} color={COLORS.textSecondary} />
                                    <Text style={styles.orderItemsCount}>
                                        {order.itemsCount} article{order.itemsCount > 1 ? 's' : ''}
                                    </Text>
                                </View>
                                <Text style={styles.orderTotal}>
                                    {ArtisanService.formatAmount(order.totalAmount)} MAD
                                </Text>
                            </View>
                            <Text style={styles.orderDate}>
                                {new Date(order.createdAt).toLocaleDateString('fr-FR', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                })}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </SafeAreaWrapper>
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
        marginBottom: SPACING.m,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.s,
    },
    orderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    customerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: SPACING.s,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: BORDER_RADIUS.sm,
        marginRight: SPACING.s,
        backgroundColor: COLORS.background,
    },
    orderInfo: {
        flex: 1,
    },
    orderId: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 2,
    },
    customerName: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    orderStatusBadge: {
        paddingHorizontal: SPACING.s,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
    },
    orderStatus: {
        fontSize: FONTS.sizes.xs,
        fontWeight: '600',
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.s,
        marginBottom: SPACING.xs,
    },
    orderDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderItemsCount: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginLeft: 4,
    },
    orderDate: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textTertiary,
    },
    orderTotal: {
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    loadingContainer: {
        padding: SPACING.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyOrdersContainer: {
        padding: SPACING.xxl,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.l,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.subtle,
    },
    emptyOrdersText: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginTop: SPACING.m,
        textAlign: 'center',
    },
    emptyOrdersSubtext: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textTertiary,
        marginTop: SPACING.xs,
        textAlign: 'center',
        paddingHorizontal: SPACING.l,
    },
});

export default ArtisanDashboardScreen;
