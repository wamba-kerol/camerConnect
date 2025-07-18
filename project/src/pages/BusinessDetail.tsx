import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { businesses } from '../data/mockData';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Star, Clock, Crown, Heart } from 'lucide-react';

export const BusinessDetail: React.FC = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const business = businesses.find(b => b.id === businessId);

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Entreprise non trouvée</h1>
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
        {/* Back Button */}
        <Link 
          to={`/category/${business.categoryId}`} 
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Retour à {business.category}</span>
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover"
            />
            {business.isPremium && (
              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <Crown size={16} />
                <span>Premium</span>
              </div>
            )}
            <div className="absolute bottom-4 right-4">
              <button className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
                <Heart size={20} />
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">{business.name}</h1>
                <p className="text-gray-600 mb-4">{business.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{business.rating}</span>
                    <span className="text-gray-500">({business.reviews} avis)</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600">{business.category}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Informations de contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{business.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a href={`tel:${business.phone}`} className="text-gray-600 hover:text-black transition-colors duration-200">
                      {business.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a href={`mailto:${business.email}`} className="text-gray-600 hover:text-black transition-colors duration-200">
                      {business.email}
                    </a>
                  </div>
                  {business.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-200">
                        {business.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Horaires d'ouverture</h3>
                <div className="space-y-2">
                  {Object.entries(business.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-gray-600">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-black mb-4">Services proposés</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {business.services.map((service, index) => (
                  <div key={index} className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700">
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <Phone size={20} />
                <span>Appeler</span>
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center justify-center space-x-2 border border-black text-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-colors duration-200"
              >
                <Mail size={20} />
                <span>Contacter par email</span>
              </a>
              <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Heart size={20} />
                <span>Ajouter aux favoris</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-black mb-6">Avis clients</h3>
          <div className="text-center py-8 text-gray-500">
            <p>Les avis clients seront disponibles prochainement.</p>
          </div>
        </div>
      </div>
    </div>
  );
};