'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase/client';
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  updateDoc,
  deleteDoc,
  orderBy 
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  TrashIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface Booking {
  id: string;
  bookingReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tourName: string;
  tourId: string;
  travelDate: string;
  totalAmount: number;
  depositAmount: number;
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded';
  specialRequests?: string;
  createdAt: any;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = bookings;
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(booking => 
        booking.customerName?.toLowerCase().includes(search) ||
        booking.bookingReference?.toLowerCase().includes(search) ||
        booking.tourName?.toLowerCase().includes(search)
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.bookingStatus === statusFilter);
    }
    
    setFilteredBookings(result);
  }, [searchTerm, statusFilter, bookings]);

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), {
        bookingStatus: status,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  const deleteBooking = async (id: string, reference: string) => {
    if (!confirm(`Delete booking ${reference}? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'bookings', id));
      toast.success('Booking deleted');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to delete booking');
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: 'bg-olive/10 text-olive',
      pending: 'bg-ochre/10 text-ochre',
      cancelled: 'bg-terracotta/10 text-terracotta',
      completed: 'bg-teal/10 text-teal',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading text-teal">Bookings</h1>
        <p className="text-nearblack/60">{bookings.length} bookings total</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-nearblack/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, reference, or tour..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-teal">{bookings.length}</div>
          <div className="text-xs text-nearblack/50">Total</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-ochre">{bookings.filter(b => b.bookingStatus === 'pending').length}</div>
          <div className="text-xs text-nearblack/50">Pending</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-olive">{bookings.filter(b => b.bookingStatus === 'confirmed').length}</div>
          <div className="text-xs text-nearblack/50">Confirmed</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-terracotta">{bookings.filter(b => b.bookingStatus === 'cancelled').length}</div>
          <div className="text-xs text-nearblack/50">Cancelled</div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream/50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Reference</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Tour</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-cream/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-teal">
                    {booking.bookingReference || booking.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-nearblack">{booking.customerName || 'N/A'}</div>
                      <div className="text-xs text-nearblack/50">{booking.customerEmail || ''}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-nearblack">{booking.tourName || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-nearblack">
                    {booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-teal">${booking.totalAmount || 0}</div>
                    <div className="text-xs text-nearblack/50">Deposit: ${booking.depositAmount || 0}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusColor(booking.bookingStatus)}`}>
                      {booking.bookingStatus || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* View Details */}
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="px-3 py-1.5 bg-teal/10 text-teal hover:bg-teal/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                        title="View Details"
                      >
                        <EyeIcon className="w-3.5 h-3.5" />
                        View
                      </Link>

                      {/* Pending Actions */}
                      {booking.bookingStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="px-3 py-1.5 bg-olive/10 text-olive hover:bg-olive/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                            title="Confirm Booking"
                          >
                            <CheckCircleIcon className="w-3.5 h-3.5" />
                            Confirm
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="px-3 py-1.5 bg-terracotta/10 text-terracotta hover:bg-terracotta/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                            title="Cancel Booking"
                          >
                            <XCircleIcon className="w-3.5 h-3.5" />
                            Cancel
                          </button>
                        </>
                      )}

                      {/* Confirmed Actions */}
                      {booking.bookingStatus === 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          className="px-3 py-1.5 bg-teal/10 text-teal hover:bg-teal/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                          title="Mark Complete"
                        >
                          <ClockIcon className="w-3.5 h-3.5" />
                          Complete
                        </button>
                      )}

                      {/* Completed Actions */}
                      {booking.bookingStatus === 'completed' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'pending')}
                          className="px-3 py-1.5 bg-ochre/10 text-ochre hover:bg-ochre/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                          title="Reopen Booking"
                        >
                          <ArrowPathIcon className="w-3.5 h-3.5" />
                          Reopen
                        </button>
                      )}

                      {/* Delete Button - Always visible */}
                      <button
                        onClick={() => deleteBooking(booking.id, booking.bookingReference || booking.id.slice(0, 8))}
                        className="px-3 py-1.5 bg-terracotta/10 text-terracotta hover:bg-terracotta/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                        title="Delete Booking"
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
        </div>
        {filteredBookings.length === 0 && (
          <div className="p-8 text-center text-nearblack/40">
            <p>No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
}