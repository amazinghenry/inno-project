import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase"; // Import Firebase auth instance
import { useNavigate } from "react-router-dom";
import "./PasswordReset.css";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      setError("Failed to send reset email. Please check your email address.");
      console.error("Error sending password reset email:", err.message);
    }
    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Enter your email to receive a password reset link.</p>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="forgot-password-button"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      <button
        onClick={() => navigate("/login")}
        className="back-to-login-button"
      >
        Back to Login
      </button>
    </div>
  );
};

export default PasswordReset;
