const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  cartVisible: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const exist = state.cartItems.find((x) => x._id === product._id);
      const updatedCart = exist
        
        ? state.cartItems.map((x) =>
            x._id === exist._id ? { ...x, quantity: x.quantity + 1 } : x
          )
        : [...state.cartItems, { ...product, quantity: 1 }];

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return { ...state, cartItems: updatedCart, cartVisible: true };
    }

    case "INCREMENT": {
      const updatedCart = state.cartItems.map((x) =>
        x._id === action.payload._id ? { ...x, quantity: x.quantity + 1 } : x
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return { ...state, cartItems: updatedCart };
    }

    case "DECREMENT": {
      const updatedCart = state.cartItems.map((x) =>
        x._id === action.payload._id && x.quantity > 1
          ? { ...x, quantity: x.quantity - 1 }
          : x
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return { ...state, cartItems: updatedCart };
    }

    case "DELETE": {
      const updatedCart = state.cartItems.filter(
        (x) => x._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return { ...state, cartItems: updatedCart };
    }

    case "TOGGLE_CART":
      return { ...state, cartVisible: !state.cartVisible };

    default:
      return state;
  }
};

export default cartReducer;
