import { Link, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import styled from "styled-components";
import { Badge, Button } from "@fluentui/react-components";
import { ShoppingBag24Filled, Home24Filled, Person24Filled } from "@fluentui/react-icons";
import { useAppSelector } from "../app/hooks";
import { useStrings } from "../utils/strings";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";
import { SearchBar } from "./SearchBar";

export const FilterContext = React.createContext<{toggleFilters: () => void} | null>(null);
export const useFilterToggle = () => useContext(FilterContext);

const Wrapper = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  padding: ${spacing[3]} ${spacing[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing[4]};
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid ${colors.neutral[200]};
  box-shadow: ${shadows.sm};
  flex-wrap: nowrap;

  ${media.tablet} {
    padding: ${spacing[2]} ${spacing[4]};
    gap: ${spacing[3]};
    flex-wrap: wrap;
  }

  ${media.mobile} {
    padding: ${spacing[2]} ${spacing[3]};
    gap: ${spacing[2]};
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
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

const CenterSection = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  align-items: center;
  min-width: 0;

  ${media.tablet} {
    max-width: 100%;
    flex-basis: 100%;
    margin-top: ${spacing[2]};
    order: 3;
  }

  ${media.mobile} {
    max-width: 100%;
    width: 100%;
    flex-basis: 100%;
    margin-top: ${spacing[2]};
    order: 3;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  flex-shrink: 0;

  ${media.mobile} {
    gap: ${spacing[1]};
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-weight: ${typography.fontWeight.extrabold};
  font-size: ${typography.fontSize.xl};
  color: ${colors.neutral[900]};
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  transition: all ${transitions.fast};
  white-space: nowrap;

  &:hover {
    transform: scale(1.05);
    color: ${colors.primary.main};
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
`;

const IconButton = styled.button`
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

  &:hover {
    background: ${colors.neutral[100]};
    color: ${colors.primary.main};
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

const NavLink = styled(Button)<{ isActive?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.neutral[700]};
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
    background: ${colors.neutral[100]};
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
  background: ${colors.primary.main};
  color: ${colors.neutral[0]};
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
  height: 24px;
  background: ${colors.neutral[300]};
  margin: 0 ${spacing[1]};

  ${media.mobile} {
    display: none;
  }
`;

const AuthButton = styled(Button)`
  font-weight: ${typography.fontWeight.semibold};
  transition: all ${transitions.fast};
  background: ${colors.primary.main};
  color: ${colors.neutral[0]};
  border: none;
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  font-size: ${typography.fontSize.sm};

  &:hover {
    background: ${colors.primary.dark};
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
  const cartCount = useAppSelector(state => 
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const filterToggle = useFilterToggle();

  const isHome = location.pathname === "/";

  return (
    <Wrapper>
      <LeftSection>
        <FilterToggleButton 
          onClick={() => filterToggle?.toggleFilters()}
          title="Toggle filters"
        >
          ☰
        </FilterToggleButton>
        <Logo to="/">
          🛍 Store
        </Logo>
      </LeftSection>

      <CenterSection>
        <SearchBar />
      </CenterSection>

      <RightSection>
        <NavSection>
          <Link to="/wishlist" style={{ textDecoration: "none" }}>
            <IconBadgeWrapper>
              <IconButton title="Wishlist">
                ❤️
              </IconButton>
              {wishlistItems.length > 0 && <BadgeCount>{wishlistItems.length}</BadgeCount>}
            </IconBadgeWrapper>
          </Link>
          
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <IconBadgeWrapper>
              <IconButton title="Cart">
                <ShoppingBag24Filled />
              </IconButton>
              {cartCount > 0 && <BadgeCount>{cartCount}</BadgeCount>}
            </IconBadgeWrapper>
          </Link>

          <Divider />

          {authUser ? (
            <Link to="/account" style={{ textDecoration: "none" }}>
              <IconButton title="Account">
                <Person24Filled />
              </IconButton>
            </Link>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <AuthButton appearance="primary">
                Login
              </AuthButton>
            </Link>
          )}
        </NavSection>
      </RightSection>
    </Wrapper>
  );
};