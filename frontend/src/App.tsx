import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/AdminPanel';
import { PurchaseHistory } from './pages/PurchaseHistory';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();
  const {user} = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated() ? <Navigate to="/" replace /> : <Register />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {(user && user.isAdmin) 
                  ? <Navigate to="/admin" replace /> 
                  : <Dashboard />
                }
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

