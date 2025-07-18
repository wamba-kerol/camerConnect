import React, { useState } from 'react';
import { Category, Business } from './types';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CategoryPage from './pages/CategoryPage';
import BusinessProfilePage from './pages/BusinessProfilePage';

type Page = 'landing' | 'login' | 'register' | 'dashboard' | 'category' | 'business';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategoryId(category.id);
    setCurrentPage('category');
  };

  const handleBusinessSelect = (business: Business) => {
    setSelectedBusinessId(business.id);
    setCurrentPage('business');
  };

  const handleBack = () => {
    if (currentPage === 'category') {
      setCurrentPage('dashboard');
    } else if (currentPage === 'business') {
      setCurrentPage('category');
    } else if (currentPage === 'login' || currentPage === 'register') {
      setCurrentPage('landing');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage
            onLogin={() => setCurrentPage('login')}
            onRegister={() => setCurrentPage('register')}
          />
        );
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onBack={handleBack}
            onRegister={() => setCurrentPage('register')}
          />
        );
      case 'register':
        return (
          <RegisterPage
            onRegister={handleRegister}
            onBack={handleBack}
            onLogin={() => setCurrentPage('login')}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage
            onCategorySelect={handleCategorySelect}
          />
        );
      case 'category':
        return (
          <CategoryPage
            categoryId={selectedCategoryId}
            onBusinessSelect={handleBusinessSelect}
            onBack={handleBack}
          />
        );
      case 'business':
        return (
          <BusinessProfilePage
            businessId={selectedBusinessId}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {renderPage()}
    </div>
  );
}

export default App;