import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Button, Text, Badge } from "@fluentui/react-components";
import { Toast } from "../components/Toast";
import { ProductCard } from "../components/ProductCard";
import { RatingDisplay } from "../components/RatingDisplay";
import { AddReviewForm } from "../components/AddReviewForm";
import { ReviewsList } from "../components/ReviewsList";
import { InquiryForm } from "../components/InquiryForm";
import styled from "styled-components";
import { ArrowLeft24Filled } from "@fluentui/react-icons";
import { useState, useEffect, useRef } from "react";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";
import { convertGoogleDriveUrl } from "../utils/googleDriveUrl";
import { productsApi } from "../services/apiClient";

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
  grid-template-columns: 1fr;
  gap: ${spacing[4]};
  background: var(--color-neutral-0, ${colors.neutral[0]});
  padding: ${spacing[4]};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  margin-bottom: ${spacing[8]};

  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing[8]};
    padding: ${spacing[8]};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.gradients.cool};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[4]};
  height: fit-content;
  min-height: 200px;

  ${media.tablet} {
    padding: ${spacing[8]};
    position: sticky;
    top: 120px;
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

const AvailabilityBox = styled.div<{ $outOfStock?: boolean }>`
  padding: ${spacing[4]};
  background: ${(props: any) => props.$outOfStock
    ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)'
    : `linear-gradient(135deg, var(--color-primary-lighter, ${colors.primary.lighter}) 0%, ${colors.secondary.lighter} 100%)`};
  border-radius: ${borderRadius.md};
  border-left: 4px solid ${(props: any) => props.$outOfStock ? colors.error : colors.success};
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

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing[2]};
  padding: ${spacing[4]};
  background: var(--color-neutral-50, ${colors.neutral[50]});
  border-radius: ${borderRadius.md};
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: ${spacing[2]};
`;

const SpecLabel = styled.span`
  font-size: ${typography.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-tertiary, ${colors.neutral[500]});
  font-weight: ${typography.fontWeight.semibold};
`;

const SpecValue = styled.span`
  font-size: ${typography.fontSize.sm};
  color: var(--color-text-primary, ${colors.neutral[900]});
  font-weight: ${typography.fontWeight.medium};
`;

const SizeBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
`;

const SizeBadge = styled.span`
  padding: ${spacing[1]} ${spacing[3]};
  border-radius: 20px;
  background: var(--color-primary-lighter, ${colors.primary.lighter});
  color: var(--color-primary-dark, ${colors.primary.dark});
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
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
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [reviewsKey, setReviewsKey] = useState(0);
  const fetchAbortControllerRef = useRef<AbortController | null>(null);

  const dispatch = useAppDispatch();

  // Fetch product from API when ID changes
  useEffect(() => {
    // Abort previous request if still pending
    if (fetchAbortControllerRef.current) {
      fetchAbortControllerRef.current.abort();
    }

    if (!id) {
      setError("Product ID is missing");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Create new AbortController for this request
        fetchAbortControllerRef.current = new AbortController();
        
        const response = await productsApi.get<any>(`/products/${id}`);
        
        // Only update state if this component is still mounted (request wasn't aborted)
        if (response?.product) {
          setProduct(response.product);
        } else {
          setError("Product not found");
        }
      } catch (err: any) {
        // Only show error if request wasn't aborted
        if (err?.name !== 'AbortError') {
          console.error("Error fetching product:", err);
          setError("Product not found");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    // Cleanup: abort the request when unmounting or when id changes
    return () => {
      if (fetchAbortControllerRef.current) {
        fetchAbortControllerRef.current.abort();
      }
    };
  }, [id]);

  const allProducts = useAppSelector(state => state.products.items);

  const relatedProducts = product
    ? allProducts
        .filter(p => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4)
    : [];

  if (loading) {
    return (
      <Container>
        <NotFound>
          <h2>Loading product...</h2>
        </NotFound>
      </Container>
    );
  }

  if (!product || error) {
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

  return (
    <Container>
      <BackButton to="/">
        <ArrowLeft24Filled /> Back to Products
      </BackButton>

      <ProductWrapper>
        <ImageContainer>
          {!imageError && product.image ? (
            <ProductImage 
              src={convertGoogleDriveUrl(product.image)} 
              alt={product.title}
              onError={() => setImageError(true)}
            />
          ) : (
            <ProductImage 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E"
              alt="No image available"
            />
          )}
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

          {(product.material || product.finish || (product.sizes && product.sizes.length > 0) || product.color) && (
            <SpecsGrid>
              {product.material && (
                <SpecItem>
                  <SpecLabel>Material</SpecLabel>
                  <SpecValue>{product.material}</SpecValue>
                </SpecItem>
              )}
              {product.finish && (
                <SpecItem>
                  <SpecLabel>Finish</SpecLabel>
                  <SpecValue>{product.finish}</SpecValue>
                </SpecItem>
              )}
              {product.color && (
                <SpecItem>
                  <SpecLabel>Color</SpecLabel>
                  <SpecValue>{product.color}</SpecValue>
                </SpecItem>
              )}
              {product.specifications?.thickness && (
                <SpecItem>
                  <SpecLabel>Thickness</SpecLabel>
                  <SpecValue>{product.specifications.thickness}</SpecValue>
                </SpecItem>
              )}
              {product.specifications?.weight && (
                <SpecItem>
                  <SpecLabel>Weight</SpecLabel>
                  <SpecValue>{product.specifications.weight}</SpecValue>
                </SpecItem>
              )}
              {product.specifications?.waterAbsorption && (
                <SpecItem>
                  <SpecLabel>Water Absorption</SpecLabel>
                  <SpecValue>{product.specifications.waterAbsorption}</SpecValue>
                </SpecItem>
              )}
              {product.specifications?.mohs && (
                <SpecItem>
                  <SpecLabel>Mohs Hardness</SpecLabel>
                  <SpecValue>{product.specifications.mohs}</SpecValue>
                </SpecItem>
              )}
              {product.sizes && product.sizes.length > 0 && (
                <SpecItem style={{ gridColumn: '1 / -1' }}>
                  <SpecLabel>Available Sizes</SpecLabel>
                  <SizeBadges>
                    {product.sizes.map((s: string) => <SizeBadge key={s}>{s}</SizeBadge>)}
                  </SizeBadges>
                </SpecItem>
              )}
            </SpecsGrid>
          )}

          <AvailabilityBox $outOfStock={product.stock != null && product.stock <= 0}>
            <AvailabilityLabel weight="bold" size={200}>
              Availability
            </AvailabilityLabel>
            {product.stock != null && product.stock <= 0 ? (
              <AvailabilityStatus weight="semibold" style={{ color: "#ef4444" }}>
                ✕ Out of Stock
              </AvailabilityStatus>
            ) : (
              <AvailabilityStatus weight="semibold" style={{ color: "#10b981" }}>
                ✓ In Stock
              </AvailabilityStatus>
            )}
          </AvailabilityBox>

          <InquiryForm 
            productId={String(product._id || product.id)}
            productName={product.title}
          />
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
        <ReviewsList key={reviewsKey} productId={product.id} />
      </RelatedSection>

      <AddReviewForm productId={product.id} onReviewAdded={() => setReviewsKey(k => k + 1)} />

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