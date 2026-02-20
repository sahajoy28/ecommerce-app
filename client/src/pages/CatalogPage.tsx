import styled from "styled-components";
import { Spinner, Button } from "@fluentui/react-components";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { ProductCard } from "../components/ProductCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { fetchProducts, filterByCategory, clearError } from "../features/products/productsSlice";
import { ProductLoader } from "../components/LoadingStates";
import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";
import { Product } from "../types/product";
import { useFilterToggle } from "../components/Header";

const CatalogContainer = styled.div`
  background: var(--color-bg-primary, ${colors.neutral[50]});
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
`;

const Header = styled.div`
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border-bottom: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  padding: ${spacing[6]} ${spacing[8]};
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.tablet} {
    padding: ${spacing[4]} ${spacing[6]};
    flex-direction: column;
    gap: ${spacing[4]};
    text-align: center;
  }

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: var(--color-text-primary, ${colors.neutral[900]});

  ${media.mobile} {
    font-size: ${typography.fontSize["2xl"]};
  }
`;

const HeaderControls = styled.div`
  display: flex;
  gap: ${spacing[3]};
  align-items: center;

  ${media.mobile} {
    width: 100%;
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 98;
  transition: opacity ${transitions.base};
  opacity: ${props => props.isOpen ? 1 : 0};
`;

const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 72px;
  bottom: 0;
  width: 20%;
  max-width: 320px;
  min-width: 240px;
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border-right: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  box-shadow: ${props => props.isOpen ? shadows.lg : 'none'};
  z-index: 100;
  overflow-y: auto;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform ${transitions.base};
  padding: ${spacing[3]};

  > div {
    border-radius: 0;
    border: none;
    box-shadow: none;
    position: static;
    top: auto;
    background: var(--color-neutral-0, ${colors.neutral[0]});
  }

  ${media.tablet} {
    width: 60%;
    max-width: 360px;
    min-width: 0;
  }

  ${media.mobile} {
    width: 80%;
    max-width: none;
    min-width: 0;
  }
`;

const ContentArea = styled.div`
  padding: ${spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
  flex: 1;

  ${media.tablet} {
    padding: ${spacing[4]};
    gap: ${spacing[4]};
  }

  ${media.mobile} {
    padding: ${spacing[3]};
  }
`;

const ProductsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${spacing[5]};

  ${media.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: ${spacing[3]};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${spacing[12]} ${spacing[6]};
  background: var(--color-neutral-50, ${colors.neutral[50]});
  border-radius: ${borderRadius.lg};
  color: var(--color-text-secondary, ${colors.neutral[600]});

  h3 {
    margin: 0 0 ${spacing[2]} 0;
    font-size: ${typography.fontSize["2xl"]};
    font-weight: ${typography.fontWeight.bold};
    color: var(--color-text-primary, ${colors.neutral[900]});
  }

  p {
    margin: 0 0 ${spacing[4]} 0;
  }
`;

const ProductCount = styled.div`
  font-size: ${typography.fontSize.sm};
  color: var(--color-text-secondary, ${colors.neutral[600]});
  font-weight: ${typography.fontWeight.medium};
`;

export const CatalogPage = () => {
  const { items, filtered, loading, error } = useAppSelector((state) => state.products);
  const filters = useAppSelector((state) => state.products.filters);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterToggle = useFilterToggle();
  const showFilters = filterToggle?.showFilters ?? false;

  const category = searchParams.get('category');
  const categoryAppliedRef = useRef(false);

  // Sync URL category param to Redux filter
  useEffect(() => {
    if (category && items.length > 0 && !categoryAppliedRef.current) {
      // Find exact category match (case-insensitive)
      const match = items.find(
        (p: Product) => p.category?.toLowerCase() === category.toLowerCase()
      );
      if (match) {
        dispatch(filterByCategory(match.category));
      } else {
        dispatch(filterByCategory(category));
      }
      categoryAppliedRef.current = true;
    } else if (!category && categoryAppliedRef.current) {
      dispatch(filterByCategory(null));
      categoryAppliedRef.current = false;
    }
  }, [category, items.length]);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts() as any);
    }
  }, []);

  return (
    <CatalogContainer>
      {/* Header */}
      <Header>
        <div>
          <HeaderTitle>
            {filters.category ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Products` : "All Products"}
          </HeaderTitle>
          <ProductCount>
            Showing {filtered.length} products
          </ProductCount>
        </div>
        <HeaderControls>
          {(category || filters.category) && (
            <Button 
              appearance="secondary"
              onClick={() => {
                dispatch(filterByCategory(null));
                categoryAppliedRef.current = false;
                navigate("/catalog");
              }}
            >
              Clear Filter
            </Button>
          )}
        </HeaderControls>
      </Header>

      {/* Main Content */}
      <MainContainer>
        <Overlay isOpen={showFilters} onClick={() => filterToggle?.closeFilters()} />
        
        <SidebarWrapper isOpen={showFilters}>
          <FilterSidebar />
        </SidebarWrapper>

        <ContentArea>
          <ProductsSection>
            {error && (
              <div style={{
                padding: spacing[4],
                margin: `0 0 ${spacing[4]} 0`,
                background: '#fee',
                color: '#c33',
                borderRadius: borderRadius.md,
                fontSize: typography.fontSize.sm
              }}>
                <strong>Error:</strong> {error}
                <Button
                  appearance="subtle"
                  size="small"
                  onClick={() => dispatch(clearError())}
                  style={{ marginLeft: spacing[2] }}
                >
                  Dismiss
                </Button>
              </div>
            )}

            {loading && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: spacing[5] }}>
                {[...Array(8)].map((_, i) => (
                  <ProductLoader key={i} />
                ))}
              </div>
            )}

            {!loading && filtered.length === 0 ? (
              <NoResults>
                <h3>No Products Found</h3>
                <p>We couldn't find any products matching your criteria.</p>
                <Button 
                  appearance="primary"
                  onClick={() => {
                    dispatch(filterByCategory(null));
                    categoryAppliedRef.current = false;
                    navigate("/catalog");
                  }}
                >
                  View All Products
                </Button>
              </NoResults>
            ) : (
              <ProductsGrid>
                {filtered.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductsGrid>
            )}
          </ProductsSection>
        </ContentArea>
      </MainContainer>
    </CatalogContainer>
  );
};
