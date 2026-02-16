import { useNavigate } from "react-router-dom";
import { Card, Button } from "@fluentui/react-components";
import styled from "styled-components";
import { Product } from "../types/product";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist, selectWishlist } from "../features/wishlist/wishlistSlice";
import { Toast } from "./Toast";
import { RatingDisplay } from "./RatingDisplay";
import { useState } from "react";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const StyledCard = styled(Card)`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: all ${transitions.base};
  cursor: pointer;
  height: 100%;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  border-radius: 6px;
  background: ${colors.neutral[0]};

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
    border-color: ${colors.neutral[200]};
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
  background: #fafafa;
  overflow: hidden;
  position: relative;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: ${spacing[2]};
  right: ${spacing[2]};
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: ${borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${typography.fontSize.xl};
  transition: all ${transitions.fast};
  box-shadow: ${shadows.md};
  z-index: 10;

  &:hover {
    background: ${colors.neutral[0]};
    transform: scale(1.15);
    box-shadow: ${shadows.lg};
  }

  &:active {
    transform: scale(0.95);
  }
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

export const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const cartItems = useAppSelector(state => state.cart.items);
  const wishlistItems = useAppSelector(selectWishlist);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    
    const currentItem = cartItems.find(item => item.id === product.id);
    const quantity = currentItem ? currentItem.quantity + 1 : 1;
    
    setToastMessage("Added to cart");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      setToastMessage("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      setToastMessage("Added to wishlist");
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Calculate discount
  const originalPrice = product.price * 1.2;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <>
      <StyledCard onClick={handleCardClick}>
        <ImageContainer>
          <WishlistButton 
            onClick={handleWishlistToggle}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist ? "❤️" : "🤍"}
          </WishlistButton>
          <Image src={product.image} alt={product.title} />
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

          <AddButton
            appearance="primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </AddButton>
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