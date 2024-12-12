import React, { useState } from "react";
import { db } from "../../firebase"; // Firestore instance
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./AddProduct.css";

const AddProduct = ({ onProductAdded }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Form validation
    if (!title || !price || !category || !imageUrl) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      // Reference to Firestore collection
      const productsRef = collection(db, "products");

      // Add product to Firestore
      await addDoc(productsRef, {
        title,
        price: parseFloat(price),
        category,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setSuccessMessage("Product added successfully!");
      setLoading(false);

      // Reset form
      setTitle("");
      setPrice("");
      setCategory("");
      setImageUrl("");

      // Call callback function to refresh product list
      if (onProductAdded) onProductAdded();
    } catch (error) {
      console.error("Error adding product:", error.message);
      setError("Failed to add product. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter product category"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
