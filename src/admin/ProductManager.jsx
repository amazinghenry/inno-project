import React, { useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const ProductManager = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageURL: "",
  });

  const [productId, setProductId] = useState(""); // For update/delete actions

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Create Product
  const handleCreate = async () => {
    try {
      await addDoc(collection(db, "products"), {
        ...product,
        price: parseFloat(product.price),
        createdAt: serverTimestamp(),
      });
      console.log("Product created");
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  // Update Product
  const handleUpdate = async () => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        ...product,
        price: parseFloat(product.price),
      });
      console.log("Product updated");
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  // Delete Product
  const handleDelete = async () => {
    try {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      console.log("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      {/* Input Fields */}
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        onChange={handleChange}
      />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="imageURL" placeholder="Image URL" onChange={handleChange} />

      {/* Actions */}
      <button onClick={handleCreate}>Create Product</button>
      <input
        placeholder="Product ID for Update/Delete"
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Product</button>
      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
};

export default ProductManager;
