'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === 'admin' || userData.role === 'staff') {
              router.push('/admin');
              return;
            }
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
        await signOut(auth);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Attempt to sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user has admin role in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin' || userData.role === 'staff') {
          router.push('/admin');
          return;
        }
      }

      // If not admin, sign out and show error
      await signOut(auth);
      setError('You do not have admin access. Please contact support.');
      setLoading(false);
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Better error messages
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading text-teal">Djibouti Explorer</h1>
          <p className="text-nearblack/60 mt-1">Admin Login</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none"
                placeholder="admin@djiboutiexplorer.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-terracotta text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-cream">
          <div className="text-center text-xs text-nearblack/40">
            <p>Default admin credentials:</p>
            <p className="font-mono bg-cream p-2 rounded-lg mt-1 text-nearblack/60">
              admin@djiboutiexplorer.com / Admin123!
            </p>
            <p className="mt-2 text-2xs">First time? Create an admin user in Firebase Console</p>
          </div>
        </div>
      </div>
    </div>
  );
}