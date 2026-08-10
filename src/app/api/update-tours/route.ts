import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    // =========================================
    // CORRECTED TOURS WITH FULL ITINERARIES
    // =========================================
    const tours = [
      // =========================================
      // 1. DITTILOU MOUNTAIN CAMP & CASCADE TOUR
      // =========================================
      {
        title: {
          en: 'Dittilou Mountain Camp & Cascade Tour',
          fr: 'Camp Montagne Dittilou & Cascade'
        },
        slug: {
          en: 'dittilou-mountain-camp',
          fr: 'camp-montagne-dittilou'
        },
        shortDescription: {
          en: 'Escape to the mountains of Dittilou. Trek through lush forests, swim under a waterfall, and sleep in a traditional toukoul camp.',
          fr: 'Évadez-vous vers les montagnes de Dittilou. Randonnée dans des forêts luxuriantes, baignade sous une cascade et nuit dans un camp traditionnel.'
        },
        description: {
          en: 'Dittilou Mountain Camp is a hidden gem in the Day Forest region. Located 1,500m above sea level, this verdant oasis offers stunning mountain views, waterfalls, and unique wildlife. Stay in traditional toukoul huts and experience the natural beauty of Djibouti\'s only forested region.',
          fr: 'Le Camp Montagne Dittilou est un joyau caché dans la région de la Forêt du Day. Situé à 1 500 m d\'altitude, cette oasis verdoyante offre des vues magnifiques sur les montagnes, des cascades et une faune unique. Séjournez dans des huttes traditionnelles et découvrez la beauté naturelle de la seule région forestière de Djibouti.'
        },
        price: 280,
        depositAmount: 56,
        currency: 'USD',
        duration: 2,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 8,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/dittilou-mountain-camp.jpg',
          gallery: [
            '/images/tours/dittilou-mountain-camp-1.jpg',
            '/images/tours/dittilou-mountain-camp-2.jpg',
            '/images/tours/dittilou-mountain-camp-3.jpg'
          ]
        },
        destinations: ['Day Forest', 'Dittilou'],
        highlights: {
          en: [
            'Sleep in a traditional toukoul hut',
            'Trek through lush mountain forests',
            'Swim under Douda Waterfall',
            'Spot green monkeys and unique birds',
            'Enjoy panoramic views of the Goda Mountains'
          ],
          fr: [
            'Nuit dans une hutte traditionnelle',
            'Randonnée dans les forêts luxuriantes',
            'Baignade sous la Cascade Douda',
            'Observation des singes verts et oiseaux uniques',
            'Vues panoramiques sur les Monts Goda'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti City → Dittilou Mountain Camp',
              fr: 'Djibouti Ville → Camp Montagne Dittilou'
            },
            description: {
              en: 'Depart from Djibouti City via RN9 towards Tadjourah. Stop at Goubet Al-Kharab ("abyss of the devils") and Lake Assal. Arrive at the Dittilou camp, a verdant mountain oasis at 1,500m. Settle into traditional toukoul huts. Enjoy a campfire and local cuisine for dinner.',
              fr: 'Départ de Djibouti Ville via la RN9 vers Tadjourah. Arrêt à Goubet Al-Kharab ("abysse des démons") et au Lac Assal. Arrivée au camp de Dittilou, une oasis montagneuse à 1 500 m d\'altitude. Installation dans des huttes traditionnelles. Dîner au coin du feu avec cuisine locale.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Douda Waterfall Trek & Return',
              fr: 'Randonnée Cascade Douda & Retour'
            },
            description: {
              en: 'Morning trek to Douda Waterfall — choose the challenging panoramic route or the easier path through Oued Toha. Swim in the natural pool beneath the 10m+ waterfall. Return to Dittilou camp for lunch. Drive back to Djibouti City via Tadjourah or Bankoualé.',
              fr: 'Randonnée matinale vers la Cascade Douda — choisissez l\'itinéraire panoramique difficile ou le chemin plus facile à travers Oued Toha. Baignade dans la piscine naturelle sous la cascade de 10 m+. Retour au camp de Dittilou pour le déjeuner. Retour à Djibouti Ville via Tadjourah ou Bankoualé.'
            }
          }
        ],
        included: {
          en: [
            '4x4 transportation with driver',
            'English/French-speaking guide',
            'Overnight at Dittilou camp (toukoul hut)',
            'Dinner, breakfast, and lunch',
            'Guided trek to Douda Waterfall',
            'Campfire experience'
          ],
          fr: [
            'Transport en 4x4 avec chauffeur',
            'Guide parlant anglais/français',
            'Nuit au camp de Dittilou (hutte toukoul)',
            'Dîner, petit-déjeuner et déjeuner',
            'Randonnée guidée vers la Cascade Douda',
            'Expérience au coin du feu'
          ]
        },
        excluded: {
          en: [
            'Tips and gratuities',
            'Personal expenses',
            'Travel insurance'
          ],
          fr: [
            'Pourboires',
            'Dépenses personnelles',
            'Assurance voyage'
          ]
        },
        whatToBring: {
          en: [
            'Hiking boots',
            'Swimsuit and towel (for waterfall)',
            'Warm layers (mountain nights are cool)',
            'Camera',
            'Insect repellent',
            'Sun cream'
          ],
          fr: [
            'Chaussures de randonnée',
            'Maillot de bain et serviette (pour la cascade)',
            'Vêtements chauds (les nuits en montagne sont fraîches)',
            'Appareil photo',
            'Anti-moustiques',
            'Crème solaire'
          ]
        },
        accommodation: {
          en: 'Traditional toukoul hut with modern amenities',
          fr: 'Hutte traditionnelle avec équipements modernes'
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
              en: 'Is Dittilou an island?',
              fr: 'Dittilou est-il une île ?'
            },
            answer: {
              en: 'No, Dittilou is a mountain camp in the Day Forest region at 1,500m elevation.',
              fr: 'Non, Dittilou est un camp de montagne dans la région de la Forêt du Day à 1 500 m d\'altitude.'
            }
          },
          {
            question: {
              en: 'How difficult is the trek to Douda Waterfall?',
              fr: 'La randonnée vers la Cascade Douda est-elle difficile ?'
            },
            answer: {
              en: 'Moderate. There are two route options — a challenging panoramic route and an easier path through Oued Toha.',
              fr: 'Modérée. Il y a deux options — un itinéraire panoramique difficile et un chemin plus facile à travers Oued Toha.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['nature', 'hiking', 'adventure'],
        tags: ['Dittilou', 'Day Forest', 'Waterfall', 'Camping', 'Trekking'],
        metaTitle: {
          en: 'Dittilou Mountain Camp & Cascade Tour | Djibouti Explorer',
          fr: 'Camp Montagne Dittilou & Cascade | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Escape to the mountains of Dittilou. Trek through lush forests, swim under a waterfall, and sleep in a traditional toukoul camp.',
          fr: 'Évadez-vous vers les montagnes de Dittilou. Randonnée dans des forêts luxuriantes, baignade sous une cascade et nuit dans un camp traditionnel.'
        },
        rating: 4.9,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 2. MOUCHA & MASKALI ISLANDS
      // =========================================
      {
        title: {
          en: 'Moucha & Maskali Islands Tour',
          fr: 'Îles Moucha & Maskali'
        },
        slug: {
          en: 'moucha-maskali-islands',
          fr: 'iles-moucha-maskali'
        },
        shortDescription: {
          en: 'Escape to paradise on the beautiful Moucha and Maskali Islands. Snorkel, swim, and relax on pristine beaches.',
          fr: 'Évadez-vous vers le paradis sur les magnifiques îles Moucha et Maskali. Snorkeling, baignade et détente sur des plages immaculées.'
        },
        description: {
          en: 'Discover the beauty of Moucha and Maskali Islands in the Gulf of Tadjoura. Relax on pristine white sand beaches, snorkel in crystal-clear turquoise waters, and enjoy a perfect day escape from the city. These uninhabited islands are home to vibrant coral reefs and tropical fish.',
          fr: 'Découvrez la beauté des Îles Moucha et Maskali dans le Golfe de Tadjoura. Détendez-vous sur des plages de sable blanc immaculé, faites du snorkeling dans des eaux turquoise cristallines et profitez d\'une escapade parfaite loin de la ville. Ces îles inhabitées abritent des récifs coralliens vibrants et des poissons tropicaux.'
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
          primary: '/images/tours/moucha-maskali-islands.jpg',
          gallery: [
            '/images/tours/moucha-maskali-islands-1.jpg',
            '/images/tours/moucha-maskali-islands-2.jpg',
            '/images/tours/moucha-maskali-islands-3.jpg'
          ]
        },
        destinations: ['Moucha Islands', 'Maskali Islands'],
        highlights: {
          en: [
            'White sand beaches',
            'Snorkeling in crystal-clear waters',
            'Coral reef exploration',
            'Marine life viewing',
            'Island escape'
          ],
          fr: [
            'Plages de sable blanc',
            'Snorkeling dans des eaux cristallines',
            'Exploration des récifs coralliens',
            'Observation de la vie marine',
            'Escapade insulaire'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Island Exploration',
              fr: 'Exploration des Îles'
            },
            description: {
              en: 'Board the boat at the marina and sail to the islands. Spend the day swimming, snorkeling, and relaxing on the beach. Explore the coral reefs, spot tropical fish, and enjoy a delicious lunch on the island. Return to Djibouti City in the afternoon.',
              fr: 'Montez à bord du bateau à la marina et naviguez vers les îles. Passez la journée à nager, faire du snorkeling et vous détendre sur la plage. Explorez les récifs coralliens, observez les poissons tropicaux et profitez d\'un délicieux déjeuner sur l\'île. Retour à Djibouti Ville dans l\'après-midi.'
            }
          }
        ],
        included: {
          en: [
            'Boat tour',
            'Snorkeling equipment',
            'Lunch',
            'Water and soft drinks',
            'Professional guide'
          ],
          fr: [
            'Tour en bateau',
            'Équipement de snorkeling',
            'Déjeuner',
            'Eau et boissons',
            'Guide professionnel'
          ]
        },
        excluded: {
          en: [
            'Hotel transfers',
            'Tips and gratuities',
            'Personal expenses'
          ],
          fr: [
            'Transferts hôteliers',
            'Pourboires',
            'Dépenses personnelles'
          ]
        },
        whatToBring: {
          en: [
            'Swimsuit',
            'Towel',
            'Sun cream',
            'Hat',
            'Underwater camera'
          ],
          fr: [
            'Maillot de bain',
            'Serviette',
            'Crème solaire',
            'Chapeau',
            'Appareil photo étanche'
          ]
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
          fr: 'Îles Moucha & Maskali | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Escape to paradise on Moucha and Maskali Islands with pristine beaches and snorkeling.',
          fr: 'Évadez-vous vers le paradis sur les Îles Moucha et Maskali avec des plages immaculées et du snorkeling.'
        },
        rating: 4.9,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 3. SEVEN BROTHERS ISLANDS
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
          en: 'The Seven Brothers Islands (Archipel des Sept Frères) are a hidden gem 300 km north of Djibouti City. This remote archipelago is home to thousands of seabirds, pristine beaches, and world-class diving spots. Perfect for nature lovers, photographers, and adventurers seeking an off-the-beaten-path experience.',
          fr: 'Les Îles des Sept Frères (Archipel des Sept Frères) sont un joyau caché à 300 km au nord de Djibouti Ville. Cet archipel isolé abrite des milliers d\'oiseaux marins, des plages immaculées et des spots de plongée de classe mondiale. Parfait pour les amoureux de la nature, les photographes et les aventuriers à la recherche d\'une expérience hors des sentiers battus.'
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
          primary: '/images/tours/seven-brothers-islands.jpg',
          gallery: [
            '/images/tours/seven-brothers-islands-1.jpg',
            '/images/tours/seven-brothers-islands-2.jpg',
            '/images/tours/seven-brothers-islands-3.jpg'
          ]
        },
        destinations: ['Seven Brothers Islands'],
        highlights: {
          en: [
            'Seabird colonies',
            'Remote island experience',
            'World-class snorkeling',
            'Camping under the stars',
            'Photography opportunities'
          ],
          fr: [
            'Colonies d\'oiseaux marins',
            'Expérience insulaire isolée',
            'Snorkeling de classe mondiale',
            'Camping à la belle étoile',
            'Opportunités photographiques'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Island Discovery',
              fr: 'Découverte des Îles'
            },
            description: {
              en: 'Early morning departure from Djibouti City Marina. Sail 300 km north to the Seven Brothers Islands archipelago. Explore the islands, watch seabirds, and snorkel in pristine waters. Set up camp on the main island and enjoy a sunset dinner.',
              fr: 'Départ tôt le matin de la Marina de Djibouti Ville. Naviguez 300 km vers le nord vers l\'archipel des Sept Frères. Explorez les îles, observez les oiseaux marins et faites du snorkeling dans des eaux préservées. Installez le camp sur l\'île principale et profitez d\'un dîner au coucher du soleil.'
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
          en: [
            'Boat tour',
            'Camping equipment',
            'Snorkeling equipment',
            'All meals',
            'Water and soft drinks',
            'Professional guide'
          ],
          fr: [
            'Tour en bateau',
            'Équipement de camping',
            'Équipement de snorkeling',
            'Tous les repas',
            'Eau et boissons',
            'Guide professionnel'
          ]
        },
        excluded: {
          en: [
            'Hotel transfers',
            'Tips and gratuities',
            'Personal expenses'
          ],
          fr: [
            'Transferts hôteliers',
            'Pourboires',
            'Dépenses personnelles'
          ]
        },
        whatToBring: {
          en: [
            'Swimsuit',
            'Towel',
            'Sun cream',
            'Hat',
            'Camera',
            'Warm clothes for night'
          ],
          fr: [
            'Maillot de bain',
            'Serviette',
            'Crème solaire',
            'Chapeau',
            'Appareil photo',
            'Vêtements chauds pour la nuit'
          ]
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
        rating: 4.8,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // =========================================
      // 4. TADJOURAH & SABLE BLANC BEACH
      // =========================================
      {
        title: {
          en: 'Tadjourah & Sable Blanc Beach Tour',
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
          primary: '/images/tours/tadjourah-sable-blanc.jpg',
          gallery: [
            '/images/tours/tadjourah-sable-blanc-1.jpg',
            '/images/tours/tadjourah-sable-blanc-2.jpg'
          ]
        },
        destinations: ['Tadjourah'],
        highlights: {
          en: [
            'Historic Tadjourah',
            'French colonial architecture',
            'Local market',
            'Sable Blanc Beach',
            'Red Sea views'
          ],
          fr: [
            'Tadjourah historique',
            'Architecture coloniale française',
            'Marché local',
            'Plage de Sable Blanc',
            'Vues sur la Mer Rouge'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Tadjourah & Beach',
              fr: 'Tadjourah & Plage'
            },
            description: {
              en: 'Drive 173 km from Djibouti City to Tadjourah, the historic "White City". Explore the town, visit the market, and learn about the local culture. Then continue to Sable Blanc Beach for swimming, relaxation, and lunch with a view. Return to Djibouti City in the late afternoon.',
              fr: 'Conduite de 173 km de Djibouti Ville vers Tadjourah, la "Ville Blanche" historique. Explorez la ville, visitez le marché et découvrez la culture locale. Continuez ensuite vers la Plage de Sable Blanc pour la baignade, la détente et un déjeuner avec vue. Retour à Djibouti Ville en fin d\'après-midi.'
            }
          }
        ],
        included: {
          en: [
            'Hotel pickup and drop-off',
            'Professional guide',
            'Entrance fees',
            'Lunch',
            'Water and soft drinks'
          ],
          fr: [
            'Prise en charge et dépôt à l\'hôtel',
            'Guide professionnel',
            'Frais d\'entrée',
            'Déjeuner',
            'Eau et boissons'
          ]
        },
        excluded: {
          en: [
            'Tips and gratuities',
            'Personal expenses',
            'Travel insurance'
          ],
          fr: [
            'Pourboires',
            'Dépenses personnelles',
            'Assurance voyage'
          ]
        },
        whatToBring: {
          en: [
            'Swimsuit',
            'Towel',
            'Sun cream',
            'Hat',
            'Comfortable shoes',
            'Camera'
          ],
          fr: [
            'Maillot de bain',
            'Serviette',
            'Crème solaire',
            'Chapeau',
            'Chaussures confortables',
            'Appareil photo'
          ]
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
          fr: 'Tadjourah & Plage de Sable Blanc | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Discover historic Tadjourah and relax on Sable Blanc Beach.',
          fr: 'Découvrez Tadjourah historique et détendez-vous sur la Plage de Sable Blanc.'
        },
        rating: 4.6,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // =========================================
      // 5. DJIBOUTI CITY CULTURE TOUR
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
          primary: '/images/tours/djibouti-city-culture-tour.jpg',
          gallery: [
            '/images/tours/djibouti-city-culture-tour-1.jpg',
            '/images/tours/djibouti-city-culture-tour-2.jpg'
          ]
        },
        destinations: ['Djibouti City'],
        highlights: {
          en: [
            'Hamoudi Market',
            'French colonial architecture',
            'Place du 27 Juin',
            'National Museum',
            'Cultural heritage'
          ],
          fr: [
            'Marché Hamoudi',
            'Architecture coloniale française',
            'Place du 27 Juin',
            'Musée national',
            'Patrimoine culturel'
          ]
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
          en: [
            'Professional guide',
            'Museum entrance fees',
            'Water and soft drinks'
          ],
          fr: [
            'Guide professionnel',
            'Billets d\'entrée du musée',
            'Eau et boissons'
          ]
        },
        excluded: {
          en: [
            'Hotel pickup and drop-off',
            'Tips and gratuities',
            'Personal expenses'
          ],
          fr: [
            'Prise en charge et dépôt à l\'hôtel',
            'Pourboires',
            'Dépenses personnelles'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable walking shoes',
            'Camera',
            'Sun cream',
            'Hat'
          ],
          fr: [
            'Chaussures de marche confortables',
            'Appareil photo',
            'Crème solaire',
            'Chapeau'
          ]
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
        rating: 4.5,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // =========================================
      // 6. LAKE ASSAL & LAKE ABBÉ 2-DAY TOUR
      // =========================================
      {
        title: {
          en: 'Lake Assal & Lac Abbé 2-Day Tour',
          fr: 'Lac Assal & Lac Abbé 2 Jours'
        },
        slug: {
          en: 'lake-assal-lac-abbe',
          fr: 'lac-assal-lac-abbe'
        },
        shortDescription: {
          en: 'Visit the lowest point in Africa and the surreal limestone chimneys of Lac Abbé in this 2-day adventure.',
          fr: 'Visitez le point le plus bas d\'Afrique et les cheminées de calcaire surréalistes du Lac Abbé dans cette aventure de 2 jours.'
        },
        description: {
          en: 'Combine two of Djibouti\'s most spectacular natural wonders. Explore Lake Assal (the lowest point in Africa at 153m below sea level) and the otherworldly landscape of Lac Abbé with its iconic limestone chimneys.',
          fr: 'Combinez deux des merveilles naturelles les plus spectaculaires de Djibouti. Explorez le Lac Assal (le point le plus bas d\'Afrique à 153 m sous le niveau de la mer) et le paysage surréaliste du Lac Abbé avec ses cheminées de calcaire emblématiques.'
        },
        price: 350,
        depositAmount: 70,
        currency: 'USD',
        duration: 2,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 10,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/lake-assal-lac-abbe.jpg',
          gallery: [
            '/images/tours/lake-assal-lac-abbe-1.jpg',
            '/images/tours/lake-assal-lac-abbe-2.jpg'
          ]
        },
        destinations: ['Lake Assal', 'Lac Abbé', 'Ardoukoba'],
        highlights: {
          en: [
            'Lowest point in Africa (153m below sea level)',
            'Walk on the salt flats of Lake Assal',
            'Surreal limestone chimneys of Lac Abbé',
            'Visit Ardoukoba volcano',
            'Goubet Al-Kharab "Abyss of the Devils"'
          ],
          fr: [
            'Point le plus bas d\'Afrique (153 m sous le niveau de la mer)',
            'Marche sur les plaines de sel du Lac Assal',
            'Cheminées de calcaire surréalistes du Lac Abbé',
            'Visite du volcan Ardoukoba',
            'Goubet Al-Kharab "Abysse des démons"'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Lake Assal & Goubet Al-Kharab',
              fr: 'Lac Assal & Goubet Al-Kharab'
            },
            description: {
              en: 'Drive from Djibouti City to Lake Assal — the lowest point in Africa at 153m below sea level. Walk on the salt flats and float in the saltiest lake on Earth. Visit Ardoukoba volcano and stop at Goubet Al-Kharab ("abyss of the devils"). Overnight near Lac Abbé.',
              fr: 'Conduite de Djibouti Ville vers le Lac Assal — le point le plus bas d\'Afrique à 153 m sous le niveau de la mer. Marche sur les plaines de sel et baignade dans le lac le plus salé de la Terre. Visite du volcan Ardoukoba et arrêt à Goubet Al-Kharab ("abysse des démons"). Nuit près du Lac Abbé.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Lac Abbé & Return',
              fr: 'Lac Abbé & Retour'
            },
            description: {
              en: 'Visit Lac Abbé — a salt lake with surreal limestone chimneys. Explore the otherworldly landscape and photograph the iconic chimneys. Return to Djibouti City in the afternoon.',
              fr: 'Visite du Lac Abbé — un lac salé avec des cheminées de calcaire surréalistes. Explorez le paysage d\'un autre monde et photographiez les cheminées emblématiques. Retour à Djibouti Ville dans l\'après-midi.'
            }
          }
        ],
        included: {
          en: [
            'Hotel pickup and drop-off',
            'Professional guide',
            'Camping equipment',
            'All meals',
            'Water and soft drinks'
          ],
          fr: [
            'Prise en charge et dépôt à l\'hôtel',
            'Guide professionnel',
            'Équipement de camping',
            'Tous les repas',
            'Eau et boissons'
          ]
        },
        excluded: {
          en: [
            'Tips and gratuities',
            'Personal expenses',
            'Travel insurance'
          ],
          fr: [
            'Pourboires',
            'Dépenses personnelles',
            'Assurance voyage'
          ]
        },
        whatToBring: {
          en: [
            'Warm clothing',
            'Comfortable hiking shoes',
            'Sun cream',
            'Hat',
            'Camera'
          ],
          fr: [
            'Vêtements chauds',
            'Chaussures de randonnée confortables',
            'Crème solaire',
            'Chapeau',
            'Appareil photo'
          ]
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
              en: 'Is it safe to swim in Lake Assal?',
              fr: 'Est-il sûr de nager dans le Lac Assal ?'
            },
            answer: {
              en: 'Yes! The water is incredibly salty and buoyant, making swimming a unique experience.',
              fr: 'Oui ! L\'eau est incroyablement salée et flottante, ce qui rend la baignade une expérience unique.'
            }
          }
        ],
        itineraryPdfUrl: { en: '', fr: '' },
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['adventure', 'hiking'],
        tags: ['Lake Assal', 'Lac Abbé', 'Volcano', 'Camping'],
        metaTitle: {
          en: 'Lake Assal & Lac Abbé Tour | Djibouti Explorer',
          fr: 'Circuit Lac Assal & Lac Abbé | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Visit the lowest point in Africa and the surreal limestone chimneys of Lac Abbé.',
          fr: 'Visitez le point le plus bas d\'Afrique et les cheminées de calcaire surréalistes du Lac Abbé.'
        },
        rating: 4.9,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // =========================================
      // 7. DAY FOREST & GODA MOUNTAINS
      // =========================================
      {
        title: {
          en: 'Day Forest & Goda Mountains Discovery',
          fr: 'Découverte de la Forêt du Day & Monts Goda'
        },
        slug: {
          en: 'day-forest-goda-mountains',
          fr: 'foret-day-monts-goda'
        },
        shortDescription: {
          en: 'Escape to Djibouti\'s only forest. Trek through giant junipers and discover the lush Goda Mountains.',
          fr: 'Évadez-vous vers la seule forêt de Djibouti. Randonnée à travers les genévriers géants et découverte des Monts Goda.'
        },
        description: {
          en: 'Discover the hidden paradise of Day Forest National Park — the only forested area in Djibouti. Trek through giant junipers, acacias, and wild olive trees at 1,500m elevation. Spot unique bird species and enjoy panoramic mountain views.',
          fr: 'Découvrez le paradis caché du Parc National de la Forêt du Day — la seule zone forestière de Djibouti. Randonnée à travers les genévriers géants, les acacias et les oliviers sauvages à 1 500 m d\'altitude. Observation d\'espèces d\'oiseaux uniques et vues panoramiques sur les montagnes.'
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
          primary: '/images/tours/day-forest-goda-mountains.jpg',
          gallery: [
            '/images/tours/day-forest-goda-mountains-1.jpg',
            '/images/tours/day-forest-goda-mountains-2.jpg'
          ]
        },
        destinations: ['Day Forest'],
        highlights: {
          en: [
            'Trek through giant junipers',
            'Bird watching in the forest',
            'Panoramic views of the Goda Mountains',
            'Cool mountain air',
            'Unique flora and fauna'
          ],
          fr: [
            'Randonnée à travers les genévriers géants',
            'Observation des oiseaux dans la forêt',
            'Vues panoramiques sur les Monts Goda',
            'Air frais de la montagne',
            'Flore et faune uniques'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Day Forest Trek',
              fr: 'Randonnée Forêt du Day'
            },
            description: {
              en: 'Drive from Djibouti City to Day Forest National Park. Trek through the forest at 1,500m elevation. Spot unique birds and plants. Enjoy a picnic lunch in the forest with mountain views. Return to Djibouti City in the afternoon.',
              fr: 'Conduite de Djibouti Ville vers le Parc National de la Forêt du Day. Randonnée à travers la forêt à 1 500 m d\'altitude. Observation d\'oiseaux et de plantes uniques. Profitez d\'un déjeuner pique-nique dans la forêt avec vue sur les montagnes. Retour à Djibouti Ville dans l\'après-midi.'
            }
          }
        ],
        included: {
          en: [
            'Hotel pickup and drop-off',
            'Professional guide',
            'Picnic lunch',
            'Water and soft drinks'
          ],
          fr: [
            'Prise en charge et dépôt à l\'hôtel',
            'Guide professionnel',
            'Déjeuner pique-nique',
            'Eau et boissons'
          ]
        },
        excluded: {
          en: [
            'Tips and gratuities',
            'Personal expenses',
            'Travel insurance'
          ],
          fr: [
            'Pourboires',
            'Dépenses personnelles',
            'Assurance voyage'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable hiking shoes',
            'Sun cream',
            'Hat',
            'Camera',
            'Insect repellent'
          ],
          fr: [
            'Chaussures de randonnée confortables',
            'Crème solaire',
            'Chapeau',
            'Appareil photo',
            'Anti-moustiques'
          ]
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
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['nature', 'hiking'],
        tags: ['Day Forest', 'Goda Mountains', 'Bird Watching', 'Trekking'],
        metaTitle: {
          en: 'Day Forest & Goda Mountains Discovery | Djibouti Explorer',
          fr: 'Découverte de la Forêt du Day & Monts Goda | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Explore the lush Goda Mountains and Day Forest, Djibouti\'s only forested area.',
          fr: 'Explorez les Monts Goda et la Forêt du Day, la seule zone forestière de Djibouti.'
        },
        rating: 4.7,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let addedCount = 0;
    let updatedCount = 0;

    for (const tour of tours) {
      const existing = await adminDb.collection('tours')
        .where('slug.en', '==', tour.slug.en)
        .get();

      if (existing.empty) {
        await adminDb.collection('tours').add(tour);
        addedCount++;
      } else {
        const doc = existing.docs[0];
        await adminDb.collection('tours').doc(doc!.id).update(tour);
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Added ${addedCount} new tours and updated ${updatedCount} existing tours!`,
      added: addedCount,
      updated: updatedCount,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}