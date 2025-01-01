import React from "react";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cart } = useCart();

  const handlePayment = () => {
    alert("Payment functionality coming soon!");
    // Add payment gateway integration here
  };

  if (cart.items.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>Your cart is empty</h2>
        <p>Go back to the store and add some products.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-items">
        {cart.items.map((item) => (
          <div key={item.id} className="checkout-item">
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity || 1}</p>
          </div>
        ))}
      </div>

      <h2>
        Total: $
        {cart.items
          .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
          .toFixed(2)}
      </h2>

      <button onClick={handlePayment} className="payment-button">
        Confirm and Pay
      </button>
    </div>
  );
};

export default Checkout;
