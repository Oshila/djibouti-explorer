'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase/client';
import { 
  collection, 
  query, 
  getDocs, 
  orderBy, 
  limit,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  where
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// ============================================
// TYPES
// ============================================
interface Metric {
  totalTours: number;
  publishedTours: number;
  draftTours: number;
  featuredTours: number;
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
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
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

interface Tour {
  id: string;
  title: { en: string; fr: string };
  slug: { en: string; fr: string };
  price: number;
  duration: number;
  featured: boolean;
  published: boolean;
  images?: { primary: string };
  categories?: string[];
  rating?: number;
  reviewCount?: number;
  createdAt: any;
}

interface Destination {
  id: string;
  name: { en: string; fr: string };
  slug: { en: string; fr: string };
  description?: { en: string; fr: string };
  image?: string;
  tours?: number;
  published?: boolean;
  createdAt: any;
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metric>({
    totalTours: 0,
    publishedTours: 0,
    draftTours: 0,
    featuredTours: 0,
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalReviews: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [recentTours, setRecentTours] = useState<Tour[]>([]);
  const [recentDestinations, setRecentDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  // ============================================
  // FETCH DATA
  // ============================================
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        // Fetch tours
        const toursQuery = query(collection(db, 'tours'));
        const toursSnapshot = await getDocs(toursQuery);
        const allTours = toursSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || { en: 'Untitled', fr: 'Sans titre' },
            slug: data.slug || { en: 'untitled', fr: 'sans-titre' },
            price: data.price || 0,
            duration: data.duration || 1,
            featured: data.featured || false,
            published: data.published || false,
            images: data.images || { primary: '' },
            categories: data.categories || [],
            rating: data.rating || 0,
            reviewCount: data.reviewCount || 0,
            createdAt: data.createdAt || null,
          } as Tour;
        });

        // Get recent tours (last 5)
        const recentToursQuery = query(
          collection(db, 'tours'), 
          orderBy('createdAt', 'desc'), 
          limit(5)
        );
        const recentToursSnapshot = await getDocs(recentToursQuery);
        const recentToursData = recentToursSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || { en: 'Untitled', fr: 'Sans titre' },
            slug: data.slug || { en: 'untitled', fr: 'sans-titre' },
            price: data.price || 0,
            duration: data.duration || 1,
            featured: data.featured || false,
            published: data.published || false,
            images: data.images || { primary: '' },
            categories: data.categories || [],
            rating: data.rating || 0,
            reviewCount: data.reviewCount || 0,
            createdAt: data.createdAt || null,
          } as Tour;
        });
        setRecentTours(recentToursData);

        // Fetch destinations
        const destQuery = query(collection(db, 'destinations'));
        const destSnapshot = await getDocs(destQuery);
        const allDestinations = destSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || { en: 'Untitled', fr: 'Sans titre' },
            slug: data.slug || { en: 'untitled', fr: 'sans-titre' },
            description: data.description || { en: '', fr: '' },
            image: data.image || '',
            tours: data.tours || 0,
            published: data.published !== undefined ? data.published : true,
            createdAt: data.createdAt || null,
          } as Destination;
        });

        // Get recent destinations (last 5)
        const recentDestQuery = query(
          collection(db, 'destinations'), 
          orderBy('createdAt', 'desc'), 
          limit(5)
        );
        const recentDestSnapshot = await getDocs(recentDestQuery);
        const recentDestData = recentDestSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || { en: 'Untitled', fr: 'Sans titre' },
            slug: data.slug || { en: 'untitled', fr: 'sans-titre' },
            description: data.description || { en: '', fr: '' },
            image: data.image || '',
            tours: data.tours || 0,
            published: data.published !== undefined ? data.published : true,
            createdAt: data.createdAt || null,
          } as Destination;
        });
        setRecentDestinations(recentDestData);

        // Fetch bookings
        let allBookings: Booking[] = [];
        try {
          const bookingsQuery = query(collection(db, 'bookings'));
          const bookingsSnapshot = await getDocs(bookingsQuery);
          allBookings = bookingsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              bookingReference: data.bookingReference || `BK-${doc.id.slice(0, 8)}`,
              customerName: data.customerName || data.customer?.firstName + ' ' + data.customer?.lastName || 'N/A',
              tourName: data.tourName || data.tourSnapshot?.title?.en || 'Unknown Tour',
              travelDate: data.travelDate || '',
              bookingStatus: data.bookingStatus || 'pending',
              totalAmount: data.totalAmount || 0,
              depositAmount: data.depositAmount || 0,
              createdAt: data.createdAt || null,
              customer: data.customer || null,
            } as Booking;
          });

          // Get recent bookings (last 5)
          const sortedBookings = [...allBookings].sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          });
          setRecentBookings(sortedBookings.slice(0, 5));

          // Calculate metrics
          const total = allBookings.length;
          const confirmed = allBookings.filter(b => b.bookingStatus === 'confirmed' || b.bookingStatus === 'completed').length;
          const pending = allBookings.filter(b => b.bookingStatus === 'pending').length;
          const cancelled = allBookings.filter(b => b.bookingStatus === 'cancelled').length;
          const revenue = allBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

          setMetrics({
            totalTours: allTours.length,
            publishedTours: allTours.filter(t => t.published).length,
            draftTours: allTours.filter(t => !t.published).length,
            featuredTours: allTours.filter(t => t.featured).length,
            totalBookings: total,
            confirmedBookings: confirmed,
            pendingBookings: pending,
            cancelledBookings: cancelled,
            totalRevenue: revenue,
            averageRating: allTours.length > 0 
              ? allTours.reduce((sum, t) => sum + (t.rating || 0), 0) / allTours.length 
              : 0,
            totalReviews: allTours.reduce((sum, t) => sum + (t.reviewCount || 0), 0),
          });

        } catch (error) {
          console.error('Error fetching bookings:', error);
          // Set default values if bookings collection doesn't exist
          setMetrics(prev => ({
            ...prev,
            totalTours: allTours.length,
            publishedTours: allTours.filter(t => t.published).length,
            draftTours: allTours.filter(t => !t.published).length,
            featuredTours: allTours.filter(t => t.featured).length,
            averageRating: allTours.length > 0 
              ? allTours.reduce((sum, t) => sum + (t.rating || 0), 0) / allTours.length 
              : 0,
            totalReviews: allTours.reduce((sum, t) => sum + (t.reviewCount || 0), 0),
          }));
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // ============================================
  // TOUR ACTIONS
  // ============================================
  const toggleTourPublish = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'tours', id), { 
        published: !currentStatus,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Tour ${!currentStatus ? 'published' : 'unpublished'}`);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update tour');
    }
  };

  const toggleTourFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'tours', id), { 
        featured: !currentStatus,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Tour ${!currentStatus ? 'featured' : 'unfeatured'}`);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update tour');
    }
  };

  const deleteTour = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'tours', id));
      toast.success('Tour deleted');
      window.location.reload();
    } catch (error) {
      toast.error('Failed to delete tour');
    }
  };

  // ============================================
  // DESTINATION ACTIONS
  // ============================================
  const toggleDestPublish = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'destinations', id), { 
        published: !currentStatus,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Destination ${!currentStatus ? 'published' : 'unpublished'}`);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update destination');
    }
  };

  const deleteDestination = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'destinations', id));
      toast.success('Destination deleted');
      window.location.reload();
    } catch (error) {
      toast.error('Failed to delete destination');
    }
  };

  // ============================================
  // RENDER
  // ============================================
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
              <p className="text-sm text-nearblack/50">Total Tours</p>
              <p className="text-2xl font-bold text-teal">{metrics.totalTours}</p>
            </div>
            <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center">
              <MapPinIcon className="w-6 h-6 text-teal" />
            </div>
          </div>
          <div className="mt-2 flex gap-2 text-xs">
            <span className="text-olive">{metrics.publishedTours} published</span>
            <span className="text-nearblack/30">•</span>
            <span className="text-ochre">{metrics.draftTours} drafts</span>
            <span className="text-nearblack/30">•</span>
            <span className="text-teal">{metrics.featuredTours} featured</span>
          </div>
          <Link href="/admin/tours" className="mt-2 text-sm text-teal hover:text-teal/80 transition-colors inline-block">
            Manage Tours →
          </Link>
        </div>

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
          <div className="mt-2 flex gap-2 text-xs flex-wrap">
            <span className="text-olive flex items-center gap-1">
              <CheckCircleIcon className="w-3 h-3" />
              {metrics.confirmedBookings} confirmed
            </span>
            <span className="text-nearblack/30">•</span>
            <span className="text-ochre flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              {metrics.pendingBookings} pending
            </span>
            <span className="text-nearblack/30">•</span>
            <span className="text-terracotta flex items-center gap-1">
              <XCircleIcon className="w-3 h-3" />
              {metrics.cancelledBookings} cancelled
            </span>
          </div>
          <Link href="/admin/bookings" className="mt-2 text-sm text-teal hover:text-teal/80 transition-colors inline-block">
            View All Bookings →
          </Link>
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
            <span className="text-olive">+12%</span>
            <span className="text-nearblack/40">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-nearblack/50">Rating & Reviews</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-teal">{metrics.averageRating.toFixed(1)}</span>
                <StarSolidIcon className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
              <StarIcon className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div className="mt-2 text-sm text-nearblack/60">
            {metrics.totalReviews} total reviews
          </div>
          <Link href="/admin/reviews" className="mt-2 text-sm text-teal hover:text-teal/80 transition-colors inline-block">
            Moderate Reviews →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link
          href="/admin/tours/new"
          className="bg-teal hover:bg-teal/90 text-white p-4 rounded-xl text-center font-medium transition-all hover:shadow-lg"
        >
          <PlusIcon className="w-5 h-5 mx-auto mb-1" />
          Add New Tour
        </Link>
        <Link
          href="/admin/destinations/new"
          className="bg-teal hover:bg-teal/90 text-white p-4 rounded-xl text-center font-medium transition-all hover:shadow-lg"
        >
          <PlusIcon className="w-5 h-5 mx-auto mb-1" />
          Add Destination
        </Link>
        <Link
          href="/admin/bookings"
          className="bg-ochre hover:bg-ochre/90 text-nearblack p-4 rounded-xl text-center font-medium transition-all hover:shadow-lg"
        >
          <CalendarIcon className="w-5 h-5 mx-auto mb-1" />
          View Bookings
        </Link>
        <Link
          href="/admin/reviews"
          className="bg-cream hover:bg-cream/80 text-nearblack p-4 rounded-xl text-center font-medium transition-all hover:shadow-lg"
        >
          <StarIcon className="w-5 h-5 mx-auto mb-1" />
          Moderate Reviews
        </Link>
      </div>

      {/* Recent Tours */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-cream flex justify-between items-center">
          <h2 className="text-lg font-heading text-teal">Recent Tours</h2>
          <Link href="/admin/tours" className="text-sm text-teal hover:text-teal/80 transition-colors">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentTours.length > 0 ? (
            <table className="w-full">
              <thead className="bg-cream/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Tour</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Price</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {recentTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {tour.images?.primary ? (
                          <img src={tour.images.primary} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal/30">
                            <MapPinIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-nearblack">{tour.title?.en || 'Untitled'}</div>
                          <div className="text-xs text-nearblack/50">{tour.slug?.en || 'no-slug'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-teal">${tour.price || 0}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        tour.published ? 'bg-olive/10 text-olive' : 'bg-ochre/10 text-ochre'
                      }`}>
                        {tour.published ? 'Published' : 'Draft'}
                      </span>
                      {tour.featured && (
                        <span className="text-xs px-3 py-1 rounded-full font-medium bg-teal/10 text-teal ml-1 flex items-center gap-1">
                          <StarSolidIcon className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={() => toggleTourPublish(tour.id, tour.published)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                            tour.published 
                              ? 'bg-olive/10 text-olive hover:bg-olive/20' 
                              : 'bg-ochre/10 text-ochre hover:bg-ochre/20'
                          }`}
                          title={tour.published ? 'Unpublish' : 'Publish'}
                        >
                          {tour.published ? (
                            <EyeIcon className="w-3.5 h-3.5" />
                          ) : (
                            <EyeSlashIcon className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleTourFeatured(tour.id, tour.featured)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                            tour.featured 
                              ? 'bg-teal/10 text-teal hover:bg-teal/20' 
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                          title={tour.featured ? 'Remove featured' : 'Make featured'}
                        >
                          <ArrowPathIcon className={`w-3.5 h-3.5 ${tour.featured ? 'text-teal' : 'text-gray-400'}`} />
                        </button>
                        <Link
                          href={`/admin/tours/${tour.id}`}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-1"
                        >
                          <PencilIcon className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteTour(tour.id, tour.title?.en || 'Untitled')}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors bg-terracotta/10 text-terracotta hover:bg-terracotta/20 flex items-center gap-1"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-nearblack/40">
              <p>No tours yet. <Link href="/admin/tours/new" className="text-teal hover:text-terracotta">Add your first tour →</Link></p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Destinations */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-cream flex justify-between items-center">
          <h2 className="text-lg font-heading text-teal">Recent Destinations</h2>
          <Link href="/admin/destinations" className="text-sm text-teal hover:text-teal/80 transition-colors">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentDestinations.length > 0 ? (
            <table className="w-full">
              <thead className="bg-cream/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Destination</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Slug</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {recentDestinations.map((dest) => (
                  <tr key={dest.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {dest.image ? (
                          <img src={dest.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal/30">
                            <MapPinIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-nearblack">{dest.name?.en || 'Untitled'}</div>
                          <div className="text-xs text-nearblack/50">{dest.name?.fr || 'Sans titre'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-nearblack/60">{dest.slug?.en || 'no-slug'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        dest.published !== false ? 'bg-olive/10 text-olive' : 'bg-ochre/10 text-ochre'
                      }`}>
                        {dest.published !== false ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={() => toggleDestPublish(dest.id, dest.published !== false)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                            dest.published !== false 
                              ? 'bg-olive/10 text-olive hover:bg-olive/20' 
                              : 'bg-ochre/10 text-ochre hover:bg-ochre/20'
                          }`}
                          title={dest.published !== false ? 'Unpublish' : 'Publish'}
                        >
                          {dest.published !== false ? (
                            <EyeIcon className="w-3.5 h-3.5" />
                          ) : (
                            <EyeSlashIcon className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <Link
                          href={`/admin/destinations/${dest.id}`}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-1"
                        >
                          <PencilIcon className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteDestination(dest.id, dest.name?.en || 'Untitled')}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors bg-terracotta/10 text-terracotta hover:bg-terracotta/20 flex items-center gap-1"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-nearblack/40">
              <p>No destinations yet. <Link href="/admin/destinations/new" className="text-teal hover:text-terracotta">Add your first destination →</Link></p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-cream flex justify-between items-center">
          <h2 className="text-lg font-heading text-teal">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm text-teal hover:text-teal/80 transition-colors">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentBookings.length > 0 ? (
            <table className="w-full">
              <thead className="bg-cream/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Booking ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Tour</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {recentBookings.map((booking) => {
                  const statusColors = {
                    confirmed: 'bg-olive/10 text-olive',
                    completed: 'bg-olive/10 text-olive',
                    pending: 'bg-ochre/10 text-ochre',
                    cancelled: 'bg-terracotta/10 text-terracotta',
                  };
                  const statusColor = statusColors[booking.bookingStatus as keyof typeof statusColors] || 'bg-gray-100 text-gray-500';

                  return (
                    <tr key={booking.id} className="hover:bg-cream/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-teal">
                        {booking.bookingReference || booking.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 text-sm text-nearblack">
                        {booking.customerName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-nearblack">
                        {booking.tourName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-nearblack">
                        {booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${statusColor}`}>
                          {booking.bookingStatus || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-teal">
                        ${booking.totalAmount || 0}
                      </td>
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