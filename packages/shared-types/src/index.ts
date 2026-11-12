export type BusinessType = 'grocery' | 'food' | 'fitness' | 'disposable';

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  businessType: BusinessType;
  icon: string;
  image: string;
  accentColor: string;
  lightBgColor: string;
  itemCount?: number;
}

export interface NutritionInfo {
  protein?: string;
  bcaas?: string;
  servings?: string;
  calories?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  businessType: BusinessType;
  categoryId: string;
  categoryName: string;
  subCategory?: string;
  shopId: string;
  shopName: string;
  image: string;
  galleryImages?: string[];
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  stockCount: number;
  unit: string;
  isVeg?: boolean;
  nutritionInfo?: NutritionInfo;
  badge?: string;
  tags?: string[];
}

export interface Shop {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  businessType: BusinessType;
  businessTypeLabel: string;
  rating: number;
  reviewCount: number;
  deliveryTimeEstimate: string;
  distanceKm: number;
  isOpen: boolean;
  openingTime: string;
  closingTime: string;
  breakTimeEnabled?: boolean;
  breakTime?: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  image: string;
  logo: string;
  isVerified: boolean;
  commissionRatePercent: number;
  cuisineOrSpec?: string;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  vehicleType: string;
  vehicleNumber: string;
  isOnline: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  todayEarnings: number;
  todayOrders: number;
  todayDistanceKm: number;
  totalBalance: number;
  joinedDate: string;
  location?: {
    lat: number;
    lng: number;
    currentAddress: string;
  };
}

export type OrderStatus =
  | 'new'
  | 'order_confirmed'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unit?: string;
  image?: string;
  isVeg?: boolean;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  title: string;
  time: string;
  isCompleted: boolean;
  description?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. #AC784326
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerLocality: string;
  customerCity: string;
  shopId: string;
  shopName: string;
  shopAddress: string;
  shopPhone: string;
  businessType: BusinessType;
  items: OrderItem[];
  itemTotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'upi' | 'card' | 'cod' | 'wallet';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  deliveryOtp: string; // e.g. "4839"
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryPartnerPhone?: string;
  estimatedDeliveryTime: string;
  distanceKm: number;
  partnerPayout: number;
  createdAt: string;
  timeline: OrderTimelineEvent[];
  notes?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}

export interface ServiceZone {
  id: string;
  name: string;
  city: string;
  state: string;
  activeShopsCount: number;
  activeDeliveryPartnersCount: number;
  status: 'active' | 'inactive';
  coverageRadiusKm: number;
  coordinates?: { lat: number; lng: number };
}

export interface Promotion {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  categoryApplicable?: BusinessType | 'all';
  validUntil: string;
  active: boolean;
}

export interface AuditLogItem {
  id: string;
  action: string;
  adminUser: string;
  module: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface FinanceSummary {
  totalSalesGMV: number;
  platformRevenue: number;
  netProfit: number;
  totalExpenses: number;
  sellerPayable: number;
  deliveryPayout: number;
  pendingSettlement: number;
  categoryRevenueShare: {
    food: number;
    grocery: number;
    fitness: number;
    disposable: number;
  };
}
