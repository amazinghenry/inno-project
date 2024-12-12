import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./Overview.css";

const Overview = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch statistics from Firestore
  const fetchStats = async () => {
    setLoading(true);
    try {
      const productsSnap = await getDocs(collection(db, "products"));
      const usersSnap = await getDocs(collection(db, "users"));
      const ordersSnap = await getDocs(collection(db, "orders"));

      setStats({
        totalProducts: productsSnap.size,
        totalUsers: usersSnap.size,
        totalOrders: ordersSnap.size,
      });
    } catch (error) {
      console.error("Error fetching stats:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="overview-container">
      <h2>Dashboard Overview</h2>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="stats-grid">
          {/* Card 1 - Total Products */}
          <div className="stats-card">
            <h3>Total Products</h3>
            <p>{stats.totalProducts}</p>
          </div>

          {/* Card 2 - Total Users */}
          <div className="stats-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          {/* Card 3 - Total Orders */}
          <div className="stats-card">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
