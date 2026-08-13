import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const tours = [
      // 1. Djalelo & Lac Abbé Adventure (3 Days)
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
          en: 'This 3-day tour takes you to two of Djibouti\'s most extraordinary places. Djalelo camp is located in a Unesco World Heritage valley, offering comfortable eco-lodging in harmony with nature. Lac Abbé is a surreal landscape of limestone chimneys and flamingos, known for its otherworldly beauty.',
          fr: 'Ce circuit de 3 jours vous emmène dans deux des endroits les plus extraordinaires de Djibouti. Le camp de Djalelo est situé dans une vallée classée au patrimoine mondial de l\'UNESCO, offrant un hébergement écologique confortable en harmonie avec la nature. Le Lac Abbé est un paysage surréaliste de cheminées de calcaire et de flamants.'
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
            'UNESCO World Heritage valley',
            'Eco-camp in harmony with nature',
            'Hike to meet nomadic populations',
            'Gazelle-giraffe sightings',
            'Surreal limestone chimneys of Lac Abbé',
            'Pink flamingos at sunrise'
          ],
          fr: [
            'Vallée classée UNESCO',
            'Éco-camp en harmonie avec la nature',
            'Randonnée à la rencontre des populations nomades',
            'Observation des gazelles-girafes',
            'Cheminées de calcaire surréalistes du Lac Abbé',
            'Flamants roses au lever du soleil'
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
              en: 'Morning arrival at Djibouti – Welcome at the airport and transfer to Guest House La Terrasse. Lunch at a restaurant at the port of Djibouti. Afternoon: departure for Djalelo\'s camp located one hour from the capital. The Djalelo camp is in a UNESCO-listed valley, featuring charming straw huts with solar lighting. Evening: Barbecue dinner. Night at Djalelo\'s camp.',
              fr: 'Arrivée matinale à Djibouti – Accueil à l\'aéroport et transfert à la Guest House La Terrasse. Déjeuner dans un restaurant au port de Djibouti. Après-midi: départ pour le camp de Djalelo situé à une heure de la capitale. Le camp de Djalelo est situé dans une vallée classée UNESCO, avec des cases en paille charmantes et un éclairage solaire. Soir: Dîner barbecue. Nuit au camp de Djalelo.'
            }
          },
          {
            day: 2,
            title: {
              en: 'On the Lac Abbé Planet',
              fr: 'Sur la Planète Lac Abbé'
            },
            description: {
              en: 'Morning: Hike to meet a nomadic population. Departure to Dikhil, the first stage on the way to Lac Abbé. Visit the palm grove before lunch. Afternoon: Drive 80 km of track, crossing the villages of As Eyla and Koutabouya. Arrive at Lac Abbé to admire the sunset among the limestone chimneys. Dinner and overnight at the Lac Abbé camp.',
              fr: 'Matin: Randonnée à la rencontre d\'une population nomade. Départ pour Dikhil, la première étape vers le Lac Abbé. Visite de la palmeraie avant le déjeuner. Après-midi: Route sur 80 km de piste, traversée des villages d\'As Eyla et Koutabouya. Arrivée au Lac Abbé pour admirer le coucher du soleil au milieu des cheminées de calcaire. Dîner et nuit au camp du Lac Abbé.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Pink Flamingos',
              fr: 'Flamants Roses'
            },
            description: {
              en: 'Very early morning: Witness the sunrise. After breakfast, approach the flamingos by the lake, then walk among chimneys and hot springs. Afternoon: Return journey. Lunch at Sunny Hill in Arta with a magnificent panorama. Arrive in Djibouti in the late afternoon. Evening: Taste the famous Yemeni fish at Youssouf\'s restaurant before transfer to the airport.',
              fr: 'Très tôt le matin: Lever du soleil. Après le petit-déjeuner, approche des flamants au bord du lac, puis promenade parmi les cheminées et les sources chaudes. Après-midi: Retour. Déjeuner au Sunny Hill à Arta avec un magnifique panorama. Arrivée à Djibouti en fin d\'après-midi. Soir: Dégustation du fameux poisson yéménite au restaurant Youssouf avant le transfert à l\'aéroport.'
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
            'All site entrance fees'
          ],
          fr: [
            'Transferts aéroport',
            'Véhicule privé avec chauffeur',
            'Guide francophone/anglophone',
            'Pension complète',
            '1,5 litre d\'eau par jour par personne',
            'Hébergement: camp Djalelo (1 nuit), camp Lac Abbé (1 nuit)',
            'Frais d\'entrée des sites'
          ]
        },
        excluded: {
          en: ['International flights', 'Visa', 'Travel insurance', 'Alcoholic beverages', 'Tips'],
          fr: ['Vols internationaux', 'Visa', 'Assurance voyage', 'Boissons alcoolisées', 'Pourboires']
        },
        whatToBring: {
          en: ['Comfortable hiking shoes', 'Sun protection', 'Camera', 'Binoculars', 'Light clothing', 'Warm layers', 'Swimsuit'],
          fr: ['Chaussures de randonnée confortables', 'Protection solaire', 'Appareil photo', 'Jumelles', 'Vêtements légers', 'Vêtements chauds', 'Maillot de bain']
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
          en: 'Free cancellation up to 14 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 14 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Are the camps comfortable?',
              fr: 'Les camps sont-ils confortables ?'
            },
            answer: {
              en: 'Yes, Djalelo camp offers comfortable eco-lodging with solar lighting. Lac Abbé camp is basic but clean.',
              fr: 'Oui, le camp de Djalelo offre un hébergement écologique confortable avec éclairage solaire. Le camp du Lac Abbé est basique mais propre.'
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
      // 2. Djibouti, Lac Abbé & Lac Assal Tour (4 Days)
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
          en: 'This 4-day tour combines the cultural highlights of Djibouti City with two of the country\'s most extraordinary natural wonders: Lac Abbé with its surreal limestone chimneys and flamingos, and Lac Assal, the lowest point in Africa with its legendary salt flats.',
          fr: 'Ce circuit de 4 jours combine les points forts culturels de Djibouti Ville avec deux des merveilles naturelles les plus extraordinaires du pays: le Lac Abbé avec ses cheminées de calcaire surréalistes et ses flamants, et le Lac Assal, le point le plus bas d\'Afrique avec ses légendaires plaines de sel.'
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
          en: ['Djibouti City cultural tour', 'Surreal limestone chimneys', 'Sunset and flamingos at Lac Abbé', 'Snorkeling at Arta Beach', 'Legendary salt flats of Lac Assal'],
          fr: ['Visite culturelle de Djibouti Ville', 'Cheminées de calcaire surréalistes', 'Coucher de soleil et flamants au Lac Abbé', 'Snorkeling à Arta Beach', 'Légendaires plaines de sel du Lac Assal']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti City Tour',
              fr: 'Visite de Djibouti Ville'
            },
            description: {
              en: 'After being welcomed at the airport and transferred to your accommodation, we visit Place du 27 juin and Place Mahmoud Harbi. After lunch, we go to the fishing port and stopover. Then we visit the animal shelter DECAN or walk in the shopping street of the Caisses. Dinner at Chez Youssouf restaurant. Night at Guest House La Terrasse.',
              fr: 'Après avoir été accueilli à l\'aéroport et transféré à votre hébergement, nous visitons la Place du 27 juin et la Place Mahmoud Harbi. Après le déjeuner, nous nous rendons au port de pêche et à l\'escale. Ensuite, nous visitons le refuge animalier DECAN ou nous promenons dans la rue commerçante des Caisses. Dîner au restaurant Chez Youssouf. Nuit à la Guest House La Terrasse.'
            }
          },
          {
            day: 2,
            title: {
              en: 'On the Lac Abbé Planet',
              fr: 'Sur la Planète Lac Abbé'
            },
            description: {
              en: 'Departure to Dikhil. Visit the palm grove before lunch. Afternoon: drive 80 km of track to Lac Abbé. Admire the sunset among the limestone chimneys. Dinner and overnight at the Lac Abbé camp.',
              fr: 'Départ pour Dikhil. Visite de la palmeraie avant le déjeuner. Après-midi: route sur 80 km de piste vers le Lac Abbé. Admirez le coucher du soleil au milieu des cheminées de calcaire. Dîner et nuit au camp du Lac Abbé.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Pink Flamingos and Snorkeling at Arta Beach',
              fr: 'Flamants Roses et Snorkeling à Arta Beach'
            },
            description: {
              en: 'Very early morning: Witness the sunrise. Approach the flamingos by the lake. Return journey with a stop at Arta beach for snorkeling and lunch. Return to Djibouti in the late afternoon.',
              fr: 'Très tôt le matin: Lever du soleil. Approche des flamants au bord du lac. Retour avec un arrêt à la plage d\'Arta pour le snorkeling et le déjeuner. Retour à Djibouti en fin d\'après-midi.'
            }
          },
          {
            day: 4,
            title: {
              en: 'The Legendary Colors of Lake Assal',
              fr: 'Les Couleurs Légendaires du Lac Assal'
            },
            description: {
              en: 'After breakfast, leave for Lake Assal. Stop at Dimbiya Canyon. Descend to Lake Assal (157 meters below sea level). Swim in the salty waters if conditions permit. Picnic lunch at Goubet. Return to Djibouti in the late afternoon.',
              fr: 'Après le petit-déjeuner, départ pour le Lac Assal. Arrêt au canyon de Dimbiya. Descente vers le Lac Assal (157 mètres sous le niveau de la mer). Baignade dans les eaux salées si les conditions le permettent. Déjeuner pique-nique à Goubet. Retour à Djibouti en fin d\'après-midi.'
            }
          }
        ],
        included: {
          en: ['Airport transfers', 'Private vehicle with driver', 'French/English-speaking guide', 'Full board meals', '1.5 liters of water per day', 'Accommodation: Lac Abbé camp (1 night), Guest House La Terrasse (2 nights)', 'Snorkeling equipment'],
          fr: ['Transferts aéroport', 'Véhicule privé avec chauffeur', 'Guide francophone/anglophone', 'Pension complète', '1,5 litre d\'eau par jour', 'Hébergement: camp Lac Abbé (1 nuit), Guest House La Terrasse (2 nuits)', 'Équipement de snorkeling']
        },
        excluded: {
          en: ['International flights', 'Visa', 'Travel insurance', 'Alcoholic beverages', 'Tips'],
          fr: ['Vols internationaux', 'Visa', 'Assurance voyage', 'Boissons alcoolisées', 'Pourboires']
        },
        whatToBring: {
          en: ['Comfortable walking shoes', 'Hiking shoes', 'Swimsuit and towel', 'Snorkeling equipment', 'Sun protection', 'Camera'],
          fr: ['Chaussures de marche confortables', 'Chaussures de randonnée', 'Maillot de bain et serviette', 'Équipement de snorkeling', 'Protection solaire', 'Appareil photo']
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
          en: 'Free cancellation up to 14 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 14 jours avant le circuit.'
        },
        faqs: [
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
      // 3. Djibouti Animals Tour (5 Days)
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
          en: 'This 5-day wildlife tour takes you through the diverse fauna of Djibouti. Visit the DECAN animal refuge, explore the lunar landscapes of Lac Abbé, swim in the legendary Lac Assal, and snorkel at Ras Ali. The tour combines wildlife observation, desert landscapes, and marine exploration.',
          fr: 'Ce circuit animalier de 5 jours vous emmène à travers la faune diversifiée de Djibouti. Visitez le refuge animalier DECAN, explorez les paysages lunaires du Lac Abbé, nagez dans le légendaire Lac Assal et faites du snorkeling à Ras Ali.'
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
          en: ['DECAN animal refuge', 'Lunar landscapes of Lac Abbé', 'Pink flamingos', 'Snorkeling at Arta Beach', 'Legendary Lake Assal', 'Snorkeling at Ras Ali'],
          fr: ['Refuge animalier DECAN', 'Paysages lunaires du Lac Abbé', 'Flamants roses', 'Snorkeling à Arta Beach', 'Légendaire Lac Assal', 'Snorkeling à Ras Ali']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti City Tour & DECAN Refuge',
              fr: 'Visite de Djibouti Ville & Refuge DECAN'
            },
            description: {
              en: 'City tour including Place du 27 juin, Place Mahmoud Harbi, fishing port, and DECAN animal refuge. Dinner at Chez Youssouf. Night at Guest House La Terrasse.',
              fr: 'Visite de la ville incluant la Place du 27 juin, la Place Mahmoud Harbi, le port de pêche et le refuge animalier DECAN. Dîner au Chez Youssouf. Nuit à la Guest House La Terrasse.'
            }
          },
          {
            day: 2,
            title: {
              en: 'On the Lac Abbé Planet',
              fr: 'Sur la Planète Lac Abbé'
            },
            description: {
              en: 'Drive to Dikhil, visit the palm grove. Afternoon: 80 km track to Lac Abbé. Sunset among the limestone chimneys. Dinner and overnight at Lac Abbé camp.',
              fr: 'Route vers Dikhil, visite de la palmeraie. Après-midi: 80 km de piste vers le Lac Abbé. Coucher du soleil au milieu des cheminées de calcaire. Dîner et nuit au camp du Lac Abbé.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Pink Flamingos and Snorkeling at Arta Beach',
              fr: 'Flamants Roses et Snorkeling à Arta Beach'
            },
            description: {
              en: 'Sunrise at Lac Abbé, approach flamingos. Return with snorkeling stop at Arta Beach. Night at Guest House La Terrasse.',
              fr: 'Lever du soleil au Lac Abbé, approche des flamants. Retour avec arrêt snorkeling à Arta Beach. Nuit à la Guest House La Terrasse.'
            }
          },
          {
            day: 4,
            title: {
              en: 'Lake Assal & Ras Ali',
              fr: 'Lac Assal & Ras Ali'
            },
            description: {
              en: 'Visit Lake Assal with stop at Dimbiya Canyon. Swim in the salty waters. Continue to Ras Ali camp. Walk on lava field. Night at Ras Ali camp on the beach.',
              fr: 'Visite du Lac Assal avec arrêt au canyon de Dimbiya. Baignade dans les eaux salées. Continuation vers le camp de Ras Ali. Marche sur le champ de lave. Nuit au camp de Ras Ali sur la plage.'
            }
          },
          {
            day: 5,
            title: {
              en: 'Snorkeling At Ras Ali & Return',
              fr: 'Snorkeling à Ras Ali & Retour'
            },
            description: {
              en: 'Snorkeling on the Ras Ali drop-off. Return to Djibouti by road or ferry. Transfer to the airport.',
              fr: 'Snorkeling sur le tombant de Ras Ali. Retour à Djibouti par la route ou en ferry. Transfert à l\'aéroport.'
            }
          }
        ],
        included: {
          en: ['Airport transfers', 'Private vehicle with driver', 'French/English-speaking guide', 'Full board meals', '1.5 liters of water per day', 'Accommodation: Lac Abbé camp (1 night), Guest House La Terrasse (2 nights), Ras Ali camp (1 night)', 'Snorkeling equipment'],
          fr: ['Transferts aéroport', 'Véhicule privé avec chauffeur', 'Guide francophone/anglophone', 'Pension complète', '1,5 litre d\'eau par jour', 'Hébergement: camp Lac Abbé (1 nuit), Guest House La Terrasse (2 nuits), camp Ras Ali (1 nuit)', 'Équipement de snorkeling']
        },
        excluded: {
          en: ['International flights', 'Visa', 'Travel insurance', 'Alcoholic beverages', 'Tips'],
          fr: ['Vols internationaux', 'Visa', 'Assurance voyage', 'Boissons alcoolisées', 'Pourboires']
        },
        whatToBring: {
          en: ['Comfortable walking shoes', 'Hiking shoes', 'Swimsuit and towel', 'Snorkeling equipment', 'Sun protection', 'Camera'],
          fr: ['Chaussures de marche confortables', 'Chaussures de randonnée', 'Maillot de bain et serviette', 'Équipement de snorkeling', 'Protection solaire', 'Appareil photo']
        },
        accommodation: {
          en: 'Lac Abbé camp (1 night), Guest House La Terrasse (2 nights), Ras Ali camp (1 night)',
          fr: 'Camp Lac Abbé (1 nuit), Guest House La Terrasse (2 nuits), camp Ras Ali (1 nuit)'
        },
        transportation: {
          en: 'Private 4x4 with air conditioning',
          fr: '4x4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 14 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 14 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'What animals can we see at DECAN?',
              fr: 'Quels animaux peut-on voir au DECAN ?'
            },
            answer: {
              en: 'The DECAN refuge houses animals from Djibouti and other parts of Africa.',
              fr: 'Le refuge DECAN abrite des animaux de Djibouti et d\'autres régions d\'Afrique.'
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
      // 4. Allols Discovery Tour (6 Days)
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
          en: 'The Allols are one of the most amazing places in Djibouti, and very few people visit them because they are quite remote. This 6-day tour takes you to this hidden paradise with its unique landscapes, wildlife, and cultural encounters.',
          fr: 'Les Allols sont l\'un des endroits les plus étonnants de Djibouti, et très peu de personnes les visitent car ils sont assez éloignés. Ce circuit de 6 jours vous emmène dans ce paradis caché avec ses paysages uniques, sa faune et ses rencontres culturelles.'
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
          en: ['DECAN animal refuge', 'Legendary Lake Assal', 'Tadjourah White City', 'Remote Allols region', 'Ras Ali snorkeling', 'Traditional village encounters'],
          fr: ['Refuge animalier DECAN', 'Légendaire Lac Assal', 'Ville Blanche de Tadjourah', 'Région isolée des Allols', 'Snorkeling à Ras Ali', 'Rencontres avec les villages traditionnels']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Visit the DECAN Refuge',
              fr: 'Visite du Refuge DECAN'
            },
            description: {
              en: 'Arrival in Djibouti, transfer to accommodation. Lunch at the port restaurant. Afternoon: visit DECAN refuge. Dinner and night in Djibouti.',
              fr: 'Arrivée à Djibouti, transfert à l\'hébergement. Déjeuner au restaurant du port. Après-midi: visite du refuge DECAN. Dîner et nuit à Djibouti.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Djibouti to Tadjourah via Lake Assal',
              fr: 'Djibouti à Tadjourah via le Lac Assal'
            },
            description: {
              en: 'Early departure. Stop at Dimbiya Canyon. Visit Lake Assal (153 meters below sea level). Swim if conditions permit. Lunch at Goubet. Visit lava field. Night at Hotel Golfe in Tadjourah.',
              fr: 'Départ tôt. Arrêt au canyon de Dimbiya. Visite du Lac Assal (153 mètres sous le niveau de la mer). Baignade si les conditions le permettent. Déjeuner à Goubet. Visite du champ de lave. Nuit à l\'Hôtel Golfe à Tadjourah.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Departure for Les Allols',
              fr: 'Départ pour Les Allols'
            },
            description: {
              en: 'Visit Tadjourah city. Lunch with a local family in Bolli. Afternoon: journey to Allols. Bivouac in Les Allols.',
              fr: 'Visite de la ville de Tadjourah. Déjeuner avec une famille locale à Bolli. Après-midi: route vers les Allols. Bivouac aux Allols.'
            }
          },
          {
            day: 4,
            title: {
              en: 'Allols to Ras Ali Camp',
              fr: 'Allols au Camp de Ras Ali'
            },
            description: {
              en: 'Morning: Hike in Allols or visit gardens around Daffeynaytou. Lunch at Randa. Visit Randa. Night at Ras Ali camp on the beach.',
              fr: 'Matin: Randonnée aux Allols ou visite des jardins autour de Daffeynaytou. Déjeuner à Randa. Visite de Randa. Nuit au camp de Ras Ali sur la plage.'
            }
          },
          {
            day: 5,
            title: {
              en: 'Snorkeling in Ras Ali and Return to Djibouti',
              fr: 'Snorkeling à Ras Ali et Retour à Djibouti'
            },
            description: {
              en: 'Snorkeling on Ras Ali drop-off. Return to Djibouti by road or ferry. Night in Djibouti.',
              fr: 'Snorkeling sur le tombant de Ras Ali. Retour à Djibouti par la route ou en ferry. Nuit à Djibouti.'
            }
          },
          {
            day: 6,
            title: {
              en: 'Relaxing Day in Korambado',
              fr: 'Journée de Détente à Korambado'
            },
            description: {
              en: 'Snorkeling at Korambado. Lunch in a hut on the beach. Return to Djibouti. Evening transfer to the airport.',
              fr: 'Snorkeling à Korambado. Déjeuner dans une case sur la plage. Retour à Djibouti. Transfert en soirée à l\'aéroport.'
            }
          }
        ],
        included: {
          en: ['Airport transfers', 'Private vehicle with driver', 'French/English-speaking guide', 'Full board meals', '1.5 liters of water per day', 'Accommodation: DECAN (1 night), Tadjourah hotel (1 night), Allols camp (1 night), Ras Ali camp (1 night), Djibouti (1 night)', 'Snorkeling equipment'],
          fr: ['Transferts aéroport', 'Véhicule privé avec chauffeur', 'Guide francophone/anglophone', 'Pension complète', '1,5 litre d\'eau par jour', 'Hébergement: DECAN (1 nuit), hôtel Tadjourah (1 nuit), camp Allols (1 nuit), camp Ras Ali (1 nuit), Djibouti (1 nuit)', 'Équipement de snorkeling']
        },
        excluded: {
          en: ['International flights', 'Visa', 'Travel insurance', 'Alcoholic beverages', 'Tips'],
          fr: ['Vols internationaux', 'Visa', 'Assurance voyage', 'Boissons alcoolisées', 'Pourboires']
        },
        whatToBring: {
          en: ['Comfortable walking shoes', 'Hiking shoes', 'Swimsuit and towel', 'Snorkeling equipment', 'Sun protection', 'Camera'],
          fr: ['Chaussures de marche confortables', 'Chaussures de randonnée', 'Maillot de bain et serviette', 'Équipement de snorkeling', 'Protection solaire', 'Appareil photo']
        },
        accommodation: {
          en: 'Mixed accommodation: DECAN, hotel, camps, apartment',
          fr: 'Hébergement mixte: DECAN, hôtel, camps, appartement'
        },
        transportation: {
          en: 'Private 4x4 with air conditioning',
          fr: '4x4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 14 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 14 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'What are the Allols?',
              fr: 'Que sont les Allols ?'
            },
            answer: {
              en: 'The Allols are one of the most amazing and remote places in Djibouti, known for unique landscapes and traditional villages.',
              fr: 'Les Allols sont l\'un des endroits les plus étonnants et isolés de Djibouti, connus pour leurs paysages uniques et leurs villages traditionnels.'
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
      // 5. Beach & Mountain Tour (7 Days)
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
          en: ['Djibouti City culture', 'Lac Abbé lunar landscapes', 'Lac Assal salt flats', 'Ras Ali snorkeling', 'Maskali Island', 'Goda Mountains trekking'],
          fr: ['Culture de Djibouti Ville', 'Paysages lunaires du Lac Abbé', 'Plaines de sel du Lac Assal', 'Snorkeling à Ras Ali', 'Île Maskali', 'Randonnée dans les Monts Goda']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'Djibouti City Tour',
              fr: 'Visite de Djibouti Ville'
            },
            description: {
              en: 'City tour including Place du 27 juin, fishing port, and DECAN refuge. Dinner at Chez Youssouf. Night at Guest House La Terrasse.',
              fr: 'Visite de la ville incluant la Place du 27 juin, le port de pêche et le refuge DECAN. Dîner au Chez Youssouf. Nuit à la Guest House La Terrasse.'
            }
          },
          {
            day: 2,
            title: {
              en: 'On the Lac Abbé Planet',
              fr: 'Sur la Planète Lac Abbé'
            },
            description: {
              en: 'Drive to Dikhil, visit palm grove. Afternoon: 80 km track to Lac Abbé. Sunset among limestone chimneys. Night at Lac Abbé camp.',
              fr: 'Route vers Dikhil, visite de la palmeraie. Après-midi: 80 km de piste vers le Lac Abbé. Coucher du soleil au milieu des cheminées de calcaire. Nuit au camp du Lac Abbé.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Pink Flamingos and Snorkeling at Arta Beach',
              fr: 'Flamants Roses et Snorkeling à Arta Beach'
            },
            description: {
              en: 'Sunrise at Lac Abbé, approach flamingos. Return with snorkeling at Arta Beach. Night at Guest House La Terrasse.',
              fr: 'Lever du soleil au Lac Abbé, approche des flamants. Retour avec snorkeling à Arta Beach. Nuit à la Guest House La Terrasse.'
            }
          },
          {
            day: 4,
            title: {
              en: 'Lake Assal & Ras Ali',
              fr: 'Lac Assal & Ras Ali'
            },
            description: {
              en: 'Visit Lake Assal with Dimbiya Canyon stop. Swim in salty waters. Continue to Ras Ali camp. Walk on lava field. Night at Ras Ali camp.',
              fr: 'Visite du Lac Assal avec arrêt au canyon de Dimbiya. Baignade dans les eaux salées. Continuation vers le camp de Ras Ali. Marche sur le champ de lave. Nuit au camp de Ras Ali.'
            }
          },
          {
            day: 5,
            title: {
              en: 'Snorkeling at Ras Ali & Bankoualé Camp',
              fr: 'Snorkeling à Ras Ali & Camp de Bankoualé'
            },
            description: {
              en: 'Snorkeling on Ras Ali drop-off. Afternoon: drive to Bankoualé camp in the Goda Mountains. Night at Bankoualé camp.',
              fr: 'Snorkeling sur le tombant de Ras Ali. Après-midi: route vers le camp de Bankoualé dans les Monts Goda. Nuit au camp de Bankoualé.'
            }
          },
          {
            day: 6,
            title: {
              en: 'Visit the Village of Ardo and the Gardens',
              fr: 'Visite du Village d\'Ardo et des Jardins'
            },
            description: {
              en: 'Visit gardens along the wadi. Visit village of Ardo and local school. Return to Djibouti. Night at Guest House La Terrasse.',
              fr: 'Visite des jardins le long de l\'oued. Visite du village d\'Ardo et de l\'école locale. Retour à Djibouti. Nuit à la Guest House La Terrasse.'
            }
          },
          {
            day: 7,
            title: {
              en: 'At the Island of Maskali',
              fr: 'À l\'Île de Maskali'
            },
            description: {
              en: 'Boat trip to Maskali Island. Relaxation and snorkeling. Return in the afternoon. Transfer to the airport.',
              fr: 'Excursion en bateau vers l\'île Maskali. Détente et snorkeling. Retour dans l\'après-midi. Transfert à l\'aéroport.'
            }
          }
        ],
        included: {
          en: ['Airport transfers', 'Private vehicle with driver', 'French/English-speaking guide', 'Full board meals', '1.5 liters of water per day', 'Accommodation: Lac Abbé camp (1 night), Guest House La Terrasse (2 nights), Ras Ali camp (1 night), Bankoualé camp (1 night)', 'Snorkeling equipment'],
          fr: ['Transferts aéroport', 'Véhicule privé avec chauffeur', 'Guide francophone/anglophone', 'Pension complète', '1,5 litre d\'eau par jour', 'Hébergement: camp Lac Abbé (1 nuit), Guest House La Terrasse (2 nuits), camp Ras Ali (1 nuit), camp Bankoualé (1 nuit)', 'Équipement de snorkeling']
        },
        excluded: {
          en: ['International flights', 'Visa', 'Travel insurance', 'Alcoholic beverages', 'Tips'],
          fr: ['Vols internationaux', 'Visa', 'Assurance voyage', 'Boissons alcoolisées', 'Pourboires']
        },
        whatToBring: {
          en: ['Comfortable walking shoes', 'Hiking shoes', 'Swimsuit and towel', 'Snorkeling equipment', 'Sun protection', 'Camera'],
          fr: ['Chaussures de marche confortables', 'Chaussures de randonnée', 'Maillot de bain et serviette', 'Équipement de snorkeling', 'Protection solaire', 'Appareil photo']
        },
        accommodation: {
          en: 'Mixed accommodation: camp, guesthouse, apartment',
          fr: 'Hébergement mixte: camp, maison d\'hôtes, appartement'
        },
        transportation: {
          en: 'Private 4x4 with air conditioning',
          fr: '4x4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 14 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 14 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is the Bankoualé camp comfortable?',
              fr: 'Le camp de Bankoualé est-il confortable ?'
            },
            answer: {
              en: 'Yes, Bankoualé camp is a very pleasant place overlooking the wadi.',
              fr: 'Oui, le camp de Bankoualé est un endroit très agréable surplombant l\'oued.'
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
      // 6. Sea Mountain And Hiking Tour (12 Days)
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
          en: 'This 12-day grand tour offers the ultimate Djibouti experience. From the DECAN animal refuge and Arta beach to the legendary Lac Assal and Lac Abbé, from the Goda Mountains hiking trails to the remote Allols and the islands of Moucha and Maskali, this comprehensive tour covers all the highlights of Djibouti.',
          fr: 'Ce grand tour de 12 jours offre l\'expérience ultime de Djibouti. Du refuge animalier DECAN et de la plage d\'Arta au légendaire Lac Assal et au Lac Abbé, des sentiers de randonnée des Monts Goda aux Allols isolés et aux îles Moucha et Maskali, ce circuit complet couvre tous les points forts de Djibouti.'
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
          en: ['DECAN animal refuge', 'Snorkeling at Arta Beach', 'Legendary Lake Assal', 'Lac Abbé lunar landscapes', 'Goda Mountains hiking', 'Remote Allols', 'Moucha and Maskali Islands'],
          fr: ['Refuge animalier DECAN', 'Snorkeling à Arta Beach', 'Légendaire Lac Assal', 'Paysages lunaires du Lac Abbé', 'Randonnée dans les Monts Goda', 'Allols isolés', 'Îles Moucha et Maskali']
        },
        itinerary: [
          {
            day: 1,
            title: {
              en: 'DECAN Refuge & City Tour',
              fr: 'Refuge DECAN & Tour de la Ville'
            },
            description: {
              en: 'Arrival in Djibouti. Visit DECAN animal refuge. City tour. Dinner and night in Djibouti.',
              fr: 'Arrivée à Djibouti. Visite du refuge animalier DECAN. Tour de la ville. Dîner et nuit à Djibouti.'
            }
          },
          {
            day: 2,
            title: {
              en: 'Excursion and Beach at Arta',
              fr: 'Excursion et Plage à Arta'
            },
            description: {
              en: 'Hike from the refuge to Arta beach. Snorkeling on the reef. Whale shark excursion possible (seasonal). Night in Djibouti.',
              fr: 'Randonnée du refuge à la plage d\'Arta. Snorkeling sur le récif. Excursion aux requins-baleines possible (saisonnière). Nuit à Djibouti.'
            }
          },
          {
            day: 3,
            title: {
              en: 'Djibouti to Randa via Lake Assal',
              fr: 'Djibouti au Camp Randa via le Lac Assal'
            },
            description: {
              en: 'Stop at Dimbiya Canyon. Visit Lake Assal (lowest point in Africa). Picnic at Goubet. Visit lava field. Night at Randa guesthouse.',
              fr: 'Arrêt au canyon de Dimbiya. Visite du Lac Assal (point le plus bas d\'Afrique). Pique-nique à Goubet. Visite du champ de lave. Nuit à la maison d\'hôtes de Randa.'
            }
          },
          {
            day: 4,
            title: {
              en: 'Hike to Day Camp',
              fr: 'Randonnée vers le Camp du Day'
            },
            description: {
              en: 'Hike from Randa to Day camp (about 4 hours). Traditional daboytas huts. Primary forest excursions. Night at Day camp.',
              fr: 'Randonnée de Randa au camp du Day (environ 4 heures). Cases traditionnelles daboytas. Excursions dans la forêt primaire. Nuit au camp du Day.'
            }
          },
          {
            day: 5,
            title: {
              en: 'Hike to Dittilou Camp',
              fr: 'Randonnée vers le Camp de Dittilou'
            },
            description: {
              en: 'Hike from Day to Dittilou camp (about 4 hours). Green monkeys. Visit Dougoum village. Night at Dittilou camp.',
              fr: 'Randonnée du Day au camp de Dittilou (environ 4 heures). Singes verts. Visite du village de Dougoum. Nuit au camp de Dittilou.'
            }
          },
          {
            day: 6,
            title: {
              en: 'Journey to Ras Ali via Tadjourah',
              fr: 'Voyage vers Ras Ali via Tadjourah'
            },
            description: {
              en: 'Drive to Tadjourah. Continue to Ras Ali camp. Swimming, snorkeling, kayaking. Night at Ras Ali camp.',
              fr: 'Route vers Tadjourah. Continuation vers le camp de Ras Ali. Baignade, snorkeling, kayak. Nuit au camp de Ras Ali.'
            }
          },
          {
            day: 7,
            title: {
              en: 'Ras Ali to Ras Bir',
              fr: 'Ras Ali à Ras Bir'
            },
            description: {
              en: 'Drive to Obock. Visit Governor Lagarde house and maritime cemetery. Night at Ras Bir camp on the seashore.',
              fr: 'Route vers Obock. Visite de la maison du gouverneur Lagarde et du cimetière maritime. Nuit au camp de Ras Bir au bord de la mer.'
            }
          },
          {
            day: 8,
            title: {
              en: 'Godoria Mangrove & Return to Djibouti',
              fr: 'Mangrove de Godoria & Retour à Djibouti'
            },
            description: {
              en: 'Visit Ras Bir lighthouse (200+ steps). Canoe excursion in Godoria mangrove. Return to Djibouti. Night in Djibouti.',
              fr: 'Visite du phare de Ras Bir (200+ marches). Excursion en pirogue dans la mangrove de Godoria. Retour à Djibouti. Nuit à Djibouti.'
            }
          },
          {
            day: 9,
            title: {
              en: 'On the Planet Lac Abbé',
              fr: 'Sur la Planète Lac Abbé'
            },
            description: {
              en: 'Drive to Dikhil. 80 km track to Lac Abbé. Sunset among limestone chimneys. Night at Lac Abbé camp.',
              fr: 'Route vers Dikhil. 80 km de piste vers le Lac Abbé. Coucher du soleil au milieu des cheminées de calcaire. Nuit au camp du Lac Abbé.'
            }
          },
          {
            day: 10,
            title: {
              en: 'Lac Abbé - Djibouti',
              fr: 'Lac Abbé - Djibouti'
            },
            description: {
              en: 'Sunrise at Lac Abbé. Approach flamingos. Return to Djibouti with lunch at Sunny Hill in Arta. City tour. Night in Djibouti.',
              fr: 'Lever du soleil au Lac Abbé. Approche des flamants. Retour à Djibouti avec déjeuner au Sunny Hill à Arta. Tour de la ville. Nuit à Djibouti.'
            }
          },
          {
            day: 11,
            title: {
              en: 'Moucha or Maskali Islands',
              fr: 'Îles Moucha ou Maskali'
            },
            description: {
              en: 'Boat trip to Moucha or Maskali Islands. Snorkeling and relaxation. Lunch on the island. Return to Djibouti.',
              fr: 'Excursion en bateau vers les îles Moucha ou Maskali. Snorkeling et détente. Déjeuner sur l\'île. Retour à Djibouti.'
            }
          },
          {
            day: 12,
            title: {
              en: 'Relaxing Day in Korambado',
              fr: 'Journée de Détente à Korambado'
            },
            description: {
              en: 'Snorkeling at Korambado. Lunch in a beach hut. Evening transfer to the airport.',
              fr: 'Snorkeling à Korambado. Déjeuner dans une case sur la plage. Transfert en soirée à l\'aéroport.'
            }
          }
        ],
        included: {
          en: ['Airport transfers', 'Private vehicle with driver', 'French/English-speaking guide', 'Full board meals', '1.5 liters of water per day', 'Accommodation: DECAN (1 night), Arta (1 night), Randa (1 night), Day camp (1 night), Dittilou camp (1 night), Ras Ali camp (1 night), Ras Bir camp (1 night), Lac Abbé camp (1 night), Djibouti apartment (3 nights)', 'Snorkeling equipment'],
          fr: ['Transferts aéroport', 'Véhicule privé avec chauffeur', 'Guide francophone/anglophone', 'Pension complète', '1,5 litre d\'eau par jour', 'Hébergement: DECAN (1 nuit), Arta (1 nuit), Randa (1 nuit), camp Day (1 nuit), camp Dittilou (1 nuit), camp Ras Ali (1 nuit), camp Ras Bir (1 nuit), camp Lac Abbé (1 nuit), appartement Djibouti (3 nuits)', 'Équipement de snorkeling']
        },
        excluded: {
          en: ['International flights', 'Visa', 'Travel insurance', 'Alcoholic beverages', 'Tips', 'Scuba diving equipment'],
          fr: ['Vols internationaux', 'Visa', 'Assurance voyage', 'Boissons alcoolisées', 'Pourboires', 'Équipement de plongée']
        },
        whatToBring: {
          en: ['Hiking boots', 'Comfortable walking shoes', 'Swimsuit and towel', 'Snorkeling equipment', 'Sun protection', 'Camera', 'Warm layers', 'Headlamp'],
          fr: ['Chaussures de randonnée', 'Chaussures de marche confortables', 'Maillot de bain et serviette', 'Équipement de snorkeling', 'Protection solaire', 'Appareil photo', 'Vêtements chauds', 'Lampe frontale']
        },
        accommodation: {
          en: 'Mixed: camps, guesthouses, apartments',
          fr: 'Mixte: camps, maisons d\'hôtes, appartements'
        },
        transportation: {
          en: 'Private 4x4 with air conditioning',
          fr: '4x4 privé avec climatisation'
        },
        cancellationPolicy: {
          en: 'Free cancellation up to 30 days before the tour.',
          fr: 'Annulation gratuite jusqu\'à 30 jours avant le circuit.'
        },
        faqs: [
          {
            question: {
              en: 'Is this tour suitable for beginners?',
              fr: 'Ce circuit est-il adapté aux débutants ?'
            },
            answer: {
              en: 'This tour is challenging and best suited for experienced hikers with good fitness.',
              fr: 'Ce circuit est difficile et convient mieux aux randonneurs expérimentés en bonne condition physique.'
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

    for (const tour of tours) {
      const existing = await adminDb.collection('tours')
        .where('slug.en', '==', tour.slug.en)
        .get();

      if (existing.empty) {
        await adminDb.collection('tours').add(tour);
        addedCount++;
        console.log(`✅ Added: ${tour.slug.en}`);
      } else {
        console.log(`⚠️ Already exists: ${tour.slug.en}`);
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