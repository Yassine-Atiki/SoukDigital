import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS, FONTS } from '../constants/theme';

const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    error,
    keyboardType = 'default',
    autoCapitalize = 'none',
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && (
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>{label}</Text>
                    {/* Petit ornement marocain à côté du label */}
                    <View style={styles.labelDecoration} />
                </View>
            )}
            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.inputContainerFocused,
                    error && styles.inputContainerError,
                ]}
            >
                {/* Accent doré sur le côté gauche quand focus */}
                {isFocused && <View style={styles.focusAccent} />}
                
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.textLight}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
            {error && (
                <View style={styles.errorContainer}>
                    <View style={styles.errorDot} />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.m + 4,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.s,
    },
    label: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.secondary,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    labelDecoration: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.gold,
        marginLeft: SPACING.xs,
    },
    inputContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.border,
        paddingHorizontal: SPACING.m + 4,
        paddingVertical: SPACING.m,
        ...SHADOWS.light,
        position: 'relative',
        overflow: 'hidden',
    },
    inputContainerFocused: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surfaceElevated,
        ...SHADOWS.medium,
        borderWidth: 2,
    },
    inputContainerError: {
        borderColor: COLORS.error,
        backgroundColor: COLORS.surface,
    },
    focusAccent: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        backgroundColor: COLORS.gold,
    },
    input: {
        fontSize: FONTS.sizes.md,
        color: COLORS.text,
        fontWeight: '500',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.xs + 2,
        marginLeft: SPACING.xs,
    },
    errorDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.error,
        marginRight: SPACING.xs,
    },
    errorText: {
        color: COLORS.error,
        fontSize: FONTS.sizes.xs,
        fontWeight: '600',
    },
});

export default CustomInput;
