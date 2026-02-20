import { useState, useEffect, useRef, useCallback } from "react";
import { Search20Regular, Dismiss16Regular } from "@fluentui/react-icons";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { searchProducts, resetFilters } from "../features/products/productsSlice";
import { colors, spacing, typography, borderRadius, transitions, media } from "../styles/designTokens";

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;

  ${media.mobile} {
    max-width: 100%;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: ${spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${colors.neutral[400]};
  pointer-events: none;
  transition: color ${transitions.fast};
`;

const ClearBtn = styled.button`
  position: absolute;
  right: ${spacing[2]};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: ${colors.neutral[200]};
  color: ${colors.neutral[500]};
  cursor: pointer;
  padding: 0;
  transition: all ${transitions.fast};

  &:hover {
    background: ${colors.neutral[300]};
    color: ${colors.neutral[700]};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  background: ${colors.neutral[100]};
  border: 1px solid transparent;
  border-radius: ${borderRadius.full || '9999px'};
  padding: ${spacing[2]} ${spacing[8]} ${spacing[2]} ${spacing[9]};
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral[800]};
  height: 36px;
  transition: all ${transitions.fast};
  outline: none;
  font-family: inherit;

  &::placeholder {
    color: ${colors.neutral[400]};
  }

  &:hover {
    background: ${colors.neutral[200]};
    border-color: ${colors.neutral[200]};
  }

  &:focus {
    background: white;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px ${colors.primary.lighter};
  }

  &:focus ~ ${IconWrapper}, &:focus + ${IconWrapper} {
    color: ${colors.primary.main};
  }
`;

const DEBOUNCE_DELAY = 350;

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);

  const performSearch = useCallback((value: string) => {
    if (value.trim()) {
      dispatch(searchProducts(value.trim()));
    } else {
      dispatch(resetFilters());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!mountedRef.current) {
      // skip the initial effect run to avoid unintentionally clearing URL-driven filters
      mountedRef.current = true;
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      performSearch(query);
    }, DEBOUNCE_DELAY);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, performSearch]);

  const handleClear = () => {
    setQuery("");
    dispatch(resetFilters());
  };

  return (
    <SearchWrapper>
      <IconWrapper>
        <Search20Regular />
      </IconWrapper>
      <StyledInput
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ClearBtn onClick={handleClear} title="Clear search">
          <Dismiss16Regular />
        </ClearBtn>
      )}
    </SearchWrapper>
  );
};
