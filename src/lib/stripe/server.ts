import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-07-29.dahlia',
  typescript: true,
});

export interface PaymentMetadata {
  tourId?: string;
  bookingId?: string;
  visaRequestId?: string;
  customerName: string;
  customerEmail: string;
  type: 'tour' | 'visa';
}

export async function createPaymentIntent(
  amount: number,
  currency: string,
  metadata: PaymentMetadata,
  description: string
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency.toLowerCase(),
      description: description,
      metadata: {
        ...metadata,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        type: metadata.type,
      },
      receipt_email: metadata.customerEmail,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function getPaymentIntent(paymentIntentId: string) {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw error;
  }
}