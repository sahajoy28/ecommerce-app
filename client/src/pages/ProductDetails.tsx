import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Button, Text, Badge } from "@fluentui/react-components";
import { addToCartLocal, addToCartAPI } from "../features/cart/cartSlice";
import { Toast } from "../components/Toast";
import { ProductCard } from "../components/ProductCard";
import { RatingDisplay } from "../components/RatingDisplay";
import { AddReviewForm } from "../components/AddReviewForm";
import { ReviewsList } from "../components/ReviewsList";
import styled from "styled-components";
import { ArrowLeft24Filled } from "@fluentui/react-icons";
import { useState } from "react";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing[6]};
  width: 100%;

  ${media.tablet} {
    padding: ${spacing[4]};
  }

  ${media.mobile} {
    padding: ${spacing[3]};
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  color: var(--color-primary, ${colors.primary.main});
  text-decoration: none;
  margin-bottom: ${spacing[6]};
  font-weight: ${typography.fontWeight.semibold};
  transition: all ${transitions.fast};
  padding: ${spacing[2]} ${spacing[3]};

  &:hover {
    color: var(--color-primary-dark, ${colors.primary.dark});
    gap: ${spacing[3]};
  }
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[8]};
  background: var(--color-neutral-0, ${colors.neutral[0]});
  padding: ${spacing[8]};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  margin-bottom: ${spacing[8]};

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: ${spacing[6]};
    padding: ${spacing[6]};
  }

  ${media.mobile} {
    gap: ${spacing[4]};
    padding: ${spacing[4]};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.gradients.cool};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[8]};
  height: fit-content;
  position: sticky;
  top: 120px;

  ${media.tablet} {
    position: static;
    top: auto;
  }

  ${media.mobile} {
    padding: ${spacing[6]};
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  transition: transform ${transitions.base};

  &:hover {
    transform: scale(1.05);
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

const Category = styled(Badge)`
  width: fit-content;
  padding: ${spacing[1]} ${spacing[3]};
  font-weight: ${typography.fontWeight.semibold};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${typography.fontSize["5xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  line-height: ${typography.lineHeight.tight};

  ${media.tablet} {
    font-size: ${typography.fontSize["4xl"]};
  }

  ${media.mobile} {
    font-size: ${typography.fontSize["3xl"]};
  }
`;

const Price = styled.div`
  font-size: ${typography.fontSize["5xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  background: ${colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  ${media.mobile} {
    font-size: ${typography.fontSize["4xl"]};
  }
`;

const Description = styled.p`
  color: var(--color-text-secondary, ${colors.neutral[600]});
  line-height: ${typography.lineHeight.normal};
  margin: 0;
  font-size: ${typography.fontSize.md};
  padding: ${spacing[4]};
  background: var(--color-neutral-50, ${colors.neutral[50]});
  border-radius: ${borderRadius.md};
  border-left: 4px solid var(--color-primary, ${colors.primary.main});
`;

const AvailabilityBox = styled.div`
  padding: ${spacing[4]};
  background: linear-gradient(135deg, var(--color-primary-lighter, ${colors.primary.lighter}) 0%, ${colors.secondary.lighter} 100%);
  border-radius: ${borderRadius.md};
  border-left: 4px solid ${colors.success};
`;

const AvailabilityLabel = styled(Text)`
  display: block;
  margin-bottom: ${spacing[2]};
`;

const AvailabilityStatus = styled(Text)`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  color: ${colors.success};
  font-weight: ${typography.fontWeight.semibold};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing[3]};
  margin-top: ${spacing[3]};

  ${media.mobile} {
    flex-direction: column;
    gap: ${spacing[2]};

    button {
      width: 100%;
      min-height: 44px;
    }
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${spacing[16]} ${spacing[6]};
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border-radius: ${borderRadius.lg};

  h2 {
    font-size: ${typography.fontSize["3xl"]};
    margin-bottom: ${spacing[3]};
    color: var(--color-text-primary, ${colors.neutral[900]});
  }

  p {
    color: var(--color-text-secondary, ${colors.neutral[600]});
    margin-bottom: ${spacing[6]};
    font-size: ${typography.fontSize.lg};
  }

  ${media.mobile} {
    padding: ${spacing[8]} ${spacing[4]};

    h2 {
      font-size: ${typography.fontSize["2xl"]};
    }
  }
`;

const RelatedSection = styled.div`
  margin-top: ${spacing[8]};

  ${media.mobile} {
    margin-top: ${spacing[6]};
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${spacing[6]} 0;
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  border-bottom: 3px solid var(--color-primary, ${colors.primary.main});
  padding-bottom: ${spacing[3]};
  display: inline-block;

  ${media.tablet} {
    font-size: ${typography.fontSize["2xl"]};
  }

  ${media.mobile} {
    font-size: ${typography.fontSize["2xl"]};
    padding-bottom: ${spacing[2]};
  }
`;

const RelatedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${spacing[4]};

  ${media.mobile} {
    gap: ${spacing[3]};
  }
`;

const EmptyRelated = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${spacing[8]};
  color: var(--color-text-tertiary, ${colors.neutral[500]});
  font-size: ${typography.fontSize.base};
`;

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const product = useAppSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );

  const relatedProducts = useAppSelector(state =>
    state.products.items
      .filter(p => p.category === product?.category && p.id !== product?.id)
      .slice(0, 4)
  );

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  if (!product) {
    return (
      <Container>
        <NotFound>
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/">
            <Button appearance="primary">Back to Dashboard</Button>
          </Link>
        </NotFound>
      </Container>
    );
  }

  const handleAddToCart = async () => {
    // Optimistic update
    dispatch(addToCartLocal(product));
    
    // Save to MongoDB
    try {
      await dispatch(addToCartAPI(product) as any).unwrap();
      setToastMessage(`✓ Added to cart!`);
    } catch (error) {
      setToastMessage("Failed to add to cart");
    }
    setShowToast(true);
  };

  return (
    <Container>
      <BackButton to="/">
        <ArrowLeft24Filled /> Back to Products
      </BackButton>

      <ProductWrapper>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.title} />
        </ImageContainer>

        <DetailsContainer>
          <div>
            <Category color="informative" appearance="outline">
              {product.category.toUpperCase()}
            </Category>
          </div>

          <Title>{product.title}</Title>

          <Price>₹ {product.price.toFixed(2)}</Price>

          <RatingDisplay rating={product.rating} count={product.reviewCount} />

          <Description>{product.description}</Description>

          <AvailabilityBox>
            <AvailabilityLabel weight="bold" size={200}>
              Availability
            </AvailabilityLabel>
            <AvailabilityStatus weight="semibold" style={{ color: "#10b981" }}>
              ✓ In Stock
            </AvailabilityStatus>
          </AvailabilityBox>

          <ButtonGroup>
            <Button 
              appearance="primary" 
              size="large" 
              onClick={handleAddToCart}
              style={{ flex: 1 }}
            >
              Add to Cart
            </Button>
            <Button 
              appearance="secondary" 
              size="large" 
              onClick={() => navigate("/")}
              style={{ flex: 1 }}
            >
              Continue Shopping
            </Button>
          </ButtonGroup>
        </DetailsContainer>
      </ProductWrapper>

      {relatedProducts.length > 0 && (
        <RelatedSection>
          <SectionTitle>Related Products</SectionTitle>
          <RelatedProductsGrid>
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </RelatedProductsGrid>
        </RelatedSection>
      )}

      <RelatedSection>
        <ReviewsList productId={product.id} />
      </RelatedSection>

      <AddReviewForm productId={product.id} />

      {showToast && (
        <Toast 
          message={toastMessage} 
          type="success" 
          duration={3000}
        />
      )}
    </Container>
  );
};