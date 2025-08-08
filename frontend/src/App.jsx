import Todoo from "./Todoo.jsx";
import "./App.css";
import SignUp from "./SignUp";
import Login from "./Login";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <Todoo />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "100vh",
                  flexDirection: "column",
                  gap: "1rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                <h1 style={{ fontSize: "3rem" }}>404</h1>
                <p>Page not found</p>
                <a href="/login" style={{ color: "var(--color-primary)" }}>
                  Go to Login
                </a>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
