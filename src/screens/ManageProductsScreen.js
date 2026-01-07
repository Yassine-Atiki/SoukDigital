// src/screens/ManageProductsScreen.js
// Screen for artisans to view, edit, and delete their products
// - List all products of the artisan
// - Edit product functionality
// - Delete product with confirmation
// - View product stats (views, likes, sales)
// - Auto-refresh when screen comes into focus

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Image,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { useProducts } from '../context/ProductsContext';
import { useAuth } from '../context/AuthContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const ManageProductsScreen = ({ navigation }) => {
    const { products, deleteProduct, getProductsByArtisan } = useProducts();
    const { user } = useAuth();
    const [myProducts, setMyProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadMyProducts = useCallback(() => {
        const artisanProducts = getProductsByArtisan(user?.id || 'artisan_1');
        setMyProducts(artisanProducts);
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

    const handleRefresh = () => {
        setRefreshing(true);
        loadMyProducts();
        setRefreshing(false);
    };

    const handleEdit = (product) => {
        navigation.navigate('AddEditProduct', { productId: product.id });
    };

    const handleDelete = (product) => {
        Alert.alert(
            'Supprimer le produit',
            `Êtes-vous sûr de vouloir supprimer "${product.name}" ?`,
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: async () => {
                        const result = await deleteProduct(product.id);
                        if (result.success) {
                            Alert.alert('Succès', 'Produit supprimé avec succès');
                        } else {
                            Alert.alert('Erreur', result.error || 'Erreur lors de la suppression');
                        }
                    },
                },
            ]
        );
    };

    const renderProductItem = ({ item }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} MAD</Text>
                
                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Ionicons name="eye-outline" size={16} color={COLORS.textTertiary} />
                        <Text style={styles.statText}>{item.views || 0}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Ionicons name="heart-outline" size={16} color={COLORS.textTertiary} />
                        <Text style={styles.statText}>{item.likes || 0}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Ionicons name="cube-outline" size={16} color={COLORS.textTertiary} />
                        <Text style={styles.statText}>{item.stock || 0}</Text>
                    </View>
                </View>

                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => handleEdit(item)}
                >
                    <Ionicons name="create-outline" size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item)}
                >
                    <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={80} color={COLORS.textTertiary} />
            <Text style={styles.emptyTitle}>Aucun produit</Text>
            <Text style={styles.emptyDescription}>
                Commencez par ajouter votre premier produit
            </Text>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddEditProduct')}
            >
                <Ionicons name="add" size={24} color={COLORS.surface} />
                <Text style={styles.addButtonText}>Ajouter un produit</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaWrapper backgroundColor={COLORS.background}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mes Produits</Text>
                <TouchableOpacity
                    style={styles.addIconButton}
                    onPress={() => navigation.navigate('AddEditProduct')}
                >
                    <Ionicons name="add" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            {/* Products List */}
            <FlatList
                data={myProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListEmptyComponent={renderEmptyState}
            />
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
    addIconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: SPACING.l,
    },
    productCard: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.l,
        overflow: 'hidden',
        ...SHADOWS.medium,
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    productInfo: {
        padding: SPACING.m,
    },
    productName: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    productPrice: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: SPACING.m,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.l,
    },
    statText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginLeft: SPACING.xs,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
    },
    categoryText: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.primary,
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SPACING.m,
    },
    editButton: {
        borderRightWidth: 1,
        borderRightColor: COLORS.border,
    },
    deleteButton: {},
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SPACING.xxxl * 2,
    },
    emptyTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: SPACING.l,
        marginBottom: SPACING.xs,
    },
    emptyDescription: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: SPACING.xl,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.m,
        borderRadius: BORDER_RADIUS.full,
        ...SHADOWS.medium,
    },
    addButtonText: {
        fontSize: FONTS.sizes.md,
        fontWeight: '600',
        color: COLORS.surface,
        marginLeft: SPACING.s,
    },
});

export default ManageProductsScreen;
