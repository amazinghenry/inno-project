import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <NavBar />
        <AppRoutes />
        <Footer />
      </CartProvider>
    </Router>
  );
};

export default App;
