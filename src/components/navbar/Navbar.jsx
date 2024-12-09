// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const NavBar = () => {
  const { cart } = useCart();

  return (
    <nav>
      <div className="nav-container container">
        <Link to="/" className="nav-logo">
          INNO
        </Link>

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
        </div>
        <div>
          <Link to="/cart" className="nav-cart-button">
            Cart ({cart.items.length})
          </Link>
          <Link to="/" className="nav-login-button">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
