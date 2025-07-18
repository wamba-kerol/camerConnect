import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories, businesses } from '../data/mockData';
import { BusinessCard } from '../components/BusinessCard';
import { ArrowLeft, Search, Filter, SlidersHorizontal } from 'lucide-react';

export const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('rating');
  const [showFilters, setShowFilters] = React.useState(false);

  const category = categories.find(cat => cat.id === categoryId);
  const categoryBusinesses = businesses.filter(business => business.categoryId === categoryId);

  const filteredBusinesses = categoryBusinesses
    .filter(business =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Catégorie non trouvée</h1>
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200 mb-6">
            <ArrowLeft size={20} />
            <span>Retour aux catégories</span>
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {category.name.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">{category.name}</h1>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une entreprise..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Mieux notés</option>
                <option value="reviews">Plus d'avis</option>
                <option value="name">Nom A-Z</option>
              </select>
              
              <button
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={20} />
                <span>Filtres</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-black">
            {filteredBusinesses.length} entreprise{filteredBusinesses.length !== 1 ? 's' : ''} trouvée{filteredBusinesses.length !== 1 ? 's' : ''}
          </h2>
          <div className="text-sm text-gray-500">
            Trié par {sortBy === 'rating' ? 'note' : sortBy === 'reviews' ? 'nombre d\'avis' : 'nom'}
          </div>
        </div>

        {/* Business Grid */}
        {filteredBusinesses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucune entreprise trouvée
            </h3>
            <p className="text-gray-500">
              Essayez avec des mots-clés différents ou ajustez vos filtres
            </p>
          </div>
        )}
      </div>
    </div>
  );
};