import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRICING, PackType, STRIPE_PRODUCT_ID } from '@/lib/config';

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-12-15.clover',
  });
}

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const productId = process.env.STRIPE_PRODUCT_ID || STRIPE_PRODUCT_ID;

    const { origin } = new URL(request.url);

    // Get pack type from request body
    const body = await request.json().catch(() => ({}));
    const packType: PackType = body.packType || 'single';

    // Validate pack type
    if (!PRICING[packType]) {
      return NextResponse.json(
        { error: 'Invalid pack type' },
        { status: 400 }
      );
    }

    const pack = PRICING[packType];

    // Create Stripe Checkout Session with price_data
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product: productId,
            unit_amount: pack.priceCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}?payment=cancelled`,
      metadata: {
        packType: packType,
        files: pack.files.toString(),
        productName: pack.name,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
