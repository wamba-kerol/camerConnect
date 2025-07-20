import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, User, Mail, Phone, MapPin, Star, Clock, Heart, Pencil } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const userStats = {
    entreprises: 3,
    interactions: 45,
    avis: 12,
    favoris: 8
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <Building2 className="text-black" size={48} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <Link
                to="/profil/edit"
                className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <Pencil size={20} />
                <span>Modifier</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Building2 className="text-black mb-2" size={24} />
              <div className="text-2xl font-bold">{userStats.entreprises}</div>
              <div className="text-sm text-gray-600">Entreprises</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="text-black mb-2" size={24} />
              <div className="text-2xl font-bold">{userStats.interactions}</div>
              <div className="text-sm text-gray-600">Interactions</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Star className="text-yellow-500 mb-2" size={24} />
              <div className="text-2xl font-bold">{userStats.avis}</div>
              <div className="text-sm text-gray-600">Avis donnés</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Heart className="text-red-500 mb-2" size={24} />
              <div className="text-2xl font-bold">{userStats.favoris}</div>
              <div className="text-sm text-gray-600">Favoris</div>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="grid gap-6">
          {/* Entreprises Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Mes entreprises</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-black">Lamana</h3>
                <p className="text-sm text-gray-600">Agro-alimentaire</p>
                <p className="text-sm text-gray-600">Dschang</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-black">Chez Paul</h3>
                <p className="text-sm text-gray-600">Restauration</p>
                <p className="text-sm text-gray-600">Dschang</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Informations de contact</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-400" size={20} />
                <span className="text-gray-600">{user?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-gray-400" size={20} />
                <span className="text-gray-600">+237 699 999 999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="text-gray-400" size={20} />
                <span className="text-gray-600">Yaoundé, Cameroun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;