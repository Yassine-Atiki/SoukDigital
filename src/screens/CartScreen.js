import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
    const { cartItems, total, updateQuantity, removeFromCart } = useCart();

    const handleRemoveItem = (id, name) => {
        Alert.alert(
            "Supprimer l'article",
            `Êtes-vous sûr de vouloir retirer "${name}" du panier ?`,
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: () => removeFromCart(id)
                }
            ]
        );
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.itemArtisan}>{item.artisan}</Text>
                <Text style={styles.itemPrice}>{item.price} MAD</Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                    >
                        <Ionicons name="remove" size={16} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                    >
                        <Ionicons name="add" size={16} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id, item.name)}
            >
                <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mon Panier</Text>
                <Text style={styles.itemCount}>{cartItems.length} articles</Text>
            </View>

            {cartItems.length > 0 ? (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalAmount}>{total} MAD</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={() => navigation.navigate('Checkout', { total })}
                        >
                            <Text style={styles.checkoutText}>Passer la commande</Text>
                            <Ionicons name="arrow-forward" size={20} color={COLORS.surface} />
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={64} color={COLORS.textTertiary} />
                    <Text style={styles.emptyText}>Votre panier est vide</Text>
                    <TouchableOpacity
                        style={styles.shopButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.shopButtonText}>Commencer vos achats</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.l,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    itemCount: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    listContent: {
        padding: SPACING.l,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        ...SHADOWS.subtle,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.backgroundAlt,
    },
    itemDetails: {
        flex: 1,
        marginLeft: SPACING.m,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: FONTS.sizes.md,
        fontWeight: '600',
        color: COLORS.text,
    },
    itemArtisan: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textTertiary,
    },
    itemPrice: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.xs,
    },
    quantityButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.backgroundAlt,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: SPACING.m,
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.text,
    },
    removeButton: {
        padding: SPACING.s,
        justifyContent: 'center',
    },
    footer: {
        padding: SPACING.l,
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        ...SHADOWS.strong,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    totalLabel: {
        fontSize: FONTS.sizes.lg,
        color: COLORS.textSecondary,
    },
    totalAmount: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    checkoutButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.primary,
    },
    checkoutText: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.surface,
        marginRight: SPACING.s,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    emptyText: {
        fontSize: FONTS.sizes.lg,
        color: COLORS.textSecondary,
        marginTop: SPACING.m,
        marginBottom: SPACING.xl,
    },
    shopButton: {
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.xl,
        backgroundColor: COLORS.secondary,
        borderRadius: BORDER_RADIUS.lg,
    },
    shopButtonText: {
        color: COLORS.surface,
        fontWeight: 'bold',
        fontSize: FONTS.sizes.md,
    },
});

export default CartScreen;
