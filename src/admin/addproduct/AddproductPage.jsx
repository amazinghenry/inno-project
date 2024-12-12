import React from "react";
import AddProduct from "./AddProduct"; // Import the AddProduct component
import "./AddProductPage.css"; // Optional: Add custom styling

const AddProductPage = () => {
  return (
    <div className="add-product-page container">
      <h1>Add a New Product</h1>
      <AddProduct />
    </div>
  );
};

export default AddProductPage;
