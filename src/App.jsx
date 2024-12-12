import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import NavBar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NavBar />
          <AppRoutes />
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
