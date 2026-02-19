import styled from "styled-components";
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

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${spacing[12]};
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: ${spacing[4]};
  color: ${colors.neutral[900]};

  ${media.mobile} {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${colors.neutral[600]};
  max-width: 600px;
  margin: 0 auto ${spacing[6]};
`;

const ContentSection = styled.section`
  margin-bottom: ${spacing[12]};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: ${spacing[6]};
  color: ${colors.neutral[900]};
`;

const Content = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${colors.neutral[700]};
  margin-bottom: ${spacing[4]};
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: ${spacing[6]};
  border-radius: 8px;
  border-left: 4px solid #667eea;
  margin: ${spacing[6]} 0;
`;

const BrandsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${spacing[4]};
  margin-top: ${spacing[6]};
`;

const BrandItem = styled.div`
  text-align: center;
  padding: ${spacing[4]};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing[6]};
  margin-top: ${spacing[6]};
`;

const GalleryItem = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 200px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const AboutPage = () => {
  return (
    <Container>
      <HeroSection>
        <Title>About Us</Title>
        <Subtitle>
          Your trusted partner for premium building materials and showroom products since 2009
        </Subtitle>
      </HeroSection>

      <ContentSection>
        <SectionTitle>Our Story</SectionTitle>
        <Content>
          Founded in 2009, we started as a small tile showroom with a vision to provide the highest quality building materials to architects, contractors, and homeowners across the region. Over the past 15 years, we've grown into one of the most trusted showrooms for premium tiles, marble, granite, and bathroom fittings.
        </Content>
        <Content>
          Our success is built on three core principles: Quality, Integrity, and Customer Satisfaction. We believe in offering only the best products from renowned brands worldwide, and providing exceptional service that goes beyond expectations.
        </Content>
      </ContentSection>

      <ContentSection>
        <SectionTitle>What We Offer</SectionTitle>
        <HighlightBox>
          <Content>
            ✓ 500+ premium products from leading brands worldwide
            <br />✓ Expert design consultation and product recommendations
            <br />✓ Competitive wholesale and retail pricing
            <br />✓ Fast and reliable delivery across the region
            <br />✓ Professional installation guidance
            <br />✓ Dedicated customer support
          </Content>
        </HighlightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Our Categories</SectionTitle>
        <Content>
          We specialize in a wide range of premium materials including:
        </Content>
        <BrandsList>
          <BrandItem>🏠 Floor Tiles</BrandItem>
          <BrandItem>🧱 Wall Tiles</BrandItem>
          <BrandItem>💎 Marble</BrandItem>
          <BrandItem>🪨 Granite</BrandItem>
          <BrandItem>🚿 Bathroom Fittings</BrandItem>
          <BrandItem>🌳 Outdoor Tiles</BrandItem>
        </BrandsList>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Featured Brands</SectionTitle>
        <Content>
          We are authorized dealers for 50+ prestigious brands including:
        </Content>
        <BrandsList>
          <BrandItem>Brand A</BrandItem>
          <BrandItem>Brand B</BrandItem>
          <BrandItem>Brand C</BrandItem>
          <BrandItem>Brand D</BrandItem>
          <BrandItem>Brand E</BrandItem>
          <BrandItem>Brand F</BrandItem>
        </BrandsList>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Our Showroom</SectionTitle>
        <Content>
          Visit our modern showroom to experience our extensive collection in person. Our expert team is always available to help you find the perfect materials for your project.
        </Content>
        <GalleryGrid>
          <GalleryItem>📸</GalleryItem>
          <GalleryItem>🏢</GalleryItem>
          <GalleryItem>🎨</GalleryItem>
        </GalleryGrid>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Why Choose Us?</SectionTitle>
        <HighlightBox>
          <Content>
            <strong>15+ Years Experience</strong> - We've been in the industry long enough to know quality
            <br /><br />
            <strong>Certified Products</strong> - All our products meet international standards
            <br /><br />
            <strong>Expert Guidance</strong> - Our team provides professional consultation for your needs
            <br /><br />
            <strong>Bulk Discounts</strong> - Special pricing for contractors and large orders
            <br /><br />
            <strong>Quick Delivery</strong> - Fast and reliable shipping options available
            <br /><br />
            <strong>Excellent Support</strong> - Dedicated after-sales service
          </Content>
        </HighlightBox>
      </ContentSection>
    </Container>
  );
};
