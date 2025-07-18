import React, { useState } from 'react';
import {
  Building2, Users, MapPin, Star, ArrowRight,
  Shield, Zap, Heart, Menu, X
} from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const platformStats = {
    businesses: 1200,
    users: 25000,
    categories: 15,
    regions: 10
  };

  const features = [
    {
      icon: Users,
      title: "Communauté locale",
      description: "Renforcez les liens avec les entreprises de votre région et soutenez l'économie camerounaise."
    },
    {
      icon: Shield,
      title: "Fiabilité assurée",
      description: "Avis vérifiés et profils d'entreprises authentiques pour des choix éclairés."
    },
    {
      icon: Zap,
      title: "Accès optimisé",
      description: "Conçu pour fonctionner même avec une connectivité limitée, partout au Cameroun."
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Inscrivez-vous gratuitement",
      description: "Créez votre compte en quelques clics et accédez à toutes les fonctionnalités."
    },
    {
      number: 2,
      title: "Explorez les catégories",
      description: "Parcourez les différentes catégories d'entreprises selon vos besoins."
    },
    {
      number: 3,
      title: "Connectez-vous aux entreprises",
      description: "Consultez les profils détaillés et contactez directement les entreprises."
    }
  ];

  return (
    <div className="min-h-screen">

      {/* Header Responsive */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-gray-700" />
              <h1 className="text-2xl font-bold text-gray-800">CamerConnect</h1>
            </div>
            {/* Desktop Buttons */}
            <div className="hidden md:flex space-x-4">
              <button
                onClick={onLogin}
                className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Connexion
              </button>
              <button
                onClick={onRegister}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                S'inscrire
              </button>
            </div>
            {/* Burger Menu */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden flex flex-col items-start space-y-2 pb-4">
              <button
                onClick={() => {
                  onLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Connexion
              </button>
              <button
                onClick={() => {
                  onRegister();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                S'inscrire
              </button>
            </div>
          )}
        </div>
      </header>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue sur CamerConnect
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              La plateforme qui unit les citoyens camerounais aux entreprises locales, 
              favorisant la croissance économique et l'engagement communautaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onRegister}
                className="px-8 py-4 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors font-semibold text-lg flex items-center justify-center"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={onLogin}
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold text-lg"
              >
                Découvrir les entreprises
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir CamerConnect ?
            </h3>
            <p className="text-xl text-gray-600">
              Une solution complète pour connecter les Camerounais aux opportunités locales
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-gray-700" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">{platformStats.businesses.toLocaleString()}+</div>
              <div className="text-gray-300">Entreprises inscrites</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">{platformStats.users.toLocaleString()}+</div>
              <div className="text-gray-300">Utilisateurs actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">{platformStats.categories}</div>
              <div className="text-gray-300">Catégories d'activités</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">{platformStats.regions}</div>
              <div className="text-gray-300">Régions couvertes</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h3>
            <p className="text-xl text-gray-600">
              Trois étapes simples pour découvrir les meilleures entreprises camerounaises
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-700">{step.number}</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h3 className="text-3xl font-bold mb-4">
            Rejoignez la communauté CamerConnect
          </h3>
          <p className="text-xl mb-8 text-gray-300">
            Participez à la croissance économique du Cameroun en découvrant et soutenant 
            les entreprises locales de votre région.
          </p>
          <button
            onClick={onRegister}
            className="px-8 py-4 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors font-semibold text-lg"
          >
            Commencer maintenant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="w-6 h-6" />
                <span className="text-xl font-semibold">CamerConnect</span>
              </div>
              <p className="text-gray-400">
                La plateforme qui connecte les Camerounais aux opportunités locales.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Entreprises</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Restaurants</li>
                <li>Artisans</li>
                <li>Services</li>
                <li>Commerces</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>Signaler un problème</li>
                <li>Conditions d'utilisation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CamerConnect. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;