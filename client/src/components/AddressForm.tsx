import { useState } from "react";
import { Input, Button, Label, Text } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const FormContainer = styled.div`
  max-width: 600px;
  margin: ${spacing[8]} auto;
  padding: ${spacing[8]};
  background: ${colors.neutral[0]};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  width: 100%;

  ${media.tablet} {
    margin: ${spacing[4]} auto;
    padding: ${spacing[6]};
  }

  ${media.mobile} {
    margin: ${spacing[4]};
    padding: ${spacing[6]};
  }
`;

const PageTitle = styled.h1`
  margin: 0 0 ${spacing[6]} 0;
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: ${colors.neutral[900]};

  ${media.mobile} {
    font-size: ${typography.fontSize.xl};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};

  input {
    min-height: 44px;
  }

  ${media.mobile} {
    margin-bottom: ${spacing[4]};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[4]};

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing[3]};
  margin-top: ${spacing[8]};
  justify-content: flex-end;

  ${media.mobile} {
    flex-direction: column-reverse;
    gap: ${spacing[2]};

    button {
      width: 100%;
      min-height: 44px;
    }
  }
`;

const SuccessMessage = styled.div`
  padding: ${spacing[3]} ${spacing[4]};
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: ${colors.success};
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing[4]};
  border-left: 4px solid ${colors.success};
  font-weight: ${typography.fontWeight.medium};
  font-size: ${typography.fontSize.sm};
`;

export const AddressForm = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    if (form.name && form.address && form.city && form.zip) {
      setSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <FormContainer>
      <PageTitle>Shipping Address</PageTitle>
      
      {submitted && (
        <SuccessMessage>
          ✓ Address saved successfully! Redirecting...
        </SuccessMessage>
      )}

      <FormGroup>
        <Label htmlFor="name" weight="semibold">Full Name *</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e, d) => handleChange("name", d.value)}
          disabled={submitted}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="address" weight="semibold">Address *</Label>
        <Input
          id="address"
          placeholder="Enter your address"
          value={form.address}
          onChange={(e, d) => handleChange("address", d.value)}
          disabled={submitted}
        />
      </FormGroup>

      <FormRow>
        <FormGroup>
          <Label htmlFor="city" weight="semibold">City *</Label>
          <Input
            id="city"
            placeholder="Enter your city"
            value={form.city}
            onChange={(e, d) => handleChange("city", d.value)}
            disabled={submitted}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="zip" weight="semibold">ZIP Code *</Label>
          <Input
            id="zip"
            placeholder="Enter ZIP code"
            value={form.zip}
            onChange={(e, d) => handleChange("zip", d.value)}
            disabled={submitted}
          />
        </FormGroup>
      </FormRow>

      <Text size={200} style={{ color: "#666", marginTop: "12px" }}>
        All fields are required
      </Text>

      <ButtonGroup>
        <Button 
          appearance="secondary" 
          onClick={() => navigate("/cart")}
          disabled={submitted}
        >
          Back to Cart
        </Button>
        <Button
          appearance="primary"
          onClick={handleSave}
          disabled={submitted || !form.name || !form.address || !form.city || !form.zip}
        >
          {submitted ? "Processing..." : "Complete Order"}
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
};