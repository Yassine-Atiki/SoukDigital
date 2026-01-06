// src/screens/SearchScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';

// Mock data
const ALL_PRODUCTS = [
    {
        id: '1',
        name: 'Tajine Berbère',
        price: 450,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
        category: 'Cuisine',
        artisan: 'Fatima Zahra',
    },
    {
        id: '2',
        name: 'Tapis Amazigh',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
        category: 'Décoration',
        artisan: 'Hassan El Amrani',
    },
    {
        id: '3',
        name: 'Babouches Cuir',
        price: 280,
        image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400',
        category: 'Chaussures',
        artisan: 'Mohamed Tazi',
    },
    {
        id: '4',
        name: 'Théière en Argent',
        price: 850,
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
        category: 'Cuisine',
        artisan: 'Aicha Bennani',
    },
    {
        id: '5',
        name: 'Caftan Brodé',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400',
        category: 'Mode',
        artisan: 'Samira Alaoui',
    },
];

const POPULAR_SEARCHES = [
    'Tajine',
    'Tapis',
    'Babouches',
    'Caftan',
    'Théière',
    'Artisanat',
];

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        const results = ALL_PRODUCTS.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.artisan.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    };

    const handlePopularSearch = (term) => {
        setSearchQuery(term);
        handleSearch(term);
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            activeOpacity={0.7}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productArtisan}>{item.artisan}</Text>
                <Text style={styles.productPrice}>{item.price} DH</Text>
            </View>
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
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={COLORS.textTertiary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Rechercher des produits..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                        autoFocus
                    />
                    {searchQuery !== '' && (
                        <TouchableOpacity onPress={() => handleSearch('')}>
                            <Ionicons name="close-circle" size={20} color={COLORS.textTertiary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Content */}
            {searchQuery === '' ? (
                <View style={styles.popularSection}>
                    <Text style={styles.sectionTitle}>Recherches populaires</Text>
                    <View style={styles.tagsContainer}>
                        {POPULAR_SEARCHES.map((term, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.tag}
                                onPress={() => handlePopularSearch(term)}
                            >
                                <Text style={styles.tagText}>{term}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ) : searchResults.length > 0 ? (
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultsCount}>
                        {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''}
                    </Text>
                    <FlatList
                        data={searchResults}
                        renderItem={renderProduct}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            ) : (
                <View style={styles.emptyState}>
                    <Ionicons name="search-outline" size={80} color={COLORS.textTertiary} />
                    <Text style={styles.emptyTitle}>Aucun résultat</Text>
                    <Text style={styles.emptyText}>
                        Essayez d'autres mots-clés
                    </Text>
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
        padding: SPACING.l,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        marginRight: SPACING.m,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.m,
        height: 44,
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.s,
        fontSize: FONTS.sizes.md,
        color: COLORS.text,
    },
    popularSection: {
        padding: SPACING.l,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s,
        borderRadius: BORDER_RADIUS.full,
        marginRight: SPACING.s,
        marginBottom: SPACING.s,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tagText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    resultsContainer: {
        flex: 1,
        padding: SPACING.l,
    },
    resultsCount: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginBottom: SPACING.m,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        ...SHADOWS.medium,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: BORDER_RADIUS.sm,
    },
    productInfo: {
        flex: 1,
        marginLeft: SPACING.m,
        justifyContent: 'center',
    },
    productName: {
        fontSize: FONTS.sizes.md,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    productArtisan: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    productPrice: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
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

export default SearchScreen;
