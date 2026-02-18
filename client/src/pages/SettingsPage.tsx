import styled from 'styled-components';
import { useTheme, ThemeMode, AccentColor } from '../app/themeContext';
import { colors, spacing, typography, borderRadius, transitions, media } from '../styles/designTokens';

const SettingsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${spacing[6]};
  background: var(--color-neutral-0, ${colors.neutral[0]});
  min-height: 100vh;

  ${media.tablet} {
    padding: ${spacing[4]};
  }

  ${media.mobile} {
    padding: ${spacing[3]};
  }
`;

const PageTitle = styled.h1`
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.extrabold};
  margin-bottom: ${spacing[6]};
  color: var(--color-text-primary, ${colors.neutral[900]});

  ${media.mobile} {
    font-size: ${typography.fontSize['2xl']};
    margin-bottom: ${spacing[4]};
  }
`;

const SettingSection = styled.div`
  margin-bottom: ${spacing[8]};
  padding: ${spacing[6]};
  background: var(--color-neutral-50, ${colors.neutral[50]});
  border-radius: ${borderRadius.lg};
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});

  ${media.mobile} {
    padding: ${spacing[4]};
    margin-bottom: ${spacing[4]};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing[4]};
  color: var(--color-text-primary, ${colors.neutral[800]});

  ${media.mobile} {
    font-size: ${typography.fontSize.lg};
  }
`;

const SectionDescription = styled.p`
  font-size: ${typography.fontSize.base};
  color: var(--color-text-secondary, ${colors.neutral[600]});
  margin-bottom: ${spacing[4]};
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${spacing[3]};

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[2]};
  }
`;

interface OptionButtonProps {
  isActive: boolean;
}

const OptionButton = styled.button<OptionButtonProps>`
  padding: ${spacing[4]};
  border: 2px solid ${props => props.isActive ? 'var(--color-primary, ' + colors.primary.main + ')' : 'var(--color-neutral-300, ' + colors.neutral[300] + ')'};
  background: ${props => props.isActive ? 'var(--color-primary-lighter, ' + colors.primary.lighter + ')' : 'var(--color-neutral-0, ' + colors.neutral[0] + ')'};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: all ${transitions.fast};
  font-weight: ${typography.fontWeight.semibold};
  color: ${props => props.isActive ? 'var(--color-primary-dark, ' + colors.primary.dark + ')' : 'var(--color-text-primary, ' + colors.neutral[700] + ')'};
  font-size: ${typography.fontSize.sm};

  &:hover {
    border-color: var(--color-primary, ${colors.primary.main});
    background: var(--color-primary-lighter, ${colors.primary.lighter});
  }

  &:active {
    transform: scale(0.95);
  }

  ${media.mobile} {
    padding: ${spacing[3]};
    font-size: ${typography.fontSize.xs};
  }
`;

const ColorPreview = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: ${borderRadius.full};
  background: ${props => props.color};
  margin-right: ${spacing[2]};
  display: inline-block;
  border: 2px solid var(--color-neutral-300, ${colors.neutral[300]});
`;

const ColorOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SaveMessage = styled.div`
  padding: ${spacing[3]} ${spacing[4]};
  background: var(--color-primary-lighter, #ecfdf5);
  border: 1px solid #d1fae5;
  border-radius: ${borderRadius.md};
  color: var(--color-primary-dark, #065f46);
  text-align: center;
  margin-top: ${spacing[4]};
  font-weight: ${typography.fontWeight.medium};
`;

const accentColorMap: Record<AccentColor, string> = {
  blue: '#0066ff',
  orange: '#ff6b35',
  purple: '#8b5cf6',
  green: '#10b981',
  red: '#ef4444',
};

export const SettingsPage = () => {
  const { mode, accentColor, setMode, setAccentColor } = useTheme();

  const handleThemeChange = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const handleAccentChange = (newAccent: AccentColor) => {
    setAccentColor(newAccent);
  };

  return (
    <SettingsContainer>
      <PageTitle>⚙️ Settings</PageTitle>

      <SettingSection>
        <SectionTitle>Theme</SectionTitle>
        <SectionDescription>Choose your preferred theme</SectionDescription>
        <OptionGrid>
          <OptionButton
            isActive={mode === 'light'}
            onClick={() => handleThemeChange('light')}
          >
            ☀️ Light
          </OptionButton>
          <OptionButton
            isActive={mode === 'dark'}
            onClick={() => handleThemeChange('dark')}
          >
            🌙 Dark
          </OptionButton>
        </OptionGrid>
        <SaveMessage>✅ Theme saved automatically</SaveMessage>
      </SettingSection>

      <SettingSection>
        <SectionTitle>Accent Color</SectionTitle>
        <SectionDescription>Customize the primary accent color</SectionDescription>
        <OptionGrid>
          {(Object.keys(accentColorMap) as AccentColor[]).map((color) => (
            <OptionButton
              key={color}
              isActive={accentColor === color}
              onClick={() => handleAccentChange(color)}
            >
              <ColorOption>
                <ColorPreview color={accentColorMap[color]} />
                <span style={{ textTransform: 'capitalize', marginTop: spacing[2] }}>
                  {color}
                </span>
              </ColorOption>
            </OptionButton>
          ))}
        </OptionGrid>
        <SaveMessage>✅ Color saved automatically</SaveMessage>
      </SettingSection>

      <SettingSection>
        <SectionTitle>About</SectionTitle>
        <SectionDescription>
          Your preferences are saved automatically to your browser's local storage. 
          Settings will persist across sessions.
        </SectionDescription>
      </SettingSection>
    </SettingsContainer>
  );
};
