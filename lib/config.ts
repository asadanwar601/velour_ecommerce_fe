/**
 * ============================================================================
 * CENTRAL APPLICATION CONFIGURATION & ENVIRONMENT CONSTANTS
 * ============================================================================
 * All environment variables, API endpoints, brand identity constants,
 * storage keys, taxonomy presets, and commerce defaults are consolidated here.
 */

// ─── 1. SITE & BRAND CONFIGURATION ──────────────────────────────────────────

export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Velour Atelier',
  shortName: process.env.NEXT_PUBLIC_APP_SHORT_NAME || 'Velour',
  tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || 'Quiet Luxury & Timeless Tailoring',
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    'Bespoke tailoring, rare natural fibers, and contemporary silhouettes engineered for effortless elegance.',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'concierge@velour-atelier.com',
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+1 (800) 835-6871',
  supportHours: process.env.NEXT_PUBLIC_SUPPORT_HOURS || 'Mon – Sat: 9:00 AM – 8:00 PM EST',
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/velour.atelier',
  pinterestUrl: process.env.NEXT_PUBLIC_PINTEREST_URL || 'https://pinterest.com/velouratelier',
  twitterUrl: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/velouratelier',
  defaultLogoUrl: process.env.NEXT_PUBLIC_DEFAULT_LOGO_URL || '',
  defaultIconUrl: process.env.NEXT_PUBLIC_DEFAULT_ICON_URL || '',
  defaultCurrency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'USD',
  currencySymbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$',
} as const;

// ─── 2. API & BACKEND CONFIGURATION ─────────────────────────────────────────

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  timeoutMs: Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS) || 15000,
  endpoints: {
    // Auth & Identity
    login: '/auth/login',
    signup: '/auth/signup',
    googleLogin: '/auth/google',
    me: '/auth/me',
    otpSend: '/auth/otp/send',
    otpVerify: '/auth/otp/verify',
    logout: '/auth/logout',

    // Products & Taxonomy
    products: '/products',
    categories: '/categories',
    sizes: '/admin/sizes',
    tags: '/admin/tags',
    brand: '/admin/brand',

    // Cart & Checkout
    cart: '/cart',
    checkout: '/checkout',
    couponsValidate: '/coupons/validate',

    // Orders & Tracking
    orders: '/orders',
    trackOrder: '/orders/track',
    returns: '/returns',

    // Inventory & Warehouses
    inventory: '/inventory',
    inventoryAdjust: '/inventory/adjust',

    // Admin & Directory
    adminUsers: '/admin/users',
  },
} as const;

// ─── 3. AUTH & SECURITY CONFIGURATION ───────────────────────────────────────

export const AUTH_CONFIG = {
  googleClientId:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    '1084269123456-sampleclientid.apps.googleusercontent.com',
  gisScriptUrl: 'https://accounts.google.com/gsi/client',
  otpCodeLength: 6,
  sessionExpiryDays: 30,
  preconfiguredAccounts: [
    {
      id: 'g-user-1',
      name: 'Claire Delacour',
      email: 'claire.delacour@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      mfaType: 'TOTP' as const,
    },
    {
      id: 'g-user-2',
      name: 'Alexandre Vance',
      email: 'alexandre.vance@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      mfaType: 'PHONE_SMS' as const,
      phoneMasked: '••• ••• ••88',
    },
    {
      id: 'g-user-3',
      name: 'Elena Rostova',
      email: 'elena.rostova@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      mfaType: 'PHONE_PROMPT' as const,
      promptNumber: 74,
    },
  ],
} as const;

// ─── 4. COMMERCE, SHIPPING & TAX CONFIGURATION ──────────────────────────────

export const COMMERCE_CONFIG = {
  freeShippingThreshold: Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD) || 300,
  standardShippingFee: Number(process.env.NEXT_PUBLIC_STANDARD_SHIPPING_FEE) || 25,
  expressShippingFee: Number(process.env.NEXT_PUBLIC_EXPRESS_SHIPPING_FEE) || 45,
  overnightShippingFee: Number(process.env.NEXT_PUBLIC_OVERNIGHT_SHIPPING_FEE) || 75,
  estimatedTaxRate: Number(process.env.NEXT_PUBLIC_ESTIMATED_TAX_RATE) || 0.08, // 8% sales tax
  restockingFeePercentage: Number(process.env.NEXT_PUBLIC_RESTOCKING_FEE_PCT) || 0,
  maxCartItemQuantity: 10,
} as const;

// ─── 5. STORAGE & LOCALSTORAGE KEYS ─────────────────────────────────────────

export const STORAGE_KEYS = {
  authToken: 'velour_auth_token',
  authUser: 'velour_auth_user',
  deviceId: 'velour_device_id',
  cart: 'velour_cart_items_v2',
  wishlist: 'velour_wishlist_items_v2',
  savedAddress: 'velour_shipping_address',
  guestOrders: 'velour_guest_order_records',
  brandSettings: 'velour_brand_settings',
  themePreference: 'velour_theme_mode',
  adminSidebarCollapsed: 'velour_admin_sidebar_collapsed',
} as const;

// ─── 6. MEDIA & IMAGE OPTIMIZATION PRESETS ──────────────────────────────────

export const IMAGE_CONFIG = {
  productMaxDimensions: { width: 1600, height: 2000 },
  logoMaxDimensions: { width: 600, height: 300 },
  iconMaxDimensions: { width: 256, height: 256 },
  avatarMaxDimensions: { width: 400, height: 400 },
  compressionQuality: 0.85,
  preferredMimeType: 'image/webp' as const,
  fallbackProductImage:
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80',
  fallbackHoverImage:
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  fallbackAvatar:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
} as const;

// ─── 7. DEFAULT TAXONOMY PRESETS ────────────────────────────────────────────

export const DEFAULT_SIZES_PRESET: readonly string[] = [
  'XXS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  '38R',
  '40R',
  '42R',
  '44R',
  '28',
  '30',
  '32',
  '34',
  '36',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  'One Size',
] as const;

export const DEFAULT_TAGS_PRESET: readonly string[] = [
  'Featured on Homepage',
  'New Arrival',
  'Trending',
  'Limited Edition',
  'Archival Piece',
  'Sustainable Fibers',
  'Bespoke Order',
  'Best Seller',
] as const;
