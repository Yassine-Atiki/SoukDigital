import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

/**
 * Premium Moroccan Pattern Component
 * Creates elegant geometric patterns inspired by traditional Moroccan zellige tiles,
 * mashrabiya screens, and architectural motifs
 */
const MoroccanPattern = ({ style, variant = 'default', color = COLORS.gold }) => {
  
  const renderPattern = () => {
    switch (variant) {
      // Elegant 8-pointed star - Classic Moroccan motif
      case 'star':
        return (
          <View style={[styles.container, style]}>
            <View style={styles.starWrapper}>
              {/* Main 8-pointed star */}
              <View style={[styles.starDiamond, { backgroundColor: color }]} />
              <View style={[styles.starDiamond, styles.starDiamondRotated, { backgroundColor: color }]} />
              {/* Center accent */}
              <View style={[styles.starCenter, { backgroundColor: COLORS.secondary }]} />
              {/* Outer ring decoration */}
              <View style={[styles.starRing, { borderColor: color }]} />
            </View>
          </View>
        );

      // Moroccan arch (horseshoe arch) - Architectural element
      case 'arch':
        return (
          <View style={[styles.container, style]}>
            <View style={styles.archWrapper}>
              {/* Outer arch */}
              <View style={[styles.archOuter, { borderColor: color }]}>
                {/* Inner arch */}
                <View style={[styles.archInner, { borderColor: color }]} />
              </View>
              {/* Keystone accent */}
              <View style={[styles.archKeystone, { backgroundColor: color }]} />
            </View>
          </View>
        );

      // Zellige geometric tiles
      case 'geometric':
        return (
          <View style={[styles.container, style]}>
            <View style={styles.geometricWrapper}>
              {/* Diamond grid pattern */}
              <View style={[styles.geoDiamond, styles.geoDiamond1, { backgroundColor: color }]} />
              <View style={[styles.geoDiamond, styles.geoDiamond2, { backgroundColor: COLORS.secondary }]} />
              <View style={[styles.geoDiamond, styles.geoDiamond3, { backgroundColor: COLORS.majorelleBlue }]} />
              <View style={[styles.geoDiamond, styles.geoDiamond4, { backgroundColor: color }]} />
              {/* Center piece */}
              <View style={[styles.geoCenter, { borderColor: color }]} />
            </View>
          </View>
        );

      // Mashrabiya-inspired lattice
      case 'lattice':
        return (
          <View style={[styles.container, style]}>
            <View style={styles.latticeWrapper}>
              {[0, 1, 2].map((row) => (
                <View key={row} style={styles.latticeRow}>
                  {[0, 1, 2].map((col) => (
                    <View 
                      key={col} 
                      style={[
                        styles.latticeCell,
                        { borderColor: color },
                        (row + col) % 2 === 0 && styles.latticeCellFilled,
                        (row + col) % 2 === 0 && { backgroundColor: color }
                      ]} 
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
        );

      // Concentric circles - Ceramic plate motif
      case 'circles':
        return (
          <View style={[styles.container, style]}>
            <View style={styles.circlesWrapper}>
              <View style={[styles.circleOuter, { borderColor: color }]}>
                <View style={[styles.circleMiddle, { borderColor: COLORS.secondary }]}>
                  <View style={[styles.circleInner, { backgroundColor: color }]} />
                </View>
              </View>
            </View>
          </View>
        );

      // Default - Elegant subtle pattern
      default:
        return (
          <View style={[styles.container, style]}>
            <View style={styles.defaultWrapper}>
              {/* Subtle diamond accent */}
              <View style={[styles.defaultDiamond, { backgroundColor: color }]} />
              {/* Decorative dots */}
              <View style={[styles.defaultDot, styles.defaultDotTop, { backgroundColor: color }]} />
              <View style={[styles.defaultDot, styles.defaultDotBottom, { backgroundColor: color }]} />
              <View style={[styles.defaultDot, styles.defaultDotLeft, { backgroundColor: color }]} />
              <View style={[styles.defaultDot, styles.defaultDotRight, { backgroundColor: color }]} />
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

  // ═══════════════════════════════════════════════════════════════════════════
  // STAR PATTERN
  // ═══════════════════════════════════════════════════════════════════════════
  starWrapper: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starDiamond: {
    position: 'absolute',
    width: 50,
    height: 50,
    transform: [{ rotate: '45deg' }],
    opacity: 0.15,
  },
  starDiamondRotated: {
    transform: [{ rotate: '22.5deg' }, { scale: 0.85 }],
    opacity: 0.1,
  },
  starCenter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    opacity: 0.2,
  },
  starRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    opacity: 0.08,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARCH PATTERN
  // ═══════════════════════════════════════════════════════════════════════════
  archWrapper: {
    width: 140,
    height: 180,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  archOuter: {
    width: 100,
    height: 140,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 2,
    borderBottomWidth: 0,
    opacity: 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  archInner: {
    width: 70,
    height: 100,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    opacity: 0.6,
    marginTop: 10,
  },
  archKeystone: {
    position: 'absolute',
    top: 20,
    width: 12,
    height: 20,
    borderRadius: 2,
    opacity: 0.2,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GEOMETRIC PATTERN
  // ═══════════════════════════════════════════════════════════════════════════
  geometricWrapper: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  geoDiamond: {
    position: 'absolute',
    width: 40,
    height: 40,
    transform: [{ rotate: '45deg' }],
    opacity: 0.1,
  },
  geoDiamond1: { top: 10, left: 40 },
  geoDiamond2: { top: 40, left: 10, opacity: 0.08 },
  geoDiamond3: { top: 40, right: 10, opacity: 0.06 },
  geoDiamond4: { bottom: 10, left: 40, opacity: 0.12 },
  geoCenter: {
    width: 24,
    height: 24,
    borderWidth: 2,
    transform: [{ rotate: '45deg' }],
    opacity: 0.15,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LATTICE PATTERN
  // ═══════════════════════════════════════════════════════════════════════════
  latticeWrapper: {
    width: 90,
    height: 90,
    padding: 5,
  },
  latticeRow: {
    flexDirection: 'row',
    flex: 1,
  },
  latticeCell: {
    flex: 1,
    borderWidth: 1,
    margin: 2,
    borderRadius: 2,
    opacity: 0.1,
  },
  latticeCellFilled: {
    opacity: 0.08,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CIRCLES PATTERN
  // ═══════════════════════════════════════════════════════════════════════════
  circlesWrapper: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    opacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleMiddle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    opacity: 0.4,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DEFAULT PATTERN
  // ═══════════════════════════════════════════════════════════════════════════
  defaultWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultDiamond: {
    width: 40,
    height: 40,
    transform: [{ rotate: '45deg' }],
    opacity: 0.1,
  },
  defaultDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.15,
  },
  defaultDotTop: { top: 15 },
  defaultDotBottom: { bottom: 15 },
  defaultDotLeft: { left: 15 },
  defaultDotRight: { right: 15 },
});

export default MoroccanPattern;
