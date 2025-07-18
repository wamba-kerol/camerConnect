export interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  phone: string;
  website?: string;
  hours: string;
  services: string[];
  isPremium: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export type Page = 'landing' | 'login' | 'register' | 'dashboard' | 'category' | 'business';