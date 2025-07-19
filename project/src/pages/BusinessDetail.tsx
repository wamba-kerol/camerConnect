import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Star, Clock, Crown, Heart } from 'lucide-react';

export const BusinessDetail: React.FC = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch(`/api/entreprises/${businessId}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        if (data && data.id_entreprise === businessId) {
          setBusiness(data);
        } else {
          setBusiness(null);
          setNotFound(true);
        }
      } catch {
        setBusiness(null);
        setNotFound(true);
      }
      setLoading(false);
    };
    if (businessId) fetchBusiness();
  }, [businessId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600">Chargement...</div>
      </div>
    );
  }
  if (notFound || !business || typeof business !== 'object') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Entreprise non trouvée</h1>
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  // Modern, attractive layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-8"
        >
          <ArrowLeft size={22} />
          <span>Retour au dashboard</span>
        </Link>

        {/* Card Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* Left: Logo & Premium */}
          <div className="md:w-1/3 bg-gradient-to-tr from-blue-100 via-white to-pink-100 flex flex-col items-center justify-center p-8 relative">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-white mb-4">
              <img
                src={business.logo ?? '/default-business.jpg'}
                alt={business.nom_entreprise ?? 'Entreprise'}
                className="w-full h-full object-cover"
              />
            </div>
            {business.type_abonnement === 'Premium' && (
              <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <Crown size={18} />
                <span>Premium</span>
              </div>
            )}
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-lg">{business.moyenne_notes ?? 0}</span>
                <span className="text-gray-500">({business.nombre_avis ?? 0} avis)</span>
              </div>
              <div className="flex items-center gap-1 text-pink-500">
                <Heart className="w-5 h-5" />
                <span className="font-medium">{business.nombre_interactions ?? 0} interactions</span>
              </div>
              <div className="flex items-center gap-1 text-blue-500">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{business.duree_total_vue ?? 0} min vues</span>
              </div>
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="md:w-2/3 p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                {business.nom_entreprise ?? '-'}
              </h1>
              <p className="text-lg text-gray-600 mb-4 italic">
                {business.description ?? 'Aucune description disponible.'}
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
                  <MapPin className="w-4 h-4" />
                  {business.ville ?? '-'}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-sm font-semibold">
                  {business.secteur ?? '-'}
                </span>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  {business.telephone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <a href={`tel:${business.telephone}`} className="text-blue-700 hover:underline font-medium">
                        {business.telephone}
                      </a>
                    </div>
                  )}
                  {business.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-pink-400" />
                      <a href={`mailto:${business.email}`} className="text-pink-700 hover:underline font-medium">
                        {business.email}
                      </a>
                    </div>
                  )}
                  {business.site_web && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-green-400" />
                      <a href={business.site_web.startsWith('http') ? business.site_web : `https://${business.site_web}`} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline font-medium">
                        {business.site_web}
                      </a>
                    </div>
                  )}
                </div>
                {/* Services */}
                {Array.isArray(business.services) && business.services.length > 0 && (
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-2">Services proposés</h3>
                    <div className="flex flex-wrap gap-2">
                      {business.services.map((service: string, idx: number) => (
                        <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {business.telephone && (
                <a
                  href={`tel:${business.telephone}`}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  <Phone size={20} />
                  <span>Appeler</span>
                </a>
              )}
              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-xl shadow hover:bg-pink-700 transition-colors duration-200 font-semibold"
                >
                  <Mail size={20} />
                  <span>Contacter par email</span>
                </a>
              )}
              <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 px-6 py-3 rounded-xl shadow hover:bg-gray-50 transition-colors duration-200 font-semibold">
                <Heart size={20} />
                <span>Ajouter aux favoris</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 mt-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Avis clients</h3>
          <div className="text-center py-8 text-gray-500">
            <p>Les avis clients seront disponibles prochainement.</p>
          </div>
        </div>
      </div>
    </div>
  );
};