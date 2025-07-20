import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Pencil, Mail, MapPin } from 'lucide-react';

const ProfileEdit: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    city: user?.city || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      // Utiliser navigate au lieu de window.location.href
      window.location.href = '/profil';
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-black mb-6">Modifier mon profil</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div>

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <Pencil size={20} />
                <span>Enregistrer les modifications</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
