import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Users from "../users/Users"; // Import Users Component
import Overview from "../overview/Overview"; // Import Overview Component
import Orders from "../orders/Orders";
import "./AdminDashboard.css";

// Placeholder Components for Views
// const Overview = () => <div>Welcome to the Overview!</div>;

const Products = ({ products, handleDelete }) => (
  <div>
    <h2>All Products</h2>
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
                onClick={() => handleDelete(product.id)}
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
  </div>
);

// const Orders = () => <div>View and manage orders here!</div>;

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("Overview"); // Current view
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }
    setLoading(false);
  };

  // Delete a product
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Render Content Dynamically
  const renderView = () => {
    switch (activeView) {
      case "Overview":
        return <Overview />;
      case "Products":
        return <Products products={products} handleDelete={handleDelete} />;
      case "Users":
        return <Users />; // Renders imported Users component
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
        {loading && activeView === "Products" ? (
          <p>Loading products...</p>
        ) : (
          renderView()
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
