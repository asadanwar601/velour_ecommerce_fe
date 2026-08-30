export type Category = 'women' | 'men' | string;

export interface Product {
  id: string; // e.g. "w-double-breasted-wool-coat"
  slug?: string;
  name: string;
  category: Category;
  subcategory: string;
  brand?: string; // e.g. "Velour Atelier", "Loro Piana", "Bottega"
  price: number; // e.g. 340
  compareAtPrice?: number; // e.g. 425
  description: string;
  sizes: string[]; // e.g. ["XS", "S", "M", "L", "XL"]
  images: [string, string] | string[]; // [primaryImageUrl, hoverImageUrl, ...gallery]
  primaryImageUrl?: string;
  hoverImageUrl?: string;
  inStock?: number;
  gallery?: string[];
  featured: boolean;
  isNew: boolean;
  trending: boolean;
  tags?: string[]; // e.g. ["Featured on Homepage", "New Arrival", "Trending", "Limited Edition"]
  createdAt?: string;
  updatedAt?: string;
}

export interface CartProductLine {
  id: string; // CartItem ID
  productId: string;
  product: Product;
  size: string;
  quantity: number;
  price: number;
  lineTotal: number;
}

/**
 * Compatible CartItem representation for UI components
 */
export interface CartItem {
  id?: string;
  productId?: string;
  product: Product;
  size: string;
  quantity: number;
  price?: number;
  lineTotal?: number;
}

export interface CartResponse {
  id: string;
  items: CartProductLine[];
  itemCount: number;
  subtotal: number;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country?: string; // Default: "US"
}

export interface TrackingCheckpoint {
  step: 'CONFIRMED' | 'CRAFTING' | 'DISPATCHED' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

export interface ReturnItemRequest {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
  reason: string;
}

export interface ReturnRecord {
  id: string;
  orderId: string;
  orderNumber: string;
  items: ReturnItemRequest[];
  reason?: string;
  returnMethod?: 'ORIGINAL_PAYMENT' | 'STORE_CREDIT';
  status: 'REQUESTED' | 'APPROVED' | 'IN_TRANSIT' | 'RECEIVED' | 'REFUNDED' | 'REJECTED';
  returnTrackingNumber?: string;
  returnQrCode?: string;
  refundAmount?: number;
  requestedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product | null;
  size: string;
  quantity: number;
  price: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "VLR-2026-00123"
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  subtotal: number;
  discountAmount?: number;
  couponCode?: string;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  createdAt: string;
  items: OrderItem[];
  // Tracking
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  trackingTimeline?: TrackingCheckpoint[];
  // Cancellation
  cancellationReason?: string;
  cancelledAt?: string;
  // Return / Refund
  returnRecord?: ReturnRecord;
  // Gift
  isGift?: boolean;
  giftMessage?: string;
}

export interface SavedAddress extends ShippingAddress {
  id: string;
  label?: string; // e.g. "Home", "Atelier Studio"
  firstName: string;
  lastName: string;
  phone?: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  role: 'CUSTOMER' | 'ADMIN';
  isAdmin?: boolean;
  twoFactorEnabled?: boolean;
  authProvider?: 'EMAIL' | 'GOOGLE' | 'OTP';
  createdAt: string;
  addresses?: SavedAddress[];
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  fit: 'small' | 'true-to-size' | 'large';
  verifiedBuyer: boolean;
  createdAt: string;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Coupon {
  id?: string;
  code: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  type?: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING' | 'percentage' | 'fixed' | 'free_shipping';
  value: number; // e.g. 15 for 15% or 50 for $50
  minSubtotal?: number;
  minOrder?: number;
  maxUses?: number;
  expiresAt?: string;
  isActive?: boolean;
  redemptions?: number;
  description?: string;
}

export interface GiftOptions {
  isGift: boolean;
  giftMessage?: string;
}

export interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: UserProfile;
  isNewUser?: boolean;
  requiresVerification?: boolean;
  message?: string;
  email?: string;
}

export interface SignupPayload {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  deviceId?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
  deviceId?: string;
}

export interface GoogleAuthPayload {
  credential?: string; // Google OAuth JWT credential
  idToken?: string;
  accessToken?: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  googleId?: string;
  deviceId?: string;
}

export interface OtpRequestPayload {
  identifier: string;
  channel: 'EMAIL' | 'WHATSAPP';
}

export interface OtpVerifyPayload {
  identifier: string;
  code: string;
  channel: 'EMAIL' | 'WHATSAPP';
  firstName?: string;
  lastName?: string;
  deviceId?: string;
}

export interface CheckoutPayload {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  shippingAddress: ShippingAddress;
  shippingCost?: number;
  couponCode?: string;
  giftPackaging?: boolean;
  giftNote?: string;
  paymentMethod?: string;
}

export interface FilterParams {
  category?: Category;
  subcategory?: string;
  size?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  query?: string;
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'error';
  image?: string;
  duration?: number;
}

// ─── ADMIN & INVENTORY INTERFACES ───────────────────────────────────────────

export interface CreateProductDto {
  name: string;
  category: Category;
  subcategory: string;
  brand?: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  sizes: string[];
  images: [string, string] | string[];
  gallery?: string[];
  featured?: boolean;
  isNew?: boolean;
  trending?: boolean;
  tags?: string[];
  initialStock?: number;
  location?: string;
}

export interface UpdateProductDto {
  name?: string;
  category?: Category;
  subcategory?: string;
  brand?: string;
  price?: number;
  compareAtPrice?: number;
  description?: string;
  sizes?: string[];
  images?: [string, string] | string[];
  gallery?: string[];
  featured?: boolean;
  isNew?: boolean;
  trending?: boolean;
  tags?: string[];
}

// ─── BRAND & SETTINGS ────────────────────────────────────────────────────────

export interface BrandSettings {
  id?: string;
  brandName: string;
  tagline?: string;
  description?: string;
  logoUrl?: string | null;
  iconUrl?: string | null;
  appIconUrl?: string | null;
  faviconUrl?: string | null;
  supportEmail?: string;
  supportPhone?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  websiteUrl?: string;
  currency?: string;
  currencySymbol?: string;
  freeShippingThreshold?: number;
  announcementBarText?: string;
  announcementBarActive?: boolean;
  updatedAt?: string;
}

export interface CategoryConfig {
  id: string;
  name: string;
  slug: string;
  description?: string;
  subcategories: string[];
  imageUrl?: string;
  isActive: boolean;
}

export interface TagConfig {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface SizeConfig {
  id: string;
  name: string;
  category?: string;
}

// ─── ADMIN USERS & CUSTOMERS DIRECTORY ──────────────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN';
  status?: 'ACTIVE' | 'ARCHIVED' | 'SUSPENDED';
  avatarUrl?: string;
  authProvider?: 'EMAIL' | 'GOOGLE' | 'OTP';
  mfaEnabled?: boolean;
  twoFactorEnabled?: boolean;
  isEmailVerified?: boolean;
  isActive?: boolean;
  isArchived?: boolean;
  orderCount: number;
  totalSpent?: number;
  totalSpend?: number;
  createdAt: string;
  updatedAt?: string;
  orders?: Order[];
}

export interface UpdateAdminUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: 'CUSTOMER' | 'ADMIN';
  status?: 'ACTIVE' | 'ARCHIVED' | 'SUSPENDED';
}

export interface AdminUserFilterParams {
  role?: 'ALL' | 'CUSTOMER' | 'ADMIN';
  status?: 'ALL' | 'ACTIVE' | 'ARCHIVED' | 'SUSPENDED';
  query?: string;
  page?: number;
  limit?: number;
}

export interface LocationStock {
  id: string;
  locationName: string;
  quantity: number;
  lowStockThreshold: number;
  updatedAt: string;
}

export interface ProductInventoryBreakdown {
  productId: string;
  productName: string;
  sku?: string;
  totalStock: number;
  lowStockThreshold: number;
  isLowStock: boolean;
  locations: LocationStock[];
}

export interface LowStockItem {
  productId: string;
  productName: string;
  category: Category;
  subcategory: string;
  price: number;
  image?: string;
  totalStock: number;
  lowStockThreshold: number;
  locations: Array<{
    locationName: string;
    quantity: number;
  }>;
}

export interface InventoryAdjustDto {
  productId: string;
  location?: string;
  quantity: number; // positive to add, negative to deduct, or absolute adjustment
  type?: 'RESTOCK' | 'CORRECTION' | 'DISPATCH' | 'RETURN';
  reason?: string;
}

export interface InventoryAdjustmentResult {
  success: boolean;
  productId: string;
  previousStock: number;
  newStock: number;
  adjustedBy: number;
  location: string;
  timestamp: string;
}

export interface AdminOrderFilterParams {
  status?: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  page?: number;
  limit?: number;
  query?: string;
}

export interface ProductFacets {
  sizes: string[];
  colors?: string[];
  subcategories: string[];
  priceRange: { min: number; max: number };
}

export interface ProductSizeGuide {
  category: string;
  measurements: Array<{
    size: string;
    chest?: string;
    waist?: string;
    hips?: string;
    length?: string;
    sleeve?: string;
  }>;
  fitGuide?: string;
  careInstructions: string[];
}

export interface WishlistResponse {
  items: Array<{
    id: string;
    productId: string;
    product: Product;
    createdAt?: string;
  }>;
  itemCount: number;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  activeSessionsCount: number;
  lastLoginAt?: string;
  authProvider?: string;
}

export interface ImageUploadResult {
  url: string;
  originalName?: string;
  mimeType?: string;
  sizeBytes?: number;
}

export interface AdminDashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockCount: number;
  recentOrders: Order[];
  revenueGrowthPct?: number;
}

// ─── CMS & DYNAMIC PAGES ──────────────────────────────────────────────────

export interface CompanyValue {
  title: string;
  description: string;
  icon?: string;
}

export interface CompanyMilestone {
  year: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  id?: string;
  heroTitle: string;
  heroSubtitle?: string;
  bannerImageUrl?: string;
  storyHtml: string;
  missionTitle?: string;
  missionText?: string;
  valuesJson?: CompanyValue[];
  milestonesJson?: CompanyMilestone[];
  updatedAt?: string;
}

export interface ContactStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ContactPageContent {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  supportEmail?: string;
  supportPhone?: string;
  workingHours?: string;
  addressLine1?: string;
  addressLine2?: string;
  mapEmbedUrl?: string;
  contactStepsJson?: ContactStep[];
  updatedAt?: string;
}


