// src/screens/PaymentMethodsScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import MoroccanDivider from '../components/MoroccanDivider';

const PaymentMethodsScreen = ({ navigation }) => {
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: '1',
            type: 'card',
            cardNumber: '**** **** **** 4242',
            cardHolder: 'Mohamed Alami',
            expiryDate: '12/25',
            isDefault: true,
            cardType: 'Visa',
        },
        {
            id: '2',
            type: 'card',
            cardNumber: '**** **** **** 8888',
            cardHolder: 'Mohamed Alami',
            expiryDate: '06/26',
            isDefault: false,
            cardType: 'Mastercard',
        },
    ]);

    const handleSetDefault = (id) => {
        setPaymentMethods(methods =>
            methods.map(method => ({
                ...method,
                isDefault: method.id === id,
            }))
        );
        Alert.alert('Succès', 'Méthode de paiement définie par défaut');
    };

    const handleDelete = (id) => {
        Alert.alert(
            'Supprimer',
            'Voulez-vous vraiment supprimer cette méthode de paiement?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                        setPaymentMethods(methods => methods.filter(m => m.id !== id));
                        Alert.alert('Succès', 'Méthode de paiement supprimée');
                    },
                },
            ]
        );
    };

    const getCardIcon = (cardType) => {
        switch (cardType) {
            case 'Visa':
                return 'card';
            case 'Mastercard':
                return 'card-outline';
            default:
                return 'card';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Moyens de paiement</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Payment Methods List */}
                <View style={styles.section}>
                    {paymentMethods.map((method, index) => (
                        <View key={method.id}>
                            <View style={styles.paymentCard}>
                                {/* Card Icon */}
                                <View style={styles.cardIconContainer}>
                                    <Ionicons 
                                        name={getCardIcon(method.cardType)} 
                                        size={32} 
                                        color={COLORS.primary} 
                                    />
                                </View>

                                {/* Card Info */}
                                <View style={styles.cardInfo}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.cardNumber}>{method.cardNumber}</Text>
                                        {method.isDefault && (
                                            <View style={styles.defaultBadge}>
                                                <Text style={styles.defaultText}>Par défaut</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.cardHolder}>{method.cardHolder}</Text>
                                    <Text style={styles.cardExpiry}>Expire le {method.expiryDate}</Text>
                                </View>

                                {/* Actions */}
                                <View style={styles.cardActions}>
                                    {!method.isDefault && (
                                        <TouchableOpacity
                                            onPress={() => handleSetDefault(method.id)}
                                            style={styles.actionButton}
                                        >
                                            <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.success} />
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        onPress={() => handleDelete(method.id)}
                                        style={styles.actionButton}
                                    >
                                        <Ionicons name="trash-outline" size={24} color={COLORS.error} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {index < paymentMethods.length - 1 && <MoroccanDivider />}
                        </View>
                    ))}
                </View>

                {/* Add New Payment Method */}
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => Alert.alert('À venir', 'Fonctionnalité d\'ajout de carte bancaire en cours de développement')}
                >
                    <Ionicons name="add-circle" size={24} color={COLORS.primary} />
                    <Text style={styles.addButtonText}>Ajouter une carte bancaire</Text>
                </TouchableOpacity>

                {/* Payment Info */}
                <View style={styles.infoSection}>
                    <View style={styles.infoCard}>
                        <Ionicons name="shield-checkmark" size={24} color={COLORS.success} />
                        <Text style={styles.infoText}>
                            Vos informations de paiement sont sécurisées et cryptées
                        </Text>
                    </View>
                </View>
            </ScrollView>
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
    section: {
        padding: SPACING.l,
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.l,
    },
    cardIconContainer: {
        width: 60,
        height: 60,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    cardInfo: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    cardNumber: {
        fontSize: FONTS.sizes.md,
        fontWeight: '600',
        color: COLORS.text,
        marginRight: SPACING.s,
    },
    defaultBadge: {
        backgroundColor: COLORS.success,
        paddingHorizontal: SPACING.s,
        paddingVertical: 2,
        borderRadius: BORDER_RADIUS.sm,
    },
    defaultText: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.surface,
        fontWeight: '600',
    },
    cardHolder: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    cardExpiry: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textTertiary,
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SPACING.xs,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.l,
        padding: SPACING.l,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
    },
    addButtonText: {
        fontSize: FONTS.sizes.md,
        fontWeight: '600',
        color: COLORS.primary,
        marginLeft: SPACING.s,
    },
    infoSection: {
        padding: SPACING.l,
        paddingTop: SPACING.xl,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.successLight,
        padding: SPACING.m,
        borderRadius: BORDER_RADIUS.md,
    },
    infoText: {
        flex: 1,
        marginLeft: SPACING.m,
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
});

export default PaymentMethodsScreen;
