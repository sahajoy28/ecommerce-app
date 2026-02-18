import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Person24Filled } from '@fluentui/react-icons';
import { useTheme } from '../app/themeContext';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import { colors, spacing, typography, borderRadius, transitions, media, shadows } from '../styles/designTokens';

const UserMenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${typography.fontSize.xl};
  color: ${colors.neutral[700]};
  padding: ${spacing[2]};
  transition: all ${transitions.fast};
  border-radius: ${borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    background: ${colors.neutral[100]};
    color: ${colors.primary.main};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  ${media.mobile} {
    font-size: ${typography.fontSize.lg};
    min-width: 40px;
    min-height: 40px;
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + ${spacing[2]});
  right: 0;
  background: ${colors.neutral[0]};
  border: 1px solid ${colors.neutral[200]};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.lg};
  min-width: 240px;
  z-index: 1000;
  animation: slideDown ${transitions.base};
  display: ${props => props.isOpen ? 'block' : 'none'};

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${media.mobile} {
    right: -${spacing[3]};
    min-width: 200px;
  }
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[4]};
  color: ${colors.neutral[700]};
  text-decoration: none;
  border-bottom: 1px solid ${colors.neutral[100]};
  transition: all ${transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${colors.neutral[50]};
    color: ${colors.primary.main};
  }

  ${media.mobile} {
    padding: ${spacing[2]} ${spacing[3]};
    font-size: ${typography.fontSize.sm};
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  background: none;
  border: none;
  color: ${colors.neutral[700]};
  font-family: ${typography.fontFamily.base};
  font-size: ${typography.fontSize.base};
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid ${colors.neutral[100]};
  transition: all ${transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${colors.neutral[50]};
    color: ${colors.primary.main};
  }

  ${media.mobile} {
    padding: ${spacing[2]} ${spacing[3]};
    font-size: ${typography.fontSize.sm};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${colors.neutral[100]};
  margin: ${spacing[2]} 0;
`;

const UserName = styled.div`
  padding: ${spacing[3]} ${spacing[4]};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[900]};
  border-bottom: 1px solid ${colors.neutral[100]};
  font-size: ${typography.fontSize.sm};

  ${media.mobile} {
    padding: ${spacing[2]} ${spacing[3]};
  }
`;

interface UserMenuProps {
  userName?: string;
  onSettingsClick: () => void;
}

export const UserMenu = ({ userName, onSettingsClick }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSettingsClick = () => {
    onSettingsClick();
    setIsOpen(false);
  };

  return (
    <UserMenuWrapper ref={menuRef}>
      <UserButton 
        onClick={() => setIsOpen(!isOpen)}
        title="Account menu"
      >
        <Person24Filled />
      </UserButton>

      <Dropdown isOpen={isOpen}>
        {userName && (
          <>
            <UserName>Hi, {userName}</UserName>
            <Divider />
          </>
        )}
        
        <DropdownItem as={Link} to="/account">
          👤 Account
        </DropdownItem>
        
        <DropdownButton onClick={handleSettingsClick}>
          ⚙️ Settings
        </DropdownButton>
        
        <DropdownButton onClick={() => {
          dispatch(logout());
          setIsOpen(false);
          navigate('/');
        }}>
          🚪 Logout
        </DropdownButton>
      </Dropdown>
    </UserMenuWrapper>
  );
};

interface GuestMenuProps {
  onSettingsClick: () => void;
}

export const GuestMenu = ({ onSettingsClick }: GuestMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <UserMenuWrapper ref={menuRef}>
      <UserButton 
        onClick={() => setIsOpen(!isOpen)}
        title="Menu"
      >
        <Person24Filled />
      </UserButton>

      <Dropdown isOpen={isOpen}>
        <DropdownButton onClick={onSettingsClick}>
          ⚙️ Settings
        </DropdownButton>
        
        <DropdownItem as={Link} to="/login">
          🔐 Login
        </DropdownItem>
      </Dropdown>
    </UserMenuWrapper>
  );
};
