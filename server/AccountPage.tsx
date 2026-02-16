import { useState } from "react";
import styled from "styled-components";
import { Button, Input, Label, Text, Dialog, DialogSurface, DialogBody, DialogTitle, DialogActions } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, addAddress, removeAddress, setDefaultAddress } from "../features/auth/authSlice";
import { selectWishlist } from "../features/wishlist/wishlistSlice";
import { ProductCard } from "../components/ProductCard";
import { 
  Delete24Filled, 
  CheckmarkCircle24Filled, 
  Person24Filled, 
  Box24Filled, 
  Location24Filled, 
  Heart24Filled, 
  Settings24Filled, 
  SignOut24Filled,
  Add24Filled
} from "@fluentui/react-icons";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const PageContainer = styled.div`
  background-color: ${colors.neutral[50]};
  min-height: 100vh;
  padding: ${spacing[8]} 0;

  ${media.mobile} {
    padding: ${spacing[4]} 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing[6]};
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: ${spacing[8]};

  ${media.tablet} {
    grid-template-columns: 1fr;
    padding: 0 ${spacing[4]};
    gap: ${spacing[6]};
  }
`;

// Sidebar Styles
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const UserProfileSummary = styled.div`
  background: ${colors.neutral[0]};
  padding: ${spacing[6]};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.neutral[200]};
  text-align: center;
  box-shadow: ${shadows.sm};

  h3 {
    margin: ${spacing[2]} 0 0;
    color: ${colors.neutral[900]};
    font-size: ${typography.fontSize.lg};
  }

  p {
    margin: ${spacing[1]} 0 0;
    color: ${colors.neutral[500]};
    font-size: ${typography.fontSize.sm};
  }
`;

const AvatarPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  background: ${colors.gradients.primary};
  border-radius: ${borderRadius.full};
  margin: 0 auto ${spacing[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.bold};
`;

const NavMenu = styled.nav`
  background: ${colors.neutral[0]};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.neutral[200]};
  overflow: hidden;
  box-shadow: ${shadows.sm};
`;

const NavItem = styled.button<{ isActive?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[4]};
  border: none;
  background: ${props => props.isActive ? colors.neutral[50] : 'transparent'};
  color: ${props => props.isActive ? colors.primary.main : colors.neutral[700]};
  font-weight: ${props => props.isActive ? typography.fontWeight.bold : typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${transitions.fast};
  text-align: left;
  border-left: 3px solid ${props => props.isActive ? colors.primary.main : 'transparent'};

  &:hover {
    background: ${colors.neutral[50]};
    color: ${colors.primary.main};
  }

  svg {
    font-size: 20px;
  }
`;

// Main Content Styles
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

const SectionCard = styled.div`
  background: ${colors.neutral[0]};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.neutral[200]};
  padding: ${spacing[6]};
  box-shadow: ${shadows.sm};

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing[6]};
  padding-bottom: ${spacing[4]};
  border-bottom: 1px solid ${colors.neutral[200]};

  h2 {
    margin: 0;
    font-size: ${typography.fontSize.xl};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.neutral[900]};
  }
`;

const UserInfoCard = styled.div`
  background: ${colors.neutral[50]};
  border: 1px solid ${colors.neutral[200]};
  padding: ${spacing[5]};
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing[4]};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[3]} 0;
  border-bottom: 1px solid ${colors.neutral[200]};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[600]};
`;

const InfoValue = styled.span`
  color: ${colors.neutral[900]};
  font-weight: ${typography.fontWeight.medium};
`;

const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${spacing[4]};
  margin-bottom: ${spacing[5]};
`;

const AddressCard = styled.div<{ isDefault: boolean }>`
  border: 1px solid ${props => props.isDefault ? colors.primary.main : colors.neutral[200]};
  box-shadow: ${props => props.isDefault ? shadows.md : shadows.sm};
  border-radius: ${borderRadius.md};
  padding: ${spacing[4]};
  background: ${props => props.isDefault ? colors.neutral[50] : colors.neutral[0]};
  position: relative;
  transition: all ${transitions.fast};

  &:hover {
    border-color: ${colors.primary.main};
    transform: translateY(-2px);
  }
`;

const DefaultBadge = styled.div`
  position: absolute;
  top: ${spacing[3]};
  right: ${spacing[3]};
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  background: ${colors.primary.main};
  color: ${colors.neutral[0]};
  padding: 4px 8px;
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.bold};
`;

const AddressInfo = styled.div`
  margin-bottom: ${spacing[3]};
`;

const AddressName = styled.div`
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral[900]};
  margin-bottom: ${spacing[1]};
`;

const AddressDetail = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral[600]};
  line-height: 1.4;
`;

const AddressActions = styled.div`
  display: flex;
  gap: ${spacing[2]};
  margin-top: ${spacing[3]};
  padding-top: ${spacing[3]};
  border-top: 1px solid ${colors.neutral[200]};
`;

const ActionButton = styled(Button)``;

const OrdersGrid = styled.div`
  display: grid;
  gap: ${spacing[4]};
`;

const OrderCard = styled.div`
  border: 1px solid ${colors.neutral[200]};
  border-radius: ${borderRadius.md};
  padding: ${spacing[4]};
  background: ${colors.neutral[0]};
  transition: all ${transitions.fast};
  box-shadow: ${shadows.sm};

  &:hover {
    box-shadow: ${shadows.md};
    border-color: ${colors.neutral[300]};
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing[3]};
  padding-bottom: ${spacing[3]};
  border-bottom: 1px solid ${colors.neutral[200]};
`;

const OrderId = styled.span`
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral[900]};
`;

const OrderStatus = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.bold};
  text-transform: uppercase;
  background: ${props => {
    switch (props.status) {
      case "delivered":
        return colors.success.light;
      case "shipped":
        return "#bfdbfe";
      case "processing":
        return "#fef08a";
      case "pending":
        return colors.error.light;
      default:
        return colors.neutral[200];
    }
  }};
  color: ${props => {
    switch (props.status) {
      case "delivered":
        return colors.success.main;
      case "shipped":
        return "#1e40af";
      case "processing":
        return "#c77d11";
      case "pending":
        return colors.error.main;
      default:
        return colors.neutral[600];
    }
  }};
`;

const OrderDetails = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral[600]};
  margin-bottom: ${spacing[3]};
`;

const OrderItems = styled.div`
  background: ${colors.neutral[50]};
  padding: ${spacing[3]};
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing[3]};
  max-height: 200px;
  overflow-y: auto;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${spacing[2]};
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral[800]};

  &:last-child {
    margin-bottom: 0;
  }
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral[900]};
  font-size: ${typography.fontSize.base};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing[8]} ${spacing[4]};
  background: ${colors.neutral[50]};
  border-radius: ${borderRadius.lg};
  color: ${colors.neutral[500]};
  border: 1px dashed ${colors.neutral[300]};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${spacing[4]};
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[4]} 0;
  border-bottom: 1px solid ${colors.neutral[200]};

  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  h4 {
    margin: 0 0 ${spacing[1]} 0;
    color: ${colors.neutral[900]};
  }
  p {
    margin: 0;
    color: ${colors.neutral[500]};
    font-size: ${typography.fontSize.sm};
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colors.neutral[300]};
    transition: .4s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: ${colors.primary.main};
  }

  input:checked + span:before {
    transform: translateX(24px);
  }
`;

export const AccountPage = () => {
  const user = useAppSelector(state => state.auth.user);
  const wishlistItems = useAppSelector(selectWishlist);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("profile");
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

  // Settings state (mock)
  const [settings, setSettings] = useState({
    emailNotifs: true,
    smsNotifs: false,
    marketing: true,
    darkMode: false
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

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <SectionCard>
            <SectionHeader>
              <h2>Profile Information</h2>
            </SectionHeader>
            <UserInfoCard>
              <InfoRow>
                <InfoLabel>Full Name</InfoLabel>
                <InfoValue>{user.name}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Email Address</InfoLabel>
                <InfoValue>{user.email}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Member Since</InfoLabel>
                <InfoValue>{new Date().getFullYear()}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>User ID</InfoLabel>
                <InfoValue>{user.id}</InfoValue>
              </InfoRow>
            </UserInfoCard>
            <Button appearance="secondary">Edit Profile</Button>
          </SectionCard>
        );

      case "addresses":
        return (
          <SectionCard>
            <SectionHeader>
              <h2>Saved Addresses</h2>
              <Button 
                icon={<Add24Filled />} 
                appearance="primary" 
                onClick={() => setDialogOpen(true)}
              >
                Add New
              </Button>
            </SectionHeader>
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
                          Set Default
                        </ActionButton>
                      )}
                      <ActionButton
                        appearance="subtle"
                        size="small"
                        icon={<Delete24Filled />}
                        onClick={() => handleRemoveAddress(address.id)}
                        style={{ color: colors.error.main }}
                      />
                    </AddressActions>
                  </AddressCard>
                ))}
              </AddressGrid>
            ) : (
              <EmptyState>No addresses saved yet</EmptyState>
            )}
          </SectionCard>
        );

      case "orders":
        return (
          <SectionCard>
            <SectionHeader>
              <h2>Order History</h2>
            </SectionHeader>
            {user.orders.length > 0 ? (
              <OrdersGrid>
                {user.orders.map(order => (
                  <OrderCard key={order.id}>
                    <OrderHeader>
                      <OrderId>Order #{order.id}</OrderId>
                      <OrderStatus status={order.status}>
                        {order.status}
                      </OrderStatus>
                    </OrderHeader>
                    <OrderDetails>
                      <div>Placed on {new Date(order.date).toLocaleDateString()}</div>
                    </OrderDetails>
                    <OrderItems>
                      {order.items.map((item, idx) => (
                        <OrderItem key={idx}>
                          <span>{item.title} <span style={{color: colors.neutral[500]}}>x{item.quantity}</span></span>
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
          </SectionCard>
        );

      case "wishlist":
        return (
          <SectionCard>
            <SectionHeader>
              <h2>My Wishlist ({wishlistItems.length})</h2>
            </SectionHeader>
            {wishlistItems.length > 0 ? (
              <WishlistGrid>
                {wishlistItems.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </WishlistGrid>
            ) : (
              <EmptyState>Your wishlist is empty.</EmptyState>
            )}
          </SectionCard>
        );

      case "settings":
        return (
          <SectionCard>
            <SectionHeader>
              <h2>Account Settings</h2>
            </SectionHeader>
            
            <SettingRow>
              <SettingInfo>
                <h4>Email Notifications</h4>
                <p>Receive updates about your orders and promotions</p>
              </SettingInfo>
              <ToggleSwitch>
                <input 
                  type="checkbox" 
                  checked={settings.emailNotifs} 
                  onChange={() => toggleSetting('emailNotifs')} 
                />
                <span></span>
              </ToggleSwitch>
            </SettingRow>

            <SettingRow>
              <SettingInfo>
                <h4>SMS Notifications</h4>
                <p>Get delivery updates via SMS</p>
              </SettingInfo>
              <ToggleSwitch>
                <input 
                  type="checkbox" 
                  checked={settings.smsNotifs} 
                  onChange={() => toggleSetting('smsNotifs')} 
                />
                <span></span>
              </ToggleSwitch>
            </SettingRow>

            <SettingRow>
              <SettingInfo>
                <h4>Marketing Emails</h4>
                <p>Receive offers and newsletters</p>
              </SettingInfo>
              <ToggleSwitch>
                <input 
                  type="checkbox" 
                  checked={settings.marketing} 
                  onChange={() => toggleSetting('marketing')} 
                />
                <span></span>
              </ToggleSwitch>
            </SettingRow>

            <div style={{ marginTop: spacing[6], paddingTop: spacing[4], borderTop: `1px solid ${colors.neutral[200]}` }}>
              <h4 style={{ color: colors.error.main, marginBottom: spacing[2] }}>Danger Zone</h4>
              <Button appearance="outline" style={{ color: colors.error.main, borderColor: colors.error.main }}>
                Delete Account
              </Button>
            </div>
          </SectionCard>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        {/* Sidebar Navigation */}
        <Sidebar>
          <UserProfileSummary>
            <AvatarPlaceholder>
              {user.name.charAt(0).toUpperCase()}
            </AvatarPlaceholder>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </UserProfileSummary>

          <NavMenu>
            <NavItem 
              isActive={activeTab === "profile"} 
              onClick={() => setActiveTab("profile")}
            >
              <Person24Filled /> Profile
            </NavItem>
            <NavItem 
              isActive={activeTab === "orders"} 
              onClick={() => setActiveTab("orders")}
            >
              <Box24Filled /> Orders
            </NavItem>
            <NavItem 
              isActive={activeTab === "addresses"} 
              onClick={() => setActiveTab("addresses")}
            >
              <Location24Filled /> Addresses
            </NavItem>
            <NavItem 
              isActive={activeTab === "wishlist"} 
              onClick={() => setActiveTab("wishlist")}
            >
              <Heart24Filled /> Wishlist
            </NavItem>
            <NavItem 
              isActive={activeTab === "settings"} 
              onClick={() => setActiveTab("settings")}
            >
              <Settings24Filled /> Settings
            </NavItem>
            <div style={{ height: 1, background: colors.neutral[200], margin: '8px 0' }} />
            <NavItem onClick={handleLogout} style={{ color: colors.error.main }}>
              <SignOut24Filled /> Logout
            </NavItem>
          </NavMenu>
        </Sidebar>

        {/* Main Content Area */}
        <MainContent>
          {renderContent()}
        </MainContent>
      </ContentWrapper>

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
    </PageContainer>
  );
};
