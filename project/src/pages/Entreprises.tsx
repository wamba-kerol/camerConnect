import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for businesses (replace with actual data source)
const businesses = [
  {
    id: 1,
    name: 'Lamana',
    sector: 'Agro-alimentaire',
    city: 'Dschang',
    paymentStatus: 'Payé'
  },
  {
    id: 2,
    name: 'Chez Paul',
    sector: 'Restauration',
    city: 'Dschang',
    paymentStatus: 'Non payé'
  }
];

const Entreprises: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Mes entreprises</h1>
            <p className="text-gray-600">
              Gérez vos entreprises sur la plateforme
            </p>
          </div>
          <Link
            to="/add-business"
            className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Ajouter une entreprise</span>
          </Link>
        </div>

        {/* Businesses List */}
        <div className="grid gap-6 md:grid-cols-2">
          {businesses.length > 0 ? (
            businesses.map((business) => (
              <div
                key={business.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-black mb-2">
                  {business.name}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Secteur:</span> {business.sector}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Ville:</span> {business.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Statut de paiement:</span>
                    <span
                      className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        business.paymentStatus === 'Payé'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {business.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucune entreprise pour le moment
              </h3>
              <p className="text-gray-500 mb-4">
                Vos entreprises apparaîtront ici
              </p>
              <Link
                to="/add-business"
                className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <Plus size={20} />
                <span>Ajouter une entreprise</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Entreprises;