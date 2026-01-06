// src/screens/FavoritesScreen.js
// Implements TESTING_GUIDE Section 3.4: FavoritesScreen
// - View favorites list
// - Remove favorites functionality
// - Navigate to ProductDetail
// - Empty state with "Découvrir les produits" button
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { useFavorites } from '../context/FavoritesContext';
import CustomButton from '../components/CustomButton';

const FavoritesScreen = ({ navigation }) => {
    const { favorites, removeFromFavorites, loading } = useFavorites();

    const renderFavoriteItem = ({ item }) => (
        <TouchableOpacity
            style={styles.favoriteCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.artisanName}>{item.artisan}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>{item.price} MAD</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color={COLORS.gold} />
                        <Text style={styles.rating}>{item.rating}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromFavorites(item.id)}
                activeOpacity={0.7}
            >
                <Ionicons name="heart" size={24} color={COLORS.error} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mes Favoris</Text>
                <View style={{ width: 40 }} />
            </View>

            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderFavoriteItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={64} color={COLORS.textTertiary} />
                    <Text style={styles.emptyText}>Aucun favori pour le moment</Text>
                    <TouchableOpacity
                        style={styles.shopButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.shopButtonText}>Découvrir les produits</Text>
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
    listContent: {
        padding: SPACING.l,
    },
    favoriteCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        ...SHADOWS.sm,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: BORDER_RADIUS.md,
    },
    productInfo: {
        flex: 1,
        marginLeft: SPACING.m,
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: FONTS.sizes.md,
        fontWeight: '600',
        color: COLORS.text,
    },
    artisanName: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        marginLeft: 4,
        fontSize: FONTS.sizes.sm,
        color: COLORS.text,
        fontWeight: '600',
    },
    removeButton: {
        padding: SPACING.s,
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
        marginTop: SPACING.l,
        marginBottom: SPACING.xl,
    },
    shopButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
    },
    shopButtonText: {
        color: COLORS.surface,
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
    },
});

export default FavoritesScreen;
