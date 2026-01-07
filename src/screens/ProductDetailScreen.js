import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Platform,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const { width, height } = Dimensions.get('window');

// Implements TESTING_GUIDE Section 2.3: ProductDetailScreen
// - Favorite button functionality integrated with FavoritesContext
// - Add to cart with quantity selection
// - Navigation to artisan profile
const ProductDetailScreen = ({ navigation, route }) => {
    const { product } = route.params;
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite: checkIsFavorite } = useFavorites();
    const [quantity, setQuantity] = useState(1);

    const isFavorite = checkIsFavorite(product.id);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        addToCart(product, quantity);
        Alert.alert('Produit ajouté au panier', `${quantity}x ${product.name} ajouté(s) à votre panier.`);
        setQuantity(1); // Reset quantity after adding
    };

    const handleToggleFavorite = () => {
        toggleFavorite(product);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Image Header */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <View style={styles.overlay} />

                    {/* Header Actions */}
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={24} color={COLORS.surface} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={handleToggleFavorite}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={isFavorite ? "heart" : "heart-outline"}
                                size={24}
                                color={isFavorite ? COLORS.error : COLORS.surface}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.category}>{product.category}</Text>
                            <Text style={styles.name}>{product.name}</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color={COLORS.gold} />
                            <Text style={styles.rating}>{product.rating}</Text>
                            <Text style={styles.reviews}>({product.reviews})</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.artisanContainer}
                        onPress={() => {
                            // Navigation vers le profil de l'artisan
                            // Les données artisan viennent maintenant du produit (artisanId, artisanName)
                            if (product.artisanId) {
                                navigation.push('ArtisanProfile', { 
                                    artisan: {
                                        id: product.artisanId,
                                        name: product.artisanName || product.artisan,
                                        location: product.artisanLocation,
                                    }
                                });
                            }
                        }}
                    >
                        <View style={styles.artisanAvatar}>
                            <Text style={styles.artisanInitials}>
                                {(product.artisanName || product.artisan || 'A').charAt(0)}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.artisanLabel}>Artisan</Text>
                            <Text style={styles.artisanName}>
                                {product.artisanName || product.artisan}
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={COLORS.textTertiary}
                            style={{ marginLeft: 'auto' }}
                        />
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {/* Quantity Selector */}
                    <View style={styles.quantityContainer}>
                        <Text style={styles.sectionTitle}>Quantité</Text>
                        <View style={styles.quantityControls}>
                            <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                                <Ionicons name="remove" size={20} color={COLORS.text} />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                                <Ionicons name="add" size={20} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.priceLabel}>Prix Total</Text>
                    <Text style={styles.price}>{product.price * quantity} MAD</Text>
                </View>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.addToCartText}>Ajouter au Panier</Text>
                    <Ionicons name="cart" size={20} color={COLORS.surface} style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    imageContainer: {
        height: height * 0.45,
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    headerActions: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.l,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: SPACING.l,
        paddingTop: SPACING.xl,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.l,
    },
    category: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.primary,
        fontWeight: '600',
        marginBottom: 4,
    },
    name: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.text,
        width: width * 0.6,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        ...SHADOWS.subtle,
    },
    rating: {
        fontSize: FONTS.sizes.sm,
        fontWeight: 'bold',
        color: COLORS.text,
        marginLeft: 4,
    },
    reviews: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textTertiary,
        marginLeft: 4,
    },
    artisanContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.l,
        padding: SPACING.m,
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    artisanAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    artisanInitials: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.surface,
    },
    artisanLabel: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textTertiary,
    },
    artisanName: {
        fontSize: FONTS.sizes.md,
        fontWeight: '600',
        color: COLORS.text,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.s,
    },
    description: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        lineHeight: 24,
        marginBottom: SPACING.xl,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    quantityButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundAlt,
        borderRadius: 8,
    },
    quantityText: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.text,
        marginHorizontal: SPACING.m,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surface,
        paddingHorizontal: SPACING.l,
        paddingVertical: SPACING.m,
        paddingBottom: Platform.OS === 'ios' ? 30 : SPACING.m,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...SHADOWS.strong,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    priceLabel: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textTertiary,
    },
    price: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    addToCartButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.xl,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.primary,
    },
    addToCartText: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.surface,
    },
});

export default ProductDetailScreen;
