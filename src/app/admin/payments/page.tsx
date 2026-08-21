'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/client';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { 
  CreditCardIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface Payment {
  id: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  type: 'tour' | 'visa';
  metadata: any;
  customerEmail: string;
  createdAt: any;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'tour' | 'visa'>('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Payment[];
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      succeeded: 'bg-olive/10 text-olive',
      pending: 'bg-ochre/10 text-ochre',
      canceled: 'bg-terracotta/10 text-terracotta',
      failed: 'bg-terracotta/10 text-terracotta',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-500';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'succeeded') return <CheckCircleIcon className="w-4 h-4" />;
    if (status === 'pending') return <ClockIcon className="w-4 h-4" />;
    return <XCircleIcon className="w-4 h-4" />;
  };

  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(p => p.type === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading text-teal">Payments</h1>
          <p className="text-nearblack/60">Track all payments and transactions</p>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
          >
            <option value="all">All ({payments.length})</option>
            <option value="tour">Tours ({payments.filter(p => p.type === 'tour').length})</option>
            <option value="visa">Visa ({payments.filter(p => p.type === 'visa').length})</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-teal">{payments.length}</div>
          <div className="text-xs text-nearblack/50">Total Payments</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-olive">
            ${payments.filter(p => p.status === 'succeeded').reduce((sum, p) => sum + p.amount, 0).toFixed(0)}
          </div>
          <div className="text-xs text-nearblack/50">Total Revenue</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-olive">
            {payments.filter(p => p.status === 'succeeded').length}
          </div>
          <div className="text-xs text-nearblack/50">Successful</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-terracotta">
            {payments.filter(p => p.status !== 'succeeded').length}
          </div>
          <div className="text-xs text-nearblack/50">Pending/Failed</div>
        </div>
      </div>

      {/* Payments Table */}
      {filteredPayments.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center">
          <CreditCardIcon className="w-12 h-12 text-nearblack/20 mx-auto mb-3" />
          <p className="text-nearblack/40">No payments found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Payment ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm">
                        {payment.paymentIntentId?.slice(0, 8) || payment.id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        payment.type === 'tour' ? 'bg-teal/10 text-teal' : 'bg-ochre/10 text-ochre'
                      }`}>
                        {payment.type === 'tour' ? 'Tour' : 'Visa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-teal">
                      ${payment.amount.toFixed(2)}
                      <span className="text-xs text-nearblack/30 uppercase ml-1">{payment.currency}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${getStatusBadge(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-nearblack/70">
                      {payment.customerEmail || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-nearblack/50">
                      {payment.createdAt?.toDate?.() 
                        ? payment.createdAt.toDate().toLocaleDateString() 
                        : new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* View in Stripe */}
                        <button
                          onClick={() => window.open(`https://dashboard.stripe.com/payments/${payment.paymentIntentId}`, '_blank')}
                          className="px-3 py-1.5 bg-teal/10 text-teal hover:bg-teal/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                          title="View in Stripe"
                        >
                          <EyeIcon className="w-3.5 h-3.5" />
                          View
                        </button>

                        {/* Open in Stripe */}
                        <button
                          onClick={() => window.open(`https://dashboard.stripe.com/payments/${payment.paymentIntentId}`, '_blank')}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                          title="Open in Stripe Dashboard"
                        >
                          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                          Stripe
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}