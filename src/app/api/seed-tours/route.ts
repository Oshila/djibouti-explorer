import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    // Check if tours already exist
    const existing = await adminDb.collection('tours').limit(1).get();
    if (!existing.empty) {
      return NextResponse.json({
        success: true,
        message: 'Tours already exist. No changes made.',
      });
    }

    const tours = [
      // 1. Lake Assal Discovery
      {
        title: { en: 'Lake Assal Discovery', fr: 'Découverte du Lac Assal' },
        slug: { en: 'lake-assal-discovery', fr: 'decouverte-lac-assal' },
        shortDescription: {
          en: 'Visit the lowest point in Africa and swim in the saltiest lake on Earth.',
          fr: 'Visitez le point le plus bas d\'Afrique et nagez dans le lac le plus salé de la Terre.'
        },
        description: {
          en: 'Embark on an unforgettable journey to Lake Assal, the lowest point in Africa and the saltiest lake on Earth. Located in the heart of the Danakil Depression, this extraordinary destination offers a unique combination of natural wonders, including salt flats, volcanic landscapes, and stunning views of the surrounding mountains.',
          fr: 'Embarquez pour un voyage inoubliable vers le Lac Assal, le point le plus bas d\'Afrique et le lac le plus salé de la Terre. Situé au cœur de la dépression de Danakil, cette destination extraordinaire offre une combinaison unique de merveilles naturelles, notamment des plaines salées, des paysages volcaniques et des vues imprenables sur les montagnes environnantes.'
        },
        price: 150,
        depositAmount: 30,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 8,
        difficulty: 'easy',
        minAge: 6,
        meetingPoint: {
          en: 'Your hotel in Djibouti City (pickup included)',
          fr: 'Votre hôtel à Djibouti Ville (prise en charge incluse)'
        },
        images: {
          primary: '/images/tours/lake-assal.jpg',
          gallery: []
        },
        highlights: {
          en: ['Swim in the saltiest lake on Earth', 'Visit the lowest point in Africa', 'Explore the Danakil Depression', 'See the salt mining operations'],
          fr: ['Nagez dans le lac le plus salé de la Terre', 'Visitez le point le plus bas d\'Afrique', 'Explorez la dépression de Danakil', 'Observez les opérations d\'extraction de sel']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti City to Lake Assal',
              fr: 'Djibouti Ville au Lac Assal'
            },
            description: {
              en: 'Early morning departure from your hotel in Djibouti City. Drive through the stunning landscapes of the Danakil Depression, arriving at Lake Assal by mid-morning. Spend the day exploring the lake, swimming, and learning about the local salt mining. Enjoy a picnic lunch by the lake before returning to Djibouti City in the evening.',
              fr: 'Départ tôt le matin de votre hôtel à Djibouti Ville. Traversez les paysages spectaculaires de la dépression de Danakil, arrivant au Lac Assal en milieu de matinée. Passez la journée à explorer le lac, à nager et à découvrir l\'extraction du sel local. Profitez d\'un déjeuner pique-nique au bord du lac avant de retourner à Djibouti Ville en soirée.'
            }
          }
        ],
        included: {
          en: ['Hotel pickup and drop-off', 'Professional local guide', 'Entrance fees', 'Picnic lunch', 'Water and soft drinks'],
          fr: ['Prise en charge et dépôt à l\'hôtel', 'Guide local professionnel', 'Frais d\'entrée', 'Déjeuner pique-nique', 'Eau et boissons']
        },
        excluded: {
          en: ['Tips and gratuities', 'Personal expenses', 'Travel insurance'],
          fr: ['Pourboires', 'Dépenses personnelles', 'Assurance voyage']
        },
        whatToBring: {
          en: ['Swimsuit', 'Towel', 'Sun cream', 'Hat', 'Camera', 'Comfortable shoes'],
          fr: ['Maillot de bain', 'Serviette', 'Crème solaire', 'Chapeau', 'Appareil photo', 'Chaussures confortables']
        },
        accommodation: { en: 'Not included (day trip)', fr: 'Non inclus (excursion d\'une journée)' },
        transportation: {
          en: 'Private 4x4 vehicle with air conditioning',
          fr: 'Véhicule 4x4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour. 50% refund for cancellations within 24 hours.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit. Remboursement de 50 % pour les annulations dans les 24 heures.'
        },
        faqs: [
          {
            question: {
              en: 'How long is the drive to Lake Assal?',
              fr: 'Combien de temps dure le trajet jusqu\'au Lac Assal ?'
            },
            answer: {
              en: 'The drive from Djibouti City to Lake Assal takes approximately 2-3 hours, depending on road conditions.',
              fr: 'Le trajet de Djibouti Ville au Lac Assal dure environ 2-3 heures, selon les conditions routières.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['nov', 'dec', 'jan', 'feb'],
        categories: ['nature', 'adventure'],
        tags: ['Lake Assal', 'Danakil', 'Salt Lake'],
        metaTitle: {
          en: 'Lake Assal Discovery Tour | Djibouti Explorer',
          fr: 'Circuit Découverte du Lac Assal | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Visit the lowest point in Africa and swim in the saltiest lake on Earth.',
          fr: 'Visitez le point le plus bas d\'Afrique et nagez dans le lac le plus salé de la Terre.'
        },
        rating: 4.9,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // 2. Whale Shark Adventure
      {
        title: { en: 'Whale Shark Adventure', fr: 'Aventure Requin-Baleine' },
        slug: { en: 'whale-shark-adventure', fr: 'aventure-requin-baleine' },
        shortDescription: {
          en: 'Swim with gentle giants in the crystal-clear waters of the Gulf of Tadjoura.',
          fr: 'Nagez avec les géants des mers dans les eaux cristallines du Golfe de Tadjoura.'
        },
        description: {
          en: 'Experience the thrill of swimming with whale sharks, the largest fish in the ocean, in the pristine waters of the Gulf of Tadjoura. This once-in-a-lifetime adventure takes you to the feeding grounds of these magnificent creatures, where you can observe them up close in their natural habitat.',
          fr: 'Vivez l\'excitation de nager avec les requins-baleines, les plus grands poissons de l\'océan, dans les eaux immaculées du Golfe de Tadjoura. Cette aventure unique vous emmène dans les zones d\'alimentation de ces magnifiques créatures, où vous pourrez les observer de près dans leur habitat naturel.'
        },
        price: 250,
        depositAmount: 50,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 10,
        difficulty: 'easy',
        minAge: 8,
        meetingPoint: {
          en: 'Djibouti City Marina',
          fr: 'Marina de Djibouti Ville'
        },
        images: {
          primary: '/images/tours/whale-shark.jpg',
          gallery: []
        },
        highlights: {
          en: ['Swim with whale sharks', 'Professional snorkeling equipment', 'Expert marine guides', 'Wildlife photography opportunities'],
          fr: ['Nagez avec les requins-baleines', 'Équipement de snorkeling professionnel', 'Guides marins experts', 'Opportunités de photographie animalière']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Whale Shark Encounter',
              fr: 'Rencontre avec les Requins-Baleines'
            },
            description: {
              en: 'Meet at the Djibouti City Marina at 6:00 AM. Board our boat and sail to the whale shark feeding grounds. Spend the morning swimming with these magnificent creatures, with guidance from our expert marine biologists. Enjoy a light breakfast and lunch on board. Return to the marina by 1:00 PM.',
              fr: 'Rendez-vous à la Marina de Djibouti Ville à 6h00. Montez à bord de notre bateau et naviguez vers les zones d\'alimentation des requins-baleines. Passez la matinée à nager avec ces magnifiques créatures, avec les conseils de nos biologistes marins experts. Profitez d\'un petit-déjeuner léger et d\'un déjeuner à bord. Retour à la marina à 13h00.'
            }
          }
        ],
        included: {
          en: ['Boat tour', 'Snorkeling equipment', 'Marine biologist guide', 'Breakfast and lunch', 'Water and soft drinks'],
          fr: ['Tour en bateau', 'Équipement de snorkeling', 'Guide biologiste marin', 'Petit-déjeuner et déjeuner', 'Eau et boissons']
        },
        excluded: {
          en: ['Hotel transfers', 'Tips and gratuities', 'Personal expenses'],
          fr: ['Transferts hôteliers', 'Pourboires', 'Dépenses personnelles']
        },
        whatToBring: {
          en: ['Swimsuit', 'Towel', 'Sun cream', 'Underwater camera', 'Hat'],
          fr: ['Maillot de bain', 'Serviette', 'Crème solaire', 'Appareil photo étanche', 'Chapeau']
        },
        accommodation: { en: 'Not included (half-day tour)', fr: 'Non inclus (excursion d\'une demi-journée)' },
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
        itineraryPdfUrl: { en: '', fr: '' },
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
        rating: 4.8,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // 3. Lac Abbé & Ardoukoba
      {
        title: { en: 'Lac Abbé & Ardoukoba', fr: 'Lac Abbé & Ardoukoba' },
        slug: { en: 'lac-abbe-ardoukoba', fr: 'lac-abbe-ardoukoba' },
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
        accommodation: { en: 'Camping (tents and sleeping bags provided)', fr: 'Camping (tentes et sacs de couchage fournis)' },
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
        rating: 4.7,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // 4. Day Forest Trek
      {
        title: { en: 'Day Forest Trek', fr: 'Randonnée Forêt du Day' },
        slug: { en: 'day-forest-trek', fr: 'randonnee-foret-day' },
        shortDescription: {
          en: 'Trek through the lush Day Forest, home to unique flora and bird species.',
          fr: 'Randonnez à travers la luxuriante Forêt du Day, abritant une flore et des espèces d\'oiseaux uniques.'
        },
        description: {
          en: 'Explore the biodiversity hotspot of Day Forest in the mountains of Djibouti. This lush forest is home to unique plant species and is a paradise for bird watchers.',
          fr: 'Explorez le hotspot de biodiversité de la Forêt du Day dans les montagnes de Djibouti. Cette forêt luxuriante abrite des espèces végétales uniques et est un paradis pour les ornithologues.'
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
        highlights: {
          en: ['Trek through Day Forest', 'Bird watching', 'Unique flora', 'Mountain views'],
          fr: ['Randonnée dans la Forêt du Day', 'Observation des oiseaux', 'Flore unique', 'Vues sur les montagnes']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Day Forest Trek',
              fr: 'Randonnée Forêt du Day'
            },
            description: {
              en: 'Drive to the base of the mountains. Trek through the forest, spotting unique birds and plants. Enjoy a picnic lunch in the forest.',
              fr: 'Conduite vers le pied des montagnes. Randonnée à travers la forêt, observation d\'oiseaux et de plantes uniques. Déjeuner pique-nique dans la forêt.'
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
        accommodation: { en: 'Not included (day trip)', fr: 'Non inclus (excursion d\'une journée)' },
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
        rating: 4.6,
        reviewCount: 0,
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // 5. Moucha & Maskali Islands
      {
        title: { en: 'Moucha & Maskali Islands', fr: 'Îles Moucha & Maskali' },
        slug: { en: 'moucha-maskali-islands', fr: 'iles-moucha-maskali' },
        shortDescription: {
          en: 'Escape to paradise on these stunning islands with pristine beaches and snorkeling.',
          fr: 'Évadez-vous vers le paradis sur ces îles magnifiques avec des plages immaculées et du snorkeling.'
        },
        description: {
          en: 'Discover the beauty of Moucha and Maskali Islands. Relax on pristine beaches, snorkel in crystal-clear waters, and enjoy a perfect day escape from the city.',
          fr: 'Découvrez la beauté des Îles Moucha et Maskali. Détendez-vous sur des plages immaculées, faites du snorkeling dans des eaux cristallines et profitez d\'une escapade parfaite loin de la ville.'
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
        highlights: {
          en: ['Visit Moucha and Maskali Islands', 'Snorkeling in crystal-clear waters', 'Pristine beaches', 'Marine life viewing'],
          fr: ['Visite des Îles Moucha et Maskali', 'Snorkeling dans des eaux cristallines', 'Plages immaculées', 'Observation de la vie marine']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Island Exploration',
              fr: 'Exploration des Îles'
            },
            description: {
              en: 'Board the boat at the marina and sail to the islands. Spend the day swimming, snorkeling, and relaxing on the beach.',
              fr: 'Montez à bord du bateau à la marina et naviguez vers les îles. Passez la journée à nager, faire du snorkeling et vous détendre sur la plage.'
            }
          }
        ],
        included: {
          en: ['Boat tour', 'Snorkeling equipment', 'Lunch', 'Water and soft drinks'],
          fr: ['Tour en bateau', 'Équipement de snorkeling', 'Déjeuner', 'Eau et boissons']
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
        tags: ['Moucha Island', 'Maskali Island', 'Snorkeling'],
        metaTitle: {
          en: 'Moucha & Maskali Islands Tour | Djibouti Explorer',
          fr: 'Circuit Îles Moucha & Maskali | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Escape to paradise on Moucha and Maskali Islands with pristine beaches and snorkeling.',
          fr: 'Évadez-vous vers le paradis sur les Îles Moucha et Maskali avec des plages immaculées et du snorkeling.'
        },
        rating: 4.9,
        reviewCount: 0,
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // 6. Djibouti City Culture Tour
      {
        title: { en: 'Djibouti City Culture Tour', fr: 'Circuit Culturel Djibouti Ville' },
        slug: { en: 'djibouti-city-culture-tour', fr: 'circuit-culturel-djibouti-ville' },
        shortDescription: {
          en: 'Explore the vibrant markets, French colonial architecture, and rich history of the capital.',
          fr: 'Explorez les marchés vibrants, l\'architecture coloniale française et la riche histoire de la capitale.'
        },
        description: {
          en: 'Discover the fascinating history and culture of Djibouti City. Visit the central market, explore French colonial architecture, and learn about the city\'s rich heritage.',
          fr: 'Découvrez l\'histoire fascinante et la culture de Djibouti Ville. Visitez le marché central, explorez l\'architecture coloniale française et apprenez-en plus sur le riche patrimoine de la ville.'
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
        highlights: {
          en: ['Central Market', 'French colonial architecture', 'Museum visit', 'Cultural heritage'],
          fr: ['Marché central', 'Architecture coloniale française', 'Visite du musée', 'Patrimoine culturel']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti City Tour',
              fr: 'Visite de Djibouti Ville'
            },
            description: {
              en: 'Explore the city\'s highlights: the central market, colonial-era buildings, and the national museum.',
              fr: 'Explorez les points forts de la ville : le marché central, les bâtiments de l\'époque coloniale et le musée national.'
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
        accommodation: { en: 'Not included (day trip)', fr: 'Non inclus (excursion d\'une journée)' },
        transportation: { en: 'Walking tour', fr: 'Visite à pied' },
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
        tags: ['Djibouti City', 'Culture', 'History'],
        metaTitle: {
          en: 'Djibouti City Culture Tour | Djibouti Explorer',
          fr: 'Circuit Culturel Djibouti Ville | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Explore the vibrant culture and history of Djibouti City.',
          fr: 'Explorez la culture vibrante et l\'histoire de Djibouti Ville.'
        },
        rating: 4.5,
        reviewCount: 0,
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // 7. Ardoukoba Volcano Hike
      {
        title: { en: 'Ardoukoba Volcano Hike', fr: 'Randonnée Volcan Ardoukoba' },
        slug: { en: 'ardoukoba-volcano-hike', fr: 'randonnee-volcan-ardoukoba' },
        shortDescription: {
          en: 'Hike the active Ardoukoba volcano and witness the dramatic landscapes of the Great Rift Valley.',
          fr: 'Randonnez sur le volcan actif Ardoukoba et découvrez les paysages spectaculaires de la Vallée du Grand Rift.'
        },
        description: {
          en: 'Conquer the Ardoukoba volcano, one of Djibouti\'s most dramatic natural landmarks. This active volcano offers spectacular views of the Great Rift Valley and the surrounding desert. The hike is challenging but rewards you with unforgettable scenery.',
          fr: 'Conquérez le volcan Ardoukoba, l\'un des monuments naturels les plus spectaculaires de Djibouti. Ce volcan actif offre des vues spectaculaires sur la Vallée du Grand Rift et le désert environnant. La randonnée est difficile mais vous récompense par des paysages inoubliables.'
        },
        price: 280,
        depositAmount: 56,
        currency: 'USD',
        duration: 2,
        maxGroupSize: 8,
        difficulty: 'challenging',
        minAge: 14,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/ardoukoba.jpg',
          gallery: []
        },
        highlights: {
          en: ['Active volcano', 'Lava fields', 'Rift Valley views', 'Hiking adventure'],
          fr: ['Volcan actif', 'Champs de lave', 'Vues sur la Vallée du Rift', 'Aventure de randonnée']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Approach to Ardoukoba',
              fr: 'Approche d\'Ardoukoba'
            },
            description: {
              en: 'Drive from Djibouti City to the base of Ardoukoba. Set up camp and prepare for the next day\'s hike. Enjoy dinner with views of the volcano.',
              fr: 'Conduite de Djibouti Ville vers le pied de l\'Ardoukoba. Installez le camp et préparez-vous pour la randonnée du lendemain. Profitez d\'un dîner avec vue sur le volcan.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Summit Hike',
              fr: 'Ascension du Sommet'
            },
            description: {
              en: 'Early morning hike to the summit. Witness the volcanic craters and panoramic views. Return to camp and drive back to Djibouti City.',
              fr: 'Randonnée matinale vers le sommet. Découvrez les cratères volcaniques et les vues panoramiques. Retour au camp et conduite vers Djibouti Ville.'
            }
          }
        ],
        included: {
          en: ['Hotel pickup and drop-off', 'Professional mountain guide', 'Camping equipment', 'All meals', 'Water and soft drinks'],
          fr: ['Prise en charge et dépôt à l\'hôtel', 'Guide de montagne professionnel', 'Équipement de camping', 'Tous les repas', 'Eau et boissons']
        },
        excluded: {
          en: ['Tips and gratuities', 'Personal expenses', 'Travel insurance'],
          fr: ['Pourboires', 'Dépenses personnelles', 'Assurance voyage']
        },
        whatToBring: {
          en: ['Hiking boots', 'Warm clothing', 'Sun protection', 'Backpack', 'Headlamp'],
          fr: ['Chaussures de randonnée', 'Vêtements chauds', 'Protection solaire', 'Sac à dos', 'Lampe frontale']
        },
        accommodation: { en: 'Camping (tents and sleeping bags provided)', fr: 'Camping (tentes et sacs de couchage fournis)' },
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
              en: 'How difficult is the hike?',
              fr: 'La randonnée est-elle difficile ?'
            },
            answer: {
              en: 'The hike is challenging. Good fitness is required.',
              fr: 'La randonnée est difficile. Une bonne condition physique est requise.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['adventure', 'hiking'],
        tags: ['Ardoukoba', 'Volcano', 'Hiking'],
        metaTitle: {
          en: 'Ardoukoba Volcano Hike | Djibouti Explorer',
          fr: 'Randonnée Volcan Ardoukoba | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Hike the active Ardoukoba volcano in the Great Rift Valley.',
          fr: 'Randonnez sur le volcan actif Ardoukoba dans la Vallée du Grand Rift.'
        },
        rating: 4.8,
        reviewCount: 0,
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // 8. Seven Brothers Islands
      {
        title: { en: 'Seven Brothers Islands Expedition', fr: 'Expédition des Sept Frères' },
        slug: { en: 'seven-brothers-islands', fr: 'sept-freres-iles' },
        shortDescription: {
          en: 'Explore the legendary Seven Brothers Islands, a remote archipelago with seabird colonies and untouched beaches.',
          fr: 'Explorez le légendaire archipel des Sept Frères, avec ses colonies d\'oiseaux marins et ses plages préservées.'
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
        accommodation: { en: 'Camping (tents and sleeping bags provided)', fr: 'Camping (tentes et sacs de couchage fournis)' },
        transportation: { en: 'Boat with shaded areas', fr: 'Bateau avec zones ombragées' },
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
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // 9. Tadjourah & Sable Blanc Beach
      {
        title: { en: 'Tadjourah & Sable Blanc Beach', fr: 'Tadjourah & Plage de Sable Blanc' },
        slug: { en: 'tadjourah-sable-blanc', fr: 'tadjourah-plage-sable-blanc' },
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
        rating: 4.6,
        reviewCount: 0,
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    // Add all tours to Firestore
    let addedCount = 0;
    for (const tour of tours) {
      await adminDb.collection('tours').add(tour);
      addedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Added ${addedCount} tours to Firestore!`,
      count: addedCount,
    });
  } catch (error: any) {
    console.error('Error seeding tours:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}