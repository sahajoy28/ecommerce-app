import { useState, useEffect } from "react";
import styled from "styled-components";
import { Label, Checkbox, Slider, Button } from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { filterByCategory, filterByPrice, filterByRating, resetFilters } from "../features/products/productsSlice";
import { RatingInput } from "./RatingDisplay";
import { useStrings } from "../utils/strings";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const SidebarContainer = styled.div`
  width: 100%;
  padding: ${spacing[5]};
  background: ${colors.neutral[0]};
  border-right: 1px solid ${colors.neutral[200]};
  height: 100%;
  box-shadow: none;
  position: sticky;
  top: 0;
  transition: all ${transitions.base};
  overflow-y: auto;

  ${media.tablet} {
    width: 100%;
    position: static;
    top: auto;
    box-shadow: none;
    border-right: none;
    border-bottom: 1px solid ${colors.neutral[200]};
    padding: ${spacing[4]};
    background: ${colors.neutral[0]};
  }

  ${media.mobile} {
    padding: ${spacing[3]};
    border-radius: 0;
    border: none;
    background: ${colors.neutral[0]};
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[5]};
  padding-bottom: ${spacing[5]};
  border-bottom: 1px solid ${colors.neutral[200]};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral[900]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} 0;
  transition: all ${transitions.fast};
  cursor: pointer;

  input {
    cursor: pointer;
    accent-color: ${colors.secondary.main};
    width: 18px;
    height: 18px;
  }

  label {
    cursor: pointer;
    color: ${colors.neutral[700]};
    font-weight: ${typography.fontWeight.normal};
    font-size: ${typography.fontSize.sm};
    margin: 0;
    user-select: none;

    &:hover {
      color: ${colors.secondary.main};
    }
  }
`;

const PriceDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[2]} 0;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[900]};

  span {
    color: ${colors.secondary.main};
    font-weight: ${typography.fontWeight.bold};
    font-size: ${typography.fontSize.base};
  }
`;

const ResetButton = styled(Button)`
  width: 100%;
  font-weight: ${typography.fontWeight.semibold};
  padding: ${spacing[2]} ${spacing[3]} !important;
  background: ${colors.secondary.main} !important;
  color: ${colors.neutral[900]} !important;
  border: none !important;
  border-radius: ${borderRadius.md} !important;
  transition: all ${transitions.fast} !important;
  font-size: ${typography.fontSize.sm} !important;

  &:hover {
    background: #ff9500 !important;
    box-shadow: ${shadows.md} !important;
  }

  &:active {
    background: #e68900 !important;
    transform: scale(0.98);
  }
`;

const FilterCount = styled.span`
  background: ${colors.secondary.main};
  color: ${colors.neutral[0]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.bold};
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.full};
  margin-left: auto;
`;

export const FilterSidebar = () => {
  const dispatch = useAppDispatch();
  const { t } = useStrings();
  const products = useAppSelector(state => state.products.items);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(0);

  const categories = [...new Set(products.map(p => p.category))];
  const maxPrice = Math.max(...products.map(p => p.price), 1000);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategory(category);
      dispatch(filterByCategory(category));
    } else {
      setSelectedCategory(null);
      dispatch(resetFilters());
    }
  };

  const handlePriceChange = (_ev: any, data: any) => {
    const price = data?.value || priceRange;
    setPriceRange(price);
    dispatch(filterByPrice(price));
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
    dispatch(filterByRating(rating));
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setPriceRange(1000);
    setMinRating(0);
    dispatch(resetFilters());
  };

  const activeFilters = (selectedCategory ? 1 : 0) + (minRating > 0 ? 1 : 0) + (priceRange < maxPrice ? 1 : 0);

  return (
    <SidebarContainer>
      <FilterSection>
        <SectionTitle>
          {t("filters.categories")}
          {selectedCategory && <FilterCount>{categories.length}</FilterCount>}
        </SectionTitle>
        {categories.map(category => (
          <CategoryItem key={category}>
            <Checkbox
              checked={selectedCategory === category}
              onChange={(e, data) =>
                handleCategoryChange(category, data.checked as boolean)
              }
              label={category.charAt(0).toUpperCase() + category.slice(1)}
            />
          </CategoryItem>
        ))}
      </FilterSection>

      <FilterSection>
        <SectionTitle>
          {t("filters.minimumRating")}
          {minRating > 0 && <FilterCount>⭐{minRating.toFixed(1)}</FilterCount>}
        </SectionTitle>
        <RatingInput value={minRating} onChange={handleRatingChange} />
      </FilterSection>

      <FilterSection>
        <SectionTitle>
          {t("filters.priceRange")}
          {priceRange < maxPrice && <FilterCount>${priceRange.toFixed(0)}</FilterCount>}
        </SectionTitle>
        <PriceDisplay>
          <span>{t("filters.startPrice")}</span>
          <span>${priceRange.toFixed(0)}</span>
        </PriceDisplay>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          min={0}
          max={maxPrice}
          step={10}
        />
      </FilterSection>

      {activeFilters > 0 && (
        <ResetButton appearance="secondary" onClick={handleReset}>
          ✕ Reset All ({activeFilters})
        </ResetButton>
      )}
    </SidebarContainer>
  );
};
