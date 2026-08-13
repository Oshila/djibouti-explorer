import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const tour = {
      title: {
        en: 'Dittilou Mountain Day Trip',
        fr: 'Excursion d\'une Journée à Dittilou'
      },
      slug: {
        en: 'dittilou-mountain-day-trip',
        fr: 'excursion-dittilou-journee'
      },
      shortDescription: {
        en: 'A one-day mountain adventure to the Dittilou camp, featuring a guided hike to a 10-metre waterfall and green monkey sightings.',
        fr: 'Une aventure d\'une journée au camp de Dittilou, avec une randonnée guidée vers une cascade de 10 mètres et l\'observation des singes verts.'
      },
      description: {
        en: 'Escape the desert heat and discover the green mountains of the Goda range. This day tour takes you from Djibouti City to the Dittilou mountain camp, surrounded by cooler mountain air and abundant vegetation. The highlight is a guided hike to a 10-metre waterfall, where you can cool down and enjoy the mountain scenery. Green monkeys are frequently spotted in the area.',
        fr: 'Évadez-vous de la chaleur du désert et découvrez les montagnes vertes du massif du Goda. Cette excursion d\'une journée vous emmène de Djibouti Ville au camp de montagne de Dittilou, entouré d\'air frais et d\'une végétation abondante. Le point culminant est une randonnée guidée vers une cascade de 10 mètres, où vous pourrez vous rafraîchir et profiter du paysage montagneux. Des singes verts sont fréquemment aperçus dans la région.'
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
          primary: '/images/tours/dittilou-island-adventure.jpeg',
          gallery: [
            '/images/tours/dittilou-island-adventure-1.jpeg',
            '/images/tours/dittilou-island-adventure-2.jpeg',
            '/images/tours/dittilou-island-adventure-3.jpeg',
            '/images/tours/dittilou-island-adventure-4.jpeg'
          ]
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
              en: 'Depart Djibouti City early and drive toward the Tadjourah region and the Goda Mountains. The landscape changes from dry desert to greener mountain terrain. Arrive at Dittilou camp and enjoy refreshments. Begin the guided hike to the waterfall, passing through rocky mountain terrain and greener pockets of vegetation. At the waterfall (approx 10m), enjoy the surroundings and take photographs. Green monkeys are frequently encountered in the area. Return to camp for lunch and relaxation before driving back to Djibouti City.',
              fr: 'Départ tôt de Djibouti Ville en direction de la région de Tadjourah et des Monts Goda. Le paysage passe du désert aride à un terrain montagneux plus vert. Arrivée au camp de Dittilou et rafraîchissements. Début de la randonnée guidée vers la cascade, traversant un terrain montagneux rocheux et des poches de végétation plus verte. À la cascade (environ 10 m), profitez des environs et prenez des photos. Des singes verts sont fréquemment rencontrés dans la région. Retour au camp pour le déjeuner et la détente avant de retourner à Djibouti Ville.'
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
            'Required local permits/site fees'
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
            'Permis locaux/frais de site requis'
          ]
        },
        excluded: {
          en: [
            'International flights',
            'Visa',
            'Travel insurance',
            'Accommodation in Djibouti City',
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
          },
          {
            question: {
              en: 'Can we see green monkeys?',
              fr: 'Peut-on voir des singes verts ?'
            },
            answer: {
              en: 'Green monkeys are frequently encountered in the Dittilou area, but wildlife sightings are never guaranteed.',
              fr: 'Les singes verts sont fréquemment rencontrés dans la région de Dittilou, mais les observations d\'animaux sauvages ne sont jamais garanties.'
            }
          }
        ],
        bestSeasons: ['nov', 'dec', 'jan', 'feb', 'mar', 'apr'],
        categories: ['hiking', 'nature', 'adventure'],
        tags: ['Dittilou', 'Mountain', 'Waterfall', 'Trekking', 'Green Monkeys'],
        metaTitle: {
          en: 'Dittilou Mountain Day Trip | Djibouti Explorer',
          fr: 'Excursion d\'une Journée à Dittilou | Djibouti Explorer'
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
      };

    const existing = await adminDb.collection('tours')
      .where('slug.en', '==', 'dittilou-mountain-day-trip')
      .get();

    if (existing.empty) {
      await adminDb.collection('tours').add(tour);
      return NextResponse.json({ success: true, message: 'Dittilou Mountain Day Trip added!' });
    } else {
      const doc = existing.docs[0];
      if (!doc) {
        return NextResponse.json({ success: false, error: 'No document found to update.' }, { status: 404 });
      }
      await adminDb.collection('tours').doc(doc.id).update(tour);
      return NextResponse.json({ success: true, message: 'Dittilou Mountain Day Trip updated!' });
    }
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}