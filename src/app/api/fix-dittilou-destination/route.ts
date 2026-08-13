import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    // Update Dittilou Mountain Day Trip
    const snapshot = await adminDb.collection('tours')
      .where('slug.en', '==', 'dittilou-mountain-day-trip')
      .get();

    if (snapshot.empty) {
      return NextResponse.json({
        success: false,
        message: 'Dittilou tour not found',
      });
    }

    const doc = snapshot.docs[0];
    if (!doc) {
      return NextResponse.json({
        success: false,
        message: 'Dittilou tour document not found',
      });
    }
    await adminDb.collection('tours').doc(doc.id).update({
      destinations: ['Dittilou', 'Goda Mountains'],
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: '✅ Updated Dittilou tour destinations!',
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}