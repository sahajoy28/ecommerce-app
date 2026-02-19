import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { Delete24Filled, Edit24Filled, ChevronRight24Filled } from '@fluentui/react-icons';
import { userAPI } from '../services/userAPI';
import { useAppSelector } from '../app/hooks';
import { colors, spacing, typography } from '../styles/designTokens';
import { convertGoogleDriveUrl } from '../utils/googleDriveUrl';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: ${spacing[8]};
  color: var(--color-text-primary, ${colors.neutral[900]});
  display: none;
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
  cursor: pointer;
  transition: all 0.2s ease;
  
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

const PublishBadge = styled.span<{ published: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${typography.fontSize.sm};
  background: ${p => p.published ? 'rgba(59, 130, 246, 0.15)' : 'rgba(107, 114, 128, 0.15)'};
  color: ${p => p.published ? '#3b82f6' : '#6b7280'};
  font-weight: ${typography.fontWeight.semibold};
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

const Modal = styled.div<{ $isOpen: boolean }>`
  display: ${p => p.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: ${spacing[8]};
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing[8]};
  border-bottom: 1px solid ${colors.neutral[200]};
  padding-bottom: ${spacing[4]};
`;

const ModalTitle = styled.h2`
  font-size: ${typography.fontSize["2xl"]};
  color: var(--color-text-primary, ${colors.neutral[900]});
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${colors.neutral[600]};
  
  &:hover {
    color: ${colors.neutral[900]};
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[6]};
  margin-bottom: ${spacing[8]};
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const DetailLabel = styled.label`
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[600]};
  font-size: ${typography.fontSize.sm};
`;

const DetailValue = styled.div`
  font-size: ${typography.fontSize.base};
  color: var(--color-text-primary, ${colors.neutral[900]});
  padding: ${spacing[2]};
  background: ${colors.neutral[50]};
  border-radius: 4px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: ${spacing[4]};
  margin-bottom: ${spacing[8]};
`;

const ImageThumb = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
`;

const PriceSection = styled.div`
  padding: ${spacing[4]};
  background: ${colors.neutral[50]};
  border-radius: 4px;
  margin-bottom: ${spacing[8]};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[4]};
`;

const PriceItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

const PriceLabel = styled.span`
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral[600]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PriceValue = styled.span`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
`;

const ModalActions = styled.div`
  display: flex;
  gap: ${spacing[4]};
  justify-content: flex-end;
  padding-top: ${spacing[4]};
  border-top: 1px solid ${colors.neutral[200]};
`;

interface AdminProductProps {
  onEdit?: (product: any) => void;
  onDelete?: (productId: string) => void;
  refreshTrigger?: number;
}

export const ProductManagement = ({ onEdit, onDelete, refreshTrigger = 0 }: AdminProductProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const { token } = useAppSelector((state) => state.auth);

  const fetchProducts = async () => {
    if (!token) {
      console.warn('No token available, skipping fetch');
      return;
    }
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
  }, [refreshTrigger, token]);

  const handleDelete = async (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handlePublish = async (productId: string) => {
    setPublishingId(productId);
    try {
      const response = await userAPI.publishAdminProduct(productId);
      // Update the product in the list
      setProducts(products.map(p => 
        p._id === productId ? { ...p, published: true } : p
      ));
      // Update selected product if it's the one being published
      if (selectedProduct?._id === productId) {
        setSelectedProduct({ ...selectedProduct, published: true });
      }
    } catch (err) {
      console.error('Failed to publish product:', err);
      alert('Failed to publish product');
    } finally {
      setPublishingId(null);
    }
  };

  const handleUnpublish = async (productId: string) => {
    setPublishingId(productId);
    try {
      const response = await userAPI.unpublishAdminProduct(productId);
      // Update the product in the list
      setProducts(products.map(p => 
        p._id === productId ? { ...p, published: false } : p
      ));
      // Update selected product if it's the one being unpublished
      if (selectedProduct?._id === productId) {
        setSelectedProduct({ ...selectedProduct, published: false });
      }
    } catch (err) {
      console.error('Failed to unpublish product:', err);
      alert('Failed to unpublish product');
    } finally {
      setPublishingId(null);
    }
  };

  const calculateFinalPrice = (product: any) => {
    if (!product.discount?.discountValue) return product.price;
    
    const basePrice = product.retailPrice || product.price;
    if (product.discount.discountType === 'percentage') {
      return basePrice - (basePrice * product.discount.discountValue / 100);
    } else {
      return basePrice - product.discount.discountValue;
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
    <>
      <Container>
        <Title>Your Products ({products.length})</Title>
        <Table>
          <thead>
            <Tr>
              <Th style={{ width: '27%' }}>Product Name</Th>
              <Th style={{ width: '13%' }}>Category</Th>
              <Th style={{ width: '12%' }}>Price</Th>
              <Th style={{ width: '8%' }}>Stock</Th>
              <Th style={{ width: '10%' }}>Active</Th>
              <Th style={{ width: '12%' }}>Published</Th>
              <Th style={{ width: '18%' }}>Actions</Th>
            </Tr>
          </thead>
          <tbody>
            {products.map(product => (
              <Tr key={product._id} onClick={() => setSelectedProduct(product)}>
                <Td>
                  <strong>{product.title}</strong>
                  <p style={{ fontSize: typography.fontSize.sm, color: colors.neutral[600], marginTop: 4 }}>
                    {product.description.substring(0, 50)}...
                  </p>
                </Td>
                <Td>{product.category}</Td>
                <Td>
                  <div>
                    <strong>${calculateFinalPrice(product).toFixed(2)}</strong>
                    {product.mrp && <p style={{ fontSize: typography.fontSize.sm, color: colors.neutral[600] }}>MRP: ${product.mrp.toFixed(2)}</p>}
                  </div>
                </Td>
                <Td>{product.quantity}</Td>
                <Td>
                  <StatusBadge active={product.isActive !== false}>
                    {product.isActive !== false ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </Td>
                <Td>
                  <PublishBadge published={product.published}>
                    {product.published ? '🌐 Published' : '🔒 Draft'}
                  </PublishBadge>
                </Td>
                <Td>
                  <ActionButtons>
                    <Button
                      appearance="subtle"
                      icon={<Edit24Filled />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(product);
                      }}
                      title="Edit product"
                    />
                    <Button
                      appearance="subtle"
                      icon={<Delete24Filled />}
                      onClick={(e) => handleDelete(product._id, e)}
                      title="Delete product"
                    />
                  </ActionButtons>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal $isOpen={!!selectedProduct} onClick={() => setSelectedProduct(null)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {selectedProduct && (
            <>
              <ModalHeader>
                <ModalTitle>{selectedProduct.title}</ModalTitle>
                <CloseButton onClick={() => setSelectedProduct(null)}>✕</CloseButton>
              </ModalHeader>

              {selectedProduct.images.length > 0 && (
                <ImageGrid>
                  {selectedProduct.images.map((img: string, idx: number) => (
                    <ImageThumb key={idx} src={convertGoogleDriveUrl(img)} alt={`Product ${idx + 1}`} onError={(e) => {
                      (e.target as any).style.display = 'none';
                    }} />
                  ))}
                </ImageGrid>
              )}

              <DetailItem>
                <DetailLabel>Description</DetailLabel>
                <DetailValue>{selectedProduct.description}</DetailValue>
              </DetailItem>

              <PriceSection>
                <PriceItem>
                  <PriceLabel>Base Price</PriceLabel>
                  <PriceValue>${selectedProduct.price.toFixed(2)}</PriceValue>
                </PriceItem>
                {selectedProduct.mrp && (
                  <PriceItem>
                    <PriceLabel>MRP</PriceLabel>
                    <PriceValue>${selectedProduct.mrp.toFixed(2)}</PriceValue>
                  </PriceItem>
                )}
                {selectedProduct.retailPrice && (
                  <PriceItem>
                    <PriceLabel>Retail Price</PriceLabel>
                    <PriceValue>${selectedProduct.retailPrice.toFixed(2)}</PriceValue>
                  </PriceItem>
                )}
                {selectedProduct.discount?.discountValue && (
                  <>
                    <PriceItem>
                      <PriceLabel>Discount</PriceLabel>
                      <PriceValue>
                        {selectedProduct.discount.discountType === 'percentage' 
                          ? `${selectedProduct.discount.discountValue}%` 
                          : `$${selectedProduct.discount.discountValue}`}
                      </PriceValue>
                    </PriceItem>
                    <PriceItem>
                      <PriceLabel>Final Price</PriceLabel>
                      <PriceValue style={{ color: colors.success }}>
                        ${calculateFinalPrice(selectedProduct).toFixed(2)}
                      </PriceValue>
                    </PriceItem>
                  </>
                )}
              </PriceSection>

              <DetailGrid>
                <DetailItem>
                  <DetailLabel>Category</DetailLabel>
                  <DetailValue>{selectedProduct.category}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Stock</DetailLabel>
                  <DetailValue>{selectedProduct.quantity}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Status</DetailLabel>
                  <DetailValue>
                    <StatusBadge active={selectedProduct.isActive !== false}>
                      {selectedProduct.isActive !== false ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Published</DetailLabel>
                  <DetailValue>
                    <PublishBadge published={selectedProduct.published}>
                      {selectedProduct.published ? '🌐 Published' : '🔒 Draft'}
                    </PublishBadge>
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Show Price in Listing</DetailLabel>
                  <DetailValue>{selectedProduct.showPriceInListing ? '✅ Yes' : '❌ No'}</DetailValue>
                </DetailItem>
              </DetailGrid>

              <ModalActions>
                <Button onClick={() => setSelectedProduct(null)}>Close</Button>
                {selectedProduct.published ? (
                  <Button 
                    appearance="primary" 
                    onClick={() => handleUnpublish(selectedProduct._id)}
                    disabled={publishingId === selectedProduct._id}
                  >
                    {publishingId === selectedProduct._id ? '⏳ Unpublishing...' : '🔒 Unpublish'}
                  </Button>
                ) : (
                  <Button 
                    appearance="primary" 
                    onClick={() => handlePublish(selectedProduct._id)}
                    disabled={publishingId === selectedProduct._id}
                  >
                    {publishingId === selectedProduct._id ? '⏳ Publishing...' : '🌐 Publish'}
                  </Button>
                )}
                <Button appearance="secondary" onClick={() => {
                  onEdit?.(selectedProduct);
                  setSelectedProduct(null);
                }}>Edit</Button>
              </ModalActions>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
