import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (nom: string, email: string, password: string, ville: string, age: string, genre: string) => Promise<any>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('authToken');
    return token ? { id: '', name: '', email: '', city: '', isAuthenticated: true } : null;
  });

  const isAuthenticated = user !== null;

  const updateUser = (userData: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        ...userData
      };
    });
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error('Réponse non JSON: ' + text);
    }
    if (!response.ok) {
      throw new Error(data.message || 'Email ou mot de passe incorrect');
    }
    // Stocke le token et les infos utilisateur
    const newUser: User = {
      id: data.id_utilisateur,
      name: data.nom,
      email: data.email,
      city: data.ville || '',
      isAuthenticated: true
    };
    setUser(newUser);
    // Optionnel: stocker le token dans localStorage
    localStorage.setItem('authToken', data.token);
  };

  const register = async (nom: string, email: string, password: string, ville: string, age: string, genre: string) => {
    // Appel réel à l'API Laravel
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom, email, password, ville, age, genre }),
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error('Réponse non JSON: ' + text);
    }
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la création du compte');
    }
    return data;
  };

  const logout = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      localStorage.removeItem('authToken');
    }
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};