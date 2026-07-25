'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { collection, getDocs, limit } from 'firebase/firestore';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedToursCarousel } from '@/components/home/FeaturedToursCarousel';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { SeasonalRecommendations } from '@/components/home/SeasonalRecommendations';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { GoogleMap } from '@/components/home/GoogleMap';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';

interface Props {
  params: Promise<{
    locale: Locale;
  }>;
}

interface Tour {
  id: string;
  title: { en: string; fr: string };
  slug: { en: string; fr: string };
  price: number;
  depositAmount: number;
  currency: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  minAge: number;
  meetingPoint: { en: string; fr: string };
  images: { primary: string; gallery: string[] };
  highlights: { en: string[]; fr: string[] };
  itinerary: any[];
  included: { en: string[]; fr: string[] };
  excluded: { en: string[]; fr: string[] };
  whatToBring: { en: string[]; fr: string[] };
  accommodation: { en: string; fr: string };
  transportation: { en: string; fr: string };
  cancellationPolicy: { en: string; fr: string };
  faqs: any[];
  itineraryPdfUrl: { en: string; fr: string };
  bestSeasons: string[];
  categories: string[];
  tags: string[];
  metaTitle: { en: string; fr: string };
  metaDescription: { en: string; fr: string };
  rating: number;
  reviewCount: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTours() {
      try {
        console.log('🔄 Client: Fetching tours from Firebase...');
        
        // Get all tours (no filters)
        const querySnapshot = await getDocs(collection(db, 'tours'));
        
        const tourData: Tour[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || { en: '', fr: '' },
            slug: data.slug || { en: '', fr: '' },
            price: data.price || 0,
            depositAmount: data.depositAmount || 0,
            currency: data.currency || 'USD',
            duration: data.duration || 1,
            maxGroupSize: data.maxGroupSize || 8,
            difficulty: data.difficulty || 'easy',
            minAge: data.minAge || 0,
            meetingPoint: data.meetingPoint || { en: '', fr: '' },
            images: data.images || { primary: '', gallery: [] },
            highlights: data.highlights || { en: [], fr: [] },
            itinerary: data.itinerary || [],
            included: data.included || { en: [], fr: [] },
            excluded: data.excluded || { en: [], fr: [] },
            whatToBring: data.whatToBring || { en: [], fr: [] },
            accommodation: data.accommodation || { en: '', fr: '' },
            transportation: data.transportation || { en: '', fr: '' },
            cancellationPolicy: data.cancellationPolicy || { en: '', fr: '' },
            faqs: data.faqs || [],
            itineraryPdfUrl: data.itineraryPdfUrl || { en: '', fr: '' },
            bestSeasons: data.bestSeasons || [],
            categories: data.categories || [],
            tags: data.tags || [],
            metaTitle: data.metaTitle || { en: '', fr: '' },
            metaDescription: data.metaDescription || { en: '', fr: '' },
            rating: data.rating || 0,
            reviewCount: data.reviewCount || 0,
            featured: data.featured || false,
            published: data.published || false,
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: data.updatedAt || new Date().toISOString(),
          };
        });
        
        // Sort by createdAt (newest first)
        const sortedTours = tourData.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
        
        console.log('✅ Client: Fetched tours:', sortedTours.length);
        setTours(sortedTours);
      } catch (err) {
        console.error('❌ Client: Error fetching tours:', err);
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