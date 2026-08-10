import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    // Find Seven Brothers Islands by slug
    const snapshot = await adminDb.collection('tours')
      .where('slug.en', '==', 'seven-brothers-islands')
      .get();

    if (snapshot.empty) {
      return NextResponse.json({
        success: false,
        message: 'Tour not found',
      });
    }

    const doc = snapshot.docs[0]!; // non-null assertion: snapshot.empty checked above
    await adminDb.collection('tours').doc(doc.id).update({
      featured: true,
      published: true,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Seven Brothers Islands is now featured!',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}