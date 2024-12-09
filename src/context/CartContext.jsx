// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer } from "react";

// Create the CartContext
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Initial state for the cart
const initialState = {
  items: [],
};

// Reducer function to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if the product is already in the cart
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Update the quantity if the item exists
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Add the item to the cart
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      // Remove the item from the cart
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      // Clear the cart
      return initialState;

    default:
      return state;
  }
};

// CartProvider to wrap the app and provide cart state
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
