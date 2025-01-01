import React, { useState } from "react";
import Users from "../users/Users"; // Import Users Component
import Overview from "../overview/Overview"; // Import Overview Component
import Orders from "../orders/Orders"; // Import Orders Component
import AdminProduct from "../products/AdminProduct"; // Import AdminProduct Component
import AddProduct from "../addproduct/AddProduct"; // Import AddProduct Component
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("Overview"); // Current view
  const [successMessage, setSuccessMessage] = useState(""); // For success messages

  // Callback function to handle product added
  const handleProductAdded = () => {
    setSuccessMessage("Product added successfully!");
    setActiveView("Products"); // Switch back to the Products view after adding

    // Clear success message after a delay
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Render Content Dynamically
  const renderView = () => {
    switch (activeView) {
      case "Overview":
        return <Overview />;
      case "Products":
        return <AdminProduct />; // No props needed; AdminProduct handles its own logic
      case "AddProduct":
        return <AddProduct onProductAdded={handleProductAdded} />; // Pass callback to AddProduct
      case "Users":
        return <Users />;
      case "Orders":
        return <Orders />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-dashboard-sidebar">
        <h2 className="logo text-light">MyAdmin</h2>
        <ul className="menu">
          <li
            className={`menu-item ${activeView === "Overview" ? "active" : ""}`}
            onClick={() => setActiveView("Overview")}
          >
            Overview
          </li>
          <li
            className={`menu-item ${activeView === "Products" ? "active" : ""}`}
            onClick={() => setActiveView("Products")}
          >
            Products
          </li>
          <li
            className={`menu-item ${
              activeView === "AddProduct" ? "active" : ""
            }`}
            onClick={() => setActiveView("AddProduct")}
          >
            Add Product
          </li>
          <li
            className={`menu-item ${activeView === "Users" ? "active" : ""}`}
            onClick={() => setActiveView("Users")}
          >
            Users
          </li>
          <li
            className={`menu-item ${activeView === "Orders" ? "active" : ""}`}
            onClick={() => setActiveView("Orders")}
          >
            Orders
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-dashboard-main-content">
        {/* Success Message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {renderView()}
      </main>
    </div>
  );
};

export default AdminDashboard;
