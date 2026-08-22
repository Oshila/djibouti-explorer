export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: 'standard' | 'premium' | 'suv' | 'luxury' | '4x4';
  transmission: 'automatic' | 'manual';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  luggage: number;
  doors: number;
  pricePerDay: number;
  priceWithDriver: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  specifications: {
    engine: string;
    horsepower: number;
    fuelConsumption: string;
    drivetrain: string;
    groundClearance: number;
  };
  availability: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}