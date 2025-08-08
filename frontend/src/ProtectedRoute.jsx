import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <h2>Loading...</h2>
            <p>Please wait while we verify your session</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "var(--spacing-8)",
            }}
          >
            <div
              className="auth-button loading"
              style={{ width: "auto", padding: "var(--spacing-4)" }}
            >
              Verifying authentication...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with the current location
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
