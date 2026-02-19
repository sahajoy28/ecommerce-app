import styled from 'styled-components';
import { useState } from 'react';
import { Button, Input as FluentInput, Checkbox } from '@fluentui/react-components';
import { colors, spacing, typography } from '../styles/designTokens';
import { convertGoogleDriveUrl } from '../utils/googleDriveUrl';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing[8]};
  width: 100%;
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

const PricingSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing[4]};
  padding: ${spacing[6]};
  background: ${colors.neutral[50]};
  border-radius: 8px;
  border: 1px solid ${colors.neutral[200]};
`;

const DiscountRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[4]};
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const ImageButtonContainer = styled.div`
  display: flex;
  gap: ${spacing[2]};
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

const ImageUrlInput = styled.input`
  padding: ${spacing[2]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 4px;
  font-size: ${typography.fontSize.sm};
  flex: 1;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
  }
`;

const ImageHint = styled.div`
  padding: ${spacing[3]};
  background: #f0f9ff;
  border-left: 4px solid #0284c7;
  border-radius: 4px;
  font-size: ${typography.fontSize.sm};
  color: #0c4a6e;
  margin-bottom: ${spacing[3]};
  line-height: 1.5;
`;

const HintTitle = styled.strong`
  display: block;
  margin-bottom: ${spacing[1]};
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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;

const PriceInfo = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral[700]};
  padding: ${spacing[2]};
  background: white;
  border-radius: 4px;
  margin-top: ${spacing[2]};
`;

const DiscountPreview = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.success};
  margin-top: ${spacing[1]};
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
  const [mrp, setMrp] = useState(initialData?.mrp || '');
  const [retailPrice, setRetailPrice] = useState(initialData?.retailPrice || '');
  const [discountType, setDiscountType] = useState(initialData?.discount?.discountType || 'percentage');
  const [discountValue, setDiscountValue] = useState(initialData?.discount?.discountValue || '');
  const [showPriceInListing, setShowPriceInListing] = useState(initialData?.showPriceInListing !== false);
  const [category, setCategory] = useState(initialData?.category || '');
  const [quantity, setQuantity] = useState(initialData?.quantity || '');
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const calculateFinalPrice = () => {
    let finalPrice = retailPrice ? parseFloat(retailPrice) : parseFloat(price);
    if (!discountValue || !finalPrice) return finalPrice;

    if (discountType === 'percentage') {
      return finalPrice - (finalPrice * parseFloat(discountValue) / 100);
    } else {
      return finalPrice - parseFloat(discountValue);
    }
  };

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
      setError('Please fill in all required fields and add at least one image');
      return;
    }

    try {
      await onSubmit({
        title,
        description,
        price: parseFloat(price),
        mrp: mrp ? parseFloat(mrp) : null,
        retailPrice: retailPrice ? parseFloat(retailPrice) : null,
        discount: discountValue ? {
          discountType,
          discountValue: parseFloat(discountValue)
        } : {},
        showPriceInListing,
        category,
        quantity: parseInt(quantity),
        images
      });
      setSuccess('Product added successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setMrp('');
      setRetailPrice('');
      setDiscountType('percentage');
      setDiscountValue('');
      setShowPriceInListing(true);
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
        <Label>💰 Pricing</Label>
        <PricingSection>
          <FormGroup>
            <Label>Base Price ($) *</Label>
            <Input
              type="number"
              value={price}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPrice(event.target.value)}
              placeholder="0.00"
              disabled={isLoading}
              inputMode="numeric"
              step="0.01"
            />
          </FormGroup>

          <FormGroup>
            <Label>MRP (Optional)</Label>
            <Input
              type="number"
              value={mrp}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMrp(event.target.value)}
              placeholder="Maximum retail price"
              disabled={isLoading}
              inputMode="numeric"
              step="0.01"
            />
          </FormGroup>

          <FormGroup>
            <Label>Retail Price (Optional)</Label>
            <Input
              type="number"
              value={retailPrice}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRetailPrice(event.target.value)}
              placeholder="Your selling price"
              disabled={isLoading}
              inputMode="numeric"
              step="0.01"
            />
          </FormGroup>

          <FormGroup>
            <Label>Discount Type</Label>
            <select value={discountType} onChange={(e) => setDiscountType(e.target.value)} style={{
              padding: spacing[2],
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: '4px',
              fontSize: typography.fontSize.sm
            }}>
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount ($)</option>
            </select>
          </FormGroup>

          <FormGroup>
            <Label>Discount Value</Label>
            <Input
              type="number"
              value={discountValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDiscountValue(event.target.value)}
              placeholder={discountType === 'percentage' ? '0' : '0.00'}
              disabled={isLoading}
              inputMode="numeric"
              step="0.01"
            />
          </FormGroup>

          <FormGroup>
            <CheckboxWrapper>
              <Checkbox
                checked={showPriceInListing}
                onChange={(e: any) => setShowPriceInListing(e.target.checked)}
                label="Show price in product listing"
              />
            </CheckboxWrapper>
          </FormGroup>

          {discountValue && calculateFinalPrice() !== parseFloat(retailPrice || price) && (
            <DiscountPreview>
              💚 Final Price: ${calculateFinalPrice().toFixed(2)}
            </DiscountPreview>
          )}
        </PricingSection>
      </FormGroup>

      <FormGroup>
        <Label>📸 Product Images (Google Drive links) *</Label>
        <ImageHint>
          <HintTitle>💡 How to get a Google Drive image link:</HintTitle>
          1. Upload image to Google Drive<br/>
          2. Right-click → Share → Change to "Anyone with the link"<br/>
          3. Copy the link (e.g. drive.google.com/file/d/FILE_ID/view?usp=sharing)<br/>
          4. Paste below - we'll convert it automatically ✨
        </ImageHint>
        <ImageSection>
          {!showImageInput ? (
            <Button
              appearance="primary"
              onClick={() => setShowImageInput(true)}
              disabled={isLoading}
            >
              + Add Images
            </Button>
          ) : (
            <ImageButtonContainer>
              <ImageUrlInput
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste Google Drive image URL"
                disabled={isLoading}
              />
              <Button
                appearance="primary"
                onClick={handleAddImage}
                disabled={isLoading || !imageUrl}
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  setShowImageInput(false);
                  setImageUrl('');
                }}
                disabled={isLoading}
              >
                Done
              </Button>
            </ImageButtonContainer>
          )}

          {images.length > 0 && (
            <>
              <PriceInfo>
                ✅ {images.length} image(s) added
              </PriceInfo>
              <ImagePreview>
                {images.map((img, idx) => (
                  <ImagePreviewItem key={idx}>
                    <img src={convertGoogleDriveUrl(img)} alt={`Product ${idx + 1}`} onError={(e) => {
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
        </ImageSection>
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
