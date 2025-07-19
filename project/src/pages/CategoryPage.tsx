import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { secteur } = useParams<{ secteur: string }>();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = React.useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [search, setSearch] = useState('');
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch('/api/secteurs/entreprises');
        if (!res.ok) throw new Error('Erreur réseau');
        const data = await res.json();
        if (data && typeof data === 'object' && secteur && Object.prototype.hasOwnProperty.call(data, secteur)) {
          setBusinesses(Array.isArray(data[secteur]) ? data[secteur] : []);
        } else {
          setBusinesses([]);
          setNotFound(true);
        }
      } catch {
        setBusinesses([]);
        setNotFound(true);
      }
      setLoading(false);
    };
    fetchBusinesses();
  }, [secteur]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600">Chargement...</div>
      </div>
    );
  }
  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Secteur non trouvé</h1>
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  // Filtrage par recherche nom ou description
  const filteredBusinesses = businesses
    .map((business: any) => ({
      ...business,
      moyenne_notes: business.moyenne_notes ?? 0,
      nombre_interactions: business.nombre_interactions ?? 0
    }))
    .filter((business: any) => {
      const nom = business.nom_entreprise?.toLowerCase() ?? '';
      const desc = business.description?.toLowerCase() ?? '';
      const query = search.toLowerCase();
      return nom.includes(query) || desc.includes(query);
    })
    .sort((a: any, b: any) => (b.nombre_interactions ?? 0) - (a.nombre_interactions ?? 0));

  // Pagination
  const totalPages = Math.ceil(filteredBusinesses.length / pageSize);
  const paginatedBusinesses = filteredBusinesses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200">
            <ArrowLeft size={20} />
            <span>Retour</span>
          </button>
          <h1 className="text-3xl font-bold text-black">{secteur}</h1>
        </div>

        {/* Message descriptif */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-900">
          <h2 className="text-xl font-semibold mb-2">Découvrez les entreprises du secteur {secteur}</h2>
          <p>
            Retrouvez ici toutes les entreprises actives dans le secteur <span className="font-bold">{secteur}</span>. Utilisez la barre de recherche pour filtrer par nom ou description et trouvez rapidement le service ou l'entreprise qui correspond à vos besoins.
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Rechercher par nom ou description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Pagination fade transition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300" style={{ opacity: loading ? 0.5 : 1 }}>
          {paginatedBusinesses.map((business: any) => (
            <Link 
              key={business.id_entreprise}
              to={`/business/${business.id_entreprise}`}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="relative h-48">
                <img
                  src={business.logo ?? '/default-business.jpg'}
                  alt={business.nom_entreprise ?? 'Entreprise'}
                  className="w-full h-full object-cover"
                />
                {business.type_abonnement === 'Premium' && (
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <span>Premium</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-2">{business.nom_entreprise}</h3>
                <p className="text-gray-600 mb-2">{business.description ?? ''}</p>
                <div className="flex flex-wrap gap-2 text-sm mb-2">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Note moyenne : {business.moyenne_notes ?? 0}</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Avis : {business.nombre_avis ?? 0}</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Interactions : {business.nombre_interactions ?? 0}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Paiement : {business.statut_paiement}</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">Ville : {business.ville}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filteredBusinesses.length === 0 && (
          <div className="text-center text-gray-500 mt-8">Aucune entreprise ne correspond à votre recherche.</div>
        )}

        {/* Pagination flèches centrées */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-12">
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Page précédente"
            >
              <ChevronLeft size={32} />
            </button>
            <span className="text-gray-500 text-lg">Page {currentPage} / {totalPages}</span>
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Page suivante"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
