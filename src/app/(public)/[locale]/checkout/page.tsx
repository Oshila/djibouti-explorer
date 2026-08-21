'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { use } from 'react';
import { getStripe } from '@/lib/stripe/client';
import { db } from '@/lib/firebase/client';
import { doc, updateDoc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { CreditCardIcon, LockClosedIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { getCustomerEmailHTML, getAdminEmailHTML } from '@/lib/email/templates';

interface Props {
  params: Promise<{ locale: string }>;
}

function CheckoutForm({ bookingId, amount, itemName, validLocale, clientSecret }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const isEn = validLocale === 'en';

  // Fetch booking data
  useEffect(() => {
    async function fetchBooking() {
      if (!bookingId) return;
      try {
        const docSnap = await getDoc(doc(db, 'bookings', bookingId));
        if (docSnap.exists()) {
          setBookingData(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    }
    fetchBooking();
  }, [bookingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/${validLocale}/booking/confirmation/${bookingId}`,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        throw new Error(submitError.message);
      }

      // If payment succeeded
      if (bookingId && paymentIntent) {
        // Update booking status
        await updateDoc(doc(db, 'bookings', bookingId), {
          paymentStatus: 'paid',
          paymentIntentId: paymentIntent.id,
          updatedAt: new Date().toISOString(),
        });

        // ⭐ SAVE PAYMENT TO PAYMENTS COLLECTION
        await addDoc(collection(db, 'payments'), {
          bookingId: bookingId,
          paymentIntentId: paymentIntent.id,
          amount: amount,
          currency: 'usd',
          status: paymentIntent.status || 'succeeded',
          type: 'tour',
          metadata: {
            bookingId: bookingId,
            customerName: bookingData?.customer?.firstName + ' ' + bookingData?.customer?.lastName || 'Customer',
            customerEmail: bookingData?.customer?.email || '',
          },
          customerEmail: bookingData?.customer?.email || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        // Fetch fresh booking data for email
        const freshBookingSnap = await getDoc(doc(db, 'bookings', bookingId));
        const freshBookingData = freshBookingSnap.data();

        if (freshBookingData) {
          const customerName = `${freshBookingData?.customer?.firstName || ''} ${freshBookingData?.customer?.lastName || ''}`.trim() || 'Guest';
          const customerEmail = freshBookingData?.customer?.email || '';
          const travellers = freshBookingData?.travellers || { adults: 0, children: 0, infants: 0 };
          const totalGuests = (travellers.adults || 0) + (travellers.children || 0) + (travellers.infants || 0);

          // Send customer email
          if (customerEmail) {
            const customerEmailHTML = getCustomerEmailHTML({
              name: customerName,
              reference: freshBookingData?.bookingReference || bookingId,
              tourName: itemName,
              date: freshBookingData?.date || 'Flexible',
              guests: totalGuests,
              adults: travellers.adults || 0,
              children: travellers.children || 0,
              infants: travellers.infants || 0,
              price: amount,
              currency: 'USD',
              email: customerEmail,
              phone: freshBookingData?.customer?.phone || '',
              specialRequests: freshBookingData?.specialRequests || '',
            });

            await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: customerEmail,
                subject: `Booking Confirmed! 🎉 - ${freshBookingData?.bookingReference || bookingId}`,
                html: customerEmailHTML,
              }),
            });
          }

          // Send admin email
          const adminEmailHTML = getAdminEmailHTML({
            name: customerName,
            email: customerEmail || 'No email provided',
            phone: freshBookingData?.customer?.phone || 'No phone provided',
            reference: freshBookingData?.bookingReference || bookingId,
            tourName: itemName,
            date: freshBookingData?.date || 'Flexible',
            guests: totalGuests,
            adults: travellers.adults || 0,
            children: travellers.children || 0,
            infants: travellers.infants || 0,
            price: amount,
            currency: 'USD',
            specialRequests: freshBookingData?.specialRequests || '',
          });

          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: 'info@djiboutiexplorer.com',
              subject: `New Booking! 🎉 - ${freshBookingData?.bookingReference || bookingId}`,
              html: adminEmailHTML,
            }),
          });
        }
      }

      toast.success('Payment successful!');
      router.push(`/${validLocale}/booking/confirmation/${bookingId}`);

    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-cream/30 rounded-xl p-6 mb-6">
        <h2 className="font-medium text-nearblack mb-4">
          {isEn ? 'Order Summary' : 'Résumé de la Commande'}
        </h2>
        <div className="flex justify-between py-2 border-b border-cream">
          <span className="text-nearblack/70">{itemName}</span>
          <span className="font-medium text-teal">${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 font-bold text-lg">
          <span>{isEn ? 'Total' : 'Total'}</span>
          <span className="text-teal">${amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="border border-cream rounded-xl p-4">
        <PaymentElement />
      </div>

      {error && (
        <div className="bg-terracotta/10 border border-terracotta/20 rounded-xl p-4">
          <p className="text-sm text-terracotta">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-teal hover:bg-teal/90 text-white py-3.5 rounded-xl font-medium transition-all hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {isEn ? 'Processing...' : 'Traitement...'}
          </>
        ) : (
          `${isEn ? 'Pay' : 'Payer'} $${amount.toFixed(2)}`
        )}
      </button>

      <div className="text-center text-xs text-nearblack/40 space-y-1">
        <p>{isEn ? 'Your payment is encrypted and secure.' : 'Votre paiement est crypté et sécurisé.'}</p>
      </div>
    </form>
  );
}

export default function CheckoutPage({ params }: Props) {
  const { locale } = use(params);
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [itemName, setItemName] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isEn = validLocale === 'en';

  useEffect(() => {
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const name = searchParams.get('name') || 'Tour';
    const price = parseFloat(searchParams.get('price') || '0');

    if (!type || !id || !price) {
      toast.error('Missing payment information');
      router.push(`/${validLocale}`);
      return;
    }

    setItemName(name);
    setAmount(price);
    setBookingId(id);
  }, [searchParams, router, validLocale]);

  useEffect(() => {
    if (!amount || !bookingId) return;

    const initializePayment = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount,
            currency: 'usd',
            type: 'tour',
            metadata: {
              bookingId: bookingId,
              customerName: 'Customer',
              customerEmail: 'customer@email.com',
            },
            description: itemName,
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment intent');
        }

        if (!data.clientSecret) {
          throw new Error('No client secret returned');
        }

        setClientSecret(data.clientSecret);
      } catch (error: any) {
        console.error('Payment initialization error:', error);
        setError(error.message || 'Failed to initialize payment');
        toast.error(error.message || 'Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [amount, bookingId, itemName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading payment...</p>
        </div>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="min-h-screen bg-cream py-12">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-cream p-8 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h1 className="text-xl font-heading text-teal mb-2">
              {isEn ? 'Payment Error' : 'Erreur de Paiement'}
            </h1>
            <p className="text-nearblack/60">{error || 'Something went wrong. Please try again.'}</p>
            <Link
              href={`/${validLocale}/booking/${searchParams.get('tourSlug') || ''}`}
              className="inline-block mt-4 text-teal hover:text-terracotta transition-colors"
            >
              {isEn ? '← Back to Booking' : '← Retour à la Réservation'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container-custom max-w-2xl mx-auto">
        <Link
          href={`/${validLocale}/booking/${searchParams.get('tourSlug') || ''}`}
          className="inline-flex items-center gap-2 text-nearblack/60 hover:text-teal transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {isEn ? 'Back to Booking' : 'Retour à la Réservation'}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-cream p-8">
          <h1 className="text-2xl font-heading text-teal mb-6">
            {isEn ? 'Checkout' : 'Paiement'}
          </h1>

          <Elements
            stripe={getStripe()}
            options={{
              clientSecret: clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#1E3D47',
                  colorBackground: '#ffffff',
                  colorText: '#141414',
                  borderRadius: '12px',
                },
              },
            }}
          >
            <CheckoutForm
              bookingId={bookingId}
              amount={amount}
              itemName={itemName}
              validLocale={validLocale}
              clientSecret={clientSecret}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}