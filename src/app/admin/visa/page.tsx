'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/client';
import { collection, getDocs, doc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  CheckIcon, 
  XMarkIcon, 
  ClockIcon,
  EnvelopeIcon,
  UserIcon,
  DocumentIcon,
  CalendarIcon,
  MapPinIcon,
  EyeIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface VisaRequest {
  id: string;
  fullName: string;
  email: string;
  passportNumber: string;
  nationality: string;
  arrivalDate: string;
  departureDate: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
  whatsappNumber: string;
}

export default function AdminVisaPage() {
  const [requests, setRequests] = useState<VisaRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const q = query(collection(db, 'visaRequests'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VisaRequest[];
      setRequests(data);
    } catch (error) {
      console.error('Error fetching visa requests:', error);
      toast.error('Failed to load visa requests');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'visaRequests', id), {
        status,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Request ${status}`);
      fetchRequests();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm('Delete this request?')) return;
    try {
      await deleteDoc(doc(db, 'visaRequests', id));
      toast.success('Request deleted');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-ochre/10 text-ochre',
      approved: 'bg-olive/10 text-olive',
      rejected: 'bg-terracotta/10 text-terracotta',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const filteredRequests = selectedStatus === 'all' 
    ? requests 
    : requests.filter(r => r.status === selectedStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading visa requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading text-teal">Visa Requests</h1>
          <p className="text-nearblack/60">Manage visa invitation letter requests</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
          >
            <option value="all">All ({requests.length})</option>
            <option value="pending">Pending ({requests.filter(r => r.status === 'pending').length})</option>
            <option value="approved">Approved ({requests.filter(r => r.status === 'approved').length})</option>
            <option value="rejected">Rejected ({requests.filter(r => r.status === 'rejected').length})</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-teal">{requests.length}</div>
          <div className="text-xs text-nearblack/50">Total</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-ochre">{requests.filter(r => r.status === 'pending').length}</div>
          <div className="text-xs text-nearblack/50">Pending</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-olive">{requests.filter(r => r.status === 'approved').length}</div>
          <div className="text-xs text-nearblack/50">Approved</div>
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-nearblack/40">No visa requests found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Applicant</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Passport</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Travel Dates</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-nearblack">{req.fullName}</div>
                        <div className="text-xs text-nearblack/50 flex items-center gap-1">
                          <EnvelopeIcon className="w-3 h-3" />
                          {req.email}
                        </div>
                        <div className="text-xs text-nearblack/50 flex items-center gap-1">
                          <MapPinIcon className="w-3 h-3" />
                          {req.nationality}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm">{req.passportNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>Arrival: {req.arrivalDate}</div>
                        <div className="text-nearblack/50">Departure: {req.departureDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadge(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* Approve */}
                        {req.status === 'pending' && (
                          <button
                            onClick={() => updateStatus(req.id, 'approved')}
                            className="px-3 py-1.5 bg-olive/10 text-olive hover:bg-olive/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                            title="Approve Request"
                          >
                            <CheckCircleIcon className="w-3.5 h-3.5" />
                            Approve
                          </button>
                        )}

                        {/* Reject */}
                        {req.status === 'pending' && (
                          <button
                            onClick={() => updateStatus(req.id, 'rejected')}
                            className="px-3 py-1.5 bg-terracotta/10 text-terracotta hover:bg-terracotta/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                            title="Reject Request"
                          >
                            <XCircleIcon className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        )}

                        {/* WhatsApp */}
                        <button
                          onClick={() => window.open(`https://wa.me/${req.whatsappNumber || '25377862639'}`, '_blank')}
                          className="px-3 py-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                          title="Chat on WhatsApp"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          WhatsApp
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => deleteRequest(req.id)}
                          className="px-3 py-1.5 bg-terracotta/10 text-terracotta hover:bg-terracotta/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                          title="Delete Request"
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
        </div>
      )}
    </div>
  );
}