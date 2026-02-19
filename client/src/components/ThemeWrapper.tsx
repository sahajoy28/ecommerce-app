import styled from 'styled-components';
import { useTheme } from '../app/themeContext';
import { getThemeColors } from '../styles/themeUtils';

const ThemeWrapper = styled.div<{ $mode: string; $accentColor: string }>`
  /* CSS Variables for Theme */
  --color-primary: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.primary.main;
  }};
  --color-primary-light: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.primary.light;
  }};
  --color-primary-lighter: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.primary.lighter;
  }};
  --color-primary-dark: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.primary.dark;
  }};

  --color-bg-primary: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.background.primary;
  }};
  --color-bg-secondary: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.background.secondary;
  }};
  --color-bg-tertiary: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.background.tertiary;
  }};

  --color-text-primary: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.text.primary;
  }};
  --color-text-secondary: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.text.secondary;
  }};
  --color-text-tertiary: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.text.tertiary;
  }};

  --color-neutral-0: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.neutral[0];
  }};
  --color-neutral-50: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.neutral[50];
  }};
  --color-neutral-100: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.neutral[100];
  }};
  --color-neutral-200: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.neutral[200];
  }};
  --color-neutral-300: ${props => {
    const colors = getThemeColors(props.$mode as any, props.$accentColor as any);
    return colors.neutral[300];
  }};

  transition: background-color 0.3s ease, color 0.3s ease;
`;

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

export const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const { mode, accentColor } = useTheme();

  return (
    <ThemeWrapper $mode={mode} $accentColor={accentColor}>
      {children}
    </ThemeWrapper>
  );
};
