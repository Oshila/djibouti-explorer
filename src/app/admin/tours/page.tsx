'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminTours() {
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

  const tours = [
    { id: '1', title: 'Lake Assal Discovery', price: 150, status: 'Published', bookings: 42 },
    { id: '2', title: 'Whale Shark Adventure', price: 250, status: 'Published', bookings: 38 },
    { id: '3', title: 'Lac Abbé & Ardoukoba', price: 350, status: 'Published', bookings: 29 },
    { id: '4', title: 'Day Forest Trek', price: 180, status: 'Draft', bookings: 21 },
  ];

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading text-teal">Manage Tours</h1>
            <p className="text-nearblack/60">Create and manage your tour packages</p>
          </div>
          <button className="bg-teal hover:bg-teal/90 text-white px-4 py-2 rounded-lg font-medium transition">
            + Add New Tour
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-cream/50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Tour</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Price</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Bookings</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream">
              {tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-cream/30">
                  <td className="px-6 py-4 font-medium">{tour.title}</td>
                  <td className="px-6 py-4 font-medium text-teal">${tour.price}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      tour.status === 'Published' ? 'bg-olive/10 text-olive' : 'bg-ochre/10 text-ochre'
                    }`}>
                      {tour.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{tour.bookings}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-sm text-teal hover:text-teal/80">Edit</button>
                      <button className="text-sm text-terracotta hover:text-terracotta/80">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}