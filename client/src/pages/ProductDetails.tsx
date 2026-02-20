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
  margin-bottom: ${spacing[6]};
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing[8]};
  }
`;

/* ── Carousel ── */
const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};

  @media (min-width: 768px) {
    position: sticky;
    top: 90px;
  }
`;

const MainMediaBox = styled.div`
  position: relative;
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;

  @media (min-width: 768px) {
    min-height: 420px;
  }

  img {
    width: 100%;
    height: 100%;
    min-height: 320px;
    object-fit: cover;

    @media (min-width: 768px) {
      min-height: 420px;
    }
  }

  video {
    width: 100%;
    max-height: 500px;
    object-fit: contain;
  }
`;

const CarouselNav = styled.button<{ $dir: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${(p: any) => p.$dir === 'left' ? 'left: 8px;' : 'right: 8px;'}
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.85);
  box-shadow: ${shadows.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${colors.neutral[700]};
  z-index: 2;
  transition: all ${transitions.fast};

  &:hover {
    background: white;
    box-shadow: ${shadows.lg};
  }
`;

const ThumbnailStrip = styled.div`
  display: flex;
  gap: ${spacing[2]};
  overflow-x: auto;
  padding: ${spacing[1]} 0;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.neutral[300]};
    border-radius: 2px;
  }
`;

const Thumbnail = styled.button<{ $active?: boolean; $isVideo?: boolean }>`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: ${borderRadius.md};
  border: 2px solid ${(p: any) => p.$active ? colors.primary.main : colors.neutral[200]};
  background: ${colors.neutral[50]};
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: border-color ${transitions.fast};

  &:hover {
    border-color: ${colors.primary.main};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${(p: any) => p.$isVideo && `
    &::after {
      content: '▶';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.3);
      color: white;
      font-size: 20px;
    }
  `}
`;

const VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    max-width: 100%;
    max-height: 480px;
  }

  iframe {
    width: 100%;
    height: 380px;
    border: none;

    @media (min-width: 768px) {
      height: 420px;
    }
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
  overflow: hidden;
  margin-bottom: ${spacing[6]};
`;

const SpecsSectionTitle = styled.h3`
  margin: 0;
  padding: ${spacing[5]} ${spacing[6]};
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  border-bottom: 2px solid var(--color-neutral-200, ${colors.neutral[200]});
  background: var(--color-neutral-50, ${colors.neutral[50]});
`;

const SpecsTable = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
`;

const SpecRow = styled.div<{ $even?: boolean }>`
  display: table-row;
  background: ${(p: any) => p.$even
    ? 'var(--color-neutral-50, ' + colors.neutral[50] + ')'
    : 'var(--color-neutral-0, ' + colors.neutral[0] + ')'};

  &:hover {
    background: var(--color-primary-50, ${colors.primary.light}12);
  }

  ${media.mobile} {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
    padding: ${spacing[3]} ${spacing[4]};
  }
`;

const SpecCellLabel = styled.div`
  display: table-cell;
  width: 35%;
  padding: ${spacing[3]} ${spacing[5]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-secondary, ${colors.neutral[600]});
  border-bottom: 1px solid var(--color-neutral-100, ${colors.neutral[100]});
  border-right: 1px solid var(--color-neutral-100, ${colors.neutral[100]});
  vertical-align: middle;

  ${media.mobile} {
    display: block;
    width: 100%;
    padding: 0 0 ${spacing[1]} 0;
    font-size: ${typography.fontSize.xs};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: none;
  }
`;

const SpecCellValue = styled.div`
  display: table-cell;
  padding: ${spacing[3]} ${spacing[5]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: var(--color-text-primary, ${colors.neutral[900]});
  border-bottom: 1px solid var(--color-neutral-100, ${colors.neutral[100]});
  vertical-align: middle;

  ${media.mobile} {
    display: block;
    padding: 0;
    border: none;
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
  const [reviewsKey, setReviewsKey] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);
  const [activeMedia, setActiveMedia] = useState(0);
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

  // Build media items array (images + videos)
  const mediaItems: { type: 'image' | 'video'; src: string }[] = [];
  const productImages = product?.images?.length ? product.images : (product?.image ? [product.image] : []);
  productImages.forEach((img: string) => mediaItems.push({ type: 'image', src: convertGoogleDriveUrl(img) }));
  (product?.videos || []).forEach((v: string) => mediaItems.push({ type: 'video', src: v }));

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
    return match ? match[1] : null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
  };

  const goMedia = (dir: number) => {
    if (mediaItems.length <= 1) return;
    setActiveMedia((prev) => (prev + dir + mediaItems.length) % mediaItems.length);
  };

  // Build spec entries
  const specEntries: { label: string; value: React.ReactNode }[] = [];
  if (product) {
    if (product.material) specEntries.push({ label: 'Material', value: product.material });
    if (product.finish) specEntries.push({ label: 'Finish', value: product.finish });
    if (product.color) specEntries.push({ label: 'Color', value: product.color });
    if (product.specifications?.thickness) specEntries.push({ label: 'Thickness', value: product.specifications.thickness });
    if (product.specifications?.weight) specEntries.push({ label: 'Weight', value: product.specifications.weight });
    if (product.specifications?.waterAbsorption) specEntries.push({ label: 'Water Absorption', value: product.specifications.waterAbsorption });
    if (product.specifications?.mohs) specEntries.push({ label: 'Mohs Hardness', value: product.specifications.mohs });
    if (product.specifications) {
      const reserved = ['thickness', 'weight', 'waterAbsorption', 'mohs'];
      Object.entries(product.specifications).forEach(([k, v]) => {
        if (!reserved.includes(k) && v) {
          specEntries.push({ label: k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()), value: String(v) });
        }
      });
    }
    if (product.customFilters) {
      Object.entries(product.customFilters).forEach(([key, val]) => {
        if (val) specEntries.push({ label: key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), value: String(val) });
      });
    }
    if (product.sizes && product.sizes.length > 0) {
      specEntries.push({
        label: 'Available Sizes',
        value: (
          <SizeBadges>
            {product.sizes.map((s: string) => <SizeBadge key={s}>{s}</SizeBadge>)}
          </SizeBadges>
        )
      });
    }
  }

  const noImageSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
  const videoThumbSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect fill='%23333' width='64' height='64'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23fff' font-size='24'%3E▶%3C/text%3E%3C/svg%3E";

  return (
    <Container>
      <BackButton to="/catalog">
        <ArrowLeft24Filled /> Back to Products
      </BackButton>

      {/* Row 1: Image/Video Carousel + Product Details */}
      <ProductWrapper>
        <CarouselContainer>
          <MainMediaBox>
            {mediaItems.length > 1 && (
              <CarouselNav $dir="left" onClick={() => goMedia(-1)}>‹</CarouselNav>
            )}

            {mediaItems.length === 0 ? (
              <img src={noImageSvg} alt="No image available" />
            ) : mediaItems[activeMedia]?.type === 'image' ? (
              <img
                src={mediaItems[activeMedia].src}
                alt={`${product.title} - ${activeMedia + 1}`}
                onError={(e) => { (e.target as HTMLImageElement).src = noImageSvg; }}
              />
            ) : (
              <VideoPlayer>
                {getYouTubeId(mediaItems[activeMedia].src) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(mediaItems[activeMedia].src)}`}
                    title="Product video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video controls src={mediaItems[activeMedia].src}>
                    Your browser does not support video playback.
                  </video>
                )}
              </VideoPlayer>
            )}

            {mediaItems.length > 1 && (
              <CarouselNav $dir="right" onClick={() => goMedia(1)}>›</CarouselNav>
            )}
          </MainMediaBox>

          {mediaItems.length > 1 && (
            <ThumbnailStrip>
              {mediaItems.map((item, idx) => (
                <Thumbnail
                  key={idx}
                  $active={idx === activeMedia}
                  $isVideo={item.type === 'video'}
                  onClick={() => setActiveMedia(idx)}
                >
                  {item.type === 'image' ? (
                    <img src={item.src} alt={`Thumb ${idx + 1}`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <img src={getYouTubeThumbnail(item.src) || videoThumbSvg} alt="Video" />
                  )}
                </Thumbnail>
              ))}
            </ThumbnailStrip>
          )}
        </CarouselContainer>

        <DetailsContainer>
          <Category color="informative" appearance="outline">
            {product.category?.toUpperCase()}
          </Category>

          <Title>{product.title}</Title>

          {product.showPriceInListing !== false && product.price > 0 && (
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

      {/* Row 2: Full-width Specifications Table */}
      {specEntries.length > 0 && (
        <SpecsSectionWrapper>
          <SpecsSectionTitle>📋 Product Specifications</SpecsSectionTitle>
          <SpecsTable>
            {specEntries.map((entry, idx) => (
              <SpecRow key={entry.label} $even={idx % 2 === 0}>
                <SpecCellLabel>{entry.label}</SpecCellLabel>
                <SpecCellValue>{entry.value}</SpecCellValue>
              </SpecRow>
            ))}
          </SpecsTable>
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