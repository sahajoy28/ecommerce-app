import { useState } from "react";
import styled from "styled-components";
import { Button, Input, Label, Text, Dialog, DialogSurface, DialogBody, DialogTitle, DialogActions } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, addAddress, removeAddress, setDefaultAddress } from "../features/auth/authSlice";
import { Delete24Filled, CheckmarkCircle24Filled } from "@fluentui/react-icons";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #e0e0e0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const LogoutButton = styled(Button)``;

const TabSection = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 12px;
  display: inline-block;
`;

const UserInfoCard = styled.div`
  background: white;
  border: 1px solid #f5f5f5;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #666;
  min-width: 120px;
`;

const InfoValue = styled.span`
  color: #333;
`;

const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const AddressCard = styled.div<{ isDefault: boolean }>`
  border: 1px solid ${props => props.isDefault ? "#667eea" : "#f5f5f5"};
  box-shadow: ${props => props.isDefault ? "0 4px 12px rgba(102, 126, 234, 0.1)" : "0 2px 8px rgba(0,0,0,0.02)"};
  border-radius: 6px;
  padding: 12px;
  background: ${props => props.isDefault ? "#f8faff" : "white"};
  position: relative;
`;

const DefaultBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const AddressInfo = styled.div`
  margin-bottom: 12px;
`;

const AddressName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const AddressDetail = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 1.4;
`;

const AddressActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ActionButton = styled(Button)``;

const OrdersGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const OrderCard = styled.div`
  border: 1px solid #f5f5f5;
  border-radius: 6px;
  padding: 12px;
  background: white;
  transition: box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);

  &:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.04);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f5f5f5;
`;

const OrderId = styled.span`
  font-weight: 600;
  color: #333;
`;

const OrderStatus = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case "delivered":
        return "#dcfce7";
      case "shipped":
        return "#bfdbfe";
      case "processing":
        return "#fef08a";
      case "pending":
        return "#fee2e2";
      default:
        return "#e0e0e0";
    }
  }};
  color: ${props => {
    switch (props.status) {
      case "delivered":
        return "#16a34a";
      case "shipped":
        return "#1e40af";
      case "processing":
        return "#c77d11";
      case "pending":
        return "#dc2626";
      default:
        return "#666";
    }
  }};
`;

const OrderDetails = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
`;

const OrderItems = styled.div`
  background: #f5f5f5;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: #f5f5f5;
  border-radius: 8px;
  color: #666;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const AccountPage = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.city || !newAddress.zip) {
      alert("Please fill in all required fields");
      return;
    }

    dispatch(addAddress(newAddress));
    setNewAddress({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false
    });
    setDialogOpen(false);
  };

  const handleRemoveAddress = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      dispatch(removeAddress(id));
    }
  };

  const handleSetDefault = (id: string) => {
    dispatch(setDefaultAddress(id));
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>My Account</Title>
          <Text style={{ color: "#666" }}>Welcome, {user.name}</Text>
        </div>
        <LogoutButton appearance="secondary" onClick={handleLogout}>
          Logout
        </LogoutButton>
      </Header>

      {/* User Profile Section */}
      <TabSection>
        <SectionTitle>Profile Information</SectionTitle>
        <UserInfoCard>
          <InfoRow>
            <InfoLabel>Name:</InfoLabel>
            <InfoValue>{user.name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue>{user.email}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>User ID:</InfoLabel>
            <InfoValue>{user.id}</InfoValue>
          </InfoRow>
        </UserInfoCard>
      </TabSection>

      {/* Addresses Section */}
      <TabSection>
        <SectionTitle>Saved Addresses</SectionTitle>
        {user.addresses.length > 0 ? (
          <AddressGrid>
            {user.addresses.map(address => (
              <AddressCard key={address.id} isDefault={address.isDefault}>
                {address.isDefault && (
                  <DefaultBadge>
                    <CheckmarkCircle24Filled /> Default
                  </DefaultBadge>
                )}
                <AddressInfo>
                  <AddressName>{address.name}</AddressName>
                  <AddressDetail>{address.address}</AddressDetail>
                  <AddressDetail>{address.city}, {address.state} {address.zip}</AddressDetail>
                  <AddressDetail>{address.phone}</AddressDetail>
                </AddressInfo>
                <AddressActions>
                  {!address.isDefault && (
                    <ActionButton
                      appearance="subtle"
                      size="small"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </ActionButton>
                  )}
                  <ActionButton
                    appearance="subtle"
                    size="small"
                    icon={<Delete24Filled />}
                    onClick={() => handleRemoveAddress(address.id)}
                  />
                </AddressActions>
              </AddressCard>
            ))}
          </AddressGrid>
        ) : (
          <EmptyState>No addresses saved yet</EmptyState>
        )}
        <Button appearance="primary" onClick={() => setDialogOpen(true)} style={{ marginTop: "16px" }}>
          Add New Address
        </Button>
      </TabSection>

      {/* Orders Section */}
      <TabSection>
        <SectionTitle>Order History</SectionTitle>
        {user.orders.length > 0 ? (
          <OrdersGrid>
            {user.orders.map(order => (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <OrderId>Order {order.id}</OrderId>
                  <OrderStatus status={order.status}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </OrderStatus>
                </OrderHeader>
                <OrderDetails>
                  <div>Order Date: {new Date(order.date).toLocaleDateString()}</div>
                </OrderDetails>
                <OrderItems>
                  {order.items.map((item, idx) => (
                    <OrderItem key={idx}>
                      <span>{item.title} x {item.quantity}</span>
                      <span>₹ {(item.price * item.quantity).toFixed(2)}</span>
                    </OrderItem>
                  ))}
                </OrderItems>
                <OrderTotal>
                  Total: ₹ {order.total.toFixed(2)}
                </OrderTotal>
              </OrderCard>
            ))}
          </OrdersGrid>
        ) : (
          <EmptyState>No orders yet. Start shopping!</EmptyState>
        )}
      </TabSection>

      {/* Add Address Dialog */}
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Add New Address</DialogTitle>
            <div style={{ padding: "16px 0" }}>
              <FormGroup>
                <Label htmlFor="addr-name" weight="semibold">Full Name *</Label>
                <StyledInput
                  id="addr-name"
                  placeholder="Enter full name"
                  value={newAddress.name}
                  onChange={(e, data) => setNewAddress(prev => ({ ...prev, name: data.value }))}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="addr-email" weight="semibold">Email</Label>
                <StyledInput
                  id="addr-email"
                  type="email"
                  placeholder="Enter email"
                  value={newAddress.email}
                  onChange={(e, data) => setNewAddress(prev => ({ ...prev, email: data.value }))}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="addr-phone" weight="semibold">Phone Number *</Label>
                <StyledInput
                  id="addr-phone"
                  placeholder="Enter phone number"
                  value={newAddress.phone}
                  onChange={(e, data) => setNewAddress(prev => ({ ...prev, phone: data.value }))}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="addr-address" weight="semibold">Address *</Label>
                <StyledInput
                  id="addr-address"
                  placeholder="Enter address"
                  value={newAddress.address}
                  onChange={(e, data) => setNewAddress(prev => ({ ...prev, address: data.value }))}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="addr-city" weight="semibold">City *</Label>
                <StyledInput
                  id="addr-city"
                  placeholder="Enter city"
                  value={newAddress.city}
                  onChange={(e, data) => setNewAddress(prev => ({ ...prev, city: data.value }))}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="addr-state" weight="semibold">State</Label>
                <StyledInput
                  id="addr-state"
                  placeholder="Enter state"
                  value={newAddress.state}
                  onChange={(e, data) => setNewAddress(prev => ({ ...prev, state: data.value }))}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="addr-zip" weight="semibold">ZIP Code *</Label>
                <StyledInput
                  id="addr-zip"
                  placeholder="Enter ZIP code"
                  value={newAddress.zip}
                  onChange={(e, data) => setNewAddress(prev => ({ ...prev, zip: data.value }))}
                />
              </FormGroup>
            </div>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button appearance="primary" onClick={handleAddAddress}>
                Save Address
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </Container>
  );
};
