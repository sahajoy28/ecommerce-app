import { useState } from "react";
import styled from "styled-components";
import { Button, Text, Label, RadioGroup, Radio } from "@fluentui/react-components";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addOrder } from "../features/auth/authSlice";
import { clearCart } from "../features/cart/cartSlice";
import { ArrowLeft24Filled } from "@fluentui/react-icons";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0078d4;
  text-decoration: none;
  margin-bottom: 24px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1`
  margin: 0 0 32px 0;
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 12px;
  display: inline-block;
`;

const OrderItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OrderItemRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 100px 100px;
  gap: 16px;
  align-items: center;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 6px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const ItemCategory = styled.div`
  font-size: 12px;
  color: #666;
`;

const ItemQuantity = styled.div`
  font-size: 14px;
  color: #666;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  color: #0078d4;
  text-align: right;
`;

const AddressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AddressCard = styled.div<{ isSelected: boolean }>`
  border: 2px solid ${props => props.isSelected ? "#667eea" : "#e0e0e0"};
  border-radius: 6px;
  padding: 12px;
  background: ${props => props.isSelected ? "#f0f4ff" : "white"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
  }
`;

const AddressContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const AddressRadio = styled(Radio)``;

const AddressDetails = styled.div`
  flex: 1;
  font-size: 13px;
`;

const AddressName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const AddressText = styled.div`
  color: #666;
  line-height: 1.4;
`;

const OrderSummary = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Total = styled(SummaryRow)`
  font-weight: 700;
  font-size: 16px;
  border-top: 2px solid #e0e0e0;
  padding-top: 12px;
  margin-top: 16px;
`;

const PlaceOrderButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OrderPage = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    user?.addresses?.find(a => a.isDefault)?.id || user?.addresses?.[0]?.id || null
  );
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <Container>
        <PageTitle>Place Order</PageTitle>
        <EmptyState>
          <h2>Your cart is empty</h2>
          <p>Add items to your cart before placing an order</p>
          <Link to="/">
            <Button appearance="primary" style={{ marginTop: "16px" }}>
              Continue Shopping
            </Button>
          </Link>
        </EmptyState>
      </Container>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      const newOrder = {
        date: new Date().toISOString(),
        status: "processing" as const,
        total: total,
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price
        }))
      };

      dispatch(addOrder(newOrder));

      // Clear cart
      dispatch(clearCart());

      setIsProcessing(false);
      navigate("/account");
    }, 1500);
  };

  return (
    <Container>
      <BackButton to="/cart">
        <ArrowLeft24Filled /> Back to Cart
      </BackButton>

      <PageTitle>Place Order</PageTitle>

      <ContentWrapper>
        <MainContent>
          {/* Order Items */}
          <Section>
            <SectionTitle>Order Items ({cartItems.length})</SectionTitle>
            <OrderItemsContainer>
              {cartItems.map(item => (
                <OrderItemRow key={item.id}>
                  <ItemImage src={item.image} alt={item.title} />
                  <ItemInfo>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemCategory>{item.category}</ItemCategory>
                  </ItemInfo>
                  <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                  <ItemPrice>₹ {(item.price * item.quantity).toFixed(2)}</ItemPrice>
                </OrderItemRow>
              ))}
            </OrderItemsContainer>
          </Section>

          {/* Delivery Address */}
          <Section>
            <SectionTitle>Delivery Address</SectionTitle>
            {(user.addresses?.length || 0) > 0 ? (
              <AddressSection>
                <RadioGroup
                  value={selectedAddress || ""}
                  onChange={(_, data) => setSelectedAddress(data.value)}
                >
                  {user.addresses?.map(address => (
                    <AddressCard
                      key={address.id}
                      isSelected={selectedAddress === address.id}
                      onClick={() => setSelectedAddress(address.id)}
                    >
                      <AddressContent>
                        <AddressRadio value={address.id} />
                        <AddressDetails>
                          <AddressName>{address.name}</AddressName>
                          <AddressText>{address.address}</AddressText>
                          <AddressText>
                            {address.city}, {address.state} {address.zip}
                          </AddressText>
                          <AddressText>{address.phone}</AddressText>
                        </AddressDetails>
                      </AddressContent>
                    </AddressCard>
                  ))}
                </RadioGroup>
              </AddressSection>
            ) : (
              <EmptyState>
                <p>No addresses found. Please add an address in your account.</p>
                <Link to="/account">
                  <Button appearance="primary" style={{ marginTop: "12px" }}>
                    Add Address
                  </Button>
                </Link>
              </EmptyState>
            )}
          </Section>

          {/* Payment Method */}
          <Section>
            <SectionTitle>Payment Method</SectionTitle>
            <FormGroup>
              <RadioGroup
                value={paymentMethod}
                onChange={(_, data) => setPaymentMethod(data.value)}
              >
                <Radio value="card" label="Credit/Debit Card" />
                <Radio value="upi" label="UPI" />
                <Radio value="netbanking" label="Net Banking" />
                <Radio value="wallet" label="Digital Wallet" />
              </RadioGroup>
            </FormGroup>
          </Section>
        </MainContent>

        {/* Order Summary */}
        <OrderSummary>
          <SectionTitle style={{ marginBottom: "16px" }}>Order Summary</SectionTitle>

          <SummaryRow>
            <span>Subtotal</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </SummaryRow>

          <SummaryRow>
            <span>Tax (10%)</span>
            <span>₹ {tax.toFixed(2)}</span>
          </SummaryRow>

          <SummaryRow>
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : "₹ " + shipping.toFixed(2)}</span>
          </SummaryRow>

          <Total>
            <span>Total</span>
            <span>₹ {total.toFixed(2)}</span>
          </Total>

          {shipping === 0 && (
            <Text
              size={200}
              style={{
                color: "#16a34a",
                marginTop: "8px",
                textAlign: "center",
                fontWeight: "600"
              }}
            >
              ✓ Free Shipping!
            </Text>
          )}

          <PlaceOrderButton
            appearance="primary"
            size="large"
            onClick={handlePlaceOrder}
            disabled={isProcessing || !selectedAddress}
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </PlaceOrderButton>

          <Text
            size={200}
            style={{ marginTop: "12px", textAlign: "center", color: "#666" }}
          >
            {selectedAddress
              ? "✓ Ready to place order"
              : "Select address to continue"}
          </Text>
        </OrderSummary>
      </ContentWrapper>
    </Container>
  );
};
