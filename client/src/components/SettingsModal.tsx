import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useTheme, ThemeMode, AccentColor } from '../app/themeContext';
import { useAppSelector } from '../app/hooks';
import { colors, spacing, typography, borderRadius, transitions, media, shadows } from '../styles/designTokens';

const Backdrop = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'fixed' : 'none'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  animation: fadeIn ${transitions.base};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${props => props.isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)'};
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.xl};
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 2001;
  animation: slideUp ${transitions.base};
  display: ${props => props.isOpen ? 'block' : 'none'};
  color: var(--color-text-primary, ${colors.neutral[900]});
  transition: background-color 0.3s ease, color 0.3s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  ${media.mobile} {
    width: 95%;
    max-height: 95vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[6]};
  border-bottom: 1px solid ${colors.neutral[200]};

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const ModalTitle = styled.h2`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  margin: 0;
  color: var(--color-text-primary, ${colors.neutral[900]});

  ${media.mobile} {
    font-size: ${typography.fontSize.lg};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${typography.fontSize['2xl']};
  cursor: pointer;
  color: var(--color-text-secondary, ${colors.neutral[600]});
  transition: all ${transitions.fast};
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--color-text-primary, ${colors.neutral[900]});
  }
`;

const ModalBody = styled.div`
  padding: ${spacing[6]};

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const SettingSection = styled.div`
  margin-bottom: ${spacing[8]};

  &:last-child {
    margin-bottom: 0;
  }

  ${media.mobile} {
    margin-bottom: ${spacing[6]};
  }
`;

const SectionTitle = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing[4]};
  color: ${colors.neutral[900]};

  ${media.mobile} {
    font-size: ${typography.fontSize.base};
  }
`;

const SectionDescription = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral[600]};
  margin-bottom: ${spacing[3]};
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
  border: 2px solid ${props => props.isActive ? 'var(--color-primary, #0066ff)' : 'var(--color-neutral-300, #d1d5db)'};
  background: ${props => props.isActive ? 'var(--color-primary-lighter, #e6f0ff)' : 'var(--color-neutral-0, #ffffff)'};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: all ${transitions.fast};
  font-weight: ${typography.fontWeight.semibold};
  color: ${props => props.isActive ? 'var(--color-primary-dark, #0052cc)' : 'var(--color-text-secondary, #374151)'};
  font-size: ${typography.fontSize.sm};

  &:hover {
    border-color: var(--color-primary, #0066ff);
    background: var(--color-primary-lighter, #e6f0ff);
  }

  &:active {
    transform: scale(0.95);
  }

  ${media.mobile} {
    padding: ${spacing[3]};
    font-size: ${typography.fontSize.xs};
  }
`;

const ColorOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ColorPreview = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: ${borderRadius.full};
  background: ${props => props.color};
  margin-bottom: ${spacing[2]};
  display: inline-block;
  border: 2px solid ${colors.neutral[300]};
`;

const SaveMessage = styled.div<{ show: boolean }>`
  padding: ${spacing[3]} ${spacing[4]};
  background: #ecfdf5;
  border: 1px solid #d1fae5;
  border-radius: ${borderRadius.md};
  color: #065f46;
  text-align: center;
  font-weight: ${typography.fontWeight.medium};
  animation: ${props => props.show ? 'slideIn' : 'slideOut'} ${transitions.base};
  display: ${props => props.show ? 'block' : 'none'};

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

const accentColorMap: Record<AccentColor, string> = {
  blue: '#0066ff',
  orange: '#ff6b35',
  purple: '#8b5cf6',
  green: '#10b981',
  red: '#ef4444',
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { mode, accentColor, setMode, setAccentColor } = useTheme();
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const { user } = useAppSelector(state => state.auth);

  const handleThemeChange = (newMode: ThemeMode) => {
    setMode(newMode);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  const handleAccentChange = (newAccent: AccentColor) => {
    setAccentColor(newAccent);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />
      <ModalContent isOpen={isOpen}>
        <ModalHeader>
          <ModalTitle>⚙️ Settings</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ModalBody>
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
                    <span style={{ textTransform: 'capitalize', fontSize: typography.fontSize.xs }}>
                      {color}
                    </span>
                  </ColorOption>
                </OptionButton>
              ))}
            </OptionGrid>
          </SettingSection>

          <SettingSection>
            <SectionTitle>Storage</SectionTitle>
            <SectionDescription>
              {user 
                ? '✅ Your preferences are saved to your account.' 
                : '💾 Your preferences are saved locally on this device.'}
            </SectionDescription>
          </SettingSection>

          <SaveMessage show={showSaveMessage}>
            ✅ Settings saved {user ? 'to your account' : 'locally'}
          </SaveMessage>
        </ModalBody>
      </ModalContent>
    </>
  );
};
