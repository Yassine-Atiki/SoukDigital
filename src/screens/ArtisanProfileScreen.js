import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    FlatList,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { useProducts } from '../context/ProductsContext';

const { width, height } = Dimensions.get('window');

const ArtisanProfileScreen = ({ navigation, route }) => {
    const { artisan } = route.params;
    const { products, loading } = useProducts();
    const [artisanProducts, setArtisanProducts] = useState([]);

    useEffect(() => {
        // Filtrer les produits de cet artisan depuis la base de données
        if (products && products.length > 0) {
            const filtered = products.filter(p => 
                p.artisanId === artisan.id || 
                p.artisanName === artisan.name ||
                p.artisan === artisan.name
            );
            setArtisanProducts(filtered);
        }
    }, [products, artisan]);

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.push('ProductDetail', { product: item })}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} MAD</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Image */}
                <View style={styles.headerContainer}>
                    <Image source={{ uri: artisan.image }} style={styles.headerImage} />
                    <View style={styles.overlay} />

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.surface} />
                    </TouchableOpacity>

                    <View style={styles.headerContent}>
                        <Text style={styles.specialty}>{artisan.specialty.toUpperCase()}</Text>
                        <Text style={styles.name}>{artisan.name}</Text>
                        <View style={styles.locationContainer}>
                            <Ionicons name="location-outline" size={16} color={COLORS.gold} />
                            <Text style={styles.location}>{artisan.location}</Text>
                        </View>
                    </View>
                </View>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{artisan.rating}</Text>
                        <Text style={styles.statLabel}>Note</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{artisanProducts.length}</Text>
                        <Text style={styles.statLabel}>Créations</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{artisan.reviews}</Text>
                        <Text style={styles.statLabel}>Avis</Text>
                    </View>
                </View>

                {/* Bio Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>L'Histoire</Text>
                    <Text style={styles.bioText}>{artisan.bio}</Text>
                </View>

                {/* Products Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Créations</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Voir tout</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={artisanProducts}
                        renderItem={renderProductItem}
                        keyExtractor={item => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productsList}
                    />
                </View>

                {/* Contact Button */}
                <View style={styles.contactContainer}>
                    <TouchableOpacity style={styles.contactButton}>
                        <Ionicons name="chatbubble-ellipses-outline" size={20} color={COLORS.surface} />
                        <Text style={styles.contactButtonText}>Contacter l'Artisan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerContainer: {
        height: height * 0.4,
        width: '100%',
        position: 'relative',
        justifyContent: 'flex-end',
    },
    headerImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 40,
        left: SPACING.l,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        padding: SPACING.l,
        paddingBottom: SPACING.xl,
    },
    specialty: {
        color: COLORS.gold,
        fontSize: FONTS.sizes.xs,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: SPACING.xs,
    },
    name: {
        color: COLORS.surface,
        fontSize: FONTS.sizes.xxxl,
        fontWeight: 'bold',
        marginBottom: SPACING.xs,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        color: COLORS.surface,
        fontSize: FONTS.sizes.sm,
        marginLeft: 4,
        opacity: 0.9,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.l,
        marginTop: -SPACING.l,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.m,
        ...SHADOWS.medium,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    statLabel: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textTertiary,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: '60%',
        backgroundColor: COLORS.border,
    },
    sectionContainer: {
        padding: SPACING.l,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.s,
    },
    bioText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        lineHeight: 24,
    },
    seeAllText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
    productsList: {
        paddingRight: SPACING.l,
    },
    productCard: {
        width: 160,
        marginRight: SPACING.m,
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.md,
        ...SHADOWS.subtle,
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
    },
    contactContainer: {
        padding: SPACING.l,
        paddingBottom: SPACING.xxl,
    },
    contactButton: {
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.medium,
    },
    contactButtonText: {
        color: COLORS.surface,
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        marginLeft: SPACING.s,
    },
});

export default ArtisanProfileScreen;
