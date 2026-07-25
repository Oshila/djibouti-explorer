'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function EditTourPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: { en: '', fr: '' },
    slug: { en: '', fr: '' },
    description: { en: '', fr: '' },
    shortDescription: { en: '', fr: '' },
    price: 0,
    depositAmount: 0,
    duration: 1,
    maxGroupSize: 8,
    difficulty: 'easy',
    minAge: 0,
    meetingPoint: { en: '', fr: '' },
    published: true,
    featured: false,
  });

  useEffect(() => {
    fetchTour();
  }, [id]);

  const fetchTour = async () => {
    try {
      const docRef = doc(db, 'tours', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData({ id: docSnap.id, ...docSnap.data() });
      } else {
        toast.error('Tour not found');
        router.push('/admin/tours');
      }
    } catch (error) {
      console.error('Error fetching tour:', error);
      toast.error('Failed to load tour');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateDoc(doc(db, 'tours', id), {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      toast.success('Tour updated successfully!');
      router.push('/admin/tours');
    } catch (error) {
      console.error('Error updating tour:', error);
      toast.error('Failed to update tour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading tour...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading text-teal">Edit Tour</h1>
        <p className="text-nearblack/60">Update tour details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* English Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-heading text-teal mb-4">English Content</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Title (EN) *</label>
              <input
                type="text"
                value={formData.title.en}
                onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Slug (EN)</label>
              <input
                type="text"
                value={formData.slug.en}
                onChange={(e) => setFormData({ ...formData, slug: { ...formData.slug, en: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Short Description (EN) *</label>
              <textarea
                value={formData.shortDescription.en}
                onChange={(e) => setFormData({ ...formData, shortDescription: { ...formData.shortDescription, en: e.target.value } })}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Full Description (EN) *</label>
              <textarea
                value={formData.description.en}
                onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none resize-none"
                required
              />
            </div>
          </div>
        </div>

        {/* French Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-heading text-teal mb-4">French Content</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Title (FR) *</label>
              <input
                type="text"
                value={formData.title.fr}
                onChange={(e) => setFormData({ ...formData, title: { ...formData.title, fr: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Slug (FR)</label>
              <input
                type="text"
                value={formData.slug.fr}
                onChange={(e) => setFormData({ ...formData, slug: { ...formData.slug, fr: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Short Description (FR) *</label>
              <textarea
                value={formData.shortDescription.fr}
                onChange={(e) => setFormData({ ...formData, shortDescription: { ...formData.shortDescription, fr: e.target.value } })}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Full Description (FR) *</label>
              <textarea
                value={formData.description.fr}
                onChange={(e) => setFormData({ ...formData, description: { ...formData.description, fr: e.target.value } })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none resize-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-heading text-teal mb-4">Status</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-teal rounded"
              />
              <span className="text-sm">Published</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-teal rounded"
              />
              <span className="text-sm">Featured</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg active:scale-95 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/tours')}
            className="border border-cream text-nearblack/60 px-6 py-3 rounded-lg font-medium hover:bg-cream transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}