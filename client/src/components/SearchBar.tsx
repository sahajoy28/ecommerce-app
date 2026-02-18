import { useState } from "react";
import { Input, Button } from "@fluentui/react-components";
import { Search24Filled, Dismiss24Filled } from "@fluentui/react-icons";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { searchProducts, resetFilters } from "../features/products/productsSlice";
import { colors, spacing, typography, borderRadius, transitions, media } from "../styles/designTokens";

const SearchContainer = styled.div`
  display: flex;
  gap: ${spacing[3]};
  width: 100%;
  align-items: center;

  ${media.mobile} {
    gap: ${spacing[2]};
    flex-wrap: wrap;
  }
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  position: relative;

  ${media.mobile} {
    min-width: 100%;
    flex-basis: 100%;
  }
`;

const SearchInput = styled(Input)`
  width: 100%;
  
  input {
    border: 2px solid ${colors.neutral[200]};
    border-radius: ${borderRadius.md};
    padding: ${spacing[3]} ${spacing[4]};
    font-size: ${typography.fontSize.base};
    min-height: 44px;
    transition: all ${transitions.fast};

    &:focus {
      border-color: ${colors.primary.main};
      box-shadow: 0 0 0 3px ${colors.primary.lighter};
    }

    &::placeholder {
      color: ${colors.neutral[500]};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing[2]};

  ${media.mobile} {
    width: 100%;
    flex-basis: 100%;

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
  min-height: 44px;

  ${media.mobile} {
    min-width: 100%;
  }
`;

const ClearButton = styled(Button)`
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.md};
  transition: all ${transitions.fast};
  min-height: 44px;

  ${media.mobile} {
    min-width: 100%;
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
        <SearchInput
          placeholder="Search products by name, category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </SearchInputWrapper>
      <ButtonGroup>
        <SearchButton
          appearance="primary"
          icon={<Search24Filled />}
          onClick={handleSearch}
          title="Search products"
        >
          Search
        </SearchButton>
        {query && (
          <ClearButton 
            appearance="secondary" 
            onClick={handleClear}
            icon={<Dismiss24Filled />}
            title="Clear search"
          >
            Clear
          </ClearButton>
        )}
      </ButtonGroup>
    </SearchContainer>
  );
};
