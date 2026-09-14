'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  CreditCardIcon, 
  CurrencyDollarIcon,
  DocumentTextIcon,
  ClockIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface VisaSettings {
  price: number;
  currency: string;
  processingTime: string;
  description: string;
  isActive: boolean;
  updatedAt: any;
}

export default function AdminVisaSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<VisaSettings>({
    price: 23,
    currency: 'USD',
    processingTime: '24-48 hours',
    description: 'Official visa invitation letter for Djibouti',
    isActive: true,
    updatedAt: null,
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'visa');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data() as VisaSettings);
      }
    } catch (error) {
      console.error('Error fetching visa settings:', error);
      toast.error('Failed to load visa settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, 'settings', 'visa');
      await setDoc(docRef, {
        ...settings,
        updatedAt: serverTimestamp(),
      });
      toast.success('Visa settings saved successfully!');
      setEditing(false);
      fetchSettings();
    } catch (error) {
      console.error('Error saving visa settings:', error);
      toast.error('Failed to save visa settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading visa settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading text-teal">Visa Settings</h1>
          <p className="text-nearblack/60">Manage visa invitation letter settings and pricing</p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-teal hover:bg-teal/90 text-white px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg flex items-center gap-2"
          >
            <PencilIcon className="w-5 h-5" />
            Edit Settings
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditing(false);
                fetchSettings();
              }}
              className="border border-cream text-nearblack/60 px-4 py-2 rounded-lg font-medium hover:bg-cream transition"
            >
              Cancel
            </button>
            <button
              onClick={saveSettings}
              disabled={saving}
              className="bg-olive hover:bg-olive/90 text-white px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Price Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-cream">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-nearblack/50 text-sm mb-1">
                <CurrencyDollarIcon className="w-4 h-4" />
                Price
              </div>
              {editing ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    value={settings.price}
                    onChange={(e) => setSettings({ ...settings, price: parseFloat(e.target.value) })}
                    className="w-24 px-3 py-1 border border-cream rounded-lg focus:border-teal outline-none text-xl font-bold text-teal"
                    min="0"
                    step="0.01"
                  />
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="px-2 py-1 border border-cream rounded-lg focus:border-teal outline-none text-sm"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              ) : (
                <div className="text-2xl font-bold text-teal">
                  ${settings.price} {settings.currency}
                </div>
              )}
            </div>
            <CreditCardIcon className="w-8 h-8 text-teal/20" />
          </div>
        </div>

        {/* Processing Time Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-cream">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-nearblack/50 text-sm mb-1">
                <ClockIcon className="w-4 h-4" />
                Processing Time
              </div>
              {editing ? (
                <input
                  type="text"
                  value={settings.processingTime}
                  onChange={(e) => setSettings({ ...settings, processingTime: e.target.value })}
                  className="w-full px-3 py-1 border border-cream rounded-lg focus:border-teal outline-none text-lg font-medium text-teal"
                  placeholder="e.g. 24-48 hours"
                />
              ) : (
                <div className="text-lg font-medium text-teal">{settings.processingTime}</div>
              )}
            </div>
            <ClockIcon className="w-8 h-8 text-teal/20" />
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-cream">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-nearblack/50 text-sm mb-1">
                <ShieldCheckIcon className="w-4 h-4" />
                Status
              </div>
              {editing ? (
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={settings.isActive}
                    onChange={(e) => setSettings({ ...settings, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-cream text-teal focus:ring-teal"
                  />
                  <span className={`text-sm font-medium ${settings.isActive ? 'text-olive' : 'text-terracotta'}`}>
                    {settings.isActive ? 'Active' : 'Inactive'}
                  </span>
                </label>
              ) : (
                <div className={`text-lg font-medium ${settings.isActive ? 'text-olive' : 'text-terracotta'}`}>
                  {settings.isActive ? ' Active' : ' Inactive'}
                </div>
              )}
            </div>
            <ShieldCheckIcon className="w-8 h-8 text-teal/20" />
          </div>
        </div>
      </div>

      {/* Description Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-cream mb-6">
        <div className="flex items-center gap-2 text-nearblack/50 text-sm mb-3">
          <DocumentTextIcon className="w-4 h-4" />
          Description
        </div>
        {editing ? (
          <textarea
            value={settings.description}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            className="w-full px-4 py-3 border border-cream rounded-lg focus:border-teal outline-none min-h-[80px]"
            placeholder="Describe the visa invitation letter service"
          />
        ) : (
          <p className="text-nearblack/80">{settings.description}</p>
        )}
      </div>

      {/* Preview Section */}
      <div className="bg-cream/30 rounded-xl p-6 border border-cream">
        <h3 className="text-sm font-medium text-nearblack/50 mb-4">📋 Live Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-sm text-nearblack/50">Price</div>
            <div className="text-xl font-bold text-teal">${settings.price}</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-sm text-nearblack/50">Processing</div>
            <div className="text-xl font-bold text-teal">{settings.processingTime}</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-sm text-nearblack/50">Status</div>
            <div className={`text-xl font-bold ${settings.isActive ? 'text-olive' : 'text-terracotta'}`}>
              {settings.isActive ? 'Available' : 'Unavailable'}
            </div>
          </div>
        </div>
        <p className="text-xs text-nearblack/40 mt-4 text-center">
          This is how the visa service will appear to customers
        </p>
      </div>
    </div>
  );
}