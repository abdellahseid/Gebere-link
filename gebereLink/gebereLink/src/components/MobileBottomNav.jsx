import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiShoppingBag, 
  FiPlusCircle, 
  FiPackage, 
  FiShoppingCart, 
  FiSettings 
} from 'react-icons/fi';

const MobileBottomNav = ({ darkMode, cartCount }) => {
  const navItems = [
    { path: "/home", icon: <FiHome size={20} />, label: "Home" },
    { path: "/orders", icon: <FiShoppingBag size={20} />, label: "Orders" },
    { path: "/add-product", icon: <FiPlusCircle size={20} />, label: "Add" },
    { path: "/my-products", icon: <FiPackage size={20} />, label: "Products" },
    { 
      path: "/cart", 
      icon: (
        <div className="relative">
          <FiShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      ), 
      label: "Cart" 
    },
    { path: "/settings", icon: <FiSettings size={20} />, label: "Settings" },
  ];

  return (
    <div className={`
      fixed bottom-0 left-0 right-0
      ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-green-700 text-white'}
      shadow-lg z-50
    `}>
      <div className="flex justify-around items-center p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center p-2 rounded-lg transition-colors
              ${isActive ? 'bg-green-600' : ''}
              text-sm
            `}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;