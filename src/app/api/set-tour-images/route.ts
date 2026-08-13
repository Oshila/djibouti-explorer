import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    // Map tour slugs to their image paths
    const tourImages: Record<string, { primary: string; gallery: string[] }> = {
      // 1. Lake Abbé & Lake Assal Expedition
      'lake-abbe-lake-assal-expedition': {
        primary: '/images/tours/lac-abbe-ardoukoba.jpeg',
        gallery: [
          '/images/tours/lac-abbe-ardoukoba-1.jpeg',
          '/images/tours/lac-abbe-ardoukoba-2.jpeg',
          '/images/tours/lac-abbe-ardoukoba-3.jpeg',
          '/images/tours/lac-abbe-ardoukoba-4.jpeg',
        ],
      },
      // 2. Moucha & Maskali Islands
      'moucha-maskali-islands': {
        primary: '/images/tours/moucha-maskali-islands.jpeg',
        gallery: [
          '/images/tours/moucha-maskali-islands-1.jpeg',
          '/images/tours/moucha-maskali-islands-2.jpeg',
          '/images/tours/moucha-maskali-islands-3.jpeg',
          '/images/tours/moucha-maskali-islands-4.jpeg',
        ],
      },
      // 3. Seven Brothers Islands Day Trip
      'seven-brothers-islands-expedition': {
        primary: '/images/tours/seven-brothers-islands.jpeg',
        gallery: [
          '/images/tours/seven-brothers-islands-1.jpeg',
          '/images/tours/seven-brothers-islands-2.jpeg',
          '/images/tours/seven-brothers-islands-3.jpeg',
          '/images/tours/seven-brothers-islands-4.jpeg',
        ],
      },
      // 4. Tadjourah, Sable Blanc & Day Forest
      'tadjourah-sable-blanc-day-forest': {
        primary: '/images/tours/tadjourah-sable-blanc.jpeg',
        gallery: [
          '/images/tours/tadjourah-sable-blanc-1.jpeg',
          '/images/tours/tadjourah-sable-blanc-2.jpeg',
          '/images/tours/tadjourah-sable-blanc-3.jpeg',
          '/images/tours/tadjourah-sable-blanc-4.jpeg',
        ],
      },
      // 5. Djalelo & Lac Abbé (using Ardoukoba images - only 2 available)
      'djalelo-lac-abbe-adventure': {
        primary: '/images/tours/ardoukoba-volcano-hike-1.jpeg',
        gallery: [
          '/images/tours/ardoukoba-volcano-hike-2.jpeg',
          // Reuse lac-abbe images since we don't have more
          '/images/tours/lac-abbe-ardoukoba.jpeg',
          '/images/tours/lac-abbe-ardoukoba-1.jpeg',
        ],
      },
      // 6. Djibouti, Lac Abbé & Lac Assal
      'djibouti-lac-abbe-lac-assal-tour': {
        primary: '/images/tours/lake-assal-discovery.jpeg',
        gallery: [
          '/images/tours/lake-assal-discovery-1.jpeg',
          '/images/tours/lake-assal-discovery-2.jpeg',
          '/images/tours/lac-abbe-ardoukoba.jpeg',
          '/images/tours/djibouti-city-culture-tour.jpeg',
        ],
      },
      // 7. Djibouti Animals Tour
      'djibouti-animals-tour': {
        primary: '/images/tours/djibouti-city-culture-tour.jpeg',
        gallery: [
          '/images/tours/djibouti-city-culture-tour-1.jpeg',
          '/images/tours/djibouti-city-culture-tour-2.jpeg',
          '/images/tours/djibouti-city-culture-tour-3.jpeg',
          '/images/tours/djibouti-city-culture-tour-4.jpeg',
        ],
      },
      // 8. Allols Discovery Tour
      'allols-discovery-tour': {
        primary: '/images/tours/dittilou-island-adventure.jpeg',
        gallery: [
          '/images/tours/dittilou-island-adventure-1.jpeg',
          '/images/tours/dittilou-island-adventure-2.jpeg',
          '/images/tours/dittilou-island-adventure-3.jpeg',
          '/images/tours/dittilou-island-adventure-4.jpeg',
        ],
      },
      // 9. Beach & Mountain Tour
      'beach-mountain-tour': {
        primary: '/images/tours/day-forest-trek.jpeg',
        gallery: [
          '/images/tours/day-forest-trek-1.jpeg',
          '/images/tours/day-forest-trek-2.jpeg',
          '/images/tours/day-forest-trek-3.jpeg',
          '/images/tours/day-forest-trek-4.jpeg',
        ],
      },
      // 10. Sea, Mountain & Hiking Grand Tour
      'sea-mountain-hiking-grand-tour': {
        primary: '/images/tours/whale-shark-adventure.jpeg',
        gallery: [
          '/images/tours/whale-shark-adventure-1.jpeg',
          '/images/tours/whale-shark-adventure-2.jpeg',
          '/images/tours/whale-shark-adventure-3.jpeg',
          '/images/tours/whale-shark-adventure-4.jpeg',
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