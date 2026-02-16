import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Button, Text } from "@fluentui/react-components";
import { Delete24Filled } from "@fluentui/react-icons";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { removeFromCart } from "../features/cart/cartSlice";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing[8]} ${spacing[6]};
  width: 100%;

  ${media.tablet} {
    padding: ${spacing[6]} ${spacing[4]};
  }

  ${media.mobile} {
    padding: ${spacing[4]} ${spacing[3]};
  }
`;

const PageTitle = styled.h1`
  margin: 0 0 ${spacing[8]} 0;
  font-size: ${typography.fontSize["5xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: ${colors.neutral[900]};
  background: ${colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  ${media.mobile} {
    font-size: ${typography.fontSize["3xl"]};
    margin-bottom: ${spacing[6]};
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${spacing[16]} ${spacing[6]};
  background: ${colors.gradients.cool};
  border-radius: ${borderRadius.xl};
  color: ${colors.neutral[0]};

  h2 {
    color: ${colors.neutral[0]};
    margin-bottom: ${spacing[3]};
    font-size: ${typography.fontSize["3xl"]};
    font-weight: ${typography.fontWeight.bold};
  }

  p {
    color: ${colors.neutral[100]};
    margin-bottom: ${spacing[6]};
    font-size: ${typography.fontSize.lg};
  }

  button {
    background: ${colors.neutral[0]};
    color: ${colors.primary.main};
    font-weight: ${typography.fontWeight.bold};
  }

  ${media.mobile} {
    padding: ${spacing[8]} ${spacing[4]};

    h2 {
      font-size: ${typography.fontSize["2xl"]};
    }
  }
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: ${spacing[8]};

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const CartTable = styled.div`
  width: 100%;
  border: 1px solid ${colors.neutral[200]};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  box-shadow: ${shadows.sm};
`;

const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 120px 120px 60px;
  gap: ${spacing[4]};
  padding: ${spacing[4]};
  background: ${colors.neutral[50]};
  color: ${colors.neutral[600]};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};
  border-bottom: 1px solid ${colors.neutral[200]};

  ${media.mobile} {
    grid-template-columns: 80px 1fr 60px 60px;
    gap: ${spacing[2]};
    padding: ${spacing[3]};
    font-size: ${typography.fontSize.sm};
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 120px 120px 60px;
  gap: ${spacing[4]};
  align-items: center;
  padding: ${spacing[5]};
  border-bottom: 1px solid ${colors.neutral[200]};
  background: ${colors.neutral[0]};
  transition: all ${transitions.fast};

  &:hover {
    background: ${colors.neutral[50]};
    transform: translateY(-1px);
  }

  &:last-child {
    border-bottom: none;
  }

  ${media.mobile} {
    grid-template-columns: 80px 1fr 60px 60px;
    gap: ${spacing[2]};
    padding: ${spacing[3]};
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: ${borderRadius.md};
  background: ${colors.neutral[100]};
  padding: ${spacing[2]};

  ${media.mobile} {
    width: 80px;
    height: 80px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const ProductName = styled.div`
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[900]};
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.tight};

  ${media.mobile} {
    font-size: ${typography.fontSize.sm};
  }
`;

const ProductCategory = styled.div`
  color: ${colors.neutral[500]};
  font-size: ${typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wide};
  font-weight: ${typography.fontWeight.medium};
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[900]};

  ${media.mobile} {
    font-size: ${typography.fontSize.sm};
  }
`;

const PriceCell = styled.div`
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.fontSize.lg};
  background: ${colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: right;

  ${media.mobile} {
    font-size: ${typography.fontSize.base};
  }
`;

const RemoveButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[2]} !important;
  color: ${colors.error} !important;
  transition: all ${transitions.fast} !important;

  &:hover {
    background: #fee !important;
    transform: scale(1.1);
  }
`;

const CartSummary = styled.div`
  background: ${colors.neutral[0]};
  border: 1px solid ${colors.neutral[200]};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[6]};
  box-shadow: ${shadows.sm};
  position: sticky;
  top: 100px;

  ${media.tablet} {
    position: static;
    top: auto;
  }

  ${media.mobile} {
    padding: ${spacing[5]};
  }
`;

const SummaryTitle = styled.h2`
  margin: 0 0 ${spacing[5]} 0;
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral[900]};
`;

const SummaryItem = styled.div<{ highlighted?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[4]} 0;
  border-bottom: ${props => props.highlighted ? `2px solid ${colors.primary.light}` : `1px solid ${colors.neutral[200]}`};
  font-size: ${props => props.highlighted ? typography.fontSize.lg : typography.fontSize.base};
  font-weight: ${props => props.highlighted ? typography.fontWeight.bold : typography.fontWeight.medium};
  color: ${props => props.highlighted ? colors.primary.main : colors.neutral[900]};

  &:last-child {
    border-bottom: none;
  }

  span:last-child {
    text-align: right;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  margin-top: ${spacing[6]};
`;

const CheckoutButton = styled(Button)`
  width: 100%;
  padding: ${spacing[4]} ${spacing[6]} !important;
  background: ${colors.gradients.primary} !important;
  color: ${colors.neutral[0]} !important;
  font-weight: ${typography.fontWeight.bold} !important;
  font-size: ${typography.fontSize.base} !important;
  transition: all ${transitions.fast} !important;
  border-radius: ${borderRadius.md} !important;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.lg} !important;
  }
`;

const ContinueButton = styled(Button)`
  width: 100%;
  padding: ${spacing[3]} ${spacing[6]} !important;
  font-weight: ${typography.fontWeight.semibold} !important;
  border-radius: ${borderRadius.md} !important;
  transition: all ${transitions.fast} !important;
`;

export const CartPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  const authUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    navigate("/order");
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <CartContainer>
        <PageTitle>🛒 Your Shopping Cart</PageTitle>
        <EmptyCart>
          <h2>Cart is Empty</h2>
          <p>Browse our amazing collection and add items to your cart</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button appearance="primary">Continue Shopping</Button>
          </Link>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <PageTitle>🛒 Your Shopping Cart</PageTitle>
      
      <CartContent>
        <CartTable>
          <CartHeader>
            <div>Image</div>
            <div>Product</div>
            <div>Quantity</div>
            <div>Price</div>
            <div></div>
          </CartHeader>
          {items.map((item) => (
            <CartItem key={item.id}>
              <ProductImage src={item.image} alt={item.title} />
              <ProductInfo>
                <ProductName>{item.title}</ProductName>
                <ProductCategory>{item.category}</ProductCategory>
              </ProductInfo>
              <QuantityControl>
                {item.quantity}x
              </QuantityControl>
              <PriceCell>
                ${(item.price * item.quantity).toFixed(2)}
              </PriceCell>
              <RemoveButton
                appearance="subtle"
                icon={<Delete24Filled />}
                onClick={() => dispatch(removeFromCart(item.id))}
                title="Remove from cart"
              />
            </CartItem>
          ))}
        </CartTable>

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryItem>
            <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Shipping</span>
            <span>{shipping === 0 ? '🎉 FREE' : `$${shipping.toFixed(2)}`}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem highlighted>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </SummaryItem>

          <ActionButtons>
            <CheckoutButton appearance="primary" onClick={handleCheckout}>
              Proceed to Checkout
            </CheckoutButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ContinueButton appearance="secondary">
                Continue Shopping
              </ContinueButton>
            </Link>
          </ActionButtons>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};