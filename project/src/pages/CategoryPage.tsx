import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, MapPin, Crown, Phone, Filter, Grid, List } from 'lucide-react';
import { Category, Business } from '../types';

interface CategoryPageProps {
  categoryId: string;
  onBusinessSelect: (business: Business) => void;
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onBusinessSelect, onBack }) => {
  // État local pour les données de la catégorie
  const [category, setCategory] = useState<Category | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    city: '',
    district: '',
    sortBy: 'rating',
    showPremiumOnly: false
  });

  // Données simulées pour les entreprises de cette catégorie
  const mockBusinesses: Business[] = [
    {
      id: '1',
      name: 'Restaurant Chez Mama',
      category: 'restaurants',
      location: 'Douala, Akwa',
      description: 'Restaurant traditionnel camerounais proposant des plats authentiques dans une ambiance chaleureuse.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.5,
      reviews: 128,
      phone: '+237 691 234 567',
      website: 'www.chezmama.cm',
      hours: '11h00 - 22h00',
      services: ['Plats traditionnels', 'Livraison', 'Traiteur'],
      isPremium: true
    },
    {
      id: '2',
      name: 'Atelier Bois Précieux',
      category: 'artisans',
      location: 'Yaoundé, Mfoundi',
      description: 'Menuiserie artisanale spécialisée dans les meubles en bois précieux camerounais.',
      image: 'https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviews: 67,
      phone: '+237 699 876 543',
      hours: '08h00 - 17h00',
      services: ['Meubles sur mesure', 'Restauration', 'Sculpture'],
      isPremium: false
    },
    {
      id: '3',
      name: 'Plomberie Express',
      category: 'services',
      location: 'Douala, Bonapriso',
      description: 'Service de plomberie rapide et professionnel disponible 24h/24.',
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.2,
      reviews: 89,
      phone: '+237 677 345 678',
      hours: '24h/24',
      services: ['Réparation', 'Installation', 'Urgence'],
      isPremium: true
    }
  ];

  // Options de filtrage
  const cities = ['Toutes les villes', 'Douala', 'Yaoundé', 'Bafoussam', 'Garoua', 'Bamenda'];
  const districts = ['Tous les quartiers', 'Akwa', 'Bonapriso', 'Bonanjo', 'Mfoundi', 'Centre-ville'];
  const sortOptions = [
    { value: 'rating', label: 'Note la plus élevée' },
    { value: 'reviews', label: 'Plus d\'avis' },
    { value: 'name', label: 'Nom A-Z' },
    { value: 'recent', label: 'Plus récent' }
  ];

  // Charger les données de la catégorie
  useEffect(() => {
    const loadCategoryData = async () => {
      setIsLoading(true);
      try {
        // Simulation d'appel API
        // const response = await fetch(`/api/categories/${categoryId}`);
        // const data = await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Données simulées basées sur l'ID de catégorie
        const categoryData: Category = {
          id: categoryId,
          name: getCategoryName(categoryId),
          description: getCategoryDescription(categoryId),
          icon: getCategoryIcon(categoryId),
          count: mockBusinesses.length
        };
        
        setCategory(categoryData);
        setBusinesses(mockBusinesses.filter(b => b.category === categoryId));
      } catch (error) {
        console.error('Erreur lors du chargement de la catégorie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryData();
  }, [categoryId]);

  // Fonctions utilitaires pour obtenir les informations de catégorie
  const getCategoryName = (id: string): string => {
    const names: Record<string, string> = {
      restaurants: 'Restaurants',
      artisans: 'Artisans',
      services: 'Services',
      commerces: 'Commerces',
      beaute: 'Beauté & Bien-être',
      automobile: 'Automobile'
    };
    return names[id] || 'Catégorie';
  };

  const getCategoryDescription = (id: string): string => {
    const descriptions: Record<string, string> = {
      restaurants: 'Découvrez les meilleurs restaurants et cuisines du Cameroun',
      artisans: 'Trouvez des artisans qualifiés pour tous vos projets',
      services: 'Services professionnels pour particuliers et entreprises',
      commerces: 'Boutiques et magasins locaux près de chez vous',
      beaute: 'Salons de beauté et centres de bien-être',
      automobile: 'Garages et services automobiles'
    };
    return descriptions[id] || 'Description de la catégorie';
  };

  const getCategoryIcon = (id: string): string => {
    const icons: Record<string, string> = {
      restaurants: '🍽️',
      artisans: '🔨',
      services: '⚙️',
      commerces: '🛍️',
      beaute: '💄',
      automobile: '🚗'
    };
    return icons[id] || '📋';
  };

  // Gérer les changements de filtres
  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Filtrer et trier les entreprises
  const getFilteredBusinesses = () => {
    let filtered = [...businesses];

    // Filtrer par ville
    if (filters.city && filters.city !== 'Toutes les villes') {
      filtered = filtered.filter(b => b.location.includes(filters.city));
    }

    // Filtrer par quartier
    if (filters.district && filters.district !== 'Tous les quartiers') {
      filtered = filtered.filter(b => b.location.includes(filters.district));
    }

    // Filtrer par premium
    if (filters.showPremiumOnly) {
      filtered = filtered.filter(b => b.isPremium);
    }

    // Trier
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredBusinesses = getFilteredBusinesses();
  const premiumBusinesses = filteredBusinesses.filter(b => b.isPremium);
  const regularBusinesses = filteredBusinesses.filter(b => !b.isPremium);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des entreprises...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Catégorie non trouvée</p>
          <button onClick={onBack} className="mt-4 text-gray-700 hover:text-gray-900 underline">
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{category.icon}</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
                <p className="text-gray-600">{filteredBusinesses.length} entreprise(s) trouvée(s)</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Description de la catégorie */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Filtres et contrôles */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filtrer par :</span>
              </div>
              
              <select 
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              
              <select 
                value={filters.district}
                onChange={(e) => handleFilterChange('district', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              
              <select 
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.showPremiumOnly}
                  onChange={(e) => handleFilterChange('showPremiumOnly', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Premium uniquement</span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune entreprise trouvée avec ces critères</p>
            <button
              onClick={() => setFilters({ city: '', district: '', sortBy: 'rating', showPremiumOnly: false })}
              className="mt-4 text-gray-700 hover:text-gray-900 underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            {/* Entreprises Premium */}
            {premiumBusinesses.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Crown className="w-5 h-5 text-yellow-500 mr-2" />
                  Entreprises Premium ({premiumBusinesses.length})
                </h2>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {premiumBusinesses.map((business) => (
                    <BusinessCard 
                      key={business.id} 
                      business={business} 
                      viewMode={viewMode}
                      onSelect={() => onBusinessSelect(business)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Entreprises régulières */}
            {regularBusinesses.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Toutes les entreprises ({regularBusinesses.length})
                </h2>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {regularBusinesses.map((business) => (
                    <BusinessCard 
                      key={business.id} 
                      business={business} 
                      viewMode={viewMode}
                      onSelect={() => onBusinessSelect(business)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Composant pour afficher une carte d'entreprise
interface BusinessCardProps {
  business: Business;
  viewMode: 'grid' | 'list';
  onSelect: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, viewMode, onSelect }) => {
  if (viewMode === 'list') {
    return (
      <div
        onClick={onSelect}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6 flex items-center space-x-6"
      >
        <img
          src={business.image}
          alt={business.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {business.isPremium && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                Premium
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{business.name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{business.location}</span>
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{business.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {business.rating} ({business.reviews} avis)
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-1" />
              <span className="text-sm">Contact</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden ${
        business.isPremium ? 'border-2 border-yellow-200' : ''
      }`}
    >
      <div className="relative">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
        {business.isPremium && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
              Premium
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{business.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{business.location}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">
              {business.rating} ({business.reviews} avis)
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-1" />
            <span className="text-sm">Contact</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;