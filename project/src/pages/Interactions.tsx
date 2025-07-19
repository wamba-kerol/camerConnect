import React, { useEffect, useState, useContext } from 'react';
import { Eye, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Interactions: React.FC = () => {
  // Get userId from context (adapt if needed)
  const auth = useContext(AuthContext) as { user?: { id_utilisateur?: string } };
  const userId = auth?.user?.id_utilisateur;

  const [stats, setStats] = useState({ consultations: 0, avis: 0 });
  const [historique, setHistorique] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'consultation' | 'avis'>('all');

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setStats({ consultations: 0, avis: 0 });
      setHistorique([]);
      return;
    }
    setLoading(true);
    Promise.all([
      fetch(`/api/utilisateur/${userId}/consultations`).then(res => res.json()),
      fetch(`/api/utilisateur/${userId}/avis`).then(res => res.json()),
      fetch(`/api/utilisateur/${userId}/historique`).then(res => res.json()),
    ]).then(([consultations, avis, historique]) => {
      setStats({
        consultations: consultations?.nombre_consultations ?? 0,
        avis: avis?.nombre_avis ?? 0,
      });
      setHistorique(Array.isArray(historique) ? historique : []);
      setLoading(false);
    }).catch(() => {
      setStats({ consultations: 0, avis: 0 });
      setHistorique([]);
      setLoading(false);
    });
  }, [userId]);

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return <Eye className="w-5 h-5 text-blue-500" />;
      case 'avis':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Eye className="w-5 h-5 text-gray-500" />;
    }
  };

  const getInteractionText = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'Consultation';
      case 'avis':
        return 'Avis';
      default:
        return 'Interaction';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Mes interactions</h1>
          <p className="text-lg text-gray-600">Suivez vos interactions avec les entreprises de la plateforme</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="text-3xl font-extrabold text-blue-700 mb-1">{stats.consultations}</div>
            <div className="text-base text-gray-600">Consultations</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="text-3xl font-extrabold text-pink-700 mb-1">{stats.avis}</div>
            <div className="text-base text-gray-600">Avis</div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Rechercher une entreprise..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-semibold border ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
              onClick={() => setFilter('all')}
            >
              Tout
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-semibold border ${filter === 'consultation' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
              onClick={() => setFilter('consultation')}
            >
              Consultations
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-semibold border ${filter === 'avis' ? 'bg-pink-600 text-white' : 'bg-white text-pink-600 border-pink-600'}`}
              onClick={() => setFilter('avis')}
            >
              Avis
            </button>
          </div>
        </div>

        {/* Historique Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Historique des interactions</h2>
          </div>
          {loading ? (
            <div className="p-12 text-center text-gray-400">Chargement...</div>
          ) : (
            (() => {
              // Filtrage et recherche
              const filtered = historique.filter(h =>
                (filter === 'all' || h.type_interaction === filter) &&
                (!search || (h.nom_entreprise ?? '').toLowerCase().includes(search.toLowerCase()))
              );
              if (filtered.length === 0) {
                return (
                  <div className="p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <Eye size={64} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Aucun historique trouvé
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Aucun résultat ne correspond à votre recherche ou filtre.
                    </p>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    >
                      <span>Explorer les entreprises</span>
                    </Link>
                  </div>
                );
              }
              return (
                <div className="divide-y divide-gray-100">
                  {filtered.map((interaction, idx) => (
                    <div key={idx} className="p-6 hover:bg-blue-50 transition-colors duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                          {getInteractionIcon(interaction.type_interaction)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-black">
                              {interaction.nom_entreprise ?? '-'}
                            </h3>
                            <span className="text-sm text-gray-500 flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{formatDate(interaction.date_interaction)}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${interaction.type_interaction === 'avis' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                              {getInteractionText(interaction.type_interaction)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
};