/**
 * Modern Design System & Tokens
 * Based on 2026 market research and best practices
 * Follows Material Design 3 + modern web design trends
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Primary - Modern gradient-friendly colors
  primary: {
    main: "#0066ff",      // Vibrant blue
    light: "#3385ff",
    lighter: "#e6f0ff",
    dark: "#0052cc",
    darker: "#003d99",
  },

  // Secondary - Complementary accent
  secondary: {
    main: "#ff6b35",      // Modern orange
    light: "#ff8c5f",
    lighter: "#fff4ee",
    dark: "#e65100",
  },

  // Semantic colors
  success: "#10b981",    // Modern green
  warning: "#f59e0b",    // Modern amber
  error: "#ef4444",      // Modern red
  info: "#06b6d4",       // Cyan

  // Neutral palette - For text, backgrounds
  neutral: {
    0: "#ffffff",
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Gradients
  gradients: {
    primary: "linear-gradient(135deg, #0066ff 0%, #0099ff 100%)",
    premium: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    warm: "linear-gradient(135deg, #ff6b35 0%, #ffa500 100%)",
    cool: "linear-gradient(to right, #06b6d4, #0891b2)",
    dark: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font families
  fontFamily: {
    base: "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', sans-serif",
    mono: "'Menlo', 'Monaco', 'Courier New', 'monospace'",
  },

  // Font scales
  fontSize: {
    xs: "12px",
    sm: "13px",
    base: "14px",
    md: "15px",
    lg: "16px",
    xl: "18px",
    "2xl": "20px",
    "3xl": "24px",
    "4xl": "28px",
    "5xl": "32px",
    "6xl": "36px",
    "7xl": "40px",
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line heights
  lineHeight: {
    tight: "1.2",
    normal: "1.5",
    relaxed: "1.75",
    loose: "2",
  },

  // Letter spacing
  letterSpacing: {
    tight: "-0.02em",
    normal: "0em",
    wide: "0.04em",
    wider: "0.08em",
  },
};

// ============================================================================
// SPACING SYSTEM (8px grid)
// ============================================================================

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: "0px",
  sm: "4px",
  base: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  "3xl": "24px",
  full: "9999px",
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: "none",
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  base: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  xl: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
  hover: "0 15px 30px -5px rgba(0, 0, 0, 0.15)",
  elevated: "0 20px 40px -10px rgba(0, 0, 0, 0.2)",
};

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
  slowest: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
};

// ============================================================================
// BREAKPOINTS (Mobile First)
// ============================================================================

export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px",
  ultrawide: "1536px",
};

// ============================================================================
// MEDIA QUERIES (helper function)
// ============================================================================

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
  ultrawide: `@media (min-width: ${breakpoints.ultrawide})`,

  // Touch devices
  touch: `@media (hover: none) and (pointer: coarse)`,
  
  // Reduced motion (accessibility)
  reducedMotion: `@media (prefers-reduced-motion: reduce)`,
};

// ============================================================================
// SEMANTIC TOKENS (Commonly used combinations)
// ============================================================================

export const semantic = {
  // Button styles
  button: {
    primary: {
      background: colors.primary.main,
      color: colors.neutral[0],
      hover: colors.primary.dark,
      active: colors.primary.darker,
    },
    secondary: {
      background: colors.neutral[100],
      color: colors.neutral[900],
      hover: colors.neutral[200],
      active: colors.neutral[300],
    },
  },

  // Card styles
  card: {
    background: colors.neutral[0],
    border: colors.neutral[200],
    shadow: shadows.sm,
  },

  // Input styles
  input: {
    background: colors.neutral[0],
    border: colors.neutral[300],
    placeholder: colors.neutral[400],
    focus: colors.primary.main,
  },

  // Divider
  divider: colors.neutral[200],

  // Text colors
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[600],
    tertiary: colors.neutral[500],
    disabled: colors.neutral[400],
  },

  // Background colors
  background: {
    primary: colors.neutral[0],
    secondary: colors.neutral[50],
    tertiary: colors.neutral[100],
  },
};

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  media,
  semantic,
  zIndex,
};
