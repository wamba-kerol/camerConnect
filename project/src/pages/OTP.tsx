import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Building2 } from 'lucide-react';

export const OTP: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    // Accepte chiffres et lettres (alphanumérique, 1 caractère max)
    const char = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Veuillez saisir le code complet à 6 chiffres.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/password/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode }),
      });
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Réponse non JSON: ' + text);
      }
      if (!response.ok) {
        throw new Error(data.message || 'Code invalide.');
      }
      navigate('/reset-password', { state: { email, otpCode } });
    } catch (err: any) {
      setError(err.message || 'Code invalide. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
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
        throw new Error(data.message || 'Erreur lors du renvoi du code.');
      }
      setTimeLeft(3600); // Reset timer à 60 minutes
      setOtp(['', '', '', '', '', '']);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Erreur lors du renvoi du code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/forgot-password" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200 mb-8">
            <ArrowLeft size={20} />
            <span>Retour</span>
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <Building2 className="text-white" size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-black">Vérification</h2>
            <p className="mt-2 text-gray-600">
              Saisissez le code à 6 chiffres envoyé à
            </p>
            <p className="font-medium text-black">{email}</p>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Code de vérification
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Temps restant: <span className="font-medium text-black">{formatTime(timeLeft)}</span>
            </p>
            {timeLeft === 0 && (
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="text-sm font-medium text-black hover:underline disabled:opacity-50"
              >
                Renvoyer le code
              </button>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Vérification...' : 'Vérifier le code'}
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Vous n'avez pas reçu le code ?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading || timeLeft > 0}
                className="font-medium text-black hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Renvoyer
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};