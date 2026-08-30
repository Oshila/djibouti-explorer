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
import { ArrowLeftIcon, PercentBadgeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { getCustomerEmailHTML, getAdminEmailHTML } from '@/lib/email/templates';
import { generateVisaPDF } from '@/lib/pdf/generateVisaPDF';

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
    .header { background: #1E3D47; margin: -40px -40px 0 -40px; padding: 20px 40px; border-radius: 16px 16px 0 0; }
    .header h2 { color: white; margin: 0; font-size: 20px; }
    .badge { display: inline-block; background: #C0532C; color: white; padding: 4px 14px; border-radius: 20px; font-size: 12px; margin-top: 8px; }
    .section { margin: 20px 0; }
    .section-title { font-size: 16px; font-weight: 600; color: #1E3D47; margin-bottom: 12px; border-bottom: 2px solid #f2e8d4; padding-bottom: 8px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f2e8d4; }
    .row:last-child { border-bottom: none; }
    .label { color: #888; }
    .value { color: #141414; font-weight: 600; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #f2e8d4; margin-top: 20px; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Car Rental Booking</h2>
      <div class="badge">${data.reference}</div>
    </div>
    <div class="section">
      <div class="section-title">Customer Details</div>
      <div class="row"><span class="label">Name</span><span class="value">${data.name}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${data.email}</span></div>
      <div class="row"><span class="label">Phone</span><span class="value">${data.phone}</span></div>
    </div>
    <div class="section">
      <div class="section-title">Car Details</div>
      <div class="row"><span class="label">Vehicle</span><span class="value">${data.carName}</span></div>
      <div class="row"><span class="label">Pickup</span><span class="value">${data.pickupDate}</span></div>
      <div class="row"><span class="label">Return</span><span class="value">${data.returnDate}</span></div>
      <div class="row"><span class="label">Duration</span><span class="value">${data.days} days</span></div>
      <div class="row"><span class="label">Total</span><span class="value"><strong>$${data.totalPrice}</strong></span></div>
      ${data.specialRequests ? `<div class="row"><span class="label">Special Requests</span><span class="value">${data.specialRequests}</span></div>` : ''}
    </div>
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
  <title>Visa Invitation Letter</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f0eb; padding: 40px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { text-align: center; border-bottom: 2px solid #f2e8d4; padding-bottom: 20px; margin-bottom: 24px; }
    .logo { font-size: 24px; font-weight: bold; color: #1E3D47; }
    .logo span { color: #C0532C; }
    .badge { background: #72803A; color: white; padding: 4px 16px; border-radius: 20px; font-size: 12px; display: inline-block; margin-top: 8px; }
    .greeting { font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px; }
    .details { background: #f8f4ec; padding: 20px; border-radius: 12px; margin: 20px 0; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e8e0d4; }
    .row:last-child { border-bottom: none; }
    .label { color: #888; font-size: 14px; }
    .value { color: #141414; font-weight: 600; font-size: 14px; text-align: right; }
    .pdf-note { background: #f0f7f4; padding: 16px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #72803A; }
    .pdf-note p { margin: 0; }
    .pdf-note .title { font-weight: 600; color: #333; font-size: 14px; }
    .pdf-note .desc { color: #666; font-size: 13px; margin-top: 4px; }
    .whatsapp-btn { display: inline-block; background: #25D366; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; }
    .whatsapp-btn:hover { background: #128C7E; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #f2e8d4; color: #999; font-size: 14px; margin-top: 24px; }
    .footer a { color: #1E3D47; text-decoration: none; }
    .text-center { text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Djibouti <span>Explorer</span></div>
      <div class="badge">VISA INVITATION LETTER</div>
    </div>
    <div class="greeting">
      ${isEn ? `Dear <strong>${data.name}</strong>,` : `Cher/Chère <strong>${data.name}</strong>,`}
    </div>
    <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
      ${isEn 
        ? `Thank you for purchasing your visa invitation letter. Please find your official invitation letter attached to this email.` 
        : `Merci d'avoir acheté votre lettre d'invitation visa. Veuillez trouver votre lettre d'invitation officielle en pièce jointe à cet email.`}
    </p>
    <div class="details">
      <div class="row">
        <span class="label">${isEn ? 'Reference' : 'Référence'} :</span>
        <span class="value">${data.reference || 'N/A'}</span>
      </div>
      <div class="row">
        <span class="label">${isEn ? 'Full Name' : 'Nom Complet'} :</span>
        <span class="value">${data.fullName}</span>
      </div>
      <div class="row">
        <span class="label">${isEn ? 'Passport Number' : 'Numéro de Passeport'} :</span>
        <span class="value">${data.passportNumber}</span>
      </div>
      <div class="row">
        <span class="label">${isEn ? 'Arrival Date' : "Date d'Arrivée"} :</span>
        <span class="value">${data.arrivalDate}</span>
      </div>
      <div class="row">
        <span class="label">${isEn ? 'Departure Date' : 'Date de Départ'} :</span>
        <span class="value">${data.departureDate}</span>
      </div>
    </div>
    <div class="pdf-note">
      <p class="title">PDF Attached</p>
      <p class="desc">
        ${isEn 
          ? 'Your official visa invitation letter is attached to this email. Please print it and present it with your visa application.' 
          : 'Votre lettre d\'invitation visa officielle est jointe à cet email. Veuillez l\'imprimer et la présenter avec votre demande de visa.'}
      </p>
    </div>
    <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
      ${isEn 
        ? 'If you have any questions, please contact us on WhatsApp or reply to this email.' 
        : 'Si vous avez des questions, veuillez nous contacter sur WhatsApp ou répondre à cet email.'}
    </p>
    <div class="text-center" style="margin: 24px 0;">
      <a href="https://wa.me/25377862639" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
        Chat on WhatsApp
      </a>
    </div>
    <div class="footer">
      <p style="margin: 0;">${isEn ? 'Thank you for choosing Djibouti Explorer!' : 'Merci d\'avoir choisi Djibouti Explorer !'}</p>
      <p style="margin: 4px 0 0 0; font-size: 12px;">
        <a href="mailto:info@djiboutiexplorer.com" style="color: #1E3D47; text-decoration: none;">info@djiboutiexplorer.com</a>
      </p>
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
    .header { background: #1E3D47; margin: -40px -40px 0 -40px; padding: 20px 40px; border-radius: 16px 16px 0 0; }
    .header h2 { color: white; margin: 0; font-size: 20px; }
    .badge { display: inline-block; background: #C0532C; color: white; padding: 4px 14px; border-radius: 20px; font-size: 12px; margin-top: 8px; }
    .section { margin: 20px 0; }
    .section-title { font-size: 16px; font-weight: 600; color: #1E3D47; margin-bottom: 12px; border-bottom: 2px solid #f2e8d4; padding-bottom: 8px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f2e8d4; }
    .row:last-child { border-bottom: none; }
    .label { color: #888; }
    .value { color: #141414; font-weight: 600; }
    .pdf-note { background: #f0f7f4; padding: 12px 16px; border-radius: 8px; margin-top: 12px; border-left: 4px solid #72803A; }
    .pdf-note p { margin: 0; font-size: 13px; color: #333; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #f2e8d4; margin-top: 20px; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Visa Request</h2>
      <div class="badge">${data.reference || 'PENDING'}</div>
    </div>
    <div class="section">
      <div class="section-title">Applicant Details</div>
      <div class="row"><span class="label">Full Name</span><span class="value">${data.fullName}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${data.email}</span></div>
      <div class="row"><span class="label">Phone</span><span class="value">${data.phone}</span></div>
    </div>
    <div class="section">
      <div class="section-title">Visa Details</div>
      <div class="row"><span class="label">Passport Number</span><span class="value">${data.passportNumber}</span></div>
      <div class="row"><span class="label">Nationality</span><span class="value">${data.nationality}</span></div>
      <div class="row"><span class="label">Arrival Date</span><span class="value">${data.arrivalDate}</span></div>
      <div class="row"><span class="label">Departure Date</span><span class="value">${data.departureDate}</span></div>
      <div class="row"><span class="label">Total</span><span class="value"><strong>$${data.totalPrice}</strong></span></div>
    </div>
    <div class="pdf-note">
      <p>PDF invitation letter has been sent to the customer.</p>
    </div>
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
  const searchParams = useSearchParams();

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
          console.log('Booking data fetched:', docSnap.data());
        } else {
          console.log('No booking found for ID:', bookingId, 'type:', bookingType);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    }
    fetchBooking();
  }, [bookingId, bookingType]);

  // Get discount info from URL params
  const discountParam = searchParams.get('discount');
  const fullPriceParam = searchParams.get('fullPrice');
  const discountAmount = discountParam ? parseFloat(discountParam) : 0;
  const fullPrice = fullPriceParam ? parseFloat(fullPriceParam) : amount;
  const hasDiscount = discountAmount > 0;

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

        await updateDoc(doc(db, collectionName, bookingId), {
          paymentStatus: 'paid',
          paymentIntentId: paymentIntent.id,
          updatedAt: new Date().toISOString(),
        });

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
        console.log('Sending emails for:', bookingType);

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
            reference: bookingData?.bookingReference || bookingId.slice(0, 8),
          });
          customerSubject = `Visa Request Confirmed - ${bookingId.slice(0, 8)}`;
        }

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
          console.log('Customer email sent to:', customerEmail);
        }

        // ============================================
        // SEND ADMIN EMAIL
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

        if (adminHTML) {
          console.log('Sending admin email:', adminSubject);
          
          // Send to multiple admin emails
          const adminRecipients = ['info@djiboutiexplorer.com', 'similoluwa1100@gmail.com'];
          
          for (const adminEmail of adminRecipients) {
            const adminResponse = await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: adminEmail,
                subject: adminSubject,
                html: adminHTML,
              }),
            });

            if (adminResponse.ok) {
              console.log('Admin email sent to:', adminEmail);
            } else {
              const errorText = await adminResponse.text();
              console.error('Admin email failed for:', adminEmail, errorText);
            }
          }
        }

        // ============================================
        // VISA PDF GENERATION
        // ============================================
        if (bookingType === 'visa' && bookingData) {
          try {
            console.log('Generating Visa PDF for:', bookingData.fullName);

            const pdfResponse = await fetch('/api/generate-visa-pdf', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                fullName: bookingData.fullName || '',
                passportNumber: bookingData.passportNumber || '',
                nationality: bookingData.nationality || '',
                arrivalDate: bookingData.arrivalDate || '',
                departureDate: bookingData.departureDate || '',
                reference: bookingId.slice(0, 8),
                createdAt: new Date().toISOString(),
              }),
            });

            const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer());
            const pdfBase64 = pdfBuffer.toString('base64');

            const visaPDFResponse = await fetch('/api/send-email-with-pdf', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: customerEmail,
                subject: `Visa Invitation Letter - ${bookingId.slice(0, 8)}`,
                html: customerHTML,
                pdfAttachment: {
                  filename: `visa-invitation-${bookingId.slice(0, 8)}.pdf`,
                  content: pdfBase64,
                },
              }),
            });

            if (visaPDFResponse.ok) {
              console.log('Visa invitation PDF sent to:', customerEmail);
            } else {
              console.error('Failed to send visa PDF');
            }
          } catch (pdfError) {
            console.error('PDF generation error:', pdfError);
          }
        }
      }

      toast.success('Payment successful!');

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
          {isEn ? 'Order Summary' : 'Resume de la Commande'}
        </h2>
        
        {/* Item name */}
        <div className="flex justify-between py-2 border-b border-cream">
          <span className="text-nearblack/70">{itemName}</span>
          <span className="font-medium text-teal">${amount.toFixed(2)}</span>
        </div>
        
        {/* Original price (if discount applied) */}
        {hasDiscount && fullPrice > amount && (
          <div className="flex justify-between py-2 border-b border-cream text-sm text-nearblack/50">
            <span>{isEn ? 'Original Price' : 'Prix Original'}</span>
            <span className="line-through">${fullPrice.toFixed(2)}</span>
          </div>
        )}
        
        {/* Discount (if applied) */}
        {hasDiscount && (
          <div className="flex justify-between py-2 border-b border-cream text-olive font-medium">
            <span className="flex items-center gap-1">
              <PercentBadgeIcon className="w-4 h-4" />
              {isEn ? 'Group Discount (15%)' : 'Reduction Groupe (15%)'}
            </span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        
        {/* Total */}
        <div className="flex justify-between py-2 font-bold text-lg">
          <span>{isEn ? 'Total' : 'Total'}</span>
          <span className="text-teal">${amount.toFixed(2)}</span>
        </div>
        
        {/* Savings message */}
        {hasDiscount && (
          <div className="text-xs text-olive font-medium text-right mt-1">
            {isEn ? `You saved $${discountAmount.toFixed(2)}` : `Vous avez economise $${discountAmount.toFixed(2)}`}
          </div>
        )}
        
        <div className="text-xs text-nearblack/40 mt-2 flex items-center gap-1">
          <LockClosedIcon className="w-3 h-3" />
          {isEn ? 'Secure payment powered by Stripe' : 'Paiement securise par Stripe'}
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
        <p>{isEn ? 'Your payment is encrypted and secure.' : 'Votre paiement est crypte et securise.'}</p>
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

    console.log('Checkout params:', { type, id, name, price });

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

        console.log('Creating payment intent for:', { amount, bookingId, bookingType });

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

        console.log('Payment intent response:', data);

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