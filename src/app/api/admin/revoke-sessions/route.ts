import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export async function GET() {
  try {
    // ⭐ 1. Get all users
    const listUsersResult = await adminAuth.listUsers(100);
    
    if (listUsersResult.users.length === 0) {
      return NextResponse.json({ 
        message: 'No users found',
        revoked: 0 
      });
    }

    const results = [];

    // ⭐ 2. Revoke refresh tokens for each user
    for (const user of listUsersResult.users) {
      try {
        await adminAuth.revokeRefreshTokens(user.uid);
        
        // ⭐ 3. Store revocation timestamp in Firestore for security rules
        const userRecord = await adminAuth.getUser(user.uid);
        const revocationTime = new Date(userRecord.tokensValidAfterTime || 0).getTime() / 1000;
        
        await adminDb.collection('users').doc(user.uid).set({
          revokeTime: revocationTime,
          sessionsRevokedAt: new Date().toISOString(),
        }, { merge: true });

        results.push({
          uid: user.uid,
          email: user.email,
          revoked: true,
        });
      } catch (err) {
        results.push({
          uid: user.uid,
          email: user.email,
          revoked: false,
          error: 'Failed to revoke',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Revoked sessions for ${results.filter(r => r.revoked).length} users`,
      revoked: results.filter(r => r.revoked).length,
      results,
    });

  } catch (error: any) {
    console.error('Error revoking sessions:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to revoke sessions' },
      { status: 500 }
    );
  }
}