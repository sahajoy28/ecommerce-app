import styled from 'styled-components';
import { useState } from 'react';
import { Button, Input as FluentInput, Field } from '@fluentui/react-components';
import { colors, spacing, typography } from '../styles/designTokens';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing[8]};
  max-width: 600px;
  padding: ${spacing[8]};
  background: var(--color-bg-primary, ${colors.neutral[50]});
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const Label = styled.label`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-primary, ${colors.neutral[900]});
`;

const Input = styled(FluentInput)`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${spacing[2]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 4px;
  font-family: ${typography.fontFamily.base};
  font-size: ${typography.fontSize.sm};
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }
`;

const ImageUrlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const ImageUrlInput = styled.input`
  padding: ${spacing[2]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 4px;
  font-size: ${typography.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
  }
`;

const AddImageButton = styled(Button)`
  width: fit-content;
`;

const RemoveButton = styled.button`
  padding: 4px 8px;
  background: ${colors.error};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${typography.fontSize.sm};

  &:hover {
    background: rgba(239, 68, 68, 0.8);
  }
`;

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${spacing[4]};
  margin-top: ${spacing[4]};
`;

const ImagePreviewItem = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: ${colors.neutral[200]};
  aspect-ratio: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 2px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const SubmitButton = styled(Button)`
  align-self: flex-end;
  min-width: 120px;
`;

const ErrorMessage = styled.div`
  color: ${colors.error};
  font-size: ${typography.fontSize.sm};
  padding: ${spacing[2]};
  background: rgba(239, 68, 68, 0.1);
  border-radius: 4px;
`;

const SuccessMessage = styled.div`
  color: ${colors.success};
  font-size: ${typography.fontSize.sm};
  padding: ${spacing[2]};
  background: rgba(16, 185, 129, 0.1);
  border-radius: 4px;
`;

interface ProductFormProps {
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
  isLoading?: boolean;
}

export const ProductForm = ({ onSubmit, initialData, isLoading = false }: ProductFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [quantity, setQuantity] = useState(initialData?.quantity || '');
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddImage = () => {
    if (!imageUrl.trim()) {
      setError('Please enter an image URL');
      return;
    }
    if (images.includes(imageUrl)) {
      setError('This image URL already exists');
      return;
    }
    setImages([...images, imageUrl]);
    setImageUrl('');
    setError('');
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim() || !description.trim() || !price || !category.trim() || !quantity || images.length === 0) {
      setError('Please fill in all fields and add at least one image');
      return;
    }

    try {
      await onSubmit({
        title,
        description,
        price: parseFloat(price),
        category,
        quantity: parseInt(quantity),
        images
      });
      setSuccess('Product added successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setQuantity('');
      setImages([]);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to add product');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <FormGroup>
        <Label>Product Title *</Label>
        <Input
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
          placeholder="Enter product title"
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label>Description *</Label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label>Price ($) *</Label>
        <Input
          type="number"
          value={price}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPrice(event.target.value)}
          placeholder="Enter price"
          disabled={isLoading}
          inputMode="numeric"
        />
      </FormGroup>

      <FormGroup>
        <Label>Category *</Label>
        <Input
          value={category}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCategory(event.target.value)}
          placeholder="e.g., Electronics, Clothing, Furniture"
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label>Quantity in Stock *</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuantity(event.target.value)}
          placeholder="Enter quantity"
          disabled={isLoading}
          inputMode="numeric"
        />
      </FormGroup>

      <FormGroup>
        <Label>Product Images (Google Drive links) *</Label>
        <ImageUrlsContainer>
          <div style={{ display: 'flex', gap: spacing[2] }}>
            <ImageUrlInput
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste Google Drive image URL"
              disabled={isLoading}
            />
            <AddImageButton
              appearance="primary"
              onClick={handleAddImage}
              disabled={isLoading || !imageUrl}
            >
              Add Image
            </AddImageButton>
          </div>
          {images.length > 0 && (
            <>
              <p style={{ fontSize: typography.fontSize.sm, color: colors.neutral[600] }}>
                {images.length} image(s) added
              </p>
              <ImagePreview>
                {images.map((img, idx) => (
                  <ImagePreviewItem key={idx}>
                    <img src={img} alt={`Product ${idx + 1}`} onError={(e) => {
                      (e.target as any).style.display = 'none';
                    }} />
                    <RemoveImageButton onClick={() => handleRemoveImage(idx)}>
                      ✕
                    </RemoveImageButton>
                  </ImagePreviewItem>
                ))}
              </ImagePreview>
            </>
          )}
        </ImageUrlsContainer>
      </FormGroup>

      <SubmitButton
        appearance="primary"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add Product'}
      </SubmitButton>
    </FormContainer>
  );
};
