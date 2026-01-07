// src/screens/OrderHistoryScreen.js
// Implements TESTING_GUIDE Section 3.6: OrderHistoryScreen
// - Tab system: Toutes/En préparation/En transit/Livrées
// - Order cards with status icons and colors
// - Order details: number, date, items, total
// - Empty state by category
// - Synchronized with CheckoutScreen via OrdersContext
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import MoroccanDivider from '../components/MoroccanDivider';
import { useOrders } from '../context/OrdersContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const OrderHistoryScreen = ({ navigation }) => {
    const { orders } = useOrders();
    const [selectedTab, setSelectedTab] = useState('all');

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return COLORS.success;
            case 'in_transit':
                return COLORS.info;
            case 'processing':
                return COLORS.warning;
            case 'cancelled':
                return COLORS.error;
            default:
                return COLORS.textTertiary;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'delivered':
                return 'Livrée';
            case 'in_transit':
                return 'En transit';
            case 'processing':
                return 'En préparation';
            case 'cancelled':
                return 'Annulée';
            default:
                return 'Inconnue';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return 'checkmark-circle';
            case 'in_transit':
                return 'car-outline';
            case 'processing':
                return 'time-outline';
            case 'cancelled':
                return 'close-circle';
            default:
                return 'help-circle-outline';
        }
    };

    const filteredOrders = selectedTab === 'all'
        ? orders
        : orders.filter(order => order.status === selectedTab);

    return (
        <SafeAreaWrapper backgroundColor={COLORS.background}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mes commandes</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'all' && styles.tabActive]}
                    onPress={() => setSelectedTab('all')}
                >
                    <Text style={[styles.tabText, selectedTab === 'all' && styles.tabTextActive]}>
                        Toutes
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'processing' && styles.tabActive]}
                    onPress={() => setSelectedTab('processing')}
                >
                    <Text style={[styles.tabText, selectedTab === 'processing' && styles.tabTextActive]}>
                        En préparation
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'in_transit' && styles.tabActive]}
                    onPress={() => setSelectedTab('in_transit')}
                >
                    <Text style={[styles.tabText, selectedTab === 'in_transit' && styles.tabTextActive]}>
                        En transit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'delivered' && styles.tabActive]}
                    onPress={() => setSelectedTab('delivered')}
                >
                    <Text style={[styles.tabText, selectedTab === 'delivered' && styles.tabTextActive]}>
                        Livrées
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Orders List */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                        <View key={order.id}>
                            <View style={styles.orderCard}>
                                {/* Order Header */}
                                <View style={styles.orderHeader}>
                                    <View>
                                        <Text style={styles.orderId}>Commande {order.id}</Text>
                                        <Text style={styles.orderDate}>{order.date}</Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                                        <Ionicons
                                            name={getStatusIcon(order.status)}
                                            size={16}
                                            color={getStatusColor(order.status)}
                                        />
                                        <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                                            {getStatusText(order.status)}
                                        </Text>
                                    </View>
                                </View>

                                <MoroccanDivider />

                                {/* Order Items */}
                                {order.items.map((item, itemIndex) => (
                                    <View key={itemIndex} style={styles.orderItem}>
                                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                                        <View style={styles.itemInfo}>
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemQuantity}>Quantité: {item.quantity}</Text>
                                        </View>
                                        <Text style={styles.itemPrice}>{item.price} DH</Text>
                                    </View>
                                ))}

                                {/* Order Footer */}
                                <View style={styles.orderFooter}>
                                    <View>
                                        <Text style={styles.totalLabel}>Total</Text>
                                        <Text style={styles.totalAmount}>{order.total} DH</Text>
                                    </View>
                                    <TouchableOpacity style={styles.detailsButton}>
                                        <Text style={styles.detailsButtonText}>Détails</Text>
                                        <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {index < filteredOrders.length - 1 && <View style={styles.separator} />}
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="receipt-outline" size={80} color={COLORS.textTertiary} />
                        <Text style={styles.emptyTitle}>Aucune commande</Text>
                        <Text style={styles.emptyText}>
                            Vous n'avez pas encore de commande dans cette catégorie
                        </Text>
                    </View>
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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.l,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    tabsContainer: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    tab: {
        paddingHorizontal: SPACING.l,
        paddingVertical: SPACING.m,
        marginHorizontal: SPACING.xs,
    },
    tabActive: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    tabText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    tabTextActive: {
        color: COLORS.primary,
        fontWeight: '700',
    },
    orderCard: {
        padding: SPACING.l,
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.l,
        marginVertical: SPACING.m,
        borderRadius: BORDER_RADIUS.md,
        ...SHADOWS.medium,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.m,
    },
    orderId: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    orderDate: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
    },
    statusText: {
        fontSize: FONTS.sizes.xs,
        fontWeight: '600',
        marginLeft: SPACING.xs,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.s,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: BORDER_RADIUS.sm,
        marginRight: SPACING.m,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    itemQuantity: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textSecondary,
    },
    itemPrice: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.m,
        paddingTop: SPACING.m,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    totalLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    totalAmount: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s,
        backgroundColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.sm,
    },
    detailsButtonText: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.primary,
        marginRight: SPACING.xs,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.border,
        marginHorizontal: SPACING.l,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
        marginTop: SPACING.xxxl,
    },
    emptyTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: SPACING.l,
        marginBottom: SPACING.s,
    },
    emptyText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
});

export default OrderHistoryScreen;
