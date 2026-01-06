// src/components/CustomInput.js
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fonts } from '../constants/theme';

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  icon,
  iconName, // New: Ionicon name (e.g., "person-outline")
  iconColor, // New: Ionicon color
  error,
  keyboardType,
  autoCapitalize,
  helperText,
  ...props
}) => {
  return (
    <View style={styles.inputWrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {iconName ? (
          <Ionicons 
            name={iconName} 
            size={22} 
            color={iconColor || colors.primary} 
            style={styles.ionIcon}
          />
        ) : icon ? (
          <Text style={styles.inputIcon}>{icon}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          {...props}
        />
      </View>
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fonts.sizes.sm,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 56,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  ionIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: fonts.sizes.md,
    color: colors.text,
  },
  helperText: {
    color: colors.textLight,
    fontSize: fonts.sizes.xs,
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
  errorText: {
    color: colors.error,
    fontSize: fonts.sizes.xs,
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
});

export default CustomInput;