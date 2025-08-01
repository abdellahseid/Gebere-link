import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaUsers, FaUserTie, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const Settings = ({ darkMode, userData, setUserData }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    farmingPractice: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [farmers, setFarmers] = useState([]);
  const [consumers, setConsumers] = useState([]);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        farmingPractice: userData.farmingPractice || '',
        description: userData.description || ''
      });
    }

    // Load farmers and consumers if on those tabs
    if (activeTab === 'farmers' || activeTab === 'consumers') {
      loadUsers();
    }
  }, [userData, activeTab]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (activeTab === 'farmers') {
        const response = await axios.get('/api/users/farmers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFarmers(response.data);
      } else if (activeTab === 'consumers') {
        const response = await axios.get('/api/users/consumers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setConsumers(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        ...(userData.role === 'farmer' && {
          farmingPractice: formData.farmingPractice,
          description: formData.description
        })
      };

      const response = await axios.put('/api/users/profile', updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUserData(response.data.user);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.put('/api/users/password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Password changed successfully!');
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-4 sm:p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Settings
      </h2>
      
      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-4 sm:mb-6 border-b scrollbar-hide">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-2 text-sm sm:text-base sm:px-4 font-medium flex items-center whitespace-nowrap ${activeTab === 'profile' ? 
              darkMode ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600' : 
              darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <FaUser className="mr-1 sm:mr-2" /> <span className="text-xs sm:text-sm">Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-3 py-2 text-sm sm:text-base sm:px-4 font-medium flex items-center whitespace-nowrap ${activeTab === 'password' ? 
              darkMode ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600' : 
              darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <FaEye className="mr-1 sm:mr-2" /> <span className="text-xs sm:text-sm">Password</span>
          </button>
          {userData?.role === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('farmers')}
                className={`px-3 py-2 text-sm sm:text-base sm:px-4 font-medium flex items-center whitespace-nowrap ${activeTab === 'farmers' ? 
                  darkMode ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600' : 
                  darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                <FaUserTie className="mr-1 sm:mr-2" /> <span className="text-xs sm:text-sm">Farmers</span>
              </button>
              <button
                onClick={() => setActiveTab('consumers')}
                className={`px-3 py-2 text-sm sm:text-base sm:px-4 font-medium flex items-center whitespace-nowrap ${activeTab === 'consumers' ? 
                  darkMode ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600' : 
                  darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                <FaUsers className="mr-1 sm:mr-2" /> <span className="text-xs sm:text-sm">Consumers</span>
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Status messages */}
      {error && (
        <div className={`mb-4 p-3 rounded-md ${
          darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
        }`}>
          {error}
        </div>
      )}
      
      {success && (
        <div className={`mb-4 p-3 rounded-md ${
          darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
        }`}>
          {success}
        </div>
      )}
      
      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className={`p-3 sm:p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-md sm:text-lg font-medium mb-3 sm:mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Account Information
          </h3>
          
          <form onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
              </div>
            </div>
            
            <div className="mb-3 sm:mb-4">
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                }`}
              />
            </div>
            
            <div className="mb-3 sm:mb-4">
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                }`}
              />
            </div>

            {userData?.role === 'farmer' && (
              <>
                <div className="mb-3 sm:mb-4">
                  <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Farming Practice *
                  </label>
                  <input
                    type="text"
                    name="farmingPractice"
                    value={formData.farmingPractice}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                        : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                    }`}
                  />
                </div>

                <div className="mb-4 sm:mb-6">
                  <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                        : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                    }`}
                  ></textarea>
                </div>
              </>
            )}
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-green-600 cursor-pointer font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm sm:text-base flex items-center justify-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Updating...
                </>
              ) : 'Update Profile'}
            </button>
          </form>
        </div>
      )}
      
      {/* Password Tab */}
      {activeTab === 'password' && (
        <div className={`p-3 sm:p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-md sm:text-lg font-medium mb-3 sm:mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Change Password
          </h3>
          
          <form onSubmit={handlePasswordChange}>
            <div className="mb-3 sm:mb-4">
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>
            
            <div className="mb-3 sm:mb-4">
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm New Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-green-600 cursor-pointer font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm sm:text-base flex items-center justify-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Changing...
                </>
              ) : 'Change Password'}
            </button>
          </form>
        </div>
      )}
      
      {/* Farmers List Tab (only for admin) */}
      {activeTab === 'farmers' && userData?.role === 'admin' && (
        <div className={`p-3 sm:p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-md sm:text-lg font-medium mb-3 sm:mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Farmers List
          </h3>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <FaSpinner className="animate-spin text-2xl text-green-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={darkMode ? 'bg-gray-600' : 'bg-gray-100'}>
                  <tr>
                    <th scope="col" className={`px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Name
                    </th>
                    <th scope="col" className={`px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Practice
                    </th>
                    <th scope="col" className={`px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Contact
                    </th>
                    <th scope="col" className={`px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-600 bg-gray-700' : 'divide-gray-200 bg-white'}`}>
                  {farmers.map((farmer) => (
                    <tr key={farmer._id}>
                      <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                            <img className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" src={farmer.profileImage || 'https://randomuser.me/api/portraits/men/1.jpg'} alt="" />
                          </div>
                          <div className="ml-2 sm:ml-4">
                            <div className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              {farmer.firstName} {farmer.lastName}
                            </div>
                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {farmer.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        <div className="text-xs sm:text-sm">{farmer.farmingPractice}</div>
                      </td>
                      <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        <div className="text-xs sm:text-sm">{farmer.phone}</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {farmer.email}
                        </div>
                      </td>
                      <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        <button className="text-green-600 hover:text-green-900 mr-2 sm:mr-3">
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {/* Consumers List Tab (only for admin) */}
      {activeTab === 'consumers' && userData?.role === 'admin' && (
        <div className={`p-3 sm:p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-md sm:text-lg font-medium mb-3 sm:mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Consumers List
          </h3>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <FaSpinner className="animate-spin text-2xl text-green-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {consumers.map((consumer) => (
                <div key={consumer._id} className={`rounded-lg overflow-hidden shadow ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <img className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mr-2 sm:mr-3" src={consumer.profileImage || 'https://randomuser.me/api/portraits/men/3.jpg'} alt={consumer.name} />
                      <div>
                        <h4 className={`text-sm sm:text-base font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {consumer.firstName} {consumer.lastName}
                        </h4>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {consumer.location || 'No location specified'}
                        </p>
                      </div>
                    </div>
                    <div className={`text-xs sm:text-sm mb-2 sm:mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <p className="truncate">{consumer.email}</p>
                      <p>{consumer.phone}</p>
                    </div>
                    <div className="flex justify-between">
                      <button className={`px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm font-medium ${
                        darkMode 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}>
                        View
                      </button>
                      <button className={`px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm font-medium ${
                        darkMode 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}>
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Settings;