import styled from "styled-components";
import { Spinner } from "@fluentui/react-components";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { ProductCard } from "../components/ProductCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { fetchProducts, clearError } from "../features/products/productsSlice";
import { ProductLoader } from "../components/LoadingStates";
import { useEffect } from "react";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const DashboardContainer = styled.div`
  background: ${colors.neutral[50]};
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div<{ sidebarOpen: boolean }>`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 0;
  flex: 1;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 0;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;

  ${media.tablet} {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 98;
    animation: fadeIn ${transitions.base};

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  background: ${colors.neutral[0]};
  border-right: 1px solid ${colors.neutral[200]};
  overflow-y: auto;
  height: auto;
  padding: ${spacing[4]};

  ${media.tablet} {
    position: fixed;
    left: 0;
    top: 72px;
    bottom: 0;
    width: 280px;
    border-right: 1px solid ${colors.neutral[200]};
    border-bottom: none;
    padding: ${spacing[4]};
    z-index: 100;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform ${transitions.base};
    background: ${colors.neutral[0]};
    overflow-y: auto;

    > div {
      border-radius: 0;
      border: none;
      box-shadow: none;
      position: static;
      top: auto;
      background: ${colors.neutral[0]};
    }
  }

  ${media.mobile} {
    width: 80vw;
    max-width: 280px;
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${spacing[4]};
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(${spacing[3]});
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${media.mobile} {
    gap: ${spacing[3]};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${spacing[16]} ${spacing[6]};
  background: ${colors.neutral[0]};
  border-radius: ${borderRadius.xl};
  color: ${colors.neutral[600]};
  font-size: ${typography.fontSize.lg};
  border: 1px dashed ${colors.neutral[300]};

  h2 {
    color: ${colors.neutral[700]};
    margin-bottom: ${spacing[3]};
    font-size: ${typography.fontSize["3xl"]};
  }

  p {
    color: ${colors.neutral[600]};
  }

  ${media.mobile} {
    padding: ${spacing[8]} ${spacing[4]};
  }
`;

const ErrorContainer = styled.div`
  padding: ${spacing[6]};
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: ${borderRadius.lg};
  color: #991B1B;
  margin-bottom: ${spacing[6]};
  box-shadow: ${shadows.sm};

  h3 {
    margin: 0 0 ${spacing[3]} 0;
    font-size: ${typography.fontSize.xl};
    color: ${colors.error};
    font-weight: ${typography.fontWeight.bold};
  }

  p {
    margin: 0 0 ${spacing[4]} 0;
    color: #B91C1C;
    font-weight: ${typography.fontWeight.medium};
  }

  button {
    background-color: #DC2626;
    color: white;
    padding: ${spacing[3]} ${spacing[4]};
    border: none;
    border-radius: ${borderRadius.md};
    cursor: pointer;
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.semibold};
    transition: all ${transitions.fast};

    &:hover {
      background-color: #B91C1C;
      box-shadow: ${shadows.lg};
      transform: translateY(-2px);
    }
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[3]} ${spacing[3]};
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral[700]};
  font-weight: ${typography.fontWeight.medium};
  background: ${colors.neutral[0]};
  border-radius: ${borderRadius.md};

  strong {
    color: ${colors.neutral[900]};
    font-weight: ${typography.fontWeight.bold};
  }

  ${media.mobile} {
    font-size: ${typography.fontSize.xs};
    flex-direction: column;
    gap: ${spacing[2]};
  }
`;

export const Dashboard = ({ 
  showFilters, 
  setShowFilters 
}: { 
  showFilters: boolean; 
  setShowFilters: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const { filtered, loading, items, error } = useAppSelector(state => state.products);

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length, loading, error]);

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchProducts());
  };

  const closeSidebar = () => {
    setShowFilters(false);
  };

  return (
    <DashboardContainer>
      <MainContainer sidebarOpen={showFilters}>
        <Overlay isOpen={showFilters} onClick={closeSidebar} />
        <SidebarWrapper isOpen={showFilters}>
          <FilterSidebar />
        </SidebarWrapper>

        <ContentArea>
          <ProductsSection>
            {error && (
              <ErrorContainer>
                <h3>⚠️ Error Loading Products</h3>
                <p>{error}</p>
                <button onClick={handleRetry}>Retry</button>
              </ErrorContainer>
            )}

            {loading && items.length === 0 ? (
              <ProductLoader count={12} />
            ) : filtered.length === 0 && !error ? (
              <NoResults>
                <h2>No products found</h2>
                <p>Try adjusting your search or filters</p>
              </NoResults>
            ) : (
              <>
                <ResultsInfo>
                  <span>
                    Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? "s" : ""}
                  </span>
                </ResultsInfo>
                <ProductGrid>
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </ProductGrid>
              </>
            )}
          </ProductsSection>
        </ContentArea>
      </MainContainer>
    </DashboardContainer>
  );
};
