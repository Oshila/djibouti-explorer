import { Locale } from '@/types';
import { adminDb } from '@/lib/firebase/admin';
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

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getTours() {
  try {
    console.log('🔄 Server: Fetching tours from Firebase Admin...');
    console.log('📁 Project:', process.env.FIREBASE_PROJECT_ID);
    
    const snapshot = await adminDb.collection('tours')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();
    
    const tours = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    console.log(`✅ Server: Found ${tours.length} tours`);
    return tours;
  } catch (error) {
    console.error('❌ Server: Error fetching tours:', error);
    return [];
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const tours = await getTours();
  
  console.log(`📊 Rendering home page with ${tours.length} tours`);

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