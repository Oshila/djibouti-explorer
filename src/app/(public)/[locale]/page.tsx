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

interface Tour {
  id: string;
  createdAt?: string | Date;
  [key: string]: any;
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getTours() {
  try {
    console.log('🔄 Server: Fetching tours from Firebase Admin...');
    
    // Try with ordering first
    try {
      const snapshot = await adminDb.collection('tours')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get();
      
      const tours = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...(doc.data() as Omit<Tour, 'id'>)
      }));
      
      console.log(`✅ Server: Found ${tours.length} tours with ordering`);
      return tours;
    } catch (indexError: any) {
      // If index error, fallback to unordered query
      if (indexError.message?.includes('index')) {
        console.log('⚠️ Index not ready, using fallback query...');
        
        const snapshot = await adminDb.collection('tours')
          .where('published', '==', true)
          .limit(20)
          .get();
        
        const tours = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...(doc.data() as Omit<Tour, 'id'>)
        }));
        
        // Sort in memory
        tours.sort((a, b) => {
          const dateA = (a as any).createdAt ? new Date((a as any).createdAt) : new Date(0);
          const dateB = (b as any).createdAt ? new Date((b as any).createdAt) : new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        
        console.log(`✅ Server: Found ${tours.length} tours with fallback sorting`);
        return tours;
      }
      
      throw indexError;
    }
  } catch (error) {
    console.error('❌ Server: Error fetching tours:', error);
    return [];
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const tours = await getTours();

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