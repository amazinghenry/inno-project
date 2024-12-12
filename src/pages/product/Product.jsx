import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../../context/CartContext"; // Import useCart
import "./Product.css";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addCartMessage, setAddCartMessage] = useState("");
  const { addToCart } = useCart();

  // Fetch product data from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", productId));
        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  // Add product to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart({ id: productId, ...product });
      setAddCartMessage(`${product.title} added to cart!`);
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;

  return (
    <div className="product-container">
      <div className="product-card">
        <div className="product-image">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="img-fluid"
          />
        </div>

        <div className="product-details">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>

          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <p>{addCartMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
