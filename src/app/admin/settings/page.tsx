'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import toast from 'react-hot-toast';
import {
  LockClosedIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface SiteSettings {
  whatsappNumber: string;
  contactEmail: string;
  siteName: string;
  baseCurrency: string;
}

export default function AdminSettings() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    whatsappNumber: '+253 77 86 26 39',
    contactEmail: 'info@djiboutiexplorer.com',
    siteName: 'Djibouti Explorer',
    baseCurrency: 'USD',
  });

  // ⭐ Verify Firebase Auth (not localStorage)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/admin/login');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          await signOut(auth);
          router.replace('/admin/login');
          return;
        }

        const role = userDoc.data().role;
        if (role !== 'admin' && role !== 'staff') {
          await signOut(auth);
          router.replace('/admin/login');
          return;
        }

        setCheckingAuth(false);
        await fetchSettings();
      } catch {
        await signOut(auth);
        router.replace('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // ⭐ Fetch settings from Firestore
  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'site');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings((prev) => ({ ...prev, ...docSnap.data() }));
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Save settings to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await setDoc(
        doc(db, 'settings', 'site'),
        {
          ...settings,
          updatedAt: serverTimestamp(),
          updatedBy: auth.currentUser?.uid || 'unknown',
        },
        { merge: true }
      );

      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-teal">Settings</h1>
          <p className="text-nearblack/60">Manage your site settings</p>
        </div>

        {/* Security Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/admin/settings/password"
            className="bg-white rounded-xl shadow-sm border border-cream p-4 hover:shadow-md hover:border-teal/30 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <LockClosedIcon className="w-5 h-5 text-teal" />
              </div>
              <div>
                <h3 className="font-medium text-teal text-sm">Change Password</h3>
                <p className="text-xs text-nearblack/50 mt-0.5">
                  Update your admin password
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/settings/profile"
            className="bg-white rounded-xl shadow-sm border border-cream p-4 hover:shadow-md hover:border-ochre/30 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-ochre/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <UserCircleIcon className="w-5 h-5 text-ochre" />
              </div>
              <div>
                <h3 className="font-medium text-ochre text-sm">Profile</h3>
                <p className="text-xs text-nearblack/50 mt-0.5">
                  Manage your display name
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/settings/security"
            className="bg-white rounded-xl shadow-sm border border-cream p-4 hover:shadow-md hover:border-olive/30 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-olive/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheckIcon className="w-5 h-5 text-olive" />
              </div>
              <div>
                <h3 className="font-medium text-olive text-sm">Security</h3>
                <p className="text-xs text-nearblack/50 mt-0.5">
                  Manage your sessions
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Site Settings Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-cream">
              <Cog6ToothIcon className="w-5 h-5 text-teal" />
              <h2 className="font-heading text-lg text-teal">Site Configuration</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsappNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                  placeholder="+253 77 86 26 39"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, contactEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                  placeholder="info@djiboutiexplorer.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                  placeholder="Djibouti Explorer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-2">
                  Base Currency
                </label>
                <select
                  value={settings.baseCurrency}
                  onChange={(e) =>
                    setSettings({ ...settings, baseCurrency: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="DJF">DJF - Djiboutian Franc</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-cream flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Info */}
        <p className="text-xs text-nearblack/40 text-center mt-6">
          Settings are stored securely in Firestore
        </p>
      </div>
    </div>
  );
}