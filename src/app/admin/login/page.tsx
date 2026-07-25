'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (email === 'admin@djiboutiexplorer.com' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin');
    } else {
      setError('Invalid email or password');
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
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none"
                placeholder="admin@djiboutiexplorer.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-terracotta text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal hover:bg-teal/90 text-white py-3 rounded-xl font-medium transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-xs text-nearblack/40">
          <p>Demo: admin@djiboutiexplorer.com / admin123</p>
        </div>
      </div>
    </div>
  );
}