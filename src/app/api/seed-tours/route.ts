import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const sampleTours = [
      {
        title: { 
          en: 'Lake Assal Discovery', 
          fr: 'Découverte du Lac Assal' 
        },
        slug: { 
          en: 'lake-assal-discovery', 
          fr: 'decouverte-lac-assal' 
        },
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
          primary: '',
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
              en: 'Early morning departure from your hotel in Djibouti City. Drive through the stunning landscapes of the Danakil Depression, arriving at Lake Assal by mid-morning. Spend the day exploring the lake, swimming, and learning about the local salt mining.',
              fr: 'Départ tôt le matin de votre hôtel à Djibouti Ville. Traversez les paysages spectaculaires de la dépression de Danakil, arrivant au Lac Assal en milieu de matinée. Passez la journée à explorer le lac, à nager et à découvrir l\'extraction du sel local.'
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
        accommodation: { 
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
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
          },
          {
            question: { 
              en: 'Is it safe to swim in Lake Assal?',
              fr: 'Est-il sûr de nager dans le Lac Assal ?'
            },
            answer: { 
              en: 'Yes, it is safe to swim in Lake Assal. The water is incredibly salty and buoyant, making swimming a unique experience.',
              fr: 'Oui, il est sûr de nager dans le Lac Assal. L\'eau est incroyablement salée et flottante, ce qui rend la baignade une expérience unique.'
            }
          }
        ],
        itineraryPdfUrl: { 
          en: '',
          fr: ''
        },
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
        reviewCount: 42,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: { 
          en: 'Whale Shark Adventure', 
          fr: 'Aventure Requin-Baleine' 
        },
        slug: { 
          en: 'whale-shark-adventure', 
          fr: 'aventure-requin-baleine' 
        },
        shortDescription: { 
          en: 'Swim with gentle giants in the crystal-clear waters of the Gulf of Tadjoura.',
          fr: 'Nagez avec les géants des mers dans les eaux cristallines du Golfe de Tadjoura.'
        },
        description: { 
          en: 'Experience the thrill of swimming with whale sharks, the largest fish in the ocean, in the pristine waters of the Gulf of Tadjoura. This once-in-a-lifetime adventure takes you to the feeding grounds of these magnificent creatures.',
          fr: 'Vivez l\'excitation de nager avec les requins-baleines, les plus grands poissons de l\'océan, dans les eaux immaculées du Golfe de Tadjoura. Cette aventure unique vous emmène dans les zones d\'alimentation de ces magnifiques créatures.'
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
          primary: '',
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
              en: 'Meet at the Djibouti City Marina at 6:00 AM. Board our boat and sail to the whale shark feeding grounds. Spend the morning swimming with these magnificent creatures.',
              fr: 'Rendez-vous à la Marina de Djibouti Ville à 6h00. Montez à bord de notre bateau et naviguez vers les zones d\'alimentation des requins-baleines. Passez la matinée à nager avec ces magnifiques créatures.'
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
          en: '',
          fr: ''
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
        rating: 4.8,
        reviewCount: 38,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
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
          primary: '',
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
        itineraryPdfUrl: { 
          en: '',
          fr: ''
        },
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
        reviewCount: 29,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
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
          primary: '',
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
        itineraryPdfUrl: { 
          en: '',
          fr: ''
        },
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
        reviewCount: 21,
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
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
          primary: '',
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
        itineraryPdfUrl: { 
          en: '',
          fr: ''
        },
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
        reviewCount: 34,
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
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
          primary: '',
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
        itineraryPdfUrl: { 
          en: '',
          fr: ''
        },
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
        reviewCount: 18,
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    // Add all tours to Firestore
    let addedCount = 0;
    for (const tour of sampleTours) {
      await adminDb.collection('tours').add(tour);
      addedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Added ${addedCount} sample tours to Firestore`,
      toursAdded: addedCount,
    });
  } catch (error: any) {
    console.error('Error seeding tours:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed tours' },
      { status: 400 }
    );
  }
}