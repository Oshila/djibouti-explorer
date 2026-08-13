import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    // Update only the 3 tours with new images
    const tourImages: Record<string, { primary: string; gallery: string[] }> = {
      // 1. Beach & Mountain Tour
      'beach-mountain-tour': {
        primary: '/images/tours/beach-mountain.jpg',
        gallery: [
          '/images/tours/beach-mountain-1.jpg',
          '/images/tours/beach-mountain-2.jpg',
          '/images/tours/beach-mountain-3.jpg',
          '/images/tours/beach-mountain-4.jpg',
        ],
      },
      // 2. Sea, Mountain & Hiking Grand Tour
      'sea-mountain-hiking-grand-tour': {
        primary: '/images/tours/sea-mountain.jpg',
        gallery: [
          '/images/tours/sea-mountain-1.jpg',
          '/images/tours/sea-mountain-2.jpg',
          '/images/tours/sea-mountain-3.jpg',
          '/images/tours/sea-mountain-4.jpg',
        ],
      },
      // 3. Djibouti Animals Tour
      'djibouti-animals-tour': {
        primary: '/images/tours/djibouti-animal-tour.jpg',
        gallery: [
          '/images/tours/djibouti-animal-tour-1.jpg',
          '/images/tours/djibouti-animal-tour-2.jpg',
          '/images/tours/djibouti-animal-tour-3.jpg',
          '/images/tours/djibouti-animal-tour-4.jpg',
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
        console.log(`✅ Updated: ${slug} with new images`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} tours with new images!`,
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