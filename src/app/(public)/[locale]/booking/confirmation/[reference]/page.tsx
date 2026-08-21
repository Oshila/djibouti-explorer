'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import Link from 'next/link';

interface Props {
  params: Promise<{
    locale: Locale;
    reference: string;
  }>;
}

interface BookingData {
  id: string;
  tourId?: string;
  tourName?: string;
  totalAmount?: number;
  depositAmount?: number;
  currency?: string;
  bookingReference?: string;
  travellers?: { adults: number; children: number; infants: number };
  customer?: { firstName: string; lastName: string; email: string; phone: string };
  date?: string;
  paymentStatus?: string;
  [key: string]: any;
}

interface TourData {
  id: string;
  title: { en: string; fr: string };
  price: number;
  depositAmount: number;
  currency: string;
  duration: number;
  maxGroupSize: number;
}

export default function ConfirmationPage({ params }: Props) {
  const { locale, reference } = use(params);
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [tour, setTour] = useState<TourData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Confirmation page loaded');
        console.log('📋 Reference:', reference);
        console.log('🌐 Locale:', validLocale);
        
        // ⭐ Check if reference is valid
        if (!reference) {
          console.error('❌ No reference provided');
          setError('No booking reference provided');
          setLoading(false);
          return;
        }
        
        console.log('🔍 Fetching booking from Firestore...');
        
        const docRef = doc(db, 'bookings', reference);
        const docSnap = await getDoc(docRef);
        
        console.log('📄 Document exists?', docSnap.exists());
        
        if (!docSnap.exists()) {
          console.log('❌ Booking not found in Firestore');
          setError('Booking not found');
          setLoading(false);
          return;
        }
        
        const data = docSnap.data();
        console.log('✅ Booking data:', data);
        
        const bookingData = { id: docSnap.id, ...data } as BookingData;
        setBooking(bookingData);
        
        // ⭐ Fetch tour if tourId exists
        if (bookingData.tourId) {
          console.log('🔍 Fetching tour:', bookingData.tourId);
          const tourRef = doc(db, 'tours', bookingData.tourId);
          const tourSnap = await getDoc(tourRef);
          if (tourSnap.exists()) {
            const tourData = tourSnap.data();
            console.log('✅ Tour found:', tourData);
            setTour({
              id: tourSnap.id,
              title: tourData.title || { en: 'Tour', fr: 'Circuit' },
              price: tourData.price || 0,
              depositAmount: tourData.depositAmount || 0,
              currency: tourData.currency || 'USD',
              duration: tourData.duration || 1,
              maxGroupSize: tourData.maxGroupSize || 8,
            });
          } else {
            console.log('⚠️ Tour not found:', bookingData.tourId);
          }
        }
      } catch (error: any) {
        console.error('❌ Error fetching booking:', error);
        setError(error.message || 'Failed to load booking');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [reference, validLocale]);

  // ⭐ Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading your booking...</p>
        </div>
      </div>
    );
  }

  // ⭐ Show error state
  if (error || !booking) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-cream p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-heading text-teal mb-2">
            {validLocale === 'en' ? 'Booking Not Found' : 'Réservation Non Trouvée'}
          </h1>
          <p className="text-nearblack/60 mb-2">
            {validLocale === 'en' 
              ? 'We could not find your booking. Please check your reference number.' 
              : 'Nous n\'avons pas trouvé votre réservation. Veuillez vérifier votre numéro de référence.'}
          </p>
          <p className="text-sm text-nearblack/40 mb-6">
            {validLocale === 'en' ? 'Reference' : 'Référence'}: <span className="font-mono">{reference}</span>
          </p>
          {error && (
            <p className="text-sm text-terracotta mb-4">Error: {error}</p>
          )}
          <Link
            href={`/${validLocale}`}
            className="inline-block bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            {validLocale === 'en' ? 'Return Home' : 'Retour à l\'Accueil'}
          </Link>
        </div>
      </div>
    );
  }

  const tourData: TourData = tour || {
    id: booking.tourId || 'unknown',
    title: { 
      en: booking.tourName || 'Tour', 
      fr: booking.tourName || 'Circuit' 
    },
    price: booking.totalAmount || 0,
    depositAmount: booking.depositAmount || 0,
    currency: booking.currency || 'USD',
    duration: 1,
    maxGroupSize: 8,
  };

  const safeBooking = {
    ...booking,
    bookingReference: booking?.bookingReference || reference,
    travellers: booking?.travellers || { adults: 1, children: 0, infants: 0 },
    customer: booking?.customer || { firstName: 'Guest', lastName: '', email: '', phone: '' },
    date: booking?.date || null,
    totalAmount: booking?.totalAmount || tourData.price || 0,
    depositAmount: booking?.depositAmount || tourData.depositAmount || 0,
    paymentStatus: booking?.paymentStatus || 'pending',
    tourName: booking?.tourName || tourData.title.en,
  };

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <BookingConfirmation 
            tour={tourData} 
            bookingData={safeBooking} 
            locale={validLocale} 
          />
        </div>
      </div>
    </div>
  );
}