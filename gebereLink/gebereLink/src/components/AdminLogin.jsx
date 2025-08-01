import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = ({ darkMode, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [faydaId, setFaydaId] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://gebere-link-backend-1.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, faydaId, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        switch (data.type) {
          case 'USER_NOT_FOUND':
            throw new Error('Account not found. Please check your username.');
          case 'INVALID_FAYDA_ID':
            throw new Error('The Fayda ID is incorrect.');
          case 'INCORRECT_PASSWORD':
            throw new Error('Wrong password. Please try again.');
          default:
            throw new Error(data.error || 'Login failed. Please try again.');
        }
      }

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('adminToken', data.token);
      storage.setItem('adminUser', JSON.stringify(data.user));

      onLogin(data.user, rememberMe);
      navigate('/home');

    } catch (err) {
      setError(
        <div className="text-red-600">
          <p className="font-medium">{err.message}</p>
          {err.message.includes('password') && (
            <p className="text-sm mt-1">
              <a href="/forgot-password" className="text-blue-500 hover:underline">
                Forgot your password?
              </a>
            </p>
          )}
        </div>
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-cover bg-center ${darkMode ? 'bg-gray-900' : ''}`}
      style={{ 
        backgroundImage: darkMode 
          ? 'none' 
          : "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" 
      }}
    >
      <div className={`relative w-full max-w-md px-8 py-12 mx-4 rounded-lg shadow-xl z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col items-center mb-8">
          <img src="/logo5.png" alt="Logo" className="w-30 h-30 mb-4" />
          <h2 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-green-800'}`}>
            Admin Login
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500 focus:border-green-500' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
              }`}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm pr-10 focus:outline-none focus:ring-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500 focus:border-green-500' 
                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                }`}
                placeholder="Enter your password"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className={`text-gray-400 ${darkMode ? 'hover:text-gray-200' : 'hover:text-gray-600'}`} />
                ) : (
                  <FaEye className={`text-gray-400 ${darkMode ? 'hover:text-gray-200' : 'hover:text-gray-600'}`} />
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="fayda-id" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Fayda ID
            </label>
            <input
              id="fayda-id"
              name="fayda-id"
              type="text"
              value={faydaId}
              onChange={(e) => setFaydaId(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500 focus:border-green-500' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
              }`}
              placeholder="Enter your Fayda ID"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={`h-4 w-4 rounded ${
                  darkMode ? 'text-green-400 focus:ring-green-400 border-gray-500' : 'text-green-600 focus:ring-green-500 border-gray-300'
                }`}
              />
              <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className={`font-medium ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'}`}>
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                darkMode ? 'focus:ring-green-500' : 'focus:ring-green-500'
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
