import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Please provide an ID',
      });
    }

    await adminDb.collection('tours').doc(id).delete();

    return NextResponse.json({
      success: true,
      message: `Deleted tour with ID: ${id}`,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}