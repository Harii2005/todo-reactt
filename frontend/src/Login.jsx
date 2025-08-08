import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";

export default function Login() {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // Get the intended destination or default to /todo
  const from = location.state?.from?.pathname || "/todo";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Use the auth context to handle login
      login(data.user, data.token);

      console.log("Token:", data.token);
      console.log("User:", data.user);

      // Navigate to intended destination
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      console.log("err : ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>
            {from !== "/todo"
              ? "You need to sign in to access that page"
              : "Sign in to your account to continue"}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon email">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon password">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className={`auth-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "" : "Sign In"}
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <button
              className="auth-link"
              onClick={() => navigate("/signup")}
              type="button"
            >
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
