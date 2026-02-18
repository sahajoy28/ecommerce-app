import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Input, Label, Text, Dialog, DialogSurface, DialogBody, DialogTitle, DialogActions, Tab, TabList } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { Delete24Filled, CheckmarkCircle24Filled, Heart24Filled, Heart24Regular } from "@fluentui/react-icons";
import { userAPI } from "../services/userAPI";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${spacing[8]};
  width: 100%;

  ${media.tablet} {
    padding: ${spacing[6]};
  }

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing[8]};
  padding-bottom: ${spacing[6]};
  border-bottom: 2px solid var(--color-neutral-200, ${colors.neutral[200]});
  flex-wrap: wrap;
  gap: ${spacing[4]};

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: ${spacing[6]};
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: var(--color-text-primary, ${colors.neutral[900]});

  ${media.mobile} {
    font-size: ${typography.fontSize["2xl"]};
  }
`;

const LogoutButton = styled(Button)`
  min-height: 44px;
  min-width: 120px;
`;

const TabSection = styled.div`
  margin-bottom: ${spacing[8]};

  ${media.mobile} {
    margin-bottom: ${spacing[6]};
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${spacing[5]} 0;
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  border-bottom: 2px solid var(--color-primary, ${colors.primary.main});
  padding-bottom: ${spacing[3]};
  display: inline-block;

  ${media.mobile} {
    font-size: ${typography.fontSize.xl};
  }
`;

const UserInfoCard = styled.div`
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  padding: ${spacing[4]};
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing[4]};
  box-shadow: ${shadows.sm};
  max-width: 70%;

  ${media.tablet} {
    max-width: 100%;
  }

  ${media.mobile} {
    max-width: 100%;
  }
`;

const FormCard = styled.div`
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  padding: ${spacing[6]};
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing[6]};
  box-shadow: ${shadows.sm};
  max-width: 70%;

  ${media.tablet} {
    max-width: 100%;
  }

  ${media.mobile} {
    max-width: 100%;
    padding: ${spacing[4]};
  }
`;

const FormTitle = styled.h3`
  margin: 0 0 ${spacing[4]} 0;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-primary, ${colors.neutral[900]});
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  margin-bottom: ${spacing[4]};

  label {
    font-weight: ${typography.fontWeight.semibold};
    color: var(--color-text-secondary, ${colors.neutral[600]});
    font-size: ${typography.fontSize.sm};
  }

  input,
  select {
    padding: ${spacing[2]} ${spacing[3]};
    border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
    border-radius: ${borderRadius.md};
    font-size: ${typography.fontSize.base};
    transition: border-color ${transitions.fast};

    &:focus {
      outline: none;
      border-color: var(--color-primary, ${colors.primary.main});
      box-shadow: 0 0 0 3px rgba(79, 112, 245, 0.1);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing[3]};
  margin-top: ${spacing[5]};
  flex-wrap: wrap;

  ${media.mobile} {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[2]} 0;
  border-bottom: 1px solid var(--color-neutral-200, ${colors.neutral[200]});

  &:last-child {
    border-bottom: none;
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing[1]};
  }
`;

const InfoLabel = styled.span`
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-secondary, ${colors.neutral[600]});
  min-width: 120px;
`;

const InfoValue = styled.span`
  color: var(--color-text-primary, ${colors.neutral[900]});
`;

const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${spacing[4]};
  margin-bottom: ${spacing[5]};

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${spacing[3]};
  }
`;

const AddressCard = styled.div<{ isDefault: boolean }>`
  border: 1px solid ${props => props.isDefault ? `var(--color-primary, ${colors.primary.main})` : `var(--color-neutral-200, ${colors.neutral[200]})`};
  box-shadow: ${props => props.isDefault ? shadows.md : shadows.sm};
  border-radius: ${borderRadius.md};
  padding: ${spacing[3]};
  background: ${props => props.isDefault ? `linear-gradient(135deg, var(--color-primary-lighter, ${colors.primary.lighter}) 0%, var(--color-neutral-50, ${colors.neutral[50]}) 100%)` : `var(--color-neutral-0, ${colors.neutral[0]})`};
  position: relative;
`;

const DefaultBadge = styled.div`
  position: absolute;
  top: ${spacing[2]};
  right: ${spacing[2]};
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  background: var(--color-primary, ${colors.primary.main});
  color: white;
  padding: ${spacing[1]} ${spacing[3]};
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
`;

const AddressInfo = styled.div`
  margin-bottom: ${spacing[3]};
  padding-right: ${spacing[8]};
`;

const AddressName = styled.div`
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  margin-bottom: ${spacing[2]};
`;

const AddressDetail = styled.div`
  font-size: ${typography.fontSize.sm};
  color: var(--color-text-secondary, ${colors.neutral[600]});
  line-height: ${typography.lineHeight.normal};
`;

const AddressActions = styled.div`
  display: flex;
  gap: ${spacing[2]};
  margin-top: ${spacing[3]};
  flex-wrap: wrap;

  ${media.mobile} {
    flex-direction: column;

    button {
      width: 100%;
      min-height: 44px;
    }
  }
`;

const ActionButton = styled(Button)`
  min-height: 44px;
`;

const OrdersGrid = styled.div`
  display: grid;
  gap: ${spacing[4]};

  ${media.mobile} {
    gap: ${spacing[3]};
  }
`;

const OrderCard = styled.div`
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  border-radius: ${borderRadius.md};
  padding: ${spacing[4]};
  background: var(--color-neutral-0, ${colors.neutral[0]});
  transition: box-shadow ${transitions.fast};
  box-shadow: ${shadows.sm};

  &:hover {
    box-shadow: ${shadows.md};
  }

  ${media.mobile} {
    padding: ${spacing[3]};
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
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const [editProfile, setEditProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || ""
  });

  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

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

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const response = await userAPI.getAddresses();
      if (response.success) {
        setAddresses(response.addresses);
      }
    } catch (error) {
      console.error("Failed to load addresses", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAddAddress = async () => {
    if (!newAddress.name || !newAddress.address || !newAddress.city || !newAddress.zip) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await userAPI.addAddress(newAddress);
      if (response.success) {
        setAddresses(response.addresses);
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
      }
    } catch (error) {
      alert("Failed to add address");
    }
  };

  const handleUpdateProfile = async () => {
    if (!editProfile.name.trim()) {
      setMessage("Name cannot be empty");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      const response = await userAPI.updateProfile(editProfile);
      if (response.success) {
        setMessage("Profile updated successfully");
        setMessageType("success");
        setEditProfileOpen(false);
        // Update Redux state with new user data
        dispatch({ 
          type: "auth/loginSuccess", 
          payload: response.user 
        });
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to update profile");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!changePassword.currentPassword || !changePassword.newPassword || !changePassword.confirmPassword) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setMessage("New passwords do not match");
      setMessageType("error");
      return;
    }

    if (changePassword.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      const response = await userAPI.changePassword({
        currentPassword: changePassword.currentPassword,
        newPassword: changePassword.newPassword,
        confirmPassword: changePassword.confirmPassword
      });
      if (response.success) {
        setMessage("Password changed successfully");
        setMessageType("success");
        setChangePasswordOpen(false);
        setChangePassword({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to change password");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAddress = async (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      try {
        const response = await userAPI.deleteAddress(id);
        if (response.success) {
          setAddresses(response.addresses);
        }
      } catch (error) {
        console.error("Failed to delete address", error);
      }
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const response = await userAPI.updateAddress(id, { isDefault: true });
      if (response.success) {
        setAddresses(response.addresses);
      }
    } catch (error) {
      console.error("Failed to set default address", error);
    }
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
            <InfoLabel>Phone:</InfoLabel>
            <InfoValue>{user.phone || "Not set"}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Gender:</InfoLabel>
            <InfoValue>{user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "Not set"}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>User ID:</InfoLabel>
            <InfoValue>{user.id}</InfoValue>
          </InfoRow>
        </UserInfoCard>
        <div style={{ display: "flex", gap: spacing[3], flexWrap: "wrap" }}>
          <Button appearance="primary" onClick={() => setEditProfileOpen(true)}>
            Edit Profile
          </Button>
          <Button appearance="secondary" onClick={() => setChangePasswordOpen(true)}>
            Change Password
          </Button>
        </div>
      </TabSection>

      {/* Edit Profile Form */}
      {editProfileOpen && (
        <TabSection>
          <FormCard>
            <FormTitle>Edit Profile Information</FormTitle>
            {message && (
              <div style={{
                padding: `${spacing[3]}`,
                marginBottom: `${spacing[4]}`,
                borderRadius: borderRadius.md,
                backgroundColor: messageType === "error" ? "#fee" : "#efe",
                color: messageType === "error" ? "#c33" : "#3c3",
                fontSize: typography.fontSize.sm
              }}>
                {message}
              </div>
            )}
            <FormGroup>
              <label>Name</label>
              <input
                type="text"
                value={editProfile.name}
                onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                placeholder="Your name"
              />
            </FormGroup>
            <FormGroup>
              <label>Email</label>
              <input
                type="email"
                value={editProfile.email}
                onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                placeholder="Your email"
              />
            </FormGroup>
            <FormGroup>
              <label>Phone</label>
              <input
                type="tel"
                value={editProfile.phone}
                onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                placeholder="Your phone number"
              />
            </FormGroup>
            <FormGroup>
              <label>Gender</label>
              <select
                value={editProfile.gender}
                onChange={(e) => setEditProfile({ ...editProfile, gender: e.target.value })}
              >
                <option value="">Not specified</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </FormGroup>
            <ButtonGroup>
              <Button 
                appearance="primary" 
                onClick={handleUpdateProfile}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button 
                appearance="secondary" 
                onClick={() => setEditProfileOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </FormCard>
        </TabSection>
      )}

      {/* Change Password Form */}
      {changePasswordOpen && (
        <TabSection>
          <FormCard>
            <FormTitle>Change Password</FormTitle>
            {message && (
              <div style={{
                padding: `${spacing[3]}`,
                marginBottom: `${spacing[4]}`,
                borderRadius: borderRadius.md,
                backgroundColor: messageType === "error" ? "#fee" : "#efe",
                color: messageType === "error" ? "#c33" : "#3c3",
                fontSize: typography.fontSize.sm
              }}>
                {message}
              </div>
            )}
            <FormGroup>
              <label>Current Password</label>
              <input
                type="password"
                value={changePassword.currentPassword}
                onChange={(e) => setChangePassword({ ...changePassword, currentPassword: e.target.value })}
                placeholder="Enter your current password"
              />
            </FormGroup>
            <FormGroup>
              <label>New Password</label>
              <input
                type="password"
                value={changePassword.newPassword}
                onChange={(e) => setChangePassword({ ...changePassword, newPassword: e.target.value })}
                placeholder="Enter your new password"
              />
            </FormGroup>
            <FormGroup>
              <label>Confirm New Password</label>
              <input
                type="password"
                value={changePassword.confirmPassword}
                onChange={(e) => setChangePassword({ ...changePassword, confirmPassword: e.target.value })}
                placeholder="Confirm your new password"
              />
            </FormGroup>
            <ButtonGroup>
              <Button 
                appearance="primary" 
                onClick={handleChangePassword}
                disabled={loading}
              >
                {loading ? "Updating..." : "Change Password"}
              </Button>
              <Button 
                appearance="secondary" 
                onClick={() => setChangePasswordOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </FormCard>
        </TabSection>
      )}

      {/* Addresses Section */}
      <TabSection>
        <SectionTitle>Saved Addresses</SectionTitle>
        {addresses.length > 0 ? (
          <AddressGrid>
            {addresses.map(address => (
              <AddressCard key={address._id || address.id} isDefault={address.isDefault}>
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
                      onClick={() => handleSetDefault(address._id || address.id)}
                    >
                      Set as Default
                    </ActionButton>
                  )}
                  <ActionButton
                    appearance="subtle"
                    size="small"
                    icon={<Delete24Filled />}
                    onClick={() => handleRemoveAddress(address._id || address.id)}
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
        {(user?.orders?.length || 0) > 0 ? (
          <OrdersGrid>
            {user?.orders?.map(order => (
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
