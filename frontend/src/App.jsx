import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { AdminPanel } from "./pages/AdminPanel";
import { PurchaseHistory } from "./pages/PurchaseHistory";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    // Ensure theme is applied on mount
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-white transition-colors duration-200">
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated() ? <Navigate to="/" replace /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated() ? <Navigate to="/" replace /> : <Register />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {user && user.isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Dashboard />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchases"
            element={
              <ProtectedRoute>
                <PurchaseHistory />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
