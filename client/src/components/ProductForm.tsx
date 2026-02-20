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

// Sizes can be entered as freeform text (comma-separated)

const ToggleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[3]} ${spacing[4]};
  background: ${colors.neutral[50]};
  border: 1px solid ${colors.neutral[200]};
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease;

  &:hover {
    background: ${colors.neutral[100]};
  }
`;

const ToggleLabel = styled.span`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-primary, ${colors.neutral[900]});
`;

const ToggleSwitch = styled.div<{ $active: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: ${(p: any) => p.$active ? colors.primary.main : colors.neutral[300]};
  position: relative;
  transition: background 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${(p: any) => p.$active ? '22px' : '2px'};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: left 0.2s ease;
  }
`;

const CollapsibleSection = styled.div<{ $open: boolean }>`
  max-height: ${(p: any) => p.$open ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const SpecRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: ${spacing[2]};
  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${spacing[1]};
  }
`;

const SpecRemoveBtn = styled.button`
  padding: ${spacing[1]} ${spacing[2]};
  border: none;
  background: ${colors.error};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${typography.fontSize.sm};
  transition: background 0.15s ease;

  &:hover {
    background: #dc2626;
  }

  @media (max-width: 600px) {
    align-self: flex-end;
  }
`;

const AddSpecRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: ${spacing[2]};
  align-items: end;
  padding-top: ${spacing[3]};
  border-top: 1px dashed ${colors.neutral[300]};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${spacing[1]};
  }
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
  const [showPricingSection, setShowPricingSection] = useState(
    initialData ? (initialData.price > 0 || initialData.mrp > 0 || initialData.retailPrice > 0) : false
  );
  const [category, setCategory] = useState(initialData?.category || '');
  const [quantity, setQuantity] = useState(initialData?.quantity || '');
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [videos, setVideos] = useState<string[]>(initialData?.videos || []);
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // Product attribute fields (generic)
  const [material, setMaterial] = useState(initialData?.material || '');
  const [finish, setFinish] = useState(initialData?.finish || '');
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes || []);
  const [color, setColor] = useState(initialData?.color || '');

  // Dynamic specifications (key-value pairs)
  const [dynamicSpecs, setDynamicSpecs] = useState<{ key: string; value: string }[]>(() => {
    if (initialData?.specifications) {
      return Object.entries(initialData.specifications)
        .filter(([k]) => k !== undefined)
        .map(([key, value]) => ({ key, value: String(value || '') }))
        .filter(s => s.key && s.value);
    }
    return [];
  });
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

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
    setShowPricingSection(initialData ? (initialData.price > 0 || initialData.mrp > 0 || initialData.retailPrice > 0) : false);
    setCategory(initialData?.category || '');
    setQuantity(initialData?.quantity || '');
    setImages(initialData?.images || []);
    setImageUrl('');
    setVideos(initialData?.videos || []);
    setVideoUrl('');
    setError('');
    setSuccess('');
    setMaterial(initialData?.material || '');
    setFinish(initialData?.finish || '');
    setSizes(initialData?.sizes || []);
    setColor(initialData?.color || '');
    setDynamicSpecs(
      initialData?.specifications
        ? Object.entries(initialData.specifications)
            .filter(([k]) => k !== undefined)
            .map(([key, value]) => ({ key, value: String(value || '') }))
            .filter(s => s.key && s.value)
        : []
    );
    setNewSpecKey('');
    setNewSpecValue('');
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

    if (!title.trim() || !description.trim() || !category.trim() || !quantity) {
      setError('Please fill in all required fields');
      return;
    }

    // Build specifications from dynamic entries
    const allSpecs: Record<string, string> = {};
    dynamicSpecs.forEach(s => {
      if (s.key.trim() && s.value.trim()) {
        allSpecs[s.key.trim()] = s.value.trim();
      }
    });

    try {
      await onSubmit({
        title,
        description,
        price: showPricingSection && price ? parseFloat(price) : 0,
        mrp: showPricingSection && mrp ? parseFloat(mrp) : null,
        retailPrice: showPricingSection && retailPrice ? parseFloat(retailPrice) : null,
        discount: showPricingSection && discountValue ? {
          discountType,
          discountValue: parseFloat(discountValue)
        } : {},
        showPriceInListing: showPricingSection ? showPriceInListing : false,
        category,
        quantity: parseInt(quantity),
        images,
        videos,
        material,
        finish,
        sizes,
        color,
        specifications: allSpecs,
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
        setVideos([]);
        setMaterial('');
        setFinish('');
        setSizes([]);
        setColor('');
        setDynamicSpecs([]);
        setNewSpecKey('');
        setNewSpecValue('');
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
        <Label>🏷️ Product Attributes</Label>
        <SpecSection>
          <FormGroup>
            <Label>Material</Label>
            <Input
              value={material}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMaterial(event.target.value)}
              placeholder="e.g., Stainless Steel, Cotton, Leather"
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label>Finish</Label>
            <Input
              value={finish}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFinish(event.target.value)}
              placeholder="e.g., Matte, Glossy, Brushed"
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label>Color</Label>
            <Input
              value={color}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setColor(event.target.value)}
              placeholder="e.g., White, Black, Red"
              disabled={isLoading}
            />
          </FormGroup>
        </SpecSection>
      </FormGroup>

      <FormGroup>
        <Label>📐 Available Sizes</Label>
        <Input
          value={sizes.join(', ')}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = event.target.value.split(',').map(s => s.trim()).filter(Boolean);
            setSizes(parsed);
          }}
          placeholder="Enter sizes (comma separated), e.g., S, M, L, XL"
          disabled={isLoading}
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

      {/* Dynamic Product Specifications */}
      <FormGroup>
        <Label>📋 Product Specifications</Label>
        <SpecSection>
          {dynamicSpecs.map((spec, idx) => (
            <SpecRow key={idx}>
              <Input
                value={spec.key}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const updated = [...dynamicSpecs];
                  updated[idx] = { ...updated[idx], key: event.target.value };
                  setDynamicSpecs(updated);
                }}
                placeholder="Specification name"
                disabled={isLoading}
              />
              <Input
                value={spec.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const updated = [...dynamicSpecs];
                  updated[idx] = { ...updated[idx], value: event.target.value };
                  setDynamicSpecs(updated);
                }}
                placeholder="Value"
                disabled={isLoading}
              />
              <SpecRemoveBtn type="button" onClick={() => setDynamicSpecs(prev => prev.filter((_, i) => i !== idx))} disabled={isLoading}>
                ✕
              </SpecRemoveBtn>
            </SpecRow>
          ))}

          <AddSpecRow>
            <FormGroup style={{ marginBottom: 0 }}>
              <Label style={{ fontSize: typography.fontSize.xs }}>Name</Label>
              <Input
                value={newSpecKey}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewSpecKey(event.target.value)}
                placeholder="e.g., Coverage Area"
                disabled={isLoading}
              />
            </FormGroup>
            <FormGroup style={{ marginBottom: 0 }}>
              <Label style={{ fontSize: typography.fontSize.xs }}>Value</Label>
              <Input
                value={newSpecValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewSpecValue(event.target.value)}
                placeholder="e.g., 15 sqft/box"
                disabled={isLoading}
              />
            </FormGroup>
            <button
              type="button"
              onClick={() => {
                if (newSpecKey.trim() && newSpecValue.trim()) {
                  setDynamicSpecs(prev => [...prev, { key: newSpecKey.trim(), value: newSpecValue.trim() }]);
                  setNewSpecKey('');
                  setNewSpecValue('');
                }
              }}
              disabled={isLoading || !newSpecKey.trim() || !newSpecValue.trim()}
              style={{
                padding: `${spacing[2]} ${spacing[4]}`,
                background: colors.primary.main,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: typography.fontWeight.semibold,
                fontSize: typography.fontSize.sm,
                whiteSpace: 'nowrap' as const,
                opacity: (!newSpecKey.trim() || !newSpecValue.trim()) ? 0.5 : 1,
                alignSelf: 'end',
                marginBottom: '2px'
              }}
            >
              + Add
            </button>
          </AddSpecRow>
        </SpecSection>
      </FormGroup>

      <FormGroup>
        <ToggleHeader onClick={() => setShowPricingSection(!showPricingSection)}>
          <ToggleLabel>💰 Pricing</ToggleLabel>
          <ToggleSwitch $active={showPricingSection} />
        </ToggleHeader>
        <CollapsibleSection $open={showPricingSection}>
          <PricingSection style={{ marginTop: spacing[3] }}>
            <FormGroup>
              <Label>Base Price ($)</Label>
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
        </CollapsibleSection>
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

      <FormGroup>
        <Label>🎬 Product Videos (YouTube / direct links)</Label>
        <ImageHint>
          <HintTitle>💡 Supported video links:</HintTitle>
          YouTube links (e.g. youtube.com/watch?v=...)<br/>
          Direct video URLs (.mp4, .webm)<br/>
          Google Drive video links
        </ImageHint>
        <ImageSection>
          {!showVideoInput ? (
            <Button
              appearance="primary"
              onClick={() => setShowVideoInput(true)}
              disabled={isLoading}
            >
              + Add Video
            </Button>
          ) : (
            <ImageButtonContainer>
              <ImageUrlInput
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste video URL (YouTube, .mp4, etc.)"
                disabled={isLoading}
              />
              <Button
                appearance="primary"
                onClick={() => {
                  if (videoUrl.trim()) {
                    setVideos([...videos, videoUrl.trim()]);
                    setVideoUrl('');
                  }
                }}
                disabled={isLoading || !videoUrl}
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  setShowVideoInput(false);
                  setVideoUrl('');
                }}
                disabled={isLoading}
              >
                Done
              </Button>
            </ImageButtonContainer>
          )}

          {videos.length > 0 && (
            <PriceInfo>
              🎬 {videos.length} video(s) added
              {videos.map((v, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '12px' }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{v}</span>
                  <button type="button" onClick={() => setVideos(videos.filter((_, i) => i !== idx))} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </div>
              ))}
            </PriceInfo>
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
