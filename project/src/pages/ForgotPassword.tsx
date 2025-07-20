import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Building2 } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/password/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Réponse non JSON: ' + text);
      }
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi de l\'email.');
      }
      setIsEmailSent(true);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <Building2 className="text-white" size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-black">Email envoyé !</h2>
            <p className="mt-2 text-gray-600">
              Nous avons envoyé un code de vérification à votre adresse email.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            <p className="text-sm">
              Vérifiez votre boîte de réception et cliquez sur le lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={() => navigate('/otp', { state: { email } })}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              Saisir le code de vérification
            </button>
            
            <Link to="/login" className="text-sm text-gray-600 hover:text-black">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/login" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200 mb-8">
            <ArrowLeft size={20} />
            <span>Retour à la connexion</span>
          </Link>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <Building2 className="text-white" size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-black">Mot de passe oublié</h2>
            <p className="mt-2 text-gray-600">
              Saisissez votre adresse email pour recevoir un code de réinitialisation
            </p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Envoi en cours...' : 'Envoyer le code'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Vous vous souvenez de votre mot de passe ?{' '}
              <Link to="/login" className="font-medium text-black hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};