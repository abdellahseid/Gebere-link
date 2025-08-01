import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from "../context/CartContext";

const HomePage = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://gebere-link-backend-1.onrender.com/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map(product => product.category))];

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      if (sortOrder === "name-asc") return a.name.localeCompare(b.name);
      if (sortOrder === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item._id === productId);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <main className="container mx-auto p-4">
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row justify-between mb-6">
            {/* Search */}
            <div className="relative mb-4 md:mb-0">
              <FiSearch className={`absolute left-3 top-3 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search products..."
                className={`pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 ${darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-white text-gray-900 border-gray-300'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex space-x-4">
              {/* Category Filter */}
              <div className="relative flex items-center">
                <select
                  className={`border rounded-lg px-3 py-2 pr-10 appearance-none cursor-pointer ${darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-white text-gray-900 border-gray-300'}`}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute right-3 pointer-events-none">
                  <svg className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Sort Order */}
              <div className="relative">
                <select
                  className={`border rounded-lg px-3 py-2 pr-8 appearance-none cursor-pointer max-w-[120px] sm:max-w-none ${darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-white text-gray-900 border-gray-300'}`}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product._id}
                className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'}`}
              >
                <div className={`h-48 ${darkMode ? 'bg-gray-500' : 'bg-gray-100'} flex items-center justify-center overflow-hidden`}>
                 <img
  src={product.image} // Use Cloudinary URL directly
  alt={product.name}
  className="w-full h-full object-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/500x300?text=Image+Not+Found";
  }}
/>
                </div>
                <div className="p-4">
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{product.name}</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Available: {product.available} {product.per}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>ETB {product.price}/{product.per}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                        isInCart(product._id)
                          ? 'bg-gray-400 text-gray-800'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                      disabled={isInCart(product._id)}
                    >
                      {isInCart(product._id) ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
