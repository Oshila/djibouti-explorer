'use client';

import { useEffect, useState } from 'react';

export default function AdminReviews() {
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

  const reviews = [
    { id: '1', customer: 'Sarah Mitchell', tour: 'Lake Assal Discovery', rating: 5, comment: 'Amazing experience!', status: 'Pending' },
    { id: '2', customer: 'James Kowalski', tour: 'Whale Shark Adventure', rating: 5, comment: 'Dream come true!', status: 'Approved' },
    { id: '3', customer: 'Emma Laurent', tour: 'Lac Abbé & Ardoukoba', rating: 4, comment: 'Great organization', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-teal">Reviews</h1>
          <p className="text-nearblack/60">Moderate customer reviews</p>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.customer}</span>
                    <span className="text-xs text-nearblack/40">• {review.tour}</span>
                  </div>
                  <div className="text-ochre text-sm">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                  <p className="text-nearblack/70 text-sm mt-1">&ldquo;{review.comment}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    review.status === 'Approved' ? 'bg-olive/10 text-olive' : 'bg-ochre/10 text-ochre'
                  }`}>
                    {review.status}
                  </span>
                  {review.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button className="text-sm text-olive hover:text-olive/80">Approve</button>
                      <button className="text-sm text-terracotta hover:text-terracotta/80">Reject</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}