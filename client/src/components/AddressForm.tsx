import { useState } from "react";
import { Input, Button, Label, Text } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 32px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const PageTitle = styled.h1`
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  justify-content: flex-end;
`;

const SuccessMessage = styled.div`
  padding: 12px 16px;
  background: #e7f3e8;
  color: #107c10;
  border-radius: 4px;
  margin-bottom: 16px;
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