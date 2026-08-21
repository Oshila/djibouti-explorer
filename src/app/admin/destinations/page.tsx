'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase/client';
import { 
  collection, 
  query, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  orderBy 
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Destination {
  id: string;
  name: { en: string; fr: string };
  slug: { en: string; fr: string };
  description: { en: string; fr: string };
  image?: string;
  tours?: number;
  published: boolean;
  createdAt: any;
}

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const q = query(collection(db, 'destinations'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Destination[];
      setDestinations(data);
      setFilteredDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast.error('Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const filtered = destinations.filter(dest => 
        dest.name.en.toLowerCase().includes(search) ||
        dest.name.fr.toLowerCase().includes(search)
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(destinations);
    }
  }, [searchTerm, destinations]);

  const togglePublish = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'destinations', id), { 
        published: !current,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Destination ${!current ? 'published' : 'unpublished'}`);
      fetchDestinations();
    } catch (error) {
      toast.error('Failed to update destination');
    }
  };

  const deleteDestination = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'destinations', id));
      toast.success('Destination deleted');
      fetchDestinations();
    } catch (error) {
      toast.error('Failed to delete destination');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading text-teal">Manage Destinations</h1>
          <p className="text-nearblack/60">{destinations.length} destinations total</p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="bg-teal hover:bg-teal/90 text-white px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Destination
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-nearblack/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-teal">{destinations.length}</div>
          <div className="text-xs text-nearblack/50">Total</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-olive">{destinations.filter(d => d.published !== false).length}</div>
          <div className="text-xs text-nearblack/50">Published</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-ochre">{destinations.filter(d => d.published === false).length}</div>
          <div className="text-xs text-nearblack/50">Drafts</div>
        </div>
      </div>

      {/* Destination List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream/50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Destination</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Slug</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream">
              {filteredDestinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-cream/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {dest.image && (
                        <img src={dest.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      )}
                      <div>
                        <div className="font-medium text-nearblack">{dest.name.en}</div>
                        <div className="text-xs text-nearblack/50">{dest.name.fr}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-nearblack/60">{dest.slug.en}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      dest.published !== false ? 'bg-olive/10 text-olive' : 'bg-ochre/10 text-ochre'
                    }`}>
                      {dest.published !== false ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Publish/Unpublish */}
                      <button
                        onClick={() => togglePublish(dest.id, dest.published !== false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          dest.published !== false 
                            ? 'bg-olive/10 text-olive hover:bg-olive/20' 
                            : 'bg-ochre/10 text-ochre hover:bg-ochre/20'
                        }`}
                      >
                        {dest.published !== false ? (
                          <>
                            <EyeIcon className="w-3.5 h-3.5" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeSlashIcon className="w-3.5 h-3.5" />
                            Draft
                          </>
                        )}
                      </button>

                      {/* Edit */}
                      <Link
                        href={`/admin/destinations/${dest.id}`}
                        className="px-3 py-1.5 bg-teal/10 text-teal hover:bg-teal/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <PencilIcon className="w-3.5 h-3.5" />
                        Edit
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => deleteDestination(dest.id, dest.name.en)}
                        className="px-3 py-1.5 bg-terracotta/10 text-terracotta hover:bg-terracotta/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
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
        {filteredDestinations.length === 0 && (
          <div className="p-8 text-center text-nearblack/40">
            <p>No destinations found. <Link href="/admin/destinations/new" className="text-teal hover:text-terracotta">Add your first destination →</Link></p>
          </div>
        )}
      </div>
    </div>
  );
}