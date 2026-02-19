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

interface InquiryFormProps {
  productId: string;
  productName: string;
}

export const InquiryForm = ({ productId, productName }: InquiryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    quantityUnit: 'units' as const,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    </>
  );
};
