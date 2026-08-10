import { Locale } from '@/types';
import { TourListing } from '@/components/tours/TourListing';

interface Props {
  params: {
    locale: Locale;
  };
  searchParams: {
    search?: string;
    destination?: string;
    duration?: string;
    price?: string;
    category?: string;
  };
}

export default async function ToursPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  const filters = await searchParams;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal/90 via-teal/80 to-teal/70 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/tours-hero-bg.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream/20 to-transparent" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-ochre font-medium text-sm uppercase tracking-wider mb-3">
              {validLocale === 'en' ? 'Explore Our Tours' : 'Explorez Nos Circuits'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-4 leading-tight">
              {validLocale === 'en' ? 'Discover the Best of Djibouti' : 'Découvrez le Meilleur de Djibouti'}
            </h1>
            <p className="text-lg md:text-xl text-cream/90 max-w-2xl">
              {validLocale === 'en' 
                ? 'Handpicked experiences by local experts. From salt lakes to whale sharks, find your perfect adventure.' 
                : 'Des expériences sélectionnées par des experts locaux. Des lacs salés aux requins-baleines, trouvez votre aventure parfaite.'}
            </p>
            {/* Stats */}
            <div className="flex flex-wrap gap-6 md:gap-10 mt-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-ochre">50+</div>
                <div className="text-sm text-cream/70">{validLocale === 'en' ? 'Unique Tours' : 'Circuits Uniques'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-ochre">1000+</div>
                <div className="text-sm text-cream/70">{validLocale === 'en' ? 'Happy Travelers' : 'Voyageurs Satisfaits'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-ochre">4.9★</div>
                <div className="text-sm text-cream/70">{validLocale === 'en' ? 'Average Rating' : 'Note Moyenne'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Listing */}
      <div className="container-custom -mt-8 relative z-20">
        <TourListing locale={validLocale} filters={filters} />
      </div>
    </div>
  );
}