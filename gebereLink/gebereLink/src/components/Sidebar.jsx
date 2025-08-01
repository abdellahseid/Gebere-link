import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiShoppingBag, 
  FiPlusCircle, 
  FiPackage, 
  FiShoppingCart, 
  FiSettings 
} from 'react-icons/fi';

const Sidebar = ({ sidebarOpen, darkMode }) => {
  const navItems = [
    { path: "/home", icon: <FiHome />, label: "Home" },
    { path: "/orders", icon: <FiShoppingBag />, label: "Orders" },
    { path: "/add-product", icon: <FiPlusCircle />, label: "Add Product" },
    { path: "/my-products", icon: <FiPackage />, label: "My Products" },
    { path: "/cart", icon: <FiShoppingCart />, label: "Cart" },
    { path: "/settings", icon: <FiSettings />, label: "Settings" },
  ];

  return (
    <div className={`
      h-auto 
      ${sidebarOpen ? 'w-64' : 'w-20'} 
      p-4 rounded-lg transition-all duration-300
      ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}
      hidden md:block
    `}>
      <div className={`mb-6 p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-gray-100'} text-center`}>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          {sidebarOpen ? 'Gebere-Link' : 'AM'}
        </h1>
      </div>
      
      <div className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center p-3 rounded-lg transition-colors font-semibold
              ${isActive 
                ? (darkMode 
                  ? 'bg-white text-green-600 font-semibold' 
                  : 'bg-green-700 border text-white font-semibold')
                : (darkMode 
                  ? 'hover:bg-gray-600 hover:text-white' 
                  : 'hover:bg-gray-200 hover:text-gray-900')
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {sidebarOpen && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;