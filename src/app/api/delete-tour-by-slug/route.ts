import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({
        success: false,
        message: 'Please provide a slug',
      });
    }

    const snapshot = await adminDb.collection('tours')
      .where('slug.en', '==', slug)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({
        success: false,
        message: 'No tour found with this slug',
      });
    }

    const doc = snapshot.docs[0];
    if (!doc) {
      return NextResponse.json({
        success: false,
        message: 'No tour found with this slug',
      });
    }
    await adminDb.collection('tours').doc(doc.id).delete();

    return NextResponse.json({
      success: true,
      message: `Deleted tour with slug: ${slug}`,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}