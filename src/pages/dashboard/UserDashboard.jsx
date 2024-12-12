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
      <h1>User Dashboard</h1>

      <div className="user-info">
        <h2>Welcome, {currentUser.displayName || "User"}!</h2>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
      </div>

      <div className="dashboard-actions">
        <button
          onClick={() => navigate("/orders")}
          className="dashboard-button"
        >
          View Orders
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="dashboard-button"
        >
          Update Profile
        </button>
        <button onClick={handleLogout} className="dashboard-button logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
