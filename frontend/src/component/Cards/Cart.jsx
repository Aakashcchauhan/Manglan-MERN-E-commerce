import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, deletes, addToCart } from "../../redux/action";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartVisible = useSelector((state) => state.cart.cartVisible);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) =>
    state.cart.cartItems.reduce(
      (acc, item) => acc + Math.trunc(item.price),
      0
    )
  );
  const name = useSelector((state) => state.cart.name);

  const dispatch = useDispatch();
  const increaseQuantity = (product) => dispatch(increment(product));
  const decrementQuantity = (product) => dispatch(decrement(product));
  const deleteQuantity = (product) => dispatch(deletes(product));

  // Store cartItems in localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="flex flex-col h-[80vh] bg-gray-50">
      <div className="p-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
        <p className="text-gray-500 text-lg">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="w-full flex-grow flex flex-col justify-center items-center text-center p-6">
          <ShoppingCart size={64} className="text-gray-400 mb-4" />
          <p className="text-gray-800 text-2xl font-medium mb-2">Your cart is empty</p>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col flex-grow overflow-y-auto p-4">
          {cartItems.map((item) => (
            <div 
              key={item._id} 
              className="w-full bg-white border border-gray-100 mb-3  rounded-lg flex items-center gap-4 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-100 p-2 rounded-lg">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-md" />
              </div>
              
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-gray-900 text-lg font-medium">
                      {item.name.length > 40 ? `${item.name.slice(0, 40)}...` : item.name}
                    </h1>
                    {item.size && <p className="text-gray-500 text-sm mt-1">Size: {item.size}</p>}
                  </div>
                  <Trash2 
                    className="cursor-pointer text-gray-400 text-md hover:text-red-500 transition-colors" 
                    onClick={() => deleteQuantity(item)} 
                  /> 
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-gray-900 text-2xl font-medium ">₹{Math.trunc(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button 
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      onClick={() => decrementQuantity(item)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-1 font-medium">{item.quantity}</span>
                    <button 
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      onClick={() => increaseQuantity(item)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-lg p-4 ">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-lg ">Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</p>
            <p className="text-gray-800 font-bold text-lg">₹{totalPrice}</p>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
          <button 
            onClick={() => navigate('/Shipping')} 
            className="w-80 bg-blue-600 hover:bg-blue-700 text-white  py-3 rounded-lg transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Cart;