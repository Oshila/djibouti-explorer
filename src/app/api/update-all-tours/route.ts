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
          en: 'seven-brothers-islands-expedition',
          fr: 'expedition-sept-freres'
        },
        shortDescription: {
          en: 'Duration: 7–8 Days / 6–7 Nights. A liveaboard diving expedition to the remote Seven Brothers archipelago in the Bab-el-Mandeb Strait.',
          fr: 'Durée: 7–8 Jours / 6–7 Nuits. Une expédition de plongée liveaboard vers l\'archipel isolé des Sept Frères dans le détroit de Bab-el-Mandeb.'
        },
        description: {
          en: 'The Seven Brothers Islands Expedition is a liveaboard diving adventure into one of the most remote and dramatic underwater environments in the Red Sea. Located in the Bab-el-Mandeb Strait, the Seven Brothers archipelago is known for its volcanic walls, strong currents, coral gardens and encounters with pelagic fish, rays and reef sharks. This expedition is designed for experienced divers with advanced certification and logged drift-diving experience.',
          fr: 'L\'Expédition des Sept Frères est une aventure de plongée liveaboard dans l\'un des environnements sous-marins les plus isolés et spectaculaires de la Mer Rouge. Situé dans le détroit de Bab-el-Mandeb, l\'archipel des Sept Frères est connu pour ses murs volcaniques, ses courants forts, ses jardins de corail et ses rencontres avec des poissons pélagiques, des raies et des requins de récif.'
        },
        price: 3200,
        depositAmount: 640,
        currency: 'USD',
        duration: 8,
        maxGroupSize: 12,
        difficulty: 'advanced',
        minAge: 18,
        meetingPoint: {
          en: 'Djibouti City Marina',
          fr: 'Marina de Djibouti Ville'
        },
        images: {
          primary: '/images/tours/seven-brothers-expedition.jpg',
          gallery: []
        },
        destinations: ['Seven Brothers Islands', 'Bab-el-Mandeb Strait', 'Obock', 'Moucha Island'],
        highlights: {
          en: [
            '7–8 day liveaboard diving expedition',
            'Remote volcanic archipelago in the Bab-el-Mandeb Strait',
            'Dramatic underwater walls and drop-offs',
            'Coral gardens and large schools of pelagic fish',
            'White Lady Wreck and Arch of Tolka',
            'Barracuda, jacks, tuna, groupers, rays and reef sharks',
            'Night diving where conditions permit'
          ],
          fr: [
            'Expédition de plongée liveaboard de 7 à 8 jours',
            'Archipel volcanique isolé dans le détroit de Bab-el-Mandeb',
            'Murs sous-marins spectaculaires et tombants',
            'Jardins de corail et grands bancs de poissons pélagiques',
            'Épave White Lady et Arche de Tolka',
            'Barracudas, carangues, thons, mérous, raies et requins de récif',
            'Plongée de nuit lorsque les conditions le permettent'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Arrival in Djibouti & Boarding',
              fr: 'Arrivée à Djibouti & Embarquement'
            },
            description: {
              en: 'Afternoon: Arrival in Djibouti. We will welcome you at Djibouti–Ambouli International Airport and transfer you to the marina, where you will board the liveaboard vessel. After settling into your cabin, the crew will conduct a safety briefing and equipment check. Divers will present their certification and logbooks, and the dive team will assess experience levels before the expedition begins. Depending on the vessel and departure schedule, the first night may be spent aboard the boat in Djibouti port.',
              fr: 'Après-midi: Arrivée à Djibouti. Nous vous accueillerons à l\'aéroport international de Djibouti–Ambouli et vous transférerons à la marina, où vous embarquerez sur le liveaboard. Après l\'installation dans votre cabine, l\'équipage procédera à un briefing de sécurité et à une vérification de l\'équipement. Les plongeurs présenteront leur certification et leurs carnets de plongée, et l\'équipe de plongée évaluera les niveaux d\'expérience avant le début de l\'expédition. Selon le navire et l\'horaire de départ, la première nuit peut être passée à bord au port de Djibouti.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Moucha Island & Obock — Check Dives',
              fr: 'Île Moucha & Obock — Plongées de Vérification'
            },
            description: {
              en: 'We will cruise toward Moucha Island, located off the coast of Djibouti City. The first dive is normally a check dive, allowing the guides to assess everyone\'s comfort, buoyancy and experience before the expedition reaches the more remote Seven Brothers. Additional diving may take place around Moucha or Obock before we continue north toward the Seven Brothers archipelago. Overnight aboard the liveaboard.',
              fr: 'Nous naviguerons vers l\'île Moucha, située au large de Djibouti Ville. La première plongée est normalement une plongée de vérification, permettant aux guides d\'évaluer le confort, la flottabilité et l\'expérience de chacun avant que l\'expédition n\'atteigne les Sept Frères. Des plongées supplémentaires peuvent avoir lieu autour de Moucha ou d\'Obock avant de continuer vers le nord vers l\'archipel des Sept Frères. Nuit à bord du liveaboard.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Seven Brothers — Chinese Garden & Boeing',
              fr: 'Sept Frères — Chinese Garden & Boeing'
            },
            description: {
              en: 'We reach the Seven Brothers, a remote volcanic archipelago in the Bab-el-Mandeb Strait. The area is famous for its dramatic underwater walls, drop-offs, coral gardens and large schools of pelagic fish. Depending on sea and current conditions, dives may include Chinese Garden and Boeing East, followed by additional dives around the islands. Marine life can include barracuda, jacks, tuna, groupers, rays, reef sharks and other pelagic species. A night dive may be offered where conditions and the operator\'s schedule permit. Overnight aboard the liveaboard.',
              fr: 'Nous atteignons les Sept Frères, un archipel volcanique isolé dans le détroit de Bab-el-Mandeb. La région est célèbre pour ses murs sous-marins spectaculaires, ses tombants, ses jardins de corail et ses grands bancs de poissons pélagiques. Selon les conditions de la mer et des courants, les plongées peuvent inclure Chinese Garden et Boeing East, suivies de plongées supplémentaires autour des îles. La vie marine peut inclure des barracudas, carangues, thons, mérous, raies, requins de récif et autres espèces pélagiques. Une plongée de nuit peut être proposée lorsque les conditions et le calendrier de l\'opérateur le permettent. Nuit à bord du liveaboard.'
            }
          },
          {
            day: 4,
            title: {
              en: 'Japanese Garden & Eastern Islands',
              fr: 'Japanese Garden & Îles de l\'Est'
            },
            description: {
              en: 'We continue exploring the Seven Brothers underwater environment. Possible dive sites include the South Island, East Island and Japanese Garden, with healthy coral formations and steep volcanic walls. The strong currents around parts of the archipelago bring nutrient-rich water and attract large schools of fish and other pelagic species. Up to three dives may be scheduled depending on the vessel and conditions. Overnight aboard the liveaboard.',
              fr: 'Nous continuons l\'exploration de l\'environnement sous-marin des Sept Frères. Les sites de plongée possibles incluent l\'île du Sud, l\'île de l\'Est et Japanese Garden, avec des formations coralliennes saines et des murs volcaniques abrupts. Les courants forts autour de certaines parties de l\'archipel apportent des eaux riches en nutriments et attirent de grands bancs de poissons et d\'autres espèces pélagiques. Jusqu\'à trois plongées peuvent être programmées selon le navire et les conditions. Nuit à bord du liveaboard.'
            }
          },
          {
            day: 5,
            title: {
              en: 'White Lady Wreck & Seven Brothers',
              fr: 'Épave White Lady & Sept Frères'
            },
            description: {
              en: 'Today focuses on some of the area\'s signature sites. We may explore the White Lady wreck, a remote wreck site decorated with marine growth and surrounded by reef life. Additional dives may take place around the Seven Brothers, with opportunities for underwater photography and encounters with large schools of fish, rays and sharks. Night diving may be possible depending on weather and current conditions. Overnight aboard the liveaboard.',
              fr: 'Aujourd\'hui, nous nous concentrons sur certains des sites emblématiques de la région. Nous pourrons explorer l\'épave White Lady, un site d\'épave isolé orné de croissance marine et entouré de vie récifale. Des plongées supplémentaires peuvent avoir lieu autour des Sept Frères, avec des opportunités de photographie sous-marine et des rencontres avec de grands bancs de poissons, des raies et des requins. La plongée de nuit peut être possible selon la météo et les conditions de courant. Nuit à bord du liveaboard.'
            }
          },
          {
            day: 6,
            title: {
              en: 'Arch of Tolka & Round Island',
              fr: 'Arche de Tolka & Round Island'
            },
            description: {
              en: 'We continue exploring the southern and western sections of the archipelago. Possible sites include the Arch of Tolka, Round Island and Boeing West. The underwater scenery changes from coral gardens to volcanic walls, arches and deeper drop-offs. The exact sequence of sites is determined by the captain and dive guides according to tides, currents and visibility.',
              fr: 'Nous continuons l\'exploration des sections sud et ouest de l\'archipel. Les sites possibles incluent l\'Arche de Tolka, Round Island et Boeing West. Le paysage sous-marin passe des jardins de corail aux murs volcaniques, aux arches et aux tombants plus profonds. La séquence exacte des sites est déterminée par le capitaine et les guides de plongée en fonction des marées, des courants et de la visibilité.'
            }
          },
          {
            day: 7,
            title: {
              en: 'Obock & Return Journey',
              fr: 'Obock & Retour'
            },
            description: {
              en: 'After the final dives around the Seven Brothers, we begin cruising back toward Djibouti. Depending on the itinerary, a final dive may be made around Obock or another suitable site. The afternoon is spent cruising toward Djibouti City. Dinner and overnight aboard the vessel.',
              fr: 'Après les dernières plongées autour des Sept Frères, nous commençons la navigation de retour vers Djibouti. Selon l\'itinéraire, une dernière plongée peut être effectuée autour d\'Obock ou d\'un autre site approprié. L\'après-midi est consacrée à la navigation vers Djibouti Ville. Dîner et nuit à bord.'
            }
          },
          {
            day: 8,
            title: {
              en: 'Disembarkation',
              fr: 'Débarquement'
            },
            description: {
              en: 'After breakfast, we return to Djibouti port. The crew will assist with disembarkation before transfer to the airport or your hotel.',
              fr: 'Après le petit-déjeuner, nous retournons au port de Djibouti. L\'équipage vous aidera à débarquer avant le transfert vers l\'aéroport ou votre hôtel.'
            }
          }
        ],
        included: {
          en: [
            'Liveaboard accommodation',
            'Breakfast, lunch and dinner aboard the vessel',
            'Snacks and drinking water',
            'Experienced English-speaking dive guides/divemasters',
            'Tanks, weights and belts',
            'Scheduled dives according to the selected itinerary',
            'Local airport/hotel transfers where offered by the operator',
            'Boat transportation',
            'Marine/site logistics'
          ],
          fr: [
            'Hébergement liveaboard',
            'Petit-déjeuner, déjeuner et dîner à bord',
            'Collations et eau potable',
            'Guides de plongée / moniteurs anglophones expérimentés',
            'Bouteilles, poids et ceintures',
            'Plongées programmées selon l\'itinéraire choisi',
            'Transferts aéroport/hôtel locaux proposés par l\'opérateur',
            'Transport en bateau',
            'Logistique marine/site'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Djibouti visa',
            'Travel insurance',
            'Mandatory diving insurance',
            'Personal diving equipment rental',
            'Dive computer',
            'Torch',
            'SMB',
            'Nitrox (unless specifically included)',
            'Alcoholic beverages',
            'Personal expenses',
            'Tips',
            'Accommodation before/after the liveaboard unless specified'
          ],
          fr: [
            'Vols internationaux',
            'Visa Djibouti',
            'Assurance voyage',
            'Assurance plongée obligatoire',
            'Location d\'équipement de plongée personnel',
            'Ordinateur de plongée',
            'Lampe torche',
            'SMB',
            'Nitrox (sauf mention contraire)',
            'Boissons alcoolisées',
            'Dépenses personnelles',
            'Pourboires',
            'Hébergement avant/après le liveaboard sauf mention contraire'
          ]
        },
        whatToBring: {
          en: [
            'Dive certification and logbook',
            'Personal diving equipment (BCD, regulator, wetsuit, mask, fins)',
            'Dive computer',
            'Underwater camera',
            'Torch (for night dives)',
            'Reef-safe sunscreen',
            'Hat and sunglasses',
            'Light clothing for the boat',
            'Motion sickness medication'
          ],
          fr: [
            'Certification de plongée et carnet de plongée',
            'Équipement de plongée personnel (STM, détendeur, combinaison, masque, palmes)',
            'Ordinateur de plongée',
            'Appareil photo sous-marin',
            'Lampe torche (pour les plongées de nuit)',
            'Crème solaire respectueuse des récifs',
            'Chapeau et lunettes de soleil',
            'Vêtements légers pour le bateau',
            'Médicament contre le mal de mer'
          ]
        },
        accommodation: {
          en: 'Liveaboard cabin with en-suite facilities',
          fr: 'Cabine liveaboard avec salle de bain privée'
        },
        transportation: {
          en: 'Liveaboard vessel with full diving facilities',
          fr: 'Bateau liveaboard avec installations de plongée complètes'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 30 days before the tour. 50% refund for cancellations within 30 days. No refund for no-shows.',
          fr: 'Annulation gratuite jusqu\'à 30 jours avant le circuit. Remboursement de 50 % pour les annulations dans les 30 jours. Aucun remboursement pour les non-présentations.'
        },
        faqs: [
          {
            question: {
              en: 'Do I need to be an experienced diver?',
              fr: 'Dois-je être un plongeur expérimenté ?'
            },
            answer: {
              en: 'Yes, Seven Brothers diving can involve strong currents and is best suited to experienced divers. Some liveaboard itineraries recommend advanced certification and logged drift-diving experience.',
              fr: 'Oui, la plongée aux Sept Frères peut impliquer de forts courants et est idéale pour les plongeurs expérimentés. Certains itinéraires liveaboard recommandent une certification avancée et une expérience de plongée dérivante.'
            }
          }
        ],
        bestSeasons: ['oct', 'nov', 'dec', 'jan', 'feb'],
        categories: ['diving', 'adventure', 'wildlife'],
        tags: ['Seven Brothers', 'Diving', 'Liveaboard', 'Red Sea'],
        metaTitle: {
          en: 'Seven Brothers Islands Diving Expedition | Djibouti Explorer',
          fr: 'Expédition de Plongée aux Sept Frères | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 7–8 day liveaboard diving expedition to the remote Seven Brothers archipelago in the Bab-el-Mandeb Strait.',
          fr: 'Une expédition de plongée liveaboard de 7 à 8 jours vers l\'archipel isolé des Sept Frères dans le détroit de Bab-el-Mandeb.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 2. Djibouti City Culture Tour
      // =========================================
      {
        title: {
          en: 'Djibouti City Culture Tour',
          fr: 'Circuit Culturel de Djibouti Ville'
        },
        slug: {
          en: 'djibouti-city-culture-tour',
          fr: 'circuit-culturel-djibouti-ville'
        },
        shortDescription: {
          en: 'Duration: 1 Day / Approximately 5–7 Hours. Discover the fascinating culture, history and markets of Djibouti City.',
          fr: 'Durée: 1 Jour / Environ 5–7 Heures. Découvrez la culture fascinante, l\'histoire et les marchés de Djibouti Ville.'
        },
        description: {
          en: 'Explore Djibouti City, a fascinating meeting point of African, Arab and French influences. We begin with hotel or airport pickup and start our exploration of Djibouti City. Our first drive takes us through the city\'s modern districts before continuing toward the historic centre. We will visit the European Quarter, where colonial-era architecture, older streets and historic buildings provide an introduction to Djibouti\'s French colonial past. We continue toward the port and marina area, one of the most important economic centres of the country. Afternoon: Markets, Mosques & Local Life. We will walk through the traditional markets and souks. A stop at Hamoudi Mosque provides an opportunity to appreciate one of Djibouti City\'s best-known landmarks.',
          fr: 'Explorez Djibouti Ville, un carrefour fascinant d\'influences africaines, arabes et françaises. Nous commençons par une prise en charge à l\'hôtel ou à l\'aéroport et commençons notre exploration de Djibouti Ville. Notre premier trajet nous fait traverser les districts modernes de la ville avant de continuer vers le centre historique. Nous visiterons le Quartier Européen, où l\'architecture coloniale, les rues anciennes et les bâtiments historiques offrent une introduction au passé colonial français de Djibouti. Nous continuons vers le port et la marina, l\'un des centres économiques les plus importants du pays. Après-midi: Marchés, Mosquées & Vie Locale. Nous parcourrons les marchés et souks traditionnels. Un arrêt à la Mosquée Hamoudi offre l\'occasion d\'apprécier l\'un des monuments les plus connus de Djibouti Ville.'
        },
        price: 120,
        depositAmount: 24,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 15,
        difficulty: 'easy',
        minAge: 0,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/djibouti-city-culture.jpg',
          gallery: []
        },
        destinations: ['Djibouti City'],
        highlights: {
          en: [
            'European Quarter with colonial architecture',
            'Port and marina area',
            'Traditional markets and souks',
            'Hamoudi Mosque',
            'Cathedral of Our Lady of the Good Shepherd',
            'Local food experience'
          ],
          fr: [
            'Quartier Européen avec architecture coloniale',
            'Port et marina',
            'Marchés et souks traditionnels',
            'Mosquée Hamoudi',
            'Cathédrale de Notre-Dame du Bon Pasteur',
            'Expérience culinaire locale'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti City Discovery',
              fr: 'Découverte de Djibouti Ville'
            },
            description: {
              en: 'Morning: Discovering the Heart of Djibouti City. We begin with hotel or airport pickup and start our exploration of Djibouti City. Our first drive takes us through the city\'s modern districts before continuing toward the historic centre. We will visit the European Quarter, where colonial-era architecture, older streets and historic buildings provide an introduction to Djibouti\'s French colonial past. Port & Marina. We continue toward the port and marina area, one of the most important economic centres of the country. Afternoon: Markets, Mosques & Local Life. We will walk through the traditional markets and souks. A stop at Hamoudi Mosque provides an opportunity to appreciate one of Djibouti City\'s best-known landmarks from the outside while respecting its function as an active place of worship. We may also visit the Cathedral of Our Lady of the Good Shepherd and other historic buildings depending on the selected route. Local Experience. Lunch or a local food stop can be arranged to experience Djiboutian cuisine.',
              fr: 'Matin: Découverte du Cœur de Djibouti Ville. Nous commençons par une prise en charge à l\'hôtel ou à l\'aéroport et commençons notre exploration de Djibouti Ville. Notre premier trajet nous fait traverser les districts modernes de la ville avant de continuer vers le centre historique. Nous visiterons le Quartier Européen, où l\'architecture coloniale, les rues anciennes et les bâtiments historiques offrent une introduction au passé colonial français de Djibouti. Port & Marina. Nous continuons vers le port et la marina, l\'un des centres économiques les plus importants du pays. Après-midi: Marchés, Mosquées & Vie Locale. Nous parcourrons les marchés et souks traditionnels. Un arrêt à la Mosquée Hamoudi offre l\'occasion d\'apprécier l\'un des monuments les plus connus de Djibouti Ville de l\'extérieur tout en respectant sa fonction de lieu de culte actif. Nous pourrons également visiter la Cathédrale de Notre-Dame du Bon Pasteur et d\'autres bâtiments historiques selon l\'itinéraire choisi. Expérience Locale. Un déjeuner ou un arrêt dans un restaurant local peut être organisé pour découvrir la cuisine djiboutienne.'
            }
          }
        ],
        included: {
          en: [
            'Hotel pickup and drop-off',
            'Private/local transportation',
            'English/French-speaking guide',
            'Guided city sightseeing',
            'Local market visit',
            'Bottled drinking water'
          ],
          fr: [
            'Prise en charge et dépôt à l\'hôtel',
            'Transport privé/local',
            'Guide anglophone/francophone',
            'Visite guidée de la ville',
            'Visite du marché local',
            'Eau potable en bouteille'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Museum entrance fees where applicable',
            'Lunch and drinks unless specifically stated',
            'Shopping and souvenirs',
            'Personal expenses',
            'Tips',
            'Accommodation in Djibouti City'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Frais d\'entrée des musées le cas échéant',
            'Déjeuner et boissons sauf mention contraire',
            'Shopping et souvenirs',
            'Dépenses personnelles',
            'Pourboires',
            'Hébergement à Djibouti Ville'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable walking shoes',
            'Camera',
            'Sun protection',
            'Hat',
            'Water bottle'
          ],
          fr: [
            'Chaussures de marche confortables',
            'Appareil photo',
            'Protection solaire',
            'Chapeau',
            'Bouteille d\'eau'
          ]
        },
        accommodation: {
          en: 'Not included (day tour)',
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
              en: 'Is this tour suitable for children?',
              fr: 'Ce circuit est-il adapté aux enfants ?'
            },
            answer: {
              en: 'Yes, this tour is suitable for all ages.',
              fr: 'Oui, ce circuit convient à tous les âges.'
            }
          }
        ],
        bestSeasons: ['all'],
        categories: ['culture', 'city'],
        tags: ['Djibouti City', 'Culture', 'History', 'Markets'],
        metaTitle: {
          en: 'Djibouti City Culture Tour | Djibouti Explorer',
          fr: 'Circuit Culturel de Djibouti Ville | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Discover the fascinating culture, history and markets of Djibouti City on this half-day tour.',
          fr: 'Découvrez la culture fascinante, l\'histoire et les marchés de Djibouti Ville lors de cette excursion d\'une demi-journée.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 3. Dittilou Mountain Camp & Cascade Tour
      // =========================================
      {
        title: {
          en: 'Dittilou Mountain Camp & Cascade Tour',
          fr: 'Camp Montagne Dittilou & Cascade'
        },
        slug: {
          en: 'dittilou-mountain-camp-cascade',
          fr: 'camp-montagne-dittilou-cascade'
        },
        shortDescription: {
          en: 'Duration: 1 Day / Approximately 8 Hours. A mountain adventure to the Dittilou camp with a guided hike to a 10-metre waterfall.',
          fr: 'Durée: 1 Jour / Environ 8 Heures. Une aventure de montagne au camp de Dittilou avec une randonnée guidée vers une cascade de 10 mètres.'
        },
        description: {
          en: 'We leave Djibouti City early and drive toward the Tadjourah region and the green highlands of the Goda Mountains. As the road climbs away from the hot coastal plains, the landscape changes dramatically from dry desert to rocky mountain terrain and greener vegetation. We continue toward Dittilou, one of Djibouti\'s established mountain camps. The camp was established in 1988 and is surrounded by a cooler mountain environment with abundant vegetation and wildlife. Upon arrival, we take time to settle into the camp and enjoy refreshments before beginning our walk. Green monkeys are frequently encountered around the area. Afternoon: Hike to the Dittilou Waterfall. The trail passes through rocky mountain terrain and greener pockets of vegetation. The hike leads to a waterfall approximately 10 metres high. After returning to camp, we have lunch and some time to relax.',
          fr: 'Nous quittons Djibouti Ville tôt et roulons vers la région de Tadjourah et les hautes terres vertes des Monts Goda. Alors que la route s\'élève loin des plaines côtières chaudes, le paysage change radicalement du désert aride aux terrains montagneux rocheux et à une végétation plus verte. Nous continuons vers Dittilou, l\'un des camps de montagne établis de Djibouti. Le camp a été créé en 1988 et est entouré d\'un environnement montagneux plus frais avec une végétation et une faune abondantes. À l\'arrivée, nous prenons le temps de nous installer au camp et de prendre des rafraîchissements avant de commencer notre marche. Des singes verts sont fréquemment rencontrés dans la région. Après-midi: Randonnée vers la Cascade Dittilou. Le sentier traverse un terrain montagneux rocheux et des poches de végétation plus verte. La randonnée mène à une cascade d\'environ 10 mètres de haut. Après le retour au camp, nous déjeunons et nous détendons.'
        },
        price: 160,
        depositAmount: 32,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 8,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/dittilou-mountain-camp.jpg',
          gallery: []
        },
        destinations: ['Dittilou', 'Goda Mountains'],
        highlights: {
          en: [
            'Visit to Dittilou mountain camp',
            'Guided hike to a 10-metre waterfall',
            'Cool mountain environment',
            'Green monkey sightings',
            'Mountain photography opportunities'
          ],
          fr: [
            'Visite du camp de montagne de Dittilou',
            'Randonnée guidée vers une cascade de 10 mètres',
            'Environnement montagneux frais',
            'Observations de singes verts',
            'Opportunités de photographie de montagne'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Dittilou Mountain Camp & Waterfall',
              fr: 'Camp Montagne Dittilou & Cascade'
            },
            description: {
              en: 'We leave Djibouti City early and drive toward the Tadjourah region and the green highlands of the Goda Mountains. As the road climbs away from the hot coastal plains, the landscape changes dramatically from dry desert to rocky mountain terrain and greener vegetation. We continue toward Dittilou, one of Djibouti\'s established mountain camps. The camp was established in 1988 and is surrounded by a cooler mountain environment with abundant vegetation and wildlife. Upon arrival, we take time to settle into the camp and enjoy refreshments before beginning our walk. Green monkeys are frequently encountered around the area. Afternoon: Hike to the Dittilou Waterfall. We begin a guided hike from the camp toward the waterfall. The trail passes through rocky mountain terrain and greener pockets of vegetation, offering a completely different landscape from the desert environments for which Djibouti is better known. The hike leads to a waterfall approximately 10 metres high. Depending on current conditions, visitors can enjoy the surroundings, take photographs and cool down near the water. After returning to camp, we have lunch and some time to relax.',
              fr: 'Nous quittons Djibouti Ville tôt et roulons vers la région de Tadjourah et les hautes terres vertes des Monts Goda. Alors que la route s\'élève loin des plaines côtières chaudes, le paysage change radicalement du désert aride aux terrains montagneux rocheux et à une végétation plus verte. Nous continuons vers Dittilou, l\'un des camps de montagne établis de Djibouti. Le camp a été créé en 1988 et est entouré d\'un environnement montagneux plus frais avec une végétation et une faune abondantes. À l\'arrivée, nous prenons le temps de nous installer au camp et de prendre des rafraîchissements avant de commencer notre marche. Des singes verts sont fréquemment rencontrés dans la région. Après-midi: Randonnée vers la Cascade Dittilou. Nous commençons une randonnée guidée du camp vers la cascade. Le sentier traverse un terrain montagneux rocheux et des poches de végétation plus verte, offrant un paysage complètement différent des environnements désertiques pour lesquels Djibouti est mieux connu. La randonnée mène à une cascade d\'environ 10 mètres de haut. Selon les conditions actuelles, les visiteurs peuvent profiter des environs, prendre des photos et se rafraîchir près de l\'eau. Après le retour au camp, nous déjeunons et nous détendons.'
            }
          }
        ],
        included: {
          en: [
            '4×4 transportation',
            'Experienced driver',
            'English/French-speaking guide',
            'Fuel',
            'Dittilou camp visit',
            'Guided hike',
            'Waterfall excursion',
            'Lunch',
            'Bottled drinking water',
            'Required local permits/site fees where applicable'
          ],
          fr: [
            'Transport en 4×4',
            'Chauffeur expérimenté',
            'Guide anglophone/francophone',
            'Carburant',
            'Visite du camp de Dittilou',
            'Randonnée guidée',
            'Excursion à la cascade',
            'Déjeuner',
            'Eau potable en bouteille',
            'Permis locaux/frais de site requis le cas échéant'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Accommodation in Djibouti City',
            'Overnight accommodation at Dittilou unless booked as an extension',
            'Personal hiking equipment',
            'Extra meals and drinks',
            'Personal expenses',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement à Djibouti Ville',
            'Hébergement de nuit à Dittilou sauf réservation en extension',
            'Équipement de randonnée personnel',
            'Repas et boissons supplémentaires',
            'Dépenses personnelles',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Hiking shoes',
            'Comfortable clothing',
            'Sun protection',
            'Hat',
            'Camera',
            'Light jacket (mountain air is cooler)',
            'Water bottle'
          ],
          fr: [
            'Chaussures de randonnée',
            'Vêtements confortables',
            'Protection solaire',
            'Chapeau',
            'Appareil photo',
            'Veste légère (l\'air de la montagne est plus frais)',
            'Bouteille d\'eau'
          ]
        },
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: 'Private 4×4 with air conditioning',
          fr: '4×4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'How difficult is the hike?',
              fr: 'La randonnée est-elle difficile ?'
            },
            answer: {
              en: 'The hike is moderate with some rocky sections. Suitable for people with average fitness.',
              fr: 'La randonnée est modérée avec quelques sections rocheuses. Convient aux personnes ayant une condition physique moyenne.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['hiking', 'nature', 'adventure'],
        tags: ['Dittilou', 'Mountain', 'Waterfall', 'Trekking'],
        metaTitle: {
          en: 'Dittilou Mountain Camp & Cascade Tour | Djibouti Explorer',
          fr: 'Camp Montagne Dittilou & Cascade | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A one-day mountain adventure to the Dittilou camp with a guided hike to a 10-metre waterfall in the Goda Mountains.',
          fr: 'Une aventure d\'une journée au camp de Dittilou avec une randonnée guidée vers une cascade de 10 mètres dans les Monts Goda.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 4. Day Forest & Goda Mountains Discovery
      // =========================================
      {
        title: {
          en: 'Day Forest & Goda Mountains Discovery',
          fr: 'Découverte de la Forêt du Day & Monts Goda'
        },
        slug: {
          en: 'day-forest-goda-mountains-discovery',
          fr: 'decouverte-foret-day-monts-goda'
        },
        shortDescription: {
          en: 'Duration: 1 Day / Full Day. Trek through Djibouti\'s ancient Day Forest, home to giant junipers and the endemic Djibouti francolin.',
          fr: 'Durée: 1 Jour / Journée Complète. Randonnée à travers l\'ancienne Forêt du Day, abritant des genévriers géants et le francolin endémique de Djibouti.'
        },
        description: {
          en: 'We leave Djibouti City early and travel toward the Goda Mountains. The journey itself is part of the experience as the dry coastal landscape gradually gives way to higher, cooler mountain terrain. The Goda Mountains rise to approximately 1,700 metres, creating one of the greenest environments in Djibouti. Depending on the route, we first visit Bankoualé, a mountain oasis surrounded by gardens, palms and freshwater. The area is known for its waterfall and cultivated gardens, providing an extraordinary contrast with Djibouti\'s surrounding desert. We continue toward the Day Forest, one of Djibouti\'s most important natural areas. The forest contains ancient-looking junipers, wild olive trees, acacias, jujube trees and other vegetation that survives in this isolated mountain ecosystem. We begin a guided nature walk through the forest. Birdwatchers will have the opportunity to look for the Djibouti francolin, an endemic species strongly associated with this region.',
          fr: 'Nous quittons Djibouti Ville tôt et roulons vers les Monts Goda. Le voyage lui-même fait partie de l\'expérience car le paysage côtier sec cède progressivement la place à un terrain montagneux plus élevé et plus frais. Les Monts Goda s\'élèvent à environ 1 700 mètres, créant l\'un des environnements les plus verts de Djibouti. Selon l\'itinéraire, nous visitons d\'abord Bankoualé, une oasis de montagne entourée de jardins, de palmiers et d\'eau douce. La région est connue pour sa cascade et ses jardins cultivés, offrant un contraste extraordinaire avec le désert environnant de Djibouti. Nous continuons vers la Forêt du Day, l\'une des zones naturelles les plus importantes de Djibouti. La forêt contient des genévriers à l\'aspect ancien, des oliviers sauvages, des acacias, des jujubiers et d\'autres végétaux qui survivent dans cet écosystème montagneux isolé. Nous commençons une promenade guidée dans la nature à travers la forêt. Les ornithologues auront l\'occasion de rechercher le francolin de Djibouti, une espèce endémique fortement associée à cette région.'
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
          primary: '/images/tours/day-forest-goda.jpg',
          gallery: []
        },
        destinations: ['Day Forest', 'Goda Mountains', 'Bankoualé'],
        highlights: {
          en: [
            'Ancient juniper and wild olive forest',
            'Endemic Djibouti francolin',
            'Bankoualé oasis and waterfall',
            'Cool mountain environment',
            'Unique flora and fauna'
          ],
          fr: [
            'Forêt ancienne de genévriers et d\'oliviers sauvages',
            'Francolin endémique de Djibouti',
            'Oasis de Bankoualé et cascade',
            'Environnement montagnard frais',
            'Flore et faune uniques'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Day Forest & Bankoualé Discovery',
              fr: 'Découverte de la Forêt du Day & Bankoualé'
            },
            description: {
              en: 'Morning: Journey into Djibouti\'s Green Highlands. We leave Djibouti City early and travel toward the Goda Mountains. The journey itself is part of the experience as the dry coastal landscape gradually gives way to higher, cooler mountain terrain. The Goda Mountains rise to approximately 1,700 metres, creating one of the greenest environments in Djibouti. Bankoualé Oasis. Depending on the route, we first visit Bankoualé, a mountain oasis surrounded by gardens, palms and freshwater. The area is known for its waterfall and cultivated gardens, providing an extraordinary contrast with Djibouti\'s surrounding desert. We can take a short walk through the gardens and, conditions permitting, visit the waterfall. Afternoon: Day Forest Trek. We continue toward the Day Forest, one of Djibouti\'s most important natural areas. The forest contains ancient-looking junipers, wild olive trees, acacias, jujube trees and other vegetation that survives in this isolated mountain ecosystem. We begin a guided nature walk through the forest. Birdwatchers will have the opportunity to look for the Djibouti francolin, an endemic species strongly associated with this region. The cooler mountain climate makes the forest a refreshing contrast to the hot lowlands. Return to Djibouti. After the trek and lunch/picnic, we begin the descent from the mountains and return to Djibouti City.',
              fr: 'Matin: Voyage dans les Hautes Terres Vertes de Djibouti. Nous quittons Djibouti Ville tôt et roulons vers les Monts Goda. Le voyage lui-même fait partie de l\'expérience car le paysage côtier sec cède progressivement la place à un terrain montagneux plus élevé et plus frais. Les Monts Goda s\'élèvent à environ 1 700 mètres, créant l\'un des environnements les plus verts de Djibouti. Oasis de Bankoualé. Selon l\'itinéraire, nous visitons d\'abord Bankoualé, une oasis de montagne entourée de jardins, de palmiers et d\'eau douce. La région est connue pour sa cascade et ses jardins cultivés, offrant un contraste extraordinaire avec le désert environnant de Djibouti. Nous pouvons faire une courte promenade dans les jardins et, si les conditions le permettent, visiter la cascade. Après-midi: Randonnée dans la Forêt du Day. Nous continuons vers la Forêt du Day, l\'une des zones naturelles les plus importantes de Djibouti. La forêt contient des genévriers à l\'aspect ancien, des oliviers sauvages, des acacias, des jujubiers et d\'autres végétaux qui survivent dans cet écosystème montagneux isolé. Nous commençons une promenade guidée dans la nature à travers la forêt. Les ornithologues auront l\'occasion de rechercher le francolin de Djibouti, une espèce endémique fortement associée à cette région. Le climat montagneux plus frais fait de la forêt un contraste rafraîchissant avec les basses terres chaudes. Retour à Djibouti. Après la randonnée et le déjeuner/pique-nique, nous commençons la descente des montagnes et retournons à Djibouti Ville.'
            }
          }
        ],
        included: {
          en: [
            'Private 4×4 transportation',
            'Driver and fuel',
            'English/French-speaking guide',
            'Guided forest trek',
            'Bankoualé visit where included',
            'Waterfall visit where included',
            'Lunch/picnic',
            'Bottled drinking water',
            'Required permits/site fees'
          ],
          fr: [
            'Transport privé en 4×4',
            'Chauffeur et carburant',
            'Guide anglophone/francophone',
            'Randonnée guidée dans la forêt',
            'Visite de Bankoualé le cas échéant',
            'Visite de la cascade le cas échéant',
            'Déjeuner/pique-nique',
            'Eau potable en bouteille',
            'Permis/frais de site requis'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Djibouti City accommodation',
            'Hiking/trekking equipment',
            'Extra meals and drinks',
            'Personal expenses',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement à Djibouti Ville',
            'Équipement de randonnée',
            'Repas et boissons supplémentaires',
            'Dépenses personnelles',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Hiking shoes',
            'Comfortable clothing',
            'Binoculars for birdwatching',
            'Camera',
            'Sun protection',
            'Hat',
            'Light jacket',
            'Water bottle'
          ],
          fr: [
            'Chaussures de randonnée',
            'Vêtements confortables',
            'Jumelles pour l\'observation des oiseaux',
            'Appareil photo',
            'Protection solaire',
            'Chapeau',
            'Veste légère',
            'Bouteille d\'eau'
          ]
        },
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: 'Private 4×4 with air conditioning',
          fr: '4×4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is the Djibouti francolin guaranteed?',
              fr: 'Le francolin de Djibouti est-il garanti ?'
            },
            answer: {
              en: 'While the francolin is strongly associated with the Day Forest, wildlife sightings are never guaranteed.',
              fr: 'Bien que le francolin soit fortement associé à la Forêt du Day, les observations d\'animaux sauvages ne sont jamais garanties.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['nature', 'hiking', 'birdwatching'],
        tags: ['Day Forest', 'Goda Mountains', 'Birdwatching', 'Trekking'],
        metaTitle: {
          en: 'Day Forest & Goda Mountains Discovery | Djibouti Explorer',
          fr: 'Découverte de la Forêt du Day & Monts Goda | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Trek through Djibouti\'s ancient Day Forest in the cool Goda Mountains.',
          fr: 'Randonnée à travers l\'ancienne Forêt du Day dans les frais Monts Goda.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 5. Tadjourah & Sable Blanc Beach Tour
      // =========================================
      {
        title: {
          en: 'Tadjourah & Sable Blanc Beach Tour',
          fr: 'Tadjourah & Plage de Sable Blanc'
        },
        slug: {
          en: 'tadjourah-sable-blanc-beach',
          fr: 'tadjourah-plage-sable-blanc'
        },
        shortDescription: {
          en: 'Duration: 1 Day / Approximately 5–8 Hours. Discover the historic White City of Tadjourah and relax on the beautiful white-sand beach of Sable Blanc.',
          fr: 'Durée: 1 Jour / Environ 5–8 Heures. Découvrez la ville blanche historique de Tadjourah et détendez-vous sur la belle plage de sable blanc de Sable Blanc.'
        },
        description: {
          en: 'We leave Djibouti City and travel toward Tadjourah, one of Djibouti\'s oldest towns. Known as the White City, Tadjourah is characterized by its whitewashed buildings, historic mosques and coastal atmosphere. We explore the historic streets and waterfront before continuing toward Sable Blanc. Tadjourah Cultural Discovery. Our guide will introduce the town\'s history and its importance to the Gulf of Tadjourah. The town has long been connected with regional trade and the movement of goods and people around the Gulf. Afternoon: Sable Blanc — White Sand Beach. We continue to Sable Blanc, meaning "White Sand" in French. The beach is known for its soft white sand, clear turquoise water and coral-rich marine environment. After lunch, you can relax on the beach, swim in the warm water or snorkel around the nearby reef. More than 200 coral species have been identified in Djibouti\'s waters. Return to Djibouti. After several hours at the beach, we return toward Djibouti City by the selected land or sea transfer.',
          fr: 'Nous quittons Djibouti Ville et roulons vers Tadjourah, l\'une des plus anciennes villes de Djibouti. Surnommée la Ville Blanche, Tadjourah se caractérise par ses bâtiments blanchis à la chaux, ses mosquées historiques et son atmosphère côtière. Nous explorons les rues historiques et le front de mer avant de continuer vers Sable Blanc. Découverte Culturelle de Tadjourah. Notre guide présentera l\'histoire de la ville et son importance pour le Golfe de Tadjourah. La ville a longtemps été liée au commerce régional et au mouvement des biens et des personnes autour du Golfe. Après-midi: Sable Blanc — Plage de Sable Blanc. Nous continuons vers Sable Blanc, qui signifie "Sable Blanc" en français. La plage est connue pour son sable blanc doux, son eau turquoise claire et son environnement marin riche en coraux. Après le déjeuner, vous pouvez vous détendre sur la plage, nager dans l\'eau chaude ou faire du snorkeling autour du récif voisin. Plus de 200 espèces de coraux ont été identifiées dans les eaux de Djibouti. Retour à Djibouti. Après plusieurs heures à la plage, nous retournons vers Djibouti Ville par le transfert terrestre ou maritime choisi.'
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
          gallery: []
        },
        destinations: ['Tadjourah', 'Sable Blanc Beach'],
        highlights: {
          en: [
            'Historic Tadjourah (White City)',
            'White sand beach at Sable Blanc',
            'Turquoise water and swimming',
            'Snorkeling around the reef',
            'More than 200 coral species in the area'
          ],
          fr: [
            'Tadjourah historique (Ville Blanche)',
            'Plage de sable blanc à Sable Blanc',
            'Eau turquoise et baignade',
            'Snorkeling autour du récif',
            'Plus de 200 espèces de coraux dans la région'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Tadjourah & Sable Blanc Beach',
              fr: 'Tadjourah & Plage de Sable Blanc'
            },
            description: {
              en: 'Morning: Djibouti to Tadjourah. We leave Djibouti City and travel toward Tadjourah, one of Djibouti\'s oldest towns. Known as the White City, Tadjourah is characterized by its whitewashed buildings, historic mosques and coastal atmosphere. We explore the historic streets and waterfront before continuing toward Sable Blanc. Tadjourah Cultural Discovery. Our guide will introduce the town\'s history and its importance to the Gulf of Tadjourah. The town has long been connected with regional trade and the movement of goods and people around the Gulf. Afternoon: Sable Blanc — White Sand Beach. We continue to Sable Blanc, meaning "White Sand" in French. The beach is known for its soft white sand, clear turquoise water and coral-rich marine environment. After lunch, you can relax on the beach, swim in the warm water or snorkel around the nearby reef. More than 200 coral species have been identified in Djibouti\'s waters, although the exact marine life visible on any particular excursion depends on location, tides and conditions. Return to Djibouti. After several hours at the beach, we return toward Djibouti City by the selected land or sea transfer.',
              fr: 'Matin: Djibouti à Tadjourah. Nous quittons Djibouti Ville et roulons vers Tadjourah, l\'une des plus anciennes villes de Djibouti. Surnommée la Ville Blanche, Tadjourah se caractérise par ses bâtiments blanchis à la chaux, ses mosquées historiques et son atmosphère côtière. Nous explorons les rues historiques et le front de mer avant de continuer vers Sable Blanc. Découverte Culturelle de Tadjourah. Notre guide présentera l\'histoire de la ville et son importance pour le Golfe de Tadjourah. La ville a longtemps été liée au commerce régional et au mouvement des biens et des personnes autour du Golfe. Après-midi: Sable Blanc — Plage de Sable Blanc. Nous continuons vers Sable Blanc, qui signifie "Sable Blanc" en français. La plage est connue pour son sable blanc doux, son eau turquoise claire et son environnement marin riche en coraux. Après le déjeuner, vous pouvez vous détendre sur la plage, nager dans l\'eau chaude ou faire du snorkeling autour du récif voisin. Plus de 200 espèces de coraux ont été identifiées dans les eaux de Djibouti, bien que la vie marine exacte visible lors d\'une excursion particulière dépende de l\'emplacement, des marées et des conditions. Retour à Djibouti. Après plusieurs heures à la plage, nous retournons vers Djibouti Ville par le transfert terrestre ou maritime choisi.'
            }
          }
        ],
        included: {
          en: [
            'Hotel pickup/drop-off',
            'Transportation',
            'Speedboat transfer where applicable',
            'Experienced captain where applicable',
            'English-speaking guide',
            'Lunch/picnic',
            'Bottled drinking water',
            'Required permits/site fees'
          ],
          fr: [
            'Prise en charge/dépôt à l\'hôtel',
            'Transport',
            'Transfert en speedboat le cas échéant',
            'Capitaine expérimenté le cas échéant',
            'Guide anglophone',
            'Déjeuner/pique-nique',
            'Eau potable en bouteille',
            'Permis/frais de site requis'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Accommodation',
            'Snorkeling equipment unless specified',
            'Towels and personal beach equipment',
            'Personal expenses',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement',
            'Équipement de snorkeling sauf mention contraire',
            'Serviettes et équipement de plage personnel',
            'Dépenses personnelles',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Swimsuit',
            'Towel',
            'Sun protection',
            'Hat',
            'Snorkeling equipment (if you have your own)',
            'Camera',
            'Water shoes'
          ],
          fr: [
            'Maillot de bain',
            'Serviette',
            'Protection solaire',
            'Chapeau',
            'Équipement de snorkeling (si vous en avez)',
            'Appareil photo',
            'Chaussures d\'eau'
          ]
        },
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: 'Private vehicle or speedboat',
          fr: 'Véhicule privé ou speedboat'
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
              en: 'Snorkeling equipment is typically not included in the base package but can be rented locally.',
              fr: 'L\'équipement de snorkeling n\'est généralement pas inclus dans le forfait de base mais peut être loué sur place.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['culture', 'beach', 'snorkeling'],
        tags: ['Tadjourah', 'Sable Blanc', 'Beach', 'Snorkeling'],
        metaTitle: {
          en: 'Tadjourah & Sable Blanc Beach Tour | Djibouti Explorer',
          fr: 'Tadjourah & Plage de Sable Blanc | Djibouti Explorer'
        },
        metaDescription: {
          en: 'Discover the historic White City of Tadjourah and relax on the beautiful white-sand beach of Sable Blanc.',
          fr: 'Découvrez la ville blanche historique de Tadjourah et détendez-vous sur la belle plage de sable blanc de Sable Blanc.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 6. Moucha & Maskali Island Tour
      // =========================================
      {
        title: {
          en: 'Moucha & Maskali Island Tour',
          fr: 'Îles Moucha & Maskali'
        },
        slug: {
          en: 'moucha-maskali-islands',
          fr: 'iles-moucha-maskali'
        },
        shortDescription: {
          en: 'Duration: 1 Day / Approximately 5–6 Hours. A one-day island escape to Moucha and Maskali, featuring white sand beaches, snorkeling, and crystal-clear water.',
          fr: 'Durée: 1 Jour / Environ 5–6 Heures. Une escapade d\'une journée aux îles Moucha et Maskali, avec des plages de sable blanc, du snorkeling et une eau cristalline.'
        },
        description: {
          en: 'We pick you up from your hotel and transfer you to the fishing harbour. From the harbour, we board a private speedboat and cross the Gulf of Tadjourah toward Moucha Island. The boat journey takes approximately 25 minutes under normal conditions. We arrive at Moucha and begin with a short boat excursion around the island, exploring its coastline, coves and beaches. You will have time to swim, relax on the white sand and enjoy the clear turquoise water. A freshly prepared picnic lunch is served on the island. We explore the mangrove environment around Moucha, an important coastal ecosystem supporting marine life and birdlife. We then board the boat again and travel toward suitable reef areas around Moucha and Maskali for snorkeling. We continue toward Maskali, where the emphasis is on the surrounding reef, clear water and marine environment.',
          fr: 'Nous vous prenons en charge à votre hôtel et vous transférons au port de pêche. Depuis le port, nous embarquons sur un speedboat privé et traversons le Golfe de Tadjourah vers l\'île Moucha. Le voyage en bateau dure environ 25 minutes dans des conditions normales. Nous arrivons à Moucha et commençons par une courte excursion en bateau autour de l\'île, explorant son littoral, ses criques et ses plages. Vous aurez le temps de nager, de vous détendre sur le sable blanc et de profiter de l\'eau turquoise claire. Un déjeuner pique-nique fraîchement préparé est servi sur l\'île. Nous explorons l\'environnement de mangrove autour de Moucha, un écosystème côtier important qui abrite la vie marine et les oiseaux. Nous remontons ensuite à bord du bateau et nous dirigeons vers des zones récifales appropriées autour de Moucha et Maskali pour le snorkeling. Nous continuons vers Maskali, où l\'accent est mis sur le récif environnant, l\'eau claire et l\'environnement marin.'
        },
        price: 220,
        depositAmount: 44,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 15,
        difficulty: 'easy',
        minAge: 0,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/moucha-maskali.jpg',
          gallery: []
        },
        destinations: ['Moucha Island', 'Maskali Island'],
        highlights: {
          en: [
            'White sand beaches',
            'Crystal-clear turquoise water',
            'Snorkeling over coral reefs',
            'Mangrove exploration',
            'Marine wildlife viewing'
          ],
          fr: [
            'Plages de sable blanc',
            'Eau turquoise cristalline',
            'Snorkeling sur les récifs coralliens',
            'Exploration des mangroves',
            'Observation de la vie marine'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Moucha & Maskali Islands',
              fr: 'Îles Moucha & Maskali'
            },
            description: {
              en: 'Morning: Djibouti City to Moucha Island. We pick you up from your hotel and transfer you to the fishing harbour. From the harbour, we board a private speedboat and cross the Gulf of Tadjourah toward Moucha Island. The boat journey takes approximately 25 minutes under normal conditions. Moucha Island. We arrive at Moucha and begin with a short boat excursion around the island, exploring its coastline, coves and beaches. You will have time to swim, relax on the white sand and enjoy the clear turquoise water. Lunch: Beach Picnic. A freshly prepared picnic lunch is served on the island, accompanied by bottled drinking water. Afternoon: Mangroves & Coral Reefs. We explore the mangrove environment around Moucha, an important coastal ecosystem supporting marine life and birdlife. We then board the boat again and travel toward suitable reef areas around Moucha and Maskali for snorkeling. With good visibility, you can observe coral formations and tropical reef fish. Maskali Island. We continue toward Maskali, where the emphasis is on the surrounding reef, clear water and marine environment. Swimming and snorkeling are dependent on sea conditions. Return to Djibouti. We board the speedboat and return to the mainland before transferring back to your hotel.',
              fr: 'Matin: Djibouti Ville à l\'île Moucha. Nous vous prenons en charge à votre hôtel et vous transférons au port de pêche. Depuis le port, nous embarquons sur un speedboat privé et traversons le Golfe de Tadjourah vers l\'île Moucha. Le voyage en bateau dure environ 25 minutes dans des conditions normales. Île Moucha. Nous arrivons à Moucha et commençons par une courte excursion en bateau autour de l\'île, explorant son littoral, ses criques et ses plages. Vous aurez le temps de nager, de vous détendre sur le sable blanc et de profiter de l\'eau turquoise claire. Déjeuner: Pique-nique sur la Plage. Un déjeuner pique-nique fraîchement préparé est servi sur l\'île, accompagné d\'eau potable en bouteille. Après-midi: Mangroves & Récifs Coralliens. Nous explorons l\'environnement de mangrove autour de Moucha, un écosystème côtier important qui abrite la vie marine et les oiseaux. Nous remontons ensuite à bord du bateau et nous dirigeons vers des zones récifales appropriées autour de Moucha et Maskali pour le snorkeling. Avec une bonne visibilité, vous pouvez observer les formations coralliennes et les poissons tropicaux des récifs. Île Maskali. Nous continuons vers Maskali, où l\'accent est mis sur le récif environnant, l\'eau claire et l\'environnement marin. La baignade et le snorkeling dépendent des conditions de la mer. Retour à Djibouti. Nous embarquons sur le speedboat et retournons sur le continent avant d\'être transférés à votre hôtel.'
            }
          }
        ],
        included: {
          en: [
            'Hotel-to-harbour transfers',
            'Private speedboat',
            'Captain and fuel',
            'English-speaking guide',
            'Picnic lunch',
            'Bottled drinking water',
            'Marine permits',
            'Entrance fees where applicable'
          ],
          fr: [
            'Transferts hôtel-port',
            'Speedboat privé',
            'Capitaine et carburant',
            'Guide anglophone',
            'Déjeuner pique-nique',
            'Eau potable en bouteille',
            'Permis marins',
            'Frais d\'entrée le cas échéant'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Accommodation in Djibouti City',
            'Snorkeling equipment unless specifically included',
            'Personal expenses',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement à Djibouti Ville',
            'Équipement de snorkeling sauf mention contraire',
            'Dépenses personnelles',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Swimsuit',
            'Towel',
            'Sun protection',
            'Hat',
            'Snorkeling equipment (if you have your own)',
            'Underwater camera',
            'Water shoes'
          ],
          fr: [
            'Maillot de bain',
            'Serviette',
            'Protection solaire',
            'Chapeau',
            'Équipement de snorkeling (si vous en avez)',
            'Appareil photo étanche',
            'Chaussures d\'eau'
          ]
        },
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: 'Speedboat with shaded areas',
          fr: 'Speedboat avec zones ombragées'
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
              en: 'Snorkeling equipment is typically not included but can be rented locally.',
              fr: 'L\'équipement de snorkeling n\'est généralement pas inclus mais peut être loué sur place.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['beach', 'snorkeling', 'island'],
        tags: ['Moucha', 'Maskali', 'Snorkeling', 'Island'],
        metaTitle: {
          en: 'Moucha & Maskali Island Tour | Djibouti Explorer',
          fr: 'Îles Moucha & Maskali | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A one-day island escape to Moucha and Maskali with white sand beaches, snorkeling, and crystal-clear water.',
          fr: 'Une escapade d\'une journée aux îles Moucha et Maskali avec des plages de sable blanc, du snorkeling et une eau cristalline.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 7. Lake Abbé & Lake Assal Expedition
      // =========================================
      {
        title: {
          en: 'Lake Abbé & Lake Assal Expedition',
          fr: 'Expédition Lac Abbé & Lac Assal'
        },
        slug: {
          en: 'lake-abbe-lake-assal-expedition',
          fr: 'expedition-lac-abbe-lac-assal'
        },
        shortDescription: {
          en: 'Duration: 2 Days / 1 Night. A 2-day/1-night expedition to the surreal limestone chimneys of Lake Abbé and the lowest point in Africa, Lake Assal.',
          fr: 'Durée: 2 Jours / 1 Nuit. Une expédition de 2 jours/1 nuit vers les cheminées de calcaire surréalistes du Lac Abbé et le point le plus bas d\'Afrique, le Lac Assal.'
        },
        description: {
          en: 'This 2-day expedition takes you to two of Djibouti\'s most extraordinary natural wonders. Lake Abbé, on the Ethiopian border, features a spectacular forest of limestone chimneys rising tens of metres above the desert floor. Lake Assal, 155 metres below sea level, is the lowest point in Africa, surrounded by brilliant white salt flats. The expedition includes a night at the Lake Abbé campsite, sunset and sunrise photography, and exploration of the Afar region.',
          fr: 'Cette expédition de 2 jours vous emmène vers deux des merveilles naturelles les plus extraordinaires de Djibouti. Le Lac Abbé, à la frontière éthiopienne, présente une forêt spectaculaire de cheminées de calcaire s\'élevant à des dizaines de mètres au-dessus du sol désertique. Le Lac Assal, à 155 mètres sous le niveau de la mer, est le point le plus bas d\'Afrique, entouré de magnifiques plaines de sel blanc. L\'expédition comprend une nuit au camp du Lac Abbé, la photographie du coucher et du lever du soleil, et l\'exploration de la région Afar.'
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
          primary: '/images/tours/lake-abbe-lake-assal.jpg',
          gallery: []
        },
        destinations: ['Lake Abbé', 'Lake Assal', 'Grand Bara', 'Dikhil'],
        highlights: {
          en: [
            'Surreal limestone chimneys of Lake Abbé',
            'Sunset and sunrise photography at Lake Abbé',
            'Lowest point in Africa (155m below sea level)',
            'White salt flats of Lake Assal',
            'Afar region desert landscapes',
            'Flamingo observation at Lake Abbé'
          ],
          fr: [
            'Cheminées de calcaire surréalistes du Lac Abbé',
            'Photographie du coucher et du lever du soleil au Lac Abbé',
            'Point le plus bas d\'Afrique (155 m sous le niveau de la mer)',
            'Plaines de sel blanc du Lac Assal',
            'Paysages désertiques de la région Afar',
            'Observation des flamants au Lac Abbé'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti → Grand Bara → Dikhil → Lake Abbé',
              fr: 'Djibouti → Grand Bara → Dikhil → Lac Abbé'
            },
            description: {
              en: 'Day 1: The Planet of Lake Abbé. Morning: Djibouti to Dikhil. We leave Djibouti City and travel south along the main road toward Dikhil. The journey crosses the semi-desert landscapes of Petit Bara and Grand Bara, vast dry plains that create some of Djibouti\'s most dramatic road scenery. With some luck, we may see gazelles, ostriches or other desert-adapted wildlife. We continue toward Dikhil, where we stop for lunch before leaving the paved road. Afternoon: Off-Road Adventure to Lake Abbé. After Dikhil, we leave the asphalt behind and continue across approximately 80 km of rougher desert tracks toward Lake Abbé. The route passes through As-Eyla and Koutabouya, traditional settlements associated with the Afar region. As we approach Lake Abbé, the landscape becomes increasingly surreal. Lake Abbé: The Lunar Landscape. Lake Abbé sits in the Afar Depression near the Djibouti–Ethiopia border and is famous for its spectacular forest of limestone chimneys. Some formations rise tens of metres above the surrounding plain, while geothermal vents and fumaroles contribute to the strange, otherworldly atmosphere. The area is particularly spectacular at sunset, when the chimneys are illuminated by warm light. We explore the formations with our guide and photograph the landscape before sunset. Evening: Lake Abbé Camp. We arrive at the tourist campsite and settle into basic traditional-style accommodation. Dinner is served at camp. Overnight at Lake Abbé.',
              fr: 'Jour 1: La Planète du Lac Abbé. Matin: Djibouti à Dikhil. Nous quittons Djibouti Ville et roulons vers le sud le long de la route principale vers Dikhil. Le voyage traverse les paysages semi-désertiques du Petit Bara et du Grand Bara, de vastes plaines arides qui créent certains des paysages routiers les plus spectaculaires de Djibouti. Avec un peu de chance, nous pouvons voir des gazelles, des autruches ou d\'autres animaux sauvages adaptés au désert. Nous continuons vers Dikhil, où nous nous arrêtons pour le déjeuner avant de quitter la route asphaltée. Après-midi: Aventure Hors-Piste vers le Lac Abbé. Après Dikhil, nous laissons l\'asphalte derrière nous et continuons sur environ 80 km de pistes désertiques plus accidentées vers le Lac Abbé. L\'itinéraire passe par As-Eyla et Koutabouya, des établissements traditionnels associés à la région Afar. À mesure que nous approchons du Lac Abbé, le paysage devient de plus en plus surréaliste. Lac Abbé: Le Paysage Lunaire. Le Lac Abbé se trouve dans la dépression Afar près de la frontière Djibouti-Éthiopie et est célèbre pour sa forêt spectaculaire de cheminées de calcaire. Certaines formations s\'élèvent à des dizaines de mètres au-dessus de la plaine environnante, tandis que des évents géothermiques et des fumerolles contribuent à l\'atmosphère étrange et surnaturelle. La région est particulièrement spectaculaire au coucher du soleil, lorsque les cheminées sont illuminées par une lumière chaude. Nous explorons les formations avec notre guide et photographions le paysage avant le coucher du soleil. Soir: Camp du Lac Abbé. Nous arrivons au camping touristique et nous installons dans un hébergement traditionnel de base. Le dîner est servi au camp. Nuit au Lac Abbé.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Lake Abbé Sunrise → Lake Assal → Djibouti',
              fr: 'Lever du soleil Lac Abbé → Lac Assal → Djibouti'
            },
            description: {
              en: 'Day 2: Lake Abbé Sunrise to Lake Assal. Early Morning: Sunrise Over the Chimneys. We wake before sunrise and walk among the limestone formations. As daylight reaches the chimneys, the landscape changes colour and becomes one of the most dramatic photographic scenes in Djibouti. We continue toward the lake shore where flamingos and other birdlife may be observed. Morning: Journey Toward Lake Assal. We leave Lake Abbé and travel back toward the central Rift Valley. Depending on the route, we can stop at viewpoints and geological formations around Dimbiya Canyon and the Ghoubet region. Lake Assal: The Salt Wonderland. Lake Assal lies approximately 155 metres below sea level, making it the lowest point in Africa. The lake is surrounded by brilliant white salt formations created by intense evaporation. We walk along the salt flats and learn about the geological and cultural importance of the lake and the traditional salt trade. Swimming/floating may be possible when conditions and the guide permit, but it should not be presented as guaranteed. Lunch: Picnic at Lake Assal. We enjoy a picnic lunch and bottled drinking water before continuing our exploration. Afternoon: Ghoubet & Volcanic Landscapes. If time permits, we continue toward the Ghoubet region and view the surrounding lava fields. An optional extension can include the Ardoukoba volcanic area. We then begin the return journey to Djibouti City. Evening: Return to Djibouti. Arrival in Djibouti City in the late afternoon or evening.',
              fr: 'Jour 2: Lever du Soleil Lac Abbé au Lac Assal. Tôt le Matin: Lever du Soleil sur les Cheminées. Nous nous réveillons avant le lever du soleil et marchons parmi les formations de calcaire. À mesure que la lumière du jour atteint les cheminées, le paysage change de couleur et devient l\'une des scènes photographiques les plus spectaculaires de Djibouti. Nous continuons vers la rive du lac où des flamants et d\'autres oiseaux peuvent être observés. Matin: Voyage vers le Lac Assal. Nous quittons le Lac Abbé et retournons vers la Vallée du Rift centrale. Selon l\'itinéraire, nous pouvons nous arrêter à des points de vue et à des formations géologiques autour du canyon de Dimbiya et de la région de Ghoubet. Lac Assal: Le Pays du Sel. Le Lac Assal se trouve à environ 155 mètres sous le niveau de la mer, ce qui en fait le point le plus bas d\'Afrique. Le lac est entouré de magnifiques formations de sel blanc créées par une évaporation intense. Nous marchons le long des plaines de sel et découvrons l\'importance géologique et culturelle du lac et du commerce traditionnel du sel. La baignade/flottaison peut être possible lorsque les conditions et le guide le permettent, mais elle ne doit pas être présentée comme garantie. Déjeuner: Pique-nique au Lac Assal. Nous profitons d\'un déjeuner pique-nique et d\'eau potable en bouteille avant de continuer notre exploration. Après-midi: Ghoubet & Paysages Volcaniques. Si le temps le permet, nous continuons vers la région de Ghoubet et observons les champs de lave environnants. Une extension facultative peut inclure la zone volcanique d\'Ardoukoba. Nous commençons ensuite le voyage de retour vers Djibouti Ville. Soir: Retour à Djibouti. Arrivée à Djibouti Ville en fin d\'après-midi ou en soirée.'
            }
          }
        ],
        included: {
          en: [
            'Private high-clearance 4×4',
            'Professional driver',
            'English/French-speaking guide',
            'Fuel',
            'One night at Lake Abbé camp',
            'Meals according to itinerary',
            'Bottled drinking water',
            'Travel permits',
            'Site/entrance fees',
            'Guided Lake Abbé and Lake Assal visits'
          ],
          fr: [
            '4×4 privé à garde au sol élevée',
            'Chauffeur professionnel',
            'Guide anglophone/francophone',
            'Carburant',
            'Une nuit au camp du Lac Abbé',
            'Repas selon l\'itinéraire',
            'Eau potable en bouteille',
            'Permis de voyage',
            'Frais de site/d\'entrée',
            'Visites guidées du Lac Abbé et du Lac Assal'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Djibouti City accommodation',
            'Personal expenses',
            'Tips',
            'Personal swimming gear',
            'Towels',
            'Optional Lake Assal bivouac',
            'Optional Ardoukoba trek'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement à Djibouti Ville',
            'Dépenses personnelles',
            'Pourboires',
            'Équipement de baignade personnel',
            'Serviettes',
            'Bivouac optionnel au Lac Assal',
            'Randonnée optionnelle à Ardoukoba'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable clothing for desert travel',
            'Warm layers for the night (desert gets cold)',
            'Sun protection',
            'Hat',
            'Camera',
            'Binoculars',
            'Power bank for charging devices',
            'Personal snacks',
            'Flashlight/headlamp'
          ],
          fr: [
            'Vêtements confortables pour les voyages dans le désert',
            'Vêtements chauds pour la nuit (le désert est froid)',
            'Protection solaire',
            'Chapeau',
            'Appareil photo',
            'Jumelles',
            'Batterie externe pour charger les appareils',
            'Collations personnelles',
            'Lampe torche/frontale'
          ]
        },
        accommodation: {
          en: 'Basic traditional-style camp at Lake Abbé',
          fr: 'Camp de style traditionnel de base au Lac Abbé'
        },
        transportation: {
          en: 'Private high-clearance 4×4',
          fr: '4×4 privé à garde au sol élevée'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 7 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 7 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is the road to Lake Abbé difficult?',
              fr: 'La route vers le Lac Abbé est-elle difficile ?'
            },
            answer: {
              en: 'Yes, the last 80km to Lake Abbé is on desert tracks and requires a high-clearance 4×4 vehicle.',
              fr: 'Oui, les 80 derniers kilomètres jusqu\'au Lac Abbé se font sur des pistes désertiques et nécessitent un véhicule 4×4 à garde au sol élevée.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['desert', 'geology', 'photography'],
        tags: ['Lake Abbé', 'Lake Assal', 'Desert', 'Photography'],
        metaTitle: {
          en: 'Lake Abbé & Lake Assal Expedition | Djibouti Explorer',
          fr: 'Expédition Lac Abbé & Lac Assal | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 2-day expedition to the surreal limestone chimneys of Lake Abbé and the lowest point in Africa, Lake Assal.',
          fr: 'Une expédition de 2 jours vers les cheminées de calcaire surréalistes du Lac Abbé et le point le plus bas d\'Afrique, le Lac Assal.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 8. Lac Abbé & Ardoukoba / Lake Assal Geological Expedition
      // =========================================
      {
        title: {
          en: 'Lac Abbé, Ardoukoba & Lake Assal Geological Expedition',
          fr: 'Expédition Géologique Lac Abbé, Ardoukoba & Lac Assal'
        },
        slug: {
          en: 'lac-abbe-ardoukoba-lake-assal-geological',
          fr: 'expedition-geologique-lac-abbe-ardoukoba-lac-assal'
        },
        shortDescription: {
          en: 'Duration: 2 Days / 1 Night. A 2-day geological expedition exploring Lake Abbé\'s limestone chimneys, Lake Assal\'s salt flats, and the Ardoukoba volcanic area.',
          fr: 'Durée: 2 Jours / 1 Nuit. Une expédition géologique de 2 jours explorant les cheminées de calcaire du Lac Abbé, les plaines de sel du Lac Assal et la zone volcanique d\'Ardoukoba.'
        },
        description: {
          en: 'This 2-day expedition combines three of Djibouti\'s most dramatic geological features: the limestone chimneys of Lake Abbé, the salt flats of Lake Assal (the lowest point in Africa), and the volcanic terrain of Ardoukoba. The expedition also includes Dimbiya Canyon and the Ghoubet region.',
          fr: 'Cette expédition de 2 jours combine trois des caractéristiques géologiques les plus spectaculaires de Djibouti : les cheminées de calcaire du Lac Abbé, les plaines de sel du Lac Assal (le point le plus bas d\'Afrique) et le terrain volcanique d\'Ardoukoba. L\'expédition comprend également le canyon de Dimbiya et la région de Ghoubet.'
        },
        price: 380,
        depositAmount: 76,
        currency: 'USD',
        duration: 2,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 12,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/lac-abbe-ardoukoba-lake-assal.jpg',
          gallery: []
        },
        destinations: ['Lake Abbé', 'Lake Assal', 'Ardoukoba', 'Dimbiya Canyon', 'Ghoubet'],
        highlights: {
          en: [
            'Lake Abbé limestone chimneys and fumaroles',
            'Sunrise photography at Lake Abbé',
            'Dimbiya Canyon views',
            'Ghoubet volcanic coastline',
            'Ardoukoba volcanic terrain (1978 eruption)',
            'Lake Assal salt flats (lowest point in Africa)'
          ],
          fr: [
            'Cheminées de calcaire et fumerolles du Lac Abbé',
            'Photographie du lever du soleil au Lac Abbé',
            'Vues sur le canyon de Dimbiya',
            'Côte volcanique de Ghoubet',
            'Terrain volcanique d\'Ardoukoba (éruption de 1978)',
            'Plaines de sel du Lac Assal (point le plus bas d\'Afrique)'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti → Lake Abbé',
              fr: 'Djibouti → Lac Abbé'
            },
            description: {
              en: 'Day 1: Djibouti to Lake Abbé. Morning: We depart Djibouti City and cross the Petit Bara and Grand Bara plains toward Dikhil. We stop for lunch before continuing through As-Eyla and Koutabouya. Afternoon: We leave the paved road and continue by 4×4 toward Lake Abbé. After arriving, we explore the limestone chimneys, fumaroles and surrounding desert. The late afternoon is dedicated to sunset photography. Evening: Dinner and overnight at the Lake Abbé tourist camp.',
              fr: 'Jour 1: Djibouti vers le Lac Abbé. Matin: Nous quittons Djibouti Ville et traversons les plaines du Petit Bara et du Grand Bara vers Dikhil. Nous nous arrêtons pour le déjeuner avant de continuer à travers As-Eyla et Koutabouya. Après-midi: Nous quittons la route asphaltée et continuons en 4×4 vers le Lac Abbé. Après l\'arrivée, nous explorons les cheminées de calcaire, les fumerolles et le désert environnant. La fin de l\'après-midi est consacrée à la photographie du coucher du soleil. Soir: Dîner et nuit au camp touristique du Lac Abbé.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Lake Abbé Sunrise → Lake Assal → Ardoukoba → Djibouti',
              fr: 'Lever du soleil Lac Abbé → Lac Assal → Ardoukoba → Djibouti'
            },
            description: {
              en: 'Day 2: Lake Abbé Sunrise → Lake Assal → Ardoukoba. Sunrise: We wake before dawn for sunrise among the chimneys. After breakfast, we leave Lake Abbé and begin our journey toward the Rift Valley. Dimbiya Canyon: We stop at Dimbiya Canyon for views across the dramatic geological landscape. Ghoubet al-Kharab: We continue toward the Ghoubet region, where volcanic cliffs and the Gulf of Tadjourah create one of Djibouti\'s most spectacular landscapes. Ardoukoba: Walking on Recent Volcanic Ground. We continue toward the Ardoukoba volcanic area. Ardoukoba is associated with Djibouti\'s most recent known volcanic eruption, which began in November 1978. Depending on the route and conditions, we take a short walk across the volcanic terrain. Lake Assal: We then descend toward Lake Assal. The white salt flats contrast dramatically with the surrounding black lava and volcanic mountains. After exploring the lake and taking photographs, we have lunch. Return to Djibouti: We begin the final drive back to the capital.',
              fr: 'Jour 2: Lever du Soleil Lac Abbé → Lac Assal → Ardoukoba. Lever du soleil: Nous nous réveillons avant l\'aube pour le lever du soleil parmi les cheminées. Après le petit-déjeuner, nous quittons le Lac Abbé et commençons notre voyage vers la Vallée du Rift. Canyon de Dimbiya: Nous nous arrêtons au canyon de Dimbiya pour des vues sur le paysage géologique spectaculaire. Ghoubet al-Kharab: Nous continuons vers la région de Ghoubet, où les falaises volcaniques et le Golfe de Tadjourah créent l\'un des paysages les plus spectaculaires de Djibouti. Ardoukoba: Marche sur un Terrain Volcanique Récent. Nous continuons vers la zone volcanique d\'Ardoukoba. Ardoukoba est associé à la plus récente éruption volcanique connue de Djibouti, qui a commencé en novembre 1978. Selon l\'itinéraire et les conditions, nous faisons une courte promenade sur le terrain volcanique. Lac Assal: Nous descendons ensuite vers le Lac Assal. Les plaines de sel blanc contrastent dramatiquement avec la lave noire environnante et les montagnes volcaniques. Après avoir exploré le lac et pris des photos, nous déjeunons. Retour à Djibouti: Nous commençons le dernier trajet de retour vers la capitale.'
            }
          }
        ],
        included: {
          en: [
            'Private 4×4',
            'Driver and fuel',
            'Professional guide',
            'Lake Abbé campsite',
            'Meals according to itinerary',
            'Bottled water',
            'Permits',
            'Site entrance fees',
            'Lake Abbé, Lake Assal and Ardoukoba visits'
          ],
          fr: [
            '4×4 privé',
            'Chauffeur et carburant',
            'Guide professionnel',
            'Camp du Lac Abbé',
            'Repas selon l\'itinéraire',
            'Eau en bouteille',
            'Permis',
            'Frais d\'entrée des sites',
            'Visites du Lac Abbé, Lac Assal et Ardoukoba'
          ]
        },
        excluded: {
          en: [
            'Flights',
            'Visa',
            'Insurance',
            'Djibouti City hotel',
            'Personal expenses',
            'Tips',
            'Hiking equipment',
            'Optional additional night at Lake Assal'
          ],
          fr: [
            'Vols',
            'Visa',
            'Assurance',
            'Hôtel à Djibouti Ville',
            'Dépenses personnelles',
            'Pourboires',
            'Équipement de randonnée',
            'Nuit supplémentaire optionnelle au Lac Assal'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable desert clothing',
            'Warm layers for night',
            'Sun protection',
            'Camera',
            'Binoculars',
            'Flashlight'
          ],
          fr: [
            'Vêtements confortables pour le désert',
            'Vêtements chauds pour la nuit',
            'Protection solaire',
            'Appareil photo',
            'Jumelles',
            'Lampe torche'
          ]
        },
        accommodation: {
          en: 'Lake Abbé tourist camp',
          fr: 'Camp touristique du Lac Abbé'
        },
        transportation: {
          en: 'Private 4×4 with air conditioning',
          fr: '4×4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 7 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 7 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Can we visit Ardoukoba volcano?',
              fr: 'Pouvons-nous visiter le volcan Ardoukoba ?'
            },
            answer: {
              en: 'Yes, the tour includes a walk across the Ardoukoba volcanic terrain associated with the 1978 eruption.',
              fr: 'Oui, le circuit comprend une promenade sur le terrain volcanique d\'Ardoukoba associé à l\'éruption de 1978.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['geology', 'volcano', 'desert'],
        tags: ['Lac Abbé', 'Lake Assal', 'Ardoukoba', 'Volcano', 'Geology'],
        metaTitle: {
          en: 'Lac Abbé, Ardoukoba & Lake Assal Geological Expedition | Djibouti Explorer',
          fr: 'Expédition Géologique Lac Abbé, Ardoukoba & Lac Assal | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 2-day geological expedition exploring Lake Abbé\'s limestone chimneys, Lake Assal\'s salt flats, and the Ardoukoba volcanic area.',
          fr: 'Une expédition géologique de 2 jours explorant les cheminées de calcaire du Lac Abbé, les plaines de sel du Lac Assal et la zone volcanique d\'Ardoukoba.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 9. Lake Assal Discovery
      // =========================================
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
          en: 'Duration: 1 Day / Approximately 6–9 Hours. A full-day tour to the lowest point in Africa, Lake Assal, including Ghoubet, Dimbiya Canyon, and the Ardoukoba lava fields.',
          fr: 'Durée: 1 Jour / Environ 6–9 Heures. Une excursion d\'une journée complète vers le point le plus bas d\'Afrique, le Lac Assal, incluant Ghoubet, le canyon de Dimbiya et les champs de lave d\'Ardoukoba.'
        },
        description: {
          en: 'Lake Assal is the lowest point in Africa at 155 metres below sea level. This full-day tour takes you through the dramatic Great Rift Valley landscapes to the white salt flats of Lake Assal, with stops at Dimbiya Canyon, Ghoubet, and the Ardoukoba volcanic terrain. The brilliant white salt, black volcanic rock and blue-green water create one of Djibouti\'s most recognisable landscapes.',
          fr: 'Le Lac Assal est le point le plus bas d\'Afrique à 155 mètres sous le niveau de la mer. Cette excursion d\'une journée vous emmène à travers les paysages spectaculaires de la Vallée du Grand Rift jusqu\'aux plaines de sel blanc du Lac Assal, avec des arrêts au canyon de Dimbiya, à Ghoubet et sur le terrain volcanique d\'Ardoukoba. Le sel blanc éclatant, la roche volcanique noire et l\'eau bleu-vert créent l\'un des paysages les plus reconnaissables de Djibouti.'
        },
        price: 150,
        depositAmount: 30,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 8,
        difficulty: 'easy',
        minAge: 6,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/lake-assal-discovery.jpg',
          gallery: []
        },
        destinations: ['Lake Assal', 'Dimbiya Canyon', 'Ghoubet', 'Ardoukoba'],
        highlights: {
          en: [
            'Lowest point in Africa (155m below sea level)',
            'White salt flats of Lake Assal',
            'Dimbiya Canyon viewpoint',
            'Ghoubet volcanic coastline',
            'Ardoukoba lava fields',
            'Float in extremely salty water'
          ],
          fr: [
            'Point le plus bas d\'Afrique (155 m sous le niveau de la mer)',
            'Plaines de sel blanc du Lac Assal',
            'Point de vue du canyon de Dimbiya',
            'Côte volcanique de Ghoubet',
            'Champs de lave d\'Ardoukoba',
            'Flotter dans une eau extrêmement salée'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Lake Assal & Rift Valley Discovery',
              fr: 'Découverte du Lac Assal & Vallée du Rift'
            },
            description: {
              en: 'Morning: Djibouti City to Lake Assal. We leave Djibouti City early in a 4×4 and travel into the dramatic landscapes of the Great Rift Valley. Our first major stop is the Dimbiya Canyon viewpoint, where the terrain reveals the enormous geological forces shaping this part of East Africa. Ghoubet al-Kharab. We continue toward Ghoubet, a dramatic bay surrounded by volcanic landscapes. From the viewpoints we can observe the rugged coastline and the volcanic formations around the Gulf of Tadjourah. Ardoukoba Lava Fields. Depending on the route and time available, we explore the lava fields associated with Ardoukoba. The black volcanic terrain provides a striking contrast with the white salt of Lake Assal. Lake Assal: The Lowest Point in Africa. We finally arrive at Lake Assal. At approximately 155 metres below sea level, the lake is the lowest point in Africa. The surrounding salt flats create an almost completely white landscape, while the surrounding mountains and volcanic terrain frame the lake. We walk along the salt formations and learn about the lake\'s geology, evaporation and traditional salt harvesting. Swimming / Floating. When conditions are suitable and the guide approves it, guests may enter the water and experience the lake\'s extreme buoyancy. Fresh water should be carried for rinsing afterward. Because the salt concentration and sharp salt formations can irritate or cut skin, water shoes and caution are recommended. Lunch: Picnic lunch near the lake. Afternoon: Return to Djibouti. We begin the journey back to Djibouti City, with optional photography stops around the lava fields and Ghoubet region.',
              fr: 'Matin: Djibouti Ville au Lac Assal. Nous quittons Djibouti Ville tôt dans un 4×4 et voyageons à travers les paysages spectaculaires de la Vallée du Grand Rift. Notre premier arrêt majeur est le point de vue du canyon de Dimbiya, où le terrain révèle les forces géologiques énormes qui façonnent cette partie de l\'Afrique de l\'Est. Ghoubet al-Kharab. Nous continuons vers Ghoubet, une baie spectaculaire entourée de paysages volcaniques. Depuis les points de vue, nous pouvons observer la côte accidentée et les formations volcaniques autour du Golfe de Tadjourah. Champs de Lave d\'Ardoukoba. Selon l\'itinéraire et le temps disponible, nous explorons les champs de lave associés à Ardoukoba. Le terrain volcanique noir offre un contraste frappant avec le sel blanc du Lac Assal. Lac Assal: Le Point le Plus Bas d\'Afrique. Nous arrivons enfin au Lac Assal. À environ 155 mètres sous le niveau de la mer, le lac est le point le plus bas d\'Afrique. Les plaines de sel environnantes créent un paysage presque complètement blanc, tandis que les montagnes environnantes et le terrain volcanique encadrent le lac. Nous marchons le long des formations de sel et découvrons la géologie du lac, l\'évaporation et la récolte traditionnelle du sel. Baignade / Flottaison. Lorsque les conditions sont appropriées et que le guide l\'approuve, les invités peuvent entrer dans l\'eau et expérimenter l\'extrême flottabilité du lac. De l\'eau douce doit être emportée pour le rinçage après. Comme la concentration de sel et les formations de sel coupantes peuvent irriter ou couper la peau, des chaussures d\'eau et des précautions sont recommandées. Déjeuner: Déjeuner pique-nique près du lac. Après-midi: Retour à Djibouti. Nous commençons le voyage de retour vers Djibouti Ville, avec des arrêts photo facultatifs autour des champs de lave et de la région de Ghoubet.'
            }
          }
        ],
        included: {
          en: [
            '4×4 transportation',
            'Driver and fuel',
            'Professional guide',
            'Lunch',
            'Bottled drinking water',
            'Permits',
            'Site entrance fees',
            'Lake Assal guided visit',
            'Ghoubet/Dimbiya stops'
          ],
          fr: [
            'Transport en 4×4',
            'Chauffeur et carburant',
            'Guide professionnel',
            'Déjeuner',
            'Eau potable en bouteille',
            'Permis',
            'Frais d\'entrée des sites',
            'Visite guidée du Lac Assal',
            'Arrêts à Ghoubet/Dimbiya'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Accommodation',
            'Personal swimming gear',
            'Water shoes',
            'Towels',
            'Personal expenses',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement',
            'Équipement de baignade personnel',
            'Chaussures d\'eau',
            'Serviettes',
            'Dépenses personnelles',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Swimsuit (for floating in Lake Assal)',
            'Towel',
            'Water shoes (sharp salt formations)',
            'Sun protection',
            'Hat',
            'Camera',
            'Water bottle'
          ],
          fr: [
            'Maillot de bain (pour flotter dans le Lac Assal)',
            'Serviette',
            'Chaussures d\'eau (formations de sel coupantes)',
            'Protection solaire',
            'Chapeau',
            'Appareil photo',
            'Bouteille d\'eau'
          ]
        },
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: 'Private 4×4 with air conditioning',
          fr: '4×4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is it safe to swim in Lake Assal?',
              fr: 'Est-il sûr de nager dans le Lac Assal ?'
            },
            answer: {
              en: 'The water is safe but extremely salty. Water shoes are recommended because of sharp salt formations.',
              fr: 'L\'eau est sûre mais extrêmement salée. Des chaussures d\'eau sont recommandées en raison des formations de sel coupantes.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['geology', 'desert', 'photography'],
        tags: ['Lake Assal', 'Salt Lake', 'Rift Valley', 'Volcano'],
        metaTitle: {
          en: 'Lake Assal Discovery | Djibouti Explorer',
          fr: 'Découverte du Lac Assal | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A full-day tour to the lowest point in Africa, Lake Assal, including Ghoubet, Dimbiya Canyon, and the Ardoukoba lava fields.',
          fr: 'Une excursion d\'une journée complète vers le point le plus bas d\'Afrique, le Lac Assal, incluant Ghoubet, le canyon de Dimbiya et les champs de lave d\'Ardoukoba.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 10. Whale Shark Adventure
      // =========================================
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
          en: 'Duration: 1 Day / Approximately 6–10 Hours. A seasonal marine adventure to swim with whale sharks in the Gulf of Tadjourah.',
          fr: 'Durée: 1 Jour / Environ 6–10 Heures. Une aventure marine saisonnière pour nager avec les requins-baleines dans le Golfe de Tadjourah.'
        },
        description: {
          en: 'This seasonal marine adventure takes you into the Gulf of Tadjourah to swim with whale sharks, the world\'s largest fish. The trip is conducted with respect for the animals and follows strict guidelines to avoid disturbing them. Whale sharks are seasonal visitors to Djibouti\'s waters, typically from November to February, depending on plankton availability and sea conditions.',
          fr: 'Cette aventure marine saisonnière vous emmène dans le Golfe de Tadjourah pour nager avec les requins-baleines, les plus grands poissons du monde. L\'excursion est menée dans le respect des animaux et suit des règles strictes pour éviter de les déranger. Les requins-baleines sont des visiteurs saisonniers des eaux de Djibouti, généralement de novembre à février, selon la disponibilité du plancton et les conditions de la mer.'
        },
        price: 250,
        depositAmount: 50,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 10,
        difficulty: 'easy',
        minAge: 8,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/whale-shark-adventure.jpg',
          gallery: []
        },
        destinations: ['Gulf of Tadjourah', 'Arta'],
        highlights: {
          en: [
            'Seasonal whale shark swimming (Nov–Feb)',
            'Passive observation with strict guidelines',
            'Possible dolphin, manta ray and turtle sightings',
            'Crystal-clear Gulf of Tadjourah water',
            'Professional marine guide'
          ],
          fr: [
            'Nage saisonnière avec les requins-baleines (nov–fév)',
            'Observation passive avec des règles strictes',
            'Possibilité d\'observer des dauphins, des raies mantas et des tortues',
            'Eaux cristallines du Golfe de Tadjourah',
            'Guide marin professionnel'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Whale Shark Adventure',
              fr: 'Aventure Requin-Baleine'
            },
            description: {
              en: 'Morning: Djibouti City to Arta. We depart early from Djibouti City and travel toward Arta Beach, one of the main launch points for whale-shark excursions. After a safety briefing, we board the speedboat and head toward the plankton-rich waters of the Gulf of Tadjourah. Ras Korali / Whale Shark Area. The crew searches the surface waters for whale sharks. Whale sharks are the world\'s largest fish and are seasonal visitors to Djibouti\'s waters. The animals are wild, so sightings cannot be guaranteed. When whale sharks are located, the boat approaches carefully and the guide explains how to enter the water without disturbing them. Snorkeling With Whale Sharks. Guests may enter the water for a controlled snorkeling encounter. The experience is based on passive observation rather than chasing or touching the animals. Guests should maintain a respectful distance, avoid touching the sharks and avoid blocking their path. Depending on conditions, other marine life may include dolphins, manta rays, turtles and reef fish. Lunch: Picnic lunch and bottled water aboard the boat or at the beach, depending on the operator. Afternoon: We continue searching for marine life before returning to Arta and then Djibouti City.',
              fr: 'Matin: Djibouti Ville à Arta. Nous partons tôt de Djibouti Ville et roulons vers la plage d\'Arta, l\'un des principaux points de départ pour les excursions à la rencontre des requins-baleines. Après un briefing de sécurité, nous embarquons sur le speedboat et nous dirigeons vers les eaux riches en plancton du Golfe de Tadjourah. Ras Korali / Zone des Requins-Baleines. L\'équipage scrute les eaux de surface à la recherche de requins-baleines. Les requins-baleines sont les plus grands poissons du monde et sont des visiteurs saisonniers des eaux de Djibouti. Les animaux sont sauvages, donc les observations ne peuvent être garanties. Lorsque des requins-baleines sont localisés, le bateau s\'approche prudemment et le guide explique comment entrer dans l\'eau sans les déranger. Snorkeling avec les Requins-Baleines. Les invités peuvent entrer dans l\'eau pour une rencontre contrôlée en snorkeling. L\'expérience est basée sur l\'observation passive plutôt que sur la poursuite ou le toucher des animaux. Les invités doivent maintenir une distance respectueuse, éviter de toucher les requins et éviter de bloquer leur chemin. Selon les conditions, d\'autres animaux marins peuvent inclure des dauphins, des raies mantas, des tortues et des poissons de récif. Déjeuner: Déjeuner pique-nique et eau en bouteille à bord du bateau ou à la plage, selon l\'opérateur. Après-midi: Nous continuons à rechercher la vie marine avant de retourner à Arta puis à Djibouti Ville.'
            }
          }
        ],
        included: {
          en: [
            'Hotel pickup/drop-off',
            '4×4 transportation where required',
            'Speedboat',
            'Captain and fuel',
            'Experienced marine guide',
            'Safety briefing',
            'Snorkeling excursion',
            'Lunch/picnic',
            'Bottled drinking water',
            'Required permits/marine fees'
          ],
          fr: [
            'Prise en charge/dépôt à l\'hôtel',
            'Transport en 4×4 le cas échéant',
            'Speedboat',
            'Capitaine et carburant',
            'Guide marin expérimenté',
            'Briefing de sécurité',
            'Excursion de snorkeling',
            'Déjeuner/pique-nique',
            'Eau potable en bouteille',
            'Permis/frais marins requis'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Accommodation',
            'Snorkeling equipment unless specifically stated',
            'Personal expenses',
            'Towels',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement',
            'Équipement de snorkeling sauf mention contraire',
            'Dépenses personnelles',
            'Serviettes',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Swimsuit',
            'Towel',
            'Snorkeling equipment (if you have your own)',
            'Sun protection',
            'Hat',
            'Underwater camera',
            'Water shoes'
          ],
          fr: [
            'Maillot de bain',
            'Serviette',
            'Équipement de snorkeling (si vous en avez)',
            'Protection solaire',
            'Chapeau',
            'Appareil photo étanche',
            'Chaussures d\'eau'
          ]
        },
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: '4×4 and speedboat',
          fr: '4×4 et speedboat'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'When is the best time for whale sharks?',
              fr: 'Quelle est la meilleure période pour les requins-baleines ?'
            },
            answer: {
              en: 'The best time is typically November to February, when whale sharks are seasonal visitors to Djibouti\'s waters.',
              fr: 'La meilleure période est généralement de novembre à février, lorsque les requins-baleines sont des visiteurs saisonniers des eaux de Djibouti.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb'],
        categories: ['wildlife', 'snorkeling', 'marine'],
        tags: ['Whale Sharks', 'Marine Life', 'Snorkeling', 'Wildlife'],
        metaTitle: {
          en: 'Whale Shark Adventure | Djibouti Explorer',
          fr: 'Aventure Requin-Baleine | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A seasonal marine adventure to swim with whale sharks in the Gulf of Tadjourah.',
          fr: 'Une aventure marine saisonnière pour nager avec les requins-baleines dans le Golfe de Tadjourah.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 11. Day Forest Trek
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
          en: 'Duration: 1 Day / Full Day. A full-day trek through Djibouti\'s ancient Day Forest, home to giant junipers and the endemic Djibouti francolin.',
          fr: 'Durée: 1 Jour / Journée Complète. Une randonnée d\'une journée complète à travers l\'ancienne Forêt du Day, abritant des genévriers géants et le francolin endémique de Djibouti.'
        },
        description: {
          en: 'The Day Forest is one of Djibouti\'s most unusual ecosystems. Located in the Goda Mountains, this ancient forest contains giant junipers, wild olive trees, acacias and jujube trees. It is also one of the best places to look for the endemic Djibouti francolin and other mountain wildlife. The trek includes Bankoualé oasis and a waterfall, creating a full-day mountain experience.',
          fr: 'La Forêt du Day est l\'un des écosystèmes les plus inhabituels de Djibouti. Située dans les Monts Goda, cette forêt ancienne abrite des genévriers géants, des oliviers sauvages, des acacias et des jujubiers. C\'est également l\'un des meilleurs endroits pour observer le francolin endémique de Djibouti et d\'autres espèces de la faune montagnarde. La randonnée inclut l\'oasis de Bankoualé et une cascade, créant une expérience complète de montagne.'
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
          primary: '/images/tours/day-forest-trek.jpg',
          gallery: []
        },
        destinations: ['Day Forest', 'Goda Mountains', 'Bankoualé'],
        highlights: {
          en: [
            'Ancient juniper and wild olive forest',
            'Endemic Djibouti francolin',
            'Bankoualé oasis and waterfall',
            'Cool mountain environment',
            'Unique flora and fauna'
          ],
          fr: [
            'Forêt ancienne de genévriers et d\'oliviers sauvages',
            'Francolin endémique de Djibouti',
            'Oasis de Bankoualé et cascade',
            'Environnement montagnard frais',
            'Flore et faune uniques'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Day Forest & Bankoualé Trek',
              fr: 'Randonnée Forêt du Day & Bankoualé'
            },
            description: {
              en: 'Early Morning: Djibouti City to the Goda Mountains. We depart early because the mountain environment is cooler in the morning and wildlife is generally more active. The route takes us from Djibouti\'s dry lowlands toward the Goda Mountains. Bankoualé. Depending on the selected route, we begin around Bankoualé, an oasis surrounded by mountain cliffs and gardens. We walk through the cultivated area and may stop near the local waterfall before beginning the more demanding forest section. Day Forest: Trekking Through Djibouti\'s Ancient Forest. We continue into the Day Forest, one of the country\'s most unusual ecosystems. The forest contains giant junipers, wild olive trees, acacias, jujube trees and other vegetation rarely encountered elsewhere in Djibouti. Wildlife & Birdwatching. During the trek, we keep an eye out for the Djibouti francolin, an endemic bird species. Other wildlife may include green monkeys, baboons, genets and numerous bird species. Wildlife encounters are never guaranteed. Lunch: Picnic lunch during the trek. Afternoon: We continue along the mountain trails, stopping at viewpoints and areas of interest before beginning the descent. For experienced hikers, longer routes can connect the Day and Bankoualé/Dittilou areas. Return: We drive back to Djibouti City in the late afternoon or evening.',
              fr: 'Tôt le Matin: Djibouti Ville aux Monts Goda. Nous partons tôt car l\'environnement montagnard est plus frais le matin et la faune est généralement plus active. L\'itinéraire nous emmène des basses terres sèches de Djibouti vers les Monts Goda. Bankoualé. Selon l\'itinéraire choisi, nous commençons autour de Bankoualé, une oasis entourée de falaises et de jardins. Nous traversons la zone cultivée et pouvons nous arrêter près de la cascade locale avant de commencer la section forestière plus exigeante. Forêt du Day: Randonnée à Travers la Forêt Ancienne de Djibouti. Nous continuons vers la Forêt du Day, l\'un des écosystèmes les plus inhabituels du pays. La forêt contient des genévriers géants, des oliviers sauvages, des acacias, des jujubiers et d\'autres végétaux rarement rencontrés ailleurs à Djibouti. Faune & Observation des Oiseaux. Pendant la randonnée, nous gardons un œil sur le francolin de Djibouti, une espèce d\'oiseau endémique. D\'autres animaux sauvages peuvent inclure des singes verts, des babouins, des genettes et de nombreuses espèces d\'oiseaux. Les rencontres avec la faune ne sont jamais garanties. Déjeuner: Déjeuner pique-nique pendant la randonnée. Après-midi: Nous continuons le long des sentiers de montagne, en nous arrêtant à des points de vue et à des zones d\'intérêt avant de commencer la descente. Pour les randonneurs expérimentés, des itinéraires plus longs peuvent relier les zones du Day et de Bankoualé/Dittilou. Retour: Nous retournons à Djibouti Ville en fin d\'après-midi ou en soirée.'
            }
          }
        ],
        included: {
          en: [
            'Private 4×4 transportation',
            'Driver and fuel',
            'Professional trekking guide',
            'Guided forest trek',
            'Bankoualé visit where included',
            'Lunch/picnic',
            'Bottled drinking water',
            'Required permits/site fees'
          ],
          fr: [
            'Transport privé en 4×4',
            'Chauffeur et carburant',
            'Guide de randonnée professionnel',
            'Randonnée guidée dans la forêt',
            'Visite de Bankoualé le cas échéant',
            'Déjeuner/pique-nique',
            'Eau potable en bouteille',
            'Permis/frais de site requis'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Djibouti City accommodation',
            'Trekking shoes/equipment',
            'Personal expenses',
            'Extra food/drinks',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement à Djibouti Ville',
            'Chaussures/équipement de randonnée',
            'Dépenses personnelles',
            'Repas/boissons supplémentaires',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable trekking shoes',
            'Sun protection',
            'Hat',
            'Camera',
            'Binoculars for birdwatching',
            'Light jacket (mountain air is cooler)',
            'Water bottle'
          ],
          fr: [
            'Chaussures de randonnée confortables',
            'Protection solaire',
            'Chapeau',
            'Appareil photo',
            'Jumelles pour l\'observation des oiseaux',
            'Veste légère (l\'air de la montagne est plus frais)',
            'Bouteille d\'eau'
          ]
        },
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: 'Private 4×4 with air conditioning',
          fr: '4×4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is the Djibouti francolin guaranteed?',
              fr: 'Le francolin de Djibouti est-il garanti ?'
            },
            answer: {
              en: 'While the francolin is strongly associated with the Day Forest, wildlife sightings are never guaranteed.',
              fr: 'Bien que le francolin soit fortement associé à la Forêt du Day, les observations d\'animaux sauvages ne sont jamais garanties.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['nature', 'hiking', 'birdwatching'],
        tags: ['Day Forest', 'Trekking', 'Birdwatching', 'Nature'],
        metaTitle: {
          en: 'Day Forest Trek | Djibouti Explorer',
          fr: 'Randonnée Forêt du Day | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A full-day trek through Djibouti\'s ancient Day Forest, home to giant junipers and the endemic Djibouti francolin.',
          fr: 'Une randonnée d\'une journée complète à travers l\'ancienne Forêt du Day, abritant des genévriers géants et le francolin endémique de Djibouti.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 12. Djibouti City + Lake Assal Discovery
      // =========================================
      {
        title: {
          en: 'Djibouti City & Lake Assal Discovery',
          fr: 'Djibouti Ville & Lac Assal'
        },
        slug: {
          en: 'djibouti-city-lake-assal-discovery',
          fr: 'djibouti-ville-lac-assal'
        },
        shortDescription: {
          en: 'Duration: 2 Days / 1 Night. A 2-day tour combining the culture of Djibouti City with the geological wonder of Lake Assal.',
          fr: 'Durée: 2 Jours / 1 Nuit. Un circuit de 2 jours combinant la culture de Djibouti Ville avec la merveille géologique du Lac Assal.'
        },
        description: {
          en: 'This 2-day tour combines the cultural highlights of Djibouti City with the geological wonder of Lake Assal. Day 1 explores the city\'s markets, colonial architecture and port. Day 2 takes you into the Great Rift Valley to Lake Assal, the lowest point in Africa, with stops at Ghoubet, Dimbiya Canyon and Ardoukoba.',
          fr: 'Ce circuit de 2 jours combine les points forts culturels de Djibouti Ville avec la merveille géologique du Lac Assal. Le jour 1 explore les marchés de la ville, l\'architecture coloniale et le port. Le jour 2 vous emmène dans la Vallée du Grand Rift vers le Lac Assal, le point le plus bas d\'Afrique, avec des arrêts à Ghoubet, le canyon de Dimbiya et Ardoukoba.'
        },
        price: 300,
        depositAmount: 60,
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
          primary: '/images/tours/djibouti-city-lake-assal.jpg',
          gallery: []
        },
        destinations: ['Djibouti City', 'Lake Assal', 'Dimbiya Canyon', 'Ghoubet', 'Ardoukoba'],
        highlights: {
          en: [
            'Djibouti City cultural tour',
            'European Quarter and colonial architecture',
            'Hamoudi Mosque and Central Market',
            'Lake Assal (lowest point in Africa)',
            'Dimbiya Canyon and Ghoubet views',
            'Ardoukoba volcanic landscape'
          ],
          fr: [
            'Visite culturelle de Djibouti Ville',
            'Quartier Européen et architecture coloniale',
            'Mosquée Hamoudi et Marché Central',
            'Lac Assal (point le plus bas d\'Afrique)',
            'Vues sur le canyon de Dimbiya et Ghoubet',
            'Paysage volcanique d\'Ardoukoba'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Discover Djibouti City',
              fr: 'Découverte de Djibouti Ville'
            },
            description: {
              en: 'Day 1: Discover Djibouti City. Morning: We begin with hotel or airport pickup. We explore the modern districts of Djibouti City before visiting the port and marina. A stop around the port offers an introduction to Djibouti\'s role as a major maritime gateway for the Horn of Africa. Afternoon: Historic City & Markets. We continue into the historic centre. Visits may include: European Quarter, Cathedral of Our Lady of the Good Shepherd, Ethiopian Orthodox Tewahedo Church, traditional souks, flea market, historic streets, marina. We enjoy a local lunch and continue exploring the city. Evening: Return to hotel. Overnight in Djibouti City.',
              fr: 'Jour 1: Découverte de Djibouti Ville. Matin: Nous commençons par une prise en charge à l\'hôtel ou à l\'aéroport. Nous explorons les districts modernes de Djibouti Ville avant de visiter le port et la marina. Un arrêt autour du port offre une introduction au rôle de Djibouti en tant que porte maritime majeure pour la Corne de l\'Afrique. Après-midi: Ville Historique & Marchés. Nous continuons vers le centre historique. Les visites peuvent inclure: Quartier Européen, Cathédrale de Notre-Dame du Bon Pasteur, Église Tewahedo Orthodoxe Éthiopienne, souks traditionnels, marché aux puces, rues historiques, marina. Nous dégustons un déjeuner local et continuons à explorer la ville. Soir: Retour à l\'hôtel. Nuit à Djibouti Ville.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Lake Assal & Rift Valley',
              fr: 'Lac Assal & Vallée du Rift'
            },
            description: {
              en: 'Day 2: Lake Assal & Rift Valley. Morning: We depart by 4×4 toward Lake Assal. We stop at Dimbiya Canyon before continuing to the Ghoubet region. Ghoubet: We take in the dramatic volcanic coastline and views toward the Gulf of Tadjourah. Ardoukoba: Where time and road conditions permit, we visit the volcanic landscape around Ardoukoba. Lake Assal: We arrive at the salt lake and explore the salt flats. Guests may have the opportunity to float/swim depending on conditions and guide approval. Lunch: Picnic lunch. Afternoon: Return to Djibouti City.',
              fr: 'Jour 2: Lac Assal & Vallée du Rift. Matin: Nous partons en 4×4 vers le Lac Assal. Nous nous arrêtons au canyon de Dimbiya avant de continuer vers la région de Ghoubet. Ghoubet: Nous admirons la côte volcanique spectaculaire et les vues sur le Golfe de Tadjourah. Ardoukoba: Si le temps et les conditions routières le permettent, nous visitons le paysage volcanique autour d\'Ardoukoba. Lac Assal: Nous arrivons au lac salé et explorons les plaines de sel. Les invités peuvent avoir l\'opportunité de flotter/nager selon les conditions et l\'approbation du guide. Déjeuner: Déjeuner pique-nique. Après-midi: Retour à Djibouti Ville.'
            }
          }
        ],
        included: {
          en: [
            'Private 4×4 transportation',
            'Driver and fuel',
            'English-speaking guide',
            'Day 2 picnic lunch',
            'Bottled drinking water',
            'Permits',
            'Site entrance fees'
          ],
          fr: [
            'Transport privé en 4×4',
            'Chauffeur et carburant',
            'Guide anglophone',
            'Déjeuner pique-nique jour 2',
            'Eau potable en bouteille',
            'Permis',
            'Frais d\'entrée des sites'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Djibouti City hotel',
            'Day 1 meals unless specified',
            'Personal expenses',
            'Swimming gear',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hôtel à Djibouti Ville',
            'Repas du jour 1 sauf mention contraire',
            'Dépenses personnelles',
            'Équipement de baignade',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable walking shoes',
            'Swimsuit',
            'Towel',
            'Sun protection',
            'Camera',
            'Water bottle'
          ],
          fr: [
            'Chaussures de marche confortables',
            'Maillot de bain',
            'Serviette',
            'Protection solaire',
            'Appareil photo',
            'Bouteille d\'eau'
          ]
        },
        accommodation: {
          en: 'Not included (hotel in Djibouti City required)',
          fr: 'Non inclus (hôtel à Djibouti Ville requis)'
        },
        transportation: {
          en: 'Private 4×4 with air conditioning',
          fr: '4×4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 7 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 7 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Can I do this tour without staying in Djibouti City?',
              fr: 'Puis-je faire ce circuit sans séjourner à Djibouti Ville ?'
            },
            answer: {
              en: 'No, the tour requires one night of accommodation in Djibouti City between the two days.',
              fr: 'Non, le circuit nécessite une nuit d\'hébergement à Djibouti Ville entre les deux jours.'
            }
          }
        ],
        bestSeasons: ['all'],
        categories: ['culture', 'geology'],
        tags: ['Djibouti City', 'Lake Assal', 'Culture', 'Geology'],
        metaTitle: {
          en: 'Djibouti City & Lake Assal Discovery | Djibouti Explorer',
          fr: 'Djibouti Ville & Lac Assal | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 2-day tour combining the culture of Djibouti City with the geological wonder of Lake Assal.',
          fr: 'Un circuit de 2 jours combinant la culture de Djibouti Ville avec la merveille géologique du Lac Assal.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 13. Lake Abbé + Lake Assal + Tadjourah + Sable Blanc
      // =========================================
      {
        title: {
          en: 'Lake Abbé, Lake Assal, Tadjourah & Sable Blanc',
          fr: 'Lac Abbé, Lac Assal, Tadjourah & Sable Blanc'
        },
        slug: {
          en: 'lake-abbe-lake-assal-tadjourah-sable-blanc',
          fr: 'lac-abbe-lac-assal-tadjourah-sable-blanc'
        },
        shortDescription: {
          en: 'Duration: 3 Days / 2 Nights. A 3-day circuit combining Lake Abbé, Lake Assal, Tadjourah and Sable Blanc beach.',
          fr: 'Durée: 3 Jours / 2 Nuits. Un circuit de 3 jours combinant Lac Abbé, Lac Assal, Tadjourah et la plage de Sable Blanc.'
        },
        description: {
          en: 'This 3-day circuit combines four of Djibouti\'s most popular destinations: the surreal limestone chimneys of Lake Abbé, the salt flats of Lake Assal (the lowest point in Africa), the historic White City of Tadjourah, and the beautiful Sable Blanc beach.',
          fr: 'Ce circuit de 3 jours combine quatre des destinations les plus populaires de Djibouti : les cheminées de calcaire surréalistes du Lac Abbé, les plaines de sel du Lac Assal (le point le plus bas d\'Afrique), la ville blanche historique de Tadjourah et la belle plage de Sable Blanc.'
        },
        price: 450,
        depositAmount: 90,
        currency: 'USD',
        duration: 3,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 10,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/lake-abbe-lake-assal-tadjourah-sable-blanc.jpg',
          gallery: []
        },
        destinations: ['Lake Abbé', 'Lake Assal', 'Tadjourah', 'Sable Blanc Beach'],
        highlights: {
          en: [
            'Lake Abbé limestone chimneys and sunrise',
            'Lake Assal salt flats (lowest point in Africa)',
            'Tadjourah White City',
            'Sable Blanc beach and snorkeling'
          ],
          fr: [
            'Cheminées de calcaire du Lac Abbé et lever du soleil',
            'Plaines de sel du Lac Assal (point le plus bas d\'Afrique)',
            'Ville Blanche de Tadjourah',
            'Plage de Sable Blanc et snorkeling'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti → Grand Bara → Dikhil → Lake Abbé',
              fr: 'Djibouti → Grand Bara → Dikhil → Lac Abbé'
            },
            description: {
              en: 'Day 1: Djibouti → Grand Bara → Dikhil → Lake Abbé. We depart Djibouti City in the morning and drive toward the Grand Bara and Petit Bara plains. We continue through Dikhil, stopping for lunch before leaving the paved road. The afternoon takes us through As-Eyla and Koutabouya toward Lake Abbé. We arrive before sunset and explore the limestone chimneys. As the sun goes down, the chimneys take on warm colours, creating one of the most spectacular photographic scenes in Djibouti. Dinner and overnight at the Lake Abbé tourist camp.',
              fr: 'Jour 1: Djibouti → Grand Bara → Dikhil → Lac Abbé. Nous quittons Djibouti Ville le matin et roulons vers les plaines du Grand Bara et du Petit Bara. Nous continuons à travers Dikhil, nous arrêtant pour le déjeuner avant de quitter la route asphaltée. L\'après-midi nous emmène à travers As-Eyla et Koutabouya vers le Lac Abbé. Nous arrivons avant le coucher du soleil et explorons les cheminées de calcaire. Au coucher du soleil, les cheminées prennent des couleurs chaudes, créant l\'une des scènes photographiques les plus spectaculaires de Djibouti. Dîner et nuit au camp touristique du Lac Abbé.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Lake Abbé Sunrise → Lake Assal → Tadjourah',
              fr: 'Lever du soleil Lac Abbé → Lac Assal → Tadjourah'
            },
            description: {
              en: 'Day 2: Lake Abbé Sunrise → Lake Assal → Tadjourah. We wake early for sunrise. After exploring the lake shore and observing flamingos, we leave Lake Abbé. We continue toward Dimbiya Canyon and the Ghoubet region before reaching Lake Assal. After exploring the salt flats, we continue toward Tadjourah. Evening: We arrive in Tadjourah, the historic White City. After dinner, we spend the night at our Tadjourah accommodation.',
              fr: 'Jour 2: Lever du Soleil Lac Abbé → Lac Assal → Tadjourah. Nous nous réveillons tôt pour le lever du soleil. Après avoir exploré la rive du lac et observé les flamants, nous quittons le Lac Abbé. Nous continuons vers le canyon de Dimbiya et la région de Ghoubet avant d\'atteindre le Lac Assal. Après avoir exploré les plaines de sel, nous continuons vers Tadjourah. Soir: Nous arrivons à Tadjourah, la Ville Blanche historique. Après le dîner, nous passons la nuit à notre hébergement à Tadjourah.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Tadjourah → Sable Blanc → Djibouti',
              fr: 'Tadjourah → Sable Blanc → Djibouti'
            },
            description: {
              en: 'Day 3: Tadjourah → Sable Blanc → Djibouti. After breakfast, we travel approximately 10 km north toward Sable Blanc. Sable Blanc: We spend the morning swimming, relaxing on the white sand and snorkeling around the reef. Lunch is served near the beach. The afternoon is dedicated to the return journey to Djibouti City.',
              fr: 'Jour 3: Tadjourah → Sable Blanc → Djibouti. Après le petit-déjeuner, nous parcourons environ 10 km vers le nord jusqu\'à Sable Blanc. Sable Blanc: Nous passons la matinée à nager, à nous détendre sur le sable blanc et à faire du snorkeling autour du récif. Le déjeuner est servi près de la plage. L\'après-midi est consacrée au voyage de retour vers Djibouti Ville.'
            }
          }
        ],
        included: {
          en: [
            '2 nights accommodation (Lake Abbé campsite, Tadjourah hotel)',
            'Private air-conditioned 4×4',
            'Driver and fuel',
            'English-speaking guide',
            'Meals according to itinerary',
            'Bottled water',
            'Travel permits',
            'Site entrance fees',
            'Lake Abbé, Lake Assal and Sable Blanc visits'
          ],
          fr: [
            '2 nuits d\'hébergement (camp Lac Abbé, hôtel Tadjourah)',
            '4×4 privé climatisé',
            'Chauffeur et carburant',
            'Guide anglophone',
            'Repas selon l\'itinéraire',
            'Eau en bouteille',
            'Permis de voyage',
            'Frais d\'entrée des sites',
            'Visites du Lac Abbé, Lac Assal et Sable Blanc'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Djibouti City accommodation',
            'Personal expenses',
            'Snorkeling equipment unless specified',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement à Djibouti Ville',
            'Dépenses personnelles',
            'Équipement de snorkeling sauf mention contraire',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable desert clothing',
            'Warm layers for nights',
            'Swimsuit',
            'Towel',
            'Sun protection',
            'Camera'
          ],
          fr: [
            'Vêtements confortables pour le désert',
            'Vêtements chauds pour les nuits',
            'Maillot de bain',
            'Serviette',
            'Protection solaire',
            'Appareil photo'
          ]
        },
        accommodation: {
          en: 'Lake Abbé camp (night 1) and Tadjourah hotel (night 2)',
          fr: 'Camp Lac Abbé (nuit 1) et hôtel Tadjourah (nuit 2)'
        },
        transportation: {
          en: 'Private 4×4 with air conditioning',
          fr: '4×4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 7 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 7 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is the Lake Abbé camp basic?',
              fr: 'Le camp du Lac Abbé est-il basique ?'
            },
            answer: {
              en: 'Yes, the Lake Abbé camp is basic traditional-style accommodation.',
              fr: 'Oui, le camp du Lac Abbé est un hébergement de style traditionnel basique.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['desert', 'beach', 'culture'],
        tags: ['Lake Abbé', 'Lake Assal', 'Tadjourah', 'Sable Blanc'],
        metaTitle: {
          en: 'Lake Abbé, Lake Assal, Tadjourah & Sable Blanc | Djibouti Explorer',
          fr: 'Lac Abbé, Lac Assal, Tadjourah & Sable Blanc | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 3-day circuit combining Lake Abbé, Lake Assal, Tadjourah and Sable Blanc beach.',
          fr: 'Un circuit de 3 jours combinant Lac Abbé, Lac Assal, Tadjourah et la plage de Sable Blanc.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 14. Lake Assal + Tadjourah + Day Forest
      // =========================================
      {
        title: {
          en: 'Lake Assal, Tadjourah & Day Forest Tour',
          fr: 'Lac Assal, Tadjourah & Forêt du Day'
        },
        slug: {
          en: 'lake-assal-tadjourah-day-forest',
          fr: 'lac-assal-tadjourah-foret-day'
        },
        shortDescription: {
          en: 'Duration: 3 Days / 2 Nights. A 3-day tour combining Lake Assal, Tadjourah and the Day Forest.',
          fr: 'Durée: 3 Jours / 2 Nuits. Un circuit de 3 jours combinant Lac Assal, Tadjourah et la Forêt du Day.'
        },
        description: {
          en: 'This 3-day tour combines the geological wonder of Lake Assal, the cultural heritage of Tadjourah, and the mountain forest of Day. It is a great mix of desert landscapes, coastal culture and mountain scenery.',
          fr: 'Ce circuit de 3 jours combine la merveille géologique du Lac Assal, le patrimoine culturel de Tadjourah et la forêt de montagne du Day. C\'est un excellent mélange de paysages désertiques, de culture côtière et de paysages montagneux.'
        },
        price: 420,
        depositAmount: 84,
        currency: 'USD',
        duration: 3,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 10,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/lake-assal-tadjourah-day-forest.jpg',
          gallery: []
        },
        destinations: ['Lake Assal', 'Tadjourah', 'Day Forest', 'Goda Mountains'],
        highlights: {
          en: [
            'Lake Assal salt flats (lowest point in Africa)',
            'Ardoukoba volcanic landscape',
            'Tadjourah White City',
            'Sable Blanc beach',
            'Day Forest ancient junipers'
          ],
          fr: [
            'Plaines de sel du Lac Assal (point le plus bas d\'Afrique)',
            'Paysage volcanique d\'Ardoukoba',
            'Ville Blanche de Tadjourah',
            'Plage de Sable Blanc',
            'Genévriers anciens de la Forêt du Day'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti → Lake Assal → Ardoukoba → Tadjourah',
              fr: 'Djibouti → Lac Assal → Ardoukoba → Tadjourah'
            },
            description: {
              en: 'Day 1: Djibouti → Lake Assal → Ardoukoba → Tadjourah. We leave Djibouti City at approximately 8:00 AM. Our first stop is Dimbiya Canyon, followed by the Ghoubet viewpoint. We continue to Lake Assal, where we explore the salt flats and surrounding volcanic landscape. We then visit the Ardoukoba volcanic area before continuing toward Tadjourah. Evening: Arrival in Tadjourah. We explore the historic town and its whitewashed buildings before dinner. Overnight in Tadjourah.',
              fr: 'Jour 1: Djibouti → Lac Assal → Ardoukoba → Tadjourah. Nous quittons Djibouti Ville vers 8h00. Notre premier arrêt est le canyon de Dimbiya, suivi du point de vue de Ghoubet. Nous continuons vers le Lac Assal, où nous explorons les plaines de sel et le paysage volcanique environnant. Nous visitons ensuite la zone volcanique d\'Ardoukoba avant de continuer vers Tadjourah. Soir: Arrivée à Tadjourah. Nous explorons la ville historique et ses bâtiments blanchis à la chaux avant le dîner. Nuit à Tadjourah.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Tadjourah → Sable Blanc → Day Forest',
              fr: 'Tadjourah → Sable Blanc → Forêt du Day'
            },
            description: {
              en: 'Day 2: Tadjourah → Sable Blanc → Day Forest. After breakfast, we drive to Sable Blanc. The white sand and turquoise water provide a welcome contrast to the volcanic landscapes of the previous day. Guests can swim, snorkel and relax on the beach. After lunch, we continue toward the Goda Mountains and Day Forest. Evening: Arrival at the mountain camp. Dinner and overnight in the Day Forest area.',
              fr: 'Jour 2: Tadjourah → Sable Blanc → Forêt du Day. Après le petit-déjeuner, nous roulons vers Sable Blanc. Le sable blanc et l\'eau turquoise offrent un contraste bienvenu avec les paysages volcaniques de la veille. Les invités peuvent nager, faire du snorkeling et se détendre sur la plage. Après le déjeuner, nous continuons vers les Monts Goda et la Forêt du Day. Soir: Arrivée au camp de montagne. Dîner et nuit dans la région de la Forêt du Day.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Day Forest Discovery → Djibouti',
              fr: 'Découverte de la Forêt du Day → Djibouti'
            },
            description: {
              en: 'Day 3: Day Forest Discovery → Djibouti. We begin the morning with a guided nature walk through the forest. We explore the juniper, wild olive, acacia and jujube vegetation and look for endemic and mountain wildlife. Birdwatchers can search for the Djibouti francolin. After lunch, we begin the descent from the mountains and return to Djibouti City.',
              fr: 'Jour 3: Découverte de la Forêt du Day → Djibouti. Nous commençons la matinée par une promenade guidée dans la nature à travers la forêt. Nous explorons la végétation de genévriers, d\'oliviers sauvages, d\'acacias et de jujubiers et recherchons la faune endémique et montagnarde. Les ornithologues peuvent rechercher le francolin de Djibouti. Après le déjeuner, nous commençons la descente des montagnes et retournons à Djibouti Ville.'
            }
          }
        ],
        included: {
          en: [
            'Private 4×4 transportation',
            'Driver and fuel',
            'English-speaking guide',
            'Tadjourah accommodation (night 1)',
            'Day Forest camp accommodation (night 2)',
            'Meals according to itinerary',
            'Bottled water',
            'Permits and entrance fees'
          ],
          fr: [
            'Transport privé en 4×4',
            'Chauffeur et carburant',
            'Guide anglophone',
            'Hébergement à Tadjourah (nuit 1)',
            'Hébergement au camp de la Forêt du Day (nuit 2)',
            'Repas selon l\'itinéraire',
            'Eau en bouteille',
            'Permis et frais d\'entrée'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Djibouti City accommodation',
            'Personal expenses',
            'Snorkeling/hiking equipment unless specified',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement à Djibouti Ville',
            'Dépenses personnelles',
            'Équipement de snorkeling/randonnée sauf mention contraire',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable clothing',
            'Hiking shoes',
            'Swimsuit',
            'Towel',
            'Sun protection',
            'Warm layers for mountain nights',
            'Camera'
          ],
          fr: [
            'Vêtements confortables',
            'Chaussures de randonnée',
            'Maillot de bain',
            'Serviette',
            'Protection solaire',
            'Vêtements chauds pour les nuits en montagne',
            'Appareil photo'
          ]
        },
        accommodation: {
          en: 'Tadjourah hotel (night 1) and Day Forest camp (night 2)',
          fr: 'Hôtel Tadjourah (nuit 1) et camp Forêt du Day (nuit 2)'
        },
        transportation: {
          en: 'Private 4×4 with air conditioning',
          fr: '4×4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 7 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 7 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is the Day Forest camp comfortable?',
              fr: 'Le camp de la Forêt du Day est-il confortable ?'
            },
            answer: {
              en: 'The camp is basic but comfortable, with meals provided and a unique mountain setting.',
              fr: 'Le camp est basique mais confortable, avec des repas fournis et un cadre montagnard unique.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['geology', 'culture', 'hiking'],
        tags: ['Lake Assal', 'Tadjourah', 'Day Forest', 'Goda Mountains'],
        metaTitle: {
          en: 'Lake Assal, Tadjourah & Day Forest | Djibouti Explorer',
          fr: 'Lac Assal, Tadjourah & Forêt du Day | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 3-day tour combining Lake Assal, Tadjourah and the Day Forest.',
          fr: 'Un circuit de 3 jours combinant Lac Assal, Tadjourah et la Forêt du Day.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 15. Moucha Island + Lake Abbé + Lake Assal Expedition
      // =========================================
      {
        title: {
          en: 'Moucha Island, Lake Abbé & Lake Assal Expedition',
          fr: 'Île Moucha, Lac Abbé & Lac Assal'
        },
        slug: {
          en: 'moucha-island-lake-abbe-lake-assal',
          fr: 'ile-moucha-lac-abbe-lac-assal'
        },
        shortDescription: {
          en: 'Duration: 3 Days / 2 Nights. A 3-day expedition combining Moucha Island with Lake Abbé and Lake Assal.',
          fr: 'Durée: 3 Jours / 2 Nuits. Une expédition de 3 jours combinant l\'île Moucha avec le Lac Abbé et le Lac Assal.'
        },
        description: {
          en: 'This 3-day expedition combines island relaxation with desert exploration. Day 1 takes you to Moucha Island for swimming, snorkeling and beach time. Day 2 goes to the surreal limestone chimneys of Lake Abbé. Day 3 visits Lake Assal, the lowest point in Africa.',
          fr: 'Cette expédition de 3 jours combine la détente sur l\'île avec l\'exploration du désert. Le jour 1 vous emmène à l\'île Moucha pour la baignade, le snorkeling et le temps à la plage. Le jour 2 vous emmène vers les cheminées de calcaire surréalistes du Lac Abbé. Le jour 3 visite le Lac Assal, le point le plus bas d\'Afrique.'
        },
        price: 480,
        depositAmount: 96,
        currency: 'USD',
        duration: 3,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 10,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/moucha-island-lake-abbe-lake-assal.jpg',
          gallery: []
        },
        destinations: ['Moucha Island', 'Lake Abbé', 'Lake Assal'],
        highlights: {
          en: [
            'Moucha Island white sand beaches and snorkeling',
            'Lake Abbé limestone chimneys',
            'Lake Assal salt flats',
            'Sunset and sunrise at Lake Abbé',
            'Afar region desert landscapes'
          ],
          fr: [
            'Plages de sable blanc de l\'île Moucha et snorkeling',
            'Cheminées de calcaire du Lac Abbé',
            'Plaines de sel du Lac Assal',
            'Coucher et lever du soleil au Lac Abbé',
            'Paysages désertiques de la région Afar'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Moucha & Maskali Islands',
              fr: 'Îles Moucha & Maskali'
            },
            description: {
              en: 'Day 1: Moucha & Maskali Islands. We leave Djibouti City in the morning and transfer to the harbour. A speedboat takes us across the Gulf of Tadjourah to Moucha. We explore the beaches, swim and snorkel around the coral reefs. We continue toward Maskali for additional marine exploration. Lunch is served on the island. In the afternoon, we return to Djibouti City.',
              fr: 'Jour 1: Îles Moucha & Maskali. Nous quittons Djibouti Ville le matin et nous transférons vers le port. Un speedboat nous emmène à travers le Golfe de Tadjourah vers Moucha. Nous explorons les plages, nageons et faisons du snorkeling autour des récifs coralliens. Nous continuons vers Maskali pour une exploration marine supplémentaire. Le déjeuner est servi sur l\'île. Dans l\'après-midi, nous retournons à Djibouti Ville.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Djibouti → Grand Bara → Lake Abbé',
              fr: 'Djibouti → Grand Bara → Lac Abbé'
            },
            description: {
              en: 'Day 2: Djibouti → Grand Bara → Lake Abbé. We leave the coast behind and travel toward the Grand Bara desert. After Dikhil, we continue off-road toward Lake Abbé. We pass through As-Eyla and Koutabouya before arriving at the limestone chimneys. We explore the landscape at sunset. Dinner and overnight at the Lake Abbé campsite.',
              fr: 'Jour 2: Djibouti → Grand Bara → Lac Abbé. Nous quittons la côte et voyageons vers le désert du Grand Bara. Après Dikhil, nous continuons hors-piste vers le Lac Abbé. Nous passons par As-Eyla et Koutabouya avant d\'arriver aux cheminées de calcaire. Nous explorons le paysage au coucher du soleil. Dîner et nuit au camp du Lac Abbé.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Lake Abbé Sunrise → Lake Assal → Djibouti',
              fr: 'Lever du soleil Lac Abbé → Lac Assal → Djibouti'
            },
            description: {
              en: 'Day 3: Lake Abbé Sunrise → Lake Assal → Djibouti. We wake before sunrise for the famous Lake Abbé sunrise. After breakfast, we visit the lake shore and look for flamingos and other wildlife. We continue toward Lake Assal via the Rift Valley landscapes. After visiting Lake Assal and its salt flats, we have lunch. We then begin the return journey to Djibouti City.',
              fr: 'Jour 3: Lever du Soleil Lac Abbé → Lac Assal → Djibouti. Nous nous réveillons avant le lever du soleil pour le célèbre lever du soleil du Lac Abbé. Après le petit-déjeuner, nous visitons la rive du lac et recherchons des flamants et d\'autres animaux sauvages. Nous continuons vers le Lac Assal à travers les paysages de la Vallée du Rift. Après avoir visité le Lac Assal et ses plaines de sel, nous déjeunons. Nous commençons ensuite le voyage de retour vers Djibouti Ville.'
            }
          }
        ],
        included: {
          en: [
            'Private 4×4 transportation',
            'Speedboat',
            'Captain and fuel',
            'English-speaking guide',
            'Snorkeling equipment where specified',
            'Lake Abbé campsite accommodation',
            'Meals according to itinerary',
            'Bottled drinking water',
            'Permits',
            'Entrance/site fees'
          ],
          fr: [
            'Transport privé en 4×4',
            'Speedboat',
            'Capitaine et carburant',
            'Guide anglophone',
            'Équipement de snorkeling le cas échéant',
            'Hébergement au camp du Lac Abbé',
            'Repas selon l\'itinéraire',
            'Eau potable en bouteille',
            'Permis',
            'Frais d\'entrée/site'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Djibouti City accommodation',
            'Personal expenses',
            'Tips',
            'Meals in Djibouti City'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement à Djibouti Ville',
            'Dépenses personnelles',
            'Pourboires',
            'Repas à Djibouti Ville'
          ]
        },
        whatToBring: {
          en: [
            'Swimsuit',
            'Towel',
            'Sun protection',
            'Hat',
            'Camera',
            'Warm layers for desert night'
          ],
          fr: [
            'Maillot de bain',
            'Serviette',
            'Protection solaire',
            'Chapeau',
            'Appareil photo',
            'Vêtements chauds pour la nuit dans le désert'
          ]
        },
        accommodation: {
          en: 'Lake Abbé camp (night 2)',
          fr: 'Camp Lac Abbé (nuit 2)'
        },
        transportation: {
          en: '4×4 and speedboat',
          fr: '4×4 et speedboat'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 7 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 7 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is snorkeling equipment provided on day 1?',
              fr: 'L\'équipement de snorkeling est-il fourni le jour 1 ?'
            },
            answer: {
              en: 'Snorkeling equipment is included where specified. Please confirm when booking.',
              fr: 'L\'équipement de snorkeling est inclus le cas échéant. Veuillez confirmer lors de la réservation.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['island', 'desert', 'geology'],
        tags: ['Moucha', 'Lake Abbé', 'Lake Assal', 'Snorkeling'],
        metaTitle: {
          en: 'Moucha Island, Lake Abbé & Lake Assal Expedition | Djibouti Explorer',
          fr: 'Île Moucha, Lac Abbé & Lac Assal | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 3-day expedition combining Moucha Island with Lake Abbé and Lake Assal.',
          fr: 'Une expédition de 3 jours combinant l\'île Moucha avec le Lac Abbé et le Lac Assal.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 16. Whale Shark + Lake Assal Full-Day Adventure
      // =========================================
      {
        title: {
          en: 'Whale Shark & Lake Assal Full-Day Adventure',
          fr: 'Requin-Baleine & Lac Assal Journée Complète'
        },
        slug: {
          en: 'whale-shark-lake-assal-full-day',
          fr: 'requin-baleine-lac-assal-journee-complete'
        },
        shortDescription: {
          en: 'Duration: Approximately 12 Hours. A full-day adventure combining whale shark snorkeling with Lake Assal.',
          fr: 'Durée: Environ 12 Heures. Une aventure d\'une journée complète combinant le snorkeling avec les requins-baleines et le Lac Assal.'
        },
        description: {
          en: 'This full-day adventure combines two of Djibouti\'s most iconic experiences: swimming with whale sharks in the Gulf of Tadjourah and exploring Lake Assal, the lowest point in Africa. It is a long but rewarding day that showcases the best of Djibouti\'s marine and desert environments.',
          fr: 'Cette aventure d\'une journée complète combine deux des expériences les plus emblématiques de Djibouti : la nage avec les requins-baleines dans le Golfe de Tadjourah et l\'exploration du Lac Assal, le point le plus bas d\'Afrique. C\'est une journée longue mais enrichissante qui présente le meilleur des environnements marins et désertiques de Djibouti.'
        },
        price: 350,
        depositAmount: 70,
        currency: 'USD',
        duration: 1,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 10,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/whale-shark-lake-assal.jpg',
          gallery: []
        },
        destinations: ['Gulf of Tadjourah', 'Lake Assal', 'Dimbiya Canyon', 'Ghoubet'],
        highlights: {
          en: [
            'Whale shark snorkeling',
            'Lake Assal (lowest point in Africa)',
            'Dimbiya Canyon views',
            'Ghoubet volcanic coastline',
            'Marine and desert landscapes'
          ],
          fr: [
            'Snorkeling avec les requins-baleines',
            'Lac Assal (point le plus bas d\'Afrique)',
            'Vues sur le canyon de Dimbiya',
            'Côte volcanique de Ghoubet',
            'Paysages marins et désertiques'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Whale Shark & Lake Assal Full-Day',
              fr: 'Requin-Baleine & Lac Assal Journée Complète'
            },
            description: {
              en: 'Early Morning: Djibouti City → Arta → Gulf of Tadjourah. We leave Djibouti City early and drive toward Arta. At the coast, we board the speedboat and begin searching the Gulf of Tadjourah for whale sharks. Whale Shark Encounter. The crew searches areas where seasonal whale sharks are known to feed. Once a whale shark is found, the guide gives a safety briefing before guests enter the water for snorkeling. Because these are wild animals, encounters and time in the water cannot be guaranteed. Lunch: Picnic lunch and bottled water. Midday: From the Sea to the Salt Lake. After returning to shore, we continue by 4×4 toward Lake Assal. We pass through the dramatic Rift Valley landscapes and may stop at Ghoubet or Dimbiya depending on the schedule. Afternoon: Lake Assal. We arrive at Lake Assal and explore its brilliant salt flats. The contrast between the blue-green water, white salt and black volcanic terrain creates one of Djibouti\'s most recognizable landscapes. Guests may float/swim where conditions allow. Evening: Return to Djibouti City.',
              fr: 'Tôt le Matin: Djibouti Ville → Arta → Golfe de Tadjourah. Nous quittons Djibouti Ville tôt et roulons vers Arta. Sur la côte, nous embarquons sur le speedboat et commençons à rechercher les requins-baleines dans le Golfe de Tadjourah. Rencontre avec les Requins-Baleines. L\'équipage recherche les zones où les requins-baleines saisonniers se nourrissent. Une fois un requin-baleine trouvé, le guide donne un briefing de sécurité avant que les invités n\'entrent dans l\'eau pour le snorkeling. Comme il s\'agit d\'animaux sauvages, les rencontres et le temps passé dans l\'eau ne peuvent être garantis. Déjeuner: Déjeuner pique-nique et eau en bouteille. Mi-journée: De la Mer au Lac Salé. Après être retournés à terre, nous continuons en 4×4 vers le Lac Assal. Nous traversons les paysages spectaculaires de la Vallée du Rift et pouvons nous arrêter à Ghoubet ou Dimbiya selon le programme. Après-midi: Lac Assal. Nous arrivons au Lac Assal et explorons ses magnifiques plaines de sel. Le contraste entre l\'eau bleu-vert, le sel blanc et le terrain volcanique noir crée l\'un des paysages les plus reconnaissables de Djibouti. Les invités peuvent flotter/nager lorsque les conditions le permettent. Soir: Retour à Djibouti Ville.'
            }
          }
        ],
        included: {
          en: [
            'Hotel pickup/drop-off',
            '4×4 transport',
            'Speedboat',
            'Captain and fuel',
            'Professional guide',
            'Whale-shark snorkeling experience',
            'Lunch',
            'Bottled drinking water',
            'Lake Assal visit',
            'Permits/site fees'
          ],
          fr: [
            'Prise en charge/dépôt à l\'hôtel',
            'Transport en 4×4',
            'Speedboat',
            'Capitaine et carburant',
            'Guide professionnel',
            'Expérience de snorkeling avec les requins-baleines',
            'Déjeuner',
            'Eau potable en bouteille',
            'Visite du Lac Assal',
            'Permis/frais de site'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Accommodation',
            'Snorkeling equipment where not specified',
            'Personal expenses',
            'Towels',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Hébergement',
            'Équipement de snorkeling non spécifié',
            'Dépenses personnelles',
            'Serviettes',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Swimsuit',
            'Towel',
            'Snorkeling equipment (if you have your own)',
            'Sun protection',
            'Hat',
            'Underwater camera',
            'Water shoes'
          ],
          fr: [
            'Maillot de bain',
            'Serviette',
            'Équipement de snorkeling (si vous en avez)',
            'Protection solaire',
            'Chapeau',
            'Appareil photo étanche',
            'Chaussures d\'eau'
          ]
        },
        accommodation: {
          en: 'Not included (day trip)',
          fr: 'Non inclus (excursion d\'une journée)'
        },
        transportation: {
          en: '4×4 and speedboat',
          fr: '4×4 et speedboat'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 24 hours before the tour.',
          fr: 'Annulation gratuite jusqu\'à 24 heures avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is whale shark sighting guaranteed?',
              fr: 'L\'observation des requins-baleines est-elle garantie ?'
            },
            answer: {
              en: 'No, whale sharks are wild animals and sightings cannot be guaranteed.',
              fr: 'Non, les requins-baleines sont des animaux sauvages et les observations ne peuvent être garanties.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb'],
        categories: ['wildlife', 'marine', 'geology'],
        tags: ['Whale Sharks', 'Lake Assal', 'Snorkeling', 'Geology'],
        metaTitle: {
          en: 'Whale Shark & Lake Assal Full-Day Adventure | Djibouti Explorer',
          fr: 'Requin-Baleine & Lac Assal Journée Complète | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A full-day adventure combining whale shark snorkeling with Lake Assal.',
          fr: 'Une aventure d\'une journée complète combinant le snorkeling avec les requins-baleines et le Lac Assal.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 17. Tadjourah, Sable Blanc & Day Forest Discovery
      // =========================================
      {
        title: {
          en: 'Tadjourah, Sable Blanc & Day Forest Discovery',
          fr: 'Tadjourah, Sable Blanc & Forêt du Day'
        },
        slug: {
          en: 'tadjourah-sable-blanc-day-forest',
          fr: 'tadjourah-sable-blanc-foret-day'
        },
        shortDescription: {
          en: 'Duration: 2–3 Days. A discovery tour combining Tadjourah, Sable Blanc beach and the Day Forest.',
          fr: 'Durée: 2–3 Jours. Un circuit de découverte combinant Tadjourah, la plage de Sable Blanc et la Forêt du Day.'
        },
        description: {
          en: 'This 2–3 day tour combines the cultural heritage of Tadjourah, the beach relaxation of Sable Blanc, and the mountain forest of Day. It is a perfect mix of culture, beach and nature.',
          fr: 'Ce circuit de 2–3 jours combine le patrimoine culturel de Tadjourah, la détente à la plage de Sable Blanc et la forêt de montagne du Day. C\'est un mélange parfait de culture, de plage et de nature.'
        },
        price: 380,
        depositAmount: 76,
        currency: 'USD',
        duration: 3,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 8,
        meetingPoint: {
          en: 'Your hotel in Djibouti City',
          fr: 'Votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/tadjourah-sable-blanc-day-forest.jpg',
          gallery: []
        },
        destinations: ['Tadjourah', 'Sable Blanc Beach', 'Day Forest', 'Goda Mountains'],
        highlights: {
          en: [
            'Tadjourah White City cultural tour',
            'Sable Blanc beach and snorkeling',
            'Day Forest ancient junipers',
            'Goda Mountains landscape',
            'Djibouti francolin birdwatching'
          ],
          fr: [
            'Visite culturelle de la Ville Blanche de Tadjourah',
            'Plage de Sable Blanc et snorkeling',
            'Genévriers anciens de la Forêt du Day',
            'Paysage des Monts Goda',
            'Observation du francolin de Djibouti'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti → Tadjourah',
              fr: 'Djibouti → Tadjourah'
            },
            description: {
              en: 'Day 1: Djibouti → Tadjourah. We travel toward Tadjourah and explore the historic White City. We walk through its whitewashed streets, visit historic landmarks and enjoy the coastal atmosphere. Dinner and overnight in Tadjourah.',
              fr: 'Jour 1: Djibouti → Tadjourah. Nous voyageons vers Tadjourah et explorons la Ville Blanche historique. Nous parcourons ses rues blanchies à la chaux, visitons des sites historiques et profitons de l\'atmosphère côtière. Dîner et nuit à Tadjourah.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Sable Blanc → Goda Mountains',
              fr: 'Sable Blanc → Monts Goda'
            },
            description: {
              en: 'Day 2: Sable Blanc → Goda Mountains. After breakfast, we drive to Sable Blanc. We spend the morning swimming, snorkeling and relaxing beside the Gulf of Tadjourah. After lunch, we continue toward the Goda Mountains. We arrive at our mountain camp in the evening. Dinner and overnight.',
              fr: 'Jour 2: Sable Blanc → Monts Goda. Après le petit-déjeuner, nous roulons vers Sable Blanc. Nous passons la matinée à nager, faire du snorkeling et nous détendre au bord du Golfe de Tadjourah. Après le déjeuner, nous continuons vers les Monts Goda. Nous arrivons à notre camp de montagne en soirée. Dîner et nuit.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Day Forest Trek → Djibouti',
              fr: 'Randonnée Forêt du Day → Djibouti'
            },
            description: {
              en: 'Day 3: Day Forest Trek → Djibouti. After breakfast, we begin our guided forest trek. We explore the highland vegetation, search for endemic birds and enjoy the cooler mountain environment. After lunch, we descend from the mountains and return to Djibouti City.',
              fr: 'Jour 3: Randonnée Forêt du Day → Djibouti. Après le petit-déjeuner, nous commençons notre randonnée guidée dans la forêt. Nous explorons la végétation des hautes terres, recherchons des oiseaux endémiques et profitons de l\'environnement montagnard plus frais. Après le déjeuner, nous descendons des montagnes et retournons à Djibouti Ville.'
            }
          }
        ],
        included: {
          en: [
            '4×4 transportation',
            'Driver and fuel',
            'Professional guide',
            'Tadjourah accommodation',
            'Mountain camp accommodation where applicable',
            'Meals according to itinerary',
            'Bottled drinking water',
            'Beach and forest excursions',
            'Permits/site fees'
          ],
          fr: [
            'Transport en 4×4',
            'Chauffeur et carburant',
            'Guide professionnel',
            'Hébergement à Tadjourah',
            'Hébergement au camp de montagne le cas échéant',
            'Repas selon l\'itinéraire',
            'Eau potable en bouteille',
            'Excursions à la plage et dans la forêt',
            'Permis/frais de site'
          ]
        },
        excluded: {
          en: [
            'Flights',
            'Visa',
            'Insurance',
            'Djibouti City accommodation',
            'Personal expenses',
            'Snorkeling equipment unless specified',
            'Trekking equipment',
            'Tips'
          ],
          fr: [
            'Vols',
            'Visa',
            'Assurance',
            'Hébergement à Djibouti Ville',
            'Dépenses personnelles',
            'Équipement de snorkeling sauf mention contraire',
            'Équipement de randonnée',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Swimsuit',
            'Towel',
            'Hiking shoes',
            'Sun protection',
            'Camera',
            'Warm layers for mountain nights'
          ],
          fr: [
            'Maillot de bain',
            'Serviette',
            'Chaussures de randonnée',
            'Protection solaire',
            'Appareil photo',
            'Vêtements chauds pour les nuits en montagne'
          ]
        },
        accommodation: {
          en: 'Tadjourah hotel (night 1) and mountain camp (night 2)',
          fr: 'Hôtel Tadjourah (nuit 1) et camp de montagne (nuit 2)'
        },
        transportation: {
          en: 'Private 4×4 with air conditioning',
          fr: '4×4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 7 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 7 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is the Day Forest trek difficult?',
              fr: 'La randonnée dans la Forêt du Day est-elle difficile ?'
            },
            answer: {
              en: 'The trek is moderate with some steep sections. Suitable for people with average fitness.',
              fr: 'La randonnée est modérée avec quelques sections raides. Convient aux personnes ayant une condition physique moyenne.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['culture', 'beach', 'hiking'],
        tags: ['Tadjourah', 'Sable Blanc', 'Day Forest', 'Goda Mountains'],
        metaTitle: {
          en: 'Tadjourah, Sable Blanc & Day Forest Discovery | Djibouti Explorer',
          fr: 'Tadjourah, Sable Blanc & Forêt du Day | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A discovery tour combining Tadjourah, Sable Blanc beach and the Day Forest.',
          fr: 'Un circuit de découverte combinant Tadjourah, la plage de Sable Blanc et la Forêt du Day.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        if (!doc) {
          await adminDb.collection('tours').add(tour);
          addedCount++;
        } else {
          await adminDb.collection('tours').doc(doc.id).update(tour);
          updatedCount++;
        }
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