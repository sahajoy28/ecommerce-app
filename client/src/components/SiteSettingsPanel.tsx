import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Spinner, Input } from '@fluentui/react-components';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/designTokens';
import { userAPI } from '../services/userAPI';

// ===================== STYLED COMPONENTS =====================

const Container = styled.div`
  width: 100%;
  max-width: 900px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid ${colors.neutral[200]};
  margin: ${spacing[6]} 0;
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

// ===================== TYPES =====================

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

export const SiteSettingsPanel = () => {
  const [settings, setSettings] = useState<SiteSettingsData>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => { loadSettings(); }, []);

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
        heroCategories: settings.heroCategories.split(',').map(s => s.trim()).filter(Boolean),
        heroCategoryIcons: settings.heroCategoryIcons.split(',').map(s => s.trim()).filter(Boolean),
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

  const renderGeneralSection = () => (
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

  const renderThemeSection = () => (
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

  const renderHomeSection = () => (
    <TabContent>
      <SectionHeader>🏠 Hero Section</SectionHeader>
      <FieldGroup>
        <Label>Hero Title</Label>
        <StyledInput placeholder="Premium Building Materials & Tiles Showroom" value={settings.heroTitle} onChange={inputChange('heroTitle')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Hero Subtitle</Label>
        <TextArea placeholder="Explore our extensive collection of premium tiles, marble, granite..." value={settings.heroSubtitle} onChange={handleChange('heroSubtitle')} />
      </FieldGroup>

      <SectionHeader>📂 Categories</SectionHeader>
      <FieldGroup>
        <Label>Category Names</Label>
        <HelpText>Comma-separated, e.g. Floor Tiles, Wall Tiles, Marble, Granite</HelpText>
        <TextArea placeholder="Floor Tiles, Wall Tiles, Marble, Granite, Bathroom Fittings, Outdoor Tiles" value={settings.heroCategories} onChange={handleChange('heroCategories')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Category Icons</Label>
        <HelpText>Comma-separated emojis matching each category above, e.g. 🏠, 🧱, 💎, 🪨</HelpText>
        <StyledInput placeholder="🏠, 🧱, 💎, 🪨, 🚿, 🌳" value={settings.heroCategoryIcons} onChange={inputChange('heroCategoryIcons')} />
      </FieldGroup>

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

  const renderAboutSection = () => (
    <TabContent>
      <SectionHeader>📄 About Page Content</SectionHeader>
      <FieldGroup>
        <Label>Page Title</Label>
        <StyledInput placeholder="About Us" value={settings.aboutTitle} onChange={inputChange('aboutTitle')} />
      </FieldGroup>
      <FieldGroup>
        <Label>Subtitle</Label>
        <StyledInput placeholder="Your trusted partner for premium building materials..." value={settings.aboutSubtitle} onChange={inputChange('aboutSubtitle')} />
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
        <TextArea placeholder="Floor Tiles, Wall Tiles, Marble, Granite, Bathroom Fittings" value={settings.aboutCategories} onChange={handleChange('aboutCategories')} />
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

  const renderContactSection = () => (
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

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {message && (
          message.type === 'success'
            ? <SuccessMessage>{message.text}</SuccessMessage>
            : <ErrorMessage>{message.text}</ErrorMessage>
        )}

        {renderGeneralSection()}
        <Divider />
        {renderThemeSection()}
        <Divider />
        {renderHomeSection()}
        <Divider />
        {renderAboutSection()}
        <Divider />
        {renderContactSection()}

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
