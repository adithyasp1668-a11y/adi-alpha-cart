import { BusinessType, Category } from '@alpha-cart/shared-types';

export const BRAND_CONFIG = {
  name: 'Alpha Cart',
  tagline: 'Your Everyday Delivery Partner',
  currencySymbol: '₹',
  contactEmail: 'support@alphacart.in',
  contactPhone: '+91 80000 12345',
  supportedCities: ['Bengaluru Urban', 'Shivamogga', 'Mysuru', 'Hubballi'],
  defaultCity: 'Bengaluru, Karnataka',
};

export const COLORS = {
  primary: '#FF6B00',
  primaryHover: '#E65100',
  primaryLight: '#FFF3E0',
  primaryGradientStart: '#FF7A00',
  primaryGradientEnd: '#FF5400',
  
  // Status Colors
  success: '#10B981',
  successLight: '#E8F5E9',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Category Pastel Accent Backgrounds (as seen in screenshots)
  grocery: {
    accent: '#10B981',
    lightBg: '#E8F5E9',
    tagText: '#15803D',
  },
  food: {
    accent: '#FF6B00',
    lightBg: '#FFF3E0',
    tagText: '#C2410C',
  },
  fitness: {
    accent: '#8B5CF6',
    lightBg: '#F3E8FF',
    tagText: '#6D28D9',
  },
  disposable: {
    accent: '#06B6D4',
    lightBg: '#E0F2FE',
    tagText: '#0369A1',
  },

  // Neutrals
  white: '#FFFFFF',
  background: '#F8FAFC',
  cardBg: '#FFFFFF',
  border: '#E2E8F0',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
};

export const CATEGORIES_DATA: Category[] = [
  {
    id: 'cat-grocery',
    name: 'Grocery',
    slug: 'grocery',
    tagline: 'Daily Essentials',
    description: 'Fruits, vegetables & daily needs',
    businessType: 'grocery',
    icon: 'shopping-basket',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    accentColor: COLORS.grocery.accent,
    lightBgColor: COLORS.grocery.lightBg,
    itemCount: 420,
  },
  {
    id: 'cat-food',
    name: 'Food',
    slug: 'food',
    tagline: 'Veg & Non-Veg',
    description: 'Order from nearby restaurants',
    businessType: 'food',
    icon: 'utensils',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    accentColor: COLORS.food.accent,
    lightBgColor: COLORS.food.lightBg,
    itemCount: 650,
  },
  {
    id: 'cat-fitness',
    name: 'Gym & Fitness',
    slug: 'fitness',
    tagline: 'Supplements & Gear',
    description: 'Supplements, gear & apparel',
    businessType: 'fitness',
    icon: 'dumbbell',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    accentColor: COLORS.fitness.accent,
    lightBgColor: COLORS.fitness.lightBg,
    itemCount: 180,
  },
  {
    id: 'cat-disposable',
    name: 'Use & Throw',
    slug: 'disposable',
    tagline: 'Disposable & Event Items',
    description: 'Plates, cups, tissues & more',
    businessType: 'disposable',
    icon: 'layers',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
    accentColor: COLORS.disposable.accent,
    lightBgColor: COLORS.disposable.lightBg,
    itemCount: 95,
  },
];

export const formatCurrency = (amount: number): string => {
  return `${BRAND_CONFIG.currencySymbol}${amount.toLocaleString('en-IN')}`;
};
