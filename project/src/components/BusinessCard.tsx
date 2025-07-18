import React from 'react';
import { Link } from 'react-router-dom';
import { Business } from '../types';
import { MapPin, Star, Phone, Crown } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <Link to={`/business/${business.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group-hover:border-gray-200">
        <div className="relative h-48">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          {business.isPremium && (
            <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Crown size={12} />
              <span>Premium</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-black group-hover:text-gray-800 transition-colors duration-200">
              {business.name}
            </h3>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{business.rating}</span>
              <span className="text-gray-400">({business.reviews})</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {business.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin size={16} />
              <span>{business.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Phone size={16} />
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};