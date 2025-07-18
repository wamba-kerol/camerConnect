import { Category, Business, Interaction } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Restaurants',
    description: 'Découvrez les meilleurs restaurants locaux',
    icon: 'utensils-crossed',
    count: 156
  },
  {
    id: '2',
    name: 'Artisans',
    description: 'Menuisiers, électriciens, peintres et plus',
    icon: 'hammer',
    count: 89
  },
  {
    id: '3',
    name: 'Commerces',
    description: 'Magasins, boutiques et marchés',
    icon: 'shopping-bag',
    count: 203
  },
  {
    id: '4',
    name: 'Services',
    description: 'Coiffeurs, nettoyage, réparations',
    icon: 'wrench',
    count: 142
  },
  {
    id: '5',
    name: 'Santé',
    description: 'Pharmacies, cliniques, praticiens',
    icon: 'heart-pulse',
    count: 67
  },
  {
    id: '6',
    name: 'Éducation',
    description: 'Écoles, cours particuliers, formations',
    icon: 'book-open',
    count: 78
  },
  {
    id: '7',
    name: 'Transport',
    description: 'Taxis, transport en commun, livraisons',
    icon: 'car',
    count: 45
  },
  {
    id: '8',
    name: 'Technologie',
    description: 'Réparation téléphones, informatique',
    icon: 'smartphone',
    count: 34
  }
];

export const businesses: Business[] = [
  {
    id: '1',
    name: 'Restaurant Chez Mama',
    description: 'Restaurant traditionnel camerounais proposant des plats authentiques dans une ambiance chaleureuse.',
    category: 'Restaurants',
    categoryId: '1',
    location: 'Yaoundé, Bastos',
    rating: 4.8,
    reviews: 127,
    phone: '+237 6 99 99 99 99',
    email: 'contact@chezmama.cm',
    website: 'www.chezmama.cm',
    image: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=500',
    isPremium: true,
    services: ['Cuisine traditionnelle', 'Plats à emporter', 'Livraison', 'Événements'],
    hours: {
      'Lundi-Vendredi': '11h00 - 22h00',
      'Samedi-Dimanche': '10h00 - 23h00'
    }
  },
  {
    id: '2',
    name: 'Électricien Paul',
    description: 'Électricien professionnel avec 15 ans d\'expérience. Interventions rapides et garanties.',
    category: 'Artisans',
    categoryId: '2',
    location: 'Douala, Akwa',
    rating: 4.9,
    reviews: 89,
    phone: '+237 6 88 88 88 88',
    email: 'paul.electricien@gmail.com',
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=500',
    isPremium: false,
    services: ['Installation électrique', 'Réparation', 'Maintenance', 'Urgences 24h/24'],
    hours: {
      'Lundi-Vendredi': '08h00 - 18h00',
      'Samedi': '08h00 - 14h00'
    }
  },
  {
    id: '3',
    name: 'Boutique Élégance',
    description: 'Mode féminine et masculine, accessoires et articles de beauté de qualité.',
    category: 'Commerces',
    categoryId: '3',
    location: 'Yaoundé, Centre-ville',
    rating: 4.6,
    reviews: 234,
    phone: '+237 6 77 77 77 77',
    email: 'elegance@shop.cm',
    image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=500',
    isPremium: true,
    services: ['Vêtements', 'Accessoires', 'Conseil style', 'Retouches'],
    hours: {
      'Lundi-Samedi': '09h00 - 19h00',
      'Dimanche': '14h00 - 18h00'
    }
  }
];

export const interactions: Interaction[] = [
  {
    id: '1',
    businessId: '1',
    businessName: 'Restaurant Chez Mama',
    type: 'view',
    date: '2024-01-15T10:30:00',
    details: 'Consultation de la page détaillée'
  },
  {
    id: '2',
    businessId: '2',
    businessName: 'Électricien Paul',
    type: 'contact',
    date: '2024-01-14T14:20:00',
    details: 'Appel téléphonique pour devis'
  },
  {
    id: '3',
    businessId: '3',
    businessName: 'Boutique Élégance',
    type: 'favorite',
    date: '2024-01-13T16:45:00',
    details: 'Ajouté aux favoris'
  }
];