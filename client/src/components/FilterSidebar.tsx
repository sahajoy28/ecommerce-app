import { useState, useEffect } from "react";
import styled from "styled-components";
import { Checkbox, Slider, Button } from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  filterByCategory, filterByPrice, filterByRating,
  filterByMaterial, filterByFinish, filterBySize, filterByColor,
  filterByCustom, resetFilters
} from "../features/products/productsSlice";
import { RatingInput } from "./RatingDisplay";
import { productsApi } from "../services/apiClient";
import { userAPI } from "../services/userAPI";
import { CustomFilter } from "../types/product";
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
  }

  ${media.mobile} {
    padding: ${spacing[3]};
    border: none;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
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
  margin: 0 0 ${spacing[1]} 0;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral[900]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  cursor: pointer;
  user-select: none;
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[1]} 0;
  cursor: pointer;

  label {
    cursor: pointer;
    color: ${colors.neutral[700]};
    font-size: ${typography.fontSize.sm};
    user-select: none;
    &:hover { color: ${colors.secondary.main}; }
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
  &:hover { background: #ff9500 !important; box-shadow: ${shadows.md} !important; }
  &:active { background: #e68900 !important; transform: scale(0.98); }
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

const ColorSwatch = styled.button<{ $color: string; $active: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2.5px solid ${(p: any) => p.$active ? colors.primary.main : colors.neutral[300]};
  background: ${(p: any) => p.$color};
  cursor: pointer;
  transition: all 0.15s ease;
  outline: ${(p: any) => p.$active ? `2px solid ${colors.primary.lighter}` : 'none'};
  outline-offset: 2px;
  &:hover { border-color: ${colors.primary.main}; transform: scale(1.1); }
`;

const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  padding: ${spacing[1]} 0;
`;

const SizeChip = styled.button<{ $active: boolean }>`
  padding: 3px 10px;
  border-radius: 14px;
  border: 1.5px solid ${(p: any) => p.$active ? colors.primary.main : colors.neutral[300]};
  background: ${(p: any) => p.$active ? colors.primary.main : 'white'};
  color: ${(p: any) => p.$active ? 'white' : colors.neutral[700]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover { border-color: ${colors.primary.main}; }
`;

const SizeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const COLOR_MAP: Record<string, string> = {
  White: '#ffffff', Beige: '#f5f0e1', Cream: '#fffdd0', Ivory: '#fffff0',
  Grey: '#9e9e9e', Black: '#333333', Brown: '#795548', Blue: '#2196f3',
  Green: '#4caf50', Red: '#f44336', Yellow: '#fdd835', Pink: '#e91e63',
  Orange: '#ff9800', Gold: '#ffd700', Silver: '#c0c0c0', Maroon: '#800000',
};

interface BuiltInFilterConfig {
  key: string;
  label: string;
  icon: string;
  enabled: boolean;
  displayOrder: number;
}

const DEFAULT_FILTER_CONFIG: BuiltInFilterConfig[] = [
  { key: 'category', label: 'Categories', icon: '📂', enabled: true, displayOrder: 0 },
  { key: 'material', label: 'Material', icon: '🧱', enabled: true, displayOrder: 1 },
  { key: 'finish', label: 'Finish', icon: '✨', enabled: true, displayOrder: 2 },
  { key: 'size', label: 'Size', icon: '📐', enabled: true, displayOrder: 3 },
  { key: 'color', label: 'Color', icon: '🎨', enabled: true, displayOrder: 4 },
  { key: 'price', label: 'Price Range', icon: '💰', enabled: true, displayOrder: 5 },
  { key: 'rating', label: 'Min. Rating', icon: '⭐', enabled: true, displayOrder: 6 },
];

export const FilterSidebar = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.items);
  const filters = useAppSelector(state => state.products.filters);

  const [priceRange, setPriceRange] = useState(filters.maxPrice || 100000);

  // Fetch custom filters from API
  const [customFilters, setCustomFilters] = useState<CustomFilter[]>([]);
  // Fetch built-in filter config from site settings
  const [filterConfig, setFilterConfig] = useState<BuiltInFilterConfig[]>(DEFAULT_FILTER_CONFIG);

  useEffect(() => {
    // Load custom filters
    productsApi.get<any>('/filters').then((res: any) => {
      setCustomFilters((res.filters || []).filter((f: CustomFilter) => f.isActive && f.showInSidebar));
    }).catch(() => {});

    // Load built-in filter visibility config
    userAPI.getSiteSettings().then((data: any) => {
      if (data.catalogFilterConfig && data.catalogFilterConfig.length > 0) {
        setFilterConfig(data.catalogFilterConfig);
      }
    }).catch(() => {});
  }, []);

  // Derive unique values from product data
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean).sort();
  const materials = [...new Set(products.map(p => p.material).filter((m): m is string => !!m))].sort();
  const finishes = [...new Set(products.map(p => p.finish).filter((f): f is string => !!f))].sort();
  const allSizes = [...new Set(products.flatMap(p => p.sizes || []))].sort((a, b) => {
    const numA = parseInt(a); const numB = parseInt(b);
    return (isNaN(numA) || isNaN(numB)) ? a.localeCompare(b) : numA - numB;
  });
  const allColors = [...new Set(products.map(p => p.color).filter((c): c is string => !!c))].sort();
  const maxPrice = Math.max(...products.map(p => p.price), 1000);

  const handleCategoryChange = (category: string, checked: boolean) => {
    dispatch(filterByCategory(checked ? category : null));
  };

  const handleMaterialChange = (mat: string, checked: boolean) => {
    dispatch(filterByMaterial(checked ? mat : null));
  };

  const handleFinishChange = (fin: string, checked: boolean) => {
    dispatch(filterByFinish(checked ? fin : null));
  };

  const handleSizeClick = (size: string) => {
    dispatch(filterBySize(filters.size === size ? null : size));
  };

  const handleColorClick = (col: string) => {
    dispatch(filterByColor(filters.color === col ? null : col));
  };

  const handlePriceChange = (_ev: any, data: any) => {
    const price = data?.value || priceRange;
    setPriceRange(price);
    dispatch(filterByPrice(price));
  };

  const handleRatingChange = (rating: number) => {
    dispatch(filterByRating(rating));
  };

  const handleCustomFilterChange = (slug: string, value: string, checked: boolean) => {
    dispatch(filterByCustom({ key: slug, value: checked ? value : null }));
  };

  const handleReset = () => {
    setPriceRange(maxPrice);
    dispatch(resetFilters());
  };

  const activeFilters =
    (filters.category ? 1 : 0) +
    (filters.material ? 1 : 0) +
    (filters.finish ? 1 : 0) +
    (filters.size ? 1 : 0) +
    (filters.color ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxPrice !== null && filters.maxPrice < maxPrice ? 1 : 0) +
    Object.values(filters.custom || {}).filter(Boolean).length;

  // Helper to check if a built-in filter is enabled
  const isEnabled = (key: string) => {
    const cfg = filterConfig.find(c => c.key === key);
    return cfg ? cfg.enabled : true;
  };
  const getLabel = (key: string) => {
    const cfg = filterConfig.find(c => c.key === key);
    return cfg?.label || key;
  };
  const getIcon = (key: string) => {
    const cfg = filterConfig.find(c => c.key === key);
    return cfg?.icon || '';
  };

  // Build ordered list of enabled built-in filter sections
  const enabledBuiltIns = filterConfig
    .filter(c => c.enabled)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Render a built-in filter section by key
  const renderBuiltInFilter = (cfg: BuiltInFilterConfig) => {
    switch (cfg.key) {
      case 'category':
        if (categories.length === 0) return null;
        return (
          <FilterSection key={cfg.key}>
            <SectionTitle>{cfg.icon} {cfg.label}</SectionTitle>
            {categories.map(cat => (
              <FilterItem key={cat}>
                <Checkbox
                  checked={filters.category === cat}
                  onChange={(_, data) => handleCategoryChange(cat, data.checked as boolean)}
                  label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                />
              </FilterItem>
            ))}
          </FilterSection>
        );

      case 'material':
        if (materials.length === 0) return null;
        return (
          <FilterSection key={cfg.key}>
            <SectionTitle>{cfg.icon} {cfg.label}</SectionTitle>
            {materials.map(mat => (
                <FilterItem key={mat}>
                <Checkbox
                  checked={filters.material === mat}
                  onChange={(_, data) => handleMaterialChange(mat, data.checked as boolean)}
                  label={mat}
                />
                </FilterItem>
            ))}
          </FilterSection>
        );

      case 'finish':
        if (finishes.length === 0) return null;
        return (
          <FilterSection key={cfg.key}>
            <SectionTitle>{cfg.icon} {cfg.label}</SectionTitle>
            {finishes.map(fin => (
              <FilterItem key={fin}>
                <Checkbox
                  checked={filters.finish === fin}
                  onChange={(_, data) => handleFinishChange(fin as string, data.checked as boolean)}
                  label={fin}
                />
              </FilterItem>
            ))}
          </FilterSection>
        );

      case 'size':
        if (allSizes.length === 0) return null;
        return (
          <FilterSection key={cfg.key}>
            <SectionTitle>
              {cfg.icon} {cfg.label}
              {filters.size && <FilterCount>{filters.size}</FilterCount>}
            </SectionTitle>
            <SizeGrid>
              {allSizes.map(size => (
                <SizeChip
                  key={size}
                  $active={filters.size === size}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </SizeChip>
              ))}
            </SizeGrid>
          </FilterSection>
        );

      case 'color':
        if (allColors.length === 0) return null;
        return (
          <FilterSection key={cfg.key}>
            <SectionTitle>
              {cfg.icon} {cfg.label}
              {filters.color && <FilterCount>{filters.color}</FilterCount>}
            </SectionTitle>
            <ColorGrid>
              {allColors.map(col => (
                <ColorSwatch
                  key={col}
                  $color={COLOR_MAP[col] || col}
                  $active={filters.color === col}
                  onClick={() => handleColorClick(col)}
                  title={col}
                />
              ))}
            </ColorGrid>
          </FilterSection>
        );

      case 'price':
        return (
          <FilterSection key={cfg.key}>
            <SectionTitle>
              {cfg.icon} {cfg.label}
              {filters.maxPrice !== null && filters.maxPrice < maxPrice && <FilterCount>₹{filters.maxPrice}</FilterCount>}
            </SectionTitle>
            <PriceDisplay>
              <span>₹0</span>
              <span>₹{priceRange.toLocaleString()}</span>
            </PriceDisplay>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              min={0}
              max={maxPrice}
              step={Math.max(10, Math.floor(maxPrice / 100))}
            />
          </FilterSection>
        );

      case 'rating':
        return (
          <FilterSection key={cfg.key}>
            <SectionTitle>
              {cfg.icon} {cfg.label}
              {filters.minRating > 0 && <FilterCount>⭐{filters.minRating.toFixed(1)}</FilterCount>}
            </SectionTitle>
            <RatingInput value={filters.minRating} onChange={handleRatingChange} />
          </FilterSection>
        );

      default:
        return null;
    }
  };

  return (
    <SidebarContainer>
      {/* Built-in filters — rendered in admin-configured order */}
      {enabledBuiltIns.map(cfg => renderBuiltInFilter(cfg))}

      {/* Dynamic Custom Filters */}
      {customFilters.map(cf => {
        const activeVal = filters.custom?.[cf.slug] || null;
        // Derive available values from products
        const productValues = [...new Set(
          products
            .map(p => p.customFilters?.[cf.slug])
            .filter(Boolean)
            .map(v => String(v))
        )].sort();

        // Combine filter options with product values
        const displayOptions = cf.options.length > 0
          ? cf.options.filter(opt => productValues.includes(opt.value))
          : productValues.map(v => ({ label: v.charAt(0).toUpperCase() + v.slice(1).replace(/-/g, ' '), value: v }));

        if (displayOptions.length === 0) return null;

        return (
          <FilterSection key={cf._id}>
            <SectionTitle>
              {cf.icon || '🏷️'} {cf.name}
              {activeVal && <FilterCount>{activeVal}</FilterCount>}
            </SectionTitle>
            {displayOptions.map(opt => (
              <FilterItem key={opt.value}>
                <Checkbox
                  checked={activeVal === opt.value}
                  onChange={(_, data) => handleCustomFilterChange(cf.slug, opt.value, data.checked as boolean)}
                  label={opt.label}
                />
              </FilterItem>
            ))}
          </FilterSection>
        );
      })}

      {activeFilters > 0 && (
        <ResetButton appearance="secondary" onClick={handleReset}>
          ✕ Reset All ({activeFilters})
        </ResetButton>
      )}
    </SidebarContainer>
  );
};
