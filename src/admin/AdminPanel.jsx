import React from "react";
import ProductManager from "./ProductManager";

const AdminPanel = () => {
  return (
    <div className="admin-panel container">
      <h1>Admin Panel</h1>
      <p>Manage your products here.</p>
      <ProductManager />
    </div>
  );
};

export default AdminPanel;
