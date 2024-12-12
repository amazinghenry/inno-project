import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from Firestore
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const ordersRef = collection(db, "orders"); // Reference to the 'orders' collection
      const snapshot = await getDocs(ordersRef);

      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(orderList);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
    setLoading(false);
  };

  // Delete an order
  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "orders", orderId));
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Manage Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <table className="orders-container-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName || "N/A"}</td>
                <td>${order.total || "0.00"}</td>
                <td>{order.status || "Pending"}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => alert(`View Order: ${order.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="">No orders available.</p>
      )}
    </div>
  );
};

export default Orders;
