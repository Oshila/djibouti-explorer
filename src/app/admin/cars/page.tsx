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

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuelType: string;
  seats: number;
  luggage: number;
  pricePerDay: number;
  priceWithDriver: number;
  image: string;
  images: string[];
  availability: boolean;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: any;
}

export default function AdminCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const q = query(collection(db, 'cars'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Car[];
      setCars(data);
      setFilteredCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const filtered = cars.filter(car => 
        car.name.toLowerCase().includes(search) ||
        car.brand.toLowerCase().includes(search) ||
        car.model.toLowerCase().includes(search)
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [searchTerm, cars]);

  const toggleAvailability = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'cars', id), { 
        availability: !current,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Car ${!current ? 'available' : 'unavailable'}`);
      fetchCars();
    } catch (error) {
      toast.error('Failed to update car');
    }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'cars', id), { 
        featured: !current,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Car ${!current ? 'featured' : 'unfeatured'}`);
      fetchCars();
    } catch (error) {
      toast.error('Failed to update car');
    }
  };

  const deleteCar = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'cars', id));
      toast.success('Car deleted');
      fetchCars();
    } catch (error) {
      toast.error('Failed to delete car');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading text-teal">Manage Cars</h1>
          <p className="text-nearblack/60">{cars.length} cars total</p>
        </div>
        <Link
          href="/admin/cars/new"
          className="bg-teal hover:bg-teal/90 text-white px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Car
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-nearblack/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-teal">{cars.length}</div>
          <div className="text-xs text-nearblack/50">Total</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-olive">{cars.filter(c => c.availability).length}</div>
          <div className="text-xs text-nearblack/50">Available</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-ochre">{cars.filter(c => !c.availability).length}</div>
          <div className="text-xs text-nearblack/50">Unavailable</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-teal">{cars.filter(c => c.featured).length}</div>
          <div className="text-xs text-nearblack/50">Featured</div>
        </div>
      </div>

      {/* Car List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream/50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50 uppercase">Car</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Price</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-nearblack/50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream">
              {filteredCars.map((car) => (
                <tr key={car.id} className="hover:bg-cream/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {car.image && (
                        <img src={car.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      )}
                      <div>
                        <div className="font-medium text-nearblack">{car.name}</div>
                        <div className="text-xs text-nearblack/50">{car.brand} {car.model} ({car.year})</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-teal">${car.pricePerDay}</div>
                    <div className="text-xs text-nearblack/50">With driver: ${car.priceWithDriver}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        car.availability ? 'bg-olive/10 text-olive' : 'bg-terracotta/10 text-terracotta'
                      }`}>
                        {car.availability ? 'Available' : 'Unavailable'}
                      </span>
                      {car.featured && (
                        <span className="text-xs px-3 py-1 rounded-full font-medium bg-ochre/10 text-ochre">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Availability Toggle */}
                      <button
                        onClick={() => toggleAvailability(car.id, car.availability)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          car.availability 
                            ? 'bg-olive/10 text-olive hover:bg-olive/20' 
                            : 'bg-terracotta/10 text-terracotta hover:bg-terracotta/20'
                        }`}
                      >
                        {car.availability ? (
                          <>
                            <CheckCircleIcon className="w-3.5 h-3.5" />
                            Available
                          </>
                        ) : (
                          <>
                            <XCircleIcon className="w-3.5 h-3.5" />
                            Unavailable
                          </>
                        )}
                      </button>

                      {/* Featured Toggle */}
                      <button
                        onClick={() => toggleFeatured(car.id, car.featured)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          car.featured 
                            ? 'bg-ochre/10 text-ochre hover:bg-ochre/20' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        <EyeIcon className="w-3.5 h-3.5" />
                        {car.featured ? 'Featured' : 'Feature'}
                      </button>

                      {/* Edit */}
                      <Link
                        href={`/admin/cars/${car.id}`}
                        className="px-3 py-1.5 bg-teal/10 text-teal hover:bg-teal/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <PencilIcon className="w-3.5 h-3.5" />
                        Edit
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => deleteCar(car.id, car.name)}
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
        {filteredCars.length === 0 && (
          <div className="p-8 text-center text-nearblack/40">
            <p>No cars found. <Link href="/admin/cars/new" className="text-teal hover:text-terracotta">Add your first car →</Link></p>
          </div>
        )}
      </div>
    </div>
  );
}