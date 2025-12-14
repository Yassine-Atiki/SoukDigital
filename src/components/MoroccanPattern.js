import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

// Composant pour créer des motifs géométriques marocains (zellige)
const MoroccanPattern = ({ style, variant = 'default' }) => {
  const renderPattern = () => {
    switch (variant) {
      case 'arch':
        return (
          <View style={[styles.container, style]}>
            {/* Arc marocain stylisé */}
            <View style={styles.archOuter}>
              <View style={styles.archInner} />
            </View>
            <View style={[styles.archOuter, styles.archRight]}>
              <View style={styles.archInner} />
            </View>
          </View>
        );
      
      case 'star':
        return (
          <View style={[styles.container, style]}>
            {/* Étoile à 8 branches (motif marocain) */}
            <View style={styles.starContainer}>
              <View style={[styles.diamond, styles.diamond1]} />
              <View style={[styles.diamond, styles.diamond2]} />
            </View>
          </View>
        );
      
      case 'geometric':
        return (
          <View style={[styles.container, style]}>
            {/* Motifs géométriques zellige */}
            <View style={styles.geometricGrid}>
              <View style={[styles.tile, styles.tile1]} />
              <View style={[styles.tile, styles.tile2]} />
              <View style={[styles.tile, styles.tile3]} />
              <View style={[styles.tile, styles.tile4]} />
            </View>
          </View>
        );
      
      default:
        return (
          <View style={[styles.container, style]}>
            {/* Cercles concentriques (motif simple) */}
            <View style={styles.circleOuter}>
              <View style={styles.circleMiddle}>
                <View style={styles.circleInner} />
              </View>
            </View>
          </View>
        );
    }
  };

  return renderPattern();
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Arc marocain
  archOuter: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.gold,
    opacity: 0.12,
    position: 'absolute',
  },
  archInner: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    borderRadius: 60,
    backgroundColor: COLORS.background,
  },
  archRight: {
    left: 100,
    top: 50,
    opacity: 0.08,
  },
  
  // Étoile
  starContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diamond: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: COLORS.majorelleBlue,
    opacity: 0.15,
  },
  diamond1: {
    transform: [{ rotate: '45deg' }],
  },
  diamond2: {
    transform: [{ rotate: '0deg' }],
    opacity: 0.1,
  },
  
  // Géométrique zellige
  geometricGrid: {
    width: 120,
    height: 120,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tile: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: COLORS.gold,
    opacity: 0.2,
  },
  tile1: {
    backgroundColor: COLORS.primary,
    opacity: 0.1,
  },
  tile2: {
    backgroundColor: COLORS.majorelleBlue,
    opacity: 0.08,
  },
  tile3: {
    backgroundColor: COLORS.secondary,
    opacity: 0.08,
  },
  tile4: {
    backgroundColor: COLORS.gold,
    opacity: 0.12,
  },
  
  // Cercles
  circleOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    opacity: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleMiddle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.gold,
    opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.majorelleBlue,
    opacity: 0.6,
  },
});

export default MoroccanPattern;
