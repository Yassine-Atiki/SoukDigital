// src/components/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fonts, shadows } from '../constants/theme';
import { MoroccanStar } from './MoroccanPattern';

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  style,
  disabled = false
}) => {
  const buttonStyles = [
    styles.button,
    variant === 'primary' && styles.buttonPrimary,
    variant === 'secondary' && styles.buttonSecondary,
    variant === 'outline' && styles.buttonOutline,
    disabled && styles.buttonDisabled,
    style,
  ];

  const textStyles = [
    styles.buttonText,
    variant === 'primary' && styles.buttonTextPrimary,
    variant === 'secondary' && styles.buttonTextSecondary,
    variant === 'outline' && styles.buttonTextOutline,
  ];

  const starColor = variant === 'outline' ? colors.primary : '#FFF';

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>{title}</Text>
      <MoroccanStar size={16} color={starColor} style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: borderRadius.md,
    marginVertical: spacing.sm,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    ...shadows.gold,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    ...shadows.medium,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
  },
  buttonTextPrimary: {
    color: '#FFF',
  },
  buttonTextSecondary: {
    color: '#FFF',
  },
  buttonTextOutline: {
    color: colors.primary,
  },
});

export default CustomButton;