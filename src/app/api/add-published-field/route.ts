import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const snapshot = await adminDb.collection('tours').get();
    let updatedCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      // If published field doesn't exist, add it
      if (!('published' in data)) {
        await adminDb.collection('tours').doc(doc.id).update({
          published: true,
          updatedAt: new Date().toISOString()
        });
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Added published: true to ${updatedCount} tours`,
      updatedCount
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}