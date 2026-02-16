import { useState } from "react";
import { Input, Button } from "@fluentui/react-components";
import { Search24Filled, Dismiss24Filled } from "@fluentui/react-icons";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { searchProducts, resetFilters } from "../features/products/productsSlice";

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: center;

  @media (max-width: 640px) {
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  position: relative;

  @media (max-width: 640px) {
    min-width: 100%;
    flex-basis: 100%;
  }
`;

const SearchInput = styled(Input)`
  width: 100%;
  
  input {
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 14px;
    transition: all 0.2s ease;

    &:focus {
      border-color: #0078d4;
      box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.1);
    }

    &::placeholder {
      color: #999;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 640px) {
    width: 100%;
    flex-basis: 100%;

    button {
      flex: 1;
    }
  }
`;

const SearchButton = styled(Button)`
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;

  @media (max-width: 640px) {
    min-width: 100%;
  }
`;

const ClearButton = styled(Button)`
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;

  @media (max-width: 640px) {
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
