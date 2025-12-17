import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS, FONTS } from '../constants/theme';

/**
 * Premium CustomInput Component
 * Elegant input field with Moroccan-inspired decorative elements
 */
const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  leftIcon = null,
  rightIcon = null,
  helperText = null,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Animation for focus state
  const focusAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Animated border color
  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.primary],
  });

  // Animated gold accent width
  const goldAccentWidth = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3],
  });

  return (
    <View style={styles.container}>
      {/* Label with decorative element */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, error && styles.labelError]}>
            {label}
          </Text>
          {/* Small Moroccan-inspired diamond accent */}
          <View style={[
            styles.labelAccent,
            isFocused && styles.labelAccentActive,
            error && styles.labelAccentError,
          ]} />
        </View>
      )}

      {/* Input container with animations */}
      <Animated.View
        style={[
          styles.inputWrapper,
          { borderColor: error ? COLORS.error : borderColor },
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
        ]}
      >
        {/* Gold focus indicator - left accent bar */}
        <Animated.View 
          style={[
            styles.focusIndicator,
            { width: goldAccentWidth },
            error && styles.focusIndicatorError,
          ]} 
        />

        {/* Left icon */}
        {leftIcon && (
          <View style={styles.iconContainer}>
            {leftIcon}
          </View>
        )}

        {/* Text input */}
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Right icon or password toggle */}
        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity 
            style={styles.iconContainer}
            onPress={secureTextEntry ? () => setShowPassword(!showPassword) : undefined}
            activeOpacity={secureTextEntry ? 0.7 : 1}
          >
            {secureTextEntry ? (
              <Text style={styles.eyeIcon}>{showPassword ? '👁' : '👁‍🗨'}</Text>
            ) : rightIcon}
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Error message with decorative dot */}
      {error && (
        <View style={styles.errorContainer}>
          <View style={styles.errorDot} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.l,
  },

  // Label styles
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.text,
    letterSpacing: FONTS.letterSpacing.wide,
  },
  labelError: {
    color: COLORS.error,
  },
  labelAccent: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.gold,
    transform: [{ rotate: '45deg' }],
    marginLeft: SPACING.s,
    opacity: 0.6,
  },
  labelAccentActive: {
    opacity: 1,
    backgroundColor: COLORS.primary,
  },
  labelAccentError: {
    backgroundColor: COLORS.error,
    opacity: 1,
  },

  // Input wrapper styles
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
    minHeight: 56,
    ...SHADOWS.subtle,
  },
  inputWrapperFocused: {
    backgroundColor: COLORS.surfaceWarm,
    ...SHADOWS.light,
  },
  inputWrapperError: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorLight,
  },

  // Gold focus indicator
  focusIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.gold,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderBottomLeftRadius: BORDER_RADIUS.md,
  },
  focusIndicatorError: {
    backgroundColor: COLORS.error,
  },

  // Input field
  input: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.m,
    fontWeight: '500',
  },
  inputWithLeftIcon: {
    paddingLeft: SPACING.xs,
  },
  inputWithRightIcon: {
    paddingRight: SPACING.xs,
  },

  // Icons
  iconContainer: {
    paddingHorizontal: SPACING.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: 18,
    opacity: 0.6,
  },

  // Error styles
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
    paddingLeft: SPACING.xs,
  },
  errorDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.error,
    marginRight: SPACING.xs,
  },
  errorText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.error,
    fontWeight: '500',
  },

  // Helper text
  helperText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textTertiary,
    marginTop: SPACING.xs,
    paddingLeft: SPACING.xs,
  },
});

export default CustomInput;
