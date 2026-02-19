import styled from "styled-components";
import { Button, Input, Textarea } from "@fluentui/react-components";
import { useState } from "react";
import { colors, spacing, typography, media } from "../styles/designTokens";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing[12]} ${spacing[6]};

  ${media.tablet} {
    padding: ${spacing[8]} ${spacing[4]};
  }

  ${media.mobile} {
    padding: ${spacing[6]} ${spacing[3]};
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: ${spacing[4]};
  color: ${colors.neutral[900]};

  ${media.mobile} {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${colors.neutral[600]};
  text-align: center;
  max-width: 600px;
  margin: 0 auto ${spacing[12]};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[12]};
  margin-bottom: ${spacing[12]};

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: ${spacing[8]};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[8]};
`;

const InfoCard = styled.div`
  padding: ${spacing[6]};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #667eea;
`;

const InfoTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 ${spacing[2]} 0;
  color: ${colors.neutral[900]};
`;

const InfoContent = styled.p`
  margin: 0;
  color: ${colors.neutral[700]};
  font-size: 1rem;
`;

const LinkButton = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
  padding: ${spacing[6]};
  background: #f9f9f9;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${colors.neutral[900]};
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

const SubmitButton = styled(Button)`
  padding: ${spacing[3]} ${spacing[6]} !important;
  margin-top: ${spacing[4]} !important;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  ${media.tablet} {
    height: 300px;
  }

  ${media.mobile} {
    height: 250px;
  }
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[6]};
  background: #25d366;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #1faa51;
    transform: translateY(-2px);
  }
`;

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Container>
      <Title>Contact Us</Title>
      <Subtitle>
        Get in touch with us. We're here to help and would love to hear from you.
      </Subtitle>

      <ContentGrid>
        {/* Contact Info */}
        <ContactInfo>
          <InfoCard>
            <InfoTitle>📍 Address</InfoTitle>
            <InfoContent>
              123 Marble Showroom Lane<br />
              Ahmedabad, Gujarat 380001<br />
              India
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <InfoTitle>📞 Phone</InfoTitle>
            <InfoContent>
              <LinkButton href="tel:+919876543210">+91 98765 43210</LinkButton>
              <br />
              <LinkButton href="tel:+919123456789">+91 91234 56789</LinkButton>
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <InfoTitle>📧 Email</InfoTitle>
            <InfoContent>
              <LinkButton href="mailto:info@showroom.com">info@showroom.com</LinkButton>
              <br />
              <LinkButton href="mailto:sales@showroom.com">sales@showroom.com</LinkButton>
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <InfoTitle>💬 WhatsApp</InfoTitle>
            <InfoContent>
              <WhatsAppButton
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Chat on WhatsApp
              </WhatsAppButton>
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <InfoTitle>🕐 Business Hours</InfoTitle>
            <InfoContent>
              Monday - Friday: 10:00 AM - 6:00 PM<br />
              Saturday: 11:00 AM - 5:00 PM<br />
              Sunday: Closed
            </InfoContent>
          </InfoCard>
        </ContactInfo>

        {/* Contact Form */}
        <ContactForm onSubmit={handleSubmit}>
          <h2 style={{ marginTop: 0, marginBottom: spacing[4], color: colors.neutral[900] }}>
            Send us a Message
          </h2>

          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <StyledInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email *</Label>
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
            <Label htmlFor="phone">Phone *</Label>
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
            <Label htmlFor="subject">Subject *</Label>
            <StyledInput
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message *</Label>
            <StyledTextarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows={5}
              required
            />
          </FormGroup>

          <SubmitButton
            appearance="primary"
            type="submit"
          >
            {submitted ? '✓ Message Sent!' : 'Send Message'}
          </SubmitButton>
        </ContactForm>
      </ContentGrid>

      {/* Map Section */}
      <div>
        <h2 style={{ marginBottom: spacing[6], color: colors.neutral[900] }}>
          📍 Visit Our Showroom
        </h2>
        <MapContainer>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.4244489996937!2d72.58316!3d23.025122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84a7f000001%3A0x1a3a3a3a3a3a3a3a!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890"
          />
        </MapContainer>
      </div>
    </Container>
  );
};
