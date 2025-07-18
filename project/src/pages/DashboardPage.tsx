import React, { useState, useEffect } from 'react';
import { Building2, User, Search, TrendingUp, MapPin, Star, Bell, Menu } from 'lucide-react';
import { Category } from '../types';

interface DashboardPageProps {
  onCategorySelect: (category: Category) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onCategorySelect }) => {
  // État local pour les données du dashboard
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    newThisWeek: 0,
    citiesCovered: 0
  });

  // Données des catégories (normalement récupérées depuis l'API)
  const categoriesData: Category[] = [
    {
      id: 'restaurants',
      name: 'Restaurants',
      description: 'Découvrez les meilleurs restaurants et cuisines du Cameroun',
      icon: '🍽️',
      count: 145
    },
    {
      id: 'artisans',
      name: 'Artisans',
      description: 'Trouvez des artisans qualifiés pour tous vos projets',
      icon: '🔨',
      count: 89
    },
    {
      id: 'services',
      name: 'Services',
      description: 'Services professionnels pour particuliers et entreprises',
      icon: '⚙️',
      count: 234
    },
    {
      id: 'commerces',
      name: 'Commerces',
      description: 'Boutiques et magasins locaux près de chez vous',
      icon: '🛍️',
      count: 312
    },
    {
      id: 'beaute',
      name: 'Beauté & Bien-être',
      description: 'Salons de beauté et centres de bien-être',
      icon: '💄',
      count: 67
    },
    {
      id: 'automobile',
      name: 'Automobile',
      description: 'Garages et services automobiles',
      icon: '🚗',
      count: 78
    },
    {
      id: 'sante',
      name: 'Santé',
      description: 'Professionnels de santé et pharmacies',
      icon: '🏥',
      count: 156
    },
    {
      id: 'education',
      name: 'Éducation',
      description: 'Écoles, formations et cours particuliers',
      icon: '📚',
      count: 98
    },
    {
      id: 'immobilier',
      name: 'Immobilier',
      description: 'Agences immobilières et services de logement',
      icon: '🏠',
      count: 124
    }
  ];

  // Entreprises en vedette (normalement récupérées depuis l'API)
  const featuredBusinesses = [
    {
      id: '1',
      name: 'Restaurant Chez Mama',
      location: 'Douala, Akwa',
      rating: 4.5,
      reviews: 128,
      isPremium: true,
      category: 'Restaurants'
    },
    {
      id: '2',
      name: 'Atelier Bois Précieux',
      location: 'Yaoundé, Mfoundi',
      rating: 4.8,
      reviews: 67,
      isPremium: false,
      category: 'Artisans'
    },
    {
      id: '3',
      name: 'Salon de Beauté Élégance',
      location: 'Douala, Bonanjo',
      rating: 4.4,
      reviews: 203,
      isPremium: true,
      category: 'Beauté'
    }
  ];

  // Charger les données au montage du composant
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulation d'appel API
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();
        
        // Simulation d'un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCategories(categoriesData);
        setStats({
          totalBusinesses: categoriesData.reduce((sum, cat) => sum + cat.count, 0),
          newThisWeek: 47,
          citiesCovered: 15
        });
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Filtrer les catégories selon la recherche
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fonction pour gérer la recherche
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center py-4">
      {/* Logo + Titre */}
      <div className="flex items-center space-x-3">
        <Building2 className="w-8 h-8 text-gray-700" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">CamerConnect</h1>
      </div>

      {/* Search bar & Icons */}
      <div className="flex items-center space-x-4">
        {/* Search bar - cachée sur petits écrans */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une entreprise ou catégorie..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 w-60 lg:w-80"
          />
        </div>

        {/* Bell icon */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* User icon */}
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <User className="w-6 h-6" />
        </button>

        {/* Menu burger - visible uniquement sur petits écrans */}
        <button className="p-2 text-gray-600 hover:text-gray-900 md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</header>


      {/* Recherche mobile */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
      </div>

      {/* Section de bienvenue */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Bienvenue sur CamerConnect !
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez les entreprises camerounaises qui enrichissent votre communauté locale
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Entreprises disponibles</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalBusinesses.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Nouvelles cette semaine</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.newThisWeek}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Villes couvertes</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.citiesCovered}</p>
            </div>
          </div>
        </div>

        {/* Catégories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Explorez les catégories d'entreprises
            </h3>
            {searchQuery && (
              <p className="text-sm text-gray-600">
                {filteredCategories.length} résultat(s) pour "{searchQuery}"
              </p>
            )}
          </div>
          
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucune catégorie trouvée pour "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-gray-700 hover:text-gray-900 underline"
              >
                Effacer la recherche
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => onCategorySelect(category)}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{category.count}</p>
                      <p className="text-sm text-gray-600">entreprises</p>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                    {category.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Entreprises en vedette */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Entreprises en vedette
            </h3>
            <button className="text-gray-600 hover:text-gray-900 text-sm">
              Voir tout
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredBusinesses.map((business) => (
              <div key={business.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-2 mb-2">
                  {business.isPremium && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                      Premium
                    </span>
                  )}
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {business.category}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{business.name}</h4>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {business.location}
                </p>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">
                    {business.rating} ({business.reviews} avis)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;