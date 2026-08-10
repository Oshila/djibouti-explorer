import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const snapshot = await adminDb.collection('tours').get();
    let updated = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.published !== false) {
        await adminDb.collection('tours').doc(doc.id).update({
          featured: true,
          updatedAt: new Date().toISOString(),
        });
        updated++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Featured ${updated} tours on homepage!`,
      updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}