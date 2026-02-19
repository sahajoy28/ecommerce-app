import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const HomeContainer = styled.div`
  background: var(--color-bg-primary, ${colors.neutral[50]});
  min-height: 100vh;
  padding: 0;
`;

// Hero Banner
const HeroBanner = styled.div`
  background: linear-gradient(135deg, ${colors.gradients.primary} 0%, ${colors.primary.dark} 100%);
  padding: ${spacing[16]} ${spacing[8]};
  text-align: center;
  color: var(--color-neutral-0, ${colors.neutral[0]});
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(100px, -100px);
  }

  ${media.tablet} {
    padding: ${spacing[12]} ${spacing[6]};
  }

  ${media.mobile} {
    padding: ${spacing[8]} ${spacing[4]};
  }
`;

const HeroTitle = styled.h1`
  margin: 0 0 ${spacing[4]} 0;
  font-size: ${typography.fontSize["5xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  position: relative;
  z-index: 1;
  letter-spacing: -0.02em;

  ${media.tablet} {
    font-size: ${typography.fontSize["4xl"]};
  }

  ${media.mobile} {
    font-size: ${typography.fontSize["3xl"]};
  }
`;

const HeroSubtitle = styled.p`
  margin: 0 0 ${spacing[8]} 0;
  font-size: ${typography.fontSize.lg};
  position: relative;
  z-index: 1;
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  ${media.mobile} {
    font-size: ${typography.fontSize.base};
  }
`;

const HeroButton = styled(Button)`
  position: relative;
  z-index: 1;
  padding: ${spacing[3]} ${spacing[8]} !important;
  font-size: ${typography.fontSize.base} !important;
  font-weight: ${typography.fontWeight.bold} !important;
  background: var(--color-neutral-0, ${colors.neutral[0]}) !important;
  color: var(--color-primary, ${colors.primary.main}) !important;
  transition: all ${transitions.fast} !important;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.xl} !important;
  }
`;

// Categories Section
const CategoriesSection = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${spacing[12]} ${spacing[8]};

  ${media.tablet} {
    padding: ${spacing[8]} ${spacing[6]};
  }

  ${media.mobile} {
    padding: ${spacing[6]} ${spacing[4]};
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${spacing[8]} 0;
  font-size: ${typography.fontSize["4xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  text-align: center;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: ${colors.gradients.primary};
    margin: ${spacing[4]} auto 0;
    border-radius: ${borderRadius.full};
  }

  ${media.mobile} {
    font-size: ${typography.fontSize["3xl"]};
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${spacing[6]};

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[4]};
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${spacing[4]};
  }
`;

const CategoryCard = styled(Link)`
  position: relative;
  height: 300px;
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  box-shadow: ${shadows.md};
  transition: all ${transitions.fast};
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background: linear-gradient(135deg, ${colors.neutral[100]} 0%, ${colors.neutral[200]} 100%);

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.xl};

    img {
      transform: scale(1.1);
    }

    .overlay {
      background: rgba(0, 0, 0, 0.4);
    }

    .content {
      transform: translateY(0);
    }
  }

  ${media.mobile} {
    height: 250px;
  }
`;

const CategoryImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${transitions.base};
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: background ${transitions.fast};
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: ${spacing[6]};
  z-index: 2;
`;

const CategoryContent = styled.div`
  color: var(--color-neutral-0, ${colors.neutral[0]});
  transform: translateY(20px);
  transition: transform ${transitions.fast};
  z-index: 3;
`;

const CategoryName = styled.h3`
  margin: 0 0 ${spacing[2]} 0;
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.bold};
  letter-spacing: -0.01em;

  ${media.mobile} {
    font-size: ${typography.fontSize.lg};
  }
`;

const CategoryDescription = styled.p`
  margin: 0;
  font-size: ${typography.fontSize.sm};
  opacity: 0.9;

  ${media.mobile} {
    font-size: ${typography.fontSize.xs};
  }
`;

// Featured Section
const FeaturedSection = styled.div`
  background: linear-gradient(135deg, ${colors.gradients.cool} 0%, rgba(79, 112, 245, 0.1) 100%);
  padding: ${spacing[12]} ${spacing[8]};
  text-align: center;
  margin: ${spacing[12]} 0;

  ${media.tablet} {
    padding: ${spacing[8]} ${spacing[6]};
  }

  ${media.mobile} {
    padding: ${spacing[6]} ${spacing[4]};
  }
`;

const FeaturedTitle = styled.h2`
  margin: 0 0 ${spacing[6]} 0;
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: var(--color-text-primary, ${colors.neutral[900]});

  ${media.mobile} {
    font-size: ${typography.fontSize["2xl"]};
  }
`;

const FeaturedDescription = styled.p`
  margin: 0 0 ${spacing[6]} 0;
  font-size: ${typography.fontSize.lg};
  color: var(--color-text-secondary, ${colors.neutral[600]});
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturedButton = styled(Button)`
  padding: ${spacing[3]} ${spacing[8]} !important;
  font-size: ${typography.fontSize.base} !important;
  font-weight: ${typography.fontWeight.bold} !important;
  border-radius: ${borderRadius.md} !important;
`;

const CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets & devices",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    slug: "electronics"
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Fashion & apparel",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&h=500&fit=crop",
    slug: "mens-shirts"
  },
  {
    id: "furniture",
    name: "Furniture",
    description: "Home & office furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
    slug: "furniture"
  },
  {
    id: "beauty",
    name: "Beauty & Skincare",
    description: "Personal care products",
    image: "https://images.unsplash.com/photo-1596462502278-af242a95b3b7?w=500&h=500&fit=crop",
    slug: "beauty"
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    description: "Active lifestyle gear",
    image: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=500&fit=crop",
    slug: "sports-accessories"
  },
  {
    id: "books",
    name: "Books & Media",
    description: "Knowledge & entertainment",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop",
    slug: "books"
  }
];

export const HomePage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    navigate(`/catalog?category=${slug}`);
  };

  return (
    <HomeContainer>
      {/* Hero Banner */}
      <HeroBanner>
        <HeroTitle>Welcome to Your Shop</HeroTitle>
        <HeroSubtitle>
          Discover an amazing collection of products across multiple categories. 
          Shop the latest trends and find exactly what you're looking for.
        </HeroSubtitle>
        <HeroButton appearance="primary" onClick={() => navigate("/catalog")}>
          Start Shopping
        </HeroButton>
      </HeroBanner>

      {/* Categories Section */}
      <CategoriesSection>
        <SectionTitle>Shop by Category</SectionTitle>
        <CategoriesGrid>
          {CATEGORIES.map(category => (
            <CategoryCard
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              to={`/catalog?category=${category.slug}`}
            >
              <CategoryImage src={category.image} alt={category.name} />
              <CategoryOverlay className="overlay">
                <CategoryContent className="content">
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryDescription>{category.description}</CategoryDescription>
                </CategoryContent>
              </CategoryOverlay>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesSection>

      {/* Featured Section */}
      <FeaturedSection>
        <FeaturedTitle>Explore All Products</FeaturedTitle>
        <FeaturedDescription>
          Can't find what you're looking for? Browse our complete catalog of products from all categories.
        </FeaturedDescription>
        <FeaturedButton 
          appearance="primary" 
          onClick={() => navigate("/catalog")}
        >
          View All Products
        </FeaturedButton>
      </FeaturedSection>
    </HomeContainer>
  );
};
