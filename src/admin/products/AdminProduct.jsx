import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./AdminProduct.css";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(""); // For success messages
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal visibility
  const [selectedProductId, setSelectedProductId] = useState(null); // Product to delete

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsRef = collection(db, "products");
      const productSnap = await getDocs(productsRef);
      const productList = productSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete confirmation
  const confirmDelete = (productId) => {
    setSelectedProductId(productId);
    setShowConfirmModal(true);
  };

  // Delete a product
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "products", selectedProductId));
      setProducts((prev) =>
        prev.filter((product) => product.id !== selectedProductId)
      );
      setSuccessMessage("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    } finally {
      setShowConfirmModal(false);
      setSelectedProductId(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <button
                    onClick={() => confirmDelete(product.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                  <button className="edit-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found</p>
      )}

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-actions">
              <button onClick={handleDelete} className="modal-delete-button">
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="modal-cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
