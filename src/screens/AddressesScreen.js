// src/screens/AddressesScreen.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

import StorageService from '../services/StorageService';

const ADDRESSES_KEY = 'souk_addresses';

const AddressesScreen = ({ navigation }) => {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        const saved = await StorageService.getItem(ADDRESSES_KEY);
        if (saved) {
            setAddresses(saved);
        } else {
            // Initial mock data if empty
            const initialData = [
                {
                    id: 1,
                    name: 'Domicile',
                    fullAddress: '123 Rue de la Médina, Marrakech, 40000',
                    phone: '+212 6 12 34 56 78',
                    isDefault: true,
                },
                {
                    id: 2,
                    name: 'Bureau',
                    fullAddress: '456 Avenue Mohammed V, Casablanca, 20000',
                    phone: '+212 6 98 76 54 32',
                    isDefault: false,
                },
            ];
            setAddresses(initialData);
            StorageService.setItem(ADDRESSES_KEY, initialData);
        }
    };

    const saveAddresses = async (newAddresses) => {
        setAddresses(newAddresses);
        await StorageService.setItem(ADDRESSES_KEY, newAddresses);
    };

    const setDefaultAddress = (id) => {
        const newAddresses = addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id,
        }));
        saveAddresses(newAddresses);
    };

    const deleteAddress = (id) => {
        Alert.alert(
            'Supprimer l\'adresse',
            'Êtes-vous sûr de vouloir supprimer cette adresse?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                        const newAddresses = addresses.filter(addr => addr.id !== id);
                        saveAddresses(newAddresses);
                    },
                },
            ]
        );
    };

    const renderAddressItem = ({ item }) => (
        <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
                <View style={styles.addressTitleRow}>
                    <Ionicons name="location" size={24} color={COLORS.primary} />
                    <Text style={styles.addressName}>{item.name}</Text>
                    {item.isDefault && (
                        <View style={styles.defaultBadge}>
                            <Text style={styles.defaultText}>Par défaut</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity onPress={() => deleteAddress(item.id)}>
                    <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                </TouchableOpacity>
            </View>

            <Text style={styles.addressText}>{item.fullAddress}</Text>
            <Text style={styles.phoneText}>{item.phone}</Text>

            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.editButton}>
                    <Ionicons name="pencil-outline" size={18} color={COLORS.primary} />
                    <Text style={styles.editText}>Modifier</Text>
                </TouchableOpacity>

                {!item.isDefault && (
                    <TouchableOpacity
                        style={styles.setDefaultButton}
                        onPress={() => setDefaultAddress(item.id)}
                    >
                        <Text style={styles.setDefaultText}>Définir par défaut</Text>
                    </TouchableOpacity>
                )}
            </View>
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
                <Text style={styles.headerTitle}>Mes Adresses</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={addresses}
                renderItem={renderAddressItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Add New Address Button */}
            <TouchableOpacity style={styles.addNewButton}>
                <Ionicons name="add-circle-outline" size={24} color={COLORS.surface} />
                <Text style={styles.addNewText}>Ajouter une nouvelle adresse</Text>
            </TouchableOpacity>
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
    addButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    listContent: {
        padding: SPACING.l,
    },
    addressCard: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        ...SHADOWS.sm,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.m,
    },
    addressTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    addressName: {
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
        color: COLORS.text,
        marginLeft: SPACING.s,
    },
    defaultBadge: {
        backgroundColor: COLORS.success,
        paddingHorizontal: SPACING.s,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
        marginLeft: SPACING.s,
    },
    defaultText: {
        color: COLORS.surface,
        fontSize: FONTS.sizes.xs,
        fontWeight: '600',
    },
    addressText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
        lineHeight: 20,
    },
    phoneText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textTertiary,
        marginBottom: SPACING.m,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.s,
        paddingTop: SPACING.m,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editText: {
        color: COLORS.primary,
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        marginLeft: SPACING.xs,
    },
    setDefaultButton: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.m,
        backgroundColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.md,
    },
    setDefaultText: {
        color: COLORS.surface,
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
    },
    addNewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        margin: SPACING.l,
        padding: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.md,
    },
    addNewText: {
        color: COLORS.surface,
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        marginLeft: SPACING.s,
    },
});

export default AddressesScreen;
