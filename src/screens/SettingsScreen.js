// src/screens/SettingsScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Switch,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';

const SettingsScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('Français');

    const settingsSections = [
        {
            title: 'Notifications',
            items: [
                {
                    icon: 'notifications-outline',
                    label: 'Notifications Push',
                    type: 'switch',
                    value: notifications,
                    onValueChange: setNotifications,
                },
                {
                    icon: 'mail-outline',
                    label: 'Notifications Email',
                    type: 'switch',
                    value: emailNotifications,
                    onValueChange: setEmailNotifications,
                },
            ],
        },
        {
            title: 'Apparence',
            items: [
                {
                    icon: 'moon-outline',
                    label: 'Mode Sombre',
                    type: 'switch',
                    value: darkMode,
                    onValueChange: setDarkMode,
                },
                {
                    icon: 'language-outline',
                    label: 'Langue',
                    type: 'navigation',
                    value: language,
                    action: 'language',
                },
            ],
        },
        {
            title: 'Compte',
            items: [
                {
                    icon: 'receipt-outline',
                    label: 'Historique des commandes',
                    type: 'navigation',
                    action: 'orders',
                },
                {
                    icon: 'lock-closed-outline',
                    label: 'Changer le mot de passe',
                    type: 'navigation',
                    action: 'password',
                },
                {
                    icon: 'shield-checkmark-outline',
                    label: 'Confidentialité',
                    type: 'navigation',
                    action: 'privacy',
                },
                {
                    icon: 'card-outline',
                    label: 'Gestion du compte',
                    type: 'navigation',
                    action: 'account',
                },
            ],
        },
        {
            title: 'À propos',
            items: [
                {
                    icon: 'document-text-outline',
                    label: 'Conditions d\'utilisation',
                    type: 'navigation',
                    action: 'terms',
                },
                {
                    icon: 'information-circle-outline',
                    label: 'À propos de SoukDigital',
                    type: 'navigation',
                    action: 'about',
                },
                {
                    icon: 'code-outline',
                    label: 'Version',
                    type: 'text',
                    value: '2.0.0',
                },
            ],
        },
    ];

    const handleNavigation = (action) => {
        switch (action) {
            case 'orders':
                navigation.navigate('OrderHistory');
                break;
            default:
                console.log('Action:', action);
        }
    };

    const renderSettingItem = (item, index) => {
        if (item.type === 'switch') {
            return (
                <View key={index} style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <Ionicons name={item.icon} size={22} color={COLORS.textSecondary} />
                        <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>
                    <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
                        thumbColor={item.value ? COLORS.primary : COLORS.surface}
                    />
                </View>
            );
        }

        if (item.type === 'navigation') {
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.settingItem}
                    onPress={() => handleNavigation(item.action)}
                >
                    <View style={styles.settingLeft}>
                        <Ionicons name={item.icon} size={22} color={COLORS.textSecondary} />
                        <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>
                    <View style={styles.settingRight}>
                        {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
                        <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
                    </View>
                </TouchableOpacity>
            );
        }

        if (item.type === 'text') {
            return (
                <View key={index} style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <Ionicons name={item.icon} size={22} color={COLORS.textSecondary} />
                        <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>
                    <Text style={styles.settingValue}>{item.value}</Text>
                </View>
            );
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
                <Text style={styles.headerTitle}>Paramètres</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {settingsSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.sectionContent}>
                            {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
                        </View>
                    </View>
                ))}
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
        marginTop: SPACING.l,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.textTertiary,
        textTransform: 'uppercase',
        paddingHorizontal: SPACING.l,
        marginBottom: SPACING.s,
        letterSpacing: 0.5,
    },
    sectionContent: {
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.l,
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        ...SHADOWS.sm,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.m,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingLabel: {
        fontSize: FONTS.sizes.md,
        color: COLORS.text,
        marginLeft: SPACING.m,
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingValue: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textSecondary,
        marginRight: SPACING.s,
    },
});

export default SettingsScreen;
