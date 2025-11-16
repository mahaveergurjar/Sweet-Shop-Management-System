import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Navbar = () => {
  const { user, clearAuth, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            🍬 Sweet Shop
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm">Welcome, {user.email}</span>
                {!isAdmin() && (
                  <Link
                  to="/purchases"
                  className="px-4 py-2 bg-primary-700 rounded hover:bg-primary-800 transition"
                >
                  My Purchases
                </Link>
                )}

                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-primary-700 rounded hover:bg-primary-800 transition"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-primary-700 rounded hover:bg-primary-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-primary-700 rounded hover:bg-primary-800 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-500 rounded hover:bg-primary-400 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

