// Data shapes used across the Wheeltek Kawasaki Bitas app.

export type BikeCategory = 'Commuter' | 'Scooter' | 'Sport' | 'Naked' | 'Off-Road' | 'Cruiser' | 'Adventure';

export interface Motorcycle {
  id: string;
  name: string;
  category: BikeCategory;
  price: number; // SRP in Philippine pesos
  engine: string;
  transmission: string;
  colors: string[];
  description: string;
  highlights: string[];
  featured?: boolean;
}

export interface Accessory {
  id: string;
  name: string;
  type: 'Helmet' | 'Riding Gear' | 'Parts' | 'Care';
  price: number;
  description: string;
  icon: string; // ionicon name
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  inclusions: string[];
  icon: string;
  recommended?: boolean;
}

export interface Promo {
  title: string;
  subtitle: string;
  icon: string;
}
