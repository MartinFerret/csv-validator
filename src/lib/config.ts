// Stripe payment configuration
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_live_51RfFMsG3ZakVr98vOj5ZqJuEA5OnUise9Zbxkh81aq2dVURII1zHm8RTy6qHLwI5uPweTVJcVNeUHNjzS5zZIeoF001naDvRL0';
export const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID || 'prod_TvCutumWxoxHrE';

// App configuration - Stripe Export Cleaner
export const FREE_ROW_LIMIT = 10; // Free preview for first 10 rows

// Pricing configuration (one-time payments only)
export const PRICING = {
  single: {
    id: 'single',
    name: 'Single Export',
    files: 1,
    price: 9.99,
    priceCents: 999,
    pricePerFile: 9.99,
    savings: 0,
    savingsPercent: 0,
  },
  pack3: {
    id: 'pack3',
    name: '3-File Pack',
    files: 3,
    price: 24.99,
    priceCents: 2499,
    pricePerFile: 8.33,
    savings: 5.00,
    savingsPercent: 17,
  },
  pack5: {
    id: 'pack5',
    name: '5-File Pack',
    files: 5,
    price: 39.99,
    priceCents: 3999,
    pricePerFile: 8.00,
    savings: 10.00,
    savingsPercent: 20,
  },
} as const;

export type PackType = keyof typeof PRICING;

// Legacy exports for backward compatibility
export const PRICE_AMOUNT = PRICING.single.price;
export const PRICE_AMOUNT_CENTS = PRICING.single.priceCents;
export const PACK_3_PRICE = PRICING.pack3.price;
export const PACK_5_PRICE = PRICING.pack5.price;

// Product info
export const PRODUCT_NAME = 'StripeClear';
export const PRODUCT_TAGLINE = 'Transform messy Stripe exports into accountant-ready CSVs';

// Test mode - disabled (real Stripe payments)
export const TEST_MODE = false;

// Stripe CSV export types we support
export const SUPPORTED_EXPORT_TYPES = [
  'payments',
  'payouts',
  'balance_transactions',
  'refunds',
  'customers',
  'invoices',
] as const;
