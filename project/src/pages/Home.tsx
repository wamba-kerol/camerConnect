import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Users, Building, Star, ArrowRight, MapPin, Smartphone, Building2 } from 'lucide-react';
 import CompanyImage from '../image/Company-rafiki.svg'

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Search,
      title: 'Recherche facile',
      description: 'Trouvez rapidement les services dont vous avez besoin par catégorie ou localisation.'
    },
    {
      icon: Users,
      title: 'Communauté locale',
      description: 'Connectez-vous avec les entreprises et artisans de votre région.'
    },
    {
      icon: Building,
      title: 'Entreprises vérifiées',
      description: 'Découvrez des entreprises de confiance avec des avis clients authentiques.'
    },
    {
      icon: Star,
      title: 'Avis & Évaluations',
      description: 'Consultez les retours d\'expérience d\'autres utilisateurs.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Entreprises partenaires' },
    { number: '10K+', label: 'Utilisateurs actifs' },
    { number: '15+', label: 'Catégories de services' },
    { number: '4.8', label: 'Note moyenne' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 items-center gap-12">
            {/* Texte à gauche */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
               Bienvenue sur CamerConnect 
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                CamerConnect est la plateforme qui unit les citoyens aux entreprises locales,
                artisans et commerçants pour renforcer l'économie de proximité au Cameroun.
              </p>

              {!isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/register"
                    className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Commencer gratuitement</span>
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/login"
                    className="border border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    Se connecter
                  </Link>
                </div>
              ) : (
                <Link
                  to="/dashboard"
                  className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  <span>Accéder au tableau de bord</span>
                  <ArrowRight size={20} />
                </Link>
              )}
            </div>

            {/* Image à droite */}
            <div className="flex justify-center">
              <img
                src={CompanyImage } // Assure-toi que l'image est bien dans le dossier public
                alt="Entreprises locales Cameroun"
                className="w-full max-w-md rounded-2xl shadow-lg"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Pourquoi choisir CamerConnect ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre plateforme est conçue pour répondre aux besoins spécifiques
              du marché camerounais et favoriser l'économie locale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-colors duration-200">
                  <feature.icon className="w-8 h-8 text-black group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à découvrir les services locaux ?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez la communauté CamerConnect et contribuez au développement
            de l'économie locale camerounaise.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Créer un compte
              </Link>
              <Link
                to="/login"
                className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors duration-200"
              >
                Se connecter
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>Explorer les services</span>
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Building2 className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold text-black">CamerConnect</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Cameroun</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone size={16} />
                <span>Accessible partout</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-600">
            <p>&copy; 2024 CamerConnect. Tous droits réservés. Développé pour le Cameroun.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};