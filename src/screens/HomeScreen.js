import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - SPACING.l * 2 - SPACING.m) / 2;

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [selectedCategory, setSelectedCategory] = useState('Tout');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = PRODUCTS.filter(product => {
        const matchesCategory = selectedCategory === 'Tout' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const renderCategoryItem = ({ item }) => {
        const isSelected = selectedCategory === item.name;
        return (
            <TouchableOpacity
                style={[
                    styles.categoryItem,
                    isSelected && styles.categoryItemActive,
                ]}
                onPress={() => setSelectedCategory(item.name)}
            >
                <Ionicons
                    name={item.icon}
                    size={20}
                    color={isSelected ? COLORS.surface : COLORS.textSecondary}
                />
                <Text
                    style={[
                        styles.categoryText,
                        isSelected && styles.categoryTextActive,
                    ]}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.artisanName}>{item.artisan}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>{item.price} MAD</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={12} color={COLORS.gold} />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Bonjour,</Text>
                    <Text style={styles.title}>Digital Souk</Text>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
                    <View style={styles.badge} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={COLORS.textTertiary} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher un produit..."
                    placeholderTextColor={COLORS.textTertiary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={20} color={COLORS.surface} />
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                <FlatList
                    data={CATEGORIES}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                />
            </View>

            {/* Products Grid */}
            <FlatList
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                contentContainerStyle={styles.productsList}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Aucun produit trouvé</Text>
                    </View>
                }
            />
        </View>
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
        fontFamily: FONTS.regular,
    },
    title: {
        fontSize: FONTS.sizes.xl,
        color: COLORS.primary,
        fontWeight: 'bold',
        fontFamily: FONTS.bold,
    },
    notificationButton: {
        padding: SPACING.s,
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.round,
        ...SHADOWS.subtle,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.error,
        borderWidth: 1,
        borderColor: COLORS.surface,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
        marginBottom: SPACING.l,
    },
    searchIcon: {
        position: 'absolute',
        left: SPACING.l + SPACING.m,
        zIndex: 1,
    },
    searchInput: {
        flex: 1,
        backgroundColor: COLORS.surface,
        height: 50,
        borderRadius: BORDER_RADIUS.lg,
        paddingLeft: SPACING.xl * 1.5,
        paddingRight: SPACING.m,
        fontSize: FONTS.sizes.md,
        color: COLORS.text,
        ...SHADOWS.subtle,
    },
    filterButton: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.lg,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SPACING.m,
        ...SHADOWS.primary,
    },
    categoriesContainer: {
        marginBottom: SPACING.l,
    },
    categoriesList: {
        paddingHorizontal: SPACING.l,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.s,
        paddingHorizontal: SPACING.m,
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.full,
        marginRight: SPACING.s,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    categoryItemActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryText: {
        marginLeft: SPACING.xs,
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        fontWeight: '600',
    },
    categoryTextActive: {
        color: COLORS.surface,
    },
    productsList: {
        paddingHorizontal: SPACING.l,
        paddingBottom: SPACING.xxl,
    },
    productRow: {
        justifyContent: 'space-between',
        marginBottom: SPACING.m,
    },
    productCard: {
        width: COLUMN_WIDTH,
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.medium,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 140,
        width: '100%',
        backgroundColor: COLORS.backgroundAlt,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    favoriteButton: {
        position: 'absolute',
        top: SPACING.s,
        right: SPACING.s,
        backgroundColor: COLORS.surface,
        padding: SPACING.xs,
        borderRadius: BORDER_RADIUS.round,
        ...SHADOWS.subtle,
    },
    productInfo: {
        padding: SPACING.s,
    },
    productName: {
        fontSize: FONTS.sizes.sm,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 2,
    },
    artisanName: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textTertiary,
        marginBottom: SPACING.xs,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundAlt,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.text,
        marginLeft: 2,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: SPACING.xl,
    },
    emptyText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textTertiary,
    },
});

export default HomeScreen;
