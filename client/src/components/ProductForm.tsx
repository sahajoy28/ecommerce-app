import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Button, Input as FluentInput, Checkbox } from '@fluentui/react-components';
import { colors, spacing, typography } from '../styles/designTokens';
import { convertGoogleDriveUrl } from '../utils/googleDriveUrl';
import { productsApi } from '../services/apiClient';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing[8]};
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 600px) {
    gap: ${spacing[5]};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  min-width: 0;
  max-width: 100%;

  & > * {
    min-width: 0;
  }
`;

const Label = styled.label`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-primary, ${colors.neutral[900]});

  @media (max-width: 600px) {
    font-size: ${typography.fontSize.sm};
  }
`;

const Input = styled(FluentInput)`
  width: 100%;
  max-width: 100%;
  min-width: 0;

  & > * {
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  input {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  padding: ${spacing[2]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 4px;
  font-family: ${typography.fontFamily.base};
  font-size: ${typography.fontSize.sm};
  resize: vertical;
  min-height: 120px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }

  @media (max-width: 600px) {
    min-height: 80px;
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
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: ${spacing[3]};
  }
`;

const DiscountRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[4]};
  min-width: 0;
  max-width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
  min-width: 0;
  max-width: 100%;
`;

const ImageButtonContainer = styled.div`
  display: flex;
  gap: ${spacing[2]};
  max-width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;

    > input {
      width: 100%;
      flex: unset;
    }

    > button {
      width: 100%;
    }
  }
`;

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: ${spacing[3]};
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
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;

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
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: ${typography.fontSize.xs};
    padding: ${spacing[2]};
  }
`;

const HintTitle = styled.strong`
  display: block;
  margin-bottom: ${spacing[1]};
`;

const SubmitButton = styled(Button)`
  align-self: flex-end;
  min-width: 120px;

  @media (max-width: 600px) {
    align-self: stretch;
    width: 100%;
  }
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

const SpecSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing[4]};
  padding: ${spacing[6]};
  background: ${colors.neutral[50]};
  border-radius: 8px;
  border: 1px solid ${colors.neutral[200]};
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: ${spacing[3]};
  }
`;

const SizesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  margin-top: ${spacing[2]};
`;

const SizeChip = styled.button<{ $active: boolean }>`
  padding: ${spacing[1]} ${spacing[3]};
  border-radius: 20px;
  border: 1.5px solid ${(p: any) => p.$active ? colors.primary.main : colors.neutral[300]};
  background: ${(p: any) => p.$active ? colors.primary.main : 'white'};
  color: ${(p: any) => p.$active ? 'white' : colors.neutral[700]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${colors.primary.main};
  }
`;

const SelectField = styled.select`
  width: 100%;
  max-width: 100%;
  padding: ${spacing[2]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 4px;
  font-size: ${typography.fontSize.sm};
  box-sizing: border-box;
  background: white;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
  }
`;

const MATERIAL_OPTIONS = ['Tiles', 'Marble', 'Granite', 'Ceramic', 'Porcelain', 'Natural Stone', 'Bathroom Fittings', 'Other'];
const FINISH_OPTIONS = ['Glossy', 'Matte', 'Polish', 'Textured', 'Honed'];
const SIZE_OPTIONS = ['1x1', '2x1', '2x2', '2x4', '3x2', '4x2', '4x4', '6x4', '8x4', '12x6', '12x24', '24x24', '24x48', '32x32', '60x60', '60x120', '80x80', '80x120', '100x100', '120x120', '120x180'];

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
  // Tile / showroom fields
  const [material, setMaterial] = useState(initialData?.material || 'Tiles');
  const [finish, setFinish] = useState(initialData?.finish || 'Glossy');
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes || []);
  const [color, setColor] = useState(initialData?.color || '');
  const [thickness, setThickness] = useState(initialData?.specifications?.thickness || '');
  const [weight, setWeight] = useState(initialData?.specifications?.weight || '');
  const [waterAbsorption, setWaterAbsorption] = useState(initialData?.specifications?.waterAbsorption || '');
  const [mohs, setMohs] = useState(initialData?.specifications?.mohs || '');

  // Category list from API
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  // Custom filters from API
  interface FilterDef {
    _id: string;
    name: string;
    slug: string;
    type: 'checkbox' | 'select' | 'range';
    options: { label: string; value: string }[];
    icon: string;
    rangeMin?: number;
    rangeMax?: number;
    rangeUnit?: string;
  }
  const [customFilterDefs, setCustomFilterDefs] = useState<FilterDef[]>([]);
  const [customFilterValues, setCustomFilterValues] = useState<Record<string, any>>(initialData?.customFilters || {});

  const isEditing = !!initialData;

  // Fetch categories from API
  useEffect(() => {
    productsApi.get<any>('/categories').then((res: any) => {
      const names = (res.categories || []).map((c: any) => c.name).filter(Boolean);
      setCategoryOptions(names);
      // If editing a product with a category not in the list, show custom input
      if (initialData?.category && !names.includes(initialData.category)) {
        setShowCustomCategory(true);
        setCustomCategory(initialData.category);
      }
    }).catch(() => {});

    // Fetch custom filter definitions
    productsApi.get<any>('/filters').then((res: any) => {
      setCustomFilterDefs(res.filters || []);
    }).catch(() => {});
  }, []);

  // Reset form when initialData changes (e.g. switching between edit targets)
  useEffect(() => {
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
    setPrice(initialData?.price || '');
    setMrp(initialData?.mrp || '');
    setRetailPrice(initialData?.retailPrice || '');
    setDiscountType(initialData?.discount?.discountType || 'percentage');
    setDiscountValue(initialData?.discount?.discountValue || '');
    setShowPriceInListing(initialData?.showPriceInListing !== false);
    setCategory(initialData?.category || '');
    setQuantity(initialData?.quantity || '');
    setImages(initialData?.images || []);
    setImageUrl('');
    setError('');
    setSuccess('');
    setMaterial(initialData?.material || 'Tiles');
    setFinish(initialData?.finish || 'Glossy');
    setSizes(initialData?.sizes || []);
    setColor(initialData?.color || '');
    setThickness(initialData?.specifications?.thickness || '');
    setWeight(initialData?.specifications?.weight || '');
    setWaterAbsorption(initialData?.specifications?.waterAbsorption || '');
    setMohs(initialData?.specifications?.mohs || '');
    setCustomFilterValues(initialData?.customFilters || {});
  }, [initialData]);

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

    if (!title.trim() || !description.trim() || !price || !category.trim() || !quantity) {
      setError('Please fill in all required fields');
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
        images,
        material,
        finish,
        sizes,
        color,
        specifications: {
          ...(thickness && { thickness }),
          ...(weight && { weight }),
          ...(waterAbsorption && { waterAbsorption }),
          ...(mohs && { mohs }),
        },
        customFilters: customFilterValues,
      });
      setSuccess(isEditing ? 'Product updated successfully!' : 'Product added successfully!');
      if (!isEditing) {
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
        setMaterial('Tiles');
        setFinish('Glossy');
        setSizes([]);
        setColor('');
        setThickness('');
        setWeight('');
        setWaterAbsorption('');
        setMohs('');
        setCustomFilterValues({});
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || (isEditing ? 'Failed to update product' : 'Failed to add product'));
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
        <SelectField
          value={showCustomCategory ? '__custom__' : category}
          onChange={(e) => {
            if (e.target.value === '__custom__') {
              setShowCustomCategory(true);
              setCategory('');
            } else {
              setShowCustomCategory(false);
              setCategory(e.target.value);
              setCustomCategory('');
            }
          }}
          disabled={isLoading}
        >
          <option value="">Select a category</option>
          {categoryOptions.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="__custom__">+ Custom category...</option>
        </SelectField>
        {showCustomCategory && (
          <Input
            value={customCategory}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCustomCategory(event.target.value);
              setCategory(event.target.value);
            }}
            placeholder="Enter custom category name"
            disabled={isLoading}
            style={{ marginTop: '8px' }}
          />
        )}
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
        <Label>🧱 Tile / Material Specifications</Label>
        <SpecSection>
          <FormGroup>
            <Label>Material Type</Label>
            <SelectField value={material} onChange={(e) => setMaterial(e.target.value)} disabled={isLoading}>
              {MATERIAL_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
            </SelectField>
          </FormGroup>

          <FormGroup>
            <Label>Finish</Label>
            <SelectField value={finish} onChange={(e) => setFinish(e.target.value)} disabled={isLoading}>
              {FINISH_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
            </SelectField>
          </FormGroup>

          <FormGroup>
            <Label>Color</Label>
            <Input
              value={color}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setColor(event.target.value)}
              placeholder="e.g., White, Beige, Grey"
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label>Thickness</Label>
            <Input
              value={thickness}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setThickness(event.target.value)}
              placeholder="e.g., 8mm, 10mm"
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label>Weight (per box/sqft)</Label>
            <Input
              value={weight}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWeight(event.target.value)}
              placeholder="e.g., 18 kg/box"
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label>Water Absorption</Label>
            <Input
              value={waterAbsorption}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWaterAbsorption(event.target.value)}
              placeholder="e.g., &lt;0.5%"
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label>Mohs Hardness</Label>
            <Input
              value={mohs}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMohs(event.target.value)}
              placeholder="e.g., 5-6"
              disabled={isLoading}
            />
          </FormGroup>
        </SpecSection>
      </FormGroup>

      <FormGroup>
        <Label>📐 Available Sizes</Label>
        <SizesGrid>
          {SIZE_OPTIONS.map(s => (
            <SizeChip
              key={s}
              type="button"
              $active={sizes.includes(s)}
              onClick={() => setSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
              disabled={isLoading}
            >
              {s}
            </SizeChip>
          ))}
        </SizesGrid>
        <Input
          value={sizes.filter(s => !SIZE_OPTIONS.includes(s)).join(', ')}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const custom = event.target.value.split(',').map(s => s.trim()).filter(Boolean);
            setSizes([...sizes.filter(s => SIZE_OPTIONS.includes(s)), ...custom]);
          }}
          placeholder="Add custom sizes (comma separated)"
          disabled={isLoading}
          style={{ marginTop: spacing[2] }}
        />
      </FormGroup>

      {/* Custom Filter Values */}
      {customFilterDefs.length > 0 && (
        <FormGroup>
          <Label>🔍 Custom Filter Values</Label>
          <SpecSection>
            {customFilterDefs.map(fd => (
              <FormGroup key={fd._id}>
                <Label>{fd.icon} {fd.name}</Label>
                {fd.type === 'select' || fd.type === 'checkbox' ? (
                  <SelectField
                    value={customFilterValues[fd.slug] || ''}
                    onChange={(e) => setCustomFilterValues(prev => ({ ...prev, [fd.slug]: e.target.value || undefined }))}
                    disabled={isLoading}
                  >
                    <option value="">— None —</option>
                    {fd.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </SelectField>
                ) : fd.type === 'range' ? (
                  <Input
                    type="number"
                    value={customFilterValues[fd.slug] || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCustomFilterValues(prev => ({ ...prev, [fd.slug]: event.target.value ? Number(event.target.value) : undefined }))}
                    placeholder={`${fd.rangeMin ?? 0} – ${fd.rangeMax ?? 100}${fd.rangeUnit ? ` ${fd.rangeUnit}` : ''}`}
                    disabled={isLoading}
                  />
                ) : null}
              </FormGroup>
            ))}
          </SpecSection>
        </FormGroup>
      )}

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
              width: '100%',
              maxWidth: '100%',
              padding: spacing[2],
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: '4px',
              fontSize: typography.fontSize.sm,
              boxSizing: 'border-box' as const
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
        <Label>📸 Product Images (Google Drive links)</Label>
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
        {isLoading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Product' : 'Add Product')}
      </SubmitButton>
    </FormContainer>
  );
};
