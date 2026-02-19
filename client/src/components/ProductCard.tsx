import { useNavigate } from "react-router-dom";
import { Card, Button } from "@fluentui/react-components";
import styled from "styled-components";
import { Product } from "../types/product";
import { Toast } from "./Toast";
import { RatingDisplay } from "./RatingDisplay";
import { useState } from "react";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";
import { convertGoogleDriveUrl } from "../utils/googleDriveUrl";

const StyledCard = styled(Card)`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: all ${transitions.base};
  cursor: pointer;
  height: 100%;
  border: 1px solid var(--color-neutral-200, #f0f0f0);
  overflow: hidden;
  border-radius: 6px;
  background: var(--color-neutral-0, ${colors.neutral[0]});
  color: var(--color-text-primary, ${colors.neutral[900]});

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
    border-color: var(--color-neutral-200, ${colors.neutral[200]});
  }

  &:active {
    box-shadow: ${shadows.md};
  }
`;

const ImageContainer = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary, #fafafa);
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s ease;
`;

const OutOfStockBadge = styled.div`
  position: absolute;
  top: ${spacing[2]};
  right: ${spacing[2]};
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border-radius: ${borderRadius.md};
  padding: ${spacing[1]} ${spacing[2]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  z-index: 10;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  padding: ${spacing[3]};
  transition: transform ${transitions.base};

  ${StyledCard}:hover & {
    transform: scale(1.08);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  flex: 1;
  padding: ${spacing[4]} ${spacing[3]};
`;

const Title = styled.h3`
  cursor: pointer;
  transition: color ${transitions.fast};
  color: ${colors.neutral[900]};
  font-weight: ${typography.fontWeight.medium};
  line-height: ${typography.lineHeight.tight};
  font-size: ${typography.fontSize.sm};
  margin: 0;

  &:hover {
    color: ${colors.primary.main};
  }

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.mobile} {
    font-size: ${typography.fontSize.xs};
  }
`;

const Category = styled.div`
  font-size: ${typography.fontSize.xs};
  color: ${colors.neutral[500]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing[1]};
`;

const Description = styled.p`
  font-size: ${typography.fontSize.xs};
  color: ${colors.neutral[500]};
  margin: ${spacing[2]} 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceAndRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

const PriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacing[2]};
`;

const Price = styled.div`
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.fontSize.xl};
  color: ${colors.secondary.main};
`;

const OriginalPrice = styled.span`
  font-weight: ${typography.fontWeight.normal};
  color: ${colors.neutral[500]};
  text-decoration: line-through;
  font-size: ${typography.fontSize.sm};
`;

const AddButton = styled(Button)`
  width: 100%;
  padding: ${spacing[2]} ${spacing[3]} !important;
  background: ${colors.secondary.main} !important;
  color: ${colors.neutral[900]} !important;
  border: none !important;
  border-radius: ${borderRadius.md} !important;
  font-weight: ${typography.fontWeight.semibold} !important;
  font-size: ${typography.fontSize.sm} !important;
  transition: all ${transitions.fast} !important;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    background: #ff9500 !important;
    box-shadow: ${shadows.md};
  }

  &:active {
    background: #e68900 !important;
    transform: scale(0.98);
  }

  ${media.mobile} {
    padding: ${spacing[2]} ${spacing[2]} !important;
    font-size: ${typography.fontSize.xs} !important;
  }
`;

const OutOfStockButton = styled(Button)`
  width: 100%;
  padding: ${spacing[2]} ${spacing[3]} !important;
  background: ${colors.neutral[300]} !important;
  color: ${colors.neutral[600]} !important;
  border: none !important;
  border-radius: ${borderRadius.md} !important;
  font-weight: ${typography.fontWeight.semibold} !important;
  font-size: ${typography.fontSize.sm} !important;
  cursor: not-allowed;
  margin-top: auto;

  ${media.mobile} {
    padding: ${spacing[2]} ${spacing[2]} !important;
    font-size: ${typography.fontSize.xs} !important;
  }
`;

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [imageError, setImageError] = useState(false);

  const isOutOfStock = (product.stock != null && product.stock <= 0) || (product.quantity != null && product.quantity <= 0);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleEnquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  // Calculate discount
  const originalPrice = product.price * 1.2;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <>
      <StyledCard onClick={handleCardClick}>
        <ImageContainer>
          {isOutOfStock && <OutOfStockBadge>Out of Stock</OutOfStockBadge>}
          {!imageError && product.image ? (
            <Image 
              src={convertGoogleDriveUrl(product.image)} 
              alt={product.title}
              onError={handleImageError}
            />
          ) : (
            <Image 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E"
              alt="No image available"
            />
          )}
        </ImageContainer>
        <ContentContainer>
          <Category>{product.category}</Category>
          <Title title={product.title}>
            {product.title}
          </Title>

          <PriceAndRating>
            <PriceSection>
              <Price>₹{product.price.toFixed(0)}</Price>
              {originalPrice > product.price && (
                <OriginalPrice>₹{originalPrice.toFixed(0)}</OriginalPrice>
              )}
            </PriceSection>
            <RatingDisplay rating={product.rating} count={product.reviewCount} size="12px" />
          </PriceAndRating>

          <Description>{product.description}</Description>

          {isOutOfStock ? (
            <OutOfStockButton appearance="secondary" disabled>
              Out of Stock
            </OutOfStockButton>
          ) : (
            <AddButton
              appearance="primary"
              onClick={handleEnquire}
            >
              Enquire Now
            </AddButton>
          )}
        </ContentContainer>
      </StyledCard>
      
      {showToast && (
        <Toast 
          message={toastMessage}
          type="success" 
          duration={2000}
        />
      )}
    </>
  );
};