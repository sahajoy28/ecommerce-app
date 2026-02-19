import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Spinner, Input } from '@fluentui/react-components';
import { Delete24Filled, Edit24Filled } from '@fluentui/react-icons';
import { colors, spacing, typography } from '../styles/designTokens';
import { convertGoogleDriveUrl } from '../utils/googleDriveUrl';

const API_BASE = import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api';

const Container = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: ${spacing[8]};
  min-width: 650px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
  margin-bottom: ${spacing[8]};
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
  font-weight: ${typography.fontWeight.semibold};
`;

const TypeBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${typography.fontSize.sm};
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  font-weight: ${typography.fontWeight.semibold};
`;

const ImageThumb = styled.img`
  max-width: 60px;
  max-height: 60px;
  border-radius: 4px;
  object-fit: cover;
`;

const Nobanners = styled.div`
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
  overflow: auto;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: ${spacing[8]};
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    padding: ${spacing[4]};
    width: 95%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing[6]};
  border-bottom: 1px solid ${colors.neutral[200]};
  padding-bottom: ${spacing[4]};
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${typography.fontSize["2xl"]};
  color: var(--color-text-primary, ${colors.neutral[900]});
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${typography.fontSize.xl};
  cursor: pointer;
  color: ${colors.neutral[600]};
  
  &:hover {
    color: ${colors.neutral[900]};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  margin-bottom: ${spacing[6]};
`;

const Label = styled.label`
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  font-size: ${typography.fontSize.sm};
`;

const TextInput = styled(Input)`
  width: 100%;
`;

const NumberInput = styled.input`
  width: 100%;
  padding: ${spacing[2]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 4px;
  font-family: ${typography.fontFamily.base};
  font-size: ${typography.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${spacing[2]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 4px;
  font-family: ${typography.fontFamily.base};
  font-size: ${typography.fontSize.sm};
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${spacing[2]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 4px;
  font-size: ${typography.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }
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

const PreviewImage = styled.img`
  width: 100%;
  max-height: 200px;
  border-radius: 4px;
  object-fit: cover;
  margin-bottom: ${spacing[4]};
  border: 1px solid ${colors.neutral[200]};
`;

interface Banner {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  position: number;
  type: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

interface BannerManagementProps {
  refreshTrigger?: number;
}

export const BannerManagement = ({ refreshTrigger = 0 }: BannerManagementProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Banner>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/banners/admin/list`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch banners');

      const data = await response.json();
      setBanners(data.banners || []);
    } catch (err) {
      console.error('Failed to fetch banners:', err);
      setError('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, [refreshTrigger]);

  const handleDelete = async (bannerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/banners/admin/${bannerId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to delete banner');

        setBanners(banners.filter(b => b._id !== bannerId));
        setSuccess('Banner deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Failed to delete banner:', err);
        setError('Failed to delete banner');
      }
    }
  };

  const handleSaveBanner = async () => {
    setError('');
    setSuccess('');

    if (!formData.title || !formData.imageUrl) {
      setError('Title and image URL are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const method = isEditMode ? 'PATCH' : 'POST';
      const url = isEditMode 
        ? `${API_BASE}/banners/admin/${selectedBanner?._id}` 
        : `${API_BASE}/banners/admin/create`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save banner');

      const data = await response.json();

      if (isEditMode) {
        setBanners(banners.map(b => b._id === data.banner._id ? data.banner : b));
        setSuccess('Banner updated successfully');
      } else {
        setBanners([...banners, data.banner]);
        setSuccess('Banner created successfully');
      }

      setSelectedBanner(null);
      setFormData({});
      setIsEditMode(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to save banner:', err);
      setError('Failed to save banner');
    }
  };

  const handleEditClick = (banner: Banner) => {
    setSelectedBanner(banner);
    setFormData({ ...banner });
    setIsEditMode(true);
  };

  const handleNewBanner = () => {
    setSelectedBanner(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      position: 0,
      type: 'promotional',
      isActive: true
    });
    setIsEditMode(false);
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <Spinner label="Loading banners..." />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <>
      <Container>
        {error && <div style={{ color: colors.error, marginBottom: spacing[4], padding: spacing[3], background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px' }}>{error}</div>}
        {success && <div style={{ color: colors.success, marginBottom: spacing[4], padding: spacing[3], background: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px' }}>{success}</div>}

        <Button
          appearance="primary"
          onClick={handleNewBanner}
          style={{ marginBottom: spacing[6] }}
        >
          + Add New Banner
        </Button>

        {banners.length === 0 ? (
          <Nobanners>No banners created yet. Click "Add New Banner" above to get started!</Nobanners>
        ) : (
          <TableWrapper>
          <Table>
            <thead>
              <Tr>
                <Th style={{ width: '15%' }}>Image</Th>
                <Th style={{ width: '20%' }}>Title</Th>
                <Th style={{ width: '12%' }}>Type</Th>
                <Th style={{ width: '8%' }}>Position</Th>
                <Th style={{ width: '10%' }}>Status</Th>
                <Th style={{ width: '20%' }}>Link</Th>
                <Th style={{ width: '15%' }}>Actions</Th>
              </Tr>
            </thead>
            <tbody>
              {banners
                .sort((a, b) => a.position - b.position)
                .map(banner => (
                  <Tr key={banner._id}>
                    <Td>
                      <ImageThumb 
                        src={convertGoogleDriveUrl(banner.imageUrl)} 
                        alt={banner.title}
                        onError={(e) => {
                          (e.target as any).style.display = 'none';
                        }}
                      />
                    </Td>
                    <Td>
                      <strong>{banner.title}</strong>
                      {banner.description && (
                        <p style={{ fontSize: typography.fontSize.sm, color: colors.neutral[600], margin: '4px 0 0 0' }}>
                          {banner.description.substring(0, 50)}...
                        </p>
                      )}
                    </Td>
                    <Td>
                      <TypeBadge>{banner.type}</TypeBadge>
                    </Td>
                    <Td>{banner.position}</Td>
                    <Td>
                      <StatusBadge active={banner.isActive}>
                        {banner.isActive ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </Td>
                    <Td>
                      {banner.link ? (
                        <a href={banner.link} target="_blank" rel="noopener noreferrer" style={{ color: colors.primary.main }}>
                          View
                        </a>
                      ) : (
                        <span style={{ color: colors.neutral[400] }}>—</span>
                      )}
                    </Td>
                    <Td>
                      <ActionButtons>
                        <Button
                          appearance="subtle"
                          icon={<Edit24Filled />}
                          onClick={() => handleEditClick(banner)}
                          title="Edit banner"
                        />
                        <Button
                          appearance="subtle"
                          icon={<Delete24Filled />}
                          onClick={(e) => handleDelete(banner._id, e)}
                          title="Delete banner"
                        />
                      </ActionButtons>
                    </Td>
                  </Tr>
                ))}
            </tbody>
          </Table>
          </TableWrapper>
        )}
      </Container>

      <Modal $isOpen={selectedBanner !== null || (Object.keys(formData).length > 0 && !isEditMode)} onClick={() => setSelectedBanner(null)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{isEditMode ? 'Edit Banner' : 'Add New Banner'}</ModalTitle>
            <CloseButton onClick={() => {
              setSelectedBanner(null);
              setFormData({});
              setIsEditMode(false);
            }}>✕</CloseButton>
          </ModalHeader>

          {formData.imageUrl && (
            <PreviewImage 
              src={convertGoogleDriveUrl(formData.imageUrl)} 
              alt="Banner preview"
              onError={(e) => {
                (e.target as any).style.display = 'none';
              }}
            />
          )}

          <FormGroup>
            <Label>Title *</Label>
            <TextInput
              value={formData.title || ''}
              onChange={(e: any) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter banner title"
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <TextArea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter banner description"
            />
          </FormGroup>

          <FormGroup>
            <Label>Image URL (Google Drive) *</Label>
            <TextInput
              value={formData.imageUrl || ''}
              onChange={(e: any) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="Paste Google Drive image URL"
            />
          </FormGroup>

          <FormGroup>
            <Label>Link (Optional)</Label>
            <TextInput
              value={formData.link || ''}
              onChange={(e: any) => setFormData({ ...formData, link: e.target.value })}
              placeholder="Enter link for banner (e.g., /products)"
            />
          </FormGroup>

          <FormGroup>
            <Label>Position</Label>
            <NumberInput
              type="number"
              value={formData.position || 0}
              onChange={(e: any) => setFormData({ ...formData, position: parseInt(e.target.value) || 0 })}
              placeholder="0"
            />
          </FormGroup>

          <FormGroup>
            <Label>Type</Label>
            <Select 
              value={formData.type || 'promotional'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="promotional">Promotional</option>
              <option value="hero">Hero</option>
              <option value="featured">Featured</option>
              <option value="category">Category</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              <input
                type="checkbox"
                checked={formData.isActive !== false}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                style={{ marginRight: spacing[2] }}
              />
              Active
            </Label>
          </FormGroup>

          <ModalActions>
            <Button onClick={() => {
              setSelectedBanner(null);
              setFormData({});
              setIsEditMode(false);
            }}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={handleSaveBanner}>
              {isEditMode ? 'Update Banner' : 'Create Banner'}
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </>
  );
};
