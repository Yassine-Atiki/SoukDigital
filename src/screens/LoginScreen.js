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
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
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
        console.log('🔑 Début du login...', { email, userType });
        const result = await login(email, password, userType);
        console.log('🔑 Résultat login:', result);

        if (result.success) {
          console.log('✅ Navigation vers Main...');
          navigation.replace('Main', { userType });
        } else {
          console.log('❌ Échec login:', result.error);
          Alert.alert('Erreur', result.error || 'Identifiants incorrects');
        }
      } catch (error) {
        console.error('❌ Exception lors du login:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaWrapper backgroundColor={COLORS.background}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
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
          {/* ARTISTIC HEADER WITH MOROCCAN PATTERNS */}
          {/* ═══════════════════════════════════════════════════════════════════════════ */}
          <View style={styles.headerSection}>
            {/* Gradient Background */}
            <View style={styles.gradientContainer}>
              <View style={[styles.gradientCircle, styles.gradientCircle1]} />
              <View style={[styles.gradientCircle, styles.gradientCircle2]} />
              <View style={[styles.gradientCircle, styles.gradientCircle3]} />
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

            {/* Artistic Brand Section */}
            <View style={styles.brandContainer}>
              {/* Decorative Icon */}
              <View style={styles.brandIconContainer}>
                <View style={styles.brandIconOuter}>
                  <View style={styles.brandIconInner}>
                    <Ionicons name="diamond" size={32} color={COLORS.gold} />
                  </View>
                </View>
              </View>

              <Text style={styles.brandTitle}>Souk Digital</Text>
              <Text style={styles.brandTagline}>L'artisanat marocain à portée de main</Text>
            </View>
          </View>

          {/* ═══════════════════════════════════════════════════════════════════════════ */}
          {/* FORM CARD WITH ELEVATED DESIGN */}
          {/* ═══════════════════════════════════════════════════════════════════════════ */}
          <View style={styles.formCard}>
            {/* Decorative Top Border */}
            <View style={styles.cardTopBorder}>
              <View style={styles.cardTopBorderLine} />
              <View style={styles.cardTopBorderDiamond} />
              <View style={styles.cardTopBorderLine} />
            </View>

            {/* Welcome Section */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>Bon Retour</Text>
              <Text style={styles.welcomeSubtitle}>
                Connectez-vous pour découvrir des trésors artisanaux
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
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Sign up link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Nouveau sur Souk Digital ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupLink}>Créer un compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTISTIC HEADER STYLES
  // ═══════════════════════════════════════════════════════════════════════════
  headerSection: {
    height: height * 0.35,
    backgroundColor: COLORS.primary,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientCircle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.15,
  },
  gradientCircle1: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.gold,
    top: -50,
    right: -50,
  },
  gradientCircle2: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.goldLight,
    bottom: 20,
    left: -40,
  },
  gradientCircle3: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.primaryLight,
    top: '40%',
    right: '30%',
  },
  patternTopRight: {
    top: 20,
    right: -20,
    opacity: 0.1,
  },
  patternBottomLeft: {
    bottom: 40,
    left: -30,
    opacity: 0.08,
  },
  brandContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  brandIconContainer: {
    marginBottom: SPACING.l,
  },
  brandIconOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(212, 168, 83, 0.3)',
  },
  brandIconInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.surface,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: SPACING.xs,
  },
  brandTagline: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.goldLight,
    letterSpacing: 0.5,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ELEVATED FORM CARD STYLES
  // ═══════════════════════════════════════════════════════════════════════════
  formCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
    ...SHADOWS.lg,
  },
  cardTopBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.l,
  },
  cardTopBorderLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.gold,
    opacity: 0.3,
  },
  cardTopBorderDiamond: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.gold,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: SPACING.m,
    opacity: 0.6,
  },
  welcomeContainer: {
    marginBottom: SPACING.l,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  welcomeSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.m,
  },
  inputsContainer: {
    marginBottom: SPACING.m,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.l,
    paddingVertical: SPACING.xs,
  },
  forgotText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: SPACING.l,
  },
  dividerContainer: {
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
    fontSize: FONTS.sizes.sm,
    color: COLORS.textTertiary,
    fontWeight: '500',
    marginHorizontal: SPACING.m,
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
});

export default LoginScreen;
