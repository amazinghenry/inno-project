import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Remove individual item from cart
  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  // Clear the entire cart
  const handleClearCart = () => {
    clearCart();
  };

  // Navigate to checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Browse our store and add some products!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="container">
        <h1 className="cart-title">Your Shopping Cart</h1>
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.imageUrl || "/placeholder.png"}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h2>
            Total: $
            {cart.items
              .reduce(
                (total, item) => total + item.price * (item.quantity || 1),
                0
              )
              .toFixed(2)}
          </h2>
          <div className="cart-buttons">
            <button onClick={handleClearCart} className="clear-cart-button">
              Clear Cart
            </button>
            <button onClick={handleCheckout} className="checkout-button">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
