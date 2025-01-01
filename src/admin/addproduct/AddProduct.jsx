import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./AddProduct.css";

const AddProduct = ({ onProductAdded }) => {
  const initialFormState = {
    title: "",
    description: "",
    author: "",
    category: "Books",
    price: "",
    stock: "",
    imageUrl: "",
    isFeatured: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrorMessage("");

    // Validation
    if (!formData.title || !formData.price || !formData.imageUrl) {
      setErrorMessage(
        "Please fill out all required fields, including the image URL."
      );
      return;
    }

    setSubmitting(true);
    try {
      // Add product data to Firestore
      await addDoc(collection(db, "products"), {
        title: formData.title,
        description: formData.description,
        author: formData.author,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10) || 0,
        imageUrl: formData.imageUrl,
        isFeatured: formData.isFeatured,
        createdAt: new Date(),
      });

      onProductAdded();
      setFormData(initialFormState); // Reset form data
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage(`Failed to add product: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit} className="add-product-form container">
        <h2>Add New Product</h2>

        {/* Error Message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <input
          type="text"
          placeholder="Title *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Books">Books</option>
          <option value="Courses">Courses</option>
          <option value="Tools">Tools</option>
        </select>
        <input
          type="number"
          placeholder="Price *"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Image URL *"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <label>
          Featured:
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="add-product-button"
        >
          {submitting ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
