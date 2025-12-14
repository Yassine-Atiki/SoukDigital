import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import MoroccanPattern from '../components/MoroccanPattern';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!email) {
            newErrors.email = "L'email est requis";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "L'email est invalide";
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Le mot de passe est requis';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = () => {
        if (validate()) {
            setIsLoading(true);
            // Mock API call
            setTimeout(() => {
                setIsLoading(false);
                alert('Connexion réussie ! Bienvenue sur Souk Digital.');
                // Navigate to Home or similar (not implemented yet)
            }, 1500);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.secondary} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header Section with Modern Moroccan Touch */}
                    <View style={styles.header}>
                        <MoroccanPattern
                            variant="default"
                            style={{ top: -40, right: -20, opacity: 0.1 }}
                        />
                        <MoroccanPattern
                            variant="star"
                            style={{ bottom: -30, left: -30, opacity: 0.1 }}
                        />

                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Souk Digital</Text>
                            <Text style={styles.subtitle}>Artisanat du Maroc</Text>
                        </View>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <View style={styles.welcomeHeader}>
                            <Text style={styles.welcomeText}>Bon retour</Text>
                            <Text style={styles.instructionText}>
                                Connectez-vous pour découvrir des trésors uniques
                            </Text>
                        </View>

                        <View style={styles.inputsWrapper}>
                            <CustomInput
                                label="Email"
                                placeholder="artisan@souk.ma"
                                value={email}
                                onChangeText={setEmail}
                                error={errors.email}
                                keyboardType="email-address"
                            />

                            <CustomInput
                                label="Mot de passe"
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                error={errors.password}
                            />
                        </View>

                        <TouchableOpacity style={styles.forgotPasswordButton}>
                            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                        </TouchableOpacity>

                        <View style={styles.buttonContainer}>
                            <CustomButton
                                title="Se connecter"
                                onPress={handleLogin}
                                isLoading={isLoading}
                            />
                        </View>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>ou</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Vous n'avez pas de compte ? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.signUpText}>S'inscrire</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    header: {
        backgroundColor: COLORS.secondary,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        position: 'relative',
        overflow: 'hidden',
        marginBottom: SPACING.l,
        ...SHADOWS.medium,
    },
    titleContainer: {
        alignItems: 'center',
        zIndex: 1,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.surface,
        letterSpacing: 1,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: FONTS.sizes.md,
        color: COLORS.gold,
        fontWeight: '500',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: SPACING.xl,
    },
    welcomeHeader: {
        marginBottom: SPACING.xl,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.s,
    },
    instructionText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    inputsWrapper: {
        marginBottom: SPACING.m,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.xl,
    },
    forgotPasswordText: {
        color: COLORS.primary,
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
    },
    buttonContainer: {
        marginBottom: SPACING.l,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },
    dividerText: {
        marginHorizontal: SPACING.m,
        color: COLORS.textLight,
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: SPACING.xl,
    },
    footerText: {
        color: COLORS.textSecondary,
        fontSize: FONTS.sizes.md,
    },
    signUpText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: FONTS.sizes.md,
    },
});

export default LoginScreen;
