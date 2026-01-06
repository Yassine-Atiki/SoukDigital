import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import MoroccanPattern from '../components/MoroccanPattern';
import RoleSelector from '../components/RoleSelector';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('customer');
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

  const handleSignUp = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        const result = await signup(fullName, email, password, userType);

        if (result.success) {
          Alert.alert(
            'Bienvenue!',
            `Votre compte a été créé avec succès !`,
            [
              {
                text: 'Continuer',
                onPress: () => navigation.replace('Main', { userType }),
              },
            ]
          );
        } else {
          Alert.alert('Erreur', result.error || 'Une erreur est survenue lors de l\'inscription');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Une erreur inattendue est survenue');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.secondary} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* ═══════════════════════════════════════════════════════════════════════════ */}
          {/* PREMIUM HEADER SECTION */}
          {/* ═══════════════════════════════════════════════════════════════════════════ */}
          <View style={styles.headerSection}>
            {/* Background layers */}
            <View style={styles.headerGradient}>
              <View style={styles.gradientLayer1} />
              <View style={styles.gradientLayer2} />
            </View>

            {/* Decorative Moroccan patterns */}
            <MoroccanPattern
              variant="geometric"
              style={styles.patternTopLeft}
              color={COLORS.gold}
            />
            <MoroccanPattern
              variant="lattice"
              style={styles.patternBottomRight}
              color={COLORS.goldLight}
            />

            {/* Top gold accent line */}
            <View style={styles.topAccentLine} />

            {/* Header content */}
            <View style={styles.headerContent}>
              {/* Decorative element */}
              <View style={styles.headerDecorator}>
                <View style={styles.decoratorLine} />
                <View style={styles.decoratorDiamond} />
                <View style={styles.decoratorLine} />
              </View>

              <Text style={styles.headerTitle}>Rejoignez-Nous</Text>
              <Text style={styles.headerSubtitle}>
                DÉCOUVREZ L'ARTISANAT MAROCAIN
              </Text>

              {/* Decorative dots */}
              <View style={styles.headerDots}>
                <View style={styles.dot} />
                <View style={[styles.dot, styles.dotCenter]} />
                <View style={styles.dot} />
              </View>
            </View>

            {/* Bottom curve */}
            <View style={styles.headerCurve} />
          </View>

          {/* ═══════════════════════════════════════════════════════════════════════════ */}
          {/* FORM SECTION */}
          {/* ═══════════════════════════════════════════════════════════════════════════ */}
          <View style={styles.formSection}>
            {/* Role Selector */}
            <RoleSelector selectedRole={userType} onSelectRole={setUserType} />

            {/* Input fields */}
            <View style={styles.inputsContainer}>
              <CustomInput
                label="Nom complet"
                placeholder="Votre nom complet"
                value={fullName}
                onChangeText={setFullName}
                error={errors.fullName}
                autoCapitalize="words"
              />

              <CustomInput
                label="Email"
                placeholder="votre@email.com"
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
                helperText="Minimum 6 caractères"
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

            {/* Terms notice */}
            <Text style={styles.termsText}>
              En créant un compte, vous acceptez nos{' '}
              <Text style={styles.termsLink}>Conditions d'utilisation</Text>
              {' '}et notre{' '}
              <Text style={styles.termsLink}>Politique de confidentialité</Text>
            </Text>

            {/* Sign up button */}
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Créer Mon Compte"
                onPress={handleSignUp}
                isLoading={isLoading}
              />
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <View style={styles.dividerTextContainer}>
                <View style={styles.dividerDot} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerDot} />
              </View>
              <View style={styles.dividerLine} />
            </View>

            {/* Login link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Déjà membre ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Se connecter</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom decorative element */}
            <View style={styles.bottomDecorator}>
              <View style={styles.bottomDecoratorDiamond} />
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HEADER STYLES
  // ═══════════════════════════════════════════════════════════════════════════
  headerSection: {
    height: height * 0.28,
    backgroundColor: COLORS.secondary,
    position: 'relative',
    overflow: 'hidden',
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientLayer1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.secondaryDark,
    opacity: 0.5,
  },
  gradientLayer2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: COLORS.secondary,
  },
  topAccentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.gold,
  },
  patternTopLeft: {
    top: -30,
    left: -40,
    opacity: 0.12,
  },
  patternBottomRight: {
    bottom: 20,
    right: -30,
    opacity: 0.1,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.l,
  },
  headerDecorator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  decoratorLine: {
    width: 25,
    height: 1,
    backgroundColor: COLORS.gold,
    opacity: 0.6,
  },
  decoratorDiamond: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.gold,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: SPACING.s,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '700',
    color: COLORS.textInverse,
    letterSpacing: FONTS.letterSpacing.wide,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gold,
    letterSpacing: FONTS.letterSpacing.luxury,
    fontWeight: '600',
    marginTop: SPACING.xs,
  },
  headerDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.m,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gold,
    opacity: 0.5,
  },
  dotCenter: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: SPACING.s,
    opacity: 0.8,
  },
  headerCurve: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FORM STYLES
  // ═══════════════════════════════════════════════════════════════════════════
  formSection: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.l,
    paddingBottom: SPACING.xxl,
  },
  inputsContainer: {
    marginBottom: SPACING.m,
  },
  termsText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: SPACING.l,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: SPACING.xl,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
  },
  dividerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gold,
    opacity: 0.4,
  },
  dividerText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textTertiary,
    fontWeight: '600',
    marginHorizontal: SPACING.s,
    textTransform: 'lowercase',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: '700',
  },
  bottomDecorator: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  bottomDecoratorDiamond: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.gold,
    transform: [{ rotate: '45deg' }],
    opacity: 0.3,
  },
});

export default SignUpScreen;
