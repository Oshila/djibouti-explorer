'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const intent = searchParams.get('payment_intent');
    if (!intent) {
      router.push('/');
      return;
    }
    setPaymentIntent(intent);
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-cream p-8 text-center">
        <div className="w-20 h-20 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-10 h-10 text-olive" />
        </div>
        
        <h1 className="text-2xl font-heading text-teal mb-3">Payment Successful! 🎉</h1>
        <p className="text-nearblack/60 mb-2">
          Your payment has been processed successfully.
        </p>
        <p className="text-xs text-nearblack/40 mb-6">
          Reference: {paymentIntent?.slice(0, 8)}...
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-teal hover:bg-teal/90 text-white py-3 rounded-xl font-medium transition-all hover:shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/tours"
            className="block w-full border border-cream hover:bg-cream/30 text-nearblack/70 py-3 rounded-xl font-medium transition-all"
          >
            Browse More Tours
          </Link>
        </div>

        <p className="text-xs text-nearblack/40 mt-6">
          A receipt has been sent to your email address.
        </p>
      </div>
    </div>
  );
}