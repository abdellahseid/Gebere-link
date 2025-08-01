import { FiSearch, FiBell, FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} mx-4 mt-4 rounded-lg`}>
      {/* Header section */}
      <header className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            >
              {darkMode ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>
            <button
              onClick={() => navigate('/create-account')}
              className={`px-4 py-2 rounded-md ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
            >
              Create Account
            </button>
          </div>
        </div>
      </header>

      {/* Search and user controls navbar */}
    
    </div>
  );
};

export default Navbar;