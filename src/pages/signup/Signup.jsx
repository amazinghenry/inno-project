import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // Import Firebase auth and Firestore
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", general: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", general: "" });
    setSuccessMessage("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Create user with Firebase Authentication
      const userCredential = await signup(email, password);
      const user = userCredential.user;

      // Set display name
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Save user details to Firestore with default role
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName || "New User",
        email: user.email,
        role: "user", // Default role is 'user'
        createdAt: new Date(),
      });

      setSuccessMessage("Account created successfully!");
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error signing up:", error.message);
      setErrors((prev) => ({
        ...prev,
        general: "Failed to create an account. Please try again.",
      }));
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {/* Display Name */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Display Name (Optional)"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        {/* General Errors */}
        {errors.general && <p className="error-message">{errors.general}</p>}

        {/* Success Message */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" disabled={loading} className="signup-button">
          {loading ? "Creating Account..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
