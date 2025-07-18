import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Grid, List } from 'lucide-react';
import { categories, businesses } from '../data/mockData';

interface CategoryPageProps {
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ onBack }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find(c => c.id === categoryId);
  const filteredBusinesses = businesses.filter(b => b.categoryId === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Catégorie non trouvée</h1>
          <button onClick={onBack} className="text-blue-600 hover:underline">
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200">
            <ArrowLeft size={20} />
            <span>Retour</span>
          </button>
          <h1 className="text-3xl font-bold text-black">{category.name}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Link 
              key={business.id} 
              to={`/business/${business.id}`} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="relative h-48">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                {business.isPremium && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <span>Premium</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-2">{business.name}</h3>
                <p className="text-gray-600 mb-4">{business.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-semibold">{business.rating}</span>
                    <span className="text-gray-500">({business.reviews} avis)</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600">{business.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
