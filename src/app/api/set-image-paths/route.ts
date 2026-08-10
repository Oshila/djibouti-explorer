import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    // Use the actual filenames you already have
    const tourImages: Record<string, { primary: string; gallery: string[] }> = {
      // Your existing images - matching your public folder
      'dittilou-mountain-camp': {
        primary: '/images/tours/dittilou-island-adventure.jpeg',
        gallery: [
          '/images/tours/dittilou-island-adventure-1.jpeg',
          '/images/tours/dittilou-island-adventure-2.jpeg',
          '/images/tours/dittilou-island-adventure-3.jpeg',
          '/images/tours/dittilou-island-adventure-4.jpeg',
        ],
      },
      'lake-assal-lac-abbe': {
        primary: '/images/tours/lac-abbe-ardoukoba.jpeg',
        gallery: [
          '/images/tours/lac-abbe-ardoukoba-1.jpeg',
          '/images/tours/lac-abbe-ardoukoba-2.jpeg',
          '/images/tours/lac-abbe-ardoukoba-3.jpeg',
          '/images/tours/lac-abbe-ardoukoba-4.jpeg',
        ],
      },
      'day-forest-goda-mountains': {
        primary: '/images/tours/day-forest-trek.jpeg',
        gallery: [
          '/images/tours/day-forest-trek-1.jpeg',
          '/images/tours/day-forest-trek-2.jpeg',
          '/images/tours/day-forest-trek-3.jpeg',
          '/images/tours/day-forest-trek-4.jpeg',
        ],
      },
      'moucha-maskali-islands': {
        primary: '/images/tours/moucha-maskali-islands.jpeg',
        gallery: [
          '/images/tours/moucha-maskali-islands-1.jpeg',
          '/images/tours/moucha-maskali-islands-2.jpeg',
          '/images/tours/moucha-maskali-islands-3.jpeg',
          '/images/tours/moucha-maskali-islands-4.jpeg',
        ],
      },
      'seven-brothers-islands': {
        primary: '/images/tours/seven-brothers-islands.jpeg',
        gallery: [
          '/images/tours/seven-brothers-islands-1.jpeg',
          '/images/tours/seven-brothers-islands-2.jpeg',
          '/images/tours/seven-brothers-islands-3.jpeg',
          '/images/tours/seven-brothers-islands-4.jpeg',
        ],
      },
      'tadjourah-sable-blanc': {
        primary: '/images/tours/tadjourah-sable-blanc.jpeg',
        gallery: [
          '/images/tours/tadjourah-sable-blanc-1.jpeg',
          '/images/tours/tadjourah-sable-blanc-2.jpeg',
          '/images/tours/tadjourah-sable-blanc-3.jpeg',
          '/images/tours/tadjourah-sable-blanc-4.jpeg',
        ],
      },
      'djibouti-city-culture-tour': {
        primary: '/images/tours/djibouti-city-culture-tour.jpeg',
        gallery: [
          '/images/tours/djibouti-city-culture-tour-1.jpeg',
          '/images/tours/djibouti-city-culture-tour-2.jpeg',
          '/images/tours/djibouti-city-culture-tour-3.jpeg',
          '/images/tours/djibouti-city-culture-tour-4.jpeg',
        ],
      },
      'whale-shark-adventure': {
        primary: '/images/tours/whale-shark-adventure.jpeg',
        gallery: [
          '/images/tours/whale-shark-adventure-1.jpeg',
          '/images/tours/whale-shark-adventure-2.jpeg',
          '/images/tours/whale-shark-adventure-3.jpeg',
          '/images/tours/whale-shark-adventure-4.jpeg',
        ],
      },
      'lake-assal-discovery': {
        primary: '/images/tours/lake-assal-discovery.jpeg',
        gallery: [
          '/images/tours/lake-assal-discovery-1.jpeg',
          '/images/tours/lake-assal-discovery-2.jpeg',
          '/images/tours/lake-assal-discovery-3.jpeg',
          '/images/tours/lake-assal-discovery-4.jpeg',
        ],
      },
      'ardoukoba-volcano-hike': {
        primary: '/images/tours/ardoukoba-volcano-hike.jpeg',
        gallery: [
          '/images/tours/ardoukoba-volcano-hike-1.jpeg',
          '/images/tours/ardoukoba-volcano-hike-2.jpeg',
          '/images/tours/ardoukoba-volcano-hike-3.jpeg',
          '/images/tours/ardoukoba-volcano-hike-4.jpeg',
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
      }
    }

    return NextResponse.json({
      success: true,
      message: `✅ Updated ${updatedCount} tours with existing image paths!`,
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