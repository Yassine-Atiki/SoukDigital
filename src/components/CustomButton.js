import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS, FONTS } from '../constants/theme';

const CustomButton = ({ title, onPress, type = 'primary', isLoading = false }) => {
    const isPrimary = type === 'primary';

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isPrimary ? styles.primaryContainer : styles.secondaryContainer,
                isLoading && styles.disabled,
            ]}
            onPress={onPress}
            disabled={isLoading}
            activeOpacity={0.85}
        >
            {/* Effet de bordure décorative marocaine */}
            {isPrimary && (
                <>
                    <View style={styles.decorativeCornerTopLeft} />
                    <View style={styles.decorativeCornerTopRight} />
                    <View style={styles.decorativeCornerBottomLeft} />
                    <View style={styles.decorativeCornerBottomRight} />
                </>
            )}
            
            {isLoading ? (
                <ActivityIndicator color={isPrimary ? COLORS.textInverse : COLORS.primary} size="small" />
            ) : (
                <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: BORDER_RADIUS.md,
        paddingVertical: SPACING.m + 2,
        paddingHorizontal: SPACING.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SPACING.s,
        position: 'relative',
        overflow: 'hidden',
    },
    primaryContainer: {
        backgroundColor: COLORS.primary,
        ...SHADOWS.colored,
        // Bordure subtile dorée
        borderWidth: 1.5,
        borderColor: COLORS.goldLight,
    },
    secondaryContainer: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.primary,
        elevation: 0,
        shadowOpacity: 0,
    },
    text: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    primaryText: {
        color: COLORS.textInverse,
    },
    secondaryText: {
        color: COLORS.primary,
    },
    disabled: {
        opacity: 0.6,
    },
    // Coins décoratifs inspirés des motifs marocains
    decorativeCornerTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: COLORS.gold,
        opacity: 0.6,
    },
    decorativeCornerTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: COLORS.gold,
        opacity: 0.6,
    },
    decorativeCornerBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 8,
        height: 8,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderColor: COLORS.gold,
        opacity: 0.6,
    },
    decorativeCornerBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 8,
        height: 8,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderColor: COLORS.gold,
        opacity: 0.6,
    },
});

export default CustomButton;
