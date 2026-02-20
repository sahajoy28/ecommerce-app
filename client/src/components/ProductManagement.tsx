import styled from 'styled-components';
import { useEffect, useState, useMemo } from 'react';
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

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[4]};
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 180px;
  padding: ${spacing[2]} ${spacing[3]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 6px;
  font-size: ${typography.fontSize.sm};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }

  &::placeholder {
    color: ${colors.neutral[400]};
  }
`;

const BulkBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[3]};
  background: ${colors.primary.lighter};
  border-radius: 8px;
  margin-bottom: ${spacing[4]};
  flex-wrap: wrap;
`;

const BulkLabel = styled.span`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[800]};
  white-space: nowrap;
  margin-right: ${spacing[1]};
`;

const BulkButton = styled(Button)`
  font-size: 12px !important;
  padding: 4px 10px !important;
  min-width: auto !important;
  white-space: nowrap !important;
  min-height: 28px !important;
  height: 28px !important;
`;

const CheckboxWrapper = styled.label<{ $size?: 'sm' | 'md' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${p => p.$size === 'sm' ? '18px' : '20px'};
  height: ${p => p.$size === 'sm' ? '18px' : '20px'};
  flex-shrink: 0;
  cursor: pointer;
  position: relative;

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const CheckMark = styled.span<{ $checked: boolean; $size?: 'sm' | 'md' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${p => p.$size === 'sm' ? '16px' : '18px'};
  height: ${p => p.$size === 'sm' ? '16px' : '18px'};
  border-radius: 4px;
  border: 1.5px solid ${p => p.$checked ? colors.primary.main : colors.neutral[400]};
  background: ${p => p.$checked ? colors.primary.main : 'white'};
  transition: all 0.15s ease;
  flex-shrink: 0;

  &::after {
    content: '';
    display: ${p => p.$checked ? 'block' : 'none'};
    width: ${p => p.$size === 'sm' ? '4px' : '5px'};
    height: ${p => p.$size === 'sm' ? '7px' : '8px'};
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) translateY(-1px);
  }
`;

const CustomCheckbox = ({ checked, onChange, size = 'sm' }: { checked: boolean; onChange: () => void; size?: 'sm' | 'md' }) => (
  <CheckboxWrapper $size={size} onClick={(e) => e.stopPropagation()}>
    <input type="checkbox" checked={checked} onChange={onChange} />
    <CheckMark $checked={checked} $size={size} />
  </CheckboxWrapper>
);

/* Mobile card layout */
const CardList = styled.div`
  display: none;
  flex-direction: column;
  gap: ${spacing[3]};

  @media (max-width: 768px) {
    display: flex;
  }
`;

const ProductCard = styled.div<{ $selected: boolean }>`
  display: flex;
  gap: ${spacing[2]};
  padding: ${spacing[3]};
  background: ${p => p.$selected ? 'rgba(0, 102, 255, 0.04)' : 'white'};
  border: 1.5px solid ${p => p.$selected ? colors.primary.main : colors.neutral[200]};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  align-items: flex-start;
`;

const CardCheckbox = styled.div`
  padding-top: 3px;
  flex-shrink: 0;
`;

const CardBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.div`
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral[900]};
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  flex-wrap: wrap;
  margin-top: ${spacing[1]};
`;

const CardTag = styled.span<{ $variant?: 'default' | 'success' | 'warning' | 'error' }>`
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 8px;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.2px;
  background: ${p => {
    switch (p.$variant) {
      case 'success': return 'rgba(16, 185, 129, 0.12)';
      case 'warning': return 'rgba(59, 130, 246, 0.12)';
      case 'error': return 'rgba(107, 114, 128, 0.12)';
      default: return colors.neutral[100];
    }
  }};
  color: ${p => {
    switch (p.$variant) {
      case 'success': return colors.success;
      case 'warning': return '#3b82f6';
      case 'error': return '#6b7280';
      default: return colors.neutral[600];
    }
  }};
`;

const CardActions = styled.div`
  display: flex;
  gap: 2px;
  flex-shrink: 0;
  align-self: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Th = styled.th`
  padding: ${spacing[4]};
  text-align: left;
  background: ${colors.primary.lighter};
  font-weight: ${typography.fontWeight.semibold};
  border-bottom: 2px solid ${colors.neutral[200]};
  white-space: nowrap;
  font-size: ${typography.fontSize.sm};
`;

const Td = styled.td`
  padding: ${spacing[4]};
  border-bottom: 1px solid ${colors.neutral[200]};
  color: var(--color-text-primary, ${colors.neutral[900]});
  font-size: ${typography.fontSize.sm};
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

const StatusBadge = styled.span<{ $active: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${typography.fontSize.sm};
  background: ${p => p.$active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
  color: ${p => p.$active ? colors.success : colors.error};
`;

const PublishBadge = styled.span<{ $published: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${typography.fontSize.sm};
  background: ${p => p.$published ? 'rgba(59, 130, 246, 0.15)' : 'rgba(107, 114, 128, 0.15)'};
  color: ${p => p.$published ? '#3b82f6' : '#6b7280'};
  font-weight: ${typography.fontWeight.semibold};
  white-space: nowrap;
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

  @media (max-width: 600px) {
    padding: ${spacing[4]};
    width: 95%;
    max-height: 90vh;
  }
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

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${spacing[4]};
    margin-bottom: ${spacing[4]};
  }
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

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    margin-bottom: ${spacing[4]};
  }
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

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: ${spacing[2]};

    button {
      flex: 1;
      min-width: 0;
    }
  }
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);
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

  // Filtered products based on search
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  // Selection helpers
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredProducts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProducts.map(p => p._id)));
    }
  };

  const clearSelection = () => setSelectedIds(new Set());

  // Bulk actions
  const handleBulkPublish = async () => {
    if (selectedIds.size === 0) return;
    setBulkLoading(true);
    try {
      await userAPI.bulkPublishProducts(Array.from(selectedIds));
      setProducts(products.map(p =>
        selectedIds.has(p._id) ? { ...p, published: true } : p
      ));
      clearSelection();
    } catch (err) {
      console.error('Bulk publish failed:', err);
      alert('Failed to bulk publish products');
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkUnpublish = async () => {
    if (selectedIds.size === 0) return;
    setBulkLoading(true);
    try {
      await userAPI.bulkUnpublishProducts(Array.from(selectedIds));
      setProducts(products.map(p =>
        selectedIds.has(p._id) ? { ...p, published: false } : p
      ));
      clearSelection();
    } catch (err) {
      console.error('Bulk unpublish failed:', err);
      alert('Failed to bulk unpublish products');
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} product(s)? This cannot be undone.`)) return;
    setBulkLoading(true);
    try {
      await userAPI.bulkDeleteProducts(Array.from(selectedIds));
      setProducts(products.filter(p => !selectedIds.has(p._id)));
      clearSelection();
    } catch (err) {
      console.error('Bulk delete failed:', err);
      alert('Failed to bulk delete products');
    } finally {
      setBulkLoading(false);
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

        <Toolbar>
          <SearchInput
            type="text"
            placeholder="🔍 Search products by name, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span style={{ fontSize: typography.fontSize.sm, color: colors.neutral[500], whiteSpace: 'nowrap' }}>
            {filteredProducts.length} of {products.length}
          </span>
        </Toolbar>

        {selectedIds.size > 0 && (
          <BulkBar>
            <BulkLabel>{selectedIds.size} selected</BulkLabel>
            <BulkButton
              appearance="primary"
              onClick={handleBulkPublish}
              disabled={bulkLoading}
            >
              🌐 Publish
            </BulkButton>
            <BulkButton
              appearance="secondary"
              onClick={handleBulkUnpublish}
              disabled={bulkLoading}
            >
              🔒 Unpublish
            </BulkButton>
            <BulkButton
              appearance="secondary"
              onClick={handleBulkDelete}
              disabled={bulkLoading}
              style={{ color: colors.error }}
            >
              🗑️ Delete
            </BulkButton>
            <BulkButton
              appearance="subtle"
              onClick={clearSelection}
              disabled={bulkLoading}
            >
              ✕ Clear
            </BulkButton>
          </BulkBar>
        )}

        {/* Desktop table view */}
        <TableWrapper>
        <Table>
          <thead>
            <Tr>
              <Th style={{ width: '40px' }}>
                <CustomCheckbox
                  checked={filteredProducts.length > 0 && selectedIds.size === filteredProducts.length}
                  onChange={toggleSelectAll}
                  size="md"
                />
              </Th>
              <Th style={{ width: '25%' }}>Product Name</Th>
              <Th style={{ width: '13%' }}>Category</Th>
              <Th style={{ width: '12%' }}>Price</Th>
              <Th style={{ width: '8%' }}>Stock</Th>
              <Th style={{ width: '10%' }}>Active</Th>
              <Th style={{ width: '12%' }}>Published</Th>
              <Th style={{ width: '15%' }}>Actions</Th>
            </Tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <Tr key={product._id} onClick={() => setSelectedProduct(product)}>
                <Td onClick={(e) => e.stopPropagation()}>
                  <CustomCheckbox
                    checked={selectedIds.has(product._id)}
                    onChange={() => toggleSelect(product._id)}
                  />
                </Td>
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
                  <StatusBadge $active={product.isActive !== false}>
                    {product.isActive !== false ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </Td>
                <Td>
                  <PublishBadge $published={product.published}>
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
            {filteredProducts.length === 0 && (
              <tr>
                <Td colSpan={8} style={{ textAlign: 'center', padding: spacing[8], color: colors.neutral[500] }}>
                  No products match "{searchQuery}"
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
        </TableWrapper>

        {/* Mobile card view */}
        <CardList>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2], paddingLeft: spacing[1] }}>
            <CustomCheckbox
              checked={filteredProducts.length > 0 && selectedIds.size === filteredProducts.length}
              onChange={toggleSelectAll}
            />
            <span style={{ fontSize: typography.fontSize.sm, color: colors.neutral[500] }}>
              Select all
            </span>
          </div>
          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              $selected={selectedIds.has(product._id)}
              onClick={() => setSelectedProduct(product)}
            >
              <CardCheckbox onClick={(e) => e.stopPropagation()}>
                <CustomCheckbox
                  checked={selectedIds.has(product._id)}
                  onChange={() => toggleSelect(product._id)}
                />
              </CardCheckbox>
              <CardBody>
                <CardTitle>{product.title}</CardTitle>
                <p style={{ fontSize: '12px', color: colors.neutral[500], margin: 0 }}>
                  {product.description.substring(0, 60)}...
                </p>
                <CardMeta>
                  <CardTag>{product.category}</CardTag>
                  <CardTag>${calculateFinalPrice(product).toFixed(2)}</CardTag>
                  <CardTag $variant={product.published ? 'warning' : 'error'}>
                    {product.published ? '🌐 Live' : '🔒 Draft'}
                  </CardTag>
                  <CardTag $variant={product.isActive !== false ? 'success' : 'error'}>
                    {product.isActive !== false ? 'Active' : 'Inactive'}
                  </CardTag>
                  <CardTag>Stock: {product.quantity}</CardTag>
                </CardMeta>
              </CardBody>
              <CardActions onClick={(e) => e.stopPropagation()}>
                <Button
                  appearance="subtle"
                  size="small"
                  icon={<Edit24Filled />}
                  onClick={() => onEdit?.(product)}
                />
                <Button
                  appearance="subtle"
                  size="small"
                  icon={<Delete24Filled />}
                  onClick={(e) => handleDelete(product._id, e as any)}
                />
              </CardActions>
            </ProductCard>
          ))}
          {filteredProducts.length === 0 && (
            <NoProducts>No products match "{searchQuery}"</NoProducts>
          )}
        </CardList>
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
                    <StatusBadge $active={selectedProduct.isActive !== false}>
                      {selectedProduct.isActive !== false ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Published</DetailLabel>
                  <DetailValue>
                    <PublishBadge $published={selectedProduct.published}>
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
