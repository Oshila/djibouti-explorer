'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  StarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

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

  const metrics = {
    totalBookings: 156,
    confirmedBookings: 89,
    pendingBookings: 34,
    totalRevenue: 23450,
    averageRating: 4.8,
    totalReviews: 127,
  };

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-teal">Dashboard</h1>
          <p className="text-nearblack/60">Welcome back! Here's what's happening with your business.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-nearblack/50">Total Bookings</p>
                <p className="text-2xl font-bold text-teal">{metrics.totalBookings}</p>
              </div>
              <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-teal" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-nearblack/50">Revenue</p>
                <p className="text-2xl font-bold text-teal">${metrics.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-olive/10 rounded-full flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6 text-olive" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-nearblack/50">Active Bookings</p>
                <p className="text-2xl font-bold text-teal">{metrics.confirmedBookings}</p>
              </div>
              <div className="w-12 h-12 bg-ochre/10 rounded-full flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6 text-ochre" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-nearblack/50">Rating</p>
                <p className="text-2xl font-bold text-teal">{metrics.averageRating}★</p>
              </div>
              <div className="w-12 h-12 bg-ochre/10 rounded-full flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-ochre" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-heading text-teal mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/admin/tours" className="bg-cream hover:bg-cream/80 rounded-xl p-4 text-center transition-colors">
              <div className="text-2xl mb-1">📋</div>
              <div className="text-sm font-medium text-nearblack">Tours</div>
            </Link>
            <Link href="/admin/bookings" className="bg-cream hover:bg-cream/80 rounded-xl p-4 text-center transition-colors">
              <div className="text-2xl mb-1">📅</div>
              <div className="text-sm font-medium text-nearblack">Bookings</div>
            </Link>
            <Link href="/admin/reviews" className="bg-cream hover:bg-cream/80 rounded-xl p-4 text-center transition-colors">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-sm font-medium text-nearblack">Reviews</div>
            </Link>
            <Link href="/admin/settings" className="bg-cream hover:bg-cream/80 rounded-xl p-4 text-center transition-colors">
              <div className="text-2xl mb-1">⚙️</div>
              <div className="text-sm font-medium text-nearblack">Settings</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}