import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { productsApi } from '../services/apiClient';
import { colors, spacing, typography, borderRadius, shadows, transitions, media } from '../styles/designTokens';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryContainer = styled.div`
  width: 100%;
  background: var(--color-neutral-0, ${colors.neutral[0]});
  border-bottom: 2px solid var(--color-neutral-200, ${colors.neutral[200]});
  padding: ${spacing[5]} ${spacing[8]};
  box-shadow: ${shadows.sm};

  ${media.tablet} {
    padding: ${spacing[4]} ${spacing[6]};
  }

  ${media.mobile} {
    padding: ${spacing[3]} ${spacing[4]};
  }
`;

const CategoryLabel = styled.h3`
  margin: 0 0 ${spacing[3]} 0;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.bold};
  color: var(--color-text-secondary, ${colors.neutral[700]});
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
`;

const CategoriesWrapper = styled.div`
  display: flex;
  gap: ${spacing[3]};
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  padding: ${spacing[2]} 0;
  scrollbar-width: thin;
  scrollbar-color: ${colors.neutral[300]} transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.neutral[300]};
    border-radius: 3px;

    &:hover {
      background: ${colors.neutral[400]};
    }
  }

  ${media.mobile} {
    gap: ${spacing[2]};
    padding: ${spacing[1]} 0;
  }
`;

const CategoryChip = styled.button<{ $active?: boolean; $gradient?: string }>`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  border: 2px solid ${(p) => p.$active ? colors.primary.main : colors.neutral[200]};
  border-radius: ${borderRadius.full};
  background: ${(p) => 
    p.$active 
      ? colors.primary.lighter
      : p.$gradient || colors.neutral[50]
  };
  color: ${(p) => p.$active ? colors.primary.main : colors.neutral[700]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  white-space: nowrap;
  transition: all ${transitions.fast};
  box-shadow: ${(p) => p.$active ? shadows.md : 'none'};

  &:hover {
    border-color: ${colors.primary.main};
    background: ${(p) => p.$active ? colors.primary.lighter : colors.neutral[100]};
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  ${media.mobile} {
    padding: ${spacing[2]} ${spacing[3]};
    font-size: ${typography.fontSize.xs};
  }
`;

const AllCategoriesChip = styled(CategoryChip)`
  background: linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main});
  color: white;
  border: 2px solid transparent;

  &:hover {
    background: linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main});
    opacity: 0.9;
    box-shadow: ${shadows.lg};
  }
`;

interface Category {
  _id: string;
  name: string;
  icon: string;
  gradient?: string;
  slug: string;
}

export const CategorySelector = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    setLoading(true);
    productsApi
      .get<{ success: boolean; categories: Category[] }>('/categories')
      .then((res) => {
        setCategories(res.categories || []);
      })
      .catch((err) => {
        console.error('Failed to fetch categories:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      // If clicking the same category, clear filter
      navigate('/catalog');
    } else {
      // Navigate to catalog with category filter
      navigate(`/catalog?category=${encodeURIComponent(categoryName)}`);
    }
  };

  const handleClearAll = () => {
    navigate('/catalog');
  };

  return (
    <CategoryContainer>
      <CategoryLabel>
        🛍️ Browse by Category
      </CategoryLabel>
      <CategoriesWrapper>
        <AllCategoriesChip
          onClick={handleClearAll}
          $active={!selectedCategory}
        >
          All Products
        </AllCategoriesChip>

        {categories.map((cat) => (
          <CategoryChip
            key={cat._id}
            onClick={() => handleCategoryClick(cat.name)}
            $active={selectedCategory === cat.name}
            $gradient={cat.gradient}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </CategoryChip>
        ))}
      </CategoriesWrapper>
    </CategoryContainer>
  );
};
