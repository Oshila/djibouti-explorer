import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { SeasonalRecommendations } from '@/components/home/SeasonalRecommendations';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';

interface Props {
  params: {
    locale: Locale;
  };
}

async function getFeaturedTours() {
  try {
    const q = query(
      collection(db, 'tours'),
      where('published', '==', true),
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(3)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const featuredTours = await getFeaturedTours();

  return (
    <>
      <HeroSection locale={validLocale} />
      <FeaturedTours locale={validLocale} tours={featuredTours} />
      <DestinationsGrid locale={validLocale} />
      <WhyChooseUs locale={validLocale} />
      <SeasonalRecommendations locale={validLocale} />
      <CustomerReviews locale={validLocale} />
      <WhatsAppCTA locale={validLocale} />
    </>
  );
}