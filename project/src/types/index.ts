export interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string;
  location: string;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  website?: string;
  image: string;
  isPremium: boolean;
  services: string[];
  hours: {
    [key: string]: string;
  };
}

export interface Interaction {
  id: string;
  businessId: string;
  businessName: string;
  type: 'view' | 'contact' | 'review' | 'favorite';
  date: string;
  details?: string;
}