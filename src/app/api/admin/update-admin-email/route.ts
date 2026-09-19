import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export async function GET() {
  try {
    // 1. Get all users
    const listUsersResult = await adminAuth.listUsers(10);
    
    // 2. Find the user with the old email
    const oldEmail = 'admin@djiboutiexplorer.com';
    const userToUpdate = listUsersResult.users.find(u => u.email === oldEmail);
    
    if (!userToUpdate) {
      return NextResponse.json({ 
        error: 'Admin user not found',
        users: listUsersResult.users.map(u => ({ uid: u.uid, email: u.email }))
      }, { status: 404 });
    }

    // 3. Update email in Firebase Auth
    await adminAuth.updateUser(userToUpdate.uid, {
      email: 'info@djiboutiexplorer.com',
    });

    // 4. Update email in Firestore users collection
    await adminDb.collection('users').doc(userToUpdate.uid).update({
      email: 'info@djiboutiexplorer.com',
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Admin email updated successfully',
      uid: userToUpdate.uid,
      oldEmail: oldEmail,
      newEmail: 'info@djiboutiexplorer.com',
    });

  } catch (error: any) {
    console.error('Error updating admin email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update admin email' },
      { status: 500 }
    );
  }
}