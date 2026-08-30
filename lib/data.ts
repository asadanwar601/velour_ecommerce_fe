import { Product, Category } from './types';
import { GENERATED_PRODUCTS } from './generated-products';
import { SITE_CONFIG, DEFAULT_SIZES_PRESET, DEFAULT_TAGS_PRESET } from './config';

export interface CategoryInfo {
  id: Category;
  name: string;
  subcategories: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'women',
    name: 'Women',
    subcategories: [
      'Outerwear',
      'Dresses',
      'Knitwear',
      'Tops & Shirts',
      'Trousers',
      'Tailoring',
    ],
  },
  {
    id: 'men',
    name: 'Men',
    subcategories: [
      'Outerwear',
      'Tailoring',
      'Knitwear',
      'Shirts',
      'Trousers & Denim',
      'Basics',
    ],
  },
];

export const BASE_PRODUCTS: Product[] = [
  // ─── WOMEN (12 Products) ──────────────────────────────────────────
  {
    id: 'w-double-breasted-wool-coat',
    name: 'Double-Breasted Wool Overcoat',
    category: 'women',
    subcategory: 'Outerwear',
    price: 340,
    compareAtPrice: 425,
    description:
      'Crafted from heavy double-faced Italian virgin wool, this tailored overcoat boasts wide peak lapels, horn buttons, and a relaxed, structured silhouette designed to drape cleanly over winter layers.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isNew: false,
    trending: true,
  },
  {
    id: 'w-structured-linen-blazer',
    name: 'Structured Studio Linen Blazer',
    category: 'women',
    subcategory: 'Tailoring',
    price: 260,
    description:
      'A sharp single-breasted blazer cut from breathable heavyweight European flax. Features sculpted shoulder padding, neat flap pockets, and a timeless sand hue.',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isNew: true,
    trending: false,
  },
  {
    id: 'w-cashmere-crewneck-sweater',
    name: 'Cashmere Ribbed Crewneck',
    category: 'women',
    subcategory: 'Knitwear',
    price: 195,
    description:
      'Spun from Grade-A Mongolian cashmere with a subtle chunky gauge. Finished with delicate ribbing at the neck, cuffs, and hem for an effortless modern drape.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: true,
    trending: true,
  },
  {
    id: 'w-silk-bias-midi-dress',
    name: 'Silk Georgette Bias Midi Dress',
    category: 'women',
    subcategory: 'Dresses',
    price: 290,
    compareAtPrice: 350,
    description:
      'Cut on the bias to skim the natural contours of the body. Features an understated scoop neckline, low back detail, and a fluid silhouette with raw hem finishing.',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isNew: false,
    trending: true,
  },
  {
    id: 'w-high-waisted-pleated-trouser',
    name: 'High-Waisted Pleated Trousers',
    category: 'women',
    subcategory: 'Trousers',
    price: 185,
    description:
      'Tailored from crease-resistant wool-blend twill. Double front pleats create a fluid wide-leg profile that sits cleanly over boots or minimalist loafers.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: true,
    trending: false,
  },
  {
    id: 'w-oversized-poplin-shirt',
    name: 'Crisp Organic Cotton Poplin Shirt',
    category: 'women',
    subcategory: 'Tops & Shirts',
    price: 145,
    description:
      'An architectural take on the menswear classic. Tailored with dropped shoulders, exaggerated mother-of-pearl buttons, and a curved hem with high side slits.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: false,
    trending: true,
  },
  {
    id: 'w-minimalist-trench-coat',
    name: 'Water-Repellent Minimal Trench',
    category: 'women',
    subcategory: 'Outerwear',
    price: 360,
    description:
      'A streamlined update on the heritage trench. Rendered in a Japanese technical gabardine with a removable waist tie, clean storm flap, and deep welt pockets.',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isNew: true,
    trending: true,
  },
  {
    id: 'w-draped-column-dress',
    name: 'Sculpted Draped Column Dress',
    category: 'women',
    subcategory: 'Dresses',
    price: 240,
    compareAtPrice: 310,
    description:
      'Modern minimalism at its finest. Features asymmetrical side gathering, a clean boatneck, and a soft matte jersey fabric that moves gracefully with every step.',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: false,
    trending: false,
  },
  {
    id: 'w-wool-mockneck-knit',
    name: 'Fine Merino Mockneck Knit',
    category: 'women',
    subcategory: 'Knitwear',
    price: 165,
    description:
      'Ultra-fine Australian Merino wool spun into a lightweight, second-skin layer. Perfect for year-round layering under blazers and leather outerwear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: true,
    trending: false,
  },
  {
    id: 'w-relaxed-silk-blouse',
    name: 'Sandwashed Silk Camp Collar Blouse',
    category: 'women',
    subcategory: 'Tops & Shirts',
    price: 210,
    description:
      '100% mulberry silk treated with an artisanal sandwashed finish for a velvety matte touch. Relaxed Cuban collar with tonal shell buttons.',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isNew: false,
    trending: false,
  },
  {
    id: 'w-straight-leg-crepe-pant',
    name: 'Tailored Crepe Cigarette Pants',
    category: 'women',
    subcategory: 'Trousers',
    price: 175,
    description:
      'Crisp ankle-grazing trousers in dense Japanese matte crepe. Clean waistband with concealed zip and subtle center pressed creases.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: true,
    trending: true,
  },
  {
    id: 'w-wool-vest-waistcoat',
    name: 'Tailored Wool Suiting Vest',
    category: 'women',
    subcategory: 'Tailoring',
    price: 160,
    description:
      'Sleek suiting waistcoat with an adjustable back buckle, v-neckline, and neat welt front pockets. Can be styled solo or as a three-piece suit foundation.',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: false,
    trending: true,
  },

  // ─── MEN (12 Products) ────────────────────────────────────────────
  {
    id: 'm-unstructured-wool-blazer',
    name: 'Unstructured Wool Flannel Blazer',
    category: 'men',
    subcategory: 'Tailoring',
    price: 320,
    compareAtPrice: 395,
    description:
      'Softly tailored with zero shoulder padding for a relaxed, natural silhouette. Crafted in Biella, Italy from brushed super-120s wool flannel with patch pockets and horn buttons.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isNew: true,
    trending: true,
  },
  {
    id: 'm-heavyweight-leather-jacket',
    name: 'Minimalist Lambskin Leather Blouson',
    category: 'men',
    subcategory: 'Outerwear',
    price: 480,
    description:
      'Supple full-grain lambskin with a clean shirt collar, concealed two-way matte zipper, and cupro interior lining. A modern heirloom built to patina richly with age.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isNew: false,
    trending: true,
  },
  {
    id: 'm-raw-selvedge-denim',
    name: '14oz Japanese Selvedge Denim',
    category: 'men',
    subcategory: 'Trousers & Denim',
    price: 210,
    description:
      'Woven on vintage shuttle looms in Okayama from organic long-staple cotton. Classic straight fit with chainstitched hems, custom oxidized rivets, and leather back patch.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: true,
    trending: true,
  },
  {
    id: 'm-chunky-waffle-sweater',
    name: 'Chunky Merino Waffle Crewneck',
    category: 'men',
    subcategory: 'Knitwear',
    price: 180,
    compareAtPrice: 225,
    description:
      'Thick textural honeycomb knit spun from pure untreated Merino wool. Features raglan sleeves, sturdy ribbed collar, and substantial thermal weight.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isNew: false,
    trending: false,
  },
  {
    id: 'm-relaxed-oxford-shirt',
    name: 'Garment-Dyed Heavy Oxford Shirt',
    category: 'men',
    subcategory: 'Shirts',
    price: 135,
    description:
      'Woven from substantial 8oz cotton Oxford cloth, then garment-dyed for a broken-in softness and subtle depth of color. Relaxed button-down collar and box pleat.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: true,
    trending: false,
  },
  {
    id: 'm-heavy-pima-tee',
    name: 'Heavyweight Pima Cotton Tee',
    category: 'men',
    subcategory: 'Basics',
    price: 65,
    description:
      'Crafted from 280 GSM Peruvian long-staple Pima cotton. Dense yet exceptionally soft, featuring a reinforced collar that retains its shape wash after wash.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: false,
    trending: true,
  },
  {
    id: 'm-cashmere-overcoat',
    name: 'Tailored Cashmere-Wool Balmacaan',
    category: 'men',
    subcategory: 'Outerwear',
    price: 450,
    compareAtPrice: 550,
    description:
      'A classic single-breasted Balmacaan coat with raglan sleeves, fly-front button closure, and deep storm collar. Blended with 20% cashmere for cloud-like softness.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isNew: true,
    trending: true,
  },
  {
    id: 'm-single-pleat-wool-trouser',
    name: 'Single-Pleat Flannel Dress Trousers',
    category: 'men',
    subcategory: 'Tailoring',
    price: 195,
    description:
      'Impeccably tailored trousers with side adjusters and a gentle taper toward the cuff. Woven in wool flannel for cold-weather elegance.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: false,
    trending: false,
  },
  {
    id: 'm-merino-rollneck-sweater',
    name: 'Fine Gauge Merino Rollneck',
    category: 'men',
    subcategory: 'Knitwear',
    price: 155,
    description:
      'Knitted from 100% extra-fine 19.5-micron Merino wool. Highly breathable, naturally temperature-regulating, and tailored to sit sleekly under tailoring.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: true,
    trending: true,
  },
  {
    id: 'm-linen-band-collar-shirt',
    name: 'Relaxed Linen Grandad Collar Shirt',
    category: 'men',
    subcategory: 'Shirts',
    price: 125,
    description:
      'Pure washed Normandy linen with a clean band collar, seamless placket, and relaxed straight hem with side vents. Effortless warm-weather tailoring.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: false,
    trending: false,
  },
  {
    id: 'm-relaxed-chino-trouser',
    name: 'Wide-Leg Washed Cotton Chinos',
    category: 'men',
    subcategory: 'Trousers & Denim',
    price: 140,
    description:
      'Constructed from durable 100% cotton drill with a washed peach-skin finish. Roomy thigh tapering slightly to the ankle for a contemporary silhouette.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: true,
    trending: false,
  },
  {
    id: 'm-supima-henley-shirt',
    name: 'Long-Sleeve Supima Waffle Henley',
    category: 'men',
    subcategory: 'Basics',
    price: 90,
    description:
      'Midweight thermal waffle knit crafted from American-grown Supima cotton. Mother-of-pearl 3-button placket and snug ribbed cuffs.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isNew: false,
    trending: true,
  },
];

// Switch to generated-only by changing the line below to: export const PRODUCTS: Product[] = GENERATED_PRODUCTS;
export const PRODUCTS: Product[] = [...BASE_PRODUCTS, ...GENERATED_PRODUCTS];

/**
 * Returns the list of active subcategories for a given category.
 * Subcategories are dynamically derived from the active product catalog,
 * maintaining the curated order defined in CATEGORIES first.
 */
export function subcategoriesFor(category: Category): string[] {
  const catConfig = CATEGORIES.find((c) => c.id === category);
  const curatedOrder = catConfig ? catConfig.subcategories : [];

  // Find all subcategories with at least one product in this category
  const activeProducts = PRODUCTS.filter((p) => p.category === category);
  const activeSubcats = new Set(activeProducts.map((p) => p.subcategory));

  // Sort by curated order, then append any uncurated ones alphabetically
  const curatedActive = curatedOrder.filter((sub) => activeSubcats.has(sub));
  const remainingActive = Array.from(activeSubcats)
    .filter((sub) => !curatedOrder.includes(sub))
    .sort();

  return [...curatedActive, ...remainingActive];
}

// ─── PROMO COUPONS ──────────────────────────────────────────────────────────

export const MOCK_COUPONS: import('./types').Coupon[] = [
  {
    code: 'VELOUR10',
    discountType: 'percentage',
    value: 10,
    minSubtotal: 100,
    description: '10% off entire order on orders over $100',
  },
  {
    code: 'LUXURY50',
    discountType: 'fixed',
    value: 50,
    minSubtotal: 250,
    description: '$50 off luxury atelier orders over $250',
  },
  {
    code: 'FREESHIP',
    discountType: 'free_shipping',
    value: 15,
    minSubtotal: 0,
    description: 'Complimentary expedited worldwide shipping',
  },
  {
    code: 'ATELIER20',
    discountType: 'percentage',
    value: 20,
    minSubtotal: 350,
    description: '20% VIP seasonal privilege on orders over $350',
  },
];

// ─── SAMPLE PRODUCT REVIEWS ────────────────────────────────────────────────

export const INITIAL_REVIEWS: import('./types').Review[] = [
  {
    id: 'rev-1',
    productId: 'w-double-breasted-wool-coat',
    authorName: 'Camille Laurent',
    rating: 5,
    title: 'Flawless drape and supreme warmth',
    comment:
      'The virgin wool fabric has substantial weight without feeling stiff. The peak lapels and horn buttons make this feel like a bespoke piece from Savile Row.',
    fit: 'true-to-size',
    verifiedBuyer: true,
    createdAt: '2026-08-14T10:30:00Z',
  },
  {
    id: 'rev-2',
    productId: 'w-double-breasted-wool-coat',
    authorName: 'Eleanor Vance',
    rating: 5,
    title: 'Exceeded all expectations',
    comment:
      'I usually struggle with sleeve lengths on tailored coats, but size M fit like it was custom made. The satin interior lining is exceptionally silky.',
    fit: 'true-to-size',
    verifiedBuyer: true,
    createdAt: '2026-08-02T14:15:00Z',
  },
  {
    id: 'rev-3',
    productId: 'w-double-breasted-wool-coat',
    authorName: 'Sofia Mendez',
    rating: 4,
    title: 'Generous cut, luxurious hand-feel',
    comment:
      'Slightly oversized in the shoulders, which is perfect for layering thick cashmere underneath. Beautiful warm charcoal tone.',
    fit: 'large',
    verifiedBuyer: true,
    createdAt: '2026-07-28T09:00:00Z',
  },
  {
    id: 'rev-4',
    productId: 'm-unstructured-wool-blazer',
    authorName: 'Julian Sterling',
    rating: 5,
    title: 'The definitive modern blazer',
    comment:
      'Unstructured shoulders create a relaxed silhouette that looks equally sharp with denim or tailored flannel trousers.',
    fit: 'true-to-size',
    verifiedBuyer: true,
    createdAt: '2026-08-18T16:20:00Z',
  },
  {
    id: 'rev-5',
    productId: 'w-cashmere-mockneck-sweater',
    authorName: 'Margaret H.',
    rating: 5,
    title: 'Pure cloud-like cashmere',
    comment:
      'Dense knit that does not pill easily. The rolled mock neckline holds its shape effortlessly through all-day wear.',
    fit: 'true-to-size',
    verifiedBuyer: true,
    createdAt: '2026-08-20T11:45:00Z',
  },
];

// ─── SAMPLE CUSTOMER ORDERS (WITH TRACKING & RETURNS) ──────────────────────

export const INITIAL_CUSTOMER_ORDERS: import('./types').Order[] = [
  {
    id: 'ord-client-001',
    orderNumber: 'VLR-2026-89421',
    status: 'SHIPPED',
    subtotal: 580,
    shipping: 0,
    discountAmount: 58,
    couponCode: 'VELOUR10',
    total: 522,
    contactName: 'Elena Rostova',
    contactEmail: 'client@velour-atelier.com',
    contactPhone: '+1 (555) 234-5678',
    createdAt: '2026-08-27T14:20:00Z',
    carrier: 'DHL Express Prestige',
    trackingNumber: 'DHL-9842109482',
    estimatedDelivery: '2026-08-31T18:00:00Z',
    trackingTimeline: [
      {
        step: 'CONFIRMED',
        title: 'Order Confirmed',
        description: 'Payment authenticated and atelier ticket generated',
        location: 'Velour Concierge Desk',
        timestamp: '2026-08-27 14:20',
        completed: true,
      },
      {
        step: 'CRAFTING',
        title: 'Atelier Inspection & Packing',
        description: 'Hand-inspected, steam-pressed, and encased in luxury garment box',
        location: 'Milan Atelier Workshop',
        timestamp: '2026-08-28 09:15',
        completed: true,
      },
      {
        step: 'DISPATCHED',
        title: 'Dispatched with Courier',
        description: 'Handed over to DHL Express International Air Hub',
        location: 'Milan Malpensa Airport',
        timestamp: '2026-08-28 18:40',
        completed: true,
      },
      {
        step: 'IN_TRANSIT',
        title: 'In International Transit',
        description: 'Customs cleared & transit to regional distribution center',
        location: 'JFK International Hub, New York',
        timestamp: '2026-08-29 08:30',
        completed: true,
      },
      {
        step: 'OUT_FOR_DELIVERY',
        title: 'Out for Delivery',
        description: 'Scheduled with dedicated courier van for doorstep delivery',
        location: 'Manhattan Distribution Station',
        timestamp: 'Estimated: Aug 31, Morning',
        completed: false,
      },
      {
        step: 'DELIVERED',
        title: 'Delivered',
        description: 'Delivered to client reception with signature confirmation',
        location: 'Delivery Destination',
        timestamp: 'Estimated: Aug 31, 18:00',
        completed: false,
      },
    ],
    shippingAddress: {
      line1: '740 Park Avenue',
      line2: 'Apt 14B',
      city: 'New York',
      state: 'NY',
      zip: '10021',
      country: 'US',
    },
    items: [
      {
        id: 'ord-item-1',
        productId: 'w-double-breasted-wool-coat',
        product: BASE_PRODUCTS[0],
        size: 'S',
        quantity: 1,
        price: 340,
        lineTotal: 340,
      },
      {
        id: 'ord-item-2',
        productId: 'w-cashmere-mockneck-sweater',
        product: BASE_PRODUCTS[2] || BASE_PRODUCTS[0],
        size: 'M',
        quantity: 1,
        price: 240,
        lineTotal: 240,
      },
    ],
    isGift: true,
    giftMessage: 'With warmest wishes for the autumn season. Enjoy the atelier tailoring.',
  },
  {
    id: 'ord-client-002',
    orderNumber: 'VLR-2026-78103',
    status: 'PAID',
    subtotal: 310,
    shipping: 0,
    total: 310,
    contactName: 'Elena Rostova',
    contactEmail: 'client@velour-atelier.com',
    contactPhone: '+1 (555) 234-5678',
    createdAt: '2026-08-29T11:05:00Z',
    trackingTimeline: [
      {
        step: 'CONFIRMED',
        title: 'Order Confirmed',
        description: 'Order placed and payment authorized',
        location: 'Velour Checkout Gateway',
        timestamp: '2026-08-29 11:05',
        completed: true,
      },
      {
        step: 'CRAFTING',
        title: 'Atelier Processing',
        description: 'Preparing garments and bespoke cedar box packaging',
        location: 'Florence Central Atelier',
        timestamp: '2026-08-29 13:00',
        completed: true,
      },
      {
        step: 'DISPATCHED',
        title: 'Pending Dispatch',
        description: 'Awaiting courier pickup for overnight priority transit',
        location: 'Florence Hub',
        timestamp: 'Scheduled Today',
        completed: false,
      },
    ],
    shippingAddress: {
      line1: '740 Park Avenue',
      line2: 'Apt 14B',
      city: 'New York',
      state: 'NY',
      zip: '10021',
      country: 'US',
    },
    items: [
      {
        id: 'ord-item-3',
        productId: 'm-unstructured-wool-blazer',
        product: BASE_PRODUCTS[12] || BASE_PRODUCTS[0],
        size: '40R',
        quantity: 1,
        price: 310,
        lineTotal: 310,
      },
    ],
  },
  {
    id: 'ord-client-003',
    orderNumber: 'VLR-2026-61984',
    status: 'DELIVERED',
    subtotal: 420,
    shipping: 0,
    discountAmount: 50,
    couponCode: 'LUXURY50',
    total: 370,
    contactName: 'Elena Rostova',
    contactEmail: 'client@velour-atelier.com',
    contactPhone: '+1 (555) 234-5678',
    createdAt: '2026-08-15T09:30:00Z',
    carrier: 'FedEx Luxury Direct',
    trackingNumber: 'FX-8849102834',
    trackingTimeline: [
      {
        step: 'CONFIRMED',
        title: 'Order Confirmed',
        description: 'Payment received',
        location: 'Velour Checkout',
        timestamp: '2026-08-15 09:30',
        completed: true,
      },
      {
        step: 'DISPATCHED',
        title: 'Dispatched',
        description: 'Departed logistics hub',
        location: 'Paris Logistics Hub',
        timestamp: '2026-08-16 11:20',
        completed: true,
      },
      {
        step: 'DELIVERED',
        title: 'Delivered',
        description: 'Signed and delivered to doorman',
        location: 'New York, NY',
        timestamp: '2026-08-18 15:45',
        completed: true,
      },
    ],
    shippingAddress: {
      line1: '740 Park Avenue',
      line2: 'Apt 14B',
      city: 'New York',
      state: 'NY',
      zip: '10021',
      country: 'US',
    },
    items: [
      {
        id: 'ord-item-4',
        productId: 'w-bias-cut-silk-dress',
        product: BASE_PRODUCTS[1] || BASE_PRODUCTS[0],
        size: 'S',
        quantity: 1,
        price: 420,
        lineTotal: 420,
      },
    ],
  },
  {
    id: 'ord-client-004',
    orderNumber: 'VLR-2026-44012',
    status: 'CANCELLED',
    subtotal: 280,
    shipping: 15,
    total: 295,
    contactName: 'Elena Rostova',
    contactEmail: 'client@velour-atelier.com',
    createdAt: '2026-08-01T16:00:00Z',
    cancellationReason: 'Selected incorrect sizing during rapid checkout',
    cancelledAt: '2026-08-01T16:45:00Z',
    shippingAddress: {
      line1: '740 Park Avenue',
      city: 'New York',
      state: 'NY',
      zip: '10021',
      country: 'US',
    },
    items: [
      {
        id: 'ord-item-5',
        productId: 'm-japanese-selvedge-denim',
        product: BASE_PRODUCTS[14] || BASE_PRODUCTS[0],
        size: '32',
        quantity: 1,
        price: 280,
        lineTotal: 280,
      },
    ],
  },
];

// ─── BRAND SETTINGS INITIAL STATE ──────────────────────────────────────────

export const DEFAULT_BRAND_SETTINGS = {
  brandName: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  description: SITE_CONFIG.description,
  logoUrl: SITE_CONFIG.defaultLogoUrl,
  iconUrl: SITE_CONFIG.defaultIconUrl,
  supportEmail: SITE_CONFIG.supportEmail,
  supportPhone: SITE_CONFIG.supportPhone,
  instagramUrl: SITE_CONFIG.instagramUrl,
  currency: SITE_CONFIG.defaultCurrency,
  updatedAt: new Date().toISOString(),
};

// ─── DEFAULT CATEGORIES ───────────────────────────────────────────────────

export const DEFAULT_CATEGORIES_CONFIG = [
  {
    id: 'cat-women',
    name: 'Women',
    slug: 'women',
    description: 'Bespoke tailoring, silk dresses, and Italian wool overcoats.',
    subcategories: ['Outerwear', 'Dresses', 'Knitwear', 'Tops & Shirts', 'Trousers', 'Tailoring', 'Eveningwear'],
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    id: 'cat-men',
    name: 'Men',
    slug: 'men',
    description: 'Sartorial tailoring, cashmere knitwear, and Japanese selvedge denim.',
    subcategories: ['Outerwear', 'Tailoring', 'Knitwear', 'Shirts', 'Trousers & Denim', 'Basics', 'Footwear'],
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Handcrafted leather goods, silk scarves, and handcrafted jewelry.',
    subcategories: ['Leather Goods', 'Scarves & Silk', 'Belts', 'Eyewear', 'Jewelry'],
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
  {
    id: 'cat-haute-couture',
    name: 'Haute Couture',
    slug: 'haute-couture',
    description: 'Limited edition runway pieces crafted to individual client measurements.',
    subcategories: ['Runway 2026', 'Silk Gowns', 'Hand-Embroidered Coats', 'Archive Selection'],
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    isActive: true,
  },
];

// ─── DEFAULT SIZES & TAGS ──────────────────────────────────────────────────

export const DEFAULT_SIZES_CONFIG = [...DEFAULT_SIZES_PRESET];

export const DEFAULT_TAGS_CONFIG = [...DEFAULT_TAGS_PRESET];

// ─── INITIAL ADMIN USERS & CUSTOMERS ──────────────────────────────────────

export const INITIAL_ADMIN_USERS = [
  {
    id: 'usr-admin-01',
    email: 'admin@velour-atelier.com',
    firstName: 'Asad',
    lastName: 'Anwar',
    phone: '+1 (212) 555-0199',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authProvider: 'GOOGLE' as const,
    mfaEnabled: true,
    orderCount: 5,
    totalSpent: 4850,
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'usr-client-01',
    email: 'claire.delacour@gmail.com',
    firstName: 'Claire',
    lastName: 'Delacour',
    phone: '+1 (212) 555-0142',
    role: 'CUSTOMER' as const,
    status: 'ACTIVE' as const,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authProvider: 'GOOGLE' as const,
    mfaEnabled: true,
    orderCount: 3,
    totalSpent: 2420,
    createdAt: '2026-02-14T14:30:00Z',
  },
  {
    id: 'usr-client-02',
    email: 'alexandre.vance@gmail.com',
    firstName: 'Alexandre',
    lastName: 'Vance',
    phone: '+1 (415) 555-0177',
    role: 'CUSTOMER' as const,
    status: 'ACTIVE' as const,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authProvider: 'GOOGLE' as const,
    mfaEnabled: true,
    orderCount: 2,
    totalSpent: 1150,
    createdAt: '2026-03-01T09:15:00Z',
  },
  {
    id: 'usr-client-03',
    email: 'elena.rostova@gmail.com',
    firstName: 'Elena',
    lastName: 'Rostova',
    phone: '+1 (310) 555-0188',
    role: 'CUSTOMER' as const,
    status: 'ACTIVE' as const,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    authProvider: 'GOOGLE' as const,
    mfaEnabled: false,
    orderCount: 1,
    totalSpent: 295,
    createdAt: '2026-04-12T16:20:00Z',
  },
  {
    id: 'usr-client-04',
    email: 'sophie.martin@parisfashion.fr',
    firstName: 'Sophie',
    lastName: 'Martin',
    phone: '+33 6 12 34 56 78',
    role: 'CUSTOMER' as const,
    status: 'ACTIVE' as const,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    authProvider: 'EMAIL' as const,
    mfaEnabled: false,
    orderCount: 0,
    totalSpent: 0,
    createdAt: '2026-06-20T11:00:00Z',
  },
];

