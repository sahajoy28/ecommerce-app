import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from '../styles/designTokens';
import { userAPI } from '../services/userAPI';

// ==================== TYPES ====================
interface ProductData {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  mrp: number | null;
  quantity: number;
  material: string;
  finish: string;
  sizes: string[];
  color: string;
  isActive: boolean;
  published: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface InventoryAnalyticsProps {
  refreshTrigger?: number;
}

// ==================== STYLED COMPONENTS ====================
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${spacing[4]};

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[3]};
  }

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div<{ $color: string; $bg: string }>`
  background: ${props => props.$bg};
  border-radius: ${borderRadius.xl};
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
  position: relative;
  overflow: hidden;
  border: 1px solid ${props => props.$color}20;
  transition: all ${transitions.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background: ${props => props.$color}15;
    border-radius: 0 0 0 100%;
  }

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const StatIcon = styled.span`
  font-size: 24px;
  line-height: 1;
`;

const StatValue = styled.div`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.extrabold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  line-height: 1;

  ${media.mobile} {
    font-size: ${typography.fontSize['2xl']};
  }
`;

const StatLabel = styled.div`
  font-size: ${typography.fontSize.xs};
  color: var(--color-text-secondary, ${colors.neutral[600]});
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${typography.fontWeight.semibold};
`;

const Section = styled.div`
  background: var(--color-neutral-0, white);
  border-radius: ${borderRadius.xl};
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: ${spacing[5]} ${spacing[6]};
  border-bottom: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${spacing[3]};

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const SectionTitle = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;

const SectionBody = styled.div`
  padding: ${spacing[6]};

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[6]};

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

// Bar Chart Styles
const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

const BarRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

const BarLabel = styled.div`
  width: 100px;
  font-size: ${typography.fontSize.sm};
  color: var(--color-text-secondary, ${colors.neutral[700]});
  text-align: right;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.mobile} {
    width: 70px;
    font-size: ${typography.fontSize.xs};
  }
`;

const BarTrack = styled.div`
  flex: 1;
  height: 28px;
  background: var(--color-neutral-100, ${colors.neutral[100]});
  border-radius: ${borderRadius.full};
  overflow: hidden;
  position: relative;
`;

const BarFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${props => props.$width}%;
  background: linear-gradient(90deg, ${props => props.$color}, ${props => props.$color}cc);
  border-radius: ${borderRadius.full};
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: ${spacing[2]};
  min-width: ${props => props.$width > 0 ? '32px' : '0'};
`;

const BarValue = styled.span`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.bold};
  color: white;
  white-space: nowrap;
`;

// Donut Chart Styles
const DonutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[4]};
`;

const DonutChart = styled.div<{ $segments: string }>`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: conic-gradient(${props => props.$segments});
  position: relative;
  transition: transform ${transitions.base};

  &:hover {
    transform: scale(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    top: 30%;
    left: 30%;
    width: 40%;
    height: 40%;
    background: var(--color-neutral-0, white);
    border-radius: 50%;
  }

  ${media.mobile} {
    width: 150px;
    height: 150px;
  }
`;

const DonutLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[3]};
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  font-size: ${typography.fontSize.sm};
  color: var(--color-text-secondary, ${colors.neutral[700]});
`;

const LegendDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
  flex-shrink: 0;
`;

// Stock Alerts
const AlertsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  max-height: 300px;
  overflow-y: auto;
`;

const AlertRow = styled.div<{ $severity: 'critical' | 'warning' | 'info' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[3]} ${spacing[4]};
  border-radius: ${borderRadius.lg};
  background: ${props =>
    props.$severity === 'critical' ? '#fef2f2' :
    props.$severity === 'warning' ? '#fffbeb' :
    '#f0fdf4'
  };
  border-left: 3px solid ${props =>
    props.$severity === 'critical' ? '#ef4444' :
    props.$severity === 'warning' ? '#f59e0b' :
    '#22c55e'
  };
  font-size: ${typography.fontSize.sm};
  gap: ${spacing[2]};
  flex-wrap: wrap;

  ${media.mobile} {
    padding: ${spacing[2]} ${spacing[3]};
    font-size: ${typography.fontSize.xs};
  }
`;

const AlertTitle = styled.span`
  font-weight: ${typography.fontWeight.semibold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  min-width: 0;
  word-break: break-word;
`;

const AlertBadge = styled.span<{ $severity: 'critical' | 'warning' | 'info' }>`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.bold};
  padding: 2px 8px;
  border-radius: ${borderRadius.full};
  background: ${props =>
    props.$severity === 'critical' ? '#ef4444' :
    props.$severity === 'warning' ? '#f59e0b' :
    '#22c55e'
  };
  color: white;
`;

// Import/Export Styles
const ActionBar = styled.div`
  display: flex;
  gap: ${spacing[3]};
  flex-wrap: wrap;
  align-items: center;

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImportPreview = styled.div`
  background: var(--color-neutral-50, ${colors.neutral[50]});
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  border-radius: ${borderRadius.lg};
  padding: ${spacing[4]};
  margin-top: ${spacing[4]};
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing[3]};
  gap: ${spacing[3]};
  flex-wrap: wrap;

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PreviewTable = styled.div`
  overflow-x: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: ${typography.fontSize.xs};
    
    th {
      background: var(--color-neutral-100, ${colors.neutral[100]});
      padding: ${spacing[2]} ${spacing[3]};
      text-align: left;
      font-weight: ${typography.fontWeight.semibold};
      border-bottom: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
      white-space: nowrap;
    }
    
    td {
      padding: ${spacing[2]} ${spacing[3]};
      border-bottom: 1px solid var(--color-neutral-100, ${colors.neutral[100]});
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const StatusBadge = styled.span<{ $type: 'success' | 'warning' | 'error' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  background: ${props =>
    props.$type === 'success' ? '#dcfce7' :
    props.$type === 'warning' ? '#fef3c7' : '#fee2e2'
  };
  color: ${props =>
    props.$type === 'success' ? '#166534' :
    props.$type === 'warning' ? '#92400e' : '#991b1b'
  };
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing[8]};
  color: var(--color-text-secondary, ${colors.neutral[500]});
  
  p {
    margin: ${spacing[2]} 0;
    font-size: ${typography.fontSize.sm};
  }
`;

const SuccessMsg = styled.div`
  padding: ${spacing[3]} ${spacing[4]};
  background: #dcfce7;
  color: #166534;
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;

const ErrorMsg = styled.div`
  padding: ${spacing[3]} ${spacing[4]};
  background: #fee2e2;
  color: #991b1b;
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
`;

// ==================== CHART COLORS ====================
const CHART_COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
  '#06b6d4', '#f97316', '#84cc16', '#6366f1', '#14b8a6',
  '#e11d48', '#a855f7',
];

// ==================== HELPER FUNCTIONS ====================
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

// ==================== COMPONENT ====================
export const InventoryAnalytics = ({ refreshTrigger }: InventoryAnalyticsProps) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [importData, setImportData] = useState<any[] | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importMessage, setImportMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProducts();
  }, [refreshTrigger]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await userAPI.getAdminProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  // ==================== COMPUTED ANALYTICS ====================
  const totalProducts = products.length;
  const publishedCount = products.filter(p => p.published).length;
  const draftCount = products.filter(p => !p.published).length;
  const activeCount = products.filter(p => p.isActive).length;
  const outOfStock = products.filter(p => p.quantity === 0).length;
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= 10).length;

  // Category distribution
  const categoryMap: Record<string, number> = {};
  products.forEach(p => {
    const cat = p.category || 'Uncategorized';
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });
  const sortedCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1]);
  const maxCategoryCount = Math.max(...sortedCategories.map(c => c[1]), 1);

  // Material distribution
  const materialMap: Record<string, number> = {};
  products.forEach(p => {
    const mat = p.material || 'Other';
    materialMap[mat] = (materialMap[mat] || 0) + 1;
  });

  // Stock distribution for donut
  const stockSegments = [
    { label: 'Healthy (>50)', count: products.filter(p => p.quantity > 50).length, color: '#22c55e' },
    { label: 'Medium (11-50)', count: products.filter(p => p.quantity >= 11 && p.quantity <= 50).length, color: '#f59e0b' },
    { label: 'Low (1-10)', count: lowStock, color: '#f97316' },
    { label: 'Out of Stock', count: outOfStock, color: '#ef4444' },
  ].filter(s => s.count > 0);

  const totalForDonut = stockSegments.reduce((sum, s) => sum + s.count, 0) || 1;
  let donutAngle = 0;
  const donutGradient = stockSegments.map(s => {
    const start = donutAngle;
    donutAngle += (s.count / totalForDonut) * 360;
    return `${s.color} ${start}deg ${donutAngle}deg`;
  }).join(', ') || '#e5e7eb 0deg 360deg';

  // Stock alerts (products that need attention)
  const criticalStock = products.filter(p => p.quantity === 0 && p.isActive).slice(0, 10);
  const warningStock = products.filter(p => p.quantity > 0 && p.quantity <= 10).slice(0, 10);

  // ==================== CSV EXPORT ====================
  const handleExportCSV = () => {
    const headers = ['Title', 'Description', 'Category', 'Price', 'MRP', 'Quantity', 'Material', 'Finish', 'Sizes', 'Color', 'Active', 'Published'];
    const rows = products.map(p => [
      `"${(p.title || '').replace(/"/g, '""')}"`,
      `"${(p.description || '').replace(/"/g, '""')}"`,
      `"${p.category || ''}"`,
      p.price || 0,
      p.mrp || '',
      p.quantity || 0,
      p.material || '',
      p.finish || '',
      `"${(p.sizes || []).join(', ')}"`,
      `"${p.color || ''}"`,
      p.isActive ? 'Yes' : 'No',
      p.published ? 'Yes' : 'No',
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadTemplate = () => {
    const headers = 'Title,Description,Category,Price,MRP,Quantity,Material,Finish,Sizes,Color';
    const example = '"Sample Tile","A beautiful tile for your home","Tiles",1500,2000,100,"Tiles","Glossy","2x2, 4x2","White"';
    const csv = headers + '\n' + example;
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'import_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ==================== CSV IMPORT ====================
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportMessage(null);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length < 2) {
          setImportMessage({ type: 'error', text: 'CSV file must have a header row and at least one data row.' });
          return;
        }

        const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z]/g, ''));
        const parsed: any[] = [];

        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i]);
          if (values.length < 3) continue;

          const getVal = (key: string) => {
            const idx = headers.indexOf(key);
            return idx >= 0 ? values[idx] : '';
          };

          parsed.push({
            title: getVal('title'),
            description: getVal('description'),
            category: getVal('category') || 'Uncategorized',
            price: parseFloat(getVal('price')) || 0,
            mrp: parseFloat(getVal('mrp')) || null,
            quantity: parseInt(getVal('quantity')) || 0,
            material: getVal('material') || 'Tiles',
            finish: getVal('finish') || 'Glossy',
            sizes: getVal('sizes') ? getVal('sizes').split(',').map((s: string) => s.trim()).filter(Boolean) : [],
            color: getVal('color') || '',
          });
        }

        if (parsed.length === 0) {
          setImportMessage({ type: 'error', text: 'No valid product rows found in the CSV file.' });
          return;
        }

        setImportData(parsed);
      } catch (err) {
        setImportMessage({ type: 'error', text: 'Failed to parse CSV file. Please check the format.' });
      }
    };
    reader.readAsText(file);

    // Reset file input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleConfirmImport = async () => {
    if (!importData || importData.length === 0) return;

    setImportLoading(true);
    setImportMessage(null);

    try {
      const result = await userAPI.bulkImportProducts(importData);
      setImportMessage({
        type: 'success',
        text: `Successfully imported ${result.created || importData.length} products!`
      });
      setImportData(null);
      loadProducts();
    } catch (err: any) {
      setImportMessage({
        type: 'error',
        text: err?.message || 'Failed to import products. Please check data and try again.'
      });
    } finally {
      setImportLoading(false);
    }
  };

  // ==================== RENDER ====================
  if (loading) {
    return (
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', padding: spacing[8] }}>
          <Spinner size="large" label="Loading inventory data..." />
        </div>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container>
        <EmptyState>
          <div style={{ fontSize: '48px', marginBottom: spacing[3] }}>📦</div>
          <h3>No Products Yet</h3>
          <p>Start by adding products, or import them from a CSV file.</p>
          <ActionBar style={{ justifyContent: 'center', marginTop: spacing[4] }}>
            <Button appearance="primary" onClick={handleDownloadTemplate}>
              📄 Download CSV Template
            </Button>
            <Button appearance="outline" onClick={() => fileInputRef.current?.click()}>
              📥 Import CSV
            </Button>
          </ActionBar>
          <HiddenInput ref={fileInputRef} type="file" accept=".csv,.txt" onChange={handleFileSelect} />
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      {/* Summary Cards */}
      <SummaryGrid>
        <StatCard $color="#3b82f6" $bg="#eff6ff">
          <StatIcon>📦</StatIcon>
          <StatValue>{totalProducts}</StatValue>
          <StatLabel>Total Products</StatLabel>
        </StatCard>
        <StatCard $color="#22c55e" $bg="#f0fdf4">
          <StatIcon>🟢</StatIcon>
          <StatValue>{publishedCount}</StatValue>
          <StatLabel>Published</StatLabel>
        </StatCard>
        <StatCard $color="#f59e0b" $bg="#fffbeb">
          <StatIcon>📝</StatIcon>
          <StatValue>{draftCount}</StatValue>
          <StatLabel>Drafts</StatLabel>
        </StatCard>
        <StatCard $color="#ef4444" $bg="#fef2f2">
          <StatIcon>🚫</StatIcon>
          <StatValue>{outOfStock}</StatValue>
          <StatLabel>Out of Stock</StatLabel>
        </StatCard>
        <StatCard $color="#f97316" $bg="#fff7ed">
          <StatIcon>⚠️</StatIcon>
          <StatValue>{lowStock}</StatValue>
          <StatLabel>Low Stock</StatLabel>
        </StatCard>
        <StatCard $color="#8b5cf6" $bg="#f5f3ff">
          <StatIcon>✅</StatIcon>
          <StatValue>{activeCount}</StatValue>
          <StatLabel>Active</StatLabel>
        </StatCard>
      </SummaryGrid>

      {/* Charts */}
      <ChartsRow>
        {/* Category Distribution */}
        <Section>
          <SectionHeader>
            <SectionTitle>📂 Products by Category</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <BarChartContainer>
              {sortedCategories.map(([cat, count], i) => (
                <BarRow key={cat}>
                  <BarLabel title={cat}>{cat}</BarLabel>
                  <BarTrack>
                    <BarFill $width={(count / maxCategoryCount) * 100} $color={CHART_COLORS[i % CHART_COLORS.length]}>
                      <BarValue>{count}</BarValue>
                    </BarFill>
                  </BarTrack>
                </BarRow>
              ))}
              {sortedCategories.length === 0 && (
                <EmptyState><p>No categories yet</p></EmptyState>
              )}
            </BarChartContainer>
          </SectionBody>
        </Section>

        {/* Stock Distribution Donut */}
        <Section>
          <SectionHeader>
            <SectionTitle>📊 Stock Distribution</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <DonutContainer>
              <DonutChart $segments={donutGradient} />
              <DonutLegend>
                {stockSegments.map(s => (
                  <LegendItem key={s.label}>
                    <LegendDot $color={s.color} />
                    {s.label}: {s.count}
                  </LegendItem>
                ))}
              </DonutLegend>
            </DonutContainer>
          </SectionBody>
        </Section>
      </ChartsRow>

      {/* Material Distribution */}
      {Object.keys(materialMap).length > 1 && (
        <Section>
          <SectionHeader>
            <SectionTitle>🧱 Products by Material</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <BarChartContainer>
              {Object.entries(materialMap)
                .sort((a, b) => b[1] - a[1])
                .map(([mat, count], i) => (
                  <BarRow key={mat}>
                    <BarLabel title={mat}>{mat}</BarLabel>
                    <BarTrack>
                      <BarFill
                        $width={(count / Math.max(...Object.values(materialMap))) * 100}
                        $color={CHART_COLORS[(i + 4) % CHART_COLORS.length]}
                      >
                        <BarValue>{count}</BarValue>
                      </BarFill>
                    </BarTrack>
                  </BarRow>
                ))}
            </BarChartContainer>
          </SectionBody>
        </Section>
      )}

      {/* Stock Alerts */}
      {(criticalStock.length > 0 || warningStock.length > 0) && (
        <Section>
          <SectionHeader>
            <SectionTitle>🔔 Stock Alerts</SectionTitle>
            <StatusBadge $type={criticalStock.length > 0 ? 'error' : 'warning'}>
              {criticalStock.length + warningStock.length} items need attention
            </StatusBadge>
          </SectionHeader>
          <SectionBody>
            <AlertsContainer>
              {criticalStock.map(p => (
                <AlertRow key={p._id} $severity="critical">
                  <AlertTitle>{p.title}</AlertTitle>
                  <AlertBadge $severity="critical">Out of Stock</AlertBadge>
                </AlertRow>
              ))}
              {warningStock.map(p => (
                <AlertRow key={p._id} $severity="warning">
                  <AlertTitle>{p.title} — {p.quantity} left</AlertTitle>
                  <AlertBadge $severity="warning">Low Stock</AlertBadge>
                </AlertRow>
              ))}
            </AlertsContainer>
          </SectionBody>
        </Section>
      )}

      {/* Import / Export */}
      <Section>
        <SectionHeader>
          <SectionTitle>📤 Import & Export</SectionTitle>
        </SectionHeader>
        <SectionBody>
          <ActionBar>
            <Button appearance="primary" onClick={handleExportCSV}>
              📥 Export All Products (CSV)
            </Button>
            <Button appearance="outline" onClick={() => fileInputRef.current?.click()}>
              📤 Import from CSV
            </Button>
            <Button appearance="subtle" onClick={handleDownloadTemplate}>
              📄 Download Template
            </Button>
          </ActionBar>
          <HiddenInput ref={fileInputRef} type="file" accept=".csv,.txt" onChange={handleFileSelect} />

          {importMessage && (
            <div style={{ marginTop: spacing[4] }}>
              {importMessage.type === 'success' ? (
                <SuccessMsg>✅ {importMessage.text}</SuccessMsg>
              ) : (
                <ErrorMsg>❌ {importMessage.text}</ErrorMsg>
              )}
            </div>
          )}

          {importData && (
            <ImportPreview>
              <PreviewHeader>
                <div>
                  <strong>Preview:</strong> {importData.length} products ready to import
                </div>
                <div style={{ display: 'flex', gap: spacing[2] }}>
                  <Button appearance="primary" size="small" onClick={handleConfirmImport} disabled={importLoading}>
                    {importLoading ? <Spinner size="tiny" /> : '✅ Confirm Import'}
                  </Button>
                  <Button appearance="subtle" size="small" onClick={() => setImportData(null)}>
                    Cancel
                  </Button>
                </div>
              </PreviewHeader>
              <PreviewTable>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Material</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importData.slice(0, 10).map((row, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{row.title}</td>
                        <td>{row.category}</td>
                        <td>₹{row.price}</td>
                        <td>{row.quantity}</td>
                        <td>{row.material}</td>
                      </tr>
                    ))}
                    {importData.length > 10 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', color: colors.neutral[500] }}>
                          ...and {importData.length - 10} more products
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </PreviewTable>
            </ImportPreview>
          )}
        </SectionBody>
      </Section>
    </Container>
  );
};
