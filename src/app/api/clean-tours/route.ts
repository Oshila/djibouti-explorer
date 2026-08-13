import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

// List of tours to KEEP
const KEEP_TOURS = [
  'lake-abbe-lake-assal-expedition',      // Lake Abbé & Lake Assal (2 days)
  'moucha-maskali-islands',               // Moucha & Maskali (1 day)
  'seven-brothers-islands-expedition',    // Seven Brothers (will be updated to 1 day)
  'tadjourah-sable-blanc-day-forest',     // Tadjourah, Sable Blanc & Day Forest (3 days)
];

export async function POST() {
  try {
    const snapshot = await adminDb.collection('tours').get();
    let deleted = 0;
    let kept = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const slug = data.slug?.en;

      if (KEEP_TOURS.includes(slug)) {
        kept++;
        console.log(`✅ Keeping: ${slug}`);
      } else {
        await adminDb.collection('tours').doc(doc.id).delete();
        deleted++;
        console.log(`🗑️ Deleted: ${slug || 'unknown'}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Kept ${kept} tours, deleted ${deleted} tours.`,
      kept,
      deleted,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}