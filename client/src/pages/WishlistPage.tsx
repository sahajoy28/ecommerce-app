import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { ProductCard } from "../components/ProductCard";
import { selectWishlist } from "../features/wishlist/wishlistSlice";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const WishlistContainer = styled.div`
  background: ${colors.neutral[50]};
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: ${colors.neutral[0]};
  padding: ${spacing[8]} ${spacing[6]} ${spacing[4]};
  color: ${colors.neutral[900]};
  
  ${media.tablet} {
    padding: ${spacing[6]} ${spacing[4]};
  }

  ${media.mobile} {
    padding: ${spacing[4]} ${spacing[3]};
  }
`;

const HeaderTitle = styled.h1`
  margin: 0 0 ${spacing[2]} 0;
  font-size: ${typography.fontSize["4xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: ${colors.neutral[900]};
  letter-spacing: -0.02em;

  ${media.tablet} {
    font-size: ${typography.fontSize["3xl"]};
  }

  ${media.mobile} {
    font-size: ${typography.fontSize["2xl"]};
  }
`;

const HeaderSubtitle = styled.p`
  margin: 0;
  font-size: ${typography.fontSize.lg};
  color: ${colors.neutral[500]};

  ${media.mobile} {
    font-size: ${typography.fontSize.base};
  }
`;

const BackLink = styled.a`
  display: inline-block;
  margin-top: ${spacing[4]};
  color: ${colors.primary.main};
  font-weight: ${typography.fontWeight.semibold};
  text-decoration: none;
  transition: all ${transitions.fast};
  padding: ${spacing[2]} ${spacing[4]};
  background: ${colors.neutral[100]};
  border-radius: ${borderRadius.full};

  &:hover {
    background: ${colors.neutral[200]};
    transform: translateY(-1px);
  }
`;

const ContentArea = styled.div`
  padding: ${spacing[6]};
  flex: 1;

  ${media.tablet} {
    padding: ${spacing[4]};
  }

  ${media.mobile} {
    padding: ${spacing[3]};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing[16]} ${spacing[6]};
  background: linear-gradient(135deg, ${colors.neutral[50]} 0%, ${colors.neutral[100]} 100%);
  border-radius: ${borderRadius.xl};
  color: ${colors.neutral[600]};
  border: 2px dashed ${colors.neutral[300]};

  h2 {
    color: ${colors.neutral[700]};
    margin-bottom: ${spacing[3]};
    font-size: ${typography.fontSize["3xl"]};
  }

  p {
    color: ${colors.neutral[600]};
    margin-bottom: ${spacing[4]};
  }

  a {
    display: inline-block;
    background: #0066ff;
    color: ${colors.neutral[0]};
    padding: ${spacing[3]} ${spacing[6]};
    border-radius: ${borderRadius.md};
    text-decoration: none;
    font-weight: ${typography.fontWeight.semibold};
    transition: all ${transitions.fast};

    &:hover {
      background: #0052cc;
      transform: translateY(-2px);
      box-shadow: ${shadows.lg};
    }
  }

  ${media.mobile} {
    padding: ${spacing[8]} ${spacing[4]};
    h2 {
      font-size: ${typography.fontSize["2xl"]};
    }
  }
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
  margin-bottom: ${spacing[4]};

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

export const WishlistPage = () => {
  const wishlistItems = useAppSelector(selectWishlist);

  return (
    <WishlistContainer>
      <Header>
        <HeaderTitle>❤️ My Wishlist</HeaderTitle>
        <HeaderSubtitle>{wishlistItems.length} items in your wishlist</HeaderSubtitle>
        <BackLink href="/">← Back to Shopping</BackLink>
      </Header>

      <ContentArea>
        {wishlistItems.length === 0 ? (
          <EmptyState>
            <h2>Your wishlist is empty</h2>
            <p>Start adding products to your wishlist to save them for later!</p>
            <a href="/">Continue Shopping</a>
          </EmptyState>
        ) : (
          <>
            <ResultsInfo>
              <span>
                Showing <strong>{wishlistItems.length}</strong> product{wishlistItems.length !== 1 ? "s" : ""}
              </span>
            </ResultsInfo>
            <ProductGrid>
              {wishlistItems.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </>
        )}
      </ContentArea>
    </WishlistContainer>
  );
};
