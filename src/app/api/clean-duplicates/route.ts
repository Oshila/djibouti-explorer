import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const snapshot = await adminDb.collection('tours').get();
    const seen: Record<string, boolean> = {};
    let deleted = 0;
    let kept = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const slug = data.slug?.en;

      if (!slug) {
        await adminDb.collection('tours').doc(doc.id).delete();
        deleted++;
        continue;
      }

      if (seen[slug]) {
        await adminDb.collection('tours').doc(doc.id).delete();
        deleted++;
      } else {
        seen[slug] = true;
        kept++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Kept ${kept} unique tours, deleted ${deleted} duplicates.`,
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