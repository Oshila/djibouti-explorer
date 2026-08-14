import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const tour = {
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
        en: 'The Allols are one of the most amazing places in Djibouti, and very few people visit them because they are quite remote. This 6-day tour takes you to this hidden paradise with its unique landscapes, wildlife, and cultural encounters. If the necessary authorizations for access to Les Allols have not been obtained, the visit to the Allols will be replaced by a stay in Daffeynaytou.',
        fr: 'Les Allols sont l\'un des endroits les plus étonnants de Djibouti, et très peu de personnes les visitent car ils sont assez éloignés. Ce circuit de 6 jours vous emmène dans ce paradis caché avec ses paysages uniques, sa faune et ses rencontres culturelles. Si les autorisations nécessaires pour l\'accès aux Allols n\'ont pas été obtenues, la visite des Allols sera remplacée par un séjour à Daffeynaytou.'
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
        primary: '/images/tours/dittilou-island-adventure.jpeg',
        gallery: [
          '/images/tours/dittilou-island-adventure-1.jpeg',
          '/images/tours/dittilou-island-adventure-2.jpeg',
          '/images/tours/dittilou-island-adventure-3.jpeg',
          '/images/tours/dittilou-island-adventure-4.jpeg'
        ]
      },
      destinations: ['Allols', 'Djibouti City', 'Lake Assal', 'Tadjourah', 'Ras Ali'],
      highlights: {
        en: [
          'DECAN animal refuge visit',
          'Legendary Lake Assal',
          'Tadjourah White City',
          'Remote Allols region',
          'Ras Ali snorkeling',
          'Traditional village encounters',
          'Korambado beach day'
        ],
        fr: [
          'Visite du refuge animalier DECAN',
          'Légendaire Lac Assal',
          'Ville Blanche de Tadjourah',
          'Région isolée des Allols',
          'Snorkeling à Ras Ali',
          'Rencontres avec les villages traditionnels',
          'Journée à la plage de Korambado'
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
            en: 'Arrival Djibouti City – Transfer from the airport to your accommodation. Our local agency puts a comfortable and air-conditioned apartment at your disposal to spend the night there and have breakfast prepared according to your wishes. Naturally, if you prefer, hotel accommodation can be booked. Lunch at the restaurant at the port of Djibouti. Afternoon: visit the DECAN refuge. This is an animal park near Djibouti, where animals from Djibouti and also from other parts of Africa live. Evening meal: restaurant in Djibouti. Night: in our apartment or hotel.',
            fr: 'Arrivée Djibouti Ville – Transfert de l\'aéroport à votre hébergement. Notre agence locale met à votre disposition un appartement confortable et climatisé pour y passer la nuit et prendre un petit-déjeuner préparé selon vos souhaits. Naturellement, si vous préférez, un hébergement à l\'hôtel peut être réservé. Déjeuner au restaurant du port de Djibouti. Après-midi: visite du refuge DECAN. Il s\'agit d\'un parc animalier près de Djibouti, où vivent des animaux de Djibouti et d\'autres régions d\'Afrique. Repas du soir: restaurant à Djibouti. Nuit: dans notre appartement ou à l\'hôtel.'
          }
        },
        {
          day: 2,
          title: {
            en: 'From Djibouti to Tadjourah via Lake Assal',
            fr: 'De Djibouti à Tadjourah via le Lac Assal'
          },
          description: {
            en: 'Morning: departure from Djibouti early in the morning. About forty km before reaching Lake Assal, we will stop to admire the grandiose landscape of the Dimbiya Canyon nicknamed the "Grand Canyon of Djibouti" …. A few kilometers further on, another stop at the stele of J. Borrel, a French magistrate whose partly charred body was found at the bottom of the cliff on the morning of October 18, 1995. "The Borrel affair" poisoned relations for a few years between the Djiboutian and French states. Located 153 meters below sea level, Lake Assal is one of the saltiest in the world (more than 300 grams of salt per liter of water). This fact, added to the very high evaporation due to the intense heat that reigns there, explains why salt has been mined here for hundreds of years. No living organism can survive in the waters of Lake Assal. If the weather is right, we can swim there; plastic shoes are necessary to avoid injury from the sharp salt crystals. The very high temperatures that prevail in this place do not make it very hospitable, but its legendary beauty, described by the adventurer writer J. Kessel, makes it an unmissable site. Lunch: picnic on the beach at Goubet in the shade of a hard pitch, facing Devil\'s Island. Afternoon: we will visit the lava field located between Assal and Goubet, where we will observe the fault of the rift over a few meters, which at this place is only a few centimeters wide. Evening meal and night at Hotel Golfe in Tadjourah.',
            fr: 'Matin: départ de Djibouti tôt le matin. Environ quarante kilomètres avant d\'atteindre le Lac Assal, nous nous arrêterons pour admirer le paysage grandiose du canyon de Dimbiya surnommé le "Grand Canyon de Djibouti" …. Quelques kilomètres plus loin, un autre arrêt à la stèle de J. Borrel, un magistrat français dont le corps partiellement calciné a été retrouvé au fond de la falaise le matin du 18 octobre 1995. "L\'affaire Borrel" a empoisonné les relations pendant quelques années entre les États djiboutien et français. Situé à 153 mètres sous le niveau de la mer, le Lac Assal est l\'un des plus salés du monde (plus de 300 grammes de sel par litre d\'eau). Ce fait, ajouté à la très forte évaporation due à la chaleur intense qui y règne, explique pourquoi le sel y est exploité depuis des centaines d\'années. Aucun organisme vivant ne peut survivre dans les eaux du Lac Assal. Si le temps le permet, nous pouvons nous y baigner; des chaussures en plastique sont nécessaires pour éviter les blessures causées par les cristaux de sel coupants. Les très hautes températures qui règnent en ce lieu ne le rendent pas très hospitalier, mais sa beauté légendaire, décrite par l\'écrivain-aventurier J. Kessel, en fait un site incontournable. Déjeuner: pique-nique sur la plage de Goubet à l\'ombre d\'un hard pitch, face à l\'île du Diable. Après-midi: nous visiterons le champ de lave situé entre Assal et Goubet, où nous observerons la faille du rift sur quelques mètres, qui à cet endroit n\'a que quelques centimètres de large. Repas du soir et nuit à l\'Hôtel Golfe à Tadjourah.'
          }
        },
        {
          day: 3,
          title: {
            en: 'Departure for LES ALLOLS',
            fr: 'Départ pour LES ALLOLS'
          },
          description: {
            en: 'Morning: Visit the city of Tadjourah then departure to Bolli. Lunch with Daoud\'s family in Bolli. Afternoon: Journey to Allols or departure from Daffeynaytou if Allols authorization is not obtained. Bivouac in Les Allols or night in Daffeynaytou.',
            fr: 'Matin: Visite de la ville de Tadjourah puis départ pour Bolli. Déjeuner avec la famille de Daoud à Bolli. Après-midi: Route vers les Allols ou départ de Daffeynaytou si l\'autorisation pour les Allols n\'est pas obtenue. Bivouac aux Allols ou nuit à Daffeynaytou.'
          }
        },
        {
          day: 4,
          title: {
            en: 'From ALLOLS to the Ras Ali Camp by the Sea',
            fr: 'Des ALLOLS au Camp de Ras Ali au Bord de la Mer'
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
            en: 'Relaxing Day in Korambado - 15 km',
            fr: 'Journée de Détente à Korambado - 15 km'
          },
          description: {
            en: 'Snorkeling on the program for this day. Lunch in a hut on the beach. You need a good 4x4 vehicle to get down to Korambado. Not far from Djibouti, the site is interesting for the practice of snorkeling (east side). A few "local color" huts, installed by the sea, provide the shade and the meal necessary to spend a very pleasant day there. Evening meal at the restaurant in Djibouti. On the menu Yemeni fish, the fish that you choose yourself, is cut into two slices and placed in a circular oven…. Evening transfer to Djibouti airport.',
            fr: 'Snorkeling au programme pour cette journée. Déjeuner dans une case sur la plage. Il faut un bon véhicule 4x4 pour descendre à Korambado. Non loin de Djibouti, le site est intéressant pour la pratique du snorkeling (côté est). Quelques cases "couleur locale", installées au bord de la mer, procurent l\'ombre et le repas nécessaires pour y passer une journée très agréable. Repas du soir au restaurant à Djibouti. Au menu le poisson yéménite, le poisson que vous choisissez vous-même, est coupé en deux tranches et placé dans un four circulaire…. Transfert en soirée à l\'aéroport de Djibouti.'
          }
        }
      ],
      included: {
        en: [
          'Transfer to/from the airport',
          'Private vehicle with driver and all transports within the country (ferry...)',
          'Services of guides qualified in French or English during the whole voyage',
          'Full board meal; meals at the restaurant are included for a fixed price',
          'One and a half liters of water per day per person',
          'Accommodation in a double room at the hotel in Djibouti city, or in the apartment of our local agency according to your choice'
        ],
        fr: [
          'Transfert à/et de l\'aéroport',
          'Véhicule privé avec chauffeur et tous les transports dans le pays (ferry...)',
          'Services de guides qualifiés en français ou en anglais pendant tout le voyage',
          'Pension complète; les repas au restaurant sont inclus pour un prix fixe',
          'Un litre et demi d\'eau par jour par personne',
          'Hébergement en chambre double à l\'hôtel à Djibouti ville, ou dans l\'appartement de notre agence locale selon votre choix'
        ]
      },
      excluded: {
        en: [
          'International flights and visa',
          'Alcoholic beverages',
          'Medical expense insurance or medical repatriation',
          'Tips'
        ],
        fr: [
          'Vols internationaux et visa',
          'Boissons alcoolisées',
          'Assurance frais médicaux ou rapatriement médical',
          'Pourboires'
        ]
      },
      whatToBring: {
        en: [
          'Comfortable walking shoes',
          'Hiking shoes',
          'Swimsuit and towel',
          'Snorkeling equipment (if you have your own)',
          'Sun protection (hat, sunscreen, sunglasses)',
          'Camera',
          'Warm layers for evening',
          'Water bottle',
          'Flashlight'
        ],
        fr: [
          'Chaussures de marche confortables',
          'Chaussures de randonnée',
          'Maillot de bain et serviette',
          'Équipement de snorkeling (si vous en avez)',
          'Protection solaire (chapeau, crème solaire, lunettes)',
          'Appareil photo',
          'Vêtements chauds pour le soir',
          'Bouteille d\'eau',
          'Lampe torche'
        ]
      },
      accommodation: {
        en: 'Mixed accommodation: apartment/hotel, hotel, bivouac/camp, camp, hotel/apartment',
        fr: 'Hébergement mixte: appartement/hôtel, hôtel, bivouac/camp, camp, hôtel/appartement'
      },
      transportation: {
        en: 'Private 4x4 with air conditioning, ferry where applicable',
        fr: '4x4 privé avec climatisation, ferry le cas échéant'
      },
      cancellationPolicy: {
        en: 'Our agency is insured for the reimbursement of payments made before the start of the stay, in the event of default by the agency. In addition, we contractually undertake to reimburse any payment in the event of trip cancellation due to a pandemic, except expenses advanced on your behalf, not reimbursed to the agency. In the latter case, a credit note of an amount identical to that of our supplier may be sent to you.',
        fr: 'Notre agence est assurée pour le remboursement des paiements effectués avant le début du séjour, en cas de défaillance de l\'agence. De plus, nous nous engageons contractuellement à rembourser tout paiement en cas d\'annulation de voyage due à une pandémie, à l\'exception des frais avancés pour votre compte, non remboursés à l\'agence. Dans ce dernier cas, un avoir d\'un montant identique à celui de notre fournisseur pourra vous être adressé.'
      },
      faqs: [
        {
          question: {
            en: 'What are the Allols?',
            fr: 'Que sont les Allols ?'
          },
          answer: {
            en: 'The Allols are one of the most amazing and remote places in Djibouti, known for unique landscapes and traditional villages. If the necessary authorizations for access to Les Allols have not been obtained, the visit will be replaced by a stay in Daffeynaytou.',
            fr: 'Les Allols sont l\'un des endroits les plus étonnants et isolés de Djibouti, connus pour leurs paysages uniques et leurs villages traditionnels. Si les autorisations nécessaires pour l\'accès aux Allols n\'ont pas été obtenues, la visite sera remplacée par un séjour à Daffeynaytou.'
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
      tags: ['Allols', 'DECAN', 'Tadjourah', 'Ras Ali', 'Korambado'],
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
    };

    // Check if tour exists
    const existing = await adminDb.collection('tours')
      .where('slug.en', '==', 'allols-discovery-tour')
      .get();

    if (existing.empty) {
      await adminDb.collection('tours').add(tour);
      return NextResponse.json({
        success: true,
        message: '✅ Allols Discovery Tour added with exact itinerary!',
      });
    } else {
      const doc = existing.docs[0];
      if (doc) {
        await adminDb.collection('tours').doc(doc.id).update(tour);
      }
      return NextResponse.json({
        success: true,
        message: '✅ Allols Discovery Tour updated with exact itinerary!',
      });
    }
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}