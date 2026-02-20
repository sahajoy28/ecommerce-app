import styled from "styled-components";
import { Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { fetchProducts } from "../features/products/productsSlice";
import { ProductCard } from "../components/ProductCard";
import { BannerDisplay } from "../components/BannerDisplay";
import { userAPI } from "../services/userAPI";
import { productsApi } from "../services/apiClient";
import { convertGoogleDriveUrl } from '../utils/googleDriveUrl';
import { colors, spacing, typography, media } from "../styles/designTokens";

const Container = styled.div`
  width: 100%;
  background: var(--color-bg-primary, white);
`;

const HeroBanner = styled.section`
  width: 100%;
  min-height: 500px;
  background: linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-primary-dark, #764ba2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  padding: ${spacing[8]};

  ${media.tablet} {
    min-height: 350px;
  }

  ${media.mobile} {
    min-height: 250px;
    padding: ${spacing[4]};
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: ${spacing[4]};

  ${media.tablet} {
    font-size: 2.5rem;
  }

  ${media.mobile} {
    font-size: 1.75rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: ${spacing[6]};
  opacity: 0.95;

  ${media.mobile} {
    font-size: 1rem;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
`;

const Section = styled.section`
  padding: ${spacing[12]} ${spacing[6]};
  max-width: 1400px;
  margin: 0 auto;

  ${media.tablet} {
    padding: ${spacing[8]} ${spacing[4]};
  }

  ${media.mobile} {
    padding: ${spacing[6]} ${spacing[3]};
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: ${spacing[8]};
  text-align: center;
  color: var(--color-text-primary, ${colors.neutral[900]});

  ${media.mobile} {
    font-size: 1.75rem;
    margin-bottom: ${spacing[6]};
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing[6]};

  ${media.tablet} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${spacing[4]};
  }

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[3]};
  }
`;

const CategoryCard = styled.div`
  background: var(--color-bg-primary, white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryImage = styled.div<{ $hasImage?: boolean; $gradient?: string }>`
  width: 100%;
  height: 150px;
  background: ${p => p.$gradient || `linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-primary-dark, #764ba2) 100%)`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  position: relative;
  overflow: hidden;
`;

const CategoryInfo = styled.div`
  padding: ${spacing[4]};
  text-align: center;
`;

const CategoryName = styled.h3`
  font-size: ${typography.fontSize.base};
  font-weight: 600;
  margin: 0;
  color: var(--color-text-primary, ${colors.neutral[900]});
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${spacing[6]};

  ${media.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${spacing[4]};
  }

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[3]};
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing[6]};
`;

const TestimonialCard = styled.div`
  background: var(--color-bg-primary, white);
  padding: ${spacing[6]};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--color-primary, #667eea);
`;

const TestimonialText = styled.p`
  font-size: ${typography.fontSize.base};
  color: var(--color-text-secondary, ${colors.neutral[600]});
  margin-bottom: ${spacing[4]};
  font-style: italic;
`;

const TestimonialAuthor = styled.p`
  font-weight: 600;
  color: var(--color-text-primary, ${colors.neutral[900]});
  margin: 0;
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
  position: fixed;
  bottom: ${spacing[6]};
  right: ${spacing[6]};
  width: 60px;
  height: 60px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 100;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  ${media.mobile} {
    bottom: ${spacing[4]};
    right: ${spacing[4]};
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing[6]};
  text-align: center;
`;

const StatCard = styled.div`
  padding: ${spacing[6]};
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-primary, #667eea);
  margin-bottom: ${spacing[2]};
`;

const StatLabel = styled.div`
  font-size: ${typography.fontSize.base};
  color: var(--color-text-secondary, ${colors.neutral[600]});
`;

const ProductListContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${spacing[8]};
`;

const DEFAULT_CATEGORIES: { id: string; name: string; icon: string; image: string; gradient: string }[] = [];

const DEFAULT_TESTIMONIALS = [
  { text: "Amazing product quality and super fast delivery. This has become my go-to store!", author: "Sarah Johnson — Repeat Customer" },
  { text: "The variety is incredible. I found exactly what I needed at a great price.", author: "Michael Chen — Verified Buyer" },
  { text: "Outstanding customer service. They went above and beyond to help me choose the right product.", author: "Priya Sharma — Interior Designer" },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(state => state.products);
  const featuredProducts = items.slice(0, 6);
  const [mapUrl, setMapUrl] = useState('');
  const [heroTitle, setHeroTitle] = useState('Discover Premium Products for Every Lifestyle');
  const [heroSubtitle, setHeroSubtitle] = useState('Shop curated collections of electronics, fashion, home essentials, and more — all in one place');
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [stats, setStats] = useState({ products: '500+', years: '15+', clients: '5000+', brands: '50+' });
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [whatsappNumber, setWhatsappNumber] = useState('919876543210');

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts() as any);
    }

    // Load categories from Category API
    productsApi.get<any>('/categories/home').then((res: any) => {
      if (res.categories && res.categories.length > 0) {
        setCategories(res.categories.map((cat: any) => ({
          id: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
          name: cat.name,
          icon: cat.icon || '📦',
          image: cat.image || '',
          gradient: cat.gradient || '',
        })));
      }
    }).catch(() => {});

    // Load other homepage settings
    userAPI.getSiteSettings().then((data: any) => {
      // Map
      if (data.mapEmbedUrl) {
        const url = data.mapEmbedUrl.trim();
        const srcMatch = url.match(/src=["']([^"']+)["']/i);
        setMapUrl(srcMatch ? srcMatch[1] : url);
      } else if (data.mapLatitude != null && data.mapLongitude != null) {
        const zoom = data.mapZoom || 15;
        setMapUrl(`https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${data.mapLatitude},${data.mapLongitude}&t=&z=${zoom}&ie=UTF8&iwloc=B&output=embed`);
      }
      // Hero
      if (data.heroTitle) setHeroTitle(data.heroTitle);
      if (data.heroSubtitle) setHeroSubtitle(data.heroSubtitle);
      // Stats
      setStats({
        products: data.statsProducts || '500+',
        years: data.statsYears || '15+',
        clients: data.statsClients || '5000+',
        brands: data.statsBrands || '50+',
      });
      // Testimonials
      if (Array.isArray(data.testimonials) && data.testimonials.length > 0) {
        setTestimonials(data.testimonials);
      }
      // WhatsApp
      if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
    }).catch(() => {});
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    // Use lowercased name for URL
    navigate(`/catalog?category=${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  return (
    <Container>
      {/* Dynamic Banners from Admin Panel */}
      <Section>
        <BannerDisplay type="all" limit={5} autoRotate={true} rotationInterval={5000} />
      </Section>

      {/* Hero Banner */}
      <HeroBanner>
        <HeroContent>
          <HeroTitle>{heroTitle}</HeroTitle>
          <HeroSubtitle>{heroSubtitle}</HeroSubtitle>
          <CTAButtons>
            <Button
              appearance="primary"
              onClick={() => navigate('/catalog')}
            >
              Explore Products
            </Button>
            <Button
              appearance="outline"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </CTAButtons>
        </HeroContent>
      </HeroBanner>

      {/* Featured Categories */}
      {categories.length > 0 && (
      <Section>
        <SectionTitle>Our Categories</SectionTitle>
        <CategoriesGrid>
          {categories.map(category => (
            <CategoryCard key={category.id} onClick={() => handleCategoryClick(category.name)}>
              <CategoryImage
                $hasImage={!!category.image}
                $gradient={category.gradient || undefined}
                style={category.image ? { backgroundImage: `url('${convertGoogleDriveUrl(category.image)}')` } : undefined}
              >
                {!category.image && category.icon}
              </CategoryImage>
              <CategoryInfo>
                <CategoryName>{category.name}</CategoryName>
              </CategoryInfo>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </Section>
      )}

      {/* Featured Products */}
      <Section style={{ backgroundColor: 'var(--color-bg-secondary, #f9f9f9)' }}>
        <SectionTitle>Featured Products</SectionTitle>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading products...</div>
        ) : featuredProducts.length > 0 ? (
          <>
            <ProductsGrid>
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductsGrid>
            <ProductListContainer>
              <Button
                appearance="primary"
                onClick={() => navigate('/catalog')}
              >
                View All Products
              </Button>
            </ProductListContainer>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No products available yet
          </div>
        )}
      </Section>

      {/* Statistics */}
      <Section>
        <StatsContainer>
          <StatCard>
            <StatNumber>{stats.products}</StatNumber>
            <StatLabel>Premium Products</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.years}</StatNumber>
            <StatLabel>Years Experience</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.clients}</StatNumber>
            <StatLabel>Happy Customers</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.brands}</StatNumber>
            <StatLabel>Brands Available</StatLabel>
          </StatCard>
        </StatsContainer>
      </Section>

      {/* Testimonials */}
      <Section style={{ backgroundColor: 'var(--color-bg-secondary, #f9f9f9)' }}>
        <SectionTitle>What Our Customers Say</SectionTitle>
        <TestimonialsGrid>
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx}>
              <TestimonialText>"{testimonial.text}"</TestimonialText>
              <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Section>

      {/* Location Map */}
      {mapUrl && (
        <Section>
          <SectionTitle>Visit Our Showroom</SectionTitle>
          <MapContainer>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapUrl}
            />
          </MapContainer>
        </Section>
      )}

      {/* WhatsApp Button */}
      <WhatsAppButton
        href={`https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
      >
        💬
      </WhatsAppButton>
    </Container>
  );
};
