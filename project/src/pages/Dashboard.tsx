import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/mockData';
import { ArrowRight, Search, Building2, Star, TrendingUp, Clock, Users, MapPin, UtensilsCrossed, Hammer, ShoppingBag, Wrench, HeartPulse, BookOpen, Car, Smartphone } from 'lucide-react';

interface Stats {
  entreprises: string;
  villes: string;
  moyenneNotes: string;
  secteurs: string;
}

export const Dashboard: React.FC = () => {
  const [allSectors, setAllSectors] = React.useState<any[]>([]);
  const [popularSectors, setPopularSectors] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<Stats>({
    entreprises: '-',
    villes: '-',
    moyenneNotes: '-',
    secteurs: '-'
  });

  React.useEffect(() => {
    const fetchSectors = async () => {
      try {
        const res = await fetch('/api/secteurs/populaires');
        const data = await res.json();
        if (Array.isArray(data)) {
          // Tri croissant par nombre_interactions puis moyenne_notes
          const sorted = [...data].sort((a, b) => {
            if (a.nombre_interactions === b.nombre_interactions) {
              return (a.moyenne_notes ?? 0) - (b.moyenne_notes ?? 0);
            }
            return a.nombre_interactions - b.nombre_interactions;
          });
          setAllSectors(sorted);
          setPopularSectors(sorted.slice(-4).reverse()); // top 4 secteurs populaires
        } else {
          setAllSectors([]);
          setPopularSectors([]);
        }
      } catch {
        setAllSectors([]);
        setPopularSectors([]);
      }
    };
    fetchSectors();
  }, []);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resEntreprises, resVilles, resNotes, resSecteurs] = await Promise.all([
          fetch('/api/stats/entreprises'),
          fetch('/api/stats/villes'),
          fetch('/api/stats/moyenne-notes'),
          fetch('/api/stats/secteurs'),
        ]);
        const entreprises = await resEntreprises.json();
        const villes = await resVilles.json();
        const moyenneNotes = await resNotes.json();
        const secteurs = await resSecteurs.json();
        setStats({
          entreprises: entreprises.nombre_entreprises ?? '-',
          villes: villes.nombre_villes ?? '-',
          moyenneNotes: moyenneNotes.moyenne_notes ?? '-',
          secteurs: secteurs.nombre_secteurs ?? '-',
        });
      } catch {
        setStats({ entreprises: '-', villes: '-', moyenneNotes: '-', secteurs: '-' });
      }
    };
    fetchStats();
  }, []);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'utensils-crossed': UtensilsCrossed,
      'hammer': Hammer,
      'shopping-bag': ShoppingBag,
      'wrench': Wrench,
      'heart-pulse': HeartPulse,
      'book-open': BookOpen,
      'car': Car,
      'smartphone': Smartphone,
    };
    return iconMap[iconName] || Building2;
  };

  const recentActivities = [
    {
      id: 1,
      action: 'Recherche effectuée',
      category: 'Restaurants',
      time: 'Il y a 2 heures',
      icon: Search
    },
    {
      id: 2,
      action: 'Avis laissé',
      business: 'Restaurant Chez Mama',
      rating: 5,
      time: 'Il y a 1 jour',
      icon: Star
    },
    {
      id: 3,
      action: 'Nouveau favori',
      business: 'Électricien Paul',
      time: 'Il y a 3 jours',
      icon: MapPin
    }
  ];

  // ...supprimé, remplacé par allSectors

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Bienvenue, {user?.name} !
          </h1>
          <p className="text-gray-600">
            Découvrez les meilleures entreprises et services de votre région.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            className="bg-gradient-to-r from-gray-900 to-black text-white rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/dashboard')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Tous les secteurs</h3>
                <p className="text-gray-300 text-sm">{allSectors.length}+ secteurs disponibles</p>
              </div>
              <ArrowRight className="h-8 w-8" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Rechercher</h3>
                <p className="text-gray-300 text-sm">Trouvez ce dont vous avez besoin</p>
              </div>
              <Search className="h-8 w-8" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Mes favoris</h3>
                <p className="text-gray-300 text-sm">Vos entreprises préférées</p>
              </div>
              <Star className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-black">Activités récentes</h2>
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <activity.icon className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-black">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        {activity.category && `Catégorie: ${activity.category}`}
                        {activity.business && `Entreprise: ${activity.business}`}
                        {activity.rating && ` - ${activity.rating} étoiles`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-black">Secteurs populaires</h2>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {popularSectors.map((sector, idx) => (
                  <div key={idx} className="flex flex-col items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-black text-lg mb-1">{sector.secteur}</p>
                    <p className="text-sm text-gray-600 mb-1">{sector.nombre_entreprises} entreprises</p>
                    <div className="flex flex-row gap-4">
                      <span className="text-xs text-blue-700">{sector.nombre_interactions} interactions</span>
                      <span className="text-xs text-yellow-600">Moyenne : {sector.moyenne_notes ?? 0}</span>
                      <span className="text-xs text-green-700">{sector.nombre_avis} avis</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        {/* Tous les secteurs */}
        <div className="mt-8">
        </div>
        </div>

        {/* Stats Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Users className="h-8 w-8 text-black mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">{stats.entreprises ?? '-'}</div>
            <div className="text-sm text-gray-600">Entreprises vérifiées</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Building2 className="h-8 w-8 text-black mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">{stats.villes ?? '-'}</div>
            <div className="text-sm text-gray-600">Villes couvertes</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">{stats.moyenneNotes ?? '-'}</div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Search className="h-8 w-8 text-black mx-auto mb-2" />
            <div className="text-2xl font-bold text-black">{stats.secteurs ?? '-'}</div>
            <div className="text-sm text-gray-600">Secteurs</div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-black mb-8">Toutes les catégories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...allSectors]
              .map(sector => ({
                ...sector,
                moyenne_notes: sector.moyenne_notes ?? 0,
                nombre_interactions: sector.nombre_interactions ?? 0
              }))
              .sort((a, b) => (b.nombre_interactions ?? 0) - (a.nombre_interactions ?? 0))
              .map((sector, idx) => (
              <Link
                key={idx}
                to={`/secteur/${encodeURIComponent(sector.secteur)}`}
                className="group bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                    <Building2 className="w-7 h-7 text-blue-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <ArrowRight className="text-blue-400 group-hover:text-blue-700 transition-colors duration-300" size={22} />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-blue-700 text-center">
                  {sector.secteur}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {sector.nombre_entreprises} entreprises
                </p>
                <div className="flex flex-row items-center justify-center gap-4 mb-2">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{sector.nombre_interactions} interactions</span>
                  <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded">Moyenne : {sector.moyenne_notes}</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">{sector.nombre_avis} avis</span>
                </div>
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 mt-2">
                  <span>Voir plus</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};