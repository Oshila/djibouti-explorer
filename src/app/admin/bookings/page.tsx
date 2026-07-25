'use client';

import { useEffect, useState } from 'react';

export default function AdminBookings() {
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

  const bookings = [
    { id: 'DB-001', customer: 'John Doe', tour: 'Lake Assal Discovery', date: '2025-01-15', status: 'Confirmed', amount: 150 },
    { id: 'DB-002', customer: 'Jane Smith', tour: 'Whale Shark Adventure', date: '2025-01-16', status: 'Pending', amount: 250 },
    { id: 'DB-003', customer: 'Mike Johnson', tour: 'Lac Abbé & Ardoukoba', date: '2025-01-18', status: 'Confirmed', amount: 350 },
  ];

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-teal">Bookings</h1>
          <p className="text-nearblack/60">Manage all customer bookings</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-cream/30">
                  <td className="px-6 py-4 font-mono text-sm text-teal">{booking.id}</td>
                  <td className="px-6 py-4">{booking.customer}</td>
                  <td className="px-6 py-4">{booking.tour}</td>
                  <td className="px-6 py-4">{booking.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      booking.status === 'Confirmed' ? 'bg-olive/10 text-olive' : 'bg-ochre/10 text-ochre'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-teal">${booking.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}