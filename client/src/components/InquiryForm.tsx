import styled from "styled-components";
import { Button, Input, Textarea } from "@fluentui/react-components";
import { useState } from "react";
import { productsApi } from "../services/apiClient";
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

interface InquiryFormProps {
  productId: string;
  productName: string;
}

export const InquiryForm = ({ productId, productName }: InquiryFormProps) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    quantity: string;
    quantityUnit: 'units' | 'boxes' | 'sqft' | 'sqm';
    message: string;
  }>({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    quantityUnit: 'units',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCalcGuide, setShowCalcGuide] = useState(false);

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
        setFormData({ name: '', email: '', phone: '', quantity: '', quantityUnit: 'units', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SuccessMessage>
        ✓ Thank you! We've received your inquiry and will contact you soon.
      </SuccessMessage>
    );
  }

  return (
    <>
      {error && <ErrorMessage>❌ {error}</ErrorMessage>}
      
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>Request Quote / Inquiry</FormTitle>

        <FormGroup>
          <Label htmlFor="name">Your Name *</Label>
          <StyledInput
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email Address *</Label>
          <StyledInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Phone Number *</Label>
          <StyledInput
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="quantity">Quantity Required *</Label>
          <StyledInput
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 100"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="quantityUnit">Unit</Label>
          <StyledInput
            as="select"
            id="quantityUnit"
            name="quantityUnit"
            value={formData.quantityUnit}
            onChange={handleChange}
          >
            <option value="units">Units</option>
            <option value="boxes">Boxes</option>
            <option value="sqft">Sq.ft</option>
            <option value="sqm">Sq.m</option>
          </StyledInput>
        </FormGroup>

        {formData.quantityUnit === 'sqft' && (
          <HelpLink type="button" onClick={() => setShowCalcGuide(true)}>
            📐 How to calculate sq.ft &amp; skirting?
          </HelpLink>
        )}

        <FormGroup>
          <Label htmlFor="message">Additional Message / Requirements</Label>
          <StyledTextarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your project or requirements..."
            rows={4}
          />
        </FormGroup>

        <ButtonGroup>
          <SubmitButton
            appearance="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? '⏳ Submitting...' : '📤 Send Inquiry'}
          </SubmitButton>
          
          <WhatsAppButton
            href={`https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(productName)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            💬 WhatsApp
          </WhatsAppButton>
          
          <CallButton
            href="tel:+919876543210"
            onClick={(e) => e.stopPropagation()}
          >
            📞 Call Now
          </CallButton>
        </ButtonGroup>
      </FormContainer>

      {showCalcGuide && (
        <ModalOverlay onClick={() => setShowCalcGuide(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>📐 Sq.ft &amp; Skirting Guide</h3>
              <CloseButton onClick={() => setShowCalcGuide(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <div className="step">
                <span className="step-label">Step 1</span>
                <br />
                <strong>Measure your area</strong>
                <ul>
                  <li>Measure the <strong>length</strong> and <strong>width</strong> of the room/area in feet.</li>
                  <li><code>Area (sq.ft) = Length × Width</code></li>
                  <li>Example: 12 ft × 10 ft = <strong>120 sq.ft</strong></li>
                </ul>
              </div>
              <div className="step">
                <span className="step-label">Step 2</span>
                <br />
                <strong>Add skirting (border tiles along walls)</strong>
                <ul>
                  <li>Measure the <strong>total wall length</strong> (perimeter) where skirting is needed.</li>
                  <li>Skirting height is typically <strong>3–4 inches</strong> (0.25–0.33 ft).</li>
                  <li><code>Skirting (sq.ft) = Wall Length × Skirting Height</code></li>
                  <li>Example: 44 ft × 0.33 ft = <strong>≈ 15 sq.ft</strong></li>
                </ul>
              </div>
              <div className="step">
                <span className="step-label">Step 3</span>
                <br />
                <strong>Total with wastage</strong>
                <ul>
                  <li><code>Total = (Area + Skirting) + 5–10% extra</code></li>
                  <li>Example: (120 + 15) × 1.10 = <strong>≈ 149 sq.ft</strong></li>
                </ul>
              </div>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};
