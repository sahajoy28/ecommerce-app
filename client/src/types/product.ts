export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}

export interface Product {
  id: string | number;  // MongoDB IDs are strings, legacy IDs might be numbers
  _id?: string; // MongoDB ID
  title: string;
  price: number;
  mrp?: number;
  retailPrice?: number;
  discount?: {
    discountType?: 'percentage' | 'fixed';
    discountValue?: number;
  };
  showPriceInListing?: boolean;
  description: string;
  category: string;
  image: string;
  images?: string[];
  videos?: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  stock?: number;
  quantity?: number;
  isAdminProduct?: boolean;
  createdBy?: string;
  // Product attribute fields
  material?: string;
  finish?: string;
  sizes?: string[];
  color?: string;
  specifications?: {
    [key: string]: string | undefined;
  };
  customFilters?: Record<string, any>;
}

export interface CustomFilter {
  _id: string;
  name: string;
  slug: string;
  type: 'checkbox' | 'select' | 'range';
  options: { label: string; value: string }[];
  rangeMin?: number;
  rangeMax?: number;
  rangeUnit?: string;
  icon?: string;
  displayOrder: number;
  isActive: boolean;
  showInSidebar: boolean;
}