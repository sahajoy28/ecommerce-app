import { Link, useLocation } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@fluentui/react-components";
import { useAppSelector } from "../app/hooks";
import { useStrings } from "../utils/strings";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";
import { SearchBar } from "./SearchBar";
import { UserMenu, GuestMenu } from "./UserMenu";
import { SettingsModal } from "./SettingsModal";
import { userAPI } from "../services/userAPI";

export const FilterContext = React.createContext<{toggleFilters: () => void} | null>(null);
export const useFilterToggle = () => useContext(FilterContext);

const Wrapper = styled.header`
  background: var(--color-bg-primary, ${colors.neutral[0]});
  backdrop-filter: blur(12px);
  padding: ${spacing[3]} ${spacing[6]};
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  box-shadow: ${shadows.sm};
  flex-wrap: nowrap;
  color: var(--color-text-primary, ${colors.neutral[900]});
  transition: all 0.3s ease;

  ${media.tablet} {
    padding: ${spacing[2]} ${spacing[4]};
    gap: ${spacing[3]};
  }

  ${media.mobile} {
    padding: ${spacing[2]} ${spacing[3]};
    gap: ${spacing[2]};
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  flex-shrink: 0;

  ${media.mobile} {
    gap: ${spacing[1]};
  }
`;

const SearchSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;

  ${media.mobile} {
    order: 10;
    flex-basis: 100%;
  }
`;

const NavLinksSection = styled.nav`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  flex-shrink: 0;

  ${media.tablet} {
    gap: ${spacing[2]};
  }

  ${media.mobile} {
    gap: ${spacing[1]};
  }
`;



const NavMenuItem = styled(Link)<{ $isActive?: boolean }>`
  text-decoration: none;
  color: ${props => props.$isActive ? colors.primary.main : colors.neutral[700]};
  font-weight: ${props => props.$isActive ? '600' : '500'};
  font-size: ${typography.fontSize.sm};
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${borderRadius.md};
  transition: all ${transitions.fast};
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  height: 36px;

  &:hover {
    background: var(--color-neutral-100, ${colors.neutral[100]});
    color: var(--color-primary, ${colors.primary.main});
  }

  ${media.tablet} {
    padding: ${spacing[1]} ${spacing[2]};
    font-size: ${typography.fontSize.xs};
    height: 32px;
  }

  ${media.mobile} {
    padding: ${spacing[1]};
    font-size: 0.75rem;
    height: 28px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  flex-shrink: 0;

  ${media.mobile} {
    gap: ${spacing[2]};
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-weight: ${typography.fontWeight.extrabold};
  font-size: ${typography.fontSize.xl};
  color: var(--color-text-primary, ${colors.neutral[900]});
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  transition: all ${transitions.fast};
  white-space: nowrap;

  &:hover {
    transform: scale(1.05);
    color: var(--color-primary, ${colors.primary.main});
  }

  ${media.mobile} {
    font-size: ${typography.fontSize.lg};
  }
`;

const FilterToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${typography.fontSize["2xl"]};
  color: var(--color-text-primary, ${colors.neutral[700]});
  padding: ${spacing[2]};
  transition: all ${transitions.fast};
  border-radius: ${borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    background: var(--color-neutral-100, ${colors.neutral[100]});
    color: var(--color-primary, ${colors.primary.main});
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${typography.fontSize.xl};
  color: var(--color-text-primary, ${colors.neutral[700]});
  padding: ${spacing[2]};
  transition: all ${transitions.fast};
  border-radius: ${borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--color-neutral-100, ${colors.neutral[100]});
    color: var(--color-primary, ${colors.primary.main});
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NavSection = styled.div`
  display: flex;
  gap: ${spacing[2]};
  align-items: center;
  flex-wrap: nowrap;

  ${media.mobile} {
    gap: ${spacing[1]};
  }
`;

const NavLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  position: relative;
`;

const NavLink = styled(Button)<{ $isActive?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-primary, ${colors.neutral[700]});
  font-weight: ${typography.fontWeight.medium};
  padding: ${spacing[2]} ${spacing[2]};
  transition: all ${transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[1]};
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.sm};

  &:hover {
    background: var(--color-neutral-100, ${colors.neutral[100]});
  }

  ${media.mobile} {
    padding: ${spacing[1]} ${spacing[1]};
    font-size: ${typography.fontSize.xs};
  }
`;

const IconBadgeWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
`;

const BadgeCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  background: var(--color-primary, ${colors.primary.main});
  color: var(--color-neutral-0, ${colors.neutral[0]});
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.bold};
  position: absolute;
  top: -8px;
  right: -8px;
  box-shadow: ${shadows.md};

  ${media.mobile} {
    min-width: 16px;
    height: 16px;
    font-size: 9px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: var(--color-neutral-300, ${colors.neutral[300]});
  margin: 0 ${spacing[1]};
  align-self: center;

  ${media.mobile} {
    display: none;
  }
`;

const AuthButton = styled(Button)`
  font-weight: ${typography.fontWeight.semibold};
  transition: all ${transitions.fast};
  background: var(--color-primary, ${colors.primary.main});
  color: var(--color-neutral-0, ${colors.neutral[0]});
  border: none;
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  font-size: ${typography.fontSize.sm};

  &:hover {
    background: var(--color-primary-dark, ${colors.primary.dark});
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.mobile} {
    padding: ${spacing[1]} ${spacing[2]};
    font-size: ${typography.fontSize.xs};
  }
`;

export const Header = () => {
  const location = useLocation();
  const authUser = useAppSelector(state => state.auth.user);
  const filterToggle = useFilterToggle();
  const [showSettings, setShowSettings] = useState(false);
  const [storeName, setStoreName] = useState('Store');

  useEffect(() => {
    userAPI.getSiteSettings().then((data: any) => {
      if (data?.businessName) {
        setStoreName(data.businessName);
      }
    }).catch(() => {});
  }, []);

  const isHome = location.pathname === "/";

  return (
    <>
      <Wrapper>
        <LeftSection>
          <FilterToggleButton 
            onClick={() => filterToggle?.toggleFilters()}
            title="Toggle filters"
          >
            ☰
          </FilterToggleButton>
          <Logo to="/">
            🛍 {storeName}
          </Logo>
        </LeftSection>

        <SearchSection>
          <SearchBar />
        </SearchSection>

        <RightSection>
          <NavLinksSection>
            <NavMenuItem to="/about" $isActive={location.pathname === "/about"}>
              About
            </NavMenuItem>
            <NavMenuItem to="/contact" $isActive={location.pathname === "/contact"}>
              Contact
            </NavMenuItem>
          </NavLinksSection>

          <Divider />

          <NavSection>
            {authUser ? (
              <UserMenu 
                userName={authUser.name || authUser.email?.split('@')[0]}
                onSettingsClick={() => setShowSettings(true)}
              />
            ) : (
              <GuestMenu onSettingsClick={() => setShowSettings(true)} />
            )}
          </NavSection>
        </RightSection>
      </Wrapper>
      
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
};