import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const tours = [
      // 1. Seven Brothers Islands
      {
        title: {
          en: 'Seven Brothers Islands Expedition',
          fr: 'Expédition des Sept Frères'
        },
        slug: {
          en: 'seven-brothers-islands',
          fr: 'sept-freres-iles'
        },
        shortDescription: {
          en: 'Explore the legendary Seven Brothers Islands, a remote archipelago with seabird colonies and untouched beaches.',
          fr: 'Explorez le légendaire archipel des Sept Frères, avec ses colonies d\'oiseaux marins et ses plages préservées.'
        },
        description: {
          en: 'The Seven Brothers Islands are a hidden gem in the Gulf of Tadjoura. This remote archipelago is home to thousands of seabirds, pristine beaches, and some of the best snorkeling in the Red Sea.',
          fr: 'Les Îles des Sept Frères sont un joyau caché dans le Golfe de Tadjoura. Cet archipel isolé abrite des milliers d\'oiseaux marins, des plages immaculées et certains des meilleurs spots de snorkeling de la Mer Rouge.'
        },
        price: 350,
        depositAmount: 70,
        currency: 'USD',
        duration: 2,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 10,
        meetingPoint: {
          en: 'Djibouti City Marina',
          fr: 'Marina de Djibouti Ville'
        },
        images: {
          primary: '/images/tours/seven-brothers.jpg',
          gallery: []
        },
        highlights: {
          en: ['Seabird colonies', 'Remote island experience', 'Snorkeling in pristine waters', 'Photography opportunities'],
          fr: ['Colonies d\'oiseaux marins', 'Expérience insulaire isolée', 'Snorkeling dans des eaux préservées', 'Opportunités photographiques']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Island Discovery',
              fr: 'Découverte des Îles'
            },
            description: {
              en: 'Early morning departure from Djibouti City Marina. Sail to the Seven Brothers Islands archipelago. Explore the islands, watch seabirds, and snorkel in pristine waters. Camp overnight on the main island.',
              fr: 'Départ tôt le matin de la Marina de Djibouti Ville. Naviguez vers l\'archipel des Sept Frères. Explorez les îles, observez les oiseaux marins et faites du snorkeling dans des eaux préservées. Campement sur l\'île principale.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Island Exploration & Return',
              fr: 'Exploration des Îles & Retour'
            },
            description: {
              en: 'Morning exploration of the smaller islands. Swim, snorkel, and bird watch. Pack up and return to Djibouti City in the afternoon.',
              fr: 'Exploration matinale des petites îles. Nagez, faites du snorkeling et observez les oiseaux. Rangez le matériel et retournez à Djibouti Ville dans l\'après-midi.'
            }
          }
        ],
        included: {
          en: ['Boat tour', 'Camping equipment', 'Snorkeling equipment', 'All meals', 'Water and soft drinks', 'Professional guide'],
          fr: ['Tour en bateau', 'Équipement de camping', 'Équipement de snorkeling', 'Tous les repas', 'Eau et boissons', 'Guide professionnel']
        },
        excluded: {
          en: ['Hotel transfers', 'Tips and gratuities', 'Personal expenses'],
          fr: ['Transferts hôteliers', 'Pourboires', 'Dépenses personnelles']
        },
        whatToBring: {
          en: ['Swimsuit', 'Towel', 'Sun cream', 'Hat', 'Camera', 'Warm clothes for night'],
          fr: ['Maillot de bain', 'Serviette', 'Crème solaire', 'Chapeau', 'Appareil photo', 'Vêtements chauds pour la nuit']
        },
        accommodation: {
          en: 'Camping (tents and sleeping bags provided)',
          fr: 'Camping (tentes et sacs de couchage fournis)'
        },
        transportation: {
          en: 'Boat with shaded areas',
          fr: 'Bateau avec zones ombragées'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 7 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 7 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is camping experience required?',
              fr: 'Une expérience de camping est-elle requise ?'
            },
            answer: {
              en: 'No, the tour is suitable for beginners. Our guides will help with everything.',
              fr: 'Non, le circuit convient aux débutants. Nos guides vous aideront pour tout.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['adventure', 'wildlife'],
        tags: ['Seven Brothers', 'Islands', 'Seabirds'],
        metaTitle: {
          en: 'Seven Brothers Islands Expedition | Djibouti Explorer',
          fr: 'Expédition des Sept Frères | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Explore the remote Seven Brothers Islands with seabird colonies and pristine beaches.',
          fr: 'Explorez les îles isolées des Sept Frères avec leurs colonies d\'oiseaux marins et leurs plages préservées.'
        },
        rating: 4.8,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // 2. Dittilou Island
      {
        title: {
          en: 'Dittilou Island Adventure',
          fr: 'Aventure à l\'Île Dittilou'
        },
        slug: {
          en: 'dittilou-island',
          fr: 'ile-dittilou'
        },
        shortDescription: {
          en: 'Discover the hidden gem of Dittilou Island with its calm waters, sea turtles, and colorful coral gardens.',
          fr: 'Découvrez le joyau caché de l\'Île Dittilou avec ses eaux calmes, ses tortues marines et ses jardins de corail colorés.'
        },
        description: {
          en: 'Dittilou Island is a peaceful paradise known for its calm waters, sea turtles, stingrays, and vibrant coral gardens.',
          fr: 'L\'Île Dittilou est un paradis paisible connu pour ses eaux calmes, ses tortues marines, ses raies pastenagues et ses jardins de corail vibrants.'
        },
        price: 190,
        depositAmount: 38,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 12,
        difficulty: 'easy',
        minAge: 0,
        meetingPoint: {
          en: 'Djibouti City Marina',
          fr: 'Marina de Djibouti Ville'
        },
        images: {
          primary: '/images/tours/dittilou-island.jpg',
          gallery: []
        },
        highlights: {
          en: ['Sea turtles', 'Stingrays', 'Coral gardens', 'Calm waters', 'Peaceful island setting'],
          fr: ['Tortues marines', 'Raies pastenagues', 'Jardins de corail', 'Eaux calmes', 'Cadre insulaire paisible']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Dittilou Island Excursion',
              fr: 'Excursion à l\'Île Dittilou'
            },
            description: {
              en: 'Morning boat from Djibouti City Marina. Arrive at Dittilou Island and spend the day swimming, snorkeling, and relaxing on the beach. Spot sea turtles and stingrays in the clear waters.',
              fr: 'Bateau matinal depuis la Marina de Djibouti Ville. Arrivez à l\'Île Dittilou et passez la journée à nager, faire du snorkeling et vous détendre sur la plage. Observez les tortues marines et les raies pastenagues dans les eaux claires.'
            }
          }
        ],
        included: {
          en: ['Boat tour', 'Snorkeling equipment', 'Picnic lunch', 'Water and soft drinks', 'Professional guide'],
          fr: ['Tour en bateau', 'Équipement de snorkeling', 'Déjeuner pique-nique', 'Eau et boissons', 'Guide professionnel']
        },
        excluded: {
          en: ['Hotel transfers', 'Tips and gratuities', 'Personal expenses'],
          fr: ['Transferts hôteliers', 'Pourboires', 'Dépenses personnelles']
        },
        whatToBring: {
          en: ['Swimsuit', 'Towel', 'Sun cream', 'Hat', 'Underwater camera'],
          fr: ['Maillot de bain', 'Serviette', 'Crème solaire', 'Chapeau', 'Appareil photo étanche']
        },
        accommodation: { en: 'Not included (day trip)', fr: 'Non inclus (excursion d\'une journée)' },
        transportation: { en: 'Boat with shaded areas', fr: 'Bateau avec zones ombragées' },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is this tour suitable for children?',
              fr: 'Ce circuit est-il adapté aux enfants ?'
            },
            answer: {
              en: 'Yes, this tour is perfect for families with children.',
              fr: 'Oui, ce circuit est parfait pour les familles avec enfants.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['beach', 'family'],
        tags: ['Dittilou Island', 'Sea Turtles', 'Snorkeling'],
        metaTitle: {
          en: 'Dittilou Island Adventure | Djibouti Explorer',
          fr: 'Aventure à l\'Île Dittilou | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Discover Dittilou Island with sea turtles, stingrays, and coral gardens.',
          fr: 'Découvrez l\'Île Dittilou avec ses tortues marines, ses raies pastenagues et ses jardins de corail.'
        },
        rating: 4.7,
        reviewCount: 0,
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // 3. Tadjourah & Sable Blanc
      {
        title: {
          en: 'Tadjourah & Sable Blanc Beach',
          fr: 'Tadjourah & Plage de Sable Blanc'
        },
        slug: {
          en: 'tadjourah-sable-blanc',
          fr: 'tadjourah-plage-sable-blanc'
        },
        shortDescription: {
          en: 'Discover the historic white city of Tadjourah and relax on one of Djibouti\'s most beautiful beaches.',
          fr: 'Découvrez la ville blanche historique de Tadjourah et détendez-vous sur l\'une des plus belles plages de Djibouti.'
        },
        description: {
          en: 'Explore the historic city of Tadjourah, known as the "White City" for its white-washed buildings. Visit the local market, see French colonial architecture, and learn about the city\'s rich history. Then relax on Sable Blanc Beach.',
          fr: 'Explorez la ville historique de Tadjourah, surnommée la "Ville Blanche" pour ses bâtiments blanchis à la chaux. Visitez le marché local, admirez l\'architecture coloniale française et découvrez la riche histoire de la ville. Détendez-vous ensuite sur la Plage de Sable Blanc.'
        },
        price: 160,
        depositAmount: 32,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 10,
        difficulty: 'easy',
        minAge: 0,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/tadjourah-beach.jpg',
          gallery: []
        },
        highlights: {
          en: ['Historic Tadjourah', 'French colonial architecture', 'Local market', 'Sable Blanc Beach', 'Red Sea views'],
          fr: ['Tadjourah historique', 'Architecture coloniale française', 'Marché local', 'Plage de Sable Blanc', 'Vues sur la Mer Rouge']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Tadjourah & Beach',
              fr: 'Tadjourah & Plage'
            },
            description: {
              en: 'Drive to Tadjourah, the historic "White City". Explore the town, visit the market, and learn about the local culture. Then continue to Sable Blanc Beach for swimming, relaxation, and lunch with a view.',
              fr: 'Conduite vers Tadjourah, la "Ville Blanche" historique. Explorez la ville, visitez le marché et découvrez la culture locale. Continuez ensuite vers la Plage de Sable Blanc pour la baignade, la détente et un déjeuner avec vue.'
            }
          }
        ],
        included: {
          en: ['Hotel pickup and drop-off', 'Professional guide', 'Entrance fees', 'Lunch', 'Water and soft drinks'],
          fr: ['Prise en charge et dépôt à l\'hôtel', 'Guide professionnel', 'Frais d\'entrée', 'Déjeuner', 'Eau et boissons']
        },
        excluded: {
          en: ['Tips and gratuities', 'Personal expenses', 'Travel insurance'],
          fr: ['Pourboires', 'Dépenses personnelles', 'Assurance voyage']
        },
        whatToBring: {
          en: ['Swimsuit', 'Towel', 'Sun cream', 'Hat', 'Comfortable shoes', 'Camera'],
          fr: ['Maillot de bain', 'Serviette', 'Crème solaire', 'Chapeau', 'Chaussures confortables', 'Appareil photo']
        },
        accommodation: { en: 'Not included (day trip)', fr: 'Non inclus (excursion d\'une journée)' },
        transportation: { en: 'Private vehicle with air conditioning', fr: 'Véhicule privé avec climatisation' },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is there swimming at Sable Blanc Beach?',
              fr: 'Y a-t-il de la baignade à la Plage de Sable Blanc ?'
            },
            answer: {
              en: 'Yes, you can swim and relax at the beach.',
              fr: 'Oui, vous pouvez nager et vous détendre à la plage.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['culture', 'beach'],
        tags: ['Tadjourah', 'Sable Blanc', 'Beach', 'History'],
        metaTitle: {
          en: 'Tadjourah & Sable Blanc Beach Tour | Djibouti Explorer',
          fr: 'Circuit Tadjourah & Plage de Sable Blanc | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Discover historic Tadjourah and relax on Sable Blanc Beach.',
          fr: 'Découvrez Tadjourah historique et détendez-vous sur la Plage de Sable Blanc.'
        },
        rating: 4.6,
        reviewCount: 0,
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let addedCount = 0;
    for (const tour of tours) {
      // Check if tour already exists
      const existing = await adminDb.collection('tours')
        .where('slug.en', '==', tour.slug.en)
        .get();

      if (existing.empty) {
        await adminDb.collection('tours').add(tour);
        addedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Added ${addedCount} new tours!`,
      added: addedCount,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}