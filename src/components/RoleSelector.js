import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const RoleSelector = ({ selectedRole, onSelectRole }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.roleButton,
                    selectedRole === 'customer' && styles.activeButton,
                ]}
                onPress={() => onSelectRole('customer')}
                activeOpacity={0.8}
            >
                <Ionicons
                    name="person-outline"
                    size={20}
                    color={selectedRole === 'customer' ? COLORS.surface : COLORS.textSecondary}
                />
                <Text
                    style={[
                        styles.roleText,
                        selectedRole === 'customer' && styles.activeText,
                    ]}
                >
                    Client
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.roleButton,
                    selectedRole === 'artisan' && styles.activeButton,
                ]}
                onPress={() => onSelectRole('artisan')}
                activeOpacity={0.8}
            >
                <Ionicons
                    name="hammer-outline"
                    size={20}
                    color={selectedRole === 'artisan' ? COLORS.surface : COLORS.textSecondary}
                />
                <Text
                    style={[
                        styles.roleText,
                        selectedRole === 'artisan' && styles.activeText,
                    ]}
                >
                    Artisan
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xs,
        marginBottom: SPACING.l,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    roleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.s,
        borderRadius: BORDER_RADIUS.md,
    },
    activeButton: {
        backgroundColor: COLORS.primary,
        ...SHADOWS.subtle,
    },
    roleText: {
        marginLeft: SPACING.s,
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    activeText: {
        color: COLORS.surface,
        fontWeight: 'bold',
    },
});

export default RoleSelector;
