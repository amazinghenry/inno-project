import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const { currentUser } = useAuth();

  // Fetch cart data from Firestore
  const fetchCart = async (userId) => {
    if (!userId) return;
    try {
      const cartRef = doc(db, "carts", userId);
      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        setCart({ items: cartDoc.data().items || [] });
      } else {
        setCart({ items: [] });
      }
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };

  // Save cart to Firestore
  const saveCartToFirestore = async (updatedItems) => {
    if (!currentUser) return;
    try {
      const cartRef = doc(db, "carts", currentUser.uid);
      await setDoc(cartRef, { items: updatedItems }, { merge: true });
    } catch (error) {
      console.error("Error saving cart:", error.message);
    }
  };

  // Add to Cart (check for duplicates)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.id === product.id
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = prevCart.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updatedItems = [...prevCart.items, { ...product, quantity: 1 }];
      }

      saveCartToFirestore(updatedItems);
      return { items: updatedItems };
    });
  };

  // Remove from Cart
  const removeFromCart = (productId) => {
    if (!productId) return; // Guard clause for invalid productId
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.id !== productId
      );
      saveCartToFirestore(updatedItems);
      return { items: updatedItems };
    });
  };

  // Clear Cart
  const clearCart = async () => {
    setCart({ items: [] }); // Clear local cart state
    if (currentUser) {
      try {
        const cartRef = doc(db, "carts", currentUser.uid);
        await updateDoc(cartRef, { items: [] }); // Clear Firestore cart
      } catch (error) {
        console.error("Error clearing cart:", error.message);
      }
    }
  };

  // Sync cart when user logs in
  useEffect(() => {
    if (currentUser) {
      fetchCart(currentUser.uid);
    } else {
      setCart({ items: [] }); // Clear cart if user logs out
    }
  }, [currentUser]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
