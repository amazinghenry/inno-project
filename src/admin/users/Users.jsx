import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch users from Firestore
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersRef = collection(db, "users"); // Reference to "users" collection
      const snapshot = await getDocs(usersRef);

      // Map Firestore documents into an array
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
    setLoading(false);
  };

  // Delete user from Firestore
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      // Delete the user document from Firestore
      await deleteDoc(doc(db, "users", userId));

      // Update local state to remove the user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error.message);
      alert("Failed to delete user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  return (
    <div className="users-container">
      <h2>Manage Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : users.length > 0 ? (
        <table className="users-container-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.displayName || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.role || "User"}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => alert(`Edit ${user.displayName}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
