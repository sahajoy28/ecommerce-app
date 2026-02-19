import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { Delete24Filled, Edit24Filled } from '@fluentui/react-icons';
import { userAPI } from '../services/userAPI';
import { colors, spacing, typography } from '../styles/designTokens';

const Container = styled.div`
  padding: ${spacing[8]};
  background: var(--color-bg-primary, ${colors.neutral[50]});
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-bottom: ${spacing[8]};
  color: var(--color-text-primary, ${colors.neutral[900]});
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  padding: ${spacing[4]};
  text-align: left;
  background: ${colors.primary.lighter};
  font-weight: ${typography.fontWeight.semibold};
  border-bottom: 2px solid ${colors.neutral[200]};
`;

const Td = styled.td`
  padding: ${spacing[4]};
  border-bottom: 1px solid ${colors.neutral[200]};
  color: var(--color-text-primary, ${colors.neutral[900]});
`;

const Tr = styled.tr`
  &:hover {
    background: ${colors.neutral[50]};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing[2]};
`;

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${typography.fontSize.sm};
  background: ${p => p.active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
  color: ${p => p.active ? colors.success : colors.error};
`;

const NoProducts = styled.div`
  text-align: center;
  padding: ${spacing[8]};
  color: ${colors.neutral[600]};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing[8]};
`;

interface AdminProductProps {
  onEdit?: (product: any) => void;
  onDelete?: (productId: string) => void;
  refreshTrigger?: number;
}

export const ProductManagement = ({ onEdit, onDelete, refreshTrigger = 0 }: AdminProductProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAdminProducts();
      setProducts(response);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await userAPI.deleteAdminProduct(productId);
        setProducts(products.filter(p => p._id !== productId));
        if (onDelete) onDelete(productId);
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('Failed to delete product');
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <Spinner label="Loading products..." />
        </LoadingContainer>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container>
        <Title>Your Products</Title>
        <NoProducts>No products added yet. Create your first product above!</NoProducts>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Your Products ({products.length})</Title>
      <Table>
        <thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {products.map(product => (
            <Tr key={product._id}>
              <Td>
                <strong>{product.title}</strong>
                <p style={{ fontSize: typography.fontSize.sm, color: colors.neutral[600], marginTop: 4 }}>
                  {product.description.substring(0, 60)}...
                </p>
              </Td>
              <Td>{product.category}</Td>
              <Td>${product.price.toFixed(2)}</Td>
              <Td>{product.quantity}</Td>
              <Td>
                <StatusBadge active={product.isActive !== false}>
                  {product.isActive !== false ? 'Active' : 'Inactive'}
                </StatusBadge>
              </Td>
              <Td>
                <ActionButtons>
                  <Button
                    appearance="subtle"
                    icon={<Edit24Filled />}
                    onClick={() => onEdit?.(product)}
                    title="Edit product"
                  />
                  <Button
                    appearance="subtle"
                    icon={<Delete24Filled />}
                    onClick={() => handleDelete(product._id)}
                    title="Delete product"
                  />
                </ActionButtons>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
