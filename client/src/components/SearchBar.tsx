import { useState } from "react";
import { Input, Button } from "@fluentui/react-components";
import { Search24Filled, Dismiss24Filled } from "@fluentui/react-icons";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { searchProducts, resetFilters } from "../features/products/productsSlice";
import { colors, spacing, typography, borderRadius, transitions, media } from "../styles/designTokens";

const SearchContainer = styled.div`
  display: flex;
  gap: ${spacing[2]};
  width: 100%;
  align-items: center;

  ${media.mobile} {
    gap: ${spacing[2]};
    flex-wrap: wrap;
  }
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  position: relative;
  display: flex;
  align-items: center;

  ${media.mobile} {
    min-width: 100%;
    flex-basis: 100%;
  }
`;

const SearchIconLeft = styled.div`
  position: absolute;
  left: ${spacing[3]};
  display: flex;
  align-items: center;
  color: ${colors.neutral[600]};
  pointer-events: none;
  font-size: ${typography.fontSize.lg};
`;

const SearchInput = styled(Input)`
  width: 100%;
  
  input {
    background: ${colors.neutral[50]};
    border: 2px solid ${colors.neutral[200]};
    border-radius: ${borderRadius.lg};
    padding: ${spacing[3]} ${spacing[4]} ${spacing[3]} ${spacing[12]};
    font-size: ${typography.fontSize.base};
    min-height: 48px;
    transition: all ${transitions.fast};

    &:hover {
      border-color: ${colors.neutral[300]};
      background: ${colors.neutral[100]};
    }

    &:focus {
      outline: none;
      border-color: ${colors.primary.main};
      background: ${colors.neutral[0]};
      box-shadow: 0 0 0 3px ${colors.primary.lighter};
    }

    &::placeholder {
      color: ${colors.neutral[600]};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing[1]};
  align-items: center;

  ${media.mobile} {
    width: 100%;
    flex-basis: 100%;
    gap: ${spacing[2]};

    button {
      flex: 1;
      min-height: 44px;
    }
  }
`;

const SearchButton = styled(Button)`
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.md};
  transition: all ${transitions.fast};
  min-height: 48px;
  background: ${colors.primary.main} !important;
  color: ${colors.neutral[0]} !important;
  border: none !important;

  &:hover {
    background: ${colors.primary.dark} !important;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.tablet} {
    padding: 0 ${spacing[2]} !important;
    width: auto;
  }

  ${media.mobile} {
    min-width: 100%;
    width: 100%;
  }
`;

const ClearButton = styled(Button)`
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.md};
  transition: all ${transitions.fast};
  min-height: 48px;
  background: ${colors.neutral[200]} !important;
  color: ${colors.neutral[700]} !important;
  border: none !important;

  &:hover {
    background: ${colors.neutral[300]} !important;
  }

  ${media.tablet} {
    padding: 0 ${spacing[2]} !important;
    width: auto;
  }

  ${media.mobile} {
    min-width: 100%;
    width: 100%;
  }
`;

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(searchProducts(query));
    } else {
      dispatch(resetFilters());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    dispatch(resetFilters());
  };

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchIconLeft>
          <Search24Filled />
        </SearchIconLeft>
        <SearchInput
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </SearchInputWrapper>
      <ButtonGroup>
        <SearchButton
          appearance="primary"
          onClick={handleSearch}
          title="Search products"
        >
          <Search24Filled style={{ marginRight: 0 }} />
        </SearchButton>
        {query && (
          <ClearButton 
            appearance="secondary" 
            onClick={handleClear}
            title="Clear search"
          >
            <Dismiss24Filled style={{ marginRight: 0 }} />
          </ClearButton>
        )}
      </ButtonGroup>
    </SearchContainer>
  );
};
