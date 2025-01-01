import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import { IoCartOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";

const NavBar = () => {
  const { cart } = useCart();
  const { currentUser, role, logout } = useAuth();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //   } catch (error) {
  //     console.error("Error logging out:", error.message);
  //   }
  // };

  return (
    <nav className="container-fluid nav-main">
      <div className="nav-container container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          INNO
        </Link>

        {/* Navigation Links */}
        <div className="link-group">
          <Link to="/" className="link-item">
            Home
          </Link>
          <Link to="/about" className="link-item">
            About
          </Link>
          <Link to="/store" className="link-item">
            Store
          </Link>
          <Link to="/contact" className="link-item">
            Contact
          </Link>

          {/* Admin Dashboard */}
          {currentUser && role === "admin" && (
            <Link to="/admin" className="link-item admin-link">
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Right Group (Cart and User) */}
        <div className="nav-right-group">
          {/* Cart */}
          <div className="nav-cart-group">
            <Link to="/cart" className="nav-cart-button">
              <IoCartOutline className="cart-icon" />
              <span className="cart-count">{cart?.items?.length || 0}</span>
            </Link>
          </div>

          {/* User Login/Logout */}
          <div className="nav-login-group">
            <LuUserRound className="user-icon" />
            {currentUser ? (
              <div className="user-dropdown">
                <Link to="/dashboard" className="user-name">
                  Hi, {currentUser.displayName || "User"}
                </Link>
                {/* <button onClick={handleLogout} className="nav-logout-button">
                  Logout
                </button> */}
              </div>
            ) : (
              <Link to="/login" className="nav-login-link">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
