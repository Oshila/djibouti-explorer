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
  orderBy,
  addDoc
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  StarIcon,
  StarIcon as StarOutlineIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Tour {
  id: string;
  title: { en: string; fr: string };
  price: number;
  slug: { en: string; fr: string };
  published: boolean;
  featured: boolean;
  duration: number;
  maxGroupSize: number;
  rating: number;
  reviewCount: number;
  categories: string[];
  images: { primary: string };
  createdAt: any;
  updatedAt: any;
}

export default function AdminTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTours, setSelectedTours] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'not-featured'>('all');

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const q = query(collection(db, 'tours'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const tourData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || { en: 'Untitled', fr: 'Sans titre' },
          price: data.price || 0,
          slug: data.slug || { en: 'untitled', fr: 'sans-titre' },
          published: data.published || false,
          featured: data.featured || false,
          duration: data.duration || 1,
          maxGroupSize: data.maxGroupSize || 10,
          rating: data.rating || 0,
          reviewCount: data.reviewCount || 0,
          categories: data.categories || [],
          images: data.images || { primary: '' },
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
        } as Tour;
      });
      setTours(tourData);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast.error('Failed to load tours');
    } finally {
      setLoading(false);
    }
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = (tour.title?.en || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (tour.title?.fr || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && tour.published) ||
                         (filterStatus === 'draft' && !tour.published);
    const matchesFeatured = filterFeatured === 'all' ||
                           (filterFeatured === 'featured' && tour.featured) ||
                           (filterFeatured === 'not-featured' && !tour.featured);
    return matchesSearch && matchesStatus && matchesFeatured;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this tour? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'tours', id));
      toast.success('Tour deleted');
      fetchTours();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTours.length === 0) return;
    if (!confirm(`Delete ${selectedTours.length} tours?`)) return;
    try {
      for (const id of selectedTours) {
        await deleteDoc(doc(db, 'tours', id));
      }
      toast.success(`${selectedTours.length} tours deleted`);
      setSelectedTours([]);
      fetchTours();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'tours', id), {
        published: !currentStatus,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Tour ${!currentStatus ? 'published' : 'unpublished'}`);
      fetchTours();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'tours', id), {
        featured: !currentStatus,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Tour ${!currentStatus ? 'featured' : 'unfeatured'}`);
      fetchTours();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const duplicateTour = async (tour: Tour) => {
    try {
      const { id, ...tourData } = tour;
      const newTour = {
        ...tourData,
        title: {
          en: `${tour.title?.en || 'Tour'} (Copy)`,
          fr: `${tour.title?.fr || 'Circuit'} (Copie)`
        },
        slug: {
          en: `${tour.slug?.en || 'tour'}-copy`,
          fr: `${tour.slug?.fr || 'circuit'}-copie`
        },
        featured: false,
        published: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await addDoc(collection(db, 'tours'), newTour);
      toast.success('Tour duplicated');
      fetchTours();
    } catch (error) {
      toast.error('Failed to duplicate');
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedTours(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedTours.length === filteredTours.length) {
      setSelectedTours([]);
    } else {
      setSelectedTours(filteredTours.map(t => t.id));
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
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-teal">{tours.length}</div>
          <div className="text-xs text-nearblack/50">Total</div>
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
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-amber-500">
            {tours.length > 0 ? (tours.reduce((sum, t) => sum + (t.rating || 0), 0) / tours.length).toFixed(1) : '0'}
          </div>
          <div className="text-xs text-nearblack/50">Avg Rating</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-teal">{tours.reduce((sum, t) => sum + (t.reviewCount || 0), 0)}</div>
          <div className="text-xs text-nearblack/50">Reviews</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
            >
              <option value="all">All Featured</option>
              <option value="featured">Featured</option>
              <option value="not-featured">Not Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTours.length > 0 && (
        <div className="bg-teal/5 rounded-xl p-4 mb-6 flex items-center justify-between border border-teal/20">
          <span className="text-sm text-teal font-medium">
            {selectedTours.length} tour{selectedTours.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              className="bg-terracotta hover:bg-terracotta/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedTours([])}
              className="border border-cream text-nearblack/60 px-4 py-2 rounded-lg text-sm font-medium hover:bg-cream transition"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Tour List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream/50">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedTours.length === filteredTours.length && filteredTours.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-cream text-teal focus:ring-teal"
                  />
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-nearblack/50 uppercase tracking-wider">Tour</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-nearblack/50">Price</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-nearblack/50">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-nearblack/50">Featured</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-nearblack/50">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-nearblack/50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream">
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="hover:bg-cream/30 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedTours.includes(tour.id)}
                      onChange={() => toggleSelect(tour.id)}
                      className="w-4 h-4 rounded border-cream text-teal focus:ring-teal"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {tour.images?.primary ? (
                        <img src={tour.images.primary} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal/30">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M3.055 11.5a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z M12 3.055a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M12 3.055a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-nearblack">{tour.title?.en || 'Untitled'}</div>
                        <div className="text-xs text-nearblack/50">{tour.slug?.en || 'no-slug'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-teal">${tour.price || 0}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      tour.published ? 'bg-olive/10 text-olive' : 'bg-ochre/10 text-ochre'
                    }`}>
                      {tour.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {tour.featured ? (
                      <span className="text-xs px-3 py-1 rounded-full font-medium bg-teal/10 text-teal flex items-center gap-1">
                        <StarSolidIcon className="w-3 h-3" />
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium">{tour.rating || 0}</span>
                    <span className="text-xs text-nearblack/50 ml-1">({tour.reviewCount || 0})</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Publish/Unpublish */}
                      <button
                        onClick={() => togglePublish(tour.id, tour.published)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          tour.published 
                            ? 'bg-olive/10 text-olive hover:bg-olive/20' 
                            : 'bg-ochre/10 text-ochre hover:bg-ochre/20'
                        }`}
                      >
                        {tour.published ? (
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

                      {/* Feature/Unfeature */}
                      <button
                        onClick={() => toggleFeatured(tour.id, tour.featured)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          tour.featured 
                            ? 'bg-teal/10 text-teal hover:bg-teal/20' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {tour.featured ? (
                          <>
                            <StarIcon className="w-3.5 h-3.5 fill-teal" />
                            Featured
                          </>
                        ) : (
                          <>
                            <StarOutlineIcon className="w-3.5 h-3.5" />
                            Feature
                          </>
                        )}
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => duplicateTour(tour)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-1.5"
                      >
                        <DocumentDuplicateIcon className="w-3.5 h-3.5" />
                        Copy
                      </button>

                      {/* Edit */}
                      <Link
                        href={`/admin/tours/${tour.id}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-teal/10 text-teal hover:bg-teal/20 flex items-center gap-1.5"
                      >
                        <PencilIcon className="w-3.5 h-3.5" />
                        Edit
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-terracotta/10 text-terracotta hover:bg-terracotta/20 flex items-center gap-1.5"
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

        {filteredTours.length === 0 && (
          <div className="p-8 text-center text-nearblack/40">
            <p>No tours found</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterFeatured('all');
              }}
              className="mt-2 text-teal hover:text-terracotta transition-colors text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}