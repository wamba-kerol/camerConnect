import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('Vérification en cours...');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Récupère le paramètre "data" du lien (ex: /verify-email?data=xxxx)
    const params = new URLSearchParams(location.search);
    const data = params.get('data');
    if (!data) {
      setMessage('Lien de vérification invalide.');
      setLoading(false);
      return;
    }
    // Appel à l'API Laravel pour vérifier l'email via le proxy Vite
    fetch(`/api/verify/${encodeURIComponent(data)}`)
      .then(async (response) => {
        const res = await response.json();
        if (response.ok) {
          setMessage(res.message || 'Email vérifié avec succès !');
          // Redirige après quelques secondes si besoin
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setMessage(res.error || 'Échec de la vérification.');
        }
      })
      .catch(() => {
        setMessage('Erreur réseau.');
      })
      .finally(() => setLoading(false));
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Vérification Email</h2>
      <p>{message}</p>
      {loading && <div className="mt-4">Chargement...</div>}
    </div>
  );
};

export default VerifyEmail;
