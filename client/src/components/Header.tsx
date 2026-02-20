import { Link, useLocation } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";
import { SearchBar } from "./SearchBar";
import { UserMenu, GuestMenu } from "./UserMenu";

import { userAPI } from "../services/userAPI";

export const FilterContext = React.createContext<{showFilters: boolean; toggleFilters: () => void; closeFilters: () => void} | null>(null);
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

const AdminBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: var(--color-primary, ${colors.primary.main});
  color: white;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.bold};
  padding: 2px 8px;
  border-radius: ${borderRadius.full};
  margin-left: ${spacing[2]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  vertical-align: middle;
  line-height: 1.4;

  ${media.mobile} {
    font-size: 9px;
    padding: 1px 6px;
    margin-left: ${spacing[1]};
  }
`;

const FilterToggleButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? `var(--color-primary, ${colors.primary.main})` : 'none'};
  border: none;
  cursor: pointer;
  font-size: ${typography.fontSize["2xl"]};
  color: ${props => props.$active ? `var(--color-neutral-0, ${colors.neutral[0]})` : `var(--color-text-primary, ${colors.neutral[700]})`};
  padding: ${spacing[2]};
  transition: all ${transitions.fast};
  border-radius: ${borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    background: ${props => props.$active ? `var(--color-primary-dark, ${colors.primary.dark})` : `var(--color-neutral-100, ${colors.neutral[100]})`};
    color: ${props => props.$active ? `var(--color-neutral-0, ${colors.neutral[0]})` : `var(--color-primary, ${colors.primary.main})`};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
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

export const Header = () => {
  const location = useLocation();
  const authUser = useAppSelector(state => state.auth.user);
  const filterToggle = useFilterToggle();
  const [storeName, setStoreName] = useState('Store');

  useEffect(() => {
    userAPI.getSiteSettings().then((data: any) => {
      if (data?.businessName) {
        setStoreName(data.businessName);
      }
    }).catch(() => {});
  }, []);

  const isHome = location.pathname === "/";
  const isCatalog = location.pathname === "/catalog";
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <Wrapper>
        <LeftSection>
          {isCatalog && !isAdmin && (
            <FilterToggleButton 
              onClick={() => filterToggle?.toggleFilters()}
              title={filterToggle?.showFilters ? "Close filters" : "Open filters"}
              $active={filterToggle?.showFilters}
            >
              ☰
            </FilterToggleButton>
          )}
          <Logo to={"/"}>
            🛍 {storeName}{isAdmin ? <AdminBadge>ADMIN</AdminBadge> : ''}
          </Logo>
        </LeftSection>
        <div style={{ flex: 1 }} />
        <RightSection>
          {!isAdmin && (
            <>
              <NavLinksSection>
                <NavMenuItem to="/" $isActive={isHome}>
                  Home
                </NavMenuItem>
                <NavMenuItem to="/catalog" $isActive={isCatalog}>
                  Catalog
                </NavMenuItem>
                <NavMenuItem to="/about" $isActive={location.pathname === "/about"}>
                  About
                </NavMenuItem>
                <NavMenuItem to="/contact" $isActive={location.pathname === "/contact"}>
                  Contact
                </NavMenuItem>
              </NavLinksSection>
              <Divider />
            </>
          )}
          {authUser ? (
            <UserMenu 
              userName={authUser.name || authUser.email?.split('@')[0]}
            />
          ) : (
            <GuestMenu />
          )}
        </RightSection>
      </Wrapper>
    </>
  );
};