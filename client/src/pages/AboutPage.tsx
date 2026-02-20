import { useEffect, useState } from "react";
import styled from "styled-components";
import { colors, spacing, typography, media } from "../styles/designTokens";
import { userAPI } from "../services/userAPI";

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
  ${media.mobile} {
    text-align: center;
  }
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
  height: 200px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BulletItem = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${colors.neutral[700]};
  margin-bottom: ${spacing[2]};
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  margin-top: ${spacing[6]};

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  ${media.mobile} {
    height: 280px;
  }
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  border: 2px dashed ${colors.neutral[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${spacing[3]};
  margin-top: ${spacing[6]};
  color: ${colors.neutral[500]};
  font-size: 1.1rem;

  ${media.mobile} {
    height: 280px;
  }
`;

// Default fallback content
const DEFAULTS = {
  aboutTitle: 'About Us',
  aboutSubtitle: 'Your trusted destination for premium, curated products across lifestyle, tech, and home',
  aboutStory: `We started with a simple vision: bring together the best products from around the world into one beautifully curated store. What began as a small online shop has grown into a trusted marketplace serving thousands of happy customers.\n\nOur team personally tests and selects every product to ensure it meets our high standards of quality, design, and value. We believe shopping should be joyful — and every purchase you make should bring lasting satisfaction.`,
  aboutOfferings: `Curated collection of premium products across 8+ categories\nExpert product recommendations and guides\nCompetitive pricing with regular deals and offers\nFast, reliable shipping with tracking\nHassle-free returns and exchanges\nDedicated customer support`,
  aboutCategories: ['Electronics', 'Fashion', 'Home & Living', 'Sports & Outdoors', 'Beauty & Health', 'Kitchen & Dining'],
  aboutBrands: ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E', 'Brand F'],
  aboutShowroom: 'Browse our complete catalog online, with detailed photos, specifications, and customer reviews for every product.',
  aboutWhyChooseUs: `Curated Quality — Every product is hand-selected for quality and value\nFast Shipping — Most orders ship within 24 hours\nEasy Returns — 30-day hassle-free return policy\nExpert Support — Our team is here to help you choose\nSecure Checkout — Your data is always protected\nSustainable — We prioritize eco-friendly products and packaging`,
  aboutShowroomImages: [] as string[],
};

export const AboutPage = () => {
  const [settings, setSettings] = useState(DEFAULTS);
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    userAPI.getSiteSettings().then((data: any) => {
      if (data) {
        setSettings({
          aboutTitle: data.aboutTitle || DEFAULTS.aboutTitle,
          aboutSubtitle: data.aboutSubtitle || DEFAULTS.aboutSubtitle,
          aboutStory: data.aboutStory || DEFAULTS.aboutStory,
          aboutOfferings: data.aboutOfferings || DEFAULTS.aboutOfferings,
          aboutCategories: (data.aboutCategories && data.aboutCategories.length > 0)
            ? data.aboutCategories : DEFAULTS.aboutCategories,
          aboutBrands: (data.aboutBrands && data.aboutBrands.length > 0)
            ? data.aboutBrands : DEFAULTS.aboutBrands,
          aboutShowroom: data.aboutShowroom || DEFAULTS.aboutShowroom,
          aboutWhyChooseUs: data.aboutWhyChooseUs || DEFAULTS.aboutWhyChooseUs,
          aboutShowroomImages: (data.aboutShowroomImages && data.aboutShowroomImages.length > 0)
            ? data.aboutShowroomImages : DEFAULTS.aboutShowroomImages,
        });

        // Build map URL from settings
        if (data.mapEmbedUrl) {
          const url = data.mapEmbedUrl.trim();
          const srcMatch = url.match(/src=["']([^"']+)["']/i);
          setMapUrl(srcMatch ? srcMatch[1] : url);
        } else if (data.mapLatitude && data.mapLongitude) {
          const zoom = data.mapZoom || 15;
          setMapUrl(`https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${data.mapLatitude},${data.mapLongitude}&t=&z=${zoom}&ie=UTF8&iwloc=B&output=embed`);
        }
      }
    }).catch(() => {});
  }, []); 

  const storyParagraphs = settings.aboutStory.split(/\n\s*\n/).filter(Boolean);
  const offeringLines = settings.aboutOfferings.split('\n').filter(Boolean);
  const whyChooseLines = settings.aboutWhyChooseUs.split('\n').filter(Boolean);

  return (
    <Container>
      <HeroSection>
        <Title>{settings.aboutTitle}</Title>
        <Subtitle>{settings.aboutSubtitle}</Subtitle>
      </HeroSection>

      <ContentSection>
        <SectionTitle>Our Story</SectionTitle>
        {storyParagraphs.map((para, i) => (
          <Content key={i}>{para.trim()}</Content>
        ))}
      </ContentSection>

      <ContentSection>
        <SectionTitle>What We Offer</SectionTitle>
        <HighlightBox>
          {offeringLines.map((line, i) => (
            <BulletItem key={i}>✓ {line.trim()}</BulletItem>
          ))}
        </HighlightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Our Categories</SectionTitle>
        <Content>We specialize in a wide range of premium materials including:</Content>
        <BrandsList>
          {settings.aboutCategories.map((cat, i) => (
            <BrandItem key={i}>{cat}</BrandItem>
          ))}
        </BrandsList>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Featured Brands</SectionTitle>
        <Content>We are authorized dealers for prestigious brands including:</Content>
        <BrandsList>
          {settings.aboutBrands.map((brand, i) => (
            <BrandItem key={i}>{brand}</BrandItem>
          ))}
        </BrandsList>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Our Showroom</SectionTitle>
        <Content>{settings.aboutShowroom}</Content>
        <GalleryGrid>
          {settings.aboutShowroomImages.length > 0
            ? settings.aboutShowroomImages.map((url, i) => (
                <GalleryItem key={i}>
                  <img src={url} alt={`Showroom ${i + 1}`} />
                </GalleryItem>
              ))
            : (
              <>
                <GalleryItem>📸</GalleryItem>
                <GalleryItem>🏢</GalleryItem>
                <GalleryItem>🎨</GalleryItem>
              </>
            )
          }
        </GalleryGrid>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Why Choose Us?</SectionTitle>
        <HighlightBox>
          {whyChooseLines.map((line, i) => {
            const dashIdx = line.indexOf(' - ');
            if (dashIdx > -1) {
              return (
                <Content key={i}>
                  <strong>{line.substring(0, dashIdx).trim()}</strong> - {line.substring(dashIdx + 3).trim()}
                </Content>
              );
            }
            return <Content key={i}>{line.trim()}</Content>;
          })}
        </HighlightBox>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Find Us</SectionTitle>
        <Content>Visit our showroom to see our collection in person.</Content>
        {mapUrl ? (
          <MapContainer>
            <iframe
              src={mapUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            />
          </MapContainer>
        ) : (
          <MapPlaceholder>
            <span style={{ fontSize: '3rem' }}>📍</span>
            <span>Map location not configured yet</span>
          </MapPlaceholder>
        )}
      </ContentSection>
    </Container>
  );
};
