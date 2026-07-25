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
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Tour {
  id: string;
  title: { en: string; fr: string };
  price: number;
  slug: { en: string; fr: string };
  published: boolean;
  featured: boolean;
  createdAt: any;
}

export default function AdminTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const q = query(collection(db, 'tours'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const tourData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Tour[];
      setTours(tourData);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast.error('Failed to load tours');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;
    
    try {
      await deleteDoc(doc(db, 'tours', id));
      toast.success('Tour deleted successfully');
      fetchTours();
    } catch (error) {
      console.error('Error deleting tour:', error);
      toast.error('Failed to delete tour');
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'tours', id), {
        published: !currentStatus
      });
      toast.success(`Tour ${!currentStatus ? 'published' : 'unpublished'}`);
      fetchTours();
    } catch (error) {
      console.error('Error updating tour:', error);
      toast.error('Failed to update tour');
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'tours', id), {
        featured: !currentStatus
      });
      toast.success(`Tour ${!currentStatus ? 'featured' : 'unfeatured'}`);
      fetchTours();
    } catch (error) {
      console.error('Error updating tour:', error);
      toast.error('Failed to update tour');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading text-teal">Manage Tours</h1>
          <p className="text-nearblack/60">Create, edit, and manage your tour packages</p>
        </div>
        <Link
          href="/admin/tours/new"
          className="bg-teal hover:bg-teal/90 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Tour
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-teal">{tours.length}</div>
          <div className="text-xs text-nearblack/50">Total Tours</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-olive">{tours.filter(t => t.published).length}</div>
          <div className="text-xs text-nearblack/50">Published</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-ochre">{tours.filter(t => !t.published).length}</div>
          <div className="text-xs text-nearblack/50">Drafts</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-teal">{tours.filter(t => t.featured).length}</div>
          <div className="text-xs text-nearblack/50">Featured</div>
        </div>
      </div>

      {/* Tour List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {tours.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Tour</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Price</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Featured</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {tours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-nearblack">{tour.title.en}</div>
                        <div className="text-xs text-nearblack/50">Slug: {tour.slug.en}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-teal">${tour.price}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        tour.published ? 'bg-olive/10 text-olive' : 'bg-ochre/10 text-ochre'
                      }`}>
                        {tour.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {tour.featured ? (
                        <span className="text-xs px-3 py-1 rounded-full font-medium bg-teal/10 text-teal">Featured</span>
                      ) : (
                        <span className="text-xs px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePublish(tour.id, tour.published)}
                          className="p-2 hover:bg-cream rounded-lg transition-colors"
                          title={tour.published ? 'Unpublish' : 'Publish'}
                        >
                          {tour.published ? (
                            <EyeIcon className="w-5 h-5 text-olive" />
                          ) : (
                            <EyeSlashIcon className="w-5 h-5 text-ochre" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleFeatured(tour.id, tour.featured)}
                          className="p-2 hover:bg-cream rounded-lg transition-colors"
                          title={tour.featured ? 'Remove featured' : 'Make featured'}
                        >
                          <ArrowPathIcon className={`w-5 h-5 ${tour.featured ? 'text-teal' : 'text-gray-400'}`} />
                        </button>
                        <Link
                          href={`/admin/tours/${tour.id}`}
                          className="p-2 hover:bg-cream rounded-lg transition-colors"
                        >
                          <PencilIcon className="w-5 h-5 text-nearblack/60" />
                        </Link>
                        <button
                          onClick={() => handleDelete(tour.id)}
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
            <p>No tours yet. Click "Add New Tour" to create your first tour.</p>
          </div>
        )}
      </div>
    </div>
  );
}