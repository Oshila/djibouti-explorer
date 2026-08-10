import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function GET() {
  try {
    const snapshot = await adminDb.collection('tours').get();
    const tours = snapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title?.en || 'Untitled',
      slug: doc.data().slug?.en || 'No slug',
      featured: doc.data().featured || false,
      published: doc.data().published || false,
    }));

    return NextResponse.json({
      success: true,
      count: tours.length,
      tours: tours,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}