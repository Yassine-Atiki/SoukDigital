// src/components/MoroccanPattern.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

// Main MoroccanPattern component with variants
const MoroccanPattern = ({ variant = 'zellige', style, color = colors.primary, size = 40 }) => {
  const renderPattern = () => {
    switch (variant) {
      case 'star':
      case 'star8':
        return (
          <View style={[styles.starContainer, { width: size, height: size }, style]}>
            {[0, 45, 90, 135].map((rotation, index) => (
              <View
                key={index}
                style={[
                  styles.starLine,
                  {
                    backgroundColor: color,
                    transform: [{ rotate: `${rotation}deg` }],
                  },
                ]}
              />
            ))}
          </View>
        );
      
      case 'arch':
        return (
          <View style={[styles.archContainer, { width: size, height: size }, style]}>
            <View style={[styles.arch, { borderColor: color }]} />
          </View>
        );
      
      case 'circles':
      case 'medallion':
        return (
          <View style={[styles.circlesContainer, { width: size, height: size }, style]}>
            <View style={[styles.circle, { borderColor: color }]} />
            <View style={[styles.circleInner, { borderColor: color }]} />
          </View>
        );
      
      case 'zellige':
      default:
        return (
          <View style={[styles.zelligeContainer, { width: size, height: size }, style]}>
            <View style={[styles.zelligeDiamond, { backgroundColor: color }]} />
            <View style={[styles.zelligeDiamond, { backgroundColor: color, transform: [{ rotate: '45deg' }] }]} />
          </View>
        );
    }
  };

  return renderPattern();
};

// Named exports for backward compatibility
export const MoroccanStar = ({ size = 40, color = colors.primary, style }) => (
  <MoroccanPattern variant="star" size={size} color={color} style={style} />
);

export const ZelligePattern = ({ style, color }) => (
  <MoroccanPattern variant="zellige" style={style} color={color} />
);

export const MoroccanDivider = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    <MoroccanStar size={20} color={colors.primary} />
    <View style={styles.dividerLine} />
  </View>
);

// Default export
export default MoroccanPattern;

const styles = StyleSheet.create({
  starContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  starLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
  },
  archContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arch: {
    width: '80%',
    height: '80%',
    borderWidth: 2,
    borderRadius: 100,
    borderBottomWidth: 0,
  },
  circlesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 100,
  },
  circleInner: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    borderWidth: 2,
    borderRadius: 100,
  },
  zelligeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  zelligeDiamond: {
    width: '50%',
    height: '50%',
    position: 'absolute',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
});