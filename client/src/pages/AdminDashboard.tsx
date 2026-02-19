import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '@fluentui/react-components';
import { colors, spacing, typography } from '../styles/designTokens';
import { ProductForm } from '../components/ProductForm';
import { ProductManagement } from '../components/ProductManagement';
import { AdminUsers } from '../components/AdminUsers';
import { userAPI } from '../services/userAPI';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: var(--color-bg-primary, ${colors.neutral[50]});
  padding: ${spacing[8]};
`;

const Header = styled.div`
  margin-bottom: ${spacing[12]};
`;

const Title = styled.h1`
  font-size: ${typography.fontSize["7xl"]};
  color: var(--color-text-primary, ${colors.neutral[900]});
  margin-bottom: ${spacing[2]};
`;

const Subtitle = styled.p`
  font-size: ${typography.fontSize.lg};
  color: ${colors.neutral[600]};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[12]};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[8]};
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[8]};
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing[8]};
`;

const StatCard = styled.div`
  padding: ${spacing[8]};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${colors.primary.main};
`;

const StatValue = styled.div`
  font-size: ${typography.fontSize["7xl"]};
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
  gap: ${spacing[2]};
  margin-bottom: ${spacing[8]};
  border-bottom: 2px solid ${colors.neutral[200]};
`;

const TabButton = styled(Button)<{ active: boolean }>`
  padding: ${spacing[4]} ${spacing[6]};
  background: ${p => p.active ? colors.primary.main : 'transparent'};
  color: ${p => p.active ? 'white' : colors.neutral[600]};
  border: none;
  border-bottom: ${p => p.active ? `3px solid ${colors.primary.main}` : 'none'};
  cursor: pointer;
  font-weight: ${p => p.active ? typography.fontWeight.semibold : 'normal'};
  transition: all 0.2s ease;

  &:hover {
    background: ${p => p.active ? colors.primary.main : colors.neutral[100]};
  }
`;

interface AdminDashboardProps {
  onLogout?: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'users'>('products');

  const handleProductSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await userAPI.createAdminProduct(data);
      // Refresh product list
      setRefreshTrigger(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>📊 Admin Dashboard</Title>
        <Subtitle>Manage your products and store</Subtitle>
      </Header>

      <TabContainer>
        <TabButton
          active={activeTab === 'products'}
          onClick={() => setActiveTab('products')}
        >
          📦 Products
        </TabButton>
        <TabButton
          active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </TabButton>
      </TabContainer>

      {activeTab === 'products' && (
        <>
          <StatsContainer>
            <StatCard>
              <StatValue>+</StatValue>
              <StatLabel>Add Products</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>🗂️</StatValue>
              <StatLabel>Organize by Category</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>🖼️</StatValue>
              <StatLabel>Upload Images</StatLabel>
            </StatCard>
          </StatsContainer>

          <Content>
            <LeftSection>
              <ProductForm onSubmit={handleProductSubmit} isLoading={isLoading} />
            </LeftSection>
            
            <RightSection>
              <ProductManagement refreshTrigger={refreshTrigger} />
            </RightSection>
          </Content>
        </>
      )}

      {activeTab === 'users' && (
        <div style={{ maxWidth: '100%' }}>
          <AdminUsers />
        </div>
      )}
    </DashboardContainer>
  );
};
