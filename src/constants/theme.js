// src/constants/theme.js
// Premium Moroccan Design System

export const colors = {
  // Couleurs principales
  primary: '#D4AF37',        // Or/Doré des artisans
  secondary: '#8B4513',      // Terre cuite des poteries
  tertiary: '#006847',       // Vert menthe marocain

  // Accents colorés
  soukOrange: '#E67E22',     // Orange des épices
  zeliggeBlue: '#2C5F7C',    // Bleu zellige
  desertSand: '#EDC9AF',     // Sable du désert
  mintGreen: '#98D8C8',      // Menthe fraîche

  // Neutres
  background: '#F8F6F0',     // Beige clair
  surface: '#FFFFFF',        // Surface/Card background
  cardBackground: '#FFFFFF', // Blanc pur
  backgroundAlt: '#F5F2ED',  // Alternative background
  text: '#2C1810',           // Marron foncé
  textLight: '#8B7355',      // Marron clair
  textSecondary: '#6B5D52',  // Text secondary
  textTertiary: '#9B8B7E',   // Text tertiary
  border: '#D4C5B9',         // Beige moyen

  // États
  error: '#C0392B',
  success: '#27AE60',
  shadow: 'rgba(139, 69, 19, 0.15)',
};

// Premium COLORS export for new components
export const COLORS = {
  // Primary Palette - Rich Moroccan Burgundy & Gold
  primary: '#8B2942',           // Deep burgundy
  primaryLight: '#A84159',      // Lighter burgundy
  primaryDark: '#6B1F33',       // Darker burgundy
  
  // Gold Accents - Luxury metallic tones
  gold: '#D4A853',              // Rich gold
  goldLight: '#E8C98A',         // Light gold
  goldDark: '#B8913D',          // Deep gold
  
  // Neutrals - Warm ivory base
  background: '#FAF8F5',        // Soft ivory
  backgroundAlt: '#F5F2ED',     // Alternative background
  surface: '#FFFFFF',           // Pure white for cards
  
  // Text Hierarchy
  text: '#2C1810',              // Deep brown
  textSecondary: '#6B5D52',     // Medium brown
  textTertiary: '#9B8B7E',      // Light brown
  textLight: '#D4C5B9',         // Very light for placeholders
  
  // Semantic Colors
  success: '#1A4D4D',           // Deep emerald
  error: '#C0392B',             // Rich red
  warning: '#E67E22',           // Warm orange
  info: '#2C5F7C',              // Deep blue
  
  // Borders & Dividers
  border: '#E8E3DC',            // Soft border
  borderLight: '#F0EDE8',       // Lighter border
  borderDark: '#D4C5B9',        // Darker border
  
  // Overlays
  overlay: 'rgba(44, 24, 16, 0.6)',
  overlayLight: 'rgba(44, 24, 16, 0.3)',
  
  // Pattern Colors
  patternPrimary: 'rgba(139, 41, 66, 0.08)',
  patternGold: 'rgba(212, 168, 83, 0.12)',
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  gold: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
};

// Premium SHADOWS export
export const SHADOWS = {
  none: {},
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#8B2942',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  md: {
    shadowColor: '#8B2942',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#8B2942',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  gold: {
    shadowColor: '#D4A853',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Premium SPACING export
export const SPACING = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

// Premium BORDER_RADIUS export
export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 999,
};

export const fonts = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Premium FONTS export
export const FONTS = {
  sizes: {
    caption: 11,
    small: 13,
    body: 15,
    subheading: 17,
    heading: 20,
    title: 26,
    h1: 34,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },
};

// Gradients Configuration
export const GRADIENTS = {
  primary: ['#8B2942', '#6B1F33'],
  gold: ['#E8C98A', '#D4A853'],
  burgundy: ['#A84159', '#8B2942'],
};

// Pattern Configuration
export const PATTERNS = {
  opacity: {
    subtle: 0.05,
    light: 0.08,
    medium: 0.12,
    strong: 0.18,
  },
  sizes: {
    small: 8,
    medium: 12,
    large: 16,
  },
};

export default {
  colors,
  shadows,
  spacing,
  borderRadius,
  fonts,
};