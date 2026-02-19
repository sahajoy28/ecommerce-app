import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Spinner, Input } from '@fluentui/react-components';
import { colors, spacing, typography } from '../styles/designTokens';
import { userAPI } from '../services/userAPI';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

const SectionHeader = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[800]};
  margin: ${spacing[4]} 0 ${spacing[2]};
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
  input {
    width: 100%;
    min-height: 40px;
  }
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

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  @media (max-width: 600px) {
    height: 200px;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[4]};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
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

  @media (max-width: 600px) {
    button {
      width: 100%;
    }
  }
`;

interface SiteSettingsData {
  mapEmbedUrl: string;
  mapLatitude: string;
  mapLongitude: string;
  mapZoom: string;
  businessName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutStory: string;
  aboutOfferings: string;
  aboutCategories: string;
  aboutBrands: string;
  aboutShowroom: string;
  aboutWhyChooseUs: string;
  aboutShowroomImages: string;
}

const DEFAULT_SETTINGS: SiteSettingsData = {
  mapEmbedUrl: '',
  mapLatitude: '',
  mapLongitude: '',
  mapZoom: '15',
  businessName: '',
  phone: '',
  whatsappNumber: '',
  email: '',
  address: '',
  aboutTitle: 'About Us',
  aboutSubtitle: '',
  aboutStory: '',
  aboutOfferings: '',
  aboutCategories: '',
  aboutBrands: '',
  aboutShowroom: '',
  aboutWhyChooseUs: '',
  aboutShowroomImages: '',
};

function extractMapUrl(input: string): string {
  const trimmed = input.trim();
  // If user pasted a full <iframe> tag, extract the src URL
  const match = trimmed.match(/src=["']([^"']+)["']/i);
  if (match) return match[1];
  return trimmed;
}

function buildMapPreviewUrl(settings: SiteSettingsData): string {
  const embedUrl = extractMapUrl(settings.mapEmbedUrl);
  if (embedUrl) {
    return embedUrl;
  }
  const lat = parseFloat(settings.mapLatitude);
  const lng = parseFloat(settings.mapLongitude);
  const zoom = parseInt(settings.mapZoom) || 15;
  if (!isNaN(lat) && !isNaN(lng)) {
    return `https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${lat},${lng}&t=&z=${zoom}&ie=UTF8&iwloc=B&output=embed`;
  }
  return '';
}

export const SiteSettingsPanel = () => {
  const [settings, setSettings] = useState<SiteSettingsData>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getSiteSettings();
      setSettings({
        mapEmbedUrl: data.mapEmbedUrl || '',
        mapLatitude: data.mapLatitude != null ? String(data.mapLatitude) : '',
        mapLongitude: data.mapLongitude != null ? String(data.mapLongitude) : '',
        mapZoom: data.mapZoom != null ? String(data.mapZoom) : '15',
        businessName: data.businessName || '',
        phone: data.phone || '',
        whatsappNumber: data.whatsappNumber || '',
        email: data.email || '',
        address: data.address || '',
        aboutTitle: data.aboutTitle || 'About Us',
        aboutSubtitle: data.aboutSubtitle || '',
        aboutStory: data.aboutStory || '',
        aboutOfferings: data.aboutOfferings || '',
        aboutCategories: Array.isArray(data.aboutCategories) ? data.aboutCategories.join(', ') : (data.aboutCategories || ''),
        aboutBrands: Array.isArray(data.aboutBrands) ? data.aboutBrands.join(', ') : (data.aboutBrands || ''),
        aboutShowroom: data.aboutShowroom || '',
        aboutWhyChooseUs: data.aboutWhyChooseUs || '',
        aboutShowroomImages: Array.isArray(data.aboutShowroomImages) ? data.aboutShowroomImages.join(', ') : (data.aboutShowroomImages || ''),
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
        mapEmbedUrl: extractMapUrl(settings.mapEmbedUrl),
        mapZoom: parseInt(settings.mapZoom) || 15,
        businessName: settings.businessName,
        phone: settings.phone,
        whatsappNumber: settings.whatsappNumber,
        email: settings.email,
        address: settings.address,
        aboutTitle: settings.aboutTitle,
        aboutSubtitle: settings.aboutSubtitle,
        aboutStory: settings.aboutStory,
        aboutOfferings: settings.aboutOfferings,
        aboutCategories: settings.aboutCategories.split(',').map(s => s.trim()).filter(Boolean),
        aboutBrands: settings.aboutBrands.split(',').map(s => s.trim()).filter(Boolean),
        aboutShowroom: settings.aboutShowroom,
        aboutWhyChooseUs: settings.aboutWhyChooseUs,
        aboutShowroomImages: settings.aboutShowroomImages.split(',').map(s => s.trim()).filter(Boolean),
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
    // Auto-extract src URL if user pastes a full <iframe> tag into the map field
    if (field === 'mapEmbedUrl' && value.includes('<iframe')) {
      value = extractMapUrl(value);
    }
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const previewUrl = buildMapPreviewUrl(settings);

  if (loading) {
    return <Spinner label="Loading settings..." />;
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {message && (
          message.type === 'success'
            ? <SuccessMessage>{message.text}</SuccessMessage>
            : <ErrorMessage>{message.text}</ErrorMessage>
        )}

        {/* Map Location Section */}
        <SectionHeader>📍 Map Location</SectionHeader>

        <FieldGroup>
          <Label>Google Maps Embed URL</Label>
          <HelpText>
            Paste the full embed URL from Google Maps. Go to Google Maps → Share → Embed a map → Copy the src URL.
          </HelpText>
          <TextArea
            placeholder="https://www.google.com/maps/embed?pb=..."
            value={settings.mapEmbedUrl}
            onChange={handleChange('mapEmbedUrl')}
          />
        </FieldGroup>

        <HelpText style={{ textAlign: 'center', fontStyle: 'italic' }}>
          — OR use coordinates —
        </HelpText>

        <Row>
          <FieldGroup>
            <Label>Latitude</Label>
            <StyledInput
              type="number"
              placeholder="e.g. 23.025122"
              value={settings.mapLatitude}
              onChange={(e) => handleChange('mapLatitude')({ target: { value: e.target.value } })}
            />
          </FieldGroup>
          <FieldGroup>
            <Label>Longitude</Label>
            <StyledInput
              type="number"
              placeholder="e.g. 72.58316"
              value={settings.mapLongitude}
              onChange={(e) => handleChange('mapLongitude')({ target: { value: e.target.value } })}
            />
          </FieldGroup>
        </Row>

        <FieldGroup>
          <Label>Zoom Level (1-21)</Label>
          <StyledInput
            type="number"
            placeholder="15"
            value={settings.mapZoom}
            onChange={(e) => handleChange('mapZoom')({ target: { value: e.target.value } })}
          />
        </FieldGroup>

        {previewUrl && (
          <FieldGroup>
            <Label>Map Preview</Label>
            <MapPreview>
              <iframe
                src={previewUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Map Preview"
              />
            </MapPreview>
          </FieldGroup>
        )}

        {/* Business Info Section */}
        <SectionHeader>🏢 Business Information</SectionHeader>

        <FieldGroup>
          <Label>Business Name</Label>
          <StyledInput
            placeholder="Your Business Name"
            value={settings.businessName}
            onChange={(e) => handleChange('businessName')({ target: { value: e.target.value } })}
          />
        </FieldGroup>

        <Row>
          <FieldGroup>
            <Label>Phone</Label>
            <StyledInput
              placeholder="+91 98765 43210"
              value={settings.phone}
              onChange={(e) => handleChange('phone')({ target: { value: e.target.value } })}
            />
          </FieldGroup>
          <FieldGroup>
            <Label>WhatsApp Number</Label>
            <HelpText>Include country code, e.g. 919876543210</HelpText>
            <StyledInput
              placeholder="919876543210"
              value={settings.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber')({ target: { value: e.target.value } })}
            />
          </FieldGroup>
        </Row>

        <FieldGroup>
          <Label>Email</Label>
          <StyledInput
            type="email"
            placeholder="contact@yourbusiness.com"
            value={settings.email}
            onChange={(e) => handleChange('email')({ target: { value: e.target.value } })}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Address</Label>
          <TextArea
            placeholder="Full business address"
            value={settings.address}
            onChange={handleChange('address')}
          />
        </FieldGroup>

        {/* About Page Section */}
        <SectionHeader>📄 About Page Content</SectionHeader>

        <FieldGroup>
          <Label>Page Title</Label>
          <StyledInput
            placeholder="About Us"
            value={settings.aboutTitle}
            onChange={(e) => handleChange('aboutTitle')({ target: { value: e.target.value } })}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Subtitle</Label>
          <StyledInput
            placeholder="Your trusted partner for premium building materials..."
            value={settings.aboutSubtitle}
            onChange={(e) => handleChange('aboutSubtitle')({ target: { value: e.target.value } })}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Our Story</Label>
          <HelpText>Use separate paragraphs with a blank line between them.</HelpText>
          <TextArea
            placeholder="Tell your company story here..."
            value={settings.aboutStory}
            onChange={handleChange('aboutStory')}
            style={{ minHeight: '140px' }}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>What We Offer</Label>
          <HelpText>Each line becomes a bullet point. Start each line with what you offer.</HelpText>
          <TextArea
            placeholder={"500+ premium products from leading brands\nExpert design consultation\nCompetitive wholesale and retail pricing"}
            value={settings.aboutOfferings}
            onChange={handleChange('aboutOfferings')}
            style={{ minHeight: '120px' }}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Product Categories</Label>
          <HelpText>Comma-separated list, e.g. Floor Tiles, Wall Tiles, Marble, Granite</HelpText>
          <TextArea
            placeholder="Floor Tiles, Wall Tiles, Marble, Granite, Bathroom Fittings"
            value={settings.aboutCategories}
            onChange={handleChange('aboutCategories')}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Featured Brands</Label>
          <HelpText>Comma-separated list of brand names</HelpText>
          <TextArea
            placeholder="Brand A, Brand B, Brand C"
            value={settings.aboutBrands}
            onChange={handleChange('aboutBrands')}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Showroom Description</Label>
          <TextArea
            placeholder="Visit our modern showroom to experience our collection..."
            value={settings.aboutShowroom}
            onChange={handleChange('aboutShowroom')}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Showroom Image URLs</Label>
          <HelpText>Comma-separated Google Drive or image URLs for the showroom gallery</HelpText>
          <TextArea
            placeholder="https://drive.google.com/..., https://drive.google.com/..."
            value={settings.aboutShowroomImages}
            onChange={handleChange('aboutShowroomImages')}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Why Choose Us</Label>
          <HelpText>Each line becomes a highlight. Format: Title - Description</HelpText>
          <TextArea
            placeholder={"15+ Years Experience - We've been in the industry long enough to know quality\nCertified Products - All our products meet international standards"}
            value={settings.aboutWhyChooseUs}
            onChange={handleChange('aboutWhyChooseUs')}
            style={{ minHeight: '140px' }}
          />
        </FieldGroup>

        <ButtonRow>
          <Button
            appearance="primary"
            type="submit"
            disabled={saving}
            style={{
              background: colors.primary.main,
              minWidth: 120,
            }}
          >
            {saving ? <Spinner size="tiny" /> : '💾 Save Settings'}
          </Button>
        </ButtonRow>
      </Form>
    </Container>
  );
};
