import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const tours = [
      // =========================================
      // 1. Djalelo And Lac Abbe Tour (3 Days / 2 Nights)
      // =========================================
      {
        title: {
          en: 'Djalelo & Lac Abbé Adventure',
          fr: 'Aventure Djalelo & Lac Abbé'
        },
        slug: {
          en: 'djalelo-lac-abbe-adventure',
          fr: 'aventure-djalelo-lac-abbe'
        },
        shortDescription: {
          en: 'A 3-day adventure combining the Djalelo camp in the UNESCO-listed valley with the lunar landscapes of Lac Abbé.',
          fr: 'Une aventure de 3 jours combinant le camp de Djalelo dans la vallée classée UNESCO avec les paysages lunaires du Lac Abbé.'
        },
        description: {
          en: 'This 3-day tour takes you to two of Djibouti\'s most extraordinary places. Djalelo camp is located in a Unesco World Heritage valley, offering comfortable eco-lodging in harmony with nature. Lac Abbé is a surreal landscape of limestone chimneys and flamingos, known for its otherworldly beauty. The tour includes hiking, meeting nomadic populations, and experiencing the unique wildlife of the region.',
          fr: 'Ce circuit de 3 jours vous emmène dans deux des endroits les plus extraordinaires de Djibouti. Le camp de Djalelo est situé dans une vallée classée au patrimoine mondial de l\'UNESCO, offrant un hébergement écologique confortable en harmonie avec la nature. Le Lac Abbé est un paysage surréaliste de cheminées de calcaire et de flamants, connu pour sa beauté d\'un autre monde. Le circuit comprend des randonnées, la rencontre avec des populations nomades et la découverte de la faune unique de la région.'
        },
        price: 450,
        depositAmount: 90,
        currency: 'USD',
        duration: 3,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 8,
        meetingPoint: {
          en: 'Djibouti Airport or your hotel in Djibouti City',
          fr: 'Aéroport de Djibouti ou votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/djalelo-lac-abbe.jpg',
          gallery: []
        },
        destinations: ['Djalelo', 'Lac Abbé', 'Dikhil', 'Arta'],
        highlights: {
          en: [
            'UNESCO World Heritage valley at Djalelo',
            'Comfortable eco-camp in harmony with nature',
            'Hike to meet nomadic populations',
            'Gazelle-giraffe sightings',
            'Surreal limestone chimneys of Lac Abbé',
            'Pink flamingos at sunrise',
            'Traditional Djiboutian cuisine'
          ],
          fr: [
            'Vallée classée UNESCO à Djalelo',
            'Éco-camp confortable en harmonie avec la nature',
            'Randonnée à la rencontre des populations nomades',
            'Observation des gazelles-girafes',
            'Cheminées de calcaire surréalistes du Lac Abbé',
            'Flamants roses au lever du soleil',
            'Cuisine traditionnelle djiboutienne'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'On the Territory of the Gazelles-Giraffe',
              fr: 'Sur le Territoire des Gazelles-Girafes'
            },
            description: {
              en: 'Morning arrival at Djibouti – Welcome at the airport and transfer to Guest House La Terrasse. Depending on arrival time, enjoy a short city tour or relaxation at Villa Camille. Lunch at a restaurant at the port of Djibouti. Afternoon: departure for Djalelo\'s camp located one hour from the capital. The Djalelo camp is in a UNESCO-listed valley, featuring charming straw huts with solar lighting, in perfect harmony with the natural environment. Evening: Barbecue dinner. Night at Djalelo\'s camp.',
              fr: 'Arrivée matinale à Djibouti – Accueil à l\'aéroport et transfert à la Guest House La Terrasse. Selon l\'heure d\'arrivée, visite courte de la ville ou moment de détente à Villa Camille. Déjeuner dans un restaurant au port de Djibouti. Après-midi: départ pour le camp de Djalelo situé à une heure de la capitale. Le camp de Djalelo est situé dans une vallée classée UNESCO, avec des cases en paille charmantes et un éclairage solaire, en parfaite harmonie avec l\'environnement naturel. Soir: Dîner barbecue. Nuit au camp de Djalelo.'
            }
          },
          {
            day: 2,
            title: {
              en: 'On the Lac Abbé Planet',
              fr: 'Sur la Planète Lac Abbé'
            },
            description: {
              en: 'Morning: Hike to meet a nomadic population. With luck, see the gazelles-giraffes. Departure to Dikhil, the first stage on the way to Lac Abbé. Visit the palm grove before lunch at the restaurant. Afternoon: Drive 80 km of track, crossing the villages of As Eyla and Koutabouya. Arrive at Lac Abbé to admire the sunset among the limestone chimneys. The lunar landscapes are amazing, rumored to be where the 1968 film "Planet of the Apes" was filmed. Some chimneys reach 50 meters in height, others emit sulfur-smelling fumaroles. Dinner and overnight at the Lac Abbé camp, located a few hundred meters from the lake.',
              fr: 'Matin: Randonnée à la rencontre d\'une population nomade. Avec un peu de chance, observation des gazelles-girafes. Départ pour Dikhil, la première étape vers le Lac Abbé. Visite de la palmeraie avant le déjeuner au restaurant. Après-midi: Route sur 80 km de piste, traversée des villages d\'As Eyla et Koutabouya. Arrivée au Lac Abbé pour admirer le coucher du soleil au milieu des cheminées de calcaire. Les paysages lunaires sont étonnants, on raconte que le film "La Planète des Singes" de 1968 y a été tourné. Certaines cheminées atteignent 50 mètres de hauteur, d\'autres émettent des fumerolles à l\'odeur de soufre. Dîner et nuit au camp du Lac Abbé, situé à quelques centaines de mètres du lac.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Pink Flamingos',
              fr: 'Flamants Roses'
            },
            description: {
              en: 'Very early morning: Witness the sunrise. After breakfast with local galettes, approach the flamingos by the lake, then walk among chimneys and hot springs. Afternoon: Return journey. Lunch on the heights at Sunny Hill restaurant in Arta with a magnificent panorama. Arrive in Djibouti in the late afternoon. Evening: Taste the famous Yemeni fish at Youssouf\'s restaurant before transfer to the airport.',
              fr: 'Très tôt le matin: Lever du soleil. Après le petit-déjeuner avec des galettes locales, approche des flamants au bord du lac, puis promenade parmi les cheminées et les sources chaudes. Après-midi: Retour. Déjeuner sur les hauteurs au restaurant Sunny Hill à Arta avec un magnifique panorama. Arrivée à Djibouti en fin d\'après-midi. Soir: Dégustation du fameux poisson yéménite au restaurant Youssouf avant le transfert à l\'aéroport.'
            }
          }
        ],
        included: {
          en: [
            'Airport transfers',
            'Private vehicle with driver',
            'French/English-speaking guide',
            'Full board meals',
            '1.5 liters of water per day per person',
            'Accommodation: Djalelo camp (1 night), Lac Abbé camp (1 night)',
            'All site entrance fees',
            'Government taxes'
          ],
          fr: [
            'Transferts aéroport',
            'Véhicule privé avec chauffeur',
            'Guide francophone/anglophone',
            'Pension complète',
            '1,5 litre d\'eau par jour par personne',
            'Hébergement: camp Djalelo (1 nuit), camp Lac Abbé (1 nuit)',
            'Frais d\'entrée des sites',
            'Taxes gouvernementales'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Alcoholic beverages',
            'Medical repatriation insurance',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Boissons alcoolisées',
            'Assurance rapatriement médical',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable hiking shoes',
            'Sun protection (hat, sunscreen, sunglasses)',
            'Camera',
            'Binoculars',
            'Light clothing for the day',
            'Warm layers for the evening',
            'Swimsuit and towel',
            'Water bottle',
            'Flashlight/headlamp'
          ],
          fr: [
            'Chaussures de randonnée confortables',
            'Protection solaire (chapeau, crème solaire, lunettes)',
            'Appareil photo',
            'Jumelles',
            'Vêtements légers pour la journée',
            'Vêtements chauds pour le soir',
            'Maillot de bain et serviette',
            'Bouteille d\'eau',
            'Lampe torche/frontale'
          ]
        },
        accommodation: {
          en: 'Djalelo eco-camp (1 night), Lac Abbé camp (1 night)',
          fr: 'Éco-camp Djalelo (1 nuit), camp Lac Abbé (1 nuit)'
        },
        transportation: {
          en: 'Private 4x4 with air conditioning',
          fr: '4x4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 14 days before the tour. 50% refund for cancellations within 7 days. No refund for no-shows.',
          fr: 'Annulation gratuite jusqu\'à 14 jours avant le circuit. Remboursement de 50 % pour les annulations dans les 7 jours. Aucun remboursement pour les non-présentations.'
        },
        faqs: [
          {
            question: {
              en: 'Are the Djalelo and Lac Abbé camps comfortable?',
              fr: 'Les camps de Djalelo et du Lac Abbé sont-ils confortables ?'
            },
            answer: {
              en: 'Yes, Djalelo camp offers comfortable eco-lodging with solar lighting. Lac Abbé camp is basic but clean, located close to the lake.',
              fr: 'Oui, le camp de Djalelo offre un hébergement écologique confortable avec éclairage solaire. Le camp du Lac Abbé est basique mais propre, situé à proximité du lac.'
            }
          },
          {
            question: {
              en: 'What wildlife can we see?',
              fr: 'Quelle faune pouvons-nous observer ?'
            },
            answer: {
              en: 'With luck, you can see gazelles-giraffes, flamingos, and various bird species. Wildlife sightings are never guaranteed.',
              fr: 'Avec un peu de chance, vous pouvez voir des gazelles-girafes, des flamants et diverses espèces d\'oiseaux. Les observations d\'animaux sauvages ne sont jamais garanties.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['adventure', 'desert', 'wildlife'],
        tags: ['Djalelo', 'Lac Abbé', 'UNESCO', 'Flamingos'],
        metaTitle: {
          en: 'Djalelo & Lac Abbé Adventure | Djibouti Explorer',
          fr: 'Aventure Djalelo & Lac Abbé | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 3-day adventure combining the Djalelo eco-camp with the lunar landscapes of Lac Abbé.',
          fr: 'Une aventure de 3 jours combinant l\'éco-camp de Djalelo avec les paysages lunaires du Lac Abbé.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 2. Djibouti, Lac Abbé, Lac Assal Tour (4 Days / 3 Nights)
      // =========================================
      {
        title: {
          en: 'Djibouti, Lac Abbé & Lac Assal Tour',
          fr: 'Djibouti, Lac Abbé & Lac Assal'
        },
        slug: {
          en: 'djibouti-lac-abbe-lac-assal-tour',
          fr: 'djibouti-lac-abbe-lac-assal'
        },
        shortDescription: {
          en: 'A 4-day tour exploring Djibouti City, the lunar landscapes of Lac Abbé, and the legendary salt lake of Lac Assal.',
          fr: 'Un circuit de 4 jours explorant Djibouti Ville, les paysages lunaires du Lac Abbé et le légendaire lac salé du Lac Assal.'
        },
        description: {
          en: 'This 4-day tour combines the cultural highlights of Djibouti City with two of the country\'s most extraordinary natural wonders: Lac Abbé with its surreal limestone chimneys and flamingos, and Lac Assal, the lowest point in Africa with its legendary salt flats. The tour includes snorkeling at Arta Beach, sunset at Lac Abbé, and swimming in the salty waters of Lac Assal.',
          fr: 'Ce circuit de 4 jours combine les points forts culturels de Djibouti Ville avec deux des merveilles naturelles les plus extraordinaires du pays: le Lac Abbé avec ses cheminées de calcaire surréalistes et ses flamants, et le Lac Assal, le point le plus bas d\'Afrique avec ses légendaires plaines de sel. Le circuit comprend du snorkeling à Arta Beach, le coucher de soleil au Lac Abbé et la baignade dans les eaux salées du Lac Assal.'
        },
        price: 550,
        depositAmount: 110,
        currency: 'USD',
        duration: 4,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 8,
        meetingPoint: {
          en: 'Djibouti Airport or your hotel in Djibouti City',
          fr: 'Aéroport de Djibouti ou votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/djibouti-lac-abbe-lac-assal.jpg',
          gallery: []
        },
        destinations: ['Djibouti City', 'Lac Abbé', 'Lac Assal', 'Arta'],
        highlights: {
          en: [
            'Djibouti City cultural tour',
            'Surreal limestone chimneys of Lac Abbé',
            'Sunset and flamingos at Lac Abbé',
            'Snorkeling at Arta Beach',
            'Legendary salt flats of Lac Assal',
            'Swim in the salty waters of Lac Assal'
          ],
          fr: [
            'Visite culturelle de Djibouti Ville',
            'Cheminées de calcaire surréalistes du Lac Abbé',
            'Coucher de soleil et flamants au Lac Abbé',
            'Snorkeling à Arta Beach',
            'Légendaires plaines de sel du Lac Assal',
            'Baignade dans les eaux salées du Lac Assal'
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
              en: 'After being welcomed at the airport and transferred to your accommodation, we visit « Place du 27 juin » (Ménélik) and « Place Mahmoud Harbi » (Rimbaud) where the very lively bus station of the capital is located. After lunch in a restaurant on Venise Road, we\'ll go to the fishing port and to the stopover, where people board the ferry to Tadjourah or Obock. Then depending on the day of your arrival, we will visit the animal shelter DECAN or we will walk in the shopping street of the « Caisses ». We\'ll have dinner at the restaurant « Chez Youssouf », where you will enjoy the specialty of Yemeni fish. Night at the Guest House La Terrasse or in our apartment in the Heron district.',
              fr: 'Après avoir été accueilli à l\'aéroport et transféré à votre hébergement, nous visitons la « Place du 27 juin » (Ménélik) et la « Place Mahmoud Harbi » (Rimbaud) où se trouve la très animée gare routière de la capitale. Après le déjeuner dans un restaurant de la rue de Venise, nous nous rendons au port de pêche et à l\'escale, où l\'on embarque pour le ferry vers Tadjourah ou Obock. Ensuite, selon le jour de votre arrivée, nous visiterons le refuge animalier DECAN ou nous nous promènerons dans la rue commerçante des « Caisses ». Nous dînerons au restaurant « Chez Youssouf », où vous dégusterez la spécialité de poisson yéménite. Nuit à la Guest House La Terrasse ou dans notre appartement du quartier du Héron.'
            }
          },
          {
            day: 2,
            title: {
              en: 'On the Lac Abbé Planet',
              fr: 'Sur la Planète Lac Abbé'
            },
            description: {
              en: 'Morning: Departure to Dikhil, the first stage on the way to Lac Abbé. We will visit the palm grove before lunch at the restaurant at Dikhil. Afternoon: we will drive on 80 km of track, and we will cross the villages of As Eyla and Koutabouya. We will arrive at Lac Abbé to admire the sunset in the middle of the limestone chimneys. The lunar landscapes of Lac Abbé are very amazing, it is rumored that the 1968 film « Planet of the Apes » was filmed here. Some of these chimneys reach 50 meters in height, others let out fumaroles that smell of sulfur. Wetland, lac Abbé is also a place where nomadic children, every day, bring their herds to graze. We have dinner and spend the night at the Lac Abbé camp, located a few hundred meters from the lake.',
              fr: 'Matin: Départ pour Dikhil, la première étape sur la route du Lac Abbé. Nous visiterons la palmeraie avant le déjeuner au restaurant de Dikhil. Après-midi: nous roulerons sur 80 km de piste, et nous traverserons les villages d\'As Eyla et Koutabouya. Nous arriverons au Lac Abbé pour admirer le coucher du soleil au milieu des cheminées de calcaire. Les paysages lunaires du Lac Abbé sont très étonnants, on raconte que le film « La Planète des Singes » de 1968 y a été tourné. Certaines de ces cheminées atteignent 50 mètres de hauteur, d\'autres laissent échapper des fumerolles à l\'odeur de soufre. Zone humide, le lac Abbé est aussi un lieu où les enfants nomades, chaque jour, amènent leurs troupeaux paître. Nous dînons et passons la nuit au camp du Lac Abbé, situé à quelques centaines de mètres du lac.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Pink Flamingos at Lac Abbé and Snorkeling at Arta Beach',
              fr: 'Flamants Roses au Lac Abbé et Snorkeling à Arta Beach'
            },
            description: {
              en: 'Very early in the morning, we witness the sunrise. After breakfast where we will enjoy the local galettes, we will approach the flamingos by the lake; then we\'ll walk among chimneys and hot springs. Then we will take the way back. About 40 km before arriving in Djibouti, we will leave the national road to take a track that leads us to Arta beach where we will have lunch in a straw hut. At this place the underwater fauna and flora are superb; you can enjoy them with a pair of fins, a mask, and a snorkel. We will return to Djibouti at the end of the afternoon. Evening meals at the restaurant and nights at the Guest House La Terrasse or in our apartment.',
              fr: 'Très tôt le matin, nous assistons au lever du soleil. Après le petit-déjeuner où nous dégusterons les galettes locales, nous nous approcherons des flamants au bord du lac; puis nous marcherons parmi les cheminées et les sources chaudes. Ensuite, nous prendrons le chemin du retour. À environ 40 km avant d\'arriver à Djibouti, nous quitterons la route nationale pour emprunter une piste qui nous mène à la plage d\'Arta où nous déjeunerons dans une case en paille. À cet endroit, la faune et la flore sous-marines sont superbes; vous pourrez en profiter avec une paire de palmes, un masque et un tuba. Nous rentrerons à Djibouti en fin d\'après-midi. Repas du soir au restaurant et nuits à la Guest House La Terrasse ou dans notre appartement.'
            }
          },
          {
            day: 4,
            title: {
              en: 'The Legendary Colors of Lake Assal',
              fr: 'Les Couleurs Légendaires du Lac Assal'
            },
            description: {
              en: 'After breakfast, we leave Djibouti city for Lake Assal which is one of the must-see sites in Djibouti. On the way, we\'ll first stop at the Dimbiya Canyon where we will discover a breathtaking panorama. Then we will descend to Lake Assal which is located 157 meters below sea level. Its salt content is one of the highest in the world: more than 300 grams of salt per liter of water. This place inspired the French writer-adventurer J. Kessel who described the « 3 color circles » of Lake Assal: the incomparable turquoise waters of the lake, are surrounded by the whiteness of the salt ice, itself surrounded by the ochres or black colors of the surrounding volcanic rocks and mountains. If you wish and provided that the spray is not too strong, you can swim and float on Lake Assal; plastic shoes are recommended to protect against sharp salt crystals. We will have lunch at a picnic at Goubet, in the shade of a straw hut facing Devil\'s Island, near the shark pit! Return and arrival in Djibouti in the late afternoon. Depending on the time of your return flight, after a good shower, meal at a restaurant in Djibouti, or direct transfer to the airport.',
              fr: 'Après le petit-déjeuner, nous quittons Djibouti ville pour le Lac Assal qui est l\'un des sites incontournables de Djibouti. En chemin, nous nous arrêterons d\'abord au canyon de Dimbiya où nous découvrirons un panorama à couper le souffle. Puis nous descendrons vers le Lac Assal qui se trouve à 157 mètres sous le niveau de la mer. Sa teneur en sel est l\'une des plus élevées du monde: plus de 300 grammes de sel par litre d\'eau. Ce lieu a inspiré l\'écrivain-aventurier français J. Kessel qui a décrit les « 3 cercles de couleur » du Lac Assal: les eaux turquoises incomparables du lac, sont entourées par la blancheur de la glace de sel, elle-même entourée par les couleurs ocre ou noires des roches et montagnes volcaniques environnantes. Si vous le souhaitez et à condition que la houle ne soit pas trop forte, vous pouvez nager et flotter sur le Lac Assal; des chaussures en plastique sont recommandées pour vous protéger des cristaux de sel coupants. Nous déjeunerons en pique-nique à Goubet, à l\'ombre d\'une case en paille face à l\'île du Diable, près de la fosse aux requins! Retour et arrivée à Djibouti en fin d\'après-midi. Selon l\'heure de votre vol de retour, après une bonne douche, repas au restaurant à Djibouti, ou transfert direct à l\'aéroport.'
            }
          }
        ],
        included: {
          en: [
            'Airport transfers',
            'Private vehicle with driver',
            'French/English-speaking guide',
            'Full board meals',
            '1.5 liters of water per day per person',
            'Accommodation: Lac Abbé camp (1 night), Guest House La Terrasse (2 nights)',
            'All site entrance fees',
            'Snorkeling equipment',
            'Government taxes'
          ],
          fr: [
            'Transferts aéroport',
            'Véhicule privé avec chauffeur',
            'Guide francophone/anglophone',
            'Pension complète',
            '1,5 litre d\'eau par jour par personne',
            'Hébergement: camp Lac Abbé (1 nuit), Guest House La Terrasse (2 nuits)',
            'Frais d\'entrée des sites',
            'Équipement de snorkeling',
            'Taxes gouvernementales'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Alcoholic beverages',
            'Medical repatriation insurance',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Boissons alcoolisées',
            'Assurance rapatriement médical',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable walking shoes',
            'Hiking shoes',
            'Swimsuit and towel',
            'Snorkeling equipment (if you have your own)',
            'Sun protection',
            'Camera',
            'Warm layers for evening',
            'Water bottle'
          ],
          fr: [
            'Chaussures de marche confortables',
            'Chaussures de randonnée',
            'Maillot de bain et serviette',
            'Équipement de snorkeling (si vous en avez)',
            'Protection solaire',
            'Appareil photo',
            'Vêtements chauds pour le soir',
            'Bouteille d\'eau'
          ]
        },
        accommodation: {
          en: 'Lac Abbé camp (1 night), Guest House La Terrasse (2 nights)',
          fr: 'Camp Lac Abbé (1 nuit), Guest House La Terrasse (2 nuits)'
        },
        transportation: {
          en: 'Private 4x4 with air conditioning',
          fr: '4x4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 14 days before the tour. 50% refund for cancellations within 7 days. No refund for no-shows.',
          fr: 'Annulation gratuite jusqu\'à 14 jours avant le circuit. Remboursement de 50 % pour les annulations dans les 7 jours. Aucun remboursement pour les non-présentations.'
        },
        faqs: [
          {
            question: {
              en: 'Is the Lac Abbé camp comfortable?',
              fr: 'Le camp du Lac Abbé est-il confortable ?'
            },
            answer: {
              en: 'The Lac Abbé camp is basic but clean, located a few hundred meters from the lake.',
              fr: 'Le camp du Lac Abbé est basique mais propre, situé à quelques centaines de mètres du lac.'
            }
          },
          {
            question: {
              en: 'Can we swim in Lac Assal?',
              fr: 'Peut-on nager dans le Lac Assal ?'
            },
            answer: {
              en: 'Yes, if conditions permit. Plastic shoes are recommended to protect against sharp salt crystals.',
              fr: 'Oui, si les conditions le permettent. Des chaussures en plastique sont recommandées pour se protéger des cristaux de sel coupants.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['adventure', 'desert', 'culture'],
        tags: ['Lac Abbé', 'Lac Assal', 'Djibouti City', 'Snorkeling'],
        metaTitle: {
          en: 'Djibouti, Lac Abbé & Lac Assal Tour | Djibouti Explorer',
          fr: 'Djibouti, Lac Abbé & Lac Assal | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 4-day tour exploring Djibouti City, Lac Abbé, and Lac Assal.',
          fr: 'Un circuit de 4 jours explorant Djibouti Ville, le Lac Abbé et le Lac Assal.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 3. Djibouti Animals Tour (5 Days / 4 Nights)
      // =========================================
      {
        title: {
          en: 'Djibouti Animals Tour',
          fr: 'Circuit Animaux de Djibouti'
        },
        slug: {
          en: 'djibouti-animals-tour',
          fr: 'circuit-animaux-djibouti'
        },
        shortDescription: {
          en: 'A 5-day wildlife tour exploring the DECAN animal refuge, Lac Abbé, Lac Assal, and the marine life of Ras Ali.',
          fr: 'Un circuit animalier de 5 jours explorant le refuge animalier DECAN, le Lac Abbé, le Lac Assal et la vie marine de Ras Ali.'
        },
        description: {
          en: 'This 5-day wildlife tour takes you through the diverse fauna of Djibouti. Visit the DECAN animal refuge, explore the lunar landscapes of Lac Abbé, swim in the legendary Lac Assal, and snorkel at Ras Ali. The tour combines wildlife observation, desert landscapes, and marine exploration for a complete experience.',
          fr: 'Ce circuit animalier de 5 jours vous emmène à travers la faune diversifiée de Djibouti. Visitez le refuge animalier DECAN, explorez les paysages lunaires du Lac Abbé, nagez dans le légendaire Lac Assal et faites du snorkeling à Ras Ali. Le circuit combine l\'observation de la faune, les paysages désertiques et l\'exploration marine pour une expérience complète.'
        },
        price: 650,
        depositAmount: 130,
        currency: 'USD',
        duration: 5,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 8,
        meetingPoint: {
          en: 'Djibouti Airport or your hotel in Djibouti City',
          fr: 'Aéroport de Djibouti ou votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/djibouti-animals-tour.jpg',
          gallery: []
        },
        destinations: ['Djibouti City', 'Lac Abbé', 'Lac Assal', 'Arta', 'Ras Ali'],
        highlights: {
          en: [
            'DECAN animal refuge visit',
            'Lunar landscapes of Lac Abbé',
            'Pink flamingos at Lac Abbé',
            'Snorkeling at Arta Beach',
            'Legendary salt flats of Lac Assal',
            'Snorkeling at Ras Ali'
          ],
          fr: [
            'Visite du refuge animalier DECAN',
            'Paysages lunaires du Lac Abbé',
            'Flamants roses au Lac Abbé',
            'Snorkeling à Arta Beach',
            'Légendaires plaines de sel du Lac Assal',
            'Snorkeling à Ras Ali'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti City Tour & DECAN Refuge',
              fr: 'Visite de Djibouti Ville & Refuge DECAN'
            },
            description: {
              en: 'After being welcomed at the airport and transferred to your accommodation, we visit « Place du 27 juin » (Ménélik) and « Place Mahmoud Harbi » (Rimbaud) where the very lively bus station of the capital is located. After lunch in a restaurant on Venise Road, we\'ll go to the fishing port and to the stopover, where people board the ferry to Tadjourah or Obock. Then depending on the day of your arrival, we will visit the animal shelter DECAN or we will walk in the shopping street of the « Caisses ». We\'ll have dinner at the restaurant « Chez Youssouf », where you will enjoy the specialty of Yemeni fish. Night at the Guest House La Terrasse or in our apartment in the Heron district.',
              fr: 'Après avoir été accueilli à l\'aéroport et transféré à votre hébergement, nous visitons la « Place du 27 juin » (Ménélik) et la « Place Mahmoud Harbi » (Rimbaud) où se trouve la très animée gare routière de la capitale. Après le déjeuner dans un restaurant de la rue de Venise, nous nous rendons au port de pêche et à l\'escale, où l\'on embarque pour le ferry vers Tadjourah ou Obock. Ensuite, selon le jour de votre arrivée, nous visiterons le refuge animalier DECAN ou nous nous promènerons dans la rue commerçante des « Caisses ». Nous dînerons au restaurant « Chez Youssouf », où vous dégusterez la spécialité de poisson yéménite. Nuit à la Guest House La Terrasse ou dans notre appartement du quartier du Héron.'
            }
          },
          {
            day: 2,
            title: {
              en: 'On the Lac Abbé Planet',
              fr: 'Sur la Planète Lac Abbé'
            },
            description: {
              en: 'Morning: Departure to Dikhil, first stage on the way to Lac Abbé. We will visit the palm grove before lunch at the restaurant at Dikhil. Afternoon: we will drive on 80 km of track, and we will cross the villages of As Eyla and Koutabouya. We will arrive at Lac Abbé to admire the sunset in the middle of the limestone chimneys. The lunar landscapes of Lac Abbé are very amazing, it is rumored that the 1968 film « Planet of the Apes » was filmed here. Some of these chimneys reach 50 meters in height, others let out fumaroles that smell of sulfur. Wetland, lac Abbé is also a place where nomadic children, every day, bring their herds to graze. We have dinner and spend the night at the Lac Abbé camp, located a few hundred meters from the lake.',
              fr: 'Matin: Départ pour Dikhil, première étape sur la route du Lac Abbé. Nous visiterons la palmeraie avant le déjeuner au restaurant de Dikhil. Après-midi: nous roulerons sur 80 km de piste, et nous traverserons les villages d\'As Eyla et Koutabouya. Nous arriverons au Lac Abbé pour admirer le coucher du soleil au milieu des cheminées de calcaire. Les paysages lunaires du Lac Abbé sont très étonnants, on raconte que le film « La Planète des Singes » de 1968 y a été tourné. Certaines de ces cheminées atteignent 50 mètres de hauteur, d\'autres laissent échapper des fumerolles à l\'odeur de soufre. Zone humide, le lac Abbé est aussi un lieu où les enfants nomades, chaque jour, amènent leurs troupeaux paître. Nous dînons et passons la nuit au camp du Lac Abbé, situé à quelques centaines de mètres du lac.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Pink Flamingos at Lac Abbé and Snorkeling at Arta Beach',
              fr: 'Flamants Roses au Lac Abbé et Snorkeling à Arta Beach'
            },
            description: {
              en: 'Very early in the morning, we witness the sunrise. After breakfast where we will enjoy the local galettes, we will approach the flamingos by the lake; then we\'ll walk among chimneys and hot springs. Then we will take the way back. About 40 km before arriving in Djibouti, we will leave the national road to take a track that leads us to Arta beach where we will have lunch in a straw hut. At this place the underwater fauna and flora are superb; you can enjoy them with a pair of fins, a mask, and a snorkel. We will return to Djibouti at the end of the afternoon. Evening meals at the restaurant and nights at the Guest House La Terrasse or in our apartment.',
              fr: 'Très tôt le matin, nous assistons au lever du soleil. Après le petit-déjeuner où nous dégusterons les galettes locales, nous nous approcherons des flamants au bord du lac; puis nous marcherons parmi les cheminées et les sources chaudes. Ensuite, nous prendrons le chemin du retour. À environ 40 km avant d\'arriver à Djibouti, nous quitterons la route nationale pour emprunter une piste qui nous mène à la plage d\'Arta où nous déjeunerons dans une case en paille. À cet endroit, la faune et la flore sous-marines sont superbes; vous pourrez en profiter avec une paire de palmes, un masque et un tuba. Nous rentrerons à Djibouti en fin d\'après-midi. Repas du soir au restaurant et nuits à la Guest House La Terrasse ou dans notre appartement.'
            }
          },
          {
            day: 4,
            title: {
              en: 'The Legendary Colors of Lake Assal & Ras Ali',
              fr: 'Les Couleurs Légendaires du Lac Assal & Ras Ali'
            },
            description: {
              en: 'After breakfast, we leave Djibouti city for Lake Assal. On the way, we\'ll stop at Dimbiya Canyon for a breathtaking panorama. Then we descend to Lake Assal (157 meters below sea level). Its salt content is one of the highest in the world. If conditions permit, you can swim and float on the lake. We will have lunch at a picnic at Goubet. Then we continue to Tadjourah and Ras Ali camp. We will walk on the lava field and step over the rift fault. At the end of the afternoon, we arrive at the Ras Ali camp located on the beach. We spend the night in a straw hut on the beach.',
              fr: 'Après le petit-déjeuner, nous quittons Djibouti ville pour le Lac Assal. En chemin, nous nous arrêtons au canyon de Dimbiya pour un panorama à couper le souffle. Puis nous descendons vers le Lac Assal (157 mètres sous le niveau de la mer). Sa teneur en sel est l\'une des plus élevées du monde. Si les conditions le permettent, vous pouvez nager et flotter sur le lac. Nous déjeunons en pique-nique à Goubet. Puis nous continuons vers Tadjourah et le camp de Ras Ali. Nous marcherons sur le champ de lave et enjamberons la faille du rift. En fin d\'après-midi, nous arrivons au camp de Ras Ali situé sur la plage. Nous passons la nuit dans une case en paille sur la plage.'
            }
          },
          {
            day: 5,
            title: {
              en: 'Snorkeling At Ras Ali & Return to Djibouti',
              fr: 'Snorkeling à Ras Ali & Retour à Djibouti'
            },
            description: {
              en: 'After enjoying the sunrise and having a good breakfast, we will indulge in snorkeling on the superb Ras-Ali drop-off where the underwater fauna and flora are wonderful! After lunch, we will take the way back to the city of Djibouti. If it circulates that day between Tadjourah and Djibouti, we\'ll take the Tadjourah-Djibouti ferry. We will arrive late afternoon in Djibouti early enough for airport transfer.',
              fr: 'Après avoir profité du lever du soleil et pris un bon petit-déjeuner, nous nous adonnerons au snorkeling sur le superbe tombant de Ras-Ali où la faune et la flore sous-marines sont merveilleuses! Après le déjeuner, nous prendrons le chemin du retour vers la ville de Djibouti. Si elle circule ce jour-là entre Tadjourah et Djibouti, nous prendrons le ferry Tadjourah-Djibouti. Nous arriverons en fin d\'après-midi à Djibouti, assez tôt pour le transfert à l\'aéroport.'
            }
          }
        ],
        included: {
          en: [
            'Airport transfers',
            'Private vehicle with driver',
            'French/English-speaking guide',
            'Full board meals',
            '1.5 liters of water per day per person',
            'Accommodation: Lac Abbé camp (1 night), Guest House La Terrasse (2 nights), Ras Ali camp (1 night)',
            'All site entrance fees',
            'Snorkeling equipment',
            'Ferry transfer where applicable',
            'Government taxes'
          ],
          fr: [
            'Transferts aéroport',
            'Véhicule privé avec chauffeur',
            'Guide francophone/anglophone',
            'Pension complète',
            '1,5 litre d\'eau par jour par personne',
            'Hébergement: camp Lac Abbé (1 nuit), Guest House La Terrasse (2 nuits), camp Ras Ali (1 nuit)',
            'Frais d\'entrée des sites',
            'Équipement de snorkeling',
            'Transfert en ferry le cas échéant',
            'Taxes gouvernementales'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Alcoholic beverages',
            'Medical repatriation insurance',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Boissons alcoolisées',
            'Assurance rapatriement médical',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable walking shoes',
            'Hiking shoes',
            'Swimsuit and towel',
            'Snorkeling equipment (if you have your own)',
            'Sun protection',
            'Camera',
            'Warm layers for evening',
            'Water bottle'
          ],
          fr: [
            'Chaussures de marche confortables',
            'Chaussures de randonnée',
            'Maillot de bain et serviette',
            'Équipement de snorkeling (si vous en avez)',
            'Protection solaire',
            'Appareil photo',
            'Vêtements chauds pour le soir',
            'Bouteille d\'eau'
          ]
        },
        accommodation: {
          en: 'Lac Abbé camp (1 night), Guest House La Terrasse (2 nights), Ras Ali camp (1 night)',
          fr: 'Camp Lac Abbé (1 nuit), Guest House La Terrasse (2 nuits), camp Ras Ali (1 nuit)'
        },
        transportation: {
          en: 'Private 4x4 with air conditioning, ferry where applicable',
          fr: '4x4 privé avec climatisation, ferry le cas échéant'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 14 days before the tour. 50% refund for cancellations within 7 days. No refund for no-shows.',
          fr: 'Annulation gratuite jusqu\'à 14 jours avant le circuit. Remboursement de 50 % pour les annulations dans les 7 jours. Aucun remboursement pour les non-présentations.'
        },
        faqs: [
          {
            question: {
              en: 'What animals can we see at DECAN?',
              fr: 'Quels animaux peut-on voir au DECAN ?'
            },
            answer: {
              en: 'The DECAN refuge houses animals from Djibouti and other parts of Africa, including various mammal and bird species.',
              fr: 'Le refuge DECAN abrite des animaux de Djibouti et d\'autres régions d\'Afrique, comprenant diverses espèces de mammifères et d\'oiseaux.'
            }
          },
          {
            question: {
              en: 'Is snorkeling at Ras Ali good?',
              fr: 'Le snorkeling à Ras Ali est-il bon ?'
            },
            answer: {
              en: 'Yes, Ras Ali is known for its superb drop-off with wonderful underwater fauna and flora.',
              fr: 'Oui, Ras Ali est connu pour son superbe tombant avec une merveilleuse faune et flore sous-marines.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['wildlife', 'adventure', 'marine'],
        tags: ['DECAN', 'Animals', 'Lac Abbé', 'Lac Assal', 'Ras Ali'],
        metaTitle: {
          en: 'Djibouti Animals Tour | Djibouti Explorer',
          fr: 'Circuit Animaux de Djibouti | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 5-day wildlife tour exploring the DECAN animal refuge, Lac Abbé, Lac Assal, and Ras Ali.',
          fr: 'Un circuit animalier de 5 jours explorant le refuge animalier DECAN, le Lac Abbé, le Lac Assal et Ras Ali.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 4. Beach And Mountain Tour (7 Days / 6 Nights)
      // =========================================
      {
        title: {
          en: 'Beach & Mountain Tour',
          fr: 'Circuit Plage & Montagne'
        },
        slug: {
          en: 'beach-mountain-tour',
          fr: 'circuit-plage-montagne'
        },
        shortDescription: {
          en: 'A 7-day tour combining the best of Djibouti\'s beaches and mountains, from Lac Abbé to Ras Ali and the Goda Mountains.',
          fr: 'Un circuit de 7 jours combinant le meilleur des plages et des montagnes de Djibouti, du Lac Abbé à Ras Ali et les Monts Goda.'
        },
        description: {
          en: 'This 7-day tour offers the perfect balance between beach relaxation and mountain exploration. Visit the lunar landscapes of Lac Abbé, swim in the legendary Lac Assal, enjoy snorkeling at Ras Ali and Maskali Island, and explore the Goda Mountains with its lush forests and traditional villages.',
          fr: 'Ce circuit de 7 jours offre l\'équilibre parfait entre détente à la plage et exploration montagnarde. Visitez les paysages lunaires du Lac Abbé, nagez dans le légendaire Lac Assal, profitez du snorkeling à Ras Ali et à l\'île Maskali, et explorez les Monts Goda avec ses forêts luxuriantes et ses villages traditionnels.'
        },
        price: 850,
        depositAmount: 170,
        currency: 'USD',
        duration: 7,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 8,
        meetingPoint: {
          en: 'Djibouti Airport or your hotel in Djibouti City',
          fr: 'Aéroport de Djibouti ou votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/beach-mountain-tour.jpg',
          gallery: []
        },
        destinations: ['Djibouti City', 'Lac Abbé', 'Lac Assal', 'Ras Ali', 'Maskali Island', 'Goda Mountains'],
        highlights: {
          en: [
            'Djibouti City cultural tour',
            'Lac Abbé lunar landscapes',
            'Lac Assal salt flats',
            'Ras Ali snorkeling',
            'Maskali Island escape',
            'Goda Mountains trekking',
            'Traditional village visits'
          ],
          fr: [
            'Visite culturelle de Djibouti Ville',
            'Paysages lunaires du Lac Abbé',
            'Plaines de sel du Lac Assal',
            'Snorkeling à Ras Ali',
            'Escapade à l\'île Maskali',
            'Randonnée dans les Monts Goda',
            'Visites de villages traditionnels'
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
              en: 'After being welcomed at the airport and transferred to your accommodation, we visit Ménélik and Mahmoud Harbi where the very lively bus station of the capital is located. After lunch in a restaurant on Venise Road, we\'ll go to the fishing port and to the stopover, where people board the ferry to Tadjourah or Obock. Then depending on the day of your arrival, we will visit the animal shelter DECAN or we will walk in the shopping street of the « Caisses ». We\'ll have dinner at the restaurant « Chez Youssouf », where you will enjoy the specialty of Yemeni fish. Night at the Guest House La Terrasse or in our apartment in the Heron district.',
              fr: 'Après avoir été accueilli à l\'aéroport et transféré à votre hébergement, nous visitons Ménélik et Mahmoud Harbi où se trouve la très animée gare routière de la capitale. Après le déjeuner dans un restaurant de la rue de Venise, nous nous rendons au port de pêche et à l\'escale, où l\'on embarque pour le ferry vers Tadjourah ou Obock. Ensuite, selon le jour de votre arrivée, nous visiterons le refuge animalier DECAN ou nous nous promènerons dans la rue commerçante des « Caisses ». Nous dînerons au restaurant « Chez Youssouf », où vous dégusterez la spécialité de poisson yéménite. Nuit à la Guest House La Terrasse ou dans notre appartement du quartier du Héron.'
            }
          },
          {
            day: 2,
            title: {
              en: 'On the Lac Abbé Planet',
              fr: 'Sur la Planète Lac Abbé'
            },
            description: {
              en: 'Morning: Departure to Dikhil, the first stage on the way to Lac Abbé. We will visit the palm grove before lunch at the restaurant at Dikhil. Afternoon: we will drive on 80 km of track, and we will cross the villages of As Eyla and Koutabouya. We will arrive at Lac Abbé to admire the sunset in the middle of the limestone chimneys. The lunar landscapes of Lac Abbé are very amazing, it is rumored that the 1968 film « Planet of the Apes » was filmed here. Some of these chimneys reach 50 meters in height, others let out fumaroles that smell of sulfur. Wetland, lac Abbé is also a place where nomadic children, every day, bring their herds to graze. We have dinner and spend the night at the Lac Abbé camp, located a few hundred meters from the lake.',
              fr: 'Matin: Départ pour Dikhil, la première étape sur la route du Lac Abbé. Nous visiterons la palmeraie avant le déjeuner au restaurant de Dikhil. Après-midi: nous roulerons sur 80 km de piste, et nous traverserons les villages d\'As Eyla et Koutabouya. Nous arriverons au Lac Abbé pour admirer le coucher du soleil au milieu des cheminées de calcaire. Les paysages lunaires du Lac Abbé sont très étonnants, on raconte que le film « La Planète des Singes » de 1968 y a été tourné. Certaines de ces cheminées atteignent 50 mètres de hauteur, d\'autres laissent échapper des fumerolles à l\'odeur de soufre. Zone humide, le lac Abbé est aussi un lieu où les enfants nomades, chaque jour, amènent leurs troupeaux paître. Nous dînons et passons la nuit au camp du Lac Abbé, situé à quelques centaines de mètres du lac.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Pink Flamingos at Lac Abbé and Snorkeling at Arta Beach',
              fr: 'Flamants Roses au Lac Abbé et Snorkeling à Arta Beach'
            },
            description: {
              en: 'Very early in the morning, we witness the sunrise. After breakfast where we will enjoy the local galettes, we will approach the flamingos by the lake; then we\'ll walk among chimneys and hot springs. Then we will take the way back. About 40 km before arriving in Djibouti, we will leave the national road to take a track that leads us to Arta beach where we will have lunch in a straw hut. At this place the underwater fauna and flora are superb; you can enjoy them with a pair of fins, a mask, and a snorkel. We will arrive in Djibouti at the end of the afternoon. Evening meals at the restaurant and nights at the Guest House La Terrasse or in our apartment.',
              fr: 'Très tôt le matin, nous assistons au lever du soleil. Après le petit-déjeuner où nous dégusterons les galettes locales, nous nous approcherons des flamants au bord du lac; puis nous marcherons parmi les cheminées et les sources chaudes. Ensuite, nous prendrons le chemin du retour. À environ 40 km avant d\'arriver à Djibouti, nous quitterons la route nationale pour emprunter une piste qui nous mène à la plage d\'Arta où nous déjeunerons dans une case en paille. À cet endroit, la faune et la flore sous-marines sont superbes; vous pourrez en profiter avec une paire de palmes, un masque et un tuba. Nous arriverons à Djibouti en fin d\'après-midi. Repas du soir au restaurant et nuits à la Guest House La Terrasse ou dans notre appartement.'
            }
          },
          {
            day: 4,
            title: {
              en: 'The Legendary Colors of Lake Assal & Ras Ali',
              fr: 'Les Couleurs Légendaires du Lac Assal & Ras Ali'
            },
            description: {
              en: 'After breakfast, we leave Djibouti city for Lake Assal. On the way, we\'ll stop at Dimbiya Canyon for a breathtaking panorama. Then we descend to Lake Assal (157 meters below sea level). Its salt content is one of the highest in the world. If conditions permit, you can swim and float on the lake. We will have lunch at a picnic at Goubet. Then we continue to Tadjourah and Ras Ali camp. We will walk on the lava field and step over the rift fault. At the end of the afternoon, we arrive at the Ras Ali camp located on the beach. We spend the night in a straw hut on the beach.',
              fr: 'Après le petit-déjeuner, nous quittons Djibouti ville pour le Lac Assal. En chemin, nous nous arrêtons au canyon de Dimbiya pour un panorama à couper le souffle. Puis nous descendons vers le Lac Assal (157 mètres sous le niveau de la mer). Sa teneur en sel est l\'une des plus élevées du monde. Si les conditions le permettent, vous pouvez nager et flotter sur le lac. Nous déjeunons en pique-nique à Goubet. Puis nous continuons vers Tadjourah et le camp de Ras Ali. Nous marcherons sur le champ de lave et enjamberons la faille du rift. En fin d\'après-midi, nous arrivons au camp de Ras Ali situé sur la plage. Nous passons la nuit dans une case en paille sur la plage.'
            }
          },
          {
            day: 5,
            title: {
              en: 'Snorkeling At Ras Ali & Bankoualé Camp',
              fr: 'Snorkeling à Ras Ali & Camp de Bankoualé'
            },
            description: {
              en: 'After enjoying the sunrise and having a good breakfast, we will indulge in snorkeling on the superb Ras-Ali drop-off where the underwater fauna and flora are wonderful! After lunch, we take the road to the Bankoualé camp in the Goda mountains. We will take a short but difficult and pretty track in a green environment. The Bankoualé camp is a very pleasant place, overlooking the wadi that we will take to get there. Evening meal and night at the camp.',
              fr: 'Après avoir profité du lever du soleil et pris un bon petit-déjeuner, nous nous adonnerons au snorkeling sur le superbe tombant de Ras-Ali où la faune et la flore sous-marines sont merveilleuses! Après le déjeuner, nous prenons la route vers le camp de Bankoualé dans les monts Goda. Nous emprunterons une piste courte mais difficile et jolie dans un environnement verdoyant. Le camp de Bankoualé est un endroit très agréable, surplombant l\'oued que nous emprunterons pour y arriver. Repas du soir et nuit au camp.'
            }
          },
          {
            day: 6,
            title: {
              en: 'Visit the Village of Ardo and the Gardens',
              fr: 'Visite du Village d\'Ardo et des Jardins'
            },
            description: {
              en: 'In the morning: we will visit the gardens laid out along the wadi and irrigated thanks to installations capturing and directing water from a source upstream. Then we will visit the village of Ardo and if it is not a public holiday we will visit the school children and their teachers. After lunch at the camp, we will return to Djibouti by road. We\'ll can also choose to eat at noon in Tadjourah to take the ferry if we have a Tadjourah / Djibouti connection that day. Evening meal at the restaurant in Djibouti and night at the Guest House La Terrasse or in our apartment.',
              fr: 'Le matin: nous visiterons les jardins aménagés le long de l\'oued et irrigués grâce à des installations captant et dirigeant l\'eau d\'une source en amont. Puis nous visiterons le village d\'Ardo et si ce n\'est pas un jour férié, nous rendrons visite aux écoliers et à leurs enseignants. Après le déjeuner au camp, nous regagnerons Djibouti par la route. Nous pourrons également choisir de déjeuner à Tadjourah pour prendre le ferry si nous avons une liaison Tadjourah/Djibouti ce jour-là. Repas du soir au restaurant à Djibouti et nuit à la Guest House La Terrasse ou dans notre appartement.'
            }
          },
          {
            day: 7,
            title: {
              en: 'At the Island of Maskali',
              fr: 'À l\'Île de Maskali'
            },
            description: {
              en: 'After breakfast, we leave by boat for Isle Maskali. The day is devoted to rest and snorkeling. The underwater fauna and flora are not as rich as in Arta or Ras Ali, but you will appreciate the fine sandy beach and the clear water. We will have lunch in the shade of a "faré". We will return at the end of the afternoon to organize your transfer to the airport.',
              fr: 'Après le petit-déjeuner, nous partons en bateau pour l\'île Maskali. La journée est consacrée au repos et au snorkeling. La faune et la flore sous-marines ne sont pas aussi riches qu\'à Arta ou Ras Ali, mais vous apprécierez la plage de sable fin et l\'eau claire. Nous déjeunerons à l\'ombre d\'un « faré ». Nous reviendrons en fin d\'après-midi pour organiser votre transfert à l\'aéroport.'
            }
          }
        ],
        included: {
          en: [
            'Airport transfers',
            'Private vehicle with driver',
            'French/English-speaking guide',
            'Full board meals',
            '1.5 liters of water per day per person',
            'Accommodation: Lac Abbé camp (1 night), Guest House La Terrasse (2 nights), Ras Ali camp (1 night), Bankoualé camp (1 night)',
            'All site entrance fees',
            'Snorkeling equipment',
            'Ferry transfer where applicable',
            'Government taxes'
          ],
          fr: [
            'Transferts aéroport',
            'Véhicule privé avec chauffeur',
            'Guide francophone/anglophone',
            'Pension complète',
            '1,5 litre d\'eau par jour par personne',
            'Hébergement: camp Lac Abbé (1 nuit), Guest House La Terrasse (2 nuits), camp Ras Ali (1 nuit), camp Bankoualé (1 nuit)',
            'Frais d\'entrée des sites',
            'Équipement de snorkeling',
            'Transfert en ferry le cas échéant',
            'Taxes gouvernementales'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Alcoholic beverages',
            'Medical repatriation insurance',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Boissons alcoolisées',
            'Assurance rapatriement médical',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable walking shoes',
            'Hiking shoes',
            'Swimsuit and towel',
            'Snorkeling equipment (if you have your own)',
            'Sun protection',
            'Camera',
            'Warm layers for mountain nights',
            'Water bottle'
          ],
          fr: [
            'Chaussures de marche confortables',
            'Chaussures de randonnée',
            'Maillot de bain et serviette',
            'Équipement de snorkeling (si vous en avez)',
            'Protection solaire',
            'Appareil photo',
            'Vêtements chauds pour les nuits en montagne',
            'Bouteille d\'eau'
          ]
        },
        accommodation: {
          en: 'Lac Abbé camp (1 night), Guest House La Terrasse (2 nights), Ras Ali camp (1 night), Bankoualé camp (1 night)',
          fr: 'Camp Lac Abbé (1 nuit), Guest House La Terrasse (2 nuits), camp Ras Ali (1 nuit), camp Bankoualé (1 nuit)'
        },
        transportation: {
          en: 'Private 4x4 with air conditioning, ferry where applicable',
          fr: '4x4 privé avec climatisation, ferry le cas échéant'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 14 days before the tour. 50% refund for cancellations within 7 days. No refund for no-shows.',
          fr: 'Annulation gratuite jusqu\'à 14 jours avant le circuit. Remboursement de 50 % pour les annulations dans les 7 jours. Aucun remboursement pour les non-présentations.'
        },
        faqs: [
          {
            question: {
              en: 'Is the Bankoualé camp comfortable?',
              fr: 'Le camp de Bankoualé est-il confortable ?'
            },
            answer: {
              en: 'Yes, Bankoualé camp is a very pleasant place overlooking the wadi, offering a unique mountain experience.',
              fr: 'Oui, le camp de Bankoualé est un endroit très agréable surplombant l\'oued, offrant une expérience montagnarde unique.'
            }
          },
          {
            question: {
              en: 'What is Maskali Island like?',
              fr: 'À quoi ressemble l\'île Maskali ?'
            },
            answer: {
              en: 'Maskali Island offers a fine sandy beach, clear water, and is perfect for relaxation and snorkeling.',
              fr: 'L\'île Maskali offre une plage de sable fin, une eau claire, et est parfaite pour la détente et le snorkeling.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['beach', 'mountain', 'adventure'],
        tags: ['Lac Abbé', 'Lac Assal', 'Ras Ali', 'Maskali', 'Goda Mountains'],
        metaTitle: {
          en: 'Beach & Mountain Tour | Djibouti Explorer',
          fr: 'Circuit Plage & Montagne | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 7-day tour combining the best of Djibouti\'s beaches and mountains.',
          fr: 'Un circuit de 7 jours combinant le meilleur des plages et des montagnes de Djibouti.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 5. Allols Tour (6 Days / 5 Nights)
      // =========================================
      {
        title: {
          en: 'Allols Discovery Tour',
          fr: 'Circuit Découverte des Allols'
        },
        slug: {
          en: 'allols-discovery-tour',
          fr: 'circuit-decouverte-allols'
        },
        shortDescription: {
          en: 'A 6-day tour to the remote and amazing Allols, one of Djibouti\'s most hidden gems.',
          fr: 'Un circuit de 6 jours vers les Allols, l\'un des joyaux les plus cachés de Djibouti.'
        },
        description: {
          en: 'The Allols are one of the most amazing places in Djibouti, and very few people visit them because they are quite remote. This 6-day tour takes you to this hidden paradise with its unique landscapes, wildlife, and cultural encounters. The tour includes visits to DECAN refuge, Lake Assal, Tadjourah, and the Allols region with its stunning scenery and traditional villages.',
          fr: 'Les Allols sont l\'un des endroits les plus étonnants de Djibouti, et très peu de personnes les visitent car ils sont assez éloignés. Ce circuit de 6 jours vous emmène dans ce paradis caché avec ses paysages uniques, sa faune et ses rencontres culturelles. Le circuit comprend des visites du refuge DECAN, du Lac Assal, de Tadjourah et de la région des Allols avec ses paysages époustouflants et ses villages traditionnels.'
        },
        price: 750,
        depositAmount: 150,
        currency: 'USD',
        duration: 6,
        maxGroupSize: 8,
        difficulty: 'moderate',
        minAge: 10,
        meetingPoint: {
          en: 'Djibouti Airport or your hotel in Djibouti City',
          fr: 'Aéroport de Djibouti ou votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/allols-tour.jpg',
          gallery: []
        },
        destinations: ['Djibouti City', 'DECAN', 'Lac Assal', 'Tadjourah', 'Allols', 'Ras Ali'],
        highlights: {
          en: [
            'DECAN animal refuge visit',
            'Legendary Lake Assal',
            'Tadjourah White City',
            'Remote Allols region',
            'Ras Ali snorkeling',
            'Traditional village encounters',
            'Unique landscapes and wildlife'
          ],
          fr: [
            'Visite du refuge animalier DECAN',
            'Légendaire Lac Assal',
            'Ville Blanche de Tadjourah',
            'Région isolée des Allols',
            'Snorkeling à Ras Ali',
            'Rencontres avec les villages traditionnels',
            'Paysages et faune uniques'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Visit the DECAN Refuge',
              fr: 'Visite du Refuge DECAN'
            },
            description: {
              en: 'Arrival Djibouti City – Transfer from the airport to your accommodation. Our local agency puts a comfortable and air-conditioned apartment at your disposal to spend the night there and have breakfast prepared according to your wishes. Lunch at the restaurant at the port of Djibouti. Afternoon: visit the DECAN refuge. This is an animal park near Djibouti, where animals from Djibouti and also from other parts of Africa live. Evening meal: restaurant in Djibouti. Night: in our apartment or hotel.',
              fr: 'Arrivée Djibouti Ville – Transfert de l\'aéroport à votre hébergement. Notre agence locale met à votre disposition un appartement confortable et climatisé pour y passer la nuit et prendre un petit-déjeuner préparé selon vos souhaits. Déjeuner au restaurant du port de Djibouti. Après-midi: visite du refuge DECAN. Il s\'agit d\'un parc animalier près de Djibouti, où vivent des animaux de Djibouti et d\'autres régions d\'Afrique. Repas du soir: restaurant à Djibouti. Nuit: dans notre appartement ou à l\'hôtel.'
            }
          },
          {
            day: 2,
            title: {
              en: 'From Djibouti to Tadjourah via Lake Assal',
              fr: 'De Djibouti à Tadjourah via le Lac Assal'
            },
            description: {
              en: 'Morning: departure from Djibouti early in the morning. About forty km before reaching Lake Assal, we will stop to admire the grandiose landscape of the Dimbiya Canyon nicknamed the "Grand Canyon of Djibouti". Located 153 meters below sea level, Lake Assal is one of the saltiest in the world (more than 300 grams of salt per liter of water). If the weather is right, we can swim there; plastic shoes are necessary to avoid injury from the sharp salt crystals. Lunch: picnic on the beach at Goubet. Afternoon: we will visit the lava field located between Assal and Goubet, where we will observe the fault of the rift. Evening meal and night at Hotel Golfe in Tadjourah.',
              fr: 'Matin: départ de Djibouti tôt le matin. Environ quarante kilomètres avant d\'atteindre le Lac Assal, nous nous arrêterons pour admirer le paysage grandiose du canyon de Dimbiya surnommé le « Grand Canyon de Djibouti ». Situé à 153 mètres sous le niveau de la mer, le Lac Assal est l\'un des plus salés du monde (plus de 300 grammes de sel par litre d\'eau). Si le temps le permet, nous pouvons nous y baigner; des chaussures en plastique sont nécessaires pour éviter les blessures causées par les cristaux de sel coupants. Déjeuner: pique-nique sur la plage de Goubet. Après-midi: nous visiterons le champ de lave situé entre Assal et Goubet, où nous observerons la faille du rift. Repas du soir et nuit à l\'Hôtel Golfe à Tadjourah.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Departure for Les Allols',
              fr: 'Départ pour Les Allols'
            },
            description: {
              en: 'Morning: Visit the city of Tadjourah then departure to Bolli. Lunch with Daoud\'s family in Bolli. Afternoon: Journey to Allols or departure from Daffeynaytou if Allols authorization is not obtained. Bivouac in Les Allols or night in Daffeynaytou.',
              fr: 'Matin: Visite de la ville de Tadjourah puis départ pour Bolli. Déjeuner avec la famille de Daoud à Bolli. Après-midi: Route vers les Allols ou départ de Daffeynaytou si l\'autorisation pour les Allols n\'est pas obtenue. Bivouac aux Allols ou nuit à Daffeynaytou.'
            }
          },
          {
            day: 4,
            title: {
              en: 'From Allols to the Ras Ali Camp by the Sea',
              fr: 'Des Allols au Camp de Ras Ali au Bord de la Mer'
            },
            description: {
              en: 'Morning: Hike to Les Allols or visit the gardens and engravings around Daffeynaytou. Lunch at Randa or at the Bolli Soublah camp. Afternoon: Visit Randa. Evening meal and overnight at Ras Ali camp.',
              fr: 'Matin: Randonnée aux Allols ou visite des jardins et gravures autour de Daffeynaytou. Déjeuner à Randa ou au camp de Bolli Soublah. Après-midi: Visite de Randa. Repas du soir et nuit au camp de Ras Ali.'
            }
          },
          {
            day: 5,
            title: {
              en: 'Snorkeling in Ras Ali and Back to Djibouti',
              fr: 'Snorkeling à Ras Ali et Retour à Djibouti'
            },
            description: {
              en: 'Morning: snorkeling on the superb Ras Ali drop-off. Lunch at Ras Ali camp. Afternoon: A return trip to Djibouti by road or by ferry depending on the day. Evening meal at the restaurant in Djibouti. Night at the hotel in Djibouti or in the apartment of our agency.',
              fr: 'Matin: snorkeling sur le superbe tombant de Ras Ali. Déjeuner au camp de Ras Ali. Après-midi: Retour à Djibouti par la route ou en ferry selon le jour. Repas du soir au restaurant à Djibouti. Nuit à l\'hôtel à Djibouti ou dans l\'appartement de notre agence.'
            }
          },
          {
            day: 6,
            title: {
              en: 'Relaxing Day in Korambado',
              fr: 'Journée de Détente à Korambado'
            },
            description: {
              en: 'Snorkeling on the program for this day. Lunch in a hut on the beach. You need a good 4x4 vehicle to get down to Korambado. Not far from Djibouti, the site is interesting for the practice of snorkeling (east side). A few "local color" huts, installed by the sea, provide the shade and the meal necessary to spend a very pleasant day there. Evening meal at the restaurant in Djibouti. On the menu Yemeni fish, the fish that you choose yourself, is cut into two slices and placed in a circular oven. Evening transfer to Djibouti airport.',
              fr: 'Snorkeling au programme pour cette journée. Déjeuner dans une case sur la plage. Il faut un bon véhicule 4x4 pour descendre à Korambado. Non loin de Djibouti, le site est intéressant pour la pratique du snorkeling (côté est). Quelques cases « couleur locale », installées au bord de la mer, procurent l\'ombre et le repas nécessaires pour y passer une journée très agréable. Repas du soir au restaurant à Djibouti. Au menu le poisson yéménite, le poisson que vous choisissez vous-même, est coupé en deux tranches et placé dans un four circulaire. Transfert en soirée à l\'aéroport de Djibouti.'
            }
          }
        ],
        included: {
          en: [
            'Airport transfers',
            'Private vehicle with driver',
            'French/English-speaking guide',
            'Full board meals',
            '1.5 liters of water per day per person',
            'Accommodation: DECAN (1 night), Tadjourah hotel (1 night), Allols camp (1 night), Ras Ali camp (1 night), Djibouti apartment (1 night)',
            'All site entrance fees',
            'Snorkeling equipment',
            'Ferry transfer where applicable',
            'Government taxes'
          ],
          fr: [
            'Transferts aéroport',
            'Véhicule privé avec chauffeur',
            'Guide francophone/anglophone',
            'Pension complète',
            '1,5 litre d\'eau par jour par personne',
            'Hébergement: DECAN (1 nuit), hôtel Tadjourah (1 nuit), camp Allols (1 nuit), camp Ras Ali (1 nuit), appartement Djibouti (1 nuit)',
            'Frais d\'entrée des sites',
            'Équipement de snorkeling',
            'Transfert en ferry le cas échéant',
            'Taxes gouvernementales'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Alcoholic beverages',
            'Medical repatriation insurance',
            'Tips'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Boissons alcoolisées',
            'Assurance rapatriement médical',
            'Pourboires'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable walking shoes',
            'Hiking shoes',
            'Swimsuit and towel',
            'Snorkeling equipment (if you have your own)',
            'Sun protection',
            'Camera',
            'Warm layers for evening',
            'Water bottle'
          ],
          fr: [
            'Chaussures de marche confortables',
            'Chaussures de randonnée',
            'Maillot de bain et serviette',
            'Équipement de snorkeling (si vous en avez)',
            'Protection solaire',
            'Appareil photo',
            'Vêtements chauds pour le soir',
            'Bouteille d\'eau'
          ]
        },
        accommodation: {
          en: 'DECAN refuge (1 night), Tadjourah hotel (1 night), Allols camp (1 night), Ras Ali camp (1 night), Djibouti apartment (1 night)',
          fr: 'Refuge DECAN (1 nuit), hôtel Tadjourah (1 nuit), camp Allols (1 nuit), camp Ras Ali (1 nuit), appartement Djibouti (1 nuit)'
        },
        transportation: {
          en: 'Private 4x4 with air conditioning, ferry where applicable',
          fr: '4x4 privé avec climatisation, ferry le cas échéant'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 14 days before the tour. 50% refund for cancellations within 7 days. No refund for no-shows.',
          fr: 'Annulation gratuite jusqu\'à 14 jours avant le circuit. Remboursement de 50 % pour les annulations dans les 7 jours. Aucun remboursement pour les non-présentations.'
        },
        faqs: [
          {
            question: {
              en: 'What are the Allols?',
              fr: 'Que sont les Allols ?'
            },
            answer: {
              en: 'The Allols are one of the most amazing and remote places in Djibouti, known for their unique landscapes and traditional villages.',
              fr: 'Les Allols sont l\'un des endroits les plus étonnants et isolés de Djibouti, connus pour leurs paysages uniques et leurs villages traditionnels.'
            }
          },
          {
            question: {
              en: 'Is the Allols tour always available?',
              fr: 'Le circuit des Allols est-il toujours disponible ?'
            },
            answer: {
              en: 'The Allols tour requires special authorization. If not obtained, the visit will be replaced by Daffeynaytou.',
              fr: 'Le circuit des Allols nécessite une autorisation spéciale. Si elle n\'est pas obtenue, la visite sera remplacée par Daffeynaytou.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
        categories: ['nature', 'adventure', 'culture'],
        tags: ['Allols', 'DECAN', 'Tadjourah', 'Ras Ali'],
        metaTitle: {
          en: 'Allols Discovery Tour | Djibouti Explorer',
          fr: 'Circuit Découverte des Allols | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 6-day tour to the remote and amazing Allols, one of Djibouti\'s most hidden gems.',
          fr: 'Un circuit de 6 jours vers les Allols, l\'un des joyaux les plus cachés de Djibouti.'
        },
        rating: 0,
        reviewCount: 0,
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // =========================================
      // 6. Sea Mountain And Hiking Tour (12 Days / 11 Nights)
      // =========================================
      {
        title: {
          en: 'Sea, Mountain & Hiking Grand Tour',
          fr: 'Grand Tour Mer, Montagne & Randonnée'
        },
        slug: {
          en: 'sea-mountain-hiking-grand-tour',
          fr: 'grand-tour-mer-montagne-randonnee'
        },
        shortDescription: {
          en: 'A 12-day grand tour combining sea, mountain, and hiking experiences across the best of Djibouti.',
          fr: 'Un grand tour de 12 jours combinant mer, montagne et randonnée à travers le meilleur de Djibouti.'
        },
        description: {
          en: 'This 12-day grand tour offers the ultimate Djibouti experience. From the DECAN animal refuge and Arta beach to the legendary Lac Assal and Lac Abbé, from the Goda Mountains hiking trails to the remote Allols and the islands of Moucha and Maskali, this comprehensive tour covers all the highlights of Djibouti. Perfect for adventurous travelers seeking a complete immersion in the country\'s diverse landscapes, cultures, and wildlife.',
          fr: 'Ce grand tour de 12 jours offre l\'expérience ultime de Djibouti. Du refuge animalier DECAN et de la plage d\'Arta au légendaire Lac Assal et au Lac Abbé, des sentiers de randonnée des Monts Goda aux Allols isolés et aux îles Moucha et Maskali, ce circuit complet couvre tous les points forts de Djibouti. Parfait pour les voyageurs aventureux en quête d\'une immersion complète dans la diversité des paysages, des cultures et de la faune du pays.'
        },
        price: 1200,
        depositAmount: 240,
        currency: 'USD',
        duration: 12,
        maxGroupSize: 8,
        difficulty: 'challenging',
        minAge: 12,
        meetingPoint: {
          en: 'Djibouti Airport or your hotel in Djibouti City',
          fr: 'Aéroport de Djibouti ou votre hôtel à Djibouti Ville'
        },
        images: {
          primary: '/images/tours/sea-mountain-hiking-grand-tour.jpg',
          gallery: []
        },
        destinations: ['Djibouti City', 'DECAN', 'Lac Assal', 'Lac Abbé', 'Goda Mountains', 'Allols', 'Moucha Island', 'Maskali Island'],
        highlights: {
          en: [
            'DECAN animal refuge visit',
            'Snorkeling at Arta Beach',
            'Legendary Lake Assal',
            'Lac Abbé lunar landscapes',
            'Goda Mountains hiking',
            'Remote Allols region',
            'Moucha and Maskali Islands',
            'Traditional village encounters'
          ],
          fr: [
            'Visite du refuge animalier DECAN',
            'Snorkeling à Arta Beach',
            'Légendaire Lac Assal',
            'Paysages lunaires du Lac Abbé',
            'Randonnée dans les Monts Goda',
            'Région isolée des Allols',
            'Îles Moucha et Maskali',
            'Rencontres avec les villages traditionnels'
          ]
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Visit to the DECAN Refuge & City Tour',
              fr: 'Visite du Refuge DECAN & Tour de la Ville'
            },
            description: {
              en: 'Arrival in Djibouti – transfer from the airport to your accommodation. Lunch at the port restaurant in Djibouti. Afternoon: visit to the DECAN refuge, a wildlife park near Djibouti housing animals native to Djibouti and other regions of Africa. Tour of the city of Djibouti. Dinner at a restaurant. Night in our apartment or hotel.',
              fr: 'Arrivée à Djibouti – transfert de l\'aéroport à votre hébergement. Déjeuner au restaurant du port de Djibouti. Après-midi: visite du refuge DECAN, un parc animalier près de Djibouti abritant des animaux originaires de Djibouti et d\'autres régions d\'Afrique. Tour de la ville de Djibouti. Dîner au restaurant. Nuit dans notre appartement ou à l\'hôtel.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Excursion and Beach at Arta',
              fr: 'Excursion et Plage à Arta'
            },
            description: {
              en: 'Morning: Hike starting from the refuge, suitable for all levels. For more experienced hikers, walk to the beach (about 2 hours). Lunch: picnic on Arta beach. Afternoon: fins, mask and snorkel on the reef at Arta beach. During the season from mid-November to January: excursions to observe whale sharks are possible; encounters are likely but never guaranteed. Return to Djibouti in the late afternoon. Dinner with a local family or at a restaurant (according to your choice). Night in our apartment or hotel.',
              fr: 'Matin: Randonnée au départ du refuge, adaptée à tous les niveaux. Pour les randonneurs plus expérimentés, marche jusqu\'à la plage (environ 2 heures). Déjeuner: pique-nique sur la plage d\'Arta. Après-midi: palmes, masque et tuba sur le récif de la plage d\'Arta. Pendant la saison de mi-novembre à janvier: excursions pour observer les requins-baleines possibles; les rencontres sont probables mais jamais garanties. Retour à Djibouti en fin d\'après-midi. Dîner avec une famille locale ou au restaurant (selon votre choix). Nuit dans notre appartement ou à l\'hôtel.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Djibouti to Randa Camp via Lake Assal',
              fr: 'Djibouti au Camp Randa via le Lac Assal'
            },
            description: {
              en: 'Morning: Early departure from Djibouti. Stop at Dimbiya canyon, nicknamed the "Grand Canyon of Djibouti". Another stop with a breathtaking view of Devil\'s Island and the Goubbet. Located in the heart of Djibouti, Lake Assal is one of the most spectacular natural sites in East Africa. This salt lake lies at approximately 153 to 155 meters below sea level, making it the lowest point in Africa. Lunch: picnic on the Goubbet beach. Afternoon: visit the lava field located between Assal and Goubet, where we will observe the rift fault. Overnight at Goubbet and after breakfast we take the road to the Randa guesthouse located at about 900 m altitude. Night in Randa.',
              fr: 'Matin: Départ tôt de Djibouti. Arrêt au canyon de Dimbiya, surnommé le « Grand Canyon de Djibouti ». Un autre arrêt avec une vue imprenable sur l\'île du Diable et le Goubbet. Situé au cœur de Djibouti, le Lac Assal est l\'un des sites naturels les plus spectaculaires d\'Afrique de l\'Est. Ce lac salé se trouve à environ 153 à 155 mètres sous le niveau de la mer, ce qui en fait le point le plus bas d\'Afrique. Déjeuner: pique-nique sur la plage de Goubbet. Après-midi: visite du champ de lave situé entre Assal et Goubet, où nous observerons la faille du rift. Nuit à Goubbet et après le petit-déjeuner, nous prenons la route vers la maison d\'hôtes de Randa située à environ 900 m d\'altitude. Nuit à Randa.'
            }
          },
          {
            day: 4,
            title: {
              en: 'Hike to the Day Camp',
              fr: 'Randonnée vers le Camp du Day'
            },
            description: {
              en: 'Morning: Hike from Randa to Day camp (about 4 hours) – transfer by 4x4 possible. Day camp is equipped with daboytas (traditional huts) arranged on a shaded, well-laid-out terrace. From there, it is possible to make excursions into the primary forest of the same name or hikes to other camps in the Goda mountains. Lunch and dinner at the camp.',
              fr: 'Matin: Randonnée de Randa au camp du Day (environ 4 heures) – transfert en 4x4 possible. Le camp du Day est équipé de daboytas (cases traditionnelles) disposées sur une terrasse ombragée et bien aménagée. De là, il est possible de faire des excursions dans la forêt primaire du même nom ou des randonnées vers d\'autres camps dans les monts Goda. Déjeuner et dîner au camp.'
            }
          },
          {
            day: 5,
            title: {
              en: 'Hike to Dittilou Camp',
              fr: 'Randonnée vers le Camp de Dittilou'
            },
            description: {
              en: 'Morning: Hike from Day camp to Dittilou camp (about 4 hours) – transfer by 4x4 possible. The Dittilou camp consists of about twenty daboytas (traditional huts) built on terraces. Located in the heart of lush vegetation at over 600 m altitude, the place breathes serenity. A colony of green monkeys provides entertaining spectacles. Lunch at Dittilou. Afternoon: Visit the village of Dougoum, near Dittilou camp. Dinner and overnight: Dittilou camp.',
              fr: 'Matin: Randonnée du camp du Day au camp de Dittilou (environ 4 heures) – transfert en 4x4 possible. Le camp de Dittilou se compose d\'une vingtaine de daboytas (cases traditionnelles) construites sur des terrasses. Situé au cœur d\'une végétation luxuriante à plus de 600 m d\'altitude, l\'endroit respire la sérénité. Une colonie de singes verts offre des spectacles divertissants. Déjeuner à Dittilou. Après-midi: Visite du village de Dougoum, près du camp de Dittilou. Dîner et nuit: camp de Dittilou.'
            }
          },
          {
            day: 6,
            title: {
              en: 'Journey to Ras Ali via Tadjourah',
              fr: 'Voyage vers Ras Ali via Tadjourah'
            },
            description: {
              en: 'Ras Ali camp is located after Tadjourah, on the seashore, at the end of a track of about ten kilometers. The sanitary facilities are basic by European standards, but perfectly adequate and clean. The cooking is excellent and the site is paradisiacal for snorkeling. Lunch at Ras Ali camp. Afternoon: swimming, snorkeling, kayaking on Ras Ali beach. Dinner and overnight at Ras Ali camp.',
              fr: 'Le camp de Ras Ali est situé après Tadjourah, au bord de la mer, au bout d\'une piste d\'une dizaine de kilomètres. Les sanitaires sont basiques selon les normes européennes, mais parfaitement adéquats et propres. La cuisine est excellente et le site est paradisiaque pour le snorkeling. Déjeuner au camp de Ras Ali. Après-midi: baignade, snorkeling, kayak sur la plage de Ras Ali. Dîner et nuit au camp de Ras Ali.'
            }
          },
          {
            day: 7,
            title: {
              en: 'From Ras Ali to Ras Bir',
              fr: 'De Ras Ali à Ras Bir'
            },
            description: {
              en: 'Morning: Early departure for Ras Bir camp after Obock. Lunch at a restaurant in Obock. In Obock, we will visit the house of Governor Lagarde, a remnant of the French colonization that began in Obock, and we will go to the maritime cemetery which holds the graves of French soldiers who died of fever between 1885 and 1889. Dinner and night at Ras Bir camp located on the seashore, less than ten kilometers from Obock.',
              fr: 'Matin: Départ tôt pour le camp de Ras Bir après Obock. Déjeuner dans un restaurant à Obock. À Obock, nous visiterons la maison du gouverneur Lagarde, vestige de la colonisation française qui a débuté à Obock, et nous nous rendrons au cimetière maritime qui abrite les tombes de soldats français morts de fièvre entre 1885 et 1889. Dîner et nuit au camp de Ras Bir situé au bord de la mer, à moins de dix kilomètres d\'Obock.'
            }
          },
          {
            day: 8,
            title: {
              en: 'Walk in the Godoria Mangrove and Return to Djibouti',
              fr: 'Promenade dans la Mangrove de Godoria et Retour à Djibouti'
            },
            description: {
              en: 'Morning: Visit the Ras Bir lighthouse – don\'t leave too quickly, you\'ll need to climb more than 200 steps to reach the top. We then continue north to the Godoria mangrove where a canoe excursion awaits. Return to Ras Bir camp for lunch. Afternoon: return journey to Djibouti. Dinner at a restaurant in Djibouti or with a local family. Night: in our apartment or hotel.',
              fr: 'Matin: Visite du phare de Ras Bir – ne partez pas trop vite, il faudra gravir plus de 200 marches pour atteindre le sommet. Nous continuons ensuite vers le nord jusqu\'à la mangrove de Godoria où une excursion en pirogue nous attend. Retour au camp de Ras Bir pour le déjeuner. Après-midi: retour à Djibouti. Dîner au restaurant à Djibouti ou avec une famille locale. Nuit: dans notre appartement ou à l\'hôtel.'
            }
          },
          {
            day: 9,
            title: {
              en: 'On the Planet Lac Abbé',
              fr: 'Sur la Planète Lac Abbé'
            },
            description: {
              en: 'Morning: From Djibouti to Dikhil we travel about 120 km on a paved road. We will cross the semi-desert expanses of Petit Bara and Grand Bara. Lunch at the Gobaad restaurant in Dikhil. Afternoon: After Dikhil, we leave the road to travel 80 km of tracks that are sometimes sandy. We will cross the villages of As Eyla and Koutabouya. Border site between Ethiopia and Djibouti, Lake Abbé presents a unique panorama. Arrival at the Lac Abbé camp in the evening, to watch the sunset. Evening meal and overnight at Lac Abbé camp.',
              fr: 'Matin: De Djibouti à Dikhil, nous parcourons environ 120 km sur une route asphaltée. Nous traverserons les étendues semi-désertiques du Petit Bara et du Grand Bara. Déjeuner au restaurant Gobaad à Dikhil. Après-midi: Après Dikhil, nous quittons la route pour parcourir 80 km de pistes parfois sablonneuses. Nous traverserons les villages d\'As Eyla et Koutabouya. Site frontalier entre l\'Éthiopie et Djibouti, le Lac Abbé présente un panorama unique. Arrivée au camp du Lac Abbé en soirée, pour admirer le coucher du soleil. Repas du soir et nuit au camp du Lac Abbé.'
            }
          },
          {
            day: 10,
            title: {
              en: 'Lac Abbé - Djibouti',
              fr: 'Lac Abbé - Djibouti'
            },
            description: {
              en: 'Morning: You will have to get up very early to watch the spectacle of the sunrise in the middle of the chimneys! Then we will try to approach the pink flamingos at the edge of the lake. We will also observe some sources of boiling water. Then we take the way back to Djibouti. Lunch at Arta at Sunny Hill. Arrival in Djibouti at the beginning of the afternoon, which will allow us to visit the city. Evening meal: Restaurant in Djibouti. Night: in our apartment or hotel.',
              fr: 'Matin: Il faudra se lever très tôt pour assister au spectacle du lever du soleil au milieu des cheminées! Puis nous tenterons d\'approcher les flamants roses au bord du lac. Nous observerons également quelques sources d\'eau bouillante. Ensuite, nous prenons le chemin du retour vers Djibouti. Déjeuner à Arta au Sunny Hill. Arrivée à Djibouti en début d\'après-midi, ce qui nous permettra de visiter la ville. Repas du soir: Restaurant à Djibouti. Nuit: dans notre appartement ou à l\'hôtel.'
            }
          },
          {
            day: 11,
            title: {
              en: 'Day at the Moucha or Maskali Islands',
              fr: 'Journée aux Îles Moucha ou Maskali'
            },
            description: {
              en: 'With only a few inhabitants, these two coral islands located at the entrance to the Gulf of Tadjourah are conducive to relaxation and idleness. We reach these islands after barely 30 minutes by boat. With a bit of luck, we will come across some dolphins. Snorkeling enthusiasts will prefer the observation of underwater fauna and flora in Maskali. For an additional fee, a scuba diving day with an oxygen bottle can be offered on Moucha Island. Lunch will be taken on the island. Return to Djibouti in the late afternoon. Evening meal: restaurant in Djibouti. Night: in our apartment or at the hotel.',
              fr: 'Avec seulement quelques habitants, ces deux îles coralliennes situées à l\'entrée du Golfe de Tadjourah sont propices à la détente et à la flânerie. Nous rejoignons ces îles après à peine 30 minutes en bateau. Avec un peu de chance, nous croiserons quelques dauphins. Les amateurs de snorkeling préféreront l\'observation de la faune et de la flore sous-marines à Maskali. Moyennant un supplément, une journée de plongée avec bouteille d\'oxygène peut être proposée sur l\'île Moucha. Le déjeuner sera pris sur l\'île. Retour à Djibouti en fin d\'après-midi. Repas du soir: restaurant à Djibouti. Nuit: dans notre appartement ou à l\'hôtel.'
            }
          },
          {
            day: 12,
            title: {
              en: 'Relaxing Day in Korambado',
              fr: 'Journée de Détente à Korambado'
            },
            description: {
              en: 'Snorkeling on the program for this day. Lunch in a hut on the beach. You need a good 4x4 vehicle to get down to Korambado. Not far from Djibouti, the site is interesting for the practice of snorkeling (east side). A few "local color" huts, installed by the sea, provide the shade and the meal necessary to spend a very pleasant day there. Evening meal at the restaurant in Djibouti. On the menu Yemeni fish. Evening transfer to Djibouti airport.',
              fr: 'Snorkeling au programme pour cette journée. Déjeuner dans une case sur la plage. Il faut un bon véhicule 4x4 pour descendre à Korambado. Non loin de Djibouti, le site est intéressant pour la pratique du snorkeling (côté est). Quelques cases « couleur locale », installées au bord de la mer, procurent l\'ombre et le repas nécessaires pour y passer une journée très agréable. Repas du soir au restaurant à Djibouti. Au menu le poisson yéménite. Transfert en soirée à l\'aéroport de Djibouti.'
            }
          }
        ],
        included: {
          en: [
            'Airport transfers',
            'Private vehicle with driver',
            'French/English-speaking guide',
            'Full board meals',
            '1.5 liters of water per day per person',
            'Accommodation: DECAN (1 night), Arta (1 night), Randa (1 night), Day camp (1 night), Dittilou camp (1 night), Ras Ali camp (1 night), Ras Bir camp (1 night), Lac Abbé camp (1 night), Djibouti apartment (3 nights)',
            'All site entrance fees',
            'Snorkeling equipment',
            'Ferry transfer where applicable',
            'Government taxes'
          ],
          fr: [
            'Transferts aéroport',
            'Véhicule privé avec chauffeur',
            'Guide francophone/anglophone',
            'Pension complète',
            '1,5 litre d\'eau par jour par personne',
            'Hébergement: DECAN (1 nuit), Arta (1 nuit), Randa (1 nuit), camp Day (1 nuit), camp Dittilou (1 nuit), camp Ras Ali (1 nuit), camp Ras Bir (1 nuit), camp Lac Abbé (1 nuit), appartement Djibouti (3 nuits)',
            'Frais d\'entrée des sites',
            'Équipement de snorkeling',
            'Transfert en ferry le cas échéant',
            'Taxes gouvernementales'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Alcoholic beverages',
            'Medical repatriation insurance',
            'Tips',
            'Scuba diving equipment (available for rent)'
          ],
          fr: [
            'Vols internationaux',
            'Visa',
            'Assurance voyage',
            'Boissons alcoolisées',
            'Assurance rapatriement médical',
            'Pourboires',
            'Équipement de plongée (disponible à la location)'
          ]
        },
        whatToBring: {
          en: [
            'Comfortable walking shoes',
            'Hiking boots (for mountain hikes)',
            'Swimsuit and towel',
            'Snorkeling equipment (if you have your own)',
            'Sun protection (hat, sunscreen, sunglasses)',
            'Camera',
            'Warm layers for mountain nights',
            'Water bottle',
            'Headlamp/flashlight',
            'Personal medications'
          ],
          fr: [
            'Chaussures de marche confortables',
            'Chaussures de randonnée (pour les randonnées en montagne)',
            'Maillot de bain et serviette',
            'Équipement de snorkeling (si vous en avez)',
            'Protection solaire (chapeau, crème solaire, lunettes)',
            'Appareil photo',
            'Vêtements chauds pour les nuits en montagne',
            'Bouteille d\'eau',
            'Lampe frontale/torche',
            'Médicaments personnels'
          ]
        },
        accommodation: {
          en: 'Mixed accommodation including camps, guesthouses, and apartments',
          fr: 'Hébergement mixte incluant camps, maisons d\'hôtes et appartements'
        },
        transportation: {
          en: 'Private 4x4 with air conditioning, ferry where applicable',
          fr: '4x4 privé avec climatisation, ferry le cas échéant'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 30 days before the tour. 50% refund for cancellations within 14 days. No refund for no-shows.',
          fr: 'Annulation gratuite jusqu\'à 30 jours avant le circuit. Remboursement de 50 % pour les annulations dans les 14 jours. Aucun remboursement pour les non-présentations.'
        },
        faqs: [
          {
            question: {
              en: 'Is this tour suitable for beginners?',
              fr: 'Ce circuit est-il adapté aux débutants ?'
            },
            answer: {
              en: 'This tour is challenging and best suited for experienced hikers. Some hikes are up to 4 hours.',
              fr: 'Ce circuit est difficile et convient mieux aux randonneurs expérimentés. Certaines randonnées peuvent durer jusqu\'à 4 heures.'
            }
          },
          {
            question: {
              en: 'What is the best time for this tour?',
              fr: 'Quelle est la meilleure période pour ce circuit ?'
            },
            answer: {
              en: 'The best time is from November to April when the weather is cooler and more comfortable for hiking.',
              fr: 'La meilleure période est de novembre à avril, lorsque le temps est plus frais et plus confortable pour la randonnée.'
            }
          },
          {
            question: {
              en: 'Can I swim with whale sharks?',
              fr: 'Puis-je nager avec les requins-baleines ?'
            },
            answer: {
              en: 'During the season (mid-November to January), whale shark excursions are possible. Encounters are likely but not guaranteed.',
              fr: 'Pendant la saison (mi-novembre à janvier), des excursions pour observer les requins-baleines sont possibles. Les rencontres sont probables mais non garanties.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['adventure', 'hiking', 'grand-tour'],
        tags: ['Grand Tour', 'Mountains', 'Sea', 'Hiking', 'Lac Abbé', 'Lac Assal'],
        metaTitle: {
          en: 'Sea, Mountain & Hiking Grand Tour | Djibouti Explorer',
          fr: 'Grand Tour Mer, Montagne & Randonnée | Djibouti Explorer'
        },
        metaDescription: {
          en: 'A 12-day grand tour combining sea, mountain, and hiking experiences across the best of Djibouti.',
          fr: 'Un grand tour de 12 jours combinant mer, montagne et randonnée à travers le meilleur de Djibouti.'
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
        const doc = existing.docs[0]!;
        await adminDb.collection('tours').doc(doc.id).update(tour);
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