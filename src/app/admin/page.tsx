'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/client';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { 
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface Metric {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  depositsCollected: number;
  averageRating: number;
  totalReviews: number;
}

interface Booking {
  id: string;
  bookingReference: string;
  customerName: string;
  tourName: string;
  travelDate: string;
  bookingStatus: string;
  totalAmount: number;
  depositAmount?: number;
  createdAt: any;
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metric>({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    depositsCollected: 0,
    averageRating: 0,
    totalReviews: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch bookings
        const bookingsQuery = query(
          collection(db, 'bookings'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        const bookingsSnapshot = await getDocs(bookingsQuery);
        const bookings: Booking[] = bookingsSnapshot.docs.map(doc => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            bookingReference: data.bookingReference || '',
            customerName: data.customerName || '',
            tourName: data.tourName || '',
            travelDate: data.travelDate || '',
            bookingStatus: data.bookingStatus || 'pending',
            totalAmount: data.totalAmount || 0,
            createdAt: data.createdAt || null,
          } as Booking;
        });

        // Calculate metrics
        const total = bookings.length;
        const confirmed = bookings.filter(b => b.bookingStatus === 'confirmed').length;
        const pending = bookings.filter(b => b.bookingStatus === 'pending').length;
        const cancelled = bookings.filter(b => b.bookingStatus === 'cancelled').length;
        const revenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
        const deposits = bookings.reduce((sum, b) => sum + (b.depositAmount || 0), 0);

        setMetrics({
          totalBookings: total,
          confirmedBookings: confirmed,
          pendingBookings: pending,
          cancelledBookings: cancelled,
          totalRevenue: revenue,
          depositsCollected: deposits,
          averageRating: 4.8, // This would come from reviews
          totalReviews: 127, // This would come from reviews
        });

        // Set recent bookings
        setRecentBookings(bookings.slice(0, 5));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading text-teal">Dashboard</h1>
        <p className="text-nearblack/60">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Metrics Grid */}
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
          <div className="mt-2 flex items-center gap-1 text-sm">
            <ArrowTrendingUpIcon className="w-4 h-4 text-olive" />
            <span className="text-olive">+12%</span>
            <span className="text-nearblack/40">vs last month</span>
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
          <div className="mt-2 flex items-center gap-1 text-sm">
            <ArrowTrendingUpIcon className="w-4 h-4 text-olive" />
            <span className="text-olive">+8%</span>
            <span className="text-nearblack/40">vs last month</span>
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
          <div className="mt-2 flex items-center gap-1 text-sm">
            <span className="text-nearblack/40">{metrics.pendingBookings} pending</span>
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
          <div className="mt-2 flex items-center gap-1 text-sm">
            <span className="text-nearblack/40">{metrics.totalReviews} reviews</span>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-cream flex justify-between items-center">
          <h2 className="text-lg font-heading text-teal">Recent Bookings</h2>
          <a href="/admin/bookings" className="text-sm text-teal hover:text-teal/80 transition-colors">
            View All →
          </a>
        </div>
        <div className="overflow-x-auto">
          {recentBookings.length > 0 ? (
            <table className="w-full">
              <thead className="bg-cream/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Booking ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Tour</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {recentBookings.map((booking) => {
                  const statusColors = {
                    confirmed: 'bg-olive text-white',
                    pending: 'bg-ochre text-nearblack',
                    cancelled: 'bg-terracotta text-white',
                  };
                  const statusColor = statusColors[booking.bookingStatus as keyof typeof statusColors] || 'bg-gray-300';

                  return (
                    <tr key={booking.id} className="hover:bg-cream/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-teal">{booking.bookingReference || booking.id.slice(0, 8)}</td>
                      <td className="px-6 py-4 text-sm text-nearblack">{booking.customerName || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-nearblack">{booking.tourName || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-nearblack">
                        {booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${statusColor}`}>
                          {booking.bookingStatus || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-teal">${booking.totalAmount || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-nearblack/40">
              <p>No bookings yet. They will appear here once customers start booking.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}