import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Store = () => {
  // State for products, search, and filter
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Books", "Courses", "Tools"];

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setFilteredProducts(productList); // Default to all products
    };

    fetchProducts();
  }, []);

  // Search and Filter Logic
  useEffect(() => {
    let updatedProducts = products;

    // Filter by category
    if (filterCategory !== "All") {
      updatedProducts = products.filter(
        (product) => product.category === filterCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, filterCategory, products]);

  return (
    <div className="store-container container">
      {/* Search and Filter Section */}
      <div className="store-controls">
        <h1>Our Store</h1>
        <div className="store-search-filter">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="store-search"
          />

          {/* Filter Dropdown */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="store-filter"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="store-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="store-product-card">
              <img
                src={product.imageURL || "https://via.placeholder.com/200"}
                alt={product.title}
                className="store-product-image"
              />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <Link to={`/store/${product.id}`} className="btn-primary">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Store;
