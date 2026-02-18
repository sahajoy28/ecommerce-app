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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0078d4;
  text-decoration: none;
  margin-bottom: 24px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: #005a9c;
    gap: 12px;
  }
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 24px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%);
  border-radius: 12px;
  padding: 40px;
  height: fit-content;
  position: sticky;
  top: 120px;

  @media (max-width: 768px) {
    position: static;
    top: auto;
  }

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Category = styled(Badge)`
  width: fit-content;
  padding: 6px 12px;
  font-weight: 600;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Price = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #0078d4;
  background: linear-gradient(135deg, #0078d4 0%, #106ebe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.8;
  margin: 0;
  font-size: 15px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #0078d4;
`;

const AvailabilityBox = styled.div`
  padding: 16px;
  background: #f0f9ff;
  border-radius: 8px;
  border-left: 4px solid #10b981;
`;

const AvailabilityLabel = styled(Text)`
  display: block;
  margin-bottom: 8px;
`;

const AvailabilityStatus = styled(Text)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;

  @media (max-width: 640px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;

  h2 {
    font-size: 24px;
    margin-bottom: 12px;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 24px;
  }
`;

const RelatedSection = styled.div`
  margin-top: 48px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  border-bottom: 3px solid #0078d4;
  padding-bottom: 12px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const RelatedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;

  @media (max-width: 640px) {
    gap: 12px;
  }
`;

const EmptyRelated = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 14px;
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