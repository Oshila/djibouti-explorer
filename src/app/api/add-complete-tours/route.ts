import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const tours = [
      // =========================================
      // 1. Seven Brothers Islands Expedition
      // =========================================
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
          en: 'Explore the remote Seven Brothers Islands with seabird colonies and untouched beaches.',
          fr: 'Explorez les îles isolées des Sept Frères avec leurs colonies d\'oiseaux marins et leurs plages préservées.'
        },
        description: {
          en: 'The Seven Brothers Islands are a hidden gem in the Gulf of Tadjoura. This remote archipelago is home to thousands of seabirds, pristine beaches, and some of the best snorkeling in the Red Sea. Perfect for nature lovers, photographers, and adventurers seeking an off-the-beaten-path experience.',
          fr: 'Les Îles des Sept Frères sont un joyau caché dans le Golfe de Tadjoura. Cet archipel isolé abrite des milliers d\'oiseaux marins, des plages immaculées et certains des meilleurs spots de snorkeling de la Mer Rouge. Parfait pour les amoureux de la nature, les photographes et les aventuriers à la recherche d\'une expérience hors des sentiers battus.'
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
        destinations: ['Seven Brothers Islands'],
        highlights: {
          en: ['Seabird colonies', 'Remote island experience', 'Snorkeling in pristine waters', 'Camping under the stars', 'Photography opportunities'],
          fr: ['Colonies d\'oiseaux marins', 'Expérience insulaire isolée', 'Snorkeling dans des eaux préservées', 'Camping à la belle étoile', 'Opportunités photographiques']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Island Discovery',
              fr: 'Découverte des Îles'
            },
            description: {
              en: 'Early morning departure from Djibouti City Marina. Sail to the Seven Brothers Islands archipelago. Explore the islands, watch seabirds, and snorkel in pristine waters. Set up camp on the main island and enjoy a sunset dinner.',
              fr: 'Départ tôt le matin de la Marina de Djibouti Ville. Naviguez vers l\'archipel des Sept Frères. Explorez les îles, observez les oiseaux marins et faites du snorkeling dans des eaux préservées. Installez le camp sur l\'île principale et profitez d\'un dîner au coucher du soleil.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Island Exploration & Return',
              fr: 'Exploration des Îles & Retour'
            },
            description: {
              en: 'Morning exploration of the smaller islands. Swim, snorkel, and bird watch. Pack up camp and return to Djibouti City in the afternoon.',
              fr: 'Exploration matinale des petites îles. Nagez, faites du snorkeling et observez les oiseaux. Rangez le camp et retournez à Djibouti Ville dans l\'après-midi.'
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
        tags: ['Seven Brothers', 'Islands', 'Seabirds', 'Camping'],
        metaTitle: {
          en: 'Seven Brothers Islands Expedition | Djibouti Explorer',
          fr: 'Expédition des Sept Frères | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Explore the remote Seven Brothers Islands with seabird colonies and pristine beaches.',
          fr: 'Explorez les îles isolées des Sept Frères avec leurs colonies d\'oiseaux marins et leurs plages préservées.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // =========================================
      // 2. Dittilou Island Adventure
      // =========================================
      {
        title: {
          en: 'Dittilou Island Adventure',
          fr: 'Aventure à l\'Île Dittilou'
        },
        slug: {
          en: 'dittilou-island-adventure',
          fr: 'aventure-ile-dittilou'
        },
        shortDescription: {
          en: 'Discover the hidden gem of Dittilou Island with sea turtles, stingrays, and colorful coral gardens.',
          fr: 'Découvrez le joyau caché de l\'Île Dittilou avec ses tortues marines, ses raies pastenagues et ses jardins de corail colorés.'
        },
        description: {
          en: 'Dittilou Island is a peaceful paradise known for its calm waters, sea turtles, stingrays, and vibrant coral gardens. This hidden gem offers a more intimate island experience away from the crowds. Perfect for families, couples, and anyone seeking tranquility.',
          fr: 'L\'Île Dittilou est un paradis paisible connu pour ses eaux calmes, ses tortues marines, ses raies pastenagues et ses jardins de corail vibrants. Ce joyau caché offre une expérience insulaire plus intime loin de la foule. Parfait pour les familles, les couples et tous ceux qui recherchent la tranquillité.'
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
          primary: '/images/tours/dittilou.jpg',
          gallery: []
        },
        destinations: ['Dittilou'],
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
              en: 'Morning boat from Djibouti City Marina. Arrive at Dittilou Island and spend the day swimming, snorkeling, and relaxing on the beach. Spot sea turtles and stingrays in the clear waters. Enjoy a picnic lunch on the island. Return to Djibouti City in the afternoon.',
              fr: 'Bateau matinal depuis la Marina de Djibouti Ville. Arrivez à l\'Île Dittilou et passez la journée à nager, faire du snorkeling et vous détendre sur la plage. Observez les tortues marines et les raies pastenagues dans les eaux claires. Profitez d\'un déjeuner pique-nique sur l\'île. Retour à Djibouti Ville dans l\'après-midi.'
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
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: 'Boat with shaded areas',
          fr: 'Bateau avec zones ombragées'
        },
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
        tags: ['Dittilou', 'Sea Turtles', 'Snorkeling'],
        metaTitle: {
          en: 'Dittilou Island Adventure | Djibouti Explorer',
          fr: 'Aventure à l\'Île Dittilou | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Discover Dittilou Island with sea turtles, stingrays, and coral gardens.',
          fr: 'Découvrez l\'Île Dittilou avec ses tortues marines, ses raies pastenagues et ses jardins de corail.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // =========================================
      // 3. Tadjourah & Sable Blanc Beach
      // =========================================
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
          en: 'Explore the historic city of Tadjourah, known as the "White City" for its white-washed buildings. Visit the local market, see French colonial architecture, and learn about the city\'s rich history. Then relax on Sable Blanc Beach with white sand and turquoise water.',
          fr: 'Explorez la ville historique de Tadjourah, surnommée la "Ville Blanche" pour ses bâtiments blanchis à la chaux. Visitez le marché local, admirez l\'architecture coloniale française et découvrez la riche histoire de la ville. Détendez-vous ensuite sur la Plage de Sable Blanc avec son sable blanc et son eau turquoise.'
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
        destinations: ['Tadjourah'],
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
              en: 'Drive to Tadjourah, the historic "White City". Explore the town, visit the market, and learn about the local culture. Then continue to Sable Blanc Beach for swimming, relaxation, and lunch with a view. Return to Djibouti City in the late afternoon.',
              fr: 'Conduite vers Tadjourah, la "Ville Blanche" historique. Explorez la ville, visitez le marché et découvrez la culture locale. Continuez ensuite vers la Plage de Sable Blanc pour la baignade, la détente et un déjeuner avec vue. Retour à Djibouti Ville en fin d\'après-midi.'
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
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: 'Private vehicle with air conditioning',
          fr: 'Véhicule privé avec climatisation'
        },
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
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // =========================================
      // 4. Djibouti City Culture Tour
      // =========================================
      {
        title: {
          en: 'Djibouti City Culture Tour',
          fr: 'Circuit Culturel Djibouti Ville'
        },
        slug: {
          en: 'djibouti-city-culture-tour',
          fr: 'circuit-culturel-djibouti-ville'
        },
        shortDescription: {
          en: 'Explore the vibrant markets, French colonial architecture, and rich history of the capital.',
          fr: 'Explorez les marchés vibrants, l\'architecture coloniale française et la riche histoire de la capitale.'
        },
        description: {
          en: 'Discover the fascinating history and culture of Djibouti City. Visit the central market (Hamoudi Market), explore French colonial architecture in the European Quarter, see Place du 27 Juin, and learn about the city\'s rich heritage at the national museum.',
          fr: 'Découvrez l\'histoire fascinante et la culture de Djibouti Ville. Visitez le marché central (Marché Hamoudi), explorez l\'architecture coloniale française dans le Quartier Européen, voyez la Place du 27 Juin et découvrez le riche patrimoine de la ville au musée national.'
        },
        price: 120,
        depositAmount: 24,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 20,
        difficulty: 'easy',
        minAge: 0,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/djibouti-city.jpg',
          gallery: []
        },
        destinations: ['Djibouti City'],
        highlights: {
          en: ['Hamoudi Market', 'French colonial architecture', 'Place du 27 Juin', 'National Museum', 'Cultural heritage'],
          fr: ['Marché Hamoudi', 'Architecture coloniale française', 'Place du 27 Juin', 'Musée national', 'Patrimoine culturel']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti City Tour',
              fr: 'Visite de Djibouti Ville'
            },
            description: {
              en: 'Explore the city\'s highlights: the central market (Hamoudi Market), colonial-era buildings in the European Quarter, Place du 27 Juin, and the national museum. Learn about the city\'s rich history and cultural heritage from your local guide.',
              fr: 'Explorez les points forts de la ville : le marché central (Marché Hamoudi), les bâtiments de l\'époque coloniale dans le Quartier Européen, la Place du 27 Juin et le musée national. Découvrez la riche histoire et le patrimoine culturel de la ville avec votre guide local.'
            }
          }
        ],
        included: {
          en: ['Professional guide', 'Museum entrance fees', 'Water and soft drinks'],
          fr: ['Guide professionnel', 'Billets d\'entrée du musée', 'Eau et boissons']
        },
        excluded: {
          en: ['Hotel pickup and drop-off', 'Tips and gratuities', 'Personal expenses'],
          fr: ['Prise en charge et dépôt à l\'hôtel', 'Pourboires', 'Dépenses personnelles']
        },
        whatToBring: {
          en: ['Comfortable walking shoes', 'Camera', 'Sun cream', 'Hat'],
          fr: ['Chaussures de marche confortables', 'Appareil photo', 'Crème solaire', 'Chapeau']
        },
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: 'Walking tour',
          fr: 'Visite à pied'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is the tour suitable for children?',
              fr: 'Le circuit est-il adapté aux enfants ?'
            },
            answer: {
              en: 'Yes, this tour is suitable for all ages.',
              fr: 'Oui, ce circuit convient à tous les âges.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['all'],
        categories: ['culture', 'city'],
        tags: ['Djibouti City', 'Culture', 'History', 'Market'],
        metaTitle: {
          en: 'Djibouti City Culture Tour | Djibouti Explorer',
          fr: 'Circuit Culturel Djibouti Ville | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Explore the vibrant culture and history of Djibouti City.',
          fr: 'Explorez la culture vibrante et l\'histoire de Djibouti Ville.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // =========================================
      // 5. Lac Abbé & Ardoukoba
      // =========================================
      {
        title: {
          en: 'Lac Abbé & Ardoukoba',
          fr: 'Lac Abbé & Ardoukoba'
        },
        slug: {
          en: 'lac-abbe-ardoukoba',
          fr: 'lac-abbe-ardoukoba'
        },
        shortDescription: {
          en: 'Discover the otherworldly limestone chimneys and hike the Ardoukoba volcano.',
          fr: 'Découvrez les cheminées de calcaire d\'un autre monde et randonnez sur le volcan Ardoukoba.'
        },
        description: {
          en: 'Explore the surreal landscapes of Lac Abbé with its iconic limestone chimneys, then hike the active Ardoukoba volcano in the Great Rift Valley. This 2-day adventure combines two of Djibouti\'s most spectacular natural wonders.',
          fr: 'Explorez les paysages surréalistes du Lac Abbé avec ses cheminées de calcaire emblématiques, puis randonnez sur le volcan actif Ardoukoba dans la Vallée du Grand Rift. Cette aventure de 2 jours combine deux des merveilles naturelles les plus spectaculaires de Djibouti.'
        },
        price: 350,
        depositAmount: 70,
        currency: 'USD',
        duration: 2,
        maxGroupSize: 6,
        difficulty: 'moderate',
        minAge: 12,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/lac-abbe.jpg',
          gallery: []
        },
        destinations: ['Lac Abbé', 'Ardoukoba'],
        highlights: {
          en: ['Visit the iconic limestone chimneys of Lac Abbé', 'Hike the Ardoukoba volcano', 'Camp under the stars', 'Witness the Great Rift Valley'],
          fr: ['Visitez les cheminées de calcaire emblématiques du Lac Abbé', 'Randonnée sur le volcan Ardoukoba', 'Camping à la belle étoile', 'Découvrez la Vallée du Grand Rift']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Lac Abbé Discovery',
              fr: 'Découverte du Lac Abbé'
            },
            description: {
              en: 'Early departure from Djibouti City to Lac Abbé. Explore the surreal landscape of limestone chimneys and salt flats. Camp overnight near the lake.',
              fr: 'Départ tôt de Djibouti Ville vers le Lac Abbé. Explorez le paysage surréaliste des cheminées de calcaire et des plaines salées. Campement près du lac.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Ardoukoba Volcano Hike',
              fr: 'Randonnée Volcan Ardoukoba'
            },
            description: {
              en: 'Morning hike to the Ardoukoba volcano. Enjoy panoramic views of the Great Rift Valley before returning to Djibouti City.',
              fr: 'Randonnée matinale vers le volcan Ardoukoba. Profitez de vues panoramiques sur la Vallée du Grand Rift avant de retourner à Djibouti Ville.'
            }
          }
        ],
        included: {
          en: ['Hotel pickup and drop-off', 'Professional guide', 'Camping equipment', 'All meals', 'Water and soft drinks'],
          fr: ['Prise en charge et dépôt à l\'hôtel', 'Guide professionnel', 'Équipement de camping', 'Tous les repas', 'Eau et boissons']
        },
        excluded: {
          en: ['Tips and gratuities', 'Personal expenses', 'Travel insurance'],
          fr: ['Pourboires', 'Dépenses personnelles', 'Assurance voyage']
        },
        whatToBring: {
          en: ['Warm clothing', 'Comfortable hiking shoes', 'Sun cream', 'Hat', 'Camera'],
          fr: ['Vêtements chauds', 'Chaussures de randonnée confortables', 'Crème solaire', 'Chapeau', 'Appareil photo']
        },
        accommodation: {
          en: 'Camping (tents and sleeping bags provided)',
          fr: 'Camping (tentes et sacs de couchage fournis)'
        },
        transportation: {
          en: 'Private 4x4 vehicle with air conditioning',
          fr: 'Véhicule 4x4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 7 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 7 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'What is the difficulty level?',
              fr: 'Quel est le niveau de difficulté ?'
            },
            answer: {
              en: 'Moderate. The hike is suitable for people with average fitness.',
              fr: 'Modéré. La randonnée convient aux personnes ayant une condition physique moyenne.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['adventure', 'hiking'],
        tags: ['Lac Abbé', 'Ardoukoba', 'Volcano'],
        metaTitle: {
          en: 'Lac Abbé & Ardoukoba Tour | Djibouti Explorer',
          fr: 'Circuit Lac Abbé & Ardoukoba | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Discover Lac Abbé and hike Ardoukoba volcano in this 2-day adventure.',
          fr: 'Découvrez le Lac Abbé et randonnez sur le volcan Ardoukoba dans cette aventure de 2 jours.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // =========================================
      // 6. Moucha & Maskali Islands
      // =========================================
      {
        title: {
          en: 'Moucha & Maskali Islands',
          fr: 'Îles Moucha & Maskali'
        },
        slug: {
          en: 'moucha-maskali-islands',
          fr: 'iles-moucha-maskali'
        },
        shortDescription: {
          en: 'Escape to paradise on these stunning islands with pristine beaches and snorkeling.',
          fr: 'Évadez-vous vers le paradis sur ces îles magnifiques avec des plages immaculées et du snorkeling.'
        },
        description: {
          en: 'Discover the beauty of Moucha and Maskali Islands. Relax on pristine white sand beaches, snorkel in crystal-clear turquoise waters, and enjoy a perfect day escape from the city. These uninhabited islands are home to vibrant coral reefs and tropical fish.',
          fr: 'Découvrez la beauté des Îles Moucha et Maskali. Détendez-vous sur des plages de sable blanc immaculé, faites du snorkeling dans des eaux turquoise cristallines et profitez d\'une escapade parfaite loin de la ville. Ces îles inhabitées abritent des récifs coralliens vibrants et des poissons tropicaux.'
        },
        price: 220,
        depositAmount: 44,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 15,
        difficulty: 'easy',
        minAge: 0,
        meetingPoint: {
          en: 'Djibouti City Marina',
          fr: 'Marina de Djibouti Ville'
        },
        images: {
          primary: '/images/tours/moucha-island.jpg',
          gallery: []
        },
        destinations: ['Moucha Islands', 'Maskali Islands'],
        highlights: {
          en: ['White sand beaches', 'Snorkeling in crystal-clear waters', 'Coral reef exploration', 'Marine life viewing', 'Island escape'],
          fr: ['Plages de sable blanc', 'Snorkeling dans des eaux cristallines', 'Exploration des récifs coralliens', 'Observation de la vie marine', 'Escapade insulaire']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Island Exploration',
              fr: 'Exploration des Îles'
            },
            description: {
              en: 'Board the boat at the marina and sail to the islands. Spend the day swimming, snorkeling, and relaxing on the beach. Explore the coral reefs, spot tropical fish, and enjoy a delicious lunch on the island.',
              fr: 'Montez à bord du bateau à la marina et naviguez vers les îles. Passez la journée à nager, faire du snorkeling et vous détendre sur la plage. Explorez les récifs coralliens, observez les poissons tropicaux et profitez d\'un délicieux déjeuner sur l\'île.'
            }
          }
        ],
        included: {
          en: ['Boat tour', 'Snorkeling equipment', 'Lunch', 'Water and soft drinks', 'Professional guide'],
          fr: ['Tour en bateau', 'Équipement de snorkeling', 'Déjeuner', 'Eau et boissons', 'Guide professionnel']
        },
        excluded: {
          en: ['Hotel transfers', 'Tips and gratuities', 'Personal expenses'],
          fr: ['Transferts hôteliers', 'Pourboires', 'Dépenses personnelles']
        },
        whatToBring: {
          en: ['Swimsuit', 'Towel', 'Sun cream', 'Hat', 'Underwater camera'],
          fr: ['Maillot de bain', 'Serviette', 'Crème solaire', 'Chapeau', 'Appareil photo étanche']
        },
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: 'Boat with shaded areas and comfortable seating',
          fr: 'Bateau avec zones ombragées et sièges confortables'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is snorkeling equipment provided?',
              fr: 'L\'équipement de snorkeling est-il fourni ?'
            },
            answer: {
              en: 'Yes, all snorkeling equipment is included in the tour.',
              fr: 'Oui, tout l\'équipement de snorkeling est inclus dans le circuit.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['beach', 'relaxation'],
        tags: ['Moucha', 'Maskali', 'Islands', 'Snorkeling', 'Beach'],
        metaTitle: {
          en: 'Moucha & Maskali Islands Tour | Djibouti Explorer',
          fr: 'Circuit Îles Moucha & Maskali | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Escape to paradise on Moucha and Maskali Islands with pristine beaches and snorkeling.',
          fr: 'Évadez-vous vers le paradis sur les Îles Moucha et Maskali avec des plages immaculées et du snorkeling.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // =========================================
      // 7. Day Forest Trek
      // =========================================
      {
        title: {
          en: 'Day Forest Trek',
          fr: 'Randonnée Forêt du Day'
        },
        slug: {
          en: 'day-forest-trek',
          fr: 'randonnee-foret-day'
        },
        shortDescription: {
          en: 'Trek through the lush Day Forest, home to unique flora and bird species.',
          fr: 'Randonnez à travers la luxuriante Forêt du Day, abritant une flore et des espèces d\'oiseaux uniques.'
        },
        description: {
          en: 'Explore the biodiversity hotspot of Day Forest in the mountains of Djibouti. This lush forest is home to unique plant species and is a paradise for bird watchers. Trek through juniper and acacia trees, spot endemic birds, and enjoy cool mountain air.',
          fr: 'Explorez le hotspot de biodiversité de la Forêt du Day dans les montagnes de Djibouti. Cette forêt luxuriante abrite des espèces végétales uniques et est un paradis pour les ornithologues. Randonnez à travers les genévriers et les acacias, observez les oiseaux endémiques et profitez de l\'air frais de la montagne.'
        },
        price: 180,
        depositAmount: 36,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 12,
        difficulty: 'moderate',
        minAge: 8,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/day-forest.jpg',
          gallery: []
        },
        destinations: ['Day Forest'],
        highlights: {
          en: ['Trek through Day Forest', 'Bird watching', 'Unique flora', 'Mountain views', 'Cool mountain air'],
          fr: ['Randonnée dans la Forêt du Day', 'Observation des oiseaux', 'Flore unique', 'Vues sur les montagnes', 'Air frais de la montagne']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Day Forest Trek',
              fr: 'Randonnée Forêt du Day'
            },
            description: {
              en: 'Drive to the base of the mountains. Trek through the forest, spotting unique birds and plants. Enjoy a picnic lunch in the forest with mountain views. Return to Djibouti City in the afternoon.',
              fr: 'Conduite vers le pied des montagnes. Randonnée à travers la forêt, observation d\'oiseaux et de plantes uniques. Profitez d\'un déjeuner pique-nique dans la forêt avec vue sur les montagnes. Retour à Djibouti Ville dans l\'après-midi.'
            }
          }
        ],
        included: {
          en: ['Hotel pickup and drop-off', 'Professional guide', 'Picnic lunch', 'Water and soft drinks'],
          fr: ['Prise en charge et dépôt à l\'hôtel', 'Guide professionnel', 'Déjeuner pique-nique', 'Eau et boissons']
        },
        excluded: {
          en: ['Tips and gratuities', 'Personal expenses', 'Travel insurance'],
          fr: ['Pourboires', 'Dépenses personnelles', 'Assurance voyage']
        },
        whatToBring: {
          en: ['Comfortable hiking shoes', 'Sun cream', 'Hat', 'Camera', 'Insect repellent'],
          fr: ['Chaussures de randonnée confortables', 'Crème solaire', 'Chapeau', 'Appareil photo', 'Anti-moustiques']
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
              en: 'Is the trek difficult?',
              fr: 'La randonnée est-elle difficile ?'
            },
            answer: {
              en: 'Moderate. The trail is well-maintained and suitable for most fitness levels.',
              fr: 'Modérée. Le sentier est bien entretenu et convient à la plupart des niveaux de forme physique.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['nature', 'hiking'],
        tags: ['Day Forest', 'Bird Watching', 'Trekking'],
        metaTitle: {
          en: 'Day Forest Trek Tour | Djibouti Explorer',
          fr: 'Circuit Randonnée Forêt du Day | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Trek through Day Forest, a biodiversity hotspot in Djibouti.',
          fr: 'Randonnez à travers la Forêt du Day, un hotspot de biodiversité à Djibouti.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let addedCount = 0;
    for (const tour of tours) {
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
      message: `Added ${addedCount} tours!`,
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