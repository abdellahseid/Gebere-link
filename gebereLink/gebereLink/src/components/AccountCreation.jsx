import { useState } from 'react';
import { FaEye, FaEyeSlash, FaUpload, FaUser, FaUserTie, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountCreation = ({ darkMode, setUserData }) => {
  const [activeTab, setActiveTab] = useState('consumer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    faydaId: '',
    traderPermission: null,
    title: '',
    document: null,
    farmingPractice: '',
    description: '',
    email: '',
    phone: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document' || name === 'profileImage' || name === 'traderPermission') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.username || 
        !formData.password || !formData.faydaId || !formData.email || !formData.phone) {
      setError("Please fill all required fields!");
      return;
    }

    // Validate role-specific requirements
    if (activeTab === 'consumer' && !formData.traderPermission) {
      setError("Trader permission document is required!");
      return;
    }

    if (activeTab === 'farmer') {
      if (!formData.name || !formData.title || !formData.farmingPractice || !formData.document) {
        setError("Please fill all required farmer fields!");
        return;
      }
    }

    try {
      setLoading(true);
      
      // Create FormData for file uploads
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('username', formData.username);
      data.append('password', formData.password);
      data.append('faydaId', formData.faydaId);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('role', activeTab);
      
      if (profileImage) {
        data.append('profileImage', profileImage);
      }
      
      if (activeTab === 'consumer') {
        data.append('traderPermission', formData.traderPermission);
      } else if (activeTab === 'farmer') {
        data.append('name', formData.name);
        data.append('title', formData.title);
        data.append('farmingPractice', formData.farmingPractice);
        data.append('description', formData.description);
        data.append('document', formData.document);
      }

      // Register user
      const response = await axios.post('/api/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // If registration successful, set user data and redirect
      setUserData(response.data.user);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" 
      }}
    >
      <div className={`relative w-full max-w-md px-8 py-8 mx-4 rounded-lg shadow-xl z-10 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h1 className={`text-2xl font-bold text-center mb-6 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>Create Account</h1>

        {error && (
          <div className={`mb-4 p-3 rounded-md ${
            darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
          }`}>
            {error}
          </div>
        )}

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab('consumer')}
            className={`px-6 py-2 rounded-l-lg font-medium flex items-center ${
              activeTab === 'consumer'
                ? darkMode
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-200 text-gray-700'
            }`}
          >
            <FaUsers className="mr-2" /> Consumer
          </button>
          <button
            onClick={() => setActiveTab('farmer')}
            className={`px-6 py-2 rounded-r-lg font-medium flex items-center ${
              activeTab === 'farmer'
                ? darkMode
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-200 text-gray-700'
            }`}
          >
            <FaUserTie className="mr-2" /> Farmer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Profile Image Upload */}
          <div className="flex justify-center">
            <div className="relative">
              <div className={`w-24 h-24 rounded-full overflow-hidden border-2 ${
                darkMode ? 'border-gray-600' : 'border-gray-300'
              } flex items-center justify-center`}>
                {profileImage ? (
                  <img 
                    src={URL.createObjectURL(profileImage)} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`text-4xl ${
                    darkMode ? 'text-gray-400' : 'text-gray-300'
                  }`}>
                    <FaUser />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full cursor-pointer">
                <FaUpload />
                <input
                  type="file"
                  name="profileImage"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {/* Common Fields */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
            />
          </div>

          {activeTab === 'farmer' && (
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
              />
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Confirm Password *</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength="6"
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Fayda ID *</label>
            <input
              type="text"
              name="faydaId"
              value={formData.faydaId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
              placeholder="Enter your Fayda identification number"
            />
          </div>

          {activeTab === 'consumer' && (
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Trader Permission Permit *</label>
              <label className={`flex items-center justify-center px-3 py-2 border rounded-md cursor-pointer ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}>
                <FaUpload className="mr-2" />
                {formData.traderPermission ? formData.traderPermission.name : 'Upload Permission Document'}
                <input
                  type="file"
                  name="traderPermission"
                  onChange={handleChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,image/*"
                />
              </label>
            </div>
          )}

          {activeTab === 'farmer' && (
            <>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                  placeholder="e.g. Coffee Farmer, Dairy Producer"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Attach Farm Mentorship Document *</label>
                <label className={`flex items-center justify-center px-3 py-2 border rounded-md cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}>
                  <FaUpload className="mr-2" />
                  {formData.document ? formData.document.name : 'Upload Document'}
                  <input
                    type="file"
                    name="document"
                    onChange={handleChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,image/*"
                  />
                </label>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Farming Practice *</label>
                <input
                  type="text"
                  name="farmingPractice"
                  value={formData.farmingPractice}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                  placeholder="e.g. Organic Farming, Poultry"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your farming experience..."
                ></textarea>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
            } text-white ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Register'}
          </button>

          <div className={`text-center text-sm ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Already have an account?{' '}
            <button
              type="button"
              className={`font-medium ${
                darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'
              }`}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountCreation;