'use client';

import { useEffect, useState } from 'react';

export default function AdminSettings() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [settings, setSettings] = useState({
    whatsappNumber: '+253 77 XX XX XX',
    contactEmail: 'info@djiboutiexplorer.com',
    siteName: 'Djibouti Explorer',
    baseCurrency: 'USD',
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setAuthenticated(true);
    } else {
      window.location.href = '/admin/login';
    }
  }, []);

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved! (Will connect to Firebase later)');
  };

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-teal">Settings</h1>
          <p className="text-nearblack/60">Manage your site settings</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Base Currency</label>
                <select
                  value={settings.baseCurrency}
                  onChange={(e) => setSettings({ ...settings, baseCurrency: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="DJF">DJF</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}