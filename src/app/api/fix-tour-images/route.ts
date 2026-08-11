import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    // Map tour slugs to the actual image filenames you have
    const tourImages: Record<string, { primary: string; gallery: string[] }> = {
      // 1. Seven Brothers Islands Expedition
      'seven-brothers-islands-expedition': {
        primary: '/images/tours/seven-brothers-islands.jpeg',
        gallery: [
          '/images/tours/seven-brothers-islands-1.jpeg',
          '/images/tours/seven-brothers-islands-2.jpeg',
          '/images/tours/seven-brothers-islands-3.jpeg',
          '/images/tours/seven-brothers-islands-4.jpeg',
        ],
      },
      // 2. Djibouti City Culture Tour
      'djibouti-city-culture-tour': {
        primary: '/images/tours/djibouti-city-culture-tour.jpeg',
        gallery: [
          '/images/tours/djibouti-city-culture-tour-1.jpeg',
          '/images/tours/djibouti-city-culture-tour-2.jpeg',
          '/images/tours/djibouti-city-culture-tour-3.jpeg',
          '/images/tours/djibouti-city-culture-tour-4.jpeg',
        ],
      },
      // 3. Dittilou Mountain Camp & Cascade
      'dittilou-mountain-camp-cascade': {
        primary: '/images/tours/dittilou-island-adventure.jpeg',
        gallery: [
          '/images/tours/dittilou-island-adventure-1.jpeg',
          '/images/tours/dittilou-island-adventure-2.jpeg',
          '/images/tours/dittilou-island-adventure-3.jpeg',
          '/images/tours/dittilou-island-adventure-4.jpeg',
        ],
      },
      // 4. Day Forest & Goda Mountains Discovery
      'day-forest-goda-mountains-discovery': {
        primary: '/images/tours/day-forest-trek.jpeg',
        gallery: [
          '/images/tours/day-forest-trek-1.jpeg',
          '/images/tours/day-forest-trek-2.jpeg',
          '/images/tours/day-forest-trek-3.jpeg',
          '/images/tours/day-forest-trek-4.jpeg',
        ],
      },
      // 5. Tadjourah & Sable Blanc Beach
      'tadjourah-sable-blanc-beach': {
        primary: '/images/tours/tadjourah-sable-blanc.jpeg',
        gallery: [
          '/images/tours/tadjourah-sable-blanc-1.jpeg',
          '/images/tours/tadjourah-sable-blanc-2.jpeg',
          '/images/tours/tadjourah-sable-blanc-3.jpeg',
          '/images/tours/tadjourah-sable-blanc-4.jpeg',
        ],
      },
      // 6. Moucha & Maskali Islands
      'moucha-maskali-islands': {
        primary: '/images/tours/moucha-maskali-islands.jpeg',
        gallery: [
          '/images/tours/moucha-maskali-islands-1.jpeg',
          '/images/tours/moucha-maskali-islands-2.jpeg',
          '/images/tours/moucha-maskali-islands-3.jpeg',
          '/images/tours/moucha-maskali-islands-4.jpeg',
        ],
      },
      // 7. Lake Abbé & Lake Assal Expedition
      'lake-abbe-lake-assal-expedition': {
        primary: '/images/tours/lac-abbe-ardoukoba.jpeg',
        gallery: [
          '/images/tours/lac-abbe-ardoukoba-1.jpeg',
          '/images/tours/lac-abbe-ardoukoba-2.jpeg',
          '/images/tours/lac-abbe-ardoukoba-3.jpeg',
          '/images/tours/lac-abbe-ardoukoba-4.jpeg',
        ],
      },
      // 8. Lac Abbé, Ardoukoba & Lake Assal Geological
      'lac-abbe-ardoukoba-lake-assal-geological': {
        primary: '/images/tours/lac-abbe-ardoukoba.jpeg',
        gallery: [
          '/images/tours/lac-abbe-ardoukoba-1.jpeg',
          '/images/tours/lac-abbe-ardoukoba-2.jpeg',
          '/images/tours/lac-abbe-ardoukoba-3.jpeg',
          '/images/tours/lac-abbe-ardoukoba-4.jpeg',
        ],
      },
      // 9. Lake Assal Discovery
      'lake-assal-discovery': {
        primary: '/images/tours/lake-assal-discovery.jpeg',
        gallery: [
          '/images/tours/lake-assal-discovery-1.jpeg',
          '/images/tours/lake-assal-discovery-2.jpeg',
          '/images/tours/lake-assal-discovery-3.jpeg',
          '/images/tours/lake-assal-discovery-4.jpeg',
        ],
      },
      // 10. Whale Shark Adventure
      'whale-shark-adventure': {
        primary: '/images/tours/whale-shark-adventure.jpeg',
        gallery: [
          '/images/tours/whale-shark-adventure-1.jpeg',
          '/images/tours/whale-shark-adventure-2.jpeg',
          '/images/tours/whale-shark-adventure-3.jpeg',
          '/images/tours/whale-shark-adventure-4.jpeg',
        ],
      },
      // 11. Day Forest Trek
      'day-forest-trek': {
        primary: '/images/tours/day-forest-trek.jpeg',
        gallery: [
          '/images/tours/day-forest-trek-1.jpeg',
          '/images/tours/day-forest-trek-2.jpeg',
          '/images/tours/day-forest-trek-3.jpeg',
          '/images/tours/day-forest-trek-4.jpeg',
        ],
      },
      // 12. Djibouti City & Lake Assal Discovery
      'djibouti-city-lake-assal-discovery': {
        primary: '/images/tours/lake-assal-discovery.jpeg',
        gallery: [
          '/images/tours/lake-assal-discovery-1.jpeg',
          '/images/tours/lake-assal-discovery-2.jpeg',
          '/images/tours/lake-assal-discovery-3.jpeg',
          '/images/tours/lake-assal-discovery-4.jpeg',
        ],
      },
      // 13. Lake Abbé, Lake Assal, Tadjourah & Sable Blanc
      'lake-abbe-lake-assal-tadjourah-sable-blanc': {
        primary: '/images/tours/tadjourah-sable-blanc.jpeg',
        gallery: [
          '/images/tours/tadjourah-sable-blanc-1.jpeg',
          '/images/tours/tadjourah-sable-blanc-2.jpeg',
          '/images/tours/tadjourah-sable-blanc-3.jpeg',
          '/images/tours/tadjourah-sable-blanc-4.jpeg',
        ],
      },
      // 14. Lake Assal, Tadjourah & Day Forest
      'lake-assal-tadjourah-day-forest': {
        primary: '/images/tours/day-forest-trek.jpeg',
        gallery: [
          '/images/tours/day-forest-trek-1.jpeg',
          '/images/tours/day-forest-trek-2.jpeg',
          '/images/tours/day-forest-trek-3.jpeg',
          '/images/tours/day-forest-trek-4.jpeg',
        ],
      },
      // 15. Moucha Island + Lake Abbé + Lake Assal
      'moucha-island-lake-abbe-lake-assal': {
        primary: '/images/tours/moucha-maskali-islands.jpeg',
        gallery: [
          '/images/tours/moucha-maskali-islands-1.jpeg',
          '/images/tours/moucha-maskali-islands-2.jpeg',
          '/images/tours/moucha-maskali-islands-3.jpeg',
          '/images/tours/moucha-maskali-islands-4.jpeg',
        ],
      },
      // 16. Whale Shark + Lake Assal Full-Day
      'whale-shark-lake-assal-full-day': {
        primary: '/images/tours/whale-shark-adventure.jpeg',
        gallery: [
          '/images/tours/whale-shark-adventure-1.jpeg',
          '/images/tours/whale-shark-adventure-2.jpeg',
          '/images/tours/whale-shark-adventure-3.jpeg',
          '/images/tours/whale-shark-adventure-4.jpeg',
        ],
      },
      // 17. Tadjourah, Sable Blanc & Day Forest
      'tadjourah-sable-blanc-day-forest': {
        primary: '/images/tours/tadjourah-sable-blanc.jpeg',
        gallery: [
          '/images/tours/tadjourah-sable-blanc-1.jpeg',
          '/images/tours/tadjourah-sable-blanc-2.jpeg',
          '/images/tours/tadjourah-sable-blanc-3.jpeg',
          '/images/tours/tadjourah-sable-blanc-4.jpeg',
        ],
      },
    };

    const snapshot = await adminDb.collection('tours').get();
    let updatedCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const slug = data.slug?.en;
      
      if (slug && tourImages[slug]) {
        await adminDb.collection('tours').doc(doc.id).update({
          images: tourImages[slug],
          updatedAt: new Date().toISOString(),
        });
        updatedCount++;
        console.log(`✅ Updated: ${slug}`);
      } else {
        console.log(`⚠️ No mapping for: ${slug}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} tours with images!`,
      updatedCount,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}