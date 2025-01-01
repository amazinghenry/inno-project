import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user data from Firestore
  const fetchUserProfile = async () => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfileData({
          displayName: userData.displayName || "",
          email: userData.email || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, [currentUser]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update user profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Update in Firebase Authentication
      await updateProfile(currentUser, {
        displayName: profileData.displayName,
      });

      // Update in Firestore
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        displayName: profileData.displayName,
        email: profileData.email,
      });

      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container container">
      <h1>My Profile</h1>
      <form onSubmit={handleUpdateProfile} className="profile-form">
        {/* Display Name */}
        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={profileData.displayName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email (read-only) */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            readOnly
          />
        </div>

        {/* Messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Submit Button */}
        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
