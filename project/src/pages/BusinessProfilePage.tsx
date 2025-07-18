import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, MapPin, Phone, Globe, Clock, Crown, Mail, MessageCircle, Share2, Heart, Flag } from 'lucide-react';
import { Business, Review } from '../types';

interface BusinessProfilePageProps {
  businessId: string;
  onBack: () => void;
}

const BusinessProfilePage: React.FC<BusinessProfilePageProps> = ({ businessId, onBack }) => {
  // État local pour les données de l'entreprise
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'photos'>('overview');

  // Données simulées pour l'entreprise
  const mockBusiness: Business = {
    id: businessId,
    name: 'Restaurant Chez Mama',
    category: 'restaurants',
    location: 'Douala, Akwa',
    description: 'Restaurant traditionnel camerounais proposant des plats authentiques dans une ambiance chaleureuse. Nous utilisons des ingrédients frais et locaux pour vous offrir une expérience culinaire inoubliable. Notre équipe passionnée vous accueille dans un cadre convivial et authentique.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    reviews: 128,
    phone: '+237 691 234 567',
    website: 'www.chezmama.cm',
    hours: '11h00 - 22h00',
    services: ['Plats traditionnels', 'Livraison', 'Traiteur', 'Événements privés'],
    isPremium: true
  };

  // Données simulées pour les avis
  const mockReviews: Review[] = [
    {
      id: '1',
      author: 'Marie Ngomo',
      rating: 5,
      comment: 'Excellent service ! La nourriture était délicieuse et l\'ambiance très agréable. Je recommande vivement ce restaurant à tous ceux qui veulent découvrir la vraie cuisine camerounaise.',
      date: '2024-01-15'
    },
    {
      id: '2',
      author: 'Jean Kamga',
      rating: 4,
      comment: 'Très bon restaurant avec des plats authentiques. Le service était rapide et le personnel très sympathique. Seul bémol, l\'attente était un peu longue mais ça valait le coup.',
      date: '2024-01-10'
    },
    {
      id: '3',
      author: 'Fatima Bella',
      rating: 5,
      comment: 'Une expérience culinaire fantastique ! Les saveurs étaient exceptionnelles et l\'accueil chaleureux. C\'est devenu mon restaurant préféré à Douala.',
      date: '2024-01-05'
    },
    {
      id: '4',
      author: 'Paul Mbarga',
      rating: 4,
      comment: 'Bonne cuisine traditionnelle, portions généreuses. L\'ambiance est conviviale et les prix raisonnables. Je reviendrai certainement.',
      date: '2024-01-02'
    }
  ];

  // Photos supplémentaires de l'entreprise
  const businessPhotos = [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  // Horaires détaillés
  const detailedHours = {
    'Lundi': '11h00 - 22h00',
    'Mardi': '11h00 - 22h00',
    'Mercredi': '11h00 - 22h00',
    'Jeudi': '11h00 - 22h00',
    'Vendredi': '11h00 - 23h00',
    'Samedi': '10h00 - 23h00',
    'Dimanche': '12h00 - 21h00'
  };

  // Charger les données de l'entreprise
  useEffect(() => {
    const loadBusinessData = async () => {
      setIsLoading(true);
      try {
        // Simulation d'appel API
        // const response = await fetch(`/api/businesses/${businessId}`);
        // const data = await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setBusiness(mockBusiness);
        setReviews(mockReviews);
        
        // Vérifier si l'entreprise est en favoris
        const favorites = JSON.parse(localStorage.getItem('camerconnect_favorites') || '[]');
        setIsFavorite(favorites.includes(businessId));
      } catch (error) {
        console.error('Erreur lors du chargement de l\'entreprise:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBusinessData();
  }, [businessId]);

  // Gérer les favoris
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('camerconnect_favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== businessId);
    } else {
      newFavorites = [...favorites, businessId];
    }
    
    localStorage.setItem('camerconnect_favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Partager l'entreprise
  const handleShare = async () => {
    if (navigator.share && business) {
      try {
        await navigator.share({
          title: business.name,
          text: business.description,
          url: window.location.href
        });
      } catch (error) {
        // Fallback pour les navigateurs qui ne supportent pas l'API Share
        navigator.clipboard.writeText(window.location.href);
        alert('Lien copié dans le presse-papiers !');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  // Calculer la distribution des notes
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Entreprise non trouvée</p>
          <button onClick={onBack} className="mt-4 text-gray-700 hover:text-gray-900 underline">
            Retour
          </button>
        </div>
      </div>
    );
  }

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                <Flag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête de l'entreprise */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-64 object-cover"
                />
                {business.isPremium && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full flex items-center">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-lg">{business.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(business.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-lg">{business.rating}</span>
                      <span className="text-gray-600">({business.reviews} avis)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Onglets */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Aperçu' },
                    { id: 'reviews', label: `Avis (${reviews.length})` },
                    { id: 'photos', label: 'Photos' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-gray-900 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{business.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Services proposés</h3>
                      <div className="flex flex-wrap gap-2">
                        {business.services.map((service, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Horaires d'ouverture</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(detailedHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between py-1">
                            <span className="font-medium text-gray-700">{day}</span>
                            <span className="text-gray-600">{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {/* Résumé des avis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-center mb-4">
                          <div className="text-4xl font-bold text-gray-900">{business.rating}</div>
                          <div className="flex items-center justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(business.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-gray-600">{business.reviews} avis</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Distribution des notes</h4>
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center mb-2">
                            <span className="text-sm text-gray-600 w-8">{rating}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{
                                  width: `${(ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100}%`
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                              {ratingDistribution[rating as keyof typeof ratingDistribution]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Liste des avis */}
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {review.author.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{review.author}</div>
                                <div className="text-sm text-gray-500">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'photos' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {businessPhotos.map((photo, index) => (
                      <div key={index} className="aspect-square">
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Barre latérale */}
          <div className="space-y-6">
            {/* Informations de contact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{business.phone}</span>
                </div>
                {business.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <a href={`https://${business.website}`} className="text-blue-600 hover:text-blue-800">
                      {business.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{business.hours}</span>
                </div>
              </div>
            </div>

            {/* Actions de contact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacter l'entreprise</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Appeler
                </button>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Message WhatsApp
                </button>
                <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Envoyer un email
                </button>
              </div>
            </div>

            {/* Localisation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Localisation</h3>
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Carte interactive</p>
                  <p className="text-xs">{business.location}</p>
                </div>
              </div>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                Obtenir l'itinéraire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfilePage;