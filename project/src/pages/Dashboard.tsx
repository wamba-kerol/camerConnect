import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/mockData';
import { ArrowRight, Search, Building2, Star, TrendingUp, Clock, Users, MapPin, UtensilsCrossed, Hammer, ShoppingBag, Wrench, HeartPulse, BookOpen, Car, Smartphone } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'utensils-crossed': UtensilsCrossed,
      'hammer': Hammer,
      'shopping-bag': ShoppingBag,
      'wrench': Wrench,
      'heart-pulse': HeartPulse,
      'book-open': BookOpen,
      'car': Car,
      'smartphone': Smartphone,
    };
    return iconMap[iconName] || Building2;
  };

  const recentActivities = [
    {
      id: 1,
      action: 'Recherche effectuée',
      category: 'Restaurants',
      time: 'Il y a 2 heures',
      icon: Search
    },
    {
      id: 2,
      action: 'Avis laissé',
      business: 'Restaurant Chez Mama',
      rating: 5,
      time: 'Il y a 1 jour',
      icon: Star
    },
    {
      id: 3,
      action: 'Nouveau favori',
      business: 'Électricien Paul',
      time: 'Il y a 3 jours',
      icon: MapPin
    }
  ];

  const popularCategories = [
    { name: 'Restaurants', count: 156, growth: '+12%' },
    { name: 'Artisans', count: 89, growth: '+8%' },
    { name: 'Commerces', count: 203, growth: '+15%' },
    { name: 'Services', count: 142, growth: '+5%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Bienvenue, {user?.name} !
          </h1>
          <p className="text-gray-600">
            Découvrez les meilleures entreprises et services de votre région.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            className="bg-gradient-to-r from-gray-900 to-black text-white rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/dashboard')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Explorer les catégories</h3>
                <p className="text-gray-300 text-sm">{categories.length}+ catégories disponibles</p>
              </div>
              <ArrowRight className="h-8 w-8" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Rechercher</h3>
                <p className="text-gray-300 text-sm">Trouvez ce dont vous avez besoin</p>
              </div>
              <Search className="h-8 w-8" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Mes favoris</h3>
                <p className="text-gray-300 text-sm">Vos entreprises préférées</p>
              </div>
              <Star className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-black">Activités récentes</h2>
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <activity.icon className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-black">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        {activity.category && `Catégorie: ${activity.category}`}
                        {activity.business && `Entreprise: ${activity.business}`}
                        {activity.rating && ` - ${activity.rating} étoiles`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-black">Catégories populaires</h2>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {popularCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-black">{category.name}</p>
                      <p className="text-sm text-gray-600">{category.count} entreprises</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-black font-medium">{category.growth}</span>
                      <TrendingUp className="h-4 w-4 text-black" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Users className="h-8 w-8 text-black mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">1,200+</div>
            <div className="text-sm text-gray-600">Entreprises vérifiées</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Building2 className="h-8 w-8 text-black mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">50+</div>
            <div className="text-sm text-gray-600">Villes couvertes</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">4.8/5</div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Search className="h-8 w-8 text-black mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">15+</div>
            <div className="text-sm text-gray-600">Catégories</div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-black mb-8">Toutes les catégories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-black transition-colors duration-300">
                    {React.createElement(getIconComponent(category.icon), {
                      className: "w-6 h-6 text-black group-hover:text-white transition-colors duration-300"
                    })}
                  </div>
                  <ArrowRight className="text-gray-400 group-hover:text-black transition-colors duration-300" size={20} />
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-gray-800">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.count} services</span>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <span>Voir plus</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};