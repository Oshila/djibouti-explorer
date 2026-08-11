import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const snapshot = await adminDb.collection('tours').get();
    const seen: Record<string, string> = {};
    let deleted = 0;
    let kept = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const slug = data.slug?.en;

      if (!slug) {
        // Delete tours without a slug
        await adminDb.collection('tours').doc(doc.id).delete();
        deleted++;
        continue;
      }

      if (seen[slug]) {
        // This is a duplicate - delete it
        await adminDb.collection('tours').doc(doc.id).delete();
        deleted++;
        console.log(`🗑️ Deleted duplicate: ${slug}`);
      } else {
        seen[slug] = doc.id;
        kept++;
        console.log(`✅ Kept: ${slug}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Kept ${kept} unique tours, deleted ${deleted} duplicates.`,
      kept,
      deleted,
      uniqueTours: Object.keys(seen),
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}