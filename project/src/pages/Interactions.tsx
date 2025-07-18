import React from 'react';
import { interactions } from '../data/mockData';
import { Eye, Phone, Heart, Star, Clock } from 'lucide-react';

export const Interactions: React.FC = () => {
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'view':
        return <Eye className="w-5 h-5 text-blue-500" />;
      case 'contact':
        return <Phone className="w-5 h-5 text-green-500" />;
      case 'favorite':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Eye className="w-5 h-5 text-gray-500" />;
    }
  };

  const getInteractionText = (type: string) => {
    switch (type) {
      case 'view':
        return 'Consultation';
      case 'contact':
        return 'Contact';
      case 'favorite':
        return 'Favori';
      case 'review':
        return 'Avis';
      default:
        return 'Interaction';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Mes interactions</h1>
          <p className="text-gray-600">
            Suivez vos interactions avec les entreprises de la plateforme
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-black mb-1">
              {interactions.filter(i => i.type === 'view').length}
            </div>
            <div className="text-sm text-gray-600">Consultations</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-black mb-1">
              {interactions.filter(i => i.type === 'contact').length}
            </div>
            <div className="text-sm text-gray-600">Contacts</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-black mb-1">
              {interactions.filter(i => i.type === 'favorite').length}
            </div>
            <div className="text-sm text-gray-600">Favoris</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-black mb-1">
              {interactions.filter(i => i.type === 'review').length}
            </div>
            <div className="text-sm text-gray-600">Avis</div>
          </div>
        </div>

        {/* Interactions List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-black">Historique des interactions</h2>
          </div>
          
          {interactions.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {interactions.map((interaction) => (
                <div key={interaction.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                      {getInteractionIcon(interaction.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-black">
                          {interaction.businessName}
                        </h3>
                        <span className="text-sm text-gray-500 flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{formatDate(interaction.date)}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {getInteractionText(interaction.type)}
                        </span>
                      </div>
                      
                      {interaction.details && (
                        <p className="text-sm text-gray-600">{interaction.details}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Eye size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucune interaction pour le moment
              </h3>
              <p className="text-gray-500 mb-4">
                Vos interactions avec les entreprises apparaîtront ici
              </p>
              <a
                href="/dashboard"
                className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <span>Explorer les entreprises</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};