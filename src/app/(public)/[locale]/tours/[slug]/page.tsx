import { Locale } from '@/types';
import TourDetail from '@/components/tours/TourDetail';

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
}

// Mock function to get tour by slug
function getTourBySlug(slug: string, locale: Locale) {
  const mockTours = [
    {
      id: '1',
      title: { en: 'Lake Assal Discovery', fr: 'Découverte du Lac Assal' },
      slug: { en: 'lake-assal-discovery', fr: 'decouverte-lac-assal' },
      shortDescription: { 
        en: 'Visit the lowest point in Africa and swim in the saltiest lake on Earth.',
        fr: 'Visitez le point le plus bas d\'Afrique et nagez dans le lac le plus salé de la Terre.'
      },
      description: { 
        en: 'Embark on an unforgettable journey to Lake Assal, the lowest point in Africa and the saltiest lake on Earth.',
        fr: 'Embarquez pour un voyage inoubliable vers le Lac Assal, le point le plus bas d\'Afrique et le lac le plus salé de la Terre.'
      },
      price: 150,
      depositType: 'percentage',
      depositAmount: 30,
      currency: 'USD',
      duration: 1,
      maxGroupSize: 8,
      difficulty: 'easy' as const,
      minAge: 6,
      destinations: ['Lake Assal'],
      meetingPoint: { 
        en: 'Your hotel in Djibouti City (pickup included)',
        fr: 'Votre hôtel à Djibouti Ville (prise en charge incluse)'
      },
      images: { 
        primary: '/images/lake-assal.jpg',
        gallery: ['/images/lake-assal-1.jpg', '/images/lake-assal-2.jpg'] 
      },
      highlights: { 
        en: ['Swim in the saltiest lake on Earth', 'Visit the lowest point in Africa', 'Explore the Danakil Depression'],
        fr: ['Nagez dans le lac le plus salé de la Terre', 'Visitez le point le plus bas d\'Afrique', 'Explorez la dépression de Danakil']
      },
      itinerary: [
        {
          day: 1,
          title: { 
            en: 'Djibouti City to Lake Assal',
            fr: 'Djibouti Ville au Lac Assal'
          },
          description: { 
            en: 'Early morning departure from your hotel in Djibouti City. Drive through the stunning landscapes of the Danakil Depression.',
            fr: 'Départ tôt le matin de votre hôtel à Djibouti Ville. Traversez les paysages spectaculaires de la dépression de Danakil.'
          }
        }
      ],
      included: { 
        en: ['Hotel pickup and drop-off', 'Professional local guide', 'Entrance fees', 'Picnic lunch'],
        fr: ['Prise en charge et dépôt à l\'hôtel', 'Guide local professionnel', 'Frais d\'entrée', 'Déjeuner pique-nique']
      },
      excluded: { 
        en: ['Tips and gratuities', 'Personal expenses', 'Travel insurance'],
        fr: ['Pourboires', 'Dépenses personnelles', 'Assurance voyage']
      },
      whatToBring: { 
        en: ['Swimsuit', 'Towel', 'Sun cream', 'Hat', 'Camera'],
        fr: ['Maillot de bain', 'Serviette', 'Crème solaire', 'Chapeau', 'Appareil photo']
      },
      accommodation: { 
        en: 'Not included (day trip)',
        fr: 'Non inclus (excursion d\'une journée)'
      },
      transportation: { 
        en: 'Private 4x4 vehicle with air conditioning',
        fr: 'Véhicule 4x4 privé avec climatisation'
      },
      cancellationPolicy: { 
        en: 'Free cancellation up to 24 hours before the tour.',
        fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
      },
      faqs: [
        {
          question: { 
            en: 'How long is the drive to Lake Assal?',
            fr: 'Combien de temps dure le trajet jusqu\'au Lac Assal ?'
          },
          answer: { 
            en: 'The drive takes approximately 2-3 hours.',
            fr: 'Le trajet dure environ 2-3 heures.'
          }
        }
      ],
      itineraryPdfUrl: { 
        en: '/pdfs/lake-assal-discovery-en.pdf',
        fr: '/pdfs/lake-assal-discovery-fr.pdf'
      },
      bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
      categories: ['nature', 'adventure'],
      tags: ['Lake Assal', 'Danakil Depression'],
      metaTitle: { 
        en: 'Lake Assal Discovery Tour | Djibouti Explorer',
        fr: 'Circuit Découverte du Lac Assal | Djibouti Explorer'
      },
      metaDescription: { 
        en: 'Visit the lowest point in Africa and swim in the saltiest lake on Earth.',
        fr: 'Visitez le point le plus bas d\'Afrique et nagez dans le lac le plus salé de la Terre.'
      },
      featured: true,
      published: true,
      rating: 4.9,
      reviewCount: 42,
    },
    {
      id: '2',
      title: { en: 'Whale Shark Adventure', fr: 'Aventure Requin-Baleine' },
      slug: { en: 'whale-shark-adventure', fr: 'aventure-requin-baleine' },
      shortDescription: { 
        en: 'Swim with gentle giants in the crystal-clear waters of the Gulf of Tadjoura.',
        fr: 'Nagez avec les géants des mers dans les eaux cristallines du Golfe de Tadjoura.'
      },
      description: { 
        en: 'Experience the thrill of swimming with whale sharks, the largest fish in the ocean.',
        fr: 'Vivez l\'excitation de nager avec les requins-baleines, les plus grands poissons de l\'océan.'
      },
      price: 250,
      depositType: 'fixed',
      depositAmount: 50,
      currency: 'USD',
      duration: 1,
      maxGroupSize: 10,
      difficulty: 'easy' as const,
      minAge: 8,
      destinations: ['Tadjoura Gulf'],
      meetingPoint: { 
        en: 'Djibouti City Marina',
        fr: 'Marina de Djibouti Ville'
      },
      images: { 
        primary: '/images/whale-shark.jpg',
        gallery: ['/images/whale-shark-1.jpg', '/images/whale-shark-2.jpg'] 
      },
      highlights: { 
        en: ['Swim with whale sharks', 'Professional snorkeling equipment', 'Expert marine guides'],
        fr: ['Nagez avec les requins-baleines', 'Équipement de snorkeling professionnel', 'Guides marins experts']
      },
      itinerary: [
        {
          day: 1,
          title: { 
            en: 'Whale Shark Encounter',
            fr: 'Rencontre avec les Requins-Baleines'
          },
          description: { 
            en: 'Meet at the Djibouti City Marina at 6:00 AM. Board our boat and sail to the whale shark feeding grounds.',
            fr: 'Rendez-vous à la Marina de Djibouti Ville à 6h00. Montez à bord de notre bateau et naviguez vers les zones d\'alimentation des requins-baleines.'
          }
        }
      ],
      included: { 
        en: ['Boat tour', 'Snorkeling equipment', 'Marine biologist guide', 'Breakfast and lunch'],
        fr: ['Tour en bateau', 'Équipement de snorkeling', 'Guide biologiste marin', 'Petit-déjeuner et déjeuner']
      },
      excluded: { 
        en: ['Hotel transfers', 'Tips and gratuities', 'Personal expenses'],
        fr: ['Transferts hôteliers', 'Pourboires', 'Dépenses personnelles']
      },
      whatToBring: { 
        en: ['Swimsuit', 'Towel', 'Sun cream', 'Underwater camera', 'Hat'],
        fr: ['Maillot de bain', 'Serviette', 'Crème solaire', 'Appareil photo étanche', 'Chapeau']
      },
      accommodation: { 
        en: 'Not included (half-day tour)',
        fr: 'Non inclus (excursion d\'une demi-journée)'
      },
      transportation: { 
        en: 'Boat with shaded areas and comfortable seating',
        fr: 'Bateau avec zones ombragées et sièges confortables'
      },
      cancellationPolicy: { 
        en: 'Free cancellation up to 48 hours before the tour.',
        fr: 'Annulation gratuite jusqu\'à 48 heures avant le circuit.'
      },
      faqs: [
        {
          question: { 
            en: 'Is it guaranteed to see whale sharks?',
            fr: 'Est-il garanti de voir des requins-baleines ?'
          },
          answer: { 
            en: 'We have a 95% success rate during the peak season (October to February).',
            fr: 'Nous avons un taux de réussite de 95 % pendant la haute saison (octobre à février).'
          }
        }
      ],
      itineraryPdfUrl: { 
        en: '/pdfs/whale-shark-adventure-en.pdf',
        fr: '/pdfs/whale-shark-adventure-fr.pdf'
      },
      bestSeasons: ['oct', 'nov', 'dec', 'jan', 'feb'],
      categories: ['wildlife', 'adventure'],
      tags: ['Whale Sharks', 'Snorkeling', 'Marine Life'],
      metaTitle: { 
        en: 'Whale Shark Adventure Tour | Djibouti Explorer',
        fr: 'Circuit Aventure Requin-Baleine | Djibouti Explorer'
      },
      metaDescription: { 
        en: 'Swim with whale sharks in the Gulf of Tadjoura.',
        fr: 'Nagez avec les requins-baleines dans le Golfe de Tadjoura.'
      },
      featured: true,
      published: true,
      rating: 4.8,
      reviewCount: 38,
    }
  ];

  return mockTours.find(tour => tour.slug[locale] === slug) || null;
}

export default async function TourDetailPage({ params }: Props) {
  // Await params (required in Next.js 15+)
  const { locale, slug } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const tour = getTourBySlug(slug, validLocale);
  
  if (!tour) {
    return (
      <div className="container-custom section-padding text-center">
        <h1 className="text-2xl font-heading text-teal mb-4">Tour Not Found</h1>
        <p className="text-nearblack/70">The tour you're looking for doesn't exist.</p>
        <a href={`/${validLocale}/tours`} className="text-terracotta hover:text-terracotta/80 transition-colors mt-4 inline-block">
          ← Back to Tours
        </a>
      </div>
    );
  }

  return <TourDetail tour={tour} locale={validLocale} />;
}