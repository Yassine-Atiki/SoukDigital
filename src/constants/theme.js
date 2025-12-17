// ═══════════════════════════════════════════════════════════════════════════
// SOUK DIGITAL - Premium Moroccan Design System
// Inspired by traditional Moroccan craftsmanship & luxury aesthetics
// ═══════════════════════════════════════════════════════════════════════════

export const COLORS = {
  // ─────────────────────────────────────────────────────────────────────────
  // PRIMARY PALETTE - Rich Terracotta & Warm Earth Tones
  // Inspired by Moroccan pottery, tadelakt walls, and desert landscapes
  // ─────────────────────────────────────────────────────────────────────────
  primary: '#C45C3E', // Rich terracotta - more saturated & premium
  primaryDark: '#9A3E28',
  primaryLight: '#E07B5F',
  primaryMuted: '#D4927E',
  
  // ─────────────────────────────────────────────────────────────────────────
  // SECONDARY PALETTE - Deep Emerald Green
  // Inspired by Fes zellige tiles, lush riads, and traditional ceramics
  // ─────────────────────────────────────────────────────────────────────────
  secondary: '#1A4A4A', // Deeper, richer emerald
  secondaryLight: '#2A6B6B',
  secondaryDark: '#0F3333',
  
  // ─────────────────────────────────────────────────────────────────────────
  // ACCENT COLORS - Luxury Moroccan Touches
  // ─────────────────────────────────────────────────────────────────────────
  gold: '#C9A227', // Authentic brass/gold - richer tone
  goldLight: '#E4C65B',
  goldDark: '#9A7B1C',
  goldShimmer: '#F5E6B8', // For highlights
  
  majorelleBlue: '#4361AC', // Iconic Majorelle blue - deeper
  majorelleLight: '#6B8BD4',
  
  cobalt: '#1E3A5F', // Traditional cobalt ceramics
  
  // ─────────────────────────────────────────────────────────────────────────
  // TERTIARY - Extended Moroccan Palette
  // ─────────────────────────────────────────────────────────────────────────
  terracotta: '#B8513D',
  saffron: '#E5A520', // Rich saffron
  amber: '#D4820C',
  mint: '#7BC4B8', // Fresh mint tea
  mintLight: '#B5E0D8',
  desert: '#E8D5B7', // Saharan sand
  desertLight: '#F5EDE0',
  henna: '#8B4513', // Traditional henna
  burgundy: '#722F37', // Moroccan leather
  
  // ─────────────────────────────────────────────────────────────────────────
  // NEUTRAL PALETTE - Warm & Sophisticated
  // ─────────────────────────────────────────────────────────────────────────
  background: '#FAF6F0', // Warm cream - like aged parchment
  backgroundAlt: '#F5EFE6', // Slightly darker variant
  surface: '#FFFFFF',
  surfaceElevated: '#FFFDF9',
  surfaceWarm: '#FDF8F2',
  
  // ─────────────────────────────────────────────────────────────────────────
  // TEXT COLORS - Rich & Readable
  // ─────────────────────────────────────────────────────────────────────────
  text: '#1C1610', // Deep warm black
  textSecondary: '#4A4239',
  textTertiary: '#7A7164',
  textLight: '#A39B8F',
  textMuted: '#C4BBB0',
  textInverse: '#FFFFFF',
  textGold: '#9A7B1C',
  
  // ─────────────────────────────────────────────────────────────────────────
  // SEMANTIC COLORS
  // ─────────────────────────────────────────────────────────────────────────
  error: '#B53D3D',
  errorLight: '#F5DEDE',
  success: '#2D6A4F',
  successLight: '#D8F0E5',
  warning: '#D4820C',
  warningLight: '#FFF0D4',
  info: '#4361AC',
  infoLight: '#E8EDF8',
  
  // ─────────────────────────────────────────────────────────────────────────
  // BORDERS & DIVIDERS
  // ─────────────────────────────────────────────────────────────────────────
  border: '#E8E0D5',
  borderLight: '#F2EDE6',
  borderDark: '#D4CBC0',
  borderGold: 'rgba(201, 162, 39, 0.3)',
  
  // ─────────────────────────────────────────────────────────────────────────
  // OVERLAYS & GRADIENTS
  // ─────────────────────────────────────────────────────────────────────────
  overlay: 'rgba(28, 22, 16, 0.75)',
  overlayLight: 'rgba(28, 22, 16, 0.4)',
  overlayGold: 'rgba(201, 162, 39, 0.15)',
  
  // Gradient stops
  gradientStart: '#1A4A4A',
  gradientMiddle: '#0F3333',
  gradientEnd: '#0A2626',
};

export const SPACING = {
  xxs: 2,
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  huge: 80,
};

export const FONTS = {
  // Font families (using system fonts, can be replaced with custom fonts)
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
  
  // Sizes - More refined scale
  sizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 36,
    display: 44,
    hero: 52,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
  
  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
    luxury: 3,
  },
};

export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: {
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  light: {
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  strong: {
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
  dramatic: {
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },
  // Colored shadows for premium effect
  primary: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  gold: {
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emerald: {
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
};

export const BORDER_RADIUS = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 36,
  round: 999,
  // Moroccan arch-inspired
  archSmall: 32,
  archMedium: 48,
  archLarge: 64,
};

// Premium animation configurations
export const ANIMATIONS = {
  fast: 150,
  normal: 250,
  slow: 400,
  verySlow: 600,
};

// Opacity levels
export const OPACITY = {
  disabled: 0.4,
  muted: 0.6,
  subtle: 0.8,
  full: 1,
};

// Z-index levels
export const Z_INDEX = {
  base: 0,
  elevated: 10,
  dropdown: 100,
  modal: 1000,
  toast: 10000,
};
