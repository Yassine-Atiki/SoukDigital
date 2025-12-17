import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';

const ProfileScreen = ({ navigation }) => {
    // Mock user data - in a real app this would come from context/auth
    const user = {
        name: 'Yassine Atiki',
        email: 'yassine@example.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    };

    const menuItems = [
        { icon: 'person-outline', label: 'Mon Profil' },
        { icon: 'location-outline', label: 'Mes Adresses' },
        { icon: 'card-outline', label: 'Moyens de Paiement' },
        { icon: 'heart-outline', label: 'Favoris' },
        { icon: 'settings-outline', label: 'Paramètres' },
        { icon: 'help-circle-outline', label: 'Aide & Support' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profil</Text>
                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Ionicons name="pencil" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <View style={styles.menuIconContainer}>
                                <Ionicons name={item.icon} size={22} color={COLORS.primary} />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => navigation.replace('Auth')}
                >
                    <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
                    <Text style={styles.logoutText}>Se Déconnecter</Text>
                </TouchableOpacity>
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
        paddingHorizontal: SPACING.l,
        paddingVertical: SPACING.m,
    },
    headerTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.l,
        padding: SPACING.m,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.xl,
        ...SHADOWS.medium,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: SPACING.m,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: FONTS.sizes.lg,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
    },
    editButton: {
        padding: SPACING.s,
    },
    menuContainer: {
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.l,
        borderRadius: BORDER_RADIUS.lg,
        paddingVertical: SPACING.s,
        ...SHADOWS.subtle,
        marginBottom: SPACING.xl,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.m,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.backgroundAlt,
    },
    menuIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    menuLabel: {
        flex: 1,
        fontSize: FONTS.sizes.md,
        color: COLORS.text,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: SPACING.l,
        paddingVertical: SPACING.m,
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.error,
        marginBottom: SPACING.xl,
    },
    logoutText: {
        marginLeft: SPACING.s,
        fontSize: FONTS.sizes.md,
        fontWeight: 'bold',
        color: COLORS.error,
    },
});

export default ProfileScreen;
