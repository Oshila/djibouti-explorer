'use client';

import { useState, useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { use } from 'react';
import { getStripe } from '@/lib/stripe/client';
import { db } from '@/lib/firebase/client';
import { doc, updateDoc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { getCustomerEmailHTML, getAdminEmailHTML } from '@/lib/email/templates';

type Props = {
  params: Promise<{ locale: string }>;
};

// ============================================
// CAR EMAIL TEMPLATES
// ============================================
function getCarCustomerEmailHTML(data: any) {
  const isEn = data.locale === 'en';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Car Rental Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f0eb; padding: 40px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; }
    .header { text-align: center; border-bottom: 2px solid #f2e8d4; padding-bottom: 20px; }
    .logo { font-size: 24px; font-weight: bold; color: #1E3D47; }
    .logo span { color: #C0532C; }
    .badge { background: #72803A; color: white; padding: 4px 16px; border-radius: 20px; font-size: 12px; display: inline-block; }
    .details { background: #f8f4ec; padding: 20px; border-radius: 12px; margin: 20px 0; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e8e0d4; }
    .row:last-child { border-bottom: none; font-weight: bold; font-size: 18px; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #f2e8d4; color: #999; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Djibouti <span>Explorer</span></div>
      <div class="badge">CAR RENTAL CONFIRMED</div>
    </div>
    <h2 style="color: #1E3D47;">${isEn ? 'Car Rental Confirmed!' : 'Location de Voiture Confirmée!'}</h2>
    <p>${isEn ? `Hi ${data.name}, your car rental is confirmed.` : `Bonjour ${data.name}, votre location de voiture est confirmée.`}</p>
    <div class="details">
      <div class="row"><span>${isEn ? 'Reference' : 'Référence'}</span><span><strong>${data.reference}</strong></span></div>
      <div class="row"><span>${isEn ? 'Vehicle' : 'Véhicule'}</span><span><strong>${data.carName}</strong></span></div>
      <div class="row"><span>${isEn ? 'Pickup Date' : 'Date de Prise en Charge'}</span><span>${data.pickupDate}</span></div>
      <div class="row"><span>${isEn ? 'Return Date' : 'Date de Retour'}</span><span>${data.returnDate}</span></div>
      <div class="row"><span>${isEn ? 'Duration' : 'Durée'}</span><span>${data.days} ${isEn ? 'days' : 'jours'}</span></div>
      <div class="row"><span>${isEn ? 'Total Paid' : 'Total Payé'}</span><span><strong>$${data.totalPrice}</strong></span></div>
    </div>
    <p style="text-align: center; color: #666;">${isEn ? 'A professional driver will be provided for your rental.' : 'Un chauffeur professionnel sera fourni pour votre location.'}</p>
    <div class="footer">
      <p>${isEn ? 'Thank you for choosing Djibouti Explorer!' : 'Merci d\'avoir choisi Djibouti Explorer!'}</p>
      <p><a href="mailto:info@djiboutiexplorer.com">info@djiboutiexplorer.com</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

function getCarAdminEmailHTML(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Car Rental Booking</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f0eb; padding: 40px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; }
    .header { border-bottom: 2px solid #f2e8d4; padding-bottom: 20px; }
    .badge { background: #C0532C; color: white; padding: 4px 16px; border-radius: 20px; font-size: 12px; display: inline-block; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f2e8d4; }
    .row:last-child { border-bottom: none; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #f2e8d4; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="color: #1E3D47;">New Car Rental Booking</h2>
      <div class="badge">${data.reference}</div>
    </div>
    <h3>Customer Details</h3>
    <div class="row"><span><strong>Name:</strong></span> <span>${data.name}</span></div>
    <div class="row"><span><strong>Email:</strong></span> <span>${data.email}</span></div>
    <div class="row"><span><strong>Phone:</strong></span> <span>${data.phone}</span></div>
    <h3>Car Details</h3>
    <div class="row"><span><strong>Vehicle:</strong></span> <span>${data.carName}</span></div>
    <div class="row"><span><strong>Pickup:</strong></span> <span>${data.pickupDate}</span></div>
    <div class="row"><span><strong>Return:</strong></span> <span>${data.returnDate}</span></div>
    <div class="row"><span><strong>Duration:</strong></span> <span>${data.days} days</span></div>
    <div class="row"><span><strong>Total:</strong></span> <span><strong>$${data.totalPrice}</strong></span></div>
    ${data.specialRequests ? `<p><strong>Special Requests:</strong> ${data.specialRequests}</p>` : ''}
    <div class="footer">Djibouti Explorer • ${new Date().getFullYear()}</div>
  </div>
</body>
</html>
  `;
}

// ============================================
// VISA EMAIL TEMPLATES
// ============================================
function getVisaCustomerEmailHTML(data: any) {
  const isEn = data.locale === 'en';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Visa Invitation Letter Request</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f0eb; padding: 40px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; }
    .header { text-align: center; border-bottom: 2px solid #f2e8d4; padding-bottom: 20px; }
    .logo { font-size: 24px; font-weight: bold; color: #1E3D47; }
    .logo span { color: #C0532C; }
    .badge { background: #72803A; color: white; padding: 4px 16px; border-radius: 20px; font-size: 12px; display: inline-block; }
    .details { background: #f8f4ec; padding: 20px; border-radius: 12px; margin: 20px 0; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e8e0d4; }
    .row:last-child { border-bottom: none; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #f2e8d4; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Djibouti <span>Explorer</span></div>
      <div class="badge">VISA REQUEST CONFIRMED</div>
    </div>
    <h2 style="color: #1E3D47;">${isEn ? 'Visa Invitation Letter Request Received!' : 'Demande de Lettre d\'Invitation Visa Reçue!'}</h2>
    <p>${isEn ? `Hi ${data.name}, your visa invitation letter request has been received.` : `Bonjour ${data.name}, votre demande de lettre d'invitation visa a été reçue.`}</p>
    <div class="details">
      <div class="row"><span>${isEn ? 'Full Name' : 'Nom Complet'}</span><span><strong>${data.fullName}</strong></span></div>
      <div class="row"><span>${isEn ? 'Passport Number' : 'Numéro de Passeport'}</span><span><strong>${data.passportNumber}</strong></span></div>
      <div class="row"><span>${isEn ? 'Nationality' : 'Nationalité'}</span><span>${data.nationality}</span></div>
      <div class="row"><span>${isEn ? 'Arrival Date' : "Date d'Arrivée"}</span><span>${data.arrivalDate}</span></div>
      <div class="row"><span>${isEn ? 'Departure Date' : 'Date de Départ'}</span><span>${data.departureDate}</span></div>
      <div class="row"><span>${isEn ? 'Total Paid' : 'Total Payé'}</span><span><strong>$${data.totalPrice}</strong></span></div>
    </div>
    <p style="text-align: center; color: #666;">${isEn ? 'Our team will process your request within 24-48 hours.' : 'Notre équipe traitera votre demande sous 24-48 heures.'}</p>
    <div class="footer">
      <p><a href="mailto:info@djiboutiexplorer.com">info@djiboutiexplorer.com</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

function getVisaAdminEmailHTML(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Visa Request</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f0eb; padding: 40px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; }
    .header { border-bottom: 2px solid #f2e8d4; padding-bottom: 20px; }
    .badge { background: #C0532C; color: white; padding: 4px 16px; border-radius: 20px; font-size: 12px; display: inline-block; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f2e8d4; }
    .row:last-child { border-bottom: none; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #f2e8d4; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="color: #1E3D47;">New Visa Request</h2>
      <div class="badge">${data.reference || 'PENDING'}</div>
    </div>
    <h3>Applicant Details</h3>
    <div class="row"><span><strong>Name:</strong></span> <span>${data.fullName}</span></div>
    <div class="row"><span><strong>Email:</strong></span> <span>${data.email}</span></div>
    <div class="row"><span><strong>Phone:</strong></span> <span>${data.phone}</span></div>
    <h3>Visa Details</h3>
    <div class="row"><span><strong>Passport:</strong></span> <span>${data.passportNumber}</span></div>
    <div class="row"><span><strong>Nationality:</strong></span> <span>${data.nationality}</span></div>
    <div class="row"><span><strong>Arrival:</strong></span> <span>${data.arrivalDate}</span></div>
    <div class="row"><span><strong>Departure:</strong></span> <span>${data.departureDate}</span></div>
    <div class="row"><span><strong>Total:</strong></span> <span><strong>$${data.totalPrice}</strong></span></div>
    <div class="footer">Djibouti Explorer • ${new Date().getFullYear()}</div>
  </div>
</body>
</html>
  `;
}

// ============================================
// CHECKOUT FORM
// ============================================
function CheckoutForm({ bookingId, amount, itemName, validLocale, bookingType }: any) {
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
        let docSnap;
        if (bookingType === 'car') {
          docSnap = await getDoc(doc(db, 'carBookings', bookingId));
        } else if (bookingType === 'visa') {
          docSnap = await getDoc(doc(db, 'visaRequests', bookingId));
        } else {
          docSnap = await getDoc(doc(db, 'bookings', bookingId));
        }
        if (docSnap?.exists()) {
          setBookingData(docSnap.data());
          console.log('✅ Booking data fetched:', docSnap.data());
        } else {
          console.log('❌ No booking found for ID:', bookingId, 'type:', bookingType);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    }
    fetchBooking();
  }, [bookingId, bookingType]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
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
          return_url: `${window.location.origin}/${validLocale}/checkout/success`,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        throw new Error(submitError.message);
      }

      if (bookingId && paymentIntent) {
        let collectionName = 'bookings';
        if (bookingType === 'car') collectionName = 'carBookings';
        else if (bookingType === 'visa') collectionName = 'visaRequests';
        
        // Update booking status
        await updateDoc(doc(db, collectionName, bookingId), {
          paymentStatus: 'paid',
          paymentIntentId: paymentIntent.id,
          updatedAt: new Date().toISOString(),
        });

        // Save payment to payments collection
        await addDoc(collection(db, 'payments'), {
          bookingId: bookingId,
          paymentIntentId: paymentIntent.id,
          amount: amount,
          currency: 'usd',
          status: paymentIntent.status || 'succeeded',
          type: bookingType || 'tour',
          metadata: {
            bookingId: bookingId,
            customerName: bookingData?.customer?.firstName + ' ' + bookingData?.customer?.lastName || 
                         bookingData?.fullName || 'Customer',
            customerEmail: bookingData?.customer?.email || bookingData?.email || '',
          },
          customerEmail: bookingData?.customer?.email || bookingData?.email || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        const customerEmail = bookingData?.customer?.email || bookingData?.email || '';
        console.log('📧 Sending emails for:', bookingType);

        // ============================================
        // SEND CUSTOMER EMAIL
        // ============================================
        let customerHTML = '';
        let customerSubject = '';

        if (bookingType === 'tour') {
          const customerName = `${bookingData?.customer?.firstName || ''} ${bookingData?.customer?.lastName || ''}`.trim() || 'Guest';
          const travellers = bookingData?.travellers || { adults: 0, children: 0, infants: 0 };
          const totalGuests = (travellers.adults || 0) + (travellers.children || 0) + (travellers.infants || 0);

          customerHTML = getCustomerEmailHTML({
            name: customerName,
            reference: bookingData?.bookingReference || bookingId,
            tourName: itemName,
            date: bookingData?.date || 'Flexible',
            guests: totalGuests,
            adults: travellers.adults || 0,
            children: travellers.children || 0,
            infants: travellers.infants || 0,
            price: amount,
            currency: 'USD',
            email: customerEmail,
            phone: bookingData?.customer?.phone || '',
            specialRequests: bookingData?.specialRequests || '',
          });
          customerSubject = `Booking Confirmed - ${bookingData?.bookingReference || bookingId}`;
        } else if (bookingType === 'car') {
          const customerName = `${bookingData?.customer?.firstName || ''} ${bookingData?.customer?.lastName || ''}`.trim() || 'Guest';
          customerHTML = getCarCustomerEmailHTML({
            name: customerName,
            reference: bookingData?.bookingReference || bookingId,
            carName: bookingData?.carName || itemName,
            pickupDate: bookingData?.pickupDate || 'Flexible',
            returnDate: bookingData?.returnDate || 'Flexible',
            days: bookingData?.totalDays || 1,
            totalPrice: amount,
            locale: validLocale,
          });
          customerSubject = `Car Rental Confirmed - ${bookingData?.bookingReference || bookingId}`;
        } else if (bookingType === 'visa') {
          customerHTML = getVisaCustomerEmailHTML({
            name: bookingData?.fullName || 'Guest',
            fullName: bookingData?.fullName || '',
            passportNumber: bookingData?.passportNumber || '',
            nationality: bookingData?.nationality || '',
            arrivalDate: bookingData?.arrivalDate || '',
            departureDate: bookingData?.departureDate || '',
            totalPrice: amount,
            locale: validLocale,
          });
          customerSubject = `Visa Request Confirmed - ${bookingId.slice(0, 8)}`;
        }

        // Send customer email
        if (customerHTML && customerEmail) {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: customerEmail,
              subject: customerSubject,
              html: customerHTML,
            }),
          });
          console.log('✅ Customer email sent to:', customerEmail);
        }

        // ============================================
        // SEND ADMIN EMAIL (ALWAYS!)
        // ============================================
        let adminHTML = '';
        let adminSubject = '';

        if (bookingType === 'tour') {
          const customerName = `${bookingData?.customer?.firstName || ''} ${bookingData?.customer?.lastName || ''}`.trim() || 'Guest';
          const travellers = bookingData?.travellers || { adults: 0, children: 0, infants: 0 };
          const totalGuests = (travellers.adults || 0) + (travellers.children || 0) + (travellers.infants || 0);

          adminHTML = getAdminEmailHTML({
            name: customerName,
            email: customerEmail || 'No email provided',
            phone: bookingData?.customer?.phone || 'No phone provided',
            reference: bookingData?.bookingReference || bookingId,
            tourName: itemName,
            date: bookingData?.date || 'Flexible',
            guests: totalGuests,
            adults: travellers.adults || 0,
            children: travellers.children || 0,
            infants: travellers.infants || 0,
            price: amount,
            currency: 'USD',
            specialRequests: bookingData?.specialRequests || '',
          });
          adminSubject = `New Tour Booking - ${bookingData?.bookingReference || bookingId}`;
        } else if (bookingType === 'car') {
          const customerName = `${bookingData?.customer?.firstName || ''} ${bookingData?.customer?.lastName || ''}`.trim() || 'Guest';
          adminHTML = getCarAdminEmailHTML({
            name: customerName,
            email: customerEmail || 'No email provided',
            phone: bookingData?.customer?.phone || 'No phone provided',
            reference: bookingData?.bookingReference || bookingId,
            carName: bookingData?.carName || itemName,
            pickupDate: bookingData?.pickupDate || 'Flexible',
            returnDate: bookingData?.returnDate || 'Flexible',
            days: bookingData?.totalDays || 1,
            totalPrice: amount,
            specialRequests: bookingData?.specialRequests || '',
          });
          adminSubject = `New Car Rental - ${bookingData?.bookingReference || bookingId}`;
        } else if (bookingType === 'visa') {
          adminHTML = getVisaAdminEmailHTML({
            fullName: bookingData?.fullName || '',
            email: customerEmail || 'No email provided',
            phone: bookingData?.phone || 'No phone provided',
            passportNumber: bookingData?.passportNumber || '',
            nationality: bookingData?.nationality || '',
            arrivalDate: bookingData?.arrivalDate || '',
            departureDate: bookingData?.departureDate || '',
            totalPrice: amount,
            reference: bookingId.slice(0, 8),
          });
          adminSubject = `New Visa Request - ${bookingId.slice(0, 8)}`;
        }

        // ⭐ ALWAYS SEND ADMIN EMAIL
        if (adminHTML) {
          console.log('📧 Sending admin email:', adminSubject);
          const adminResponse = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: 'info@djiboutiexplorer.com',
              subject: adminSubject,
              html: adminHTML,
            }),
          });

          if (adminResponse.ok) {
            console.log('✅ Admin email sent successfully');
          } else {
            const errorText = await adminResponse.text();
            console.error('❌ Admin email failed:', errorText);
          }
        }
      }

      toast.success('Payment successful!');
      
      // Redirect based on booking type
      if (bookingType === 'car') {
        router.push(`/${validLocale}/cars`);
      } else if (bookingType === 'visa') {
        router.push(`/${validLocale}/visa`);
      } else {
        router.push(`/${validLocale}/booking/confirmation/${bookingId}`);
      }

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

// ============================================
// MAIN CHECKOUT PAGE
// ============================================
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
  const [bookingType, setBookingType] = useState<string>('tour');
  const [error, setError] = useState<string | null>(null);

  const isEn = validLocale === 'en';

  useEffect(() => {
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const name = searchParams.get('name') || 'Tour';
    const price = parseFloat(searchParams.get('price') || '0');

    console.log('🔍 Checkout params:', { type, id, name, price });

    if (!type || !id || !price) {
      toast.error('Missing payment information');
      router.push(`/${validLocale}`);
      return;
    }

    setItemName(name);
    setAmount(price);
    setBookingId(id);
    setBookingType(type);
  }, [searchParams, router, validLocale]);

  useEffect(() => {
    if (!amount || !bookingId) return;

    const initializePayment = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('💳 Creating payment intent for:', { amount, bookingId, bookingType });
        
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount,
            currency: 'usd',
            type: bookingType,
            metadata: {
              bookingId: bookingId,
              customerName: 'Customer',
              customerEmail: 'customer@email.com',
            },
            description: itemName,
          }),
        });

        const data = await response.json();
        
        console.log('📨 Payment intent response:', data);
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment intent');
        }

        if (!data.clientSecret) {
          throw new Error('No client secret returned');
        }

        setClientSecret(data.clientSecret);
      } catch (error: any) {
        console.error('❌ Payment initialization error:', error);
        setError(error.message || 'Failed to initialize payment');
        toast.error(error.message || 'Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [amount, bookingId, bookingType, itemName]);

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
              {isEn ? 'Back to Booking' : 'Retour à la Réservation'}
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
              bookingType={bookingType}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}