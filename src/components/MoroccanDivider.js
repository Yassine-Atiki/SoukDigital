import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

/**
 * Composant de diviseur décoratif inspiré des motifs marocains
 * Peut être utilisé pour séparer des sections avec style
 */
const MoroccanDivider = ({ style, variant = 'simple' }) => {
  const renderDivider = () => {
    switch (variant) {
      case 'ornate':
        return (
          <View style={[styles.container, style]}>
            <View style={styles.line} />
            <View style={styles.ornateCenter}>
              <View style={styles.diamond} />
              <View style={[styles.diamond, styles.diamondRotated]} />
              <View style={styles.centerDot} />
            </View>
            <View style={styles.line} />
          </View>
        );
      
      case 'dots':
        return (
          <View style={[styles.container, style]}>
            <View style={styles.line} />
            <View style={styles.dotsContainer}>
              <View style={styles.dot} />
              <View style={[styles.dot, styles.dotLarge]} />
              <View style={styles.dot} />
            </View>
            <View style={styles.line} />
          </View>
        );
      
      case 'geometric':
        return (
          <View style={[styles.container, style]}>
            <View style={styles.line} />
            <View style={styles.geometricCenter}>
              <View style={styles.smallSquare} />
              <View style={[styles.smallSquare, styles.squareRotated]} />
            </View>
            <View style={styles.line} />
          </View>
        );
      
      default: // simple
        return (
          <View style={[styles.container, style]}>
            <View style={styles.simpleLine} />
          </View>
        );
    }
  };

  return renderDivider();
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.l,
  },
  
  // Ligne simple
  simpleLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
    borderRadius: 1,
  },
  
  // Ligne avec ornement
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  
  // Centre orné avec diamant
  ornateCenter: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.m,
    position: 'relative',
  },
  diamond: {
    width: 16,
    height: 16,
    backgroundColor: COLORS.gold,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
  },
  diamondRotated: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    opacity: 0.8,
  },
  centerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
    position: 'absolute',
  },
  
  // Trois points
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.m,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gold,
    marginHorizontal: 3,
  },
  dotLarge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  
  // Géométrique
  geometricCenter: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.m,
    position: 'relative',
  },
  smallSquare: {
    width: 12,
    height: 12,
    backgroundColor: COLORS.gold,
    borderWidth: 1,
    borderColor: COLORS.primary,
    position: 'absolute',
  },
  squareRotated: {
    transform: [{ rotate: '45deg' }],
    width: 8,
    height: 8,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.gold,
  },
});

export default MoroccanDivider;
