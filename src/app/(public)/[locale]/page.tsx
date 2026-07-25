import { Locale } from '@/types';
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

export default async function HomePage({ params }: Props) {
  // Await the params object (needed in Next.js 15+)
  const { locale } = await params;
  
  // Ensure locale is valid
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';

  return (
    <>
      <HeroSection locale={validLocale} />
      <FeaturedTours locale={validLocale} />
      <DestinationsGrid locale={validLocale} />
      <WhyChooseUs locale={validLocale} />
      <SeasonalRecommendations locale={validLocale} />
      <CustomerReviews locale={validLocale} />
      <WhatsAppCTA locale={validLocale} />
    </>
  );
}