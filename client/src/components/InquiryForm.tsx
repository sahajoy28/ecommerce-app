import styled from "styled-components";
import { Button, Input, Textarea } from "@fluentui/react-components";
import { useState, useEffect } from "react";
import { productsApi } from "../services/apiClient";
import { userAPI } from "../services/userAPI";
import { colors, spacing } from "../styles/designTokens";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
  padding: ${spacing[6]};
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const FormTitle = styled.h3`
  margin: 0 0 ${spacing[4]} 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.neutral[900]};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${colors.neutral[900]};
  font-size: 0.95rem;
`;

const StyledInput = styled(Input)`
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const StyledTextarea = styled(Textarea)`
  padding: ${spacing[2]} ${spacing[3]} !important;
  border-radius: 4px !important;
  border: 1px solid #ddd !important;
  font-size: 1rem !important;
  resize: vertical !important;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing[3]};
  flex-wrap: wrap;
  margin-top: ${spacing[4]};
`;

const SubmitButton = styled(Button)`
  flex: 1;
  min-width: 150px;
  padding: ${spacing[3]} ${spacing[6]} !important;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[6]};
  background: #25d366;
  color: white !important;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 150px;

  &:hover {
    background: #1faa51;
    transform: translateY(-2px);
  }
`;

const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[6]};
  background: #ff6b00;
  color: white !important;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 150px;

  &:hover {
    background: #e55a00;
    transform: translateY(-2px);
  }
`;

const SuccessMessage = styled.div`
  padding: ${spacing[4]};
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
  text-align: center;
  font-weight: 600;
`;

const ErrorMessage = styled.div`
  padding: ${spacing[4]};
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  color: #721c24;
  text-align: center;
  font-weight: 600;
`;

const HelpLink = styled.button`
  background: none;
  border: none;
  color: #4338ca;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-top: ${spacing[1]};
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #3730a3;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: ${spacing[4]};
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  max-width: 520px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.25s ease;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[5]} ${spacing[6]};
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #eef2ff 0%, #e8f0fe 100%);
  border-radius: 12px 12px 0 0;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #4338ca;
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.neutral[500]};
  padding: ${spacing[1]};
  line-height: 1;
  border-radius: 4px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${colors.neutral[900]};
  }
`;

const ModalBody = styled.div`
  padding: ${spacing[6]};
  color: ${colors.neutral[800]};
  font-size: 0.9rem;
  line-height: 1.7;

  ul {
    margin: ${spacing[2]} 0;
    padding-left: ${spacing[5]};
  }

  li {
    margin-bottom: ${spacing[1]};
  }

  strong {
    color: ${colors.neutral[900]};
  }

  code {
    background: rgba(99, 102, 241, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
    color: #4338ca;
  }

  .step {
    margin-bottom: ${spacing[4]};
    padding-bottom: ${spacing[4]};
    border-bottom: 1px dashed #e5e7eb;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }

  .step-label {
    display: inline-block;
    background: #4338ca;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: ${spacing[2]};
  }
`;

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

interface InquiryFormProps {
  productId: string;
  productName: string;
}

const DEFAULT_FIELDS: InquiryFieldConfig[] = [
  { fieldName: 'name', label: 'Your Name', type: 'text', required: true, enabled: true, placeholder: 'Full name', options: [], displayOrder: 0 },
  { fieldName: 'email', label: 'Email Address', type: 'email', required: true, enabled: true, placeholder: 'your@email.com', options: [], displayOrder: 1 },
  { fieldName: 'phone', label: 'Phone Number', type: 'tel', required: true, enabled: true, placeholder: '+91 98765 43210', options: [], displayOrder: 2 },
  { fieldName: 'quantity', label: 'Quantity Required', type: 'number', required: true, enabled: true, placeholder: 'e.g., 100', options: [], displayOrder: 3 },
  { fieldName: 'quantityUnit', label: 'Unit', type: 'select', required: false, enabled: true, placeholder: '', options: ['Units', 'Pieces', 'Sets', 'Kg', 'Boxes'], displayOrder: 4 },
  { fieldName: 'message', label: 'Additional Message / Requirements', type: 'textarea', required: false, enabled: true, placeholder: 'Tell us more about your needs...', options: [], displayOrder: 5 },
];

export const InquiryForm = ({ productId, productName }: InquiryFormProps) => {
  const [fields, setFields] = useState<InquiryFieldConfig[]>(DEFAULT_FIELDS);
  const [formTitle, setFormTitle] = useState('Request Quote / Inquiry');
  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const [showCall, setShowCall] = useState(true);
  const [showSqftCalc, setShowSqftCalc] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCalcGuide, setShowCalcGuide] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);

  // Load inquiry form config from site settings
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await userAPI.getSiteSettings();
        if (data.inquiryFormFields && data.inquiryFormFields.length > 0) {
          const enabledFields = data.inquiryFormFields
            .filter((f: InquiryFieldConfig) => f.enabled)
            .sort((a: InquiryFieldConfig, b: InquiryFieldConfig) => a.displayOrder - b.displayOrder);
          setFields(enabledFields);
        }
        if (data.inquiryFormTitle) setFormTitle(data.inquiryFormTitle);
        setShowWhatsApp(data.showWhatsAppButton !== false);
        setShowCall(data.showCallButton !== false);
        setShowSqftCalc(data.showSqftCalculator !== false);
        if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
        if (data.phone) setPhoneNumber(data.phone);
      } catch (err) {
        console.error('Failed to load inquiry form config:', err);
      } finally {
        setConfigLoaded(true);
      }
    };
    loadConfig();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await productsApi.post('/inquiries', {
        ...formData,
        productId,
        productName
      });

      if ((response as any).success) {
        setSubmitted(true);
        setFormData({});
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if any visible select field with sq.ft option has it selected
  const hasSqftSelected = fields.some(f =>
    f.type === 'select' &&
    f.options.some(o => o.toLowerCase() === 'sq.ft') &&
    (formData[f.fieldName] || '').toLowerCase() === 'sq.ft'
  );

  const formatPhone = (num: string) => {
    const cleaned = num.replace(/[^0-9+]/g, '');
    return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
  };

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(productName)}`
    : '';

  const callLink = phoneNumber ? `tel:${formatPhone(phoneNumber)}` : '';

  if (submitted) {
    return (
      <SuccessMessage>
        ✓ Thank you! We've received your inquiry and will contact you soon.
      </SuccessMessage>
    );
  }

  if (!configLoaded) return null;

  const renderField = (field: InquiryFieldConfig) => {
    switch (field.type) {
      case 'textarea':
        return (
          <FormGroup key={field.fieldName}>
            <Label htmlFor={field.fieldName}>{field.label}{field.required ? ' *' : ''}</Label>
            <StyledTextarea
              id={field.fieldName}
              name={field.fieldName}
              value={formData[field.fieldName] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
            />
          </FormGroup>
        );
      case 'select':
        return (
          <FormGroup key={field.fieldName}>
            <Label htmlFor={field.fieldName}>{field.label}{field.required ? ' *' : ''}</Label>
            <StyledInput
              as="select"
              id={field.fieldName}
              name={field.fieldName}
              value={formData[field.fieldName] || (field.options[0] || '')}
              onChange={handleChange}
              required={field.required}
            >
              {field.options.map(opt => (
                <option key={opt} value={opt.toLowerCase().replace(/\./g, '')}>{opt}</option>
              ))}
            </StyledInput>
          </FormGroup>
        );
      default:
        return (
          <FormGroup key={field.fieldName}>
            <Label htmlFor={field.fieldName}>{field.label}{field.required ? ' *' : ''}</Label>
            <StyledInput
              id={field.fieldName}
              name={field.fieldName}
              type={field.type}
              value={formData[field.fieldName] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
            />
          </FormGroup>
        );
    }
  };

  return (
    <>
      {error && <ErrorMessage>❌ {error}</ErrorMessage>}
      
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>{formTitle}</FormTitle>

        {fields.map(renderField)}

        {showSqftCalc && hasSqftSelected && (
          <HelpLink type="button" onClick={() => setShowCalcGuide(true)}>
            📐 How to calculate area &amp; quantity?
          </HelpLink>
        )}

        <ButtonGroup>
          <SubmitButton
            appearance="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? '⏳ Submitting...' : '📤 Send Inquiry'}
          </SubmitButton>
          
          {showWhatsApp && whatsappLink && (
            <WhatsAppButton
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              💬 WhatsApp
            </WhatsAppButton>
          )}
          
          {showCall && callLink && (
            <CallButton
              href={callLink}
              onClick={(e) => e.stopPropagation()}
            >
              📞 Call Now
            </CallButton>
          )}
        </ButtonGroup>
      </FormContainer>

      {showCalcGuide && (
        <ModalOverlay onClick={() => setShowCalcGuide(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>📐 Area &amp; Quantity Guide</h3>
              <CloseButton onClick={() => setShowCalcGuide(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <div className="step">
                <span className="step-label">Step 1</span>
                <br />
                <strong>Determine what you need</strong>
                <ul>
                  <li>Identify the <strong>product</strong> and the <strong>unit of measurement</strong> (pieces, sq.ft, kg, etc.).</li>
                  <li>For area-based products: <code>Area = Length × Width</code></li>
                  <li>Example: 12 ft × 10 ft = <strong>120 sq.ft</strong></li>
                </ul>
              </div>
              <div className="step">
                <span className="step-label">Step 2</span>
                <br />
                <strong>Account for extras</strong>
                <ul>
                  <li>Add <strong>5–10% extra</strong> for waste, cutting, or spares.</li>
                  <li><code>Total = Required Amount × 1.10</code></li>
                  <li>Example: 120 × 1.10 = <strong>≈ 132 units</strong></li>
                </ul>
              </div>
              <div className="step">
                <span className="step-label">Step 3</span>
                <br />
                <strong>Submit your inquiry</strong>
                <ul>
                  <li>Enter the total quantity and select the correct unit.</li>
                  <li>Our team will confirm pricing and availability.</li>
                </ul>
              </div>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};
