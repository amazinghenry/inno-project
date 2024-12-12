import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import loginImage from "../../assets/login-image.png";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", auth: "" });
  const [loading, setLoading] = useState(false);

  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  // Form validation logic
  const validateForm = () => {
    const newErrors = { email: "", password: "", auth: "" };
    let isValid = true;

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

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", auth: "" }); // Reset errors

    if (!validateForm()) return;

    setLoading(true); // Start loading
    try {
      await login(email, password);
      navigate("/"); // Redirect to homepage
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        auth: "Failed to log in. Please check your credentials.",
      }));
      console.error("Error logging in:", error.message);
    }
    setLoading(false); // Stop loading
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setErrors((prev) => ({ ...prev, auth: "" })); // Reset auth errors
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        auth: "Google sign-in failed. Please try again.",
      }));
      console.error("Error with Google Sign-In:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-group container">
        <div className="login-item-image">
          <img src={loginImage} alt="" className="img-fluid" />
        </div>
        <div className="login-item-form">
          <h2>Welcome back!</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

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

            {errors.auth && (
              <p className="error-message auth-error">{errors.auth}</p>
            )}

            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Logging in..." : "Login"}
            </button>
            <Link to="/password-reset" className="password-reset-button">
              Forgot Password?
            </Link>
          </form>
          {/* Google Sign-In Button */}
          <button onClick={handleGoogleSignIn} className="google-button">
            <FcGoogle /> Continue with Google
          </button>
          <p className="no-account">
            Don't have an account?
            <Link to="/signup" className="signup-link">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
