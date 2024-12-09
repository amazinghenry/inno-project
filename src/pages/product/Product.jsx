// src/pages/Product.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../../context/CartContext"; // Import useCart

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart(); // Access the dispatch function from the CartContext

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
    };

    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id: productId, ...product }, // Include product ID and data
    });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
