import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';

const AddProduct = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    available: "",
    price: "",
    per: "kg",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     let imagePath = '';
if (formData.image) {
  const imageForm = new FormData();
  imageForm.append('image', formData.image);

  const uploadRes = await axios.post(
    'https://gebere-link-backend-1.onrender.com/api/upload',
    imageForm,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  imagePath = uploadRes.data.imagePath;
}



      // 2️⃣ Then send product info
      const productData = {
        name: formData.name,
        category: formData.category,
        available: formData.available,
        price: formData.price,
        per: formData.per,
        description: formData.description,
        image: imagePath
      };

      await axios.post('https://gebere-link-backend-1.onrender.com/api/products', productData);
      alert("✅ Product added!");
      setFormData({
        name: "",
        category: "",
        available: "",
        price: "",
        per: "kg",
        description: "",
        image: null,
      });
  } catch (err) {
  console.error('❌ Error adding product:', {
    message: err.message,
    response: err.response?.data,
    status: err.response?.status
  });
  alert(`Error adding product: ${err.response?.data?.message || err.message}`);
}

  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Product Image</label>
          <div className="mt-1 flex items-center">
            <label className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-600 border border-gray-500 text-gray-300 hover:bg-gray-500' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              <FiUpload className="mr-2" />
              Upload Image
              <input 
                type="file" 
                className="sr-only" 
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
            {formData.image && (
              <span className={`ml-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {formData.image.name}
              </span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg px-3 py-2 border ${
                darkMode 
                  ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                  : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
              }`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded-lg px-3 py-2 border appearance-none cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                }`}
                required
              >
                <option value="">Select category</option>
                <option value="Grains">Grains</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Spices">Spices</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg 
                  className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Available Quantity</label>
            <input
              type="number"
              name="available"
              value={formData.available}
              onChange={handleChange}
              className={`w-full rounded-lg px-3 py-2 border ${
                darkMode 
                  ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                  : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
              }`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full rounded-lg px-3 py-2 border ${
                darkMode 
                  ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                  : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
              }`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Per</label>
            <div className="relative">
              <select
                name="per"
                value={formData.per}
                onChange={handleChange}
                className={`w-full rounded-lg px-3 py-2 border appearance-none cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                }`}
                required
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="quintal">Quintal</option>
                <option value="piece">Piece</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg 
                  className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full rounded-lg px-3 py-2 border ${
              darkMode 
                ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
            }`}
          />
        </div>
        
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
