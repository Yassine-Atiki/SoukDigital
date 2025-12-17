import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS, FONTS } from '../constants/theme';

/**
 * Premium CustomButton Component
 * Moroccan-inspired button with elegant decorative elements
 */
const CustomButton = ({ 
  title, 
  onPress, 
  type = 'primary', 
  size = 'large',
  isLoading = false,
  disabled = false,
  icon = null,
}) => {
  const isPrimary = type === 'primary';
  const isOutline = type === 'outline';
  const isGhost = type === 'ghost';

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: SPACING.s + 2,
          paddingHorizontal: SPACING.m,
        };
      case 'medium':
        return {
          paddingVertical: SPACING.m,
          paddingHorizontal: SPACING.l,
        };
      case 'large':
      default:
        return {
          paddingVertical: SPACING.m + 4,
          paddingHorizontal: SPACING.xl,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getSizeStyles(),
        isPrimary && styles.primaryContainer,
        isOutline && styles.outlineContainer,
        isGhost && styles.ghostContainer,
        (isLoading || disabled) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.8}
    >
      {/* Premium gold corner accents - inspired by traditional Moroccan frames */}
      {isPrimary && (
        <>
          {/* Top decorative line */}
          <View style={styles.topGoldLine} />
          {/* Corner accents */}
          <View style={[styles.cornerAccent, styles.cornerTopLeft]} />
          <View style={[styles.cornerAccent, styles.cornerTopRight]} />
          <View style={[styles.cornerAccent, styles.cornerBottomLeft]} />
          <View style={[styles.cornerAccent, styles.cornerBottomRight]} />
        </>
      )}
      
      {isLoading ? (
        <ActivityIndicator 
          color={isPrimary ? COLORS.textInverse : COLORS.primary} 
          size="small" 
        />
      ) : (
        <View style={styles.contentWrapper}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <Text 
            style={[
              styles.text, 
              isPrimary && styles.primaryText,
              isOutline && styles.outlineText,
              isGhost && styles.ghostText,
              size === 'small' && styles.smallText,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 56,
  },
  
  // Primary Button - Rich terracotta with gold accents
  primaryContainer: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.primary,
    borderWidth: 1,
    borderColor: 'rgba(201, 162, 39, 0.3)',
  },
  
  // Outline Button
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  
  // Ghost Button
  ghostContainer: {
    backgroundColor: 'transparent',
  },

  // Top decorative gold line
  topGoldLine: {
    position: 'absolute',
    top: 0,
    left: '15%',
    right: '15%',
    height: 2,
    backgroundColor: COLORS.gold,
    opacity: 0.5,
    borderRadius: 1,
  },

  // Corner accent decorations
  cornerAccent: {
    position: 'absolute',
    width: 12,
    height: 12,
    opacity: 0.6,
  },
  cornerTopLeft: {
    top: -1,
    left: -1,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: COLORS.gold,
    borderTopLeftRadius: BORDER_RADIUS.lg,
  },
  cornerTopRight: {
    top: -1,
    right: -1,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: COLORS.gold,
    borderTopRightRadius: BORDER_RADIUS.lg,
  },
  cornerBottomLeft: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: COLORS.gold,
    borderBottomLeftRadius: BORDER_RADIUS.lg,
  },
  cornerBottomRight: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: COLORS.gold,
    borderBottomRightRadius: BORDER_RADIUS.lg,
  },

  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  iconWrapper: {
    marginRight: SPACING.s,
  },

  text: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    letterSpacing: FONTS.letterSpacing.wider,
    textTransform: 'uppercase',
  },
  
  smallText: {
    fontSize: FONTS.sizes.sm,
    letterSpacing: FONTS.letterSpacing.wide,
  },
  
  primaryText: {
    color: COLORS.textInverse,
  },
  
  outlineText: {
    color: COLORS.primary,
  },
  
  ghostText: {
    color: COLORS.primary,
  },
  
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButton;
