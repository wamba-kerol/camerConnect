import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, LogOut, Menu, X, Building2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-black font-semibold' : 'text-gray-600 hover:text-black';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Building2 className="text-white" size={18} />
            </div>
            <span className="text-xl font-bold text-black">CamerConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={`transition-colors duration-200 ${isActive('/dashboard')}`}>
                  Accueil
                </Link>
                <Link to="/interactions" className={`transition-colors duration-200 ${isActive('/interactions')}`}>
                  Mes interactions
                </Link>
                <Link to="/entreprise" className={`transition-colors duration-200 ${isActive('/entreprise')}`}>
                  Mes entreprises
                </Link>
                <div className="flex items-center space-x-4">
                  {/* <span className="text-sm text-gray-600">Bonjour, {user?.name}</span> */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            {isAuthenticated ? (
              <div className="space-y-4">
                <Link
                  to="/dashboard"
                  className={`block transition-colors duration-200 ${isActive('/dashboard')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                  to="/interactions"
                  className={`block transition-colors duration-200 ${isActive('/interactions')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mes interactions
                </Link>
                <Link
                  to="/entreprise"
                  className={`block transition-colors duration-200 ${isActive('/entreprise')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mes entreprises
                </Link>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">Bonjour, {user?.name}</p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="block text-gray-600 hover:text-black transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};