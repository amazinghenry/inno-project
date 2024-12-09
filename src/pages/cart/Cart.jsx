// src/pages/Cart.jsx
import React from "react";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
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
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>
        Total: $
        {cart.items
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)}
      </h2>
      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
