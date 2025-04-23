// Action Types
export const ADD_TO_CART = "ADD_TO_CART";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const DELETE = "DELETE";
export const TOGGLE_CART = "TOGGLE_CART";

// Action Creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const increment = (product) => ({
  type: INCREMENT,
  payload: product,
});

export const decrement = (product) => ({
  type: DECREMENT,
  payload: product,
});

export const deletes = (product) => ({
  type: DELETE,
  payload: product,
});

export const toggleCart = () => ({
  type: TOGGLE_CART,
});
