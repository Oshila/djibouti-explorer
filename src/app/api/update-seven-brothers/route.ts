import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const tour = {
      title: {
        en: 'Seven Brothers Islands Day Trip',
        fr: 'Excursion d\'une Journée aux Sept Frères'
      },
      slug: {
        en: 'seven-brothers-islands-expedition',
        fr: 'excursion-sept-freres'
      },
      shortDescription: {
        en: 'A one-day boat trip to the remote Seven Brothers Islands for snorkeling, seabird watching, and beach exploration.',
        fr: 'Une excursion en bateau d\'une journée vers les îles isolées des Sept Frères pour le snorkeling, l\'observation des oiseaux marins et l\'exploration des plages.'
      },
      description: {
        en: 'The Seven Brothers Islands are a remote archipelago in the Bab-el-Mandeb Strait, known for their dramatic volcanic scenery, seabird colonies, and pristine waters. This one-day trip offers a chance to explore this unique environment, snorkel in crystal-clear waters, and observe the rich marine life and seabirds that inhabit the islands.',
        fr: 'Les Îles des Sept Frères sont un archipel isolé dans le détroit de Bab-el-Mandeb, connu pour ses paysages volcaniques spectaculaires, ses colonies d\'oiseaux marins et ses eaux préservées. Cette excursion d\'une journée offre l\'opportunité d\'explorer cet environnement unique, de faire du snorkeling dans des eaux cristallines et d\'observer la riche vie marine et les oiseaux marins qui habitent les îles.'
      },
      price: 280,
      depositAmount: 56,
      currency: 'USD',
      duration: 1,
      maxGroupSize: 12,
      difficulty: 'easy',
      minAge: 8,
      meetingPoint: {
        en: 'Djibouti City Marina',
        fr: 'Marina de Djibouti Ville'
      },
      images: {
        primary: '/images/tours/seven-brothers-islands.jpeg',
        gallery: [
          '/images/tours/seven-brothers-islands-1.jpeg',
          '/images/tours/seven-brothers-islands-2.jpeg',
          '/images/tours/seven-brothers-islands-3.jpeg',
          '/images/tours/seven-brothers-islands-4.jpeg',
        ],
      },
      destinations: ['Seven Brothers Islands'],
      highlights: {
        en: [
          'Remote volcanic archipelago',
          'Seabird colonies',
          'Snorkeling in pristine waters',
          'White sand beaches',
          'Marine wildlife viewing',
          'Spectacular volcanic scenery'
        ],
        fr: [
          'Archipel volcanique isolé',
          'Colonies d\'oiseaux marins',
          'Snorkeling dans des eaux préservées',
          'Plages de sable blanc',
          'Observation de la vie marine',
          'Paysages volcaniques spectaculaires'
        ]
      },
      itinerary: [
        {
          day: 1,
          title: {
            en: 'Seven Brothers Islands Day Trip',
            fr: 'Excursion d\'une Journée aux Sept Frères'
          },
          description: {
            en: 'Early morning departure from Djibouti City Marina. Cruise to the Seven Brothers Islands archipelago (approx 2-3 hours). Upon arrival, explore the islands, snorkel in pristine waters, and observe seabird colonies. Enjoy a picnic lunch on the beach. Afternoon: Continue exploring the islands and marine life. Return to Djibouti City Marina in the late afternoon.',
            fr: 'Départ tôt le matin de la Marina de Djibouti Ville. Navigation vers l\'archipel des Sept Frères (environ 2-3 heures). À l\'arrivée, explorez les îles, faites du snorkeling dans des eaux préservées et observez les colonies d\'oiseaux marins. Profitez d\'un déjeuner pique-nique sur la plage. Après-midi: Continuez l\'exploration des îles et de la vie marine. Retour à la Marina de Djibouti Ville en fin d\'après-midi.'
          }
        }
      ],
      included: {
        en: [
          'Boat tour',
          'Snorkeling equipment',
          'Picnic lunch',
          'Bottled drinking water',
          'English/French-speaking guide',
          'Marine permits',
          'Site fees'
        ],
        fr: [
          'Tour en bateau',
          'Équipement de snorkeling',
          'Déjeuner pique-nique',
          'Eau potable en bouteille',
          'Guide anglophone/francophone',
          'Permis marins',
          'Frais de site'
        ]
      },
      excluded: {
        en: [
          'International flights',
          'Visa',
          'Travel insurance',
          'Hotel transfers',
          'Personal expenses',
          'Tips',
          'Alcoholic beverages'
        ],
        fr: [
          'Vols internationaux',
          'Visa',
          'Assurance voyage',
          'Transferts hôteliers',
          'Dépenses personnelles',
          'Pourboires',
          'Boissons alcoolisées'
        ]
      },
      whatToBring: {
        en: [
          'Swimsuit',
          'Towel',
          'Sun protection',
          'Hat',
          'Underwater camera',
          'Water shoes',
          'Light clothing'
        ],
        fr: [
          'Maillot de bain',
          'Serviette',
          'Protection solaire',
          'Chapeau',
          'Appareil photo étanche',
          'Chaussures d\'eau',
          'Vêtements légers'
        ]
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
            en: 'Is the Seven Brothers tour suitable for everyone?',
            fr: 'L\'excursion des Sept Frères est-elle adaptée à tous ?'
          },
          answer: {
            en: 'Yes, this is an easy day trip suitable for all ages. Some walking on the islands may be required.',
            fr: 'Oui, c\'est une excursion d\'une journée facile adaptée à tous les âges. Une marche sur les îles peut être nécessaire.'
          }
        },
        {
          question: {
            en: 'Can we see wildlife?',
            fr: 'Peut-on voir des animaux sauvages ?'
          },
          answer: {
            en: 'Yes, you can observe seabirds, marine life, and possibly dolphins or whales during the boat trip.',
            fr: 'Oui, vous pouvez observer des oiseaux marins, la vie marine et éventuellement des dauphins ou des baleines pendant le trajet en bateau.'
          }
        }
      ],
      bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar'],
      categories: ['adventure', 'nature', 'wildlife'],
      tags: ['Seven Brothers', 'Snorkeling', 'Seabirds', 'Islands'],
      metaTitle: {
        en: 'Seven Brothers Islands Day Trip | Djibouti Explorer',
        fr: 'Excursion d\'une Journée aux Sept Frères | Djibouti Explorer'
      },
      metaDescription: {
        en: 'A one-day boat trip to the remote Seven Brothers Islands for snorkeling, seabird watching, and beach exploration.',
        fr: 'Une excursion en bateau d\'une journée vers les îles isolées des Sept Frères pour le snorkeling, l\'observation des oiseaux marins et l\'exploration des plages.'
      },
      rating: 0,
      reviewCount: 0,
      featured: true,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Find and update the Seven Brothers tour
    const snapshot = await adminDb.collection('tours')
      .where('slug.en', '==', 'seven-brothers-islands-expedition')
      .get();

    if (snapshot.empty) {
      // If not found, add it
      await adminDb.collection('tours').add(tour);
      return NextResponse.json({
        success: true,
        message: 'Seven Brothers tour added as a 1-day trip!',
      });
    }

    const doc = snapshot.docs[0];
    if (!doc) {
      return NextResponse.json(
        { success: false, error: 'Tour document not found.' },
        { status: 404 }
      );
    }

    await adminDb.collection('tours').doc(doc.id).update(tour);

    return NextResponse.json({
      success: true,
      message: 'Seven Brothers tour updated to 1 day!',
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}