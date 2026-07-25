'use client';

import { useState, useEffect, use } from 'react';  // ← Add 'use' import
import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedToursCarousel } from '@/components/home/FeaturedToursCarousel';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { SeasonalRecommendations } from '@/components/home/SeasonalRecommendations';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { GoogleMap } from '@/components/home/GoogleMap';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';

interface Props {
  params: Promise<{  // ← Change to Promise
    locale: Locale;
  }>;
}

export default function HomePage({ params }: Props) {
  // Unwrap the params Promise using React.use()
  const { locale } = use(params);
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        console.log('🔄 Fetching tours from Firebase...');
        const q = query(
          collection(db, 'tours'),
          orderBy('createdAt', 'desc'),
          limit(20)
        );
        const snapshot = await getDocs(q);
        const tourData = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        console.log('✅ Fetched tours:', tourData.length);
        setTours(tourData);
      } catch (err) {
        console.error('❌ Error fetching tours:', err);
        setError('Failed to load tours');
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection locale={validLocale} />
      <FeaturedToursCarousel locale={validLocale} tours={tours} />
      <GoogleMap locale={validLocale} />
      <DestinationsGrid locale={validLocale} />
      <WhyChooseUs locale={validLocale} />
      <SeasonalRecommendations locale={validLocale} />
      <CustomerReviews locale={validLocale} />
      <WhatsAppCTA locale={validLocale} />
    </>
  );
}