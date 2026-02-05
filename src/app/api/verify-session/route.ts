import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRICING, PackType } from '@/lib/config';

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

    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed', status: session.payment_status },
        { status: 400 }
      );
    }

    // Get pack info from metadata
    const packType = (session.metadata?.packType || 'single') as PackType;
    const pack = PRICING[packType] || PRICING.single;

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      packType: packType,
      files: pack.files,
      packName: pack.name,
      amountPaid: session.amount_total ? session.amount_total / 100 : pack.price,
    });
  } catch (error) {
    console.error('Session verification error:', error);

    // Check if it's a Stripe error for invalid session
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: 'Invalid session ID' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to verify session' },
      { status: 500 }
    );
  }
}
