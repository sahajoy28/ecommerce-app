import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from '../styles/designTokens';
import { ProductForm } from '../components/ProductForm';
import { ProductManagement } from '../components/ProductManagement';
import { BannerManagement } from '../components/BannerManagement';
import { AdminUsers } from '../components/AdminUsers';
import { SiteSettingsPanel, SettingsTabKey } from '../components/SiteSettingsPanel';
import { InventoryAnalytics } from '../components/InventoryAnalytics';
import { userAPI } from '../services/userAPI';

// ===================== NAV CONFIG =====================
type NavKey = 'products' | 'analytics' | 'banners' | 'users' | SettingsTabKey;

interface NavItem {
  key: NavKey;
  label: string;
  icon: string;
  description: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'inventory',
    label: 'Inventory',
    icon: '📦',
    items: [
      { key: 'products', label: 'Products', icon: '🏷️', description: 'Add, edit, and manage your product catalog' },
      { key: 'analytics', label: 'Analytics & Export', icon: '📊', description: 'Stock insights, charts, CSV import/export' },
    ]
  },
  {
    id: 'storefront',
    label: 'Storefront',
    icon: '🏪',
    items: [
      { key: 'general', label: 'Business Info', icon: '🏢', description: 'Store name, phone, email, and address shown across your site' },
      { key: 'appearance', label: 'Theme & Colors', icon: '🎨', description: 'Switch between light/dark mode and choose your brand accent color' },
      { key: 'hero', label: 'Hero Section', icon: '🖼️', description: 'Set the headline and subtitle on your homepage banner' },
      { key: 'banners', label: 'Banner Slides', icon: '🎯', description: 'Manage promotional image slides on the homepage carousel' },
      { key: 'categories', label: 'Categories', icon: '📂', description: 'Create product categories with images and icons for the homepage' },
    ]
  },
  {
    id: 'content',
    label: 'Content',
    icon: '📝',
    items: [
      { key: 'about', label: 'About Page', icon: '📖', description: 'Your company story, brands, showroom info for the About page' },
      { key: 'testimonials', label: 'Testimonials', icon: '💬', description: 'Customer reviews/quotes displayed on the homepage' },
      { key: 'stats', label: 'Key Numbers', icon: '🔢', description: 'Homepage statistics like products count, years in business, etc.' },
    ]
  },
  {
    id: 'configuration',
    label: 'Configuration',
    icon: '⚙️',
    items: [
      { key: 'filters', label: 'Catalog Filters', icon: '🔍', description: 'Enable, reorder, or rename the filters in your product catalog sidebar' },
      { key: 'inquiry', label: 'Inquiry Form', icon: '📋', description: 'Customize the inquiry form fields customers fill out for products' },
      { key: 'contact', label: 'Contact & Maps', icon: '📍', description: 'Google Maps embed, Gmail SMTP for email notifications' },
    ]
  },
  {
    id: 'system',
    label: 'System',
    icon: '🔐',
    items: [
      { key: 'users', label: 'User Management', icon: '👥', description: 'View registered users and promote accounts to admin' },
    ]
  },
];

const SETTINGS_KEYS: SettingsTabKey[] = [
  'general', 'appearance', 'hero', 'categories', 'filters',
  'stats', 'testimonials', 'about', 'contact', 'inquiry'
];

// Quick tips for the welcome card
const QUICK_TIPS = [
  { text: 'Add products in Inventory → Products, then publish them to make visible on your store.', icon: '📦' },
  { text: 'Import bulk products using CSV under Inventory → Analytics & Export.', icon: '📥' },
  { text: 'Change your store name and contact info in Storefront → Business Info.', icon: '🏢' },
  { text: 'Each section auto-saves when you click Save — no data is lost between tabs.', icon: '💾' },
];

// Section descriptions shown at the top of each tab
const SECTION_INFO: Record<NavKey, { title: string; tips: string[] }> = {
  products: {
    title: 'Manage your entire product catalog from here.',
    tips: [
      'Click "+ Add New Product" to create a product with images, pricing, and specifications.',
      'Use the checkboxes to bulk publish, unpublish, or delete multiple products at once.',
      'Products must be published to appear on your store\'s public catalog.',
      'Update stock quantities by editing individual products.',
    ]
  },
  analytics: {
    title: 'Inventory insights at a glance with export/import tools.',
    tips: [
      'Export your full product list as CSV for Excel — great for bookkeeping.',
      'Import products from a CSV file — download the template first to see the format.',
      'The stock alerts section highlights products that need restocking.',
      'Since there are no orders, manually update quantities after each sale.',
    ]
  },
  banners: {
    title: 'Control the image carousel on your homepage.',
    tips: [
      'Upload banner images with Google Drive links (right-click → Share → Copy link).',
      'Banners appear in the order listed — drag to reorder if supported.',
      'Use high-resolution landscape images (1920×600px recommended).',
    ]
  },
  general: {
    title: 'Core business details visible across your entire site.',
    tips: [
      'Business Name: appears in the site header, footer, and browser tab title.',
      'Phone/WhatsApp: shown in the contact section and inquiry form.',
      'Email/Address: used for the contact page and email notifications.',
    ]
  },
  appearance: {
    title: 'Customize the visual look and feel of your store.',
    tips: [
      'Light/Dark Mode: toggles the overall theme for all visitors.',
      'Accent Color: changes buttons, links, and highlights across the entire site.',
      'Preview changes in real-time before saving.',
    ]
  },
  hero: {
    title: 'The large banner section at the top of your homepage.',
    tips: [
      'Title: the main headline visitors see first (e.g., "Discover Premium Products").',
      'Subtitle: supporting text below the title (e.g., "Shop curated collections").',
    ]
  },
  categories: {
    title: 'Organize products into browsable categories.',
    tips: [
      'Categories appear on the homepage and in the catalog filter sidebar.',
      'Add an image or gradient background for each category card.',
      'Toggle "Show on Home" to control which categories appear on the homepage.',
    ]
  },
  filters: {
    title: 'Configure which filters appear in the catalog sidebar.',
    tips: [
      'Drag to reorder filters — top ones appear first in the sidebar.',
      'Rename labels to match your business terminology.',
      'Disable filters you don\'t need to keep the catalog clean.',
      'Custom filters can be created for unique product attributes.',
    ]
  },
  stats: {
    title: 'The statistics counter section on your homepage.',
    tips: [
      'These numbers are shown as animated counters (e.g., "500+ Products").',
      'Update these periodically to reflect your growing business.',
    ]
  },
  testimonials: {
    title: 'Customer quotes displayed on your homepage for social proof.',
    tips: [
      'Add real customer feedback with their name and quote.',
      'Short, specific testimonials work best (2-3 sentences).',
      'First 3-4 testimonials are shown on the homepage.',
    ]
  },
  about: {
    title: 'Content for your About page — tell your brand story.',
    tips: [
      'Company Story: a paragraph about your business history and values.',
      'Offerings: list your main product types or services.',
      'Brands: mention partner or supplier brands you carry.',
      '"Why Choose Us": key differentiators (e.g., free delivery, expert advice).',
    ]
  },
  contact: {
    title: 'Map location and email notification settings.',
    tips: [
      'Google Maps: paste an embed URL or enter latitude/longitude coordinates.',
      'Gmail SMTP: configure to receive email notifications when customers submit forms.',
      'Test the email configuration after saving to ensure it works.',
    ]
  },
  inquiry: {
    title: 'Customize the form customers fill out when inquiring about products.',
    tips: [
      'Add, remove, or reorder form fields (name, email, phone, message, etc.).',
      'Toggle WhatsApp/Call buttons to appear alongside the inquiry form.',
      'Enable the area calculator for product quantity calculations.',
    ]
  },
  users: {
    title: 'View all registered users and manage admin access.',
    tips: [
      'Promote trusted users to Admin to let them manage products and settings.',
      'Admin users can access this dashboard and all management features.',
    ]
  },
};

// ===================== ANIMATIONS =====================
const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ===================== STYLED COMPONENTS =====================
const Layout = styled.div`
  display: flex;
  min-height: calc(100vh - 72px);
  background: var(--color-bg-primary, ${colors.neutral[50]});
`;

const Sidebar = styled.aside<{ $collapsed: boolean }>`
  width: 272px;
  background: var(--color-neutral-0, white);
  border-right: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width ${transitions.base}, transform ${transitions.base};
  flex-shrink: 0;
  position: sticky;
  top: 72px;
  height: calc(100vh - 72px);

  scrollbar-width: thin;
  scrollbar-color: ${colors.neutral[300]} transparent;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: ${colors.neutral[300]}; border-radius: 4px; }

  @media (max-width: 1023px) {
    position: fixed;
    top: 72px;
    left: 0;
    bottom: 0;
    z-index: 200;
    width: 272px;
    transform: translateX(${props => props.$collapsed ? '-100%' : '0'});
    box-shadow: ${props => !props.$collapsed ? shadows.xl : 'none'};
  }

  ${media.mobile} {
    width: 85vw;
    max-width: 300px;
  }
`;

const SidebarToggle = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  left: 16px;
  z-index: 250;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-primary, ${colors.primary.main});
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  box-shadow: ${shadows.lg};
  align-items: center;
  justify-content: center;
  transition: all ${transitions.fast};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${shadows.xl};
  }

  @media (max-width: 1023px) {
    display: flex;
  }
`;

const SidebarOverlay = styled.div<{ $show: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  top: 72px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 199;

  @media (max-width: 1023px) {
    display: ${props => props.$show ? 'block' : 'none'};
  }
`;

const SidebarHeader = styled.div`
  padding: ${spacing[5]} ${spacing[4]};
  border-bottom: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  flex-shrink: 0;
`;

const SidebarBrand = styled.div`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.extrabold};
  color: var(--color-primary, ${colors.primary.main});
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NavGroupContainer = styled.div`
  padding: ${spacing[2]} 0;
`;

const NavGroupHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary, ${colors.neutral[500]});
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  transition: color ${transitions.fast};

  &:hover {
    color: var(--color-primary, ${colors.primary.main});
  }
`;

const NavGroupExpander = styled.span<{ $expanded: boolean }>`
  font-size: 10px;
  transition: transform ${transitions.fast};
  transform: rotate(${props => props.$expanded ? '90deg' : '0deg'});
  margin-left: auto;
`;

const NavGroupItems = styled.div<{ $expanded: boolean }>`
  display: ${props => props.$expanded ? 'block' : 'none'};
  animation: ${slideIn} 0.2s ease;
`;

const NavItemButton = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[2]} ${spacing[4]} ${spacing[2]} ${spacing[6]};
  background: ${props => props.$active ? `var(--color-primary, ${colors.primary.main})10` : 'transparent'};
  border: none;
  border-left: 3px solid ${props => props.$active ? `var(--color-primary, ${colors.primary.main})` : 'transparent'};
  cursor: pointer;
  transition: all ${transitions.fast};
  text-align: left;

  &:hover {
    background: ${props => props.$active ? `var(--color-primary, ${colors.primary.main})15` : 'var(--color-neutral-50, ' + colors.neutral[50] + ')'};
  }
`;

const NavItemIcon = styled.span`
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
`;

const NavItemLabel = styled.span<{ $active: boolean }>`
  font-size: ${typography.fontSize.sm};
  font-weight: ${props => props.$active ? typography.fontWeight.semibold : typography.fontWeight.medium};
  color: ${props => props.$active ? `var(--color-primary, ${colors.primary.main})` : `var(--color-text-primary, ${colors.neutral[700]})`};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MainContent = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const ContentScroll = styled.div`
  flex: 1;
  padding: ${spacing[6]} ${spacing[8]};
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  animation: ${fadeIn} 0.3s ease;
  box-sizing: border-box;

  @media (max-width: 1023px) {
    padding: ${spacing[5]} ${spacing[4]};
  }

  ${media.mobile} {
    padding: ${spacing[3]} ${spacing[3]};
  }
`;

// Welcome Card
const WelcomeCard = styled.div`
  background: linear-gradient(135deg, var(--color-primary, ${colors.primary.main}), var(--color-primary-dark, ${colors.primary.dark}));
  border-radius: ${borderRadius.xl};
  padding: ${spacing[6]} ${spacing[8]};
  color: white;
  margin-bottom: ${spacing[6]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: 10%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }

  ${media.mobile} {
    padding: ${spacing[5]} ${spacing[4]};
  }
`;

const WelcomeTitle = styled.h1`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.extrabold};
  margin: 0 0 ${spacing[2]} 0;
  position: relative;
  z-index: 1;

  ${media.mobile} {
    font-size: ${typography.fontSize['2xl']};
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: ${typography.fontSize.base};
  opacity: 0.9;
  margin: 0 0 ${spacing[4]} 0;
  max-width: 600px;
  line-height: 1.5;
  position: relative;
  z-index: 1;

  ${media.mobile} {
    font-size: ${typography.fontSize.sm};
  }
`;

const TipsToggle = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: ${spacing[2]} ${spacing[4]};
  border-radius: ${borderRadius.full};
  cursor: pointer;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  transition: all ${transitions.fast};
  position: relative;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${spacing[3]};
  margin-top: ${spacing[4]};
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.3s ease;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const TipCard = styled.div`
  background: rgba(255, 255, 255, 0.12);
  border-radius: ${borderRadius.lg};
  padding: ${spacing[3]} ${spacing[4]};
  font-size: ${typography.fontSize.sm};
  display: flex;
  align-items: flex-start;
  gap: ${spacing[2]};
  line-height: 1.4;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// Section Header with breadcrumb-style info
const SectionInfoCard = styled.div`
  background: var(--color-neutral-0, white);
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  border-radius: ${borderRadius.xl};
  padding: ${spacing[5]} ${spacing[6]};
  margin-bottom: ${spacing[5]};

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const SectionInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[3]};
`;

const SectionInfoIcon = styled.span`
  font-size: 28px;
`;

const SectionInfoTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionInfoName = styled.h2`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: var(--color-text-primary, ${colors.neutral[900]});
  margin: 0;
`;

const SectionInfoDesc = styled.p`
  font-size: ${typography.fontSize.sm};
  color: var(--color-text-secondary, ${colors.neutral[600]});
  margin: 0;
`;

const SectionTips = styled.div<{ $show: boolean }>`
  display: ${props => props.$show ? 'block' : 'none'};
  background: var(--color-neutral-50, ${colors.neutral[50]});
  border-radius: ${borderRadius.lg};
  padding: ${spacing[4]};
  animation: ${fadeIn} 0.2s ease;
`;

const TipsList = styled.ul`
  margin: 0;
  padding: 0 0 0 ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};

  li {
    font-size: ${typography.fontSize.sm};
    color: var(--color-text-secondary, ${colors.neutral[700]});
    line-height: 1.5;
    
    &::marker {
      color: var(--color-primary, ${colors.primary.main});
    }
  }
`;

const TipsToggleSmall = styled.button`
  background: none;
  border: none;
  color: var(--color-primary, ${colors.primary.main});
  cursor: pointer;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  padding: 0;
  margin-top: ${spacing[1]};

  &:hover {
    text-decoration: underline;
  }
`;

// Product content card
const ContentCard = styled.div`
  background: var(--color-neutral-0, white);
  border: 1px solid var(--color-neutral-200, ${colors.neutral[200]});
  border-radius: ${borderRadius.xl};
  padding: ${spacing[6]};
  overflow: hidden;

  ${media.mobile} {
    padding: ${spacing[4]};
    border-radius: ${borderRadius.lg};
  }
`;

// Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing[4]};
  box-sizing: border-box;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: ${borderRadius.xl};
  padding: ${spacing[8]};
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${shadows.xl};
  position: relative;
  animation: ${fadeIn} 0.2s ease;

  ${media.mobile} {
    padding: ${spacing[4]};
    max-width: 100%;
    max-height: 95vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing[6]};
  padding-bottom: ${spacing[4]};
  border-bottom: 1px solid ${colors.neutral[200]};
`;

const ModalTitle = styled.h2`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral[900]};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${colors.neutral[500]};
  padding: ${spacing[1]};
  line-height: 1;
  border-radius: ${borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.neutral[100]};
    color: ${colors.neutral[800]};
  }
`;

const AddProductButton = styled(Button)`
  margin-bottom: ${spacing[5]};
  padding: ${spacing[3]} ${spacing[6]};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};

  ${media.mobile} {
    width: 100%;
  }
`;

// ===================== COMPONENT =====================
interface AdminDashboardProps {
  onLogout?: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<NavKey>('products');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(NAV_GROUPS.map(g => g.id)));
  const [showTips, setShowTips] = useState(false);
  const [showSectionTips, setShowSectionTips] = useState(true);
  const [storeName, setStoreName] = useState('Admin');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  useEffect(() => {
    userAPI.getSiteSettings().then((data: any) => {
      if (data?.businessName) setStoreName(data.businessName);
    }).catch(() => {});
  }, []);

  // Collapse sidebar on tablet/mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1023) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const handleNavClick = (key: NavKey) => {
    setActiveTab(key);
    setShowSectionTips(true);
    // Close sidebar on tablet/mobile after clicking
    if (window.innerWidth <= 1023) {
      setSidebarCollapsed(true);
    }
  };

  const handleProductSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (editingProduct) {
        await userAPI.updateAdminProduct(editingProduct._id, data);
      } else {
        await userAPI.createAdminProduct(data);
      }
      setShowProductModal(false);
      setEditingProduct(null);
      setRefreshTrigger(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
  };

  // Find current nav item for section info
  const currentItem = NAV_GROUPS.flatMap(g => g.items).find(i => i.key === activeTab);
  const currentInfo = SECTION_INFO[activeTab];

  const renderContent = () => {
    if (activeTab === 'products') {
      return (
        <>
          <AddProductButton
            appearance="primary"
            onClick={() => { setEditingProduct(null); setShowProductModal(true); }}
          >
            ➕ Add New Product
          </AddProductButton>
          <ContentCard>
            <ProductManagement refreshTrigger={refreshTrigger} onEdit={handleEditProduct} />
          </ContentCard>
        </>
      );
    }

    if (activeTab === 'analytics') {
      return <InventoryAnalytics refreshTrigger={refreshTrigger} />;
    }

    if (activeTab === 'banners') {
      return (
        <ContentCard>
          <BannerManagement refreshTrigger={refreshTrigger} />
        </ContentCard>
      );
    }

    if (activeTab === 'users') {
      return (
        <ContentCard>
          <AdminUsers />
        </ContentCard>
      );
    }

    // Settings tabs
    if (SETTINGS_KEYS.includes(activeTab as SettingsTabKey)) {
      return (
        <ContentCard>
          <SiteSettingsPanel activeTab={activeTab as SettingsTabKey} />
        </ContentCard>
      );
    }

    return null;
  };

  return (
    <Layout>
      {/* Mobile sidebar overlay */}
      <SidebarOverlay $show={!sidebarCollapsed} onClick={() => setSidebarCollapsed(true)} />

      {/* Sidebar Navigation */}
      <Sidebar $collapsed={sidebarCollapsed}>
        <SidebarHeader>
          <SidebarBrand>⚡ Command Center</SidebarBrand>
        </SidebarHeader>

        {NAV_GROUPS.map(group => (
          <NavGroupContainer key={group.id}>
            <NavGroupHeader onClick={() => toggleGroup(group.id)}>
              <span>{group.icon}</span>
              <span>{group.label}</span>
              <NavGroupExpander $expanded={expandedGroups.has(group.id)}>▶</NavGroupExpander>
            </NavGroupHeader>
            <NavGroupItems $expanded={expandedGroups.has(group.id)}>
              {group.items.map(item => (
                <NavItemButton
                  key={item.key}
                  $active={activeTab === item.key}
                  onClick={() => handleNavClick(item.key)}
                  title={item.description}
                >
                  <NavItemIcon>{item.icon}</NavItemIcon>
                  <NavItemLabel $active={activeTab === item.key}>{item.label}</NavItemLabel>
                </NavItemButton>
              ))}
            </NavGroupItems>
          </NavGroupContainer>
        ))}
      </Sidebar>

      {/* Mobile sidebar toggle */}
      <SidebarToggle onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        {sidebarCollapsed ? '☰' : '✕'}
      </SidebarToggle>

      {/* Main Content */}
      <MainContent>
        <ContentScroll key={activeTab}>
          {/* Welcome Card */}
          {activeTab === 'products' && (
            <WelcomeCard>
              <WelcomeTitle>Welcome back, {storeName} 👋</WelcomeTitle>
              <WelcomeSubtitle>
                This is your store command center. Use the sidebar to navigate between sections.
                Every change you make here updates your live store in real-time.
              </WelcomeSubtitle>
              <TipsToggle onClick={() => setShowTips(!showTips)}>
                {showTips ? '✕ Hide Tips' : '💡 Quick Start Tips'}
              </TipsToggle>
              {showTips && (
                <TipsGrid>
                  {QUICK_TIPS.map((tip, i) => (
                    <TipCard key={i}>
                      <span>{tip.icon}</span>
                      <span>{tip.text}</span>
                    </TipCard>
                  ))}
                </TipsGrid>
              )}
            </WelcomeCard>
          )}

          {/* Section Info */}
          {currentItem && currentInfo && (
            <SectionInfoCard>
              <SectionInfoHeader>
                <SectionInfoIcon>{currentItem.icon}</SectionInfoIcon>
                <SectionInfoTitle>
                  <SectionInfoName>{currentItem.label}</SectionInfoName>
                  <SectionInfoDesc>{currentInfo.title}</SectionInfoDesc>
                </SectionInfoTitle>
              </SectionInfoHeader>
              <TipsToggleSmall onClick={() => setShowSectionTips(!showSectionTips)}>
                {showSectionTips ? '▾ Hide guide' : '▸ Show guide'}
              </TipsToggleSmall>
              <SectionTips $show={showSectionTips}>
                <TipsList>
                  {currentInfo.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </TipsList>
              </SectionTips>
            </SectionInfoCard>
          )}

          {/* Tab Content */}
          {renderContent()}
        </ContentScroll>
      </MainContent>

      {/* Product Form Modal */}
      {showProductModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}</ModalTitle>
              <CloseButton onClick={handleCloseModal}>✕</CloseButton>
            </ModalHeader>
            <ProductForm
              key={editingProduct?._id || 'new'}
              onSubmit={handleProductSubmit}
              initialData={editingProduct}
              isLoading={isLoading}
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </Layout>
  );
};
