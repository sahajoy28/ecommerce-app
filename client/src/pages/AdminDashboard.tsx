import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '@fluentui/react-components';
import { colors, spacing, typography } from '../styles/designTokens';
import { ProductForm } from '../components/ProductForm';
import { ProductManagement } from '../components/ProductManagement';
import { BannerManagement } from '../components/BannerManagement';
import { AdminUsers } from '../components/AdminUsers';
import { SiteSettingsPanel, SETTINGS_TABS, SettingsTabKey } from '../components/SiteSettingsPanel';
import { userAPI } from '../services/userAPI';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: var(--color-bg-primary, ${colors.neutral[50]});
  padding: ${spacing[8]};

  @media (max-width: 768px) {
    padding: ${spacing[4]} ${spacing[3]};
  }
`;

const Header = styled.div`
  margin-bottom: ${spacing[12]};

  @media (max-width: 768px) {
    margin-bottom: ${spacing[6]};
  }
`;

const Title = styled.h1`
  font-size: ${typography.fontSize["7xl"]};
  color: var(--color-text-primary, ${colors.neutral[900]});
  margin-bottom: ${spacing[2]};

  @media (max-width: 768px) {
    font-size: ${typography.fontSize["3xl"]};
  }
`;

const Subtitle = styled.p`
  font-size: ${typography.fontSize.lg};
  color: ${colors.neutral[600]};

  @media (max-width: 768px) {
    font-size: ${typography.fontSize.sm};
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing[4]};
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: ${spacing[8]};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;

  @media (max-width: 768px) {
    padding: ${spacing[4]};
    max-width: 100%;
    max-height: 95vh;
    border-radius: 8px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing[6]};
  padding-bottom: ${spacing[4]};
  border-bottom: 1px solid ${colors.neutral[200]};
`;

const ModalTitle = styled.h2`
  font-size: ${typography.fontSize['xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral[900]};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${typography.fontSize.lg};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${colors.neutral[500]};
  padding: ${spacing[1]};
  line-height: 1;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.neutral[100]};
    color: ${colors.neutral[800]};
  }
`;

const AddProductButton = styled(Button)`
  margin-bottom: ${spacing[6]};
  padding: ${spacing[3]} ${spacing[6]};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};

  @media (max-width: 768px) {
    width: 100%;
    padding: ${spacing[3]} ${spacing[4]};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  margin-bottom: ${spacing[4]};

  @media (max-width: 768px) {
    font-size: ${typography.fontSize.lg};
    margin-bottom: ${spacing[3]};
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: ${spacing[8]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${spacing[4]};
    border-radius: 6px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing[8]};
  margin-top: ${spacing[8]};
`;

const StatCard = styled.div`
  padding: ${spacing[8]};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${colors.primary.main};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  margin-bottom: ${spacing[2]};
`;

const StatLabel = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral[600]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${spacing[1]};
  margin-bottom: ${spacing[8]};
  border-bottom: 2px solid ${colors.neutral[200]};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: ${spacing[3]} ${spacing[4]};
  background: ${p => p.$active ? colors.primary.main : 'transparent'};
  color: ${p => p.$active ? 'white' : colors.neutral[600]};
  border: none;
  border-bottom: ${p => p.$active ? `3px solid ${colors.primary.main}` : '3px solid transparent'};
  margin-bottom: -2px;
  cursor: pointer;
  font-size: ${typography.fontSize.sm};
  font-weight: ${p => p.$active ? typography.fontWeight.semibold : typography.fontWeight.normal};
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  border-radius: 6px 6px 0 0;

  &:hover {
    background: ${p => p.$active ? colors.primary.main : colors.neutral[100]};
    color: ${p => p.$active ? 'white' : colors.primary.main};
  }
`;

const TabDivider = styled.div`
  width: 2px;
  background: ${colors.neutral[200]};
  margin: ${spacing[2]} 0;
  flex-shrink: 0;
`;

const MobileSelect = styled.select`
  display: none;
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[800]};
  background: white;
  border: 2px solid ${colors.neutral[200]};
  border-radius: 8px;
  margin-bottom: ${spacing[6]};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right ${spacing[3]} center;
  background-size: 20px;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px ${colors.primary.lighter};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

interface AdminDashboardProps {
  onLogout?: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [bannerRefreshTrigger, setBannerRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'banners' | 'users' | SettingsTabKey>('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const handleProductSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (editingProduct) {
        await userAPI.updateAdminProduct(editingProduct._id, data);
      } else {
        await userAPI.createAdminProduct(data);
      }
      setShowProductModal(false);
      setEditingProduct(null);
      setRefreshTrigger(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>📊 Admin Dashboard</Title>
        <Subtitle>Manage your products and store</Subtitle>
      </Header>

      <MobileSelect
        value={activeTab}
        onChange={(e) => setActiveTab(e.target.value as any)}
      >
        <option value="products">📦 Products</option>
        <option value="banners">🎨 Banners</option>
        <option value="users">👥 Users</option>
        {SETTINGS_TABS.map(tab => (
          <option key={tab.key} value={tab.key}>{tab.icon} {tab.label}</option>
        ))}
      </MobileSelect>

      <TabContainer>
        <TabButton
          $active={activeTab === 'products'}
          onClick={() => setActiveTab('products')}
        >
          📦 Products
        </TabButton>
        <TabButton
          $active={activeTab === 'banners'}
          onClick={() => setActiveTab('banners')}
        >
          🎨 Banners
        </TabButton>
        <TabButton
          $active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </TabButton>
        <TabDivider />
        {SETTINGS_TABS.map(tab => (
          <TabButton
            key={tab.key}
            $active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon} {tab.label}
          </TabButton>
        ))}
      </TabContainer>

      {activeTab === 'products' && (
        <Content>
          <AddProductButton
            appearance="primary"
            onClick={() => { setEditingProduct(null); setShowProductModal(true); }}
          >
            ➕ Add New Product
          </AddProductButton>
          <Card>
            <SectionTitle>📦 Your Products</SectionTitle>
            <ProductManagement refreshTrigger={refreshTrigger} onEdit={handleEditProduct} />
          </Card>
        </Content>
      )}

      {showProductModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}</ModalTitle>
              <CloseButton onClick={handleCloseModal}>✕</CloseButton>
            </ModalHeader>
            <ProductForm
              key={editingProduct?._id || 'new'}
              onSubmit={handleProductSubmit}
              initialData={editingProduct}
              isLoading={isLoading}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      {activeTab === 'banners' && (
        <Card style={{ maxWidth: '100%' }}>
          <SectionTitle>🎨 Manage Banners</SectionTitle>
          <BannerManagement refreshTrigger={bannerRefreshTrigger} />
        </Card>
      )}

      {activeTab === 'users' && (
        <Card style={{ maxWidth: '100%' }}>
          <SectionTitle>👥 Manage Users</SectionTitle>
          <AdminUsers />
        </Card>
      )}

      {SETTINGS_TABS.some(tab => tab.key === activeTab) && (
        <Card style={{ maxWidth: '100%' }}>
          <SectionTitle>⚙️ {SETTINGS_TABS.find(t => t.key === activeTab)?.icon} {SETTINGS_TABS.find(t => t.key === activeTab)?.label} Settings</SectionTitle>
          <SiteSettingsPanel activeTab={activeTab as SettingsTabKey} />
        </Card>
      )}
    </DashboardContainer>
  );
};
