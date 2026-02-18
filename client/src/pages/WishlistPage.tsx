import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectWishlist, removeFromWishlistAPI } from "../features/wishlist/wishlistSlice";
import { addToCartLocal, loadCartAPI, addToCartAPI } from "../features/cart/cartSlice";
import { userAPI } from "../services/userAPI";
import { Button } from "@fluentui/react-components";
import { ShoppingBag24Filled, Delete24Filled, Heart24Filled } from "@fluentui/react-icons";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";
import { Link } from "react-router-dom";

const WishlistContainer = styled.div`
  background: var(--color-neutral-50, ${colors.neutral[50]});
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: var(--color-neutral-0, ${colors.neutral[0]});
  padding: ${spacing[8]} ${spacing[6]} ${spacing[4]};
  color: var(--color-text-primary, ${colors.neutral[900]});
  
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
  color: var(--color-text-primary, ${colors.neutral[900]});
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
  color: var(--color-text-tertiary, ${colors.neutral[500]});

  ${media.mobile} {
    font-size: ${typography.fontSize.base};
  }
`;

const BackLink = styled.a`
  display: inline-block;
  margin-top: ${spacing[4]};
  color: var(--color-primary, ${colors.primary.main});
  font-weight: ${typography.fontWeight.semibold};
  text-decoration: none;
  transition: all ${transitions.fast};
  padding: ${spacing[2]} ${spacing[4]};
  background: var(--color-neutral-100, ${colors.neutral[100]});
  border-radius: ${borderRadius.full};

  &:hover {
    background: var(--color-neutral-200, ${colors.neutral[200]});
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
  background: linear-gradient(135deg, var(--color-neutral-50, ${colors.neutral[50]}) 0%, var(--color-neutral-100, ${colors.neutral[100]}) 100%);
  border-radius: ${borderRadius.xl};
  color: var(--color-text-secondary, ${colors.neutral[600]});
  border: 2px dashed var(--color-neutral-300, ${colors.neutral[300]});

  h2 {
    color: var(--color-text-primary, ${colors.neutral[700]});
    margin-bottom: ${spacing[3]};
    font-size: ${typography.fontSize["3xl"]};
  }

  p {
    color: var(--color-text-secondary, ${colors.neutral[600]});
    margin-bottom: ${spacing[4]};
  }

  a {
    display: inline-block;
    background: var(--color-primary, #0066ff);
    color: var(--color-neutral-0, ${colors.neutral[0]});
    padding: ${spacing[3]} ${spacing[6]};
    border-radius: ${borderRadius.md};
    text-decoration: none;
    font-weight: ${typography.fontWeight.semibold};
    transition: all ${transitions.fast};

    &:hover {
      background: var(--color-primary-dark, #0052cc);
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
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
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
    gap: ${spacing[2]};
  }
`;

const WishlistItem = styled.div`
  display: flex;
  gap: ${spacing[3]};
  align-items: center;
  padding: ${spacing[2]} ${spacing[3]};
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  border-radius: ${borderRadius.md};
  transition: all ${transitions.base};
  box-shadow: ${shadows.sm};

  &:hover {
    box-shadow: ${shadows.md};
    border-color: var(--color-primary-light, ${colors.primary.light});
  }

  ${media.mobile} {
    flex-direction: column;
    gap: ${spacing[2]};
    align-items: flex-start;
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${borderRadius.sm};
  background: var(--color-neutral-100, ${colors.neutral[100]});
  flex-shrink: 0;

  ${media.mobile} {
    width: 70px;
    height: 70px;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
  min-width: 0;
`;

const ProductName = styled(Link)`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  text-decoration: none;
  transition: color ${transitions.fast};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: var(--color-primary, ${colors.primary.main});
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;

const ProductCategory = styled.span`
  font-size: ${typography.fontSize.xs};
  color: var(--color-text-tertiary, ${colors.neutral[500]});
  text-transform: capitalize;
`;

const Price = styled.span`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.bold};
  color: var(--color-primary, ${colors.primary.main});
`;

const SavedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  font-size: ${typography.fontSize.sm};
  color: #10b981;
  font-weight: ${typography.fontWeight.semibold};
`;

const Actions = styled.div`
  display: flex;
  gap: ${spacing[1]};
  flex-shrink: 0;

  button {
    padding: ${spacing[1]} ${spacing[2]};
    font-size: ${typography.fontSize.sm};
  }

  ${media.mobile} {
    width: 100%;
    align-self: flex-end;

    button {
      flex: 1;
      min-height: 32px;
    }
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[3]} ${spacing[3]};
  font-size: ${typography.fontSize.sm};
  color: var(--color-text-primary, ${colors.neutral[700]});
  font-weight: ${typography.fontWeight.medium};
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing[4]};

  strong {
    color: var(--color-text-primary, ${colors.neutral[900]});
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
  const dispatch = useAppDispatch();

  const handleAddToCart = async (product: any) => {
    try {
      // Transform wishlist product to match cart format
      const cartProduct = {
        id: product.productId || product.id,
        title: product.productName || product.title,
        price: product.price,
        image: product.image,
        category: product.category || "General"
      };
      
      // Add to cart using the API directly
      await userAPI.addToCart({
        productId: cartProduct.id,
        productName: cartProduct.title,
        price: cartProduct.price,
        quantity: 1,
        image: cartProduct.image
      });
      
      // Reload cart from backend to sync Redux state
      await dispatch(loadCartAPI() as any);
      
      // Remove from wishlist after adding to cart
      await dispatch(removeFromWishlistAPI(String(product.productId || product.id)) as any);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const handleRemoveFromWishlist = async (itemId: string) => {
    try {
      await dispatch(removeFromWishlistAPI(itemId) as any);
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  };

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
                <WishlistItem key={product.id}>
                  <ProductImage src={product.image} alt={product.title} />
                  <ProductDetails>
                    <ProductName to={`/product/${product.id}`}>
                      {product.title}
                    </ProductName>
                    <ProductCategory>{product.category}</ProductCategory>
                    <ProductPrice>
                      <Price>${product.price.toFixed(2)}</Price>
                    </ProductPrice>
                  </ProductDetails>
                  <Actions>
                    <Button
                      appearance="primary"
                      size="small"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Delete24Filled />}
                      onClick={() => handleRemoveFromWishlist(String(product.id))}
                      title="Remove from wishlist"
                    />
                  </Actions>
                </WishlistItem>
              ))}
            </ProductGrid>
          </>
        )}
      </ContentArea>
    </WishlistContainer>
  );
};
