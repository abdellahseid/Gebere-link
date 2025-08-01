import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import LandingPage from "./components/LandingPage";
import AdminLogin from "./components/AdminLogin";
import AccountCreation from "./components/AccountCreation";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MobileBottomNav from "./components/MobileBottomNav";
import Orders from "./components/Orders";
import AddProduct from "./components/AddProduct";
import MyProducts from "./components/MyProducts";
import Cart from "./components/Cart";
import Settings from "./components/Settings";
import HomePage from "./components/HomePage";

import { ProductProvider } from "./context/ProductContext";
import { CartProvider, useCart } from "./context/CartContext"; // ✅ New import

function AppContent({ darkMode, toggleDarkMode, isMobile, sidebarOpen, setSidebarOpen, user, handleLogout }) {
  const { cartItems } = useCart(); // ✅ useCart instead of useProductContext

  return (
    <div className={`${darkMode ? "bg-gray-900" : "bg-green-800"} min-h-screen`}>
      <div className={`${darkMode ? "bg-gray-800" : "bg-green-800"} min-h-screen mx-auto max-w-9xl rounded-lg shadow-lg`}>
        <div className="flex">
          {!isMobile && <div className={`${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300`} />}
          <div className="flex-1">
            <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} onLogout={handleLogout} user={user} />
          </div>
        </div>

        <div className="flex p-4 gap-6">
          {!isMobile && (
            <div className={`rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"} ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300`}>
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} darkMode={darkMode} user={user} />
            </div>
          )}

          <main className={`${isMobile ? "w-full" : "flex-1"} rounded-lg overflow-hidden`}>
            <div className={`h-full ${darkMode ? "bg-gray-700" : "bg-white"} rounded-lg p-4`}>
              <Routes>
                <Route path="/home" element={<HomePage darkMode={darkMode} user={user} />} />
                <Route path="/orders" element={<Orders darkMode={darkMode} user={user} />} />
                <Route path="/add-product" element={<AddProduct darkMode={darkMode} user={user} />} />
                <Route path="/my-products" element={<MyProducts darkMode={darkMode} user={user} />} />
                <Route path="/cart" element={<Cart darkMode={darkMode} user={user} />} />
                <Route path="/settings" element={<Settings darkMode={darkMode} user={user} />} />
                <Route path="/create-account" element={<AccountCreation darkMode={darkMode} user={user} />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </div>
          </main>
        </div>

        {isMobile && (
          <MobileBottomNav darkMode={darkMode} cartCount={cartItems.length} user={user} />
        )}
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("adminUser") || sessionStorage.getItem("adminUser");

    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp > currentTime) {
          setIsLoggedIn(true);
          setUser(JSON.parse(storedUser));
        } else {
          console.warn("Token expired");
          handleLogout();
        }
      } catch (err) {
        console.error("Invalid token:", err);
        handleLogout();
      }
    }

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = (userData, rememberMe) => {
    setIsLoggedIn(true);
    setUser(userData);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("adminUser", JSON.stringify(userData));
    storage.setItem("adminToken", userData.token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`flex-col ${darkMode ? "dark" : ""}`}>
      <ProductProvider>
        <CartProvider> {/* ✅ Wrap with CartProvider */}
          <Router>
            {isLoggedIn ? (
              <AppContent
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                isMobile={isMobile}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                user={user}
                handleLogout={handleLogout}
              />
            ) : (
              <Routes>
                <Route path="/" element={<LandingPage darkMode={darkMode} />} />
                <Route path="/login" element={<AdminLogin darkMode={darkMode} onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            )}
          </Router>
        </CartProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
