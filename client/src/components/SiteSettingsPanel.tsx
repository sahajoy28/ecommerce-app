import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import { Button, Spinner, Input } from '@fluentui/react-components';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/designTokens';
import { userAPI } from '../services/userAPI';
import { authApi, productsApi } from '../services/apiClient';

// ===================== STYLED COMPONENTS =====================

const Container = styled.div`
  width: 100%;
  max-width: 900px;
`;



const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[5]};
`;

const SectionHeader = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[800]};
  margin: ${spacing[2]} 0 ${spacing[1]};
  padding-bottom: ${spacing[2]};
  border-bottom: 1px solid ${colors.neutral[200]};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const Label = styled.label`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[700]};
`;

const HelpText = styled.span`
  font-size: ${typography.fontSize.xs};
  color: ${colors.neutral[500]};
  margin-top: 2px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  input { width: 100%; min-height: 40px; }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${spacing[3]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 6px;
  font-family: inherit;
  font-size: ${typography.fontSize.sm};
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px ${colors.primary.lighter};
  }
`;

const MapPreview = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${colors.neutral[200]};
  background: ${colors.neutral[100]};
  iframe { width: 100%; height: 100%; border: 0; }
  @media (max-width: 600px) { height: 200px; }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[4]};
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const SuccessMessage = styled.div`
  padding: ${spacing[3]} ${spacing[4]};
  background: rgba(16, 185, 129, 0.1);
  color: ${colors.success};
  border-radius: 6px;
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.sm};
`;

const ErrorMessage = styled.div`
  padding: ${spacing[3]} ${spacing[4]};
  background: rgba(239, 68, 68, 0.1);
  color: ${colors.error};
  border-radius: 6px;
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.sm};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${spacing[3]};
  padding-top: ${spacing[4]};
  @media (max-width: 600px) { button { width: 100%; } }
`;

const ColorGrid = styled.div`
  display: flex;
  gap: ${spacing[3]};
  flex-wrap: wrap;
`;

const ColorSwatch = styled.button<{ $color: string; $active: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${borderRadius.md};
  background: ${(props: any) => props.$color};
  border: 3px solid ${(props: any) => props.$active ? colors.neutral[900] : 'transparent'};
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  box-shadow: ${(props: any) => props.$active ? shadows.md : shadows.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { transform: scale(1.1); }
`;

const ColorLabel = styled.span`
  font-size: ${typography.fontSize.xs};
  text-transform: capitalize;
  text-align: center;
  color: ${colors.neutral[600]};
`;

const ColorSwatchGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[1]};
`;

const ThemeToggleRow = styled.div`
  display: flex;
  gap: ${spacing[3]};
`;

const ThemeOption = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: ${spacing[4]};
  border-radius: ${borderRadius.md};
  border: 2px solid ${(props: any) => props.$active ? colors.primary.main : colors.neutral[200]};
  background: ${(props: any) => props.$active ? colors.primary.lighter : 'transparent'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[2]};
  transition: all 0.2s;
  font-size: ${typography.fontSize.sm};
  font-weight: ${(props: any) => props.$active ? typography.fontWeight.semibold : typography.fontWeight.normal};
  color: ${(props: any) => props.$active ? colors.primary.main : colors.neutral[600]};
  &:hover { border-color: ${colors.primary.light}; }
`;

const TestimonialRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  padding: ${spacing[3]};
  border: 1px solid ${colors.neutral[200]};
  border-radius: ${borderRadius.md};
  background: ${colors.neutral[50]};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${colors.error};
  cursor: pointer;
  font-size: ${typography.fontSize.xs};
  align-self: flex-end;
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.sm};
  &:hover { background: rgba(239, 68, 68, 0.1); }
`;

// ---- Category Manager Styled Components ----

const CatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${spacing[4]};
`;

const CatCard = styled.div<{ $inactive?: boolean }>`
  border: 1px solid ${colors.neutral[200]};
  border-radius: ${borderRadius.md};
  padding: ${spacing[4]};
  background: ${(props: any) => props.$inactive ? colors.neutral[100] : 'white'};
  opacity: ${(props: any) => props.$inactive ? 0.65 : 1};
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  position: relative;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: ${shadows.md}; }
`;

const CatPreview = styled.div<{ $bg?: string }>`
  width: 100%;
  height: 100px;
  border-radius: ${borderRadius.sm};
  background: ${(props: any) => props.$bg || `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark})`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  overflow: hidden;
`;

const CatBadge = styled.span<{ $type: 'predefined' | 'custom' | 'hidden' }>`
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
  ${(props: any) => {
    switch (props.$type) {
      case 'predefined': return `background: ${colors.primary.lighter}; color: ${colors.primary.main};`;
      case 'hidden': return `background: ${colors.neutral[200]}; color: ${colors.neutral[600]};`;
      default: return `background: #e8f5e9; color: #388e3c;`;
    }
  }}
`;

const CatActions = styled.div`
  display: flex;
  gap: ${spacing[2]};
  flex-wrap: wrap;
`;

const SmallBtn = styled.button<{ $variant?: 'danger' | 'toggle' }>`
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${colors.neutral[300]};
  background: white;
  transition: all 0.15s;
  ${(props: any) => props.$variant === 'danger' && `
    color: ${colors.error};
    border-color: ${colors.error};
    &:hover { background: rgba(239,68,68,0.1); }
  `}
  ${(props: any) => props.$variant === 'toggle' && `
    color: ${colors.primary.main};
    border-color: ${colors.primary.main};
    &:hover { background: ${colors.primary.lighter}; }
  `}
  &:hover { opacity: 0.85; }
`;

const AddCatForm = styled.div`
  border: 2px dashed ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
  padding: ${spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  background: ${colors.neutral[50]};
`;

const CatInlineRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[3]};
  @media (max-width: 400px) { grid-template-columns: 1fr; }
`;

const GRADIENT_PRESETS = [
  { label: 'Purple Blue', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { label: 'Ocean', value: 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)' },
  { label: 'Sunset', value: 'linear-gradient(135deg, #ff6b35 0%, #f7c948 100%)' },
  { label: 'Forest', value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { label: 'Rose', value: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)' },
  { label: 'Slate', value: 'linear-gradient(135deg, #636e72 0%, #b2bec3 100%)' },
  { label: 'Gold', value: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { label: 'Night', value: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
];

const GradientPicker = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const GradientSwatch = styled.button<{ $bg: string; $active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: ${(props: any) => props.$bg};
  border: 2px solid ${(props: any) => props.$active ? colors.neutral[900] : 'transparent'};
  cursor: pointer;
  transition: all 0.15s;
  &:hover { transform: scale(1.15); }
`;

// ===================== TYPES =====================

interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  gradient: string;
  displayOrder: number;
  isActive: boolean;
  showOnHome: boolean;
  isPredefined: boolean;
}

export type SettingsTabKey = 'general' | 'appearance' | 'hero' | 'categories' | 'filters' | 'stats' | 'testimonials' | 'about' | 'contact' | 'inquiry';

export const SETTINGS_TABS: { key: SettingsTabKey; label: string; icon: string }[] = [
  { key: 'general', label: 'General', icon: '🏢' },
  { key: 'appearance', label: 'Appearance', icon: '🎨' },
  { key: 'hero', label: 'Hero', icon: '🏠' },
  { key: 'categories', label: 'Categories', icon: '📂' },
  { key: 'filters', label: 'Filters', icon: '🔍' },
  { key: 'stats', label: 'Stats', icon: '📊' },
  { key: 'testimonials', label: 'Testimonials', icon: '💬' },
  { key: 'about', label: 'About', icon: '📄' },
  { key: 'contact', label: 'Contact', icon: '📍' },
  { key: 'inquiry', label: 'Inquiry Form', icon: '📝' },
];

interface SiteSettingsPanelProps {
  activeTab?: SettingsTabKey;
}

interface InquiryFieldConfig {
  fieldName: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select';
  required: boolean;
  enabled: boolean;
  placeholder: string;
  options: string[];
  displayOrder: number;
}

interface CatalogFilterConfig {
  key: string;
  label: string;
  icon: string;
  enabled: boolean;
  displayOrder: number;
}

interface SiteSettingsData {
  businessName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  themeMode: string;
  accentColor: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCategories: string;
  heroCategoryIcons: string;
  heroCategoryImages: string;
  statsProducts: string;
  statsYears: string;
  statsClients: string;
  statsBrands: string;
  testimonials: { text: string; author: string }[];
  aboutTitle: string;
  aboutSubtitle: string;
  aboutStory: string;
  aboutOfferings: string;
  aboutCategories: string;
  aboutBrands: string;
  aboutShowroom: string;
  aboutWhyChooseUs: string;
  aboutShowroomImages: string;
  mapEmbedUrl: string;
  mapLatitude: string;
  mapLongitude: string;
  mapZoom: string;
  smtpEmail: string;
  smtpAppPassword: string;
  inquiryFormFields: InquiryFieldConfig[];
  inquiryFormTitle: string;
  showWhatsAppButton: boolean;
  showCallButton: boolean;
  showSqftCalculator: boolean;
  catalogFilterConfig: CatalogFilterConfig[];
}

const DEFAULT_SETTINGS: SiteSettingsData = {
  businessName: '',
  phone: '',
  whatsappNumber: '',
  email: '',
  address: '',
  themeMode: 'light',
  accentColor: 'blue',
  heroTitle: '',
  heroSubtitle: '',
  heroCategories: '',
  heroCategoryIcons: '',
  heroCategoryImages: '',
  statsProducts: '500+',
  statsYears: '15+',
  statsClients: '5000+',
  statsBrands: '50+',
  testimonials: [],
  aboutTitle: 'About Us',
  aboutSubtitle: '',
  aboutStory: '',
  aboutOfferings: '',
  aboutCategories: '',
  aboutBrands: '',
  aboutShowroom: '',
  aboutWhyChooseUs: '',
  aboutShowroomImages: '',
  mapEmbedUrl: '',
  mapLatitude: '',
  mapLongitude: '',
  mapZoom: '15',
  smtpEmail: '',
  smtpAppPassword: '',
  inquiryFormFields: [
    { fieldName: 'name', label: 'Your Name', type: 'text', required: true, enabled: true, placeholder: 'Full name', options: [], displayOrder: 0 },
    { fieldName: 'email', label: 'Email Address', type: 'email', required: true, enabled: true, placeholder: 'your@email.com', options: [], displayOrder: 1 },
    { fieldName: 'phone', label: 'Phone Number', type: 'tel', required: true, enabled: true, placeholder: '+91 98765 43210', options: [], displayOrder: 2 },
    { fieldName: 'quantity', label: 'Quantity Required', type: 'number', required: true, enabled: true, placeholder: 'e.g., 100', options: [], displayOrder: 3 },
    { fieldName: 'quantityUnit', label: 'Unit', type: 'select', required: false, enabled: true, placeholder: '', options: ['Units', 'Pieces', 'Sets', 'Kg', 'Boxes'], displayOrder: 4 },
    { fieldName: 'message', label: 'Additional Message / Requirements', type: 'textarea', required: false, enabled: true, placeholder: 'Tell us more about your needs...', options: [], displayOrder: 5 },
  ],
  inquiryFormTitle: 'Request Quote / Inquiry',
  showWhatsAppButton: true,
  showCallButton: true,
  showSqftCalculator: false,
  catalogFilterConfig: [
    { key: 'category', label: 'Categories', icon: '📂', enabled: true, displayOrder: 0 },
    { key: 'material', label: 'Material', icon: '🏷️', enabled: true, displayOrder: 1 },
    { key: 'finish', label: 'Finish', icon: '✨', enabled: true, displayOrder: 2 },
    { key: 'size', label: 'Size', icon: '📐', enabled: true, displayOrder: 3 },
    { key: 'color', label: 'Color', icon: '🎨', enabled: true, displayOrder: 4 },
    { key: 'price', label: 'Price Range', icon: '💰', enabled: true, displayOrder: 5 },
    { key: 'rating', label: 'Min. Rating', icon: '⭐', enabled: true, displayOrder: 6 },
  ],
};

const ACCENT_COLORS: { key: string; color: string }[] = [
  { key: 'blue', color: '#0066ff' },
  { key: 'orange', color: '#ff6b35' },
  { key: 'purple', color: '#8b5cf6' },
  { key: 'green', color: '#10b981' },
  { key: 'red', color: '#ef4444' },
];

// ===================== HELPERS =====================

function extractMapUrl(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/src=["']([^"']+)["']/i);
  if (match) return match[1];
  return trimmed;
}

function buildMapPreviewUrl(settings: SiteSettingsData): string {
  const embedUrl = extractMapUrl(settings.mapEmbedUrl);
  if (embedUrl) return embedUrl;
  const lat = parseFloat(settings.mapLatitude);
  const lng = parseFloat(settings.mapLongitude);
  const zoom = parseInt(settings.mapZoom) || 15;
  if (!isNaN(lat) && !isNaN(lng)) {
    return `https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${lat},${lng}&t=&z=${zoom}&ie=UTF8&iwloc=B&output=embed`;
  }
  return '';
}

function arrToStr(val: any): string {
  return Array.isArray(val) ? val.join(', ') : (val || '');
}

// ===================== COMPONENT =====================

export const SiteSettingsPanel = ({ activeTab = 'general' }: SiteSettingsPanelProps) => {
  const [settings, setSettings] = useState<SiteSettingsData>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Category manager state
  const [catList, setCatList] = useState<CategoryData[]>([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catMsg, setCatMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<CategoryData>>({});
  const [newCat, setNewCat] = useState({ name: '', icon: '📦', image: '', gradient: '', showOnHome: true });
  const [showAddForm, setShowAddForm] = useState(false);

  // Custom filters state
  interface FilterData {
    _id: string;
    name: string;
    slug: string;
    type: 'checkbox' | 'select' | 'range';
    options: { label: string; value: string }[];
    rangeMin?: number;
    rangeMax?: number;
    rangeUnit?: string;
    icon: string;
    displayOrder: number;
    isActive: boolean;
    showInSidebar: boolean;
  }
  const [filterList, setFilterList] = useState<FilterData[]>([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterMsg, setFilterMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingFilter, setEditingFilter] = useState<string | null>(null);
  const [filterEditForm, setFilterEditForm] = useState<Partial<FilterData>>({});
  const [newFilter, setNewFilter] = useState<Partial<FilterData>>({ name: '', type: 'checkbox', options: [], icon: '🏷️', isActive: true, showInSidebar: true });
  const [showAddFilterForm, setShowAddFilterForm] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState('');
  const [editOptionLabel, setEditOptionLabel] = useState('');

  // Inquiry form config state
  const [newFieldForm, setNewFieldForm] = useState<InquiryFieldConfig>({
    fieldName: '', label: '', type: 'text', required: false, enabled: true, placeholder: '', options: [], displayOrder: 999
  });
  const [showAddFieldForm, setShowAddFieldForm] = useState(false);
  const [newFieldOption, setNewFieldOption] = useState('');

  const loadCategories = useCallback(async () => {
    try {
      setCatLoading(true);
      const res = await productsApi.get<any>('/categories?all=true');
      setCatList(res.categories || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setCatLoading(false);
    }
  }, []);

  const loadFilters = useCallback(async () => {
    try {
      setFilterLoading(true);
      const res = await authApi.get<any>('/filters');
      setFilterList(res.filters || []);
    } catch (err) {
      console.error('Failed to load filters:', err);
    } finally {
      setFilterLoading(false);
    }
  }, []);

  useEffect(() => { loadSettings(); loadCategories(); loadFilters(); }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getSiteSettings();
      setSettings({
        businessName: data.businessName || '',
        phone: data.phone || '',
        whatsappNumber: data.whatsappNumber || '',
        email: data.email || '',
        address: data.address || '',
        themeMode: data.themeMode || 'light',
        accentColor: data.accentColor || 'blue',
        heroTitle: data.heroTitle || '',
        heroSubtitle: data.heroSubtitle || '',
        heroCategories: arrToStr(data.heroCategories),
        heroCategoryIcons: arrToStr(data.heroCategoryIcons),
        heroCategoryImages: arrToStr(data.heroCategoryImages),
        statsProducts: data.statsProducts || '500+',
        statsYears: data.statsYears || '15+',
        statsClients: data.statsClients || '5000+',
        statsBrands: data.statsBrands || '50+',
        testimonials: Array.isArray(data.testimonials) && data.testimonials.length > 0
          ? data.testimonials : [],
        aboutTitle: data.aboutTitle || 'About Us',
        aboutSubtitle: data.aboutSubtitle || '',
        aboutStory: data.aboutStory || '',
        aboutOfferings: data.aboutOfferings || '',
        aboutCategories: arrToStr(data.aboutCategories),
        aboutBrands: arrToStr(data.aboutBrands),
        aboutShowroom: data.aboutShowroom || '',
        aboutWhyChooseUs: data.aboutWhyChooseUs || '',
        aboutShowroomImages: arrToStr(data.aboutShowroomImages),
        mapEmbedUrl: data.mapEmbedUrl || '',
        mapLatitude: data.mapLatitude != null ? String(data.mapLatitude) : '',
        mapLongitude: data.mapLongitude != null ? String(data.mapLongitude) : '',
        mapZoom: data.mapZoom != null ? String(data.mapZoom) : '15',
        smtpEmail: data.smtpEmail || '',
        smtpAppPassword: data.smtpAppPassword || '',
        inquiryFormFields: Array.isArray(data.inquiryFormFields) && data.inquiryFormFields.length > 0
          ? data.inquiryFormFields : DEFAULT_SETTINGS.inquiryFormFields,
        inquiryFormTitle: data.inquiryFormTitle || 'Request Quote / Inquiry',
        showWhatsAppButton: data.showWhatsAppButton !== false,
        showCallButton: data.showCallButton !== false,
        showSqftCalculator: data.showSqftCalculator !== false,
        catalogFilterConfig: Array.isArray(data.catalogFilterConfig) && data.catalogFilterConfig.length > 0
          ? data.catalogFilterConfig : DEFAULT_SETTINGS.catalogFilterConfig,
      });
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const payload: any = {
        businessName: settings.businessName,
        phone: settings.phone,
        whatsappNumber: settings.whatsappNumber,
        email: settings.email,
        address: settings.address,
        themeMode: settings.themeMode,
        accentColor: settings.accentColor,
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        statsProducts: settings.statsProducts,
        statsYears: settings.statsYears,
        statsClients: settings.statsClients,
        statsBrands: settings.statsBrands,
        testimonials: settings.testimonials.filter(t => t.text || t.author),
        aboutTitle: settings.aboutTitle,
        aboutSubtitle: settings.aboutSubtitle,
        aboutStory: settings.aboutStory,
        aboutOfferings: settings.aboutOfferings,
        aboutCategories: settings.aboutCategories.split(',').map(s => s.trim()).filter(Boolean),
        aboutBrands: settings.aboutBrands.split(',').map(s => s.trim()).filter(Boolean),
        aboutShowroom: settings.aboutShowroom,
        aboutWhyChooseUs: settings.aboutWhyChooseUs,
        aboutShowroomImages: settings.aboutShowroomImages.split(',').map(s => s.trim()).filter(Boolean),
        mapEmbedUrl: extractMapUrl(settings.mapEmbedUrl),
        mapZoom: parseInt(settings.mapZoom) || 15,
        smtpEmail: settings.smtpEmail,
        smtpAppPassword: settings.smtpAppPassword,
        inquiryFormFields: settings.inquiryFormFields,
        inquiryFormTitle: settings.inquiryFormTitle,
        showWhatsAppButton: settings.showWhatsAppButton,
        showCallButton: settings.showCallButton,
        showSqftCalculator: settings.showSqftCalculator,
        catalogFilterConfig: settings.catalogFilterConfig,
      };
      if (settings.mapLatitude) payload.mapLatitude = parseFloat(settings.mapLatitude);
      if (settings.mapLongitude) payload.mapLongitude = parseFloat(settings.mapLongitude);

      await userAPI.updateSiteSettings(payload);
      setMessage({ type: 'success', text: '✓ Settings saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof SiteSettingsData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }
  ) => {
    let value = e.target.value;
    if (field === 'mapEmbedUrl' && value.includes('<iframe')) {
      value = extractMapUrl(value);
    }
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const inputChange = (field: keyof SiteSettingsData) => (e: any) =>
    handleChange(field)({ target: { value: e.target.value } });

  // Testimonials helpers
  const addTestimonial = () => {
    setSettings(prev => ({ ...prev, testimonials: [...prev.testimonials, { text: '', author: '' }] }));
  };
  const updateTestimonial = (idx: number, key: 'text' | 'author', val: string) => {
    setSettings(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((t, i) => i === idx ? { ...t, [key]: val } : t)
    }));
  };
  const removeTestimonial = (idx: number) => {
    setSettings(prev => ({ ...prev, testimonials: prev.testimonials.filter((_, i) => i !== idx) }));
  };

  const previewUrl = buildMapPreviewUrl(settings);

  if (loading) {
    return <Spinner label="Loading settings..." />;
  }

  // ===================== TAB RENDERERS =====================

  const renderGeneralTab = () => (
    <TabContent>
      <SectionHeader>🏢 Business Information</SectionHeader>
      <FieldGroup>
        <Label>Business Name</Label>
        <StyledInput placeholder="Your Business Name" value={settings.businessName} onChange={inputChange('businessName')} />
      </FieldGroup>
      <Row>
        <FieldGroup>
          <Label>Phone</Label>
          <StyledInput placeholder="+91 98765 43210" value={settings.phone} onChange={inputChange('phone')} />
        </FieldGroup>
        <FieldGroup>
          <Label>WhatsApp Number</Label>
          <HelpText>Include country code, e.g. 919876543210</HelpText>
          <StyledInput placeholder="919876543210" value={settings.whatsappNumber} onChange={inputChange('whatsappNumber')} />
        </FieldGroup>
      </Row>
      <FieldGroup>
        <Label>Email</Label>
        <StyledInput type="email" placeholder="contact@yourbusiness.com" value={settings.email} onChange={inputChange('email')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Address</Label>
        <TextArea placeholder="Full business address" value={settings.address} onChange={handleChange('address')} />
      </FieldGroup>
    </TabContent>
  );

  const renderAppearanceTab = () => (
    <TabContent>
      <SectionHeader>🎨 Site Appearance</SectionHeader>
      <HelpText>These settings apply to all pages for all visitors.</HelpText>
      <FieldGroup>
        <Label>Theme Mode</Label>
        <ThemeToggleRow>
          <ThemeOption $active={settings.themeMode === 'light'} onClick={() => setSettings(p => ({ ...p, themeMode: 'light' }))}>
            <span style={{ fontSize: '1.5rem' }}>☀️</span>Light
          </ThemeOption>
          <ThemeOption $active={settings.themeMode === 'dark'} onClick={() => setSettings(p => ({ ...p, themeMode: 'dark' }))}>
            <span style={{ fontSize: '1.5rem' }}>🌙</span>Dark
          </ThemeOption>
        </ThemeToggleRow>
      </FieldGroup>
      <FieldGroup>
        <Label>Accent Color</Label>
        <HelpText>Primary brand color used across the site.</HelpText>
        <ColorGrid>
          {ACCENT_COLORS.map(({ key, color }) => (
            <ColorSwatchGroup key={key}>
              <ColorSwatch
                $color={color}
                $active={settings.accentColor === key}
                onClick={() => setSettings(p => ({ ...p, accentColor: key }))}
              >
                {settings.accentColor === key && <span style={{ color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>✓</span>}
              </ColorSwatch>
              <ColorLabel>{key}</ColorLabel>
            </ColorSwatchGroup>
          ))}
        </ColorGrid>
      </FieldGroup>
    </TabContent>
  );

  const renderHeroTab = () => (
    <TabContent>
      <SectionHeader>🏠 Hero Section</SectionHeader>
      <FieldGroup>
        <Label>Hero Title</Label>
        <StyledInput placeholder="Discover Premium Products for Every Lifestyle" value={settings.heroTitle} onChange={inputChange('heroTitle')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Hero Subtitle</Label>
        <TextArea placeholder="Shop curated collections of electronics, fashion, home essentials, and more" value={settings.heroSubtitle} onChange={handleChange('heroSubtitle')} />
      </FieldGroup>
    </TabContent>
  );

  const renderCategoriesTab = () => {
    const handleAddCategory = async () => {
      if (!newCat.name.trim()) return;
      try {
        setCatMsg(null);
        await authApi.post('/categories', newCat);
        setCatMsg({ type: 'success', text: `Category "${newCat.name}" added!` });
        setNewCat({ name: '', icon: '📦', image: '', gradient: '', showOnHome: true });
        setShowAddForm(false);
        await loadCategories();
        setTimeout(() => setCatMsg(null), 3000);
      } catch (err: any) {
        setCatMsg({ type: 'error', text: err?.details?.message || err?.message || 'Failed to add category' });
      }
    };

    const handleUpdateCategory = async (id: string) => {
      try {
        setCatMsg(null);
        await authApi.put(`/categories/${id}`, editForm);
        setCatMsg({ type: 'success', text: 'Category updated!' });
        setEditingCat(null);
        setEditForm({});
        await loadCategories();
        setTimeout(() => setCatMsg(null), 3000);
      } catch (err: any) {
        setCatMsg({ type: 'error', text: err?.details?.message || err?.message || 'Failed to update' });
      }
    };

    const handleDeleteCategory = async (cat: CategoryData) => {
      if (!window.confirm(`Delete category "${cat.name}"? Products with this category won't be affected.`)) return;
      try {
        setCatMsg(null);
        await authApi.delete(`/categories/${cat._id}`);
        setCatMsg({ type: 'success', text: `Category "${cat.name}" deleted.` });
        await loadCategories();
        setTimeout(() => setCatMsg(null), 3000);
      } catch (err: any) {
        setCatMsg({ type: 'error', text: err?.details?.message || err?.message || 'Failed to delete' });
      }
    };

    const handleToggle = async (cat: CategoryData, field: 'isActive' | 'showOnHome') => {
      try {
        await authApi.put(`/categories/${cat._id}`, { [field]: !cat[field] });
        await loadCategories();
      } catch (err) {
        console.error('Toggle failed:', err);
      }
    };

    const startEdit = (cat: CategoryData) => {
      setEditingCat(cat._id);
      setEditForm({ name: cat.name, icon: cat.icon, image: cat.image, gradient: cat.gradient });
    };

    const getPreviewBg = (cat: { image?: string; gradient?: string }) => {
      if (cat.image) return `url('${cat.image}')`;
      if (cat.gradient) return cat.gradient;
      return `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark})`;
    };

    return (
      <TabContent>
        <SectionHeader>📂 Category Management</SectionHeader>
        <HelpText>Manage categories that appear on the home page and in product filters. Each category can have a background image, icon, or gradient.</HelpText>

        {catMsg && (
          catMsg.type === 'success'
            ? <SuccessMessage>{catMsg.text}</SuccessMessage>
            : <ErrorMessage>{catMsg.text}</ErrorMessage>
        )}

        {catLoading ? <Spinner label="Loading categories..." /> : (
          <CatGrid>
            {catList.map(cat => (
              <CatCard key={cat._id} $inactive={!cat.isActive}>
                <CatPreview $bg={getPreviewBg(cat)} style={cat.image ? { backgroundImage: `url('${cat.image}')` } : cat.gradient ? { background: cat.gradient } : undefined}>
                  {!cat.image && <span>{cat.icon}</span>}
                </CatPreview>

                {editingCat === cat._id ? (
                  <>
                    <FieldGroup>
                      <Label>Name</Label>
                      <StyledInput value={editForm.name || ''} onChange={(e: any) => setEditForm(f => ({ ...f, name: e.target.value }))} />
                    </FieldGroup>
                    <CatInlineRow>
                      <FieldGroup>
                        <Label>Icon (emoji)</Label>
                        <StyledInput value={editForm.icon || ''} onChange={(e: any) => setEditForm(f => ({ ...f, icon: e.target.value }))} />
                      </FieldGroup>
                      <FieldGroup>
                        <Label>Image URL</Label>
                        <StyledInput value={editForm.image || ''} onChange={(e: any) => setEditForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." />
                      </FieldGroup>
                    </CatInlineRow>
                    <FieldGroup>
                      <Label>Gradient (or leave empty for default)</Label>
                      <GradientPicker>
                        <GradientSwatch $bg="transparent" $active={!editForm.gradient} onClick={() => setEditForm(f => ({ ...f, gradient: '' }))} style={{ border: '2px dashed #ccc', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</GradientSwatch>
                        {GRADIENT_PRESETS.map(g => (
                          <GradientSwatch key={g.label} $bg={g.value} $active={editForm.gradient === g.value} onClick={() => setEditForm(f => ({ ...f, gradient: g.value }))} title={g.label} />
                        ))}
                      </GradientPicker>
                    </FieldGroup>
                    <CatActions>
                      <SmallBtn $variant="toggle" onClick={() => handleUpdateCategory(cat._id)}>Save</SmallBtn>
                      <SmallBtn onClick={() => { setEditingCat(null); setEditForm({}); }}>Cancel</SmallBtn>
                    </CatActions>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: typography.fontSize.base }}>{cat.name}</strong>
                      {cat.isPredefined && <CatBadge $type="predefined">Predefined</CatBadge>}
                      {!cat.isPredefined && <CatBadge $type="custom">Custom</CatBadge>}
                      {!cat.isActive && <CatBadge $type="hidden">Inactive</CatBadge>}
                      {!cat.showOnHome && cat.isActive && <CatBadge $type="hidden">Hidden from Home</CatBadge>}
                    </div>
                    <CatActions>
                      <SmallBtn onClick={() => startEdit(cat)}>✏️ Edit</SmallBtn>
                      <SmallBtn $variant="toggle" onClick={() => handleToggle(cat, 'isActive')}>
                        {cat.isActive ? '👁 Active' : '👁‍🗨 Inactive'}
                      </SmallBtn>
                      <SmallBtn $variant="toggle" onClick={() => handleToggle(cat, 'showOnHome')}>
                        {cat.showOnHome ? '🏠 On Home' : '🏠 Off Home'}
                      </SmallBtn>
                      <SmallBtn $variant="danger" onClick={() => handleDeleteCategory(cat)}>🗑</SmallBtn>
                    </CatActions>
                  </>
                )}
              </CatCard>
            ))}

            {/* Add new category card */}
            {showAddForm ? (
              <AddCatForm>
                <SectionHeader style={{ fontSize: typography.fontSize.base, margin: 0, border: 'none', paddingBottom: 0 }}>➕ New Category</SectionHeader>
                <FieldGroup>
                  <Label>Name *</Label>
                  <StyledInput value={newCat.name} onChange={(e: any) => setNewCat(n => ({ ...n, name: e.target.value }))} placeholder="e.g., Electronics" />
                </FieldGroup>
                <CatInlineRow>
                  <FieldGroup>
                    <Label>Icon (emoji)</Label>
                    <StyledInput value={newCat.icon} onChange={(e: any) => setNewCat(n => ({ ...n, icon: e.target.value }))} />
                  </FieldGroup>
                  <FieldGroup>
                    <Label>Image URL</Label>
                    <StyledInput value={newCat.image} onChange={(e: any) => setNewCat(n => ({ ...n, image: e.target.value }))} placeholder="https://..." />
                  </FieldGroup>
                </CatInlineRow>
                <FieldGroup>
                  <Label>Gradient</Label>
                  <GradientPicker>
                    <GradientSwatch $bg="transparent" $active={!newCat.gradient} onClick={() => setNewCat(n => ({ ...n, gradient: '' }))} style={{ border: '2px dashed #ccc', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</GradientSwatch>
                    {GRADIENT_PRESETS.map(g => (
                      <GradientSwatch key={g.label} $bg={g.value} $active={newCat.gradient === g.value} onClick={() => setNewCat(n => ({ ...n, gradient: g.value }))} title={g.label} />
                    ))}
                  </GradientPicker>
                </FieldGroup>
                <CatActions>
                  <SmallBtn $variant="toggle" onClick={handleAddCategory}>Add Category</SmallBtn>
                  <SmallBtn onClick={() => setShowAddForm(false)}>Cancel</SmallBtn>
                </CatActions>
              </AddCatForm>
            ) : (
              <AddCatForm style={{ alignItems: 'center', justifyContent: 'center', minHeight: 150, cursor: 'pointer' }} onClick={() => setShowAddForm(true)}>
                <span style={{ fontSize: '2rem' }}>➕</span>
                <span style={{ color: colors.neutral[500], fontWeight: 600 }}>Add Category</span>
              </AddCatForm>
            )}
          </CatGrid>
        )}
      </TabContent>
    );
  };

  const renderFiltersTab = () => {
    const handleAddFilter = async () => {
      if (!newFilter.name?.trim()) return;
      try {
        setFilterMsg(null);
        await authApi.post('/filters', {
          ...newFilter,
          options: newFilter.options || [],
        });
        setFilterMsg({ type: 'success', text: `Filter "${newFilter.name}" created!` });
        setNewFilter({ name: '', type: 'checkbox', options: [], icon: '🏷️', isActive: true, showInSidebar: true });
        setShowAddFilterForm(false);
        setNewOptionLabel('');
        await loadFilters();
        setTimeout(() => setFilterMsg(null), 3000);
      } catch (err: any) {
        setFilterMsg({ type: 'error', text: err?.details?.message || err?.message || 'Failed to create filter' });
      }
    };

    const handleUpdateFilter = async (id: string) => {
      try {
        setFilterMsg(null);
        await authApi.put(`/filters/${id}`, filterEditForm);
        setFilterMsg({ type: 'success', text: 'Filter updated!' });
        setEditingFilter(null);
        setFilterEditForm({});
        setEditOptionLabel('');
        await loadFilters();
        setTimeout(() => setFilterMsg(null), 3000);
      } catch (err: any) {
        setFilterMsg({ type: 'error', text: err?.details?.message || err?.message || 'Failed to update' });
      }
    };

    const handleDeleteFilter = async (filter: FilterData) => {
      if (!window.confirm(`Delete filter "${filter.name}"? Product filter values will remain but won't be shown.`)) return;
      try {
        setFilterMsg(null);
        await authApi.delete(`/filters/${filter._id}`);
        setFilterMsg({ type: 'success', text: `Filter "${filter.name}" deleted.` });
        await loadFilters();
        setTimeout(() => setFilterMsg(null), 3000);
      } catch (err: any) {
        setFilterMsg({ type: 'error', text: err?.details?.message || err?.message || 'Failed to delete' });
      }
    };

    const handleToggleFilter = async (filter: FilterData, field: 'isActive' | 'showInSidebar') => {
      try {
        await authApi.put(`/filters/${filter._id}`, { [field]: !filter[field] });
        await loadFilters();
      } catch (err) {
        console.error('Toggle failed:', err);
      }
    };

    const addOptionToNew = () => {
      if (!newOptionLabel.trim()) return;
      const val = newOptionLabel.trim().toLowerCase().replace(/\s+/g, '-');
      setNewFilter(f => ({ ...f, options: [...(f.options || []), { label: newOptionLabel.trim(), value: val }] }));
      setNewOptionLabel('');
    };

    const removeOptionFromNew = (idx: number) => {
      setNewFilter(f => ({ ...f, options: (f.options || []).filter((_, i) => i !== idx) }));
    };

    const addOptionToEdit = () => {
      if (!editOptionLabel.trim()) return;
      const val = editOptionLabel.trim().toLowerCase().replace(/\s+/g, '-');
      setFilterEditForm(f => ({ ...f, options: [...(f.options || []), { label: editOptionLabel.trim(), value: val }] }));
      setEditOptionLabel('');
    };

    const removeOptionFromEdit = (idx: number) => {
      setFilterEditForm(f => ({ ...f, options: (f.options || []).filter((_, i) => i !== idx) }));
    };

    return (
      <TabContent>
        {/* Built-in Filter Configuration */}
        <SectionHeader>⚙️ Built-in Filters</SectionHeader>
        <HelpText>Enable, disable, rename, or reorder the built-in product filters that appear in the catalog sidebar. Changes are saved with the Save button below.</HelpText>

        {settings.catalogFilterConfig
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((cfg, idx) => (
          <div key={cfg.key} style={{
            border: `1px solid ${cfg.enabled ? colors.neutral[200] : colors.neutral[300]}`,
            borderRadius: '8px',
            padding: spacing[3],
            background: cfg.enabled ? 'white' : colors.neutral[100],
            opacity: cfg.enabled ? 1 : 0.6,
            display: 'flex',
            alignItems: 'center',
            gap: spacing[3],
            flexWrap: 'wrap',
          }}>
            {/* Reorder */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <button type="button" disabled={idx === 0} onClick={() => {
                setSettings(prev => {
                  const arr = [...prev.catalogFilterConfig].sort((a, b) => a.displayOrder - b.displayOrder);
                  if (idx === 0) return prev;
                  [arr[idx], arr[idx - 1]] = [arr[idx - 1], arr[idx]];
                  return { ...prev, catalogFilterConfig: arr.map((c, i) => ({ ...c, displayOrder: i })) };
                });
              }} style={{ background: 'none', border: '1px solid #ddd', borderRadius: '3px', padding: '2px 6px', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.3 : 1, fontSize: '10px' }}>↑</button>
              <button type="button" disabled={idx === settings.catalogFilterConfig.length - 1} onClick={() => {
                setSettings(prev => {
                  const arr = [...prev.catalogFilterConfig].sort((a, b) => a.displayOrder - b.displayOrder);
                  if (idx === arr.length - 1) return prev;
                  [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
                  return { ...prev, catalogFilterConfig: arr.map((c, i) => ({ ...c, displayOrder: i })) };
                });
              }} style={{ background: 'none', border: '1px solid #ddd', borderRadius: '3px', padding: '2px 6px', cursor: idx === settings.catalogFilterConfig.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === settings.catalogFilterConfig.length - 1 ? 0.3 : 1, fontSize: '10px' }}>↓</button>
            </div>

            {/* Icon */}
            <input
              type="text"
              value={cfg.icon}
              onChange={e => {
                const val = e.target.value;
                setSettings(prev => ({
                  ...prev,
                  catalogFilterConfig: prev.catalogFilterConfig.map(c => c.key === cfg.key ? { ...c, icon: val } : c)
                }));
              }}
              style={{ width: '40px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '4px', padding: '4px', fontSize: '1.2rem' }}
            />

            {/* Label */}
            <input
              type="text"
              value={cfg.label}
              onChange={e => {
                const val = e.target.value;
                setSettings(prev => ({
                  ...prev,
                  catalogFilterConfig: prev.catalogFilterConfig.map(c => c.key === cfg.key ? { ...c, label: val } : c)
                }));
              }}
              style={{ flex: 1, minWidth: '120px', border: '1px solid #ddd', borderRadius: '4px', padding: '6px 10px', fontSize: typography.fontSize.sm, fontWeight: 600 }}
            />

            {/* Key badge */}
            <span style={{ fontSize: typography.fontSize.xs, background: colors.primary.lighter, color: colors.primary.main, padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
              {cfg.key}
            </span>

            {/* Enable/Disable */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: typography.fontSize.sm, fontWeight: 600, color: cfg.enabled ? colors.success : colors.neutral[500] }}>
              <input
                type="checkbox"
                checked={cfg.enabled}
                onChange={e => {
                  const val = e.target.checked;
                  setSettings(prev => ({
                    ...prev,
                    catalogFilterConfig: prev.catalogFilterConfig.map(c => c.key === cfg.key ? { ...c, enabled: val } : c)
                  }));
                }}
              />
              {cfg.enabled ? 'Visible' : 'Hidden'}
            </label>
          </div>
        ))}

        <div style={{ borderTop: `2px solid ${colors.neutral[200]}`, marginTop: spacing[4], paddingTop: spacing[4] }} />

        {/* Custom Filters */}
        <SectionHeader>🔍 Custom Filters</SectionHeader>
        <HelpText>Create custom filters that appear in the catalog sidebar. Products can have values for these filters set in the product form.</HelpText>

        {filterMsg && (
          filterMsg.type === 'success'
            ? <SuccessMessage>{filterMsg.text}</SuccessMessage>
            : <ErrorMessage>{filterMsg.text}</ErrorMessage>
        )}

        {filterLoading ? <Spinner label="Loading filters..." /> : (
          <CatGrid>
            {filterList.map(filter => (
              <CatCard key={filter._id} $inactive={!filter.isActive}>
                <CatPreview $bg={`linear-gradient(135deg, ${colors.primary.lighter}, ${colors.primary.main})`}>
                  <span>{filter.icon || '🔍'}</span>
                </CatPreview>

                {editingFilter === filter._id ? (
                  <>
                    <FieldGroup>
                      <Label>Name</Label>
                      <StyledInput value={filterEditForm.name || ''} onChange={(e: any) => setFilterEditForm(f => ({ ...f, name: e.target.value }))} />
                    </FieldGroup>
                    <CatInlineRow>
                      <FieldGroup>
                        <Label>Icon (emoji)</Label>
                        <StyledInput value={filterEditForm.icon || ''} onChange={(e: any) => setFilterEditForm(f => ({ ...f, icon: e.target.value }))} />
                      </FieldGroup>
                      <FieldGroup>
                        <Label>Type</Label>
                        <select
                          value={filterEditForm.type || 'checkbox'}
                          onChange={(e) => setFilterEditForm(f => ({ ...f, type: e.target.value as any }))}
                          style={{ width: '100%', padding: spacing[2], border: `1px solid ${colors.neutral[300]}`, borderRadius: '4px', fontSize: typography.fontSize.sm }}
                        >
                          <option value="checkbox">Checkbox (multi-select)</option>
                          <option value="select">Dropdown (single-select)</option>
                          <option value="range">Range (min-max)</option>
                        </select>
                      </FieldGroup>
                    </CatInlineRow>

                    {filterEditForm.type !== 'range' && (
                      <FieldGroup>
                        <Label>Options</Label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: spacing[2] }}>
                          {(filterEditForm.options || []).map((opt, i) => (
                            <span key={i} style={{ padding: '2px 8px', background: colors.neutral[100], borderRadius: '12px', fontSize: typography.fontSize.xs, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {opt.label}
                              <button type="button" onClick={() => removeOptionFromEdit(i)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontSize: '10px', color: colors.error }}>✕</button>
                            </span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: spacing[2] }}>
                          <StyledInput placeholder="Option label" value={editOptionLabel} onChange={(e: any) => setEditOptionLabel(e.target.value)} onKeyDown={(e: any) => { if (e.key === 'Enter') { e.preventDefault(); addOptionToEdit(); } }} />
                          <Button type="button" appearance="outline" onClick={addOptionToEdit} style={{ flexShrink: 0 }}>+ Add</Button>
                        </div>
                      </FieldGroup>
                    )}

                    {filterEditForm.type === 'range' && (
                      <CatInlineRow>
                        <FieldGroup>
                          <Label>Min</Label>
                          <input type="number" value={filterEditForm.rangeMin ?? ''} onChange={(e) => setFilterEditForm(f => ({ ...f, rangeMin: Number(e.target.value) }))} style={{ width: '100%', padding: spacing[2], border: `1px solid ${colors.neutral[300]}`, borderRadius: '6px', fontSize: typography.fontSize.sm }} />
                        </FieldGroup>
                        <FieldGroup>
                          <Label>Max</Label>
                          <input type="number" value={filterEditForm.rangeMax ?? ''} onChange={(e) => setFilterEditForm(f => ({ ...f, rangeMax: Number(e.target.value) }))} style={{ width: '100%', padding: spacing[2], border: `1px solid ${colors.neutral[300]}`, borderRadius: '6px', fontSize: typography.fontSize.sm }} />
                        </FieldGroup>
                      </CatInlineRow>
                    )}

                    <CatActions>
                      <SmallBtn $variant="toggle" onClick={() => handleUpdateFilter(filter._id)}>Save</SmallBtn>
                      <SmallBtn onClick={() => { setEditingFilter(null); setFilterEditForm({}); setEditOptionLabel(''); }}>Cancel</SmallBtn>
                    </CatActions>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: typography.fontSize.base }}>{filter.name}</strong>
                      <CatBadge $type="custom">{filter.type}</CatBadge>
                      {!filter.isActive && <CatBadge $type="hidden">Inactive</CatBadge>}
                      {!filter.showInSidebar && filter.isActive && <CatBadge $type="hidden">Hidden</CatBadge>}
                    </div>
                    {filter.type !== 'range' && filter.options.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: spacing[1] }}>
                        {filter.options.map((opt, i) => (
                          <span key={i} style={{ padding: '1px 6px', background: colors.neutral[100], borderRadius: '10px', fontSize: typography.fontSize.xs, color: colors.neutral[600] }}>{opt.label}</span>
                        ))}
                      </div>
                    )}
                    {filter.type === 'range' && (
                      <div style={{ fontSize: typography.fontSize.sm, color: colors.neutral[600], marginTop: spacing[1] }}>
                        Range: {filter.rangeMin ?? 0} – {filter.rangeMax ?? 100} {filter.rangeUnit || ''}
                      </div>
                    )}
                    <CatActions>
                      <SmallBtn onClick={() => { setEditingFilter(filter._id); setFilterEditForm({ name: filter.name, type: filter.type, options: [...filter.options], icon: filter.icon, rangeMin: filter.rangeMin, rangeMax: filter.rangeMax, rangeUnit: filter.rangeUnit }); }}>✏️ Edit</SmallBtn>
                      <SmallBtn $variant="toggle" onClick={() => handleToggleFilter(filter, 'isActive')}>
                        {filter.isActive ? '👁 Active' : '👁‍🗨 Inactive'}
                      </SmallBtn>
                      <SmallBtn $variant="toggle" onClick={() => handleToggleFilter(filter, 'showInSidebar')}>
                        {filter.showInSidebar ? '📌 In Sidebar' : '📌 Hidden'}
                      </SmallBtn>
                      <SmallBtn $variant="danger" onClick={() => handleDeleteFilter(filter)}>🗑</SmallBtn>
                    </CatActions>
                  </>
                )}
              </CatCard>
            ))}

            {/* Add new filter card */}
            {showAddFilterForm ? (
              <AddCatForm>
                <SectionHeader style={{ fontSize: typography.fontSize.base, margin: 0, border: 'none', paddingBottom: 0 }}>➕ New Filter</SectionHeader>
                <FieldGroup>
                  <Label>Filter Name *</Label>
                  <StyledInput value={newFilter.name || ''} onChange={(e: any) => setNewFilter(n => ({ ...n, name: e.target.value }))} placeholder="e.g., Brand, Warranty, Application" />
                </FieldGroup>
                <CatInlineRow>
                  <FieldGroup>
                    <Label>Icon (emoji)</Label>
                    <StyledInput value={newFilter.icon || ''} onChange={(e: any) => setNewFilter(n => ({ ...n, icon: e.target.value }))} />
                  </FieldGroup>
                  <FieldGroup>
                    <Label>Type</Label>
                    <select
                      value={newFilter.type || 'checkbox'}
                      onChange={(e) => setNewFilter(n => ({ ...n, type: e.target.value as any }))}
                      style={{ width: '100%', padding: spacing[2], border: `1px solid ${colors.neutral[300]}`, borderRadius: '4px', fontSize: typography.fontSize.sm }}
                    >
                      <option value="checkbox">Checkbox (multi-select)</option>
                      <option value="select">Dropdown (single-select)</option>
                      <option value="range">Range (min-max)</option>
                    </select>
                  </FieldGroup>
                </CatInlineRow>

                {newFilter.type !== 'range' && (
                  <FieldGroup>
                    <Label>Options</Label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: spacing[2] }}>
                      {(newFilter.options || []).map((opt, i) => (
                        <span key={i} style={{ padding: '2px 8px', background: colors.neutral[100], borderRadius: '12px', fontSize: typography.fontSize.xs, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {opt.label}
                          <button type="button" onClick={() => removeOptionFromNew(i)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontSize: '10px', color: colors.error }}>✕</button>
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: spacing[2] }}>
                      <StyledInput placeholder="Option label" value={newOptionLabel} onChange={(e: any) => setNewOptionLabel(e.target.value)} onKeyDown={(e: any) => { if (e.key === 'Enter') { e.preventDefault(); addOptionToNew(); } }} />
                      <Button type="button" appearance="outline" onClick={addOptionToNew} style={{ flexShrink: 0 }}>+ Add</Button>
                    </div>
                  </FieldGroup>
                )}

                {newFilter.type === 'range' && (
                  <CatInlineRow>
                    <FieldGroup>
                      <Label>Min</Label>
                      <input type="number" value={newFilter.rangeMin ?? ''} onChange={(e) => setNewFilter(n => ({ ...n, rangeMin: Number(e.target.value) }))} style={{ width: '100%', padding: spacing[2], border: `1px solid ${colors.neutral[300]}`, borderRadius: '6px', fontSize: typography.fontSize.sm }} />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Max</Label>
                      <input type="number" value={newFilter.rangeMax ?? ''} onChange={(e) => setNewFilter(n => ({ ...n, rangeMax: Number(e.target.value) }))} style={{ width: '100%', padding: spacing[2], border: `1px solid ${colors.neutral[300]}`, borderRadius: '6px', fontSize: typography.fontSize.sm }} />
                    </FieldGroup>
                  </CatInlineRow>
                )}

                <CatActions>
                  <SmallBtn $variant="toggle" onClick={handleAddFilter}>Create Filter</SmallBtn>
                  <SmallBtn onClick={() => { setShowAddFilterForm(false); setNewOptionLabel(''); }}>Cancel</SmallBtn>
                </CatActions>
              </AddCatForm>
            ) : (
              <AddCatForm style={{ alignItems: 'center', justifyContent: 'center', minHeight: 150, cursor: 'pointer' }} onClick={() => setShowAddFilterForm(true)}>
                <span style={{ fontSize: '2rem' }}>➕</span>
                <span style={{ color: colors.neutral[500], fontWeight: 600 }}>Add Filter</span>
              </AddCatForm>
            )}
          </CatGrid>
        )}
      </TabContent>
    );
  };

  const renderStatsTab = () => (
    <TabContent>
      <SectionHeader>📊 Stats Section</SectionHeader>
      <Row>
        <FieldGroup>
          <Label>Products Count</Label>
          <StyledInput placeholder="500+" value={settings.statsProducts} onChange={inputChange('statsProducts')} />
        </FieldGroup>
        <FieldGroup>
          <Label>Years in Business</Label>
          <StyledInput placeholder="15+" value={settings.statsYears} onChange={inputChange('statsYears')} />
        </FieldGroup>
      </Row>
      <Row>
        <FieldGroup>
          <Label>Happy Clients</Label>
          <StyledInput placeholder="5000+" value={settings.statsClients} onChange={inputChange('statsClients')} />
        </FieldGroup>
        <FieldGroup>
          <Label>Brands Available</Label>
          <StyledInput placeholder="50+" value={settings.statsBrands} onChange={inputChange('statsBrands')} />
        </FieldGroup>
      </Row>
    </TabContent>
  );

  const renderTestimonialsTab = () => (
    <TabContent>
      <SectionHeader>💬 Testimonials</SectionHeader>
      <HelpText>Add customer testimonials shown on the home page.</HelpText>
      {settings.testimonials.map((t, i) => (
        <TestimonialRow key={i}>
          <RemoveButton onClick={() => removeTestimonial(i)}>✕ Remove</RemoveButton>
          <FieldGroup>
            <Label>Quote</Label>
            <TextArea placeholder="What the customer said..." value={t.text} onChange={(e) => updateTestimonial(i, 'text', e.target.value)} />
          </FieldGroup>
          <FieldGroup>
            <Label>Author</Label>
            <StyledInput placeholder="Name - Role/Company" value={t.author} onChange={(e: any) => updateTestimonial(i, 'author', e.target.value)} />
          </FieldGroup>
        </TestimonialRow>
      ))}
      <Button appearance="outline" onClick={addTestimonial} style={{ alignSelf: 'flex-start' }}>+ Add Testimonial</Button>
    </TabContent>
  );

  const renderAboutTab = () => (
    <TabContent>
      <SectionHeader>📄 About Page Content</SectionHeader>
      <FieldGroup>
        <Label>Page Title</Label>
        <StyledInput placeholder="About Us" value={settings.aboutTitle} onChange={inputChange('aboutTitle')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Subtitle</Label>
        <StyledInput placeholder="Your trusted destination for premium, curated products" value={settings.aboutSubtitle} onChange={inputChange('aboutSubtitle')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Our Story</Label>
        <HelpText>Use separate paragraphs with a blank line between them.</HelpText>
        <TextArea placeholder="Tell your company story here..." value={settings.aboutStory} onChange={handleChange('aboutStory')} style={{ minHeight: '140px' }} />
      </FieldGroup>
      <FieldGroup>
        <Label>What We Offer</Label>
        <HelpText>Each line becomes a bullet point.</HelpText>
        <TextArea placeholder={"500+ premium products from leading brands\nExpert design consultation\nCompetitive wholesale and retail pricing"} value={settings.aboutOfferings} onChange={handleChange('aboutOfferings')} style={{ minHeight: '120px' }} />
      </FieldGroup>
      <FieldGroup>
        <Label>Product Categories</Label>
        <HelpText>Comma-separated list</HelpText>
        <TextArea placeholder="Electronics, Fashion, Home & Living, Sports & Outdoors" value={settings.aboutCategories} onChange={handleChange('aboutCategories')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Featured Brands</Label>
        <HelpText>Comma-separated list of brand names</HelpText>
        <TextArea placeholder="Brand A, Brand B, Brand C" value={settings.aboutBrands} onChange={handleChange('aboutBrands')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Showroom Description</Label>
        <TextArea placeholder="Visit our modern showroom to experience our collection..." value={settings.aboutShowroom} onChange={handleChange('aboutShowroom')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Showroom Image URLs</Label>
        <HelpText>Comma-separated Google Drive or image URLs</HelpText>
        <TextArea placeholder="https://drive.google.com/..., https://drive.google.com/..." value={settings.aboutShowroomImages} onChange={handleChange('aboutShowroomImages')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Why Choose Us</Label>
        <HelpText>Each line becomes a highlight. Format: Title - Description</HelpText>
        <TextArea placeholder={"15+ Years Experience - We've been in the industry long enough to know quality\nCertified Products - All our products meet international standards"} value={settings.aboutWhyChooseUs} onChange={handleChange('aboutWhyChooseUs')} style={{ minHeight: '140px' }} />
      </FieldGroup>
    </TabContent>
  );

  const renderContactTab = () => (
    <TabContent>
      <SectionHeader>📍 Map Location</SectionHeader>
      <FieldGroup>
        <Label>Google Maps Embed URL</Label>
        <HelpText>Paste the embed URL or full {'<iframe>'} tag from Google Maps.</HelpText>
        <TextArea placeholder="https://www.google.com/maps/embed?pb=..." value={settings.mapEmbedUrl} onChange={handleChange('mapEmbedUrl')} />
      </FieldGroup>
      <HelpText style={{ textAlign: 'center', fontStyle: 'italic' }}>— OR use coordinates —</HelpText>
      <Row>
        <FieldGroup>
          <Label>Latitude</Label>
          <StyledInput type="number" placeholder="e.g. 23.025122" value={settings.mapLatitude} onChange={inputChange('mapLatitude')} />
        </FieldGroup>
        <FieldGroup>
          <Label>Longitude</Label>
          <StyledInput type="number" placeholder="e.g. 72.58316" value={settings.mapLongitude} onChange={inputChange('mapLongitude')} />
        </FieldGroup>
      </Row>
      <FieldGroup>
        <Label>Zoom Level (1-21)</Label>
        <StyledInput type="number" placeholder="15" value={settings.mapZoom} onChange={inputChange('mapZoom')} />
      </FieldGroup>
      {previewUrl && (
        <FieldGroup>
          <Label>Map Preview</Label>
          <MapPreview>
            <iframe src={previewUrl} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" title="Map Preview" />
          </MapPreview>
        </FieldGroup>
      )}

      <SectionHeader>📧 Email Notifications (Gmail)</SectionHeader>
      <FieldGroup>
        <Label>Gmail Address</Label>
        <HelpText>The Gmail address used to send contact form notifications.</HelpText>
        <StyledInput type="email" placeholder="yourbusiness@gmail.com" value={settings.smtpEmail} onChange={inputChange('smtpEmail')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Gmail App Password</Label>
        <HelpText>Generate one at: Google Account → Security → 2-Step Verification → App passwords.</HelpText>
        <StyledInput type="password" placeholder="xxxx xxxx xxxx xxxx" value={settings.smtpAppPassword} onChange={inputChange('smtpAppPassword')} />
      </FieldGroup>
      <HelpText style={{ fontStyle: 'italic' }}>
        Contact form submissions will be emailed to the Business Email (set in General tab). If SMTP is not configured, submissions are still saved in the database.
      </HelpText>
    </TabContent>
  );

  // ===================== INQUIRY FORM TAB =====================
  const FIELD_TYPES: { value: InquiryFieldConfig['type']; label: string }[] = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Phone' },
    { value: 'number', label: 'Number' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Dropdown' },
  ];

  const updateInquiryField = (idx: number, updates: Partial<InquiryFieldConfig>) => {
    setSettings(prev => {
      const fields = [...prev.inquiryFormFields];
      fields[idx] = { ...fields[idx], ...updates };
      return { ...prev, inquiryFormFields: fields };
    });
  };

  const removeInquiryField = (idx: number) => {
    setSettings(prev => ({
      ...prev,
      inquiryFormFields: prev.inquiryFormFields.filter((_, i) => i !== idx)
    }));
  };

  const moveInquiryField = (idx: number, dir: -1 | 1) => {
    setSettings(prev => {
      const fields = [...prev.inquiryFormFields];
      const target = idx + dir;
      if (target < 0 || target >= fields.length) return prev;
      [fields[idx], fields[target]] = [fields[target], fields[idx]];
      return { ...prev, inquiryFormFields: fields.map((f, i) => ({ ...f, displayOrder: i })) };
    });
  };

  const addInquiryField = () => {
    if (!newFieldForm.fieldName || !newFieldForm.label) return;
    const slug = newFieldForm.fieldName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    setSettings(prev => ({
      ...prev,
      inquiryFormFields: [
        ...prev.inquiryFormFields,
        { ...newFieldForm, fieldName: slug, displayOrder: prev.inquiryFormFields.length }
      ]
    }));
    setNewFieldForm({ fieldName: '', label: '', type: 'text', required: false, enabled: true, placeholder: '', options: [], displayOrder: 999 });
    setShowAddFieldForm(false);
    setNewFieldOption('');
  };

  const renderInquiryTab = () => (
    <TabContent>
      <SectionHeader>📝 Inquiry Form Configuration</SectionHeader>
      <HelpText>Customize the inquiry form that appears on product detail pages. Drag fields to reorder, toggle visibility, or add new custom fields.</HelpText>

      <FieldGroup>
        <Label>Form Title</Label>
        <StyledInput value={settings.inquiryFormTitle} onChange={inputChange('inquiryFormTitle')} placeholder="Request Quote / Inquiry" />
      </FieldGroup>

      <Row>
        <FieldGroup>
          <Label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={settings.showWhatsAppButton} onChange={e => setSettings(prev => ({ ...prev, showWhatsAppButton: e.target.checked }))} />
            Show WhatsApp Button
          </Label>
          <HelpText>Uses WhatsApp number from General tab</HelpText>
        </FieldGroup>
        <FieldGroup>
          <Label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={settings.showCallButton} onChange={e => setSettings(prev => ({ ...prev, showCallButton: e.target.checked }))} />
            Show Call Button
          </Label>
          <HelpText>Uses Phone number from General tab</HelpText>
        </FieldGroup>
      </Row>
      <FieldGroup>
        <Label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={settings.showSqftCalculator} onChange={e => setSettings(prev => ({ ...prev, showSqftCalculator: e.target.checked }))} />
          Show Area Calculator Guide
        </Label>
        <HelpText>Shows a helper link when quantity unit is set to a measurable unit</HelpText>
      </FieldGroup>

      <SectionHeader>📋 Form Fields</SectionHeader>
      {settings.inquiryFormFields.map((field, idx) => (
        <div key={idx} style={{
          border: `1px solid ${field.enabled ? colors.neutral[200] : colors.neutral[300]}`,
          borderRadius: '8px',
          padding: spacing[4],
          background: field.enabled ? 'white' : colors.neutral[100],
          opacity: field.enabled ? 1 : 0.7,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3],
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: spacing[2] }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
              <span style={{ fontWeight: 600, fontSize: '1rem' }}>{field.label}</span>
              <span style={{ fontSize: '0.75rem', background: colors.primary.lighter, color: colors.primary.main, padding: '2px 8px', borderRadius: '10px' }}>{field.type}</span>
              {field.required && <span style={{ fontSize: '0.75rem', background: 'rgba(239,68,68,0.1)', color: colors.error, padding: '2px 8px', borderRadius: '10px' }}>Required</span>}
            </div>
            <div style={{ display: 'flex', gap: spacing[1] }}>
              <button type="button" onClick={() => moveInquiryField(idx, -1)} disabled={idx === 0} style={{ background: 'none', border: '1px solid #ddd', borderRadius: '4px', padding: '4px 8px', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.4 : 1 }}>↑</button>
              <button type="button" onClick={() => moveInquiryField(idx, 1)} disabled={idx === settings.inquiryFormFields.length - 1} style={{ background: 'none', border: '1px solid #ddd', borderRadius: '4px', padding: '4px 8px', cursor: idx === settings.inquiryFormFields.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === settings.inquiryFormFields.length - 1 ? 0.4 : 1 }}>↓</button>
            </div>
          </div>

          <Row>
            <FieldGroup>
              <Label>Label</Label>
              <StyledInput value={field.label} onChange={e => updateInquiryField(idx, { label: (e.target as HTMLInputElement).value })} />
            </FieldGroup>
            <FieldGroup>
              <Label>Field Name (ID)</Label>
              <StyledInput value={field.fieldName} onChange={e => updateInquiryField(idx, { fieldName: (e.target as HTMLInputElement).value.toLowerCase().replace(/[^a-z0-9_]/g, '') })} />
            </FieldGroup>
          </Row>
          <Row>
            <FieldGroup>
              <Label>Type</Label>
              <StyledInput as="select" value={field.type} onChange={(e: any) => updateInquiryField(idx, { type: e.target.value })}>
                {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </StyledInput>
            </FieldGroup>
            <FieldGroup>
              <Label>Placeholder</Label>
              <StyledInput value={field.placeholder} onChange={e => updateInquiryField(idx, { placeholder: (e.target as HTMLInputElement).value })} />
            </FieldGroup>
          </Row>

          {field.type === 'select' && (
            <FieldGroup>
              <Label>Options (comma-separated)</Label>
              <StyledInput
                value={field.options.join(', ')}
                onChange={e => updateInquiryField(idx, { options: (e.target as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="Option A, Option B, Option C"
              />
            </FieldGroup>
          )}

          <div style={{ display: 'flex', gap: spacing[4], alignItems: 'center', flexWrap: 'wrap' }}>
            <Label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" checked={field.required} onChange={e => updateInquiryField(idx, { required: e.target.checked })} />
              Required
            </Label>
            <Label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" checked={field.enabled} onChange={e => updateInquiryField(idx, { enabled: e.target.checked })} />
              Enabled
            </Label>
            <RemoveButton type="button" onClick={() => removeInquiryField(idx)}>🗑 Remove</RemoveButton>
          </div>
        </div>
      ))}

      {!showAddFieldForm ? (
        <Button appearance="outline" type="button" onClick={() => setShowAddFieldForm(true)} style={{ alignSelf: 'flex-start' }}>
          + Add New Field
        </Button>
      ) : (
        <div style={{ border: `2px dashed ${colors.primary.main}`, borderRadius: '8px', padding: spacing[4], background: colors.primary.lighter, display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          <SectionHeader style={{ margin: 0, borderBottom: 'none' }}>➕ New Field</SectionHeader>
          <Row>
            <FieldGroup>
              <Label>Label *</Label>
              <StyledInput value={newFieldForm.label} onChange={e => setNewFieldForm(prev => ({ ...prev, label: (e.target as HTMLInputElement).value, fieldName: (e.target as HTMLInputElement).value.toLowerCase().replace(/[^a-z0-9]/g, '_') }))} placeholder="e.g., Company Name" />
            </FieldGroup>
            <FieldGroup>
              <Label>Field Name (auto-generated)</Label>
              <StyledInput value={newFieldForm.fieldName} onChange={e => setNewFieldForm(prev => ({ ...prev, fieldName: (e.target as HTMLInputElement).value }))} />
            </FieldGroup>
          </Row>
          <Row>
            <FieldGroup>
              <Label>Type</Label>
              <StyledInput as="select" value={newFieldForm.type} onChange={(e: any) => setNewFieldForm(prev => ({ ...prev, type: e.target.value }))}>
                {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </StyledInput>
            </FieldGroup>
            <FieldGroup>
              <Label>Placeholder</Label>
              <StyledInput value={newFieldForm.placeholder} onChange={e => setNewFieldForm(prev => ({ ...prev, placeholder: (e.target as HTMLInputElement).value }))} placeholder="Hint text shown in the field" />
            </FieldGroup>
          </Row>
          {newFieldForm.type === 'select' && (
            <FieldGroup>
              <Label>Options (comma-separated)</Label>
              <StyledInput
                value={newFieldOption}
                onChange={e => {
                  const val = (e.target as HTMLInputElement).value;
                  setNewFieldOption(val);
                  setNewFieldForm(prev => ({ ...prev, options: val.split(',').map(s => s.trim()).filter(Boolean) }));
                }}
                placeholder="Option A, Option B, Option C"
              />
            </FieldGroup>
          )}
          <div style={{ display: 'flex', gap: spacing[4], alignItems: 'center' }}>
            <Label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" checked={newFieldForm.required} onChange={e => setNewFieldForm(prev => ({ ...prev, required: e.target.checked }))} />
              Required
            </Label>
          </div>
          <div style={{ display: 'flex', gap: spacing[2] }}>
            <Button appearance="primary" type="button" onClick={addInquiryField} disabled={!newFieldForm.label || !newFieldForm.fieldName}>Add Field</Button>
            <Button appearance="outline" type="button" onClick={() => { setShowAddFieldForm(false); setNewFieldOption(''); }}>Cancel</Button>
          </div>
        </div>
      )}
    </TabContent>
  );

  const TAB_RENDERERS: Record<SettingsTabKey, () => JSX.Element> = {
    general: renderGeneralTab,
    appearance: renderAppearanceTab,
    hero: renderHeroTab,
    categories: renderCategoriesTab,
    filters: renderFiltersTab,
    stats: renderStatsTab,
    testimonials: renderTestimonialsTab,
    about: renderAboutTab,
    contact: renderContactTab,
    inquiry: renderInquiryTab,
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {message && (
          message.type === 'success'
            ? <SuccessMessage>{message.text}</SuccessMessage>
            : <ErrorMessage>{message.text}</ErrorMessage>
        )}

        {TAB_RENDERERS[activeTab]()}

        <ButtonRow>
          <Button
            appearance="primary"
            type="submit"
            disabled={saving}
            style={{ background: colors.primary.main, minWidth: 120 }}
          >
            {saving ? <Spinner size="tiny" /> : '💾 Save Settings'}
          </Button>
        </ButtonRow>
      </form>
    </Container>
  );
};
