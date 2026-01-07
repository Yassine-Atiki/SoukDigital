// src/screens/AddEditProductScreen.js
// Screen for artisans to add or edit products
// - Image upload with preview
// - Product details form (name, description, price, category, stock)
// - Validation before submit
// - Modern Ionicons

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image,
    Alert,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../constants/theme';
import { useProducts } from '../context/ProductsContext';
import { useAuth } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const AddEditProductScreen = ({ navigation, route }) => {
    const { productId } = route.params || {};
    const isEditMode = !!productId;

    const { addProduct, updateProduct, getProductById } = useProducts();
    const { user } = useAuth();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Categories disponibles
    const categories = ['Poterie', 'Tapis', 'Bijoux', 'Cuir', 'Bois', 'Textile', 'Métal'];

    useEffect(() => {
        if (isEditMode) {
            const product = getProductById(productId);
            if (product) {
                setName(product.name || '');
                setDescription(product.description || '');
                setPrice(product.price?.toString() || '');
                setCategory(product.category || '');
                setStock(product.stock?.toString() || '');
                setImage(product.image || '');
            }
        }
    }, [productId, isEditMode]);

    const handleImagePick = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission requise',
                    'Nous avons besoin de votre permission pour accéder à vos photos.'
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Erreur', 'Impossible de charger l\'image');
        }
    };

    const validateForm = () => {
        if (!name.trim()) {
            Alert.alert('Erreur', 'Le nom du produit est requis');
            return false;
        }
        if (!description.trim()) {
            Alert.alert('Erreur', 'La description est requise');
            return false;
        }
        if (!price || parseFloat(price) <= 0) {
            Alert.alert('Erreur', 'Le prix doit être supérieur à 0');
            return false;
        }
        if (!category) {
            Alert.alert('Erreur', 'Veuillez sélectionner une catégorie');
            return false;
        }
        if (!stock || parseInt(stock) < 0) {
            Alert.alert('Erreur', 'Le stock ne peut pas être négatif');
            return false;
        }
        if (!image) {
            Alert.alert('Erreur', 'Veuillez ajouter une image du produit');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            console.log('📝 Données avant envoi:', {
                name: name.trim(),
                category,
                price: parseFloat(price),
                stock: parseInt(stock),
                hasImage: !!image,
                imageUri: image,
            });

            const productData = {
                name: name.trim(),
                description: description.trim(),
                price: parseFloat(price),
                category,
                stock: parseInt(stock),
                image,
                artisanId: user?.id || 'artisan_1',
                artisan: user?.name || 'Artisan',
            };

            let result;
            if (isEditMode) {
                result = await updateProduct(productId, productData);
            } else {
                result = await addProduct(productData);
            }

            if (result.success) {
                Alert.alert(
                    'Succès',
                    isEditMode ? 'Produit modifié avec succès' : 'Produit ajouté avec succès',
                    [{ text: 'OK', onPress: () => navigation.goBack() }]
                );
            } else {
                Alert.alert('Erreur', result.error || 'Une erreur est survenue');
            }
        } catch (error) {
            console.error('Error submitting product:', error);
            Alert.alert('Erreur', 'Une erreur inattendue est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaWrapper backgroundColor={COLORS.background}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {isEditMode ? 'Modifier le produit' : 'Ajouter un produit'}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                {/* Image Upload Section */}
                <View style={styles.imageSection}>
                    <Text style={styles.sectionLabel}>Photo du produit</Text>
                    <TouchableOpacity
                        style={styles.imageUploadContainer}
                        onPress={handleImagePick}
                    >
                        {image ? (
                            <Image source={{ uri: image }} style={styles.productImage} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Ionicons name="camera" size={48} color={COLORS.textTertiary} />
                                <Text style={styles.imagePlaceholderText}>
                                    Ajouter une photo
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Product Details Form */}
                <View style={styles.form}>
                    <CustomInput
                        placeholder="Nom du produit"
                        value={name}
                        onChangeText={setName}
                        iconName="pricetag-outline"
                        iconColor={COLORS.primary}
                    />

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.sectionLabel}>Description</Text>
                        <View style={styles.descriptionInputWrapper}>
                            <Ionicons
                                name="document-text-outline"
                                size={22}
                                color={COLORS.primary}
                                style={styles.descriptionIcon}
                            />
                            <TextInput
                                style={styles.descriptionInput}
                                numberOfLines={4}
                                multiline
                                placeholder="Décrivez votre produit en détail..."
                                placeholderTextColor={COLORS.textTertiary}
                                value={description}
                                onChangeText={setDescription}
                                textAlignVertical="top"
                            />
                        </View>
                    </View>

                    <CustomInput
                        placeholder="Prix (MAD)"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        iconName="cash-outline"
                        iconColor={COLORS.primary}
                    />

                    <CustomInput
                        placeholder="Stock disponible"
                        value={stock}
                        onChangeText={setStock}
                        keyboardType="numeric"
                        iconName="cube-outline"
                        iconColor={COLORS.primary}
                    />

                    {/* Category Selection */}
                    <View style={styles.categoryContainer}>
                        <Text style={styles.sectionLabel}>Catégorie</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.categoryScroll}
                        >
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.categoryChip,
                                        category === cat && styles.categoryChipActive,
                                    ]}
                                    onPress={() => setCategory(cat)}
                                >
                                    <Text
                                        style={[
                                            styles.categoryChipText,
                                            category === cat && styles.categoryChipTextActive,
                                        ]}
                                    >
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Submit Button */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title={isLoading ? 'Enregistrement...' : isEditMode ? 'Modifier' : 'Ajouter'}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    />
                </View>
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
    content: {
        flex: 1,
    },
    imageSection: {
        padding: SPACING.l,
    },
    sectionLabel: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: SPACING.s,
    },
    imageUploadContainer: {
        width: '100%',
        height: 200,
        borderRadius: BORDER_RADIUS.md,
        overflow: 'hidden',
        backgroundColor: COLORS.surface,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        marginTop: SPACING.s,
        fontSize: FONTS.sizes.md,
        color: COLORS.textTertiary,
    },
    form: {
        padding: SPACING.l,
    },
    descriptionContainer: {
        marginBottom: SPACING.m,
    },
    descriptionInputWrapper: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.m,
        borderWidth: 2,
        borderColor: COLORS.border,
        minHeight: 100,
        alignItems: 'flex-start',
    },
    descriptionIcon: {
        marginRight: SPACING.s,
        marginTop: 2,
    },
    descriptionInput: {
        flex: 1,
        fontSize: FONTS.sizes.md,
        color: COLORS.text,
        textAlignVertical: 'top',
    },
    categoryContainer: {
        marginTop: SPACING.m,
    },
    categoryScroll: {
        marginTop: SPACING.s,
    },
    categoryChip: {
        paddingHorizontal: SPACING.l,
        paddingVertical: SPACING.s,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 2,
        borderColor: COLORS.border,
        marginRight: SPACING.s,
    },
    categoryChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryChipText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    categoryChipTextActive: {
        color: COLORS.surface,
        fontWeight: '600',
    },
    buttonContainer: {
        padding: SPACING.l,
    },
});

export default AddEditProductScreen;
