// Palette de couleurs inspirée du Maroc traditionnel moderne
export const COLORS = {
  // Couleurs principales - Tons chauds du désert et de la terre cuite
  primary: '#D97853', // Terre cuite marocaine moderne
  primaryDark: '#B85835',
  primaryLight: '#E89A7A',
  
  // Couleurs secondaires - Vert émeraude des zellige
  secondary: '#0D4D4D', // Vert émeraude profond
  secondaryLight: '#1A6B6B',
  
  // Couleurs d'accent - Or et bleu Majorelle
  gold: '#D4AF37', // Or des motifs traditionnels
  goldLight: '#E8C968',
  majorelleBlue: '#5B7BDB', // Bleu Majorelle iconique
  cobalt: '#2E5090', // Cobalt des céramiques
  
  // Couleurs tertiaires - Palette marocaine
  terracotta: '#C1593C',
  saffron: '#F4B942', // Jaune safran
  mint: '#98D8C8', // Menthe
  desert: '#E8CDA5', // Sable du désert
  
  // Couleurs neutres
  background: '#FBF7F0', // Beige crème chaleureux
  surface: '#FFFFFF',
  surfaceElevated: '#FFFBF5',
  
  // Textes
  text: '#2C2416', // Brun foncé
  textSecondary: '#5D5548',
  textLight: '#9B8F7F',
  textInverse: '#FFFFFF',
  
  // États
  error: '#C1593C',
  success: '#0D4D4D',
  warning: '#F4B942',
  
  // Bordures et séparateurs
  border: '#E5DDD0',
  borderLight: '#F2EDE3',
  
  // Transparents pour overlays
  overlay: 'rgba(44, 36, 22, 0.7)',
  overlayLight: 'rgba(44, 36, 22, 0.3)',
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 42,
  },
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.text,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  strong: {
    shadowColor: COLORS.text,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 8,
  },
  colored: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
};

// Bordures arrondies inspirées des arcs marocains
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 999,
  arch: 40, // Pour simuler les arcs marocains
};

// Motifs géométriques marocains (pour les backgrounds)
export const PATTERNS = {
  zellige: {
    size: 100,
    opacity: 0.15,
  },
  arabesque: {
    size: 80,
    opacity: 0.1,
  },
};
