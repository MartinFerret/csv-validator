// Stripe configuration
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_live_51RfFMsG3ZakVr98vOj5ZqJuEA5OnUise9Zbxkh81aq2dVURII1zHm8RTy6qHLwI5uPweTVJcVNeUHNjzS5zZIeoF001naDvRL0';
export const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID || 'prod_TvCutumWxoxHrE';

// App configuration
export const FREE_ROW_LIMIT = 50; // Free for files with 50 rows or less
export const PRICE_AMOUNT = 2.99; // $2.99 USD
export const PRICE_AMOUNT_CENTS = 299; // Price in cents for Stripe

// Test mode - disabled (real Stripe payments)
export const TEST_MODE = false;
