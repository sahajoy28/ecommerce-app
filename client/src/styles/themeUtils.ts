import { ThemeMode, AccentColor } from '../app/themeContext';

// Base color palettes for each accent
const accentPalettes = {
  blue: {
    main: '#0066ff',
    light: '#3385ff',
    lighter: '#e6f0ff',
    dark: '#0052cc',
    darker: '#003d99',
  },
  orange: {
    main: '#ff6b35',
    light: '#ff8c5f',
    lighter: '#fff4ee',
    dark: '#e65100',
    darker: '#b83d00',
  },
  purple: {
    main: '#8b5cf6',
    light: '#a78bfa',
    lighter: '#ede9fe',
    dark: '#7c3aed',
    darker: '#6d28d9',
  },
  green: {
    main: '#10b981',
    light: '#34d399',
    lighter: '#ecfdf5',
    dark: '#059669',
    darker: '#047857',
  },
  red: {
    main: '#ef4444',
    light: '#f87171',
    lighter: '#fee2e2',
    dark: '#dc2626',
    darker: '#b91c1c',
  },
};

const lightNeutral = {
  0: '#ffffff',
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
};

const darkNeutral = {
  0: '#0f0f0f',
  50: '#1a1a1a',
  100: '#262626',
  200: '#404040',
  300: '#525252',
  400: '#737373',
  500: '#a3a3a3',
  600: '#d4d4d8',
  700: '#e4e4e7',
  800: '#f4f4f5',
  900: '#fafafa',
};

export const getThemeColors = (theme: ThemeMode, accentColor: AccentColor) => {
  const accentPalette = accentPalettes[accentColor];
  const neutral = theme === 'light' ? lightNeutral : darkNeutral;
  const bgColor = theme === 'light' ? neutral[0] : neutral[0];
  const textColor = theme === 'light' ? neutral[900] : neutral[900];

  return {
    primary: accentPalette,
    secondary: {
      main: '#ff6b35',
      light: '#ff8c5f',
      lighter: theme === 'light' ? '#fff4ee' : '#3d2415',
      dark: '#e65100',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
    neutral,
    background: {
      primary: theme === 'light' ? neutral[0] : neutral[50],
      secondary: theme === 'light' ? neutral[50] : neutral[100],
      tertiary: theme === 'light' ? neutral[100] : neutral[200],
    },
    text: {
      primary: theme === 'light' ? neutral[900] : neutral[900],
      secondary: theme === 'light' ? neutral[700] : neutral[700],
      tertiary: theme === 'light' ? neutral[500] : neutral[400],
    },
  };
};
