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

const SignUpScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!fullName) {
            newErrors.fullName = 'Le nom complet est requis';
            valid = false;
        }

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
        } else if (password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
            valid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSignUp = () => {
        if (validate()) {
            setIsLoading(true);
            // Mock API call
            setTimeout(() => {
                setIsLoading(false);
                alert('Compte créé avec succès !');
                navigation.navigate('Login');
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
                    {/* Header Section */}
                    <View style={styles.header}>
                        <MoroccanPattern
                            variant="geometric"
                            style={{ bottom: -30, left: -40, opacity: 0.1 }}
                        />
                        <MoroccanPattern
                            variant="arch"
                            style={{ top: -40, right: -50, opacity: 0.1 }}
                        />

                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Rejoignez Souk Digital</Text>
                            <Text style={styles.subtitle}>Commencez votre voyage avec nous</Text>
                        </View>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputsWrapper}>
                            <CustomInput
                                label="Nom complet"
                                placeholder="Amine El Idrissi"
                                value={fullName}
                                onChangeText={setFullName}
                                error={errors.fullName}
                                autoCapitalize="words"
                            />

                            <CustomInput
                                label="Email"
                                placeholder="amine@example.com"
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

                            <CustomInput
                                label="Confirmer le mot de passe"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                error={errors.confirmPassword}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <CustomButton
                                title="Créer un compte"
                                onPress={handleSignUp}
                                isLoading={isLoading}
                            />
                        </View>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>ou</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Vous avez déjà un compte ? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginText}>Se connecter</Text>
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
        height: 200,
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
        paddingHorizontal: SPACING.l,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.surface,
        letterSpacing: 1,
        marginBottom: SPACING.xs,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.gold,
        fontWeight: '500',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: SPACING.xl,
    },
    inputsWrapper: {
        marginBottom: SPACING.m,
    },
    buttonContainer: {
        marginBottom: SPACING.l,
        marginTop: SPACING.s,
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
    loginText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: FONTS.sizes.md,
    },
});

export default SignUpScreen;
