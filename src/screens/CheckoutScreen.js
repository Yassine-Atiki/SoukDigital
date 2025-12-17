import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';

const CheckoutScreen = ({ navigation, route }) => {
    const { total } = route.params;
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'cod'

    const handlePayment = () => {
        setIsProcessing(true);

        // Simulate payment processing delay
        setTimeout(() => {
            setIsProcessing(false);
            Alert.alert(
                'Commande Confirmée !',
                'Merci pour votre achat. Vous recevrez un email de confirmation.',
                [
                    {
                        text: 'Retour à l\'accueil',
                        onPress: () => navigation.popToTop(),
                    },
                ]
            );
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Paiement</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Récapitulatif</Text>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Sous-total</Text>
                            <Text style={styles.summaryValue}>{total} MAD</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Livraison</Text>
                            <Text style={styles.summaryValue}>25 MAD</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text style={styles.totalLabel}>Total à payer</Text>
                            <Text style={styles.totalValue}>{total + 25} MAD</Text>
                        </View>
                    </View>
                </View>

                {/* Shipping Address */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Adresse de livraison</Text>
                    <View style={styles.addressCard}>
                        <View style={styles.addressHeader}>
                            <Ionicons name="location" size={20} color={COLORS.primary} />
                            <Text style={styles.addressName}>Yassine Atiki</Text>
                        </View>
                        <Text style={styles.addressText}>123 Rue de la Médina</Text>
                        <Text style={styles.addressText}>40000 Marrakech, Maroc</Text>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editText}>Modifier</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Moyen de paiement</Text>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'card' && styles.selectedPayment]}
                        onPress={() => setPaymentMethod('card')}
                    >
                        <View style={styles.paymentInfo}>
                            <Ionicons name="card-outline" size={24} color={paymentMethod === 'card' ? COLORS.primary : COLORS.textSecondary} />
                            <Text style={[styles.paymentText, paymentMethod === 'card' && styles.selectedPaymentText]}>Carte Bancaire</Text>
                        </View>
                        {paymentMethod === 'card' && <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'cod' && styles.selectedPayment]}
                        onPress={() => setPaymentMethod('cod')}
                    >
                        <View style={styles.paymentInfo}>
                            <Ionicons name="cash-outline" size={24} color={paymentMethod === 'cod' ? COLORS.primary : COLORS.textSecondary} />
                            <Text style={[styles.paymentText, paymentMethod === 'cod' && styles.selectedPaymentText]}>Paiement à la livraison</Text>
                        </View>
                        {paymentMethod === 'cod' && <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />}
                    </TouchableOpacity>
                </View>

                {/* Card Details (Simulated) */}
                {paymentMethod === 'card' && (
                    <View style={styles.cardForm}>
                        <TextInput
                            style={styles.input}
                            placeholder="Numéro de carte"
                            keyboardType="numeric"
                            placeholderTextColor={COLORS.textTertiary}
                        />
                        <View style={styles.row}>
                            <TextInput
                                style={[styles.input, { flex: 1, marginRight: SPACING.m }]}
                                placeholder="MM/AA"
                                keyboardType="numeric"
                                placeholderTextColor={COLORS.textTertiary}
                            />
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="CVC"
                                keyboardType="numeric"
                                placeholderTextColor={COLORS.textTertiary}
                            />
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Pay Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.payButton}
                    onPress={handlePayment}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <ActivityIndicator color={COLORS.surface} />
                    ) : (
                        <Text style={styles.payButtonText}>
                            Payer {total + 25} MAD
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
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
        padding: SPACING.s,
        marginRight: SPACING.m,
    },
    headerTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    content: {
        padding: SPACING.l,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    summaryCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.subtle,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.s,
    },
    summaryLabel: {
        color: COLORS.textSecondary,
        fontSize: FONTS.sizes.md,
    },
    summaryValue: {
        color: COLORS.text,
        fontSize: FONTS.sizes.md,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.m,
    },
    totalLabel: {
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    totalValue: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    addressCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.subtle,
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.s,
    },
    addressName: {
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.text,
        marginLeft: SPACING.s,
    },
    addressText: {
        color: COLORS.textSecondary,
        marginBottom: 4,
        paddingLeft: 28,
    },
    editButton: {
        position: 'absolute',
        top: SPACING.m,
        right: SPACING.m,
    },
    editText: {
        color: COLORS.primary,
        fontWeight: '600',
        fontSize: FONTS.sizes.sm,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.m,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedPayment: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryLight + '20', // 20% opacity
    },
    paymentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentText: {
        marginLeft: SPACING.m,
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    selectedPaymentText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    cardForm: {
        marginTop: SPACING.s,
    },
    input: {
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.m,
        borderWidth: 1,
        borderColor: COLORS.border,
        fontSize: FONTS.sizes.md,
    },
    row: {
        flexDirection: 'row',
    },
    footer: {
        padding: SPACING.l,
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        ...SHADOWS.strong,
    },
    payButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
        ...SHADOWS.primary,
    },
    payButtonText: {
        color: COLORS.surface,
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;
