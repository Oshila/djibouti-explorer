'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase/client';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Destination {
  id: string;
  name: { en: string; fr: string };
  slug: { en: string; fr: string };
  lat: number;
  lng: number;
  description: { en: string; fr: string };
  image: string;
  published: boolean;
  tourCount?: number;
  createdAt: any;
}

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'destinations'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Destination[];
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast.error('Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    try {
      await deleteDoc(doc(db, 'destinations', id));
      toast.success('Destination deleted');
      fetchDestinations();
    } catch (error) {
      toast.error('Failed to delete destination');
    }
  };

  const togglePublish = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'destinations', id), { published: !current });
      toast.success(`Destination ${!current ? 'published' : 'unpublished'}`);
      fetchDestinations();
    } catch (error) {
      toast.error('Failed to update destination');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading text-teal">Destinations</h1>
          <p className="text-nearblack/60">Manage destinations and their locations</p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="bg-teal hover:bg-teal/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Destination
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {destinations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Destination</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Location</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Tours</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {destinations.map((dest) => (
                  <tr key={dest.id} className="hover:bg-cream/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {dest.image && (
                          <img src={dest.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <div>
                          <div className="font-medium">{dest.name.en}</div>
                          <div className="text-xs text-nearblack/50">{dest.name.fr}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {dest.lat.toFixed(4)}, {dest.lng.toFixed(4)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        dest.published ? 'bg-olive/10 text-olive' : 'bg-ochre/10 text-ochre'
                      }`}>
                        {dest.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{dest.tourCount || 0}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePublish(dest.id, dest.published)}
                          className="p-2 hover:bg-cream rounded-lg transition-colors"
                          title={dest.published ? 'Unpublish' : 'Publish'}
                        >
                          {dest.published ? (
                            <EyeIcon className="w-5 h-5 text-olive" />
                          ) : (
                            <EyeSlashIcon className="w-5 h-5 text-ochre" />
                          )}
                        </button>
                        <Link
                          href={`/admin/destinations/${dest.id}`}
                          className="p-2 hover:bg-cream rounded-lg transition-colors"
                        >
                          <PencilIcon className="w-5 h-5 text-nearblack/60" />
                        </Link>
                        <button
                          onClick={() => handleDelete(dest.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-5 h-5 text-terracotta" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-nearblack/40">
            <p>No destinations yet. Click "Add Destination" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
}