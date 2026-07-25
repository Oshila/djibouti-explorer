import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app: App | undefined;

// Initialize Firebase Admin only once
if (!getApps().length) {
  try {
    // For Vercel, use environment variables
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ?.replace(/\\n/g, '\n')
      .replace(/"/g, '');

    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    console.log('✅ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin:', error);
  }
}

const adminAuth = getAuth();
const adminDb = getFirestore();

export { adminAuth, adminDb };