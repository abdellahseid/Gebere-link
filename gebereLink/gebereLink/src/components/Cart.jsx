import { useState, useEffect } from 'react';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { useCart } from "../context/CartContext";

const Cart = ({ darkMode }) => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    setCartItems,
  } = useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = 150;

  const buyerName = "John Doe";
  const buyerPhone = "1234567890";
  const buyerLocation = "Addis Ababa";

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id || user?._id || null;

    try {
      const items = cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const orderData = {
        items,
        totalPrice,
        buyerName,
        buyerPhone,
        buyerLocation,
        user: userId,
        deliveryFee,
      };

      await axios.post(
        'https://gebere-link-backend-1.onrender.com/api/orders',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Order placed successfully!');
      if (setCartItems) setCartItems([]);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className={`text-center py-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Your cart is empty
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className={`flex items-center py-4 ${darkMode ? 'border-b border-gray-600' : 'border-b border-gray-200'}`}
              >
                <div className={`w-24 h-24 flex items-center justify-center rounded-lg mr-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                  <img
                    src={item.image || 'https://placehold.co/500x300?text=Product+Image'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/500x300?text=Product+Image';
                    }}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <h3 className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.name}</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Farmer: {item.farmer || 'Unknown'}</p>
                  <p className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    ETB {item.price} / {item.per || 'unit'}
                  </p>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className={`p-1 rounded-full ${darkMode ? 'cursor-pointer hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
                  >
                    <FiMinus />
                  </button>
                  <span className={`mx-2 w-8 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className={`p-1 rounded-full ${darkMode ? 'cursor-pointer hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
                  >
                    <FiPlus />
                  </button>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className={`ml-4 ${darkMode ? 'cursor-pointer text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="md:w-80">
            <div className={`border rounded-lg p-4 ${darkMode ? 'border-gray-600 bg-gray-600' : 'border-gray-200 bg-white'}`}>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Order Summary</h3>

              <div className={`space-y-2 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>ETB {totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>ETB {deliveryFee}</span>
                </div>
                <div className={`flex justify-between font-bold text-lg pt-2 ${darkMode ? 'border-t border-gray-500 text-gray-200' : 'border-t border-gray-200 text-gray-800'}`}>
                  <span>Total</span>
                  <span>ETB {totalPrice + deliveryFee}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 cursor-pointer text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
