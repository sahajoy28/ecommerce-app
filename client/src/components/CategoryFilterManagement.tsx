import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { Save24Filled, Delete24Filled } from '@fluentui/react-icons';
import { userAPI } from '../services/userAPI';
import { productsApi } from '../services/apiClient';
import { colors, spacing, typography } from '../styles/designTokens';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing[6]};
`;

const Title = styled.h2`
  margin: 0 0 ${spacing[6]} 0;
  color: var(--color-text-primary, ${colors.neutral[900]});
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${spacing[6]};
  margin-bottom: ${spacing[8]};
`;

const CategoryCard = styled.div`
  border: 1px solid ${colors.neutral[200]};
  border-radius: 8px;
  padding: ${spacing[4]};
  background: ${colors.neutral[0]};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${colors.primary.main};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  margin-bottom: ${spacing[4]};
  font-size: ${typography.fontSize['lg']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral[900]};
`;

const FiltersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  margin-bottom: ${spacing[4]};
  max-height: 300px;
  overflow-y: auto;
  padding: ${spacing[2]};
  background: ${colors.neutral[50]};
  border-radius: 4px;
`;

const FilterItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]};
  background: ${(p) => p.$selected ? colors.primary.lighter : 'white'};
  border: 1px solid ${(p) => p.$selected ? colors.primary.main : colors.neutral[200]};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  input {
    cursor: pointer;
  }

  &:hover {
    background: ${(p) => p.$selected ? colors.primary.lighter : colors.neutral[50]};
    border-color: ${colors.primary.main};
  }

  label {
    cursor: pointer;
    margin: 0;
    flex: 1;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing[2]};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing[8]};
  color: ${colors.neutral[600]};
  font-size: ${typography.fontSize.sm};

  p {
    margin: 0;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(16, 185, 129, 0.1);
  color: ${colors.success};
  padding: ${spacing[3]};
  border-radius: 4px;
  margin-bottom: ${spacing[4]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: ${colors.error};
  padding: ${spacing[3]};
  border-radius: 4px;
  margin-bottom: ${spacing[4]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
`;

interface Category {
  _id: string;
  name: string;
  icon: string;
  appliedFilters?: string[];
}

interface FilterDef {
  _id: string;
  name: string;
  slug: string;
  icon: string;
}

export const CategoryFilterManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<FilterDef[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesRes, filtersRes] = await Promise.all([
          productsApi.get<any>('/categories?all=true'),
          productsApi.get<any>('/filters')
        ]);
        
        const cats = categoriesRes.categories || [];
        setCategories(cats);
        
        // Initialize selected filters for each category
        const selected: Record<string, string[]> = {};
        cats.forEach((cat: Category) => {
          selected[cat._id] = cat.appliedFilters || [];
        });
        setSelectedFilters(selected);
        
        setFilters(filtersRes.filters || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setMessage({ type: 'error', text: 'Failed to load categories and filters' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterToggle = (categoryId: string, filterId: string) => {
    setSelectedFilters((prev) => {
      const current = prev[categoryId] || [];
      if (current.includes(filterId)) {
        return {
          ...prev,
          [categoryId]: current.filter((id) => id !== filterId)
        };
      } else {
        return {
          ...prev,
          [categoryId]: [...current, filterId]
        };
      }
    });
  };

  const handleSave = async (categoryId: string, categoryName: string) => {
    try {
      await userAPI.updateCategoryFilters(categoryId, selectedFilters[categoryId] || []);
      setMessage({ 
        type: 'success', 
        text: `✅ Filters updated for ${categoryName}!` 
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ 
        type: 'error', 
        text: err.message || 'Failed to update filters' 
      });
    }
  };

  if (loading) {
    return (
      <Container>
        <Title>📂 Category Filters Management</Title>
        <div style={{ textAlign: 'center', padding: spacing[12] }}>
          <Spinner label="Loading categories..." />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Title>📂 Category Filters Management</Title>
      
      {message && (
        message.type === 'success' 
          ? <SuccessMessage>{message.text}</SuccessMessage>
          : <ErrorMessage>{message.text}</ErrorMessage>
      )}

      {categories.length === 0 ? (
        <EmptyState>
          <p>No categories found. Create some categories first!</p>
        </EmptyState>
      ) : (
        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryCard key={category._id}>
              <CategoryHeader>
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </CategoryHeader>

              <div style={{ marginBottom: spacing[3], fontSize: typography.fontSize.sm, color: colors.neutral[600] }}>
                Select filters to apply to this category:
              </div>

              <FiltersList>
                {filters.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: spacing[4], color: colors.neutral[500] }}>
                    No filters available
                  </div>
                ) : (
                  filters.map((filter) => (
                    <FilterItem
                      key={filter._id}
                      $selected={(selectedFilters[category._id] || []).includes(filter._id)}
                      onClick={() => handleFilterToggle(category._id, filter._id)}
                    >
                      <input
                        type="checkbox"
                        checked={(selectedFilters[category._id] || []).includes(filter._id)}
                        onChange={() => handleFilterToggle(category._id, filter._id)}
                        id={`filter-${category._id}-${filter._id}`}
                      />
                      <label htmlFor={`filter-${category._id}-${filter._id}`}>
                        <span>{filter.icon}</span>
                        <span>{filter.name}</span>
                      </label>
                    </FilterItem>
                  ))
                )}
              </FiltersList>

              <ActionButtons>
                <Button
                  appearance="primary"
                  icon={<Save24Filled />}
                  onClick={() => handleSave(category._id, category.name)}
                  style={{ flex: 1 }}
                >
                  Save Filters
                </Button>
              </ActionButtons>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      )}
    </Container>
  );
};
