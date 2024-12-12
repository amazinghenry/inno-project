// src/pages/Cart.jsx
import React from "react";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Remove individual item from cart
  const handleRemoveFromCart = (id) => {
    removeFromCart(id); // Call the removeFromCart function
  };

  // Clear the entire cart
  const handleClearCart = () => {
    clearCart(); // Call the clearCart function
  };

  if (cart.items.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity || 1}</p>
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h2>
        Total: $
        {cart.items
          .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
          .toFixed(2)}
      </h2>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
