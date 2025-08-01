import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);         // For MyProducts & Home
  const [cartItems, setCartItems] = useState([]);       // For Cart
  const [orders, setOrders] = useState([]);             // For Order page

  useEffect(() => {
    // Load initial products from localStorage or backend
    const localData = localStorage.getItem("products");
    if (localData) setProducts(JSON.parse(localData));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => setProducts(prev => [...prev, product]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(p => p.id !== id));

  const placeOrder = () => {
    setOrders([...orders, { id: Date.now(), items: cartItems }]);
    setCartItems([]);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      cartItems,
      addToCart,
      removeFromCart,
      placeOrder,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
