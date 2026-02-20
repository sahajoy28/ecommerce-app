import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Button, Badge } from "@fluentui/react-components";
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
  gap: ${spacing[6]};
  margin-bottom: ${spacing[8]};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing[8]};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border-radius: ${borderRadius.lg};
  padding: ${spacing[4]};
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  box-shadow: ${shadows.sm};
  min-height: 300px;

  @media (min-width: 768px) {
    position: sticky;
    top: 100px;
    padding: ${spacing[6]};
    min-height: 400px;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: ${borderRadius.md};
  transition: transform ${transitions.base};

  &:hover {
    transform: scale(1.03);
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[5]};
`;

const Category = styled(Badge)`
  width: fit-content;
  padding: ${spacing[1]} ${spacing[3]};
  font-weight: ${typography.fontWeight.semibold};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  line-height: ${typography.lineHeight.tight};

  @media (min-width: 768px) {
    font-size: ${typography.fontSize["4xl"]};
  }
`;

const PriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacing[3]};
  flex-wrap: wrap;
`;

const Price = styled.span`
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: var(--color-primary, ${colors.primary.main});

  @media (min-width: 768px) {
    font-size: ${typography.fontSize["4xl"]};
  }
`;

const MrpPrice = styled.span`
  font-size: ${typography.fontSize.lg};
  color: ${colors.neutral[500]};
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  padding: ${spacing[1]} ${spacing[2]};
  background: #dcfce7;
  color: #16a34a;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.bold};
  border-radius: ${borderRadius.sm};
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
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[3]};
  background: ${(props: any) => props.$outOfStock ? '#fef2f2' : '#f0fdf4'};
  border-radius: ${borderRadius.md};
  border: 1px solid ${(props: any) => props.$outOfStock ? '#fecaca' : '#bbf7d0'};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${(props: any) => props.$outOfStock ? '#dc2626' : '#16a34a'};
`;

const EnquireButton = styled.button`
  width: 100%;
  padding: ${spacing[4]};
  background: var(--color-primary, ${colors.primary.main});
  color: white;
  border: none;
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  cursor: pointer;
  transition: all ${transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};

  &:hover {
    background: var(--color-primary-dark, ${colors.primary.dark});
    transform: translateY(-1px);
    box-shadow: ${shadows.md};
  }

  &:active {
    transform: translateY(0);
  }
`;

const InquirySection = styled.div<{ $open: boolean }>`
  max-height: ${(props: any) => props.$open ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
  opacity: ${(props: any) => props.$open ? 1 : 0};
`;

const SpecsSectionWrapper = styled.div`
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border-radius: ${borderRadius.lg};
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  box-shadow: ${shadows.sm};
  padding: ${spacing[6]};
  margin-bottom: ${spacing[6]};
`;

const SpecsSectionTitle = styled.h3`
  margin: 0 0 ${spacing[4]} 0;
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
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
  const [showInquiry, setShowInquiry] = useState(false);
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
      <BackButton to="/catalog">
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
          <Category color="informative" appearance="outline">
            {product.category?.toUpperCase()}
          </Category>

          <Title>{product.title}</Title>

          {product.showPriceInListing !== false && (
            <PriceSection>
              <Price>₹ {product.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Price>
              {product.mrp && product.mrp > product.price && (
                <MrpPrice>₹ {product.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</MrpPrice>
              )}
              {product.discount?.discountValue > 0 && (
                <DiscountBadge>
                  {product.discount.discountType === 'percentage'
                    ? `${product.discount.discountValue}% OFF`
                    : `₹${product.discount.discountValue} OFF`}
                </DiscountBadge>
              )}
            </PriceSection>
          )}

          <RatingDisplay rating={product.rating} count={product.reviewCount} />

          <Description>{product.description}</Description>

          <AvailabilityBox $outOfStock={product.stock != null && product.stock <= 0}>
            {product.stock != null && product.stock <= 0
              ? '✕ Out of Stock'
              : '✓ In Stock'}
          </AvailabilityBox>

          <EnquireButton onClick={() => setShowInquiry(prev => !prev)}>
            {showInquiry ? '✕ Close Inquiry' : '📩 Enquire Now'}
          </EnquireButton>

          <InquirySection $open={showInquiry}>
            <InquiryForm 
              productId={String(product._id || product.id)}
              productName={product.title}
            />
          </InquirySection>
        </DetailsContainer>
      </ProductWrapper>

      {/* Specifications Section */}
      {(product.material || product.finish || product.color || 
        (product.sizes && product.sizes.length > 0) ||
        product.specifications?.thickness || product.specifications?.weight ||
        product.specifications?.waterAbsorption || product.specifications?.mohs ||
        (product.customFilters && Object.keys(product.customFilters).length > 0)) && (
        <SpecsSectionWrapper>
          <SpecsSectionTitle>📋 Product Specifications</SpecsSectionTitle>
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
            {product.customFilters && Object.entries(product.customFilters).map(([key, val]) => (
              val ? (
                <SpecItem key={key}>
                  <SpecLabel>{key.replace(/-/g, ' ')}</SpecLabel>
                  <SpecValue>{String(val)}</SpecValue>
                </SpecItem>
              ) : null
            ))}
            {product.sizes && product.sizes.length > 0 && (
              <SpecItem style={{ gridColumn: '1 / -1' }}>
                <SpecLabel>Available Sizes</SpecLabel>
                <SizeBadges>
                  {product.sizes.map((s: string) => <SizeBadge key={s}>{s}</SizeBadge>)}
                </SizeBadges>
              </SpecItem>
            )}
          </SpecsGrid>
        </SpecsSectionWrapper>
      )}

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