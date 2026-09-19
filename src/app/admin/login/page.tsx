'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import { LockClosedIcon, EnvelopeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  //  Silent auth check - no info leaks
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            if (role === 'admin' || role === 'staff') {
              router.replace('/admin');
              return;
            }
          }
        } catch {
          //  Silent fail - no console output
        }
        await signOut(auth);
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    //  Basic input validation (prevents empty submissions)
    if (!email.trim() || !password.trim()) {
      setError('Please enter your credentials');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );
      const user = userCredential.user;

      //  Check role silently
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (!userDoc.exists()) {
        await signOut(auth);
        //  Generic error - doesn't reveal if user exists
        setError('Invalid credentials or insufficient permissions.');
        setLoading(false);
        return;
      }

      const role = userDoc.data().role;

      if (role !== 'admin' && role !== 'staff') {
        await signOut(auth);
        //  Same generic error - no role disclosure
        setError('Invalid credentials or insufficient permissions.');
        setLoading(false);
        return;
      }

      //  Success
      router.replace('/admin');
    } catch (err: any) {
      //  Generic error for ALL failures - no information leaks
      // Never reveal: user-not-found vs wrong-password vs invalid-credential
      setError('Invalid credentials or insufficient permissions.');
      setLoading(false);

      //  DO NOT log error details - even in dev mode
      // No console.log or console.error here
    }
  };

  //  Prevent showing login form while checking auth
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal/5 via-cream to-terracotta/5">
        <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal/5 via-cream to-terracotta/5 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading text-teal">Djibouti Explorer</h1>
          <p className="text-sm text-nearblack/50 mt-1 tracking-wide uppercase">
            Admin Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-cream/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-teal" />
            </div>
            <h2 className="text-xl font-heading text-teal">Secure Access</h2>
            <p className="text-xs text-nearblack/50 mt-1">
              Authorized personnel only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-2">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nearblack/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/20"
                  placeholder=""
                  autoComplete="email"
                  required
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-2">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nearblack/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/20"
                  placeholder=""
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {/* Error - Generic message only */}
            {error && (
              <div className="bg-terracotta/10 border border-terracotta/20 rounded-xl p-3.5 animate-fade-in">
                <p className="text-sm text-terracotta text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal hover:bg-teal/90 text-white py-3.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-cream">
            <div className="flex items-center justify-center gap-2 text-xs text-nearblack/40">
              <LockClosedIcon className="w-3.5 h-3.5" />
              <span>Secured with 256-bit encryption</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-nearblack/30 mt-6">
          © {new Date().getFullYear()} Djibouti Explorer
        </p>
      </div>
    </div>
  );
}