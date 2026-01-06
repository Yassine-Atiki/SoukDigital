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

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
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

  const handleLogin = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        const result = await login(email, password, userType);

        if (result.success) {
          navigation.replace('Main', { userType });
        } else {
          Alert.alert('Erreur', 'Identifiants incorrects');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
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
          {/*HEADER SECTION */}
          {/* ═══════════════════════════════════════════════════════════════════════════ */}
          <View style={styles.headerSection}>
            {/* Background gradient effect */}
            <View style={styles.headerGradient}>
              <View style={styles.gradientLayer1} />
              <View style={styles.gradientLayer2} />
            </View>

            {/* Decorative Moroccan patterns */}
            <MoroccanPattern
              variant="star"
              style={styles.patternTopRight}
              color={COLORS.gold}
            />
            <MoroccanPattern
              variant="arch"
              style={styles.patternBottomLeft}
              color={COLORS.goldLight}
            />
            <MoroccanPattern
              variant="circles"
              style={styles.patternCenter}
              color={COLORS.goldShimmer}
            />

            {/* Top gold accent line */}
            <View style={styles.topAccentLine} />

            {/* Brand content */}
            <View style={styles.brandContainer}>
              {/* Decorative element above title */}
              <View style={styles.titleDecorator}>
                <View style={styles.decoratorLine} />
                <View style={styles.decoratorDiamond} />
                <View style={styles.decoratorLine} />
              </View>

              <Text style={styles.brandTitle}>Souk Digital</Text>

              <Text style={styles.brandTagline}>ARTISANAT DU MAROC</Text>

              {/* Decorative element below tagline */}
              <View style={styles.taglineDecorator}>
                <View style={styles.taglineDot} />
                <View style={[styles.taglineDot, styles.taglineDotCenter]} />
                <View style={styles.taglineDot} />
              </View>
            </View>

            {/* Bottom curved edge */}
            <View style={styles.headerCurve} />
          </View>

          {/* ═══════════════════════════════════════════════════════════════════════════ */}
          {/* FORM SECTION */}
          {/* ═══════════════════════════════════════════════════════════════════════════ */}
          <View style={styles.formSection}>
            {/* Welcome message */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>Bon Retour</Text>
              <Text style={styles.welcomeSubtitle}>
                Connectez-vous pour découvrir des trésors artisanaux uniques
              </Text>
            </View>

            {/* Role Selector */}
            <RoleSelector selectedRole={userType} onSelectRole={setUserType} />

            {/* Input fields */}
            <View style={styles.inputsContainer}>
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
              />
            </View>

            {/* Forgot password link */}
            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>

            {/* Login button */}
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Se Connecter"
                onPress={handleLogin}
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

            {/* Sign up link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Nouveau sur Souk Digital ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupLink}>Créer un compte</Text>
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
    height: height * 0.38,
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
  patternTopRight: {
    top: -20,
    right: -30,
    opacity: 0.15,
  },
  patternBottomLeft: {
    bottom: 20,
    left: -40,
    opacity: 0.12,
  },
  patternCenter: {
    top: '30%',
    right: '20%',
    opacity: 0.08,
  },
  brandContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.xl,
  },
  titleDecorator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  decoratorLine: {
    width: 30,
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
  brandTitle: {
    fontSize: FONTS.sizes.hero,
    fontWeight: '700',
    color: COLORS.textInverse,
    letterSpacing: FONTS.letterSpacing.wide,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brandTagline: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gold,
    letterSpacing: FONTS.letterSpacing.luxury,
    fontWeight: '600',
    marginTop: SPACING.s,
  },
  taglineDecorator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.m,
  },
  taglineDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gold,
    opacity: 0.5,
  },
  taglineDotCenter: {
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
    height: 30,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  welcomeContainer: {
    marginBottom: SPACING.xl,
  },
  welcomeTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  welcomeSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  inputsContainer: {
    marginBottom: SPACING.s,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.xs,
  },
  forgotText: {
    fontSize: FONTS.sizes.sm,
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  signupLink: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: '700',
  },
  bottomDecorator: {
    alignItems: 'center',
    marginTop: SPACING.xxl,
  },
  bottomDecoratorDiamond: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.gold,
    transform: [{ rotate: '45deg' }],
    opacity: 0.3,
  },
});

export default LoginScreen;
