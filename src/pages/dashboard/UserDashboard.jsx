import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { cart, clearCart } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(clearCart);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="user-dashboard container">
      <h1>{currentUser.displayName || "User"}'s Dashboard</h1>

      {/* User Info Section */}
      <div className="user-info">
        <h2>Welcome, {currentUser.displayName || "User"}!</h2>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Total Cart Items:</strong> {cart.items.length || 0}
        </p>
      </div>

      {/* Dashboard Features */}
      <div className="dashboard-actions">
        {/* Orders */}
        <button
          onClick={() => navigate("/orders")}
          className="dashboard-button"
        >
          View My Orders
        </button>

        {/* Profile Management */}
        <button
          onClick={() => navigate("/profile")}
          className="dashboard-button"
        >
          Update Profile
        </button>

        {/* Saved Items */}
        <button
          onClick={() => navigate("/saved-items")}
          className="dashboard-button"
        >
          Saved Items
        </button>

        {/* Address Management */}
        <button
          onClick={() => navigate("/addresses")}
          className="dashboard-button"
        >
          Manage Addresses
        </button>

        {/* Logout */}
        <button onClick={handleLogout} className="dashboard-button logout">
          Logout
        </button>
      </div>

      {/* Recommendations Section */}
      <div className="recommendations">
        <h2>Recommended for You</h2>
        <p>Explore products based on your recent activity.</p>
        <button
          onClick={() => navigate("/store")}
          className="dashboard-button explore"
        >
          Browse Store
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
