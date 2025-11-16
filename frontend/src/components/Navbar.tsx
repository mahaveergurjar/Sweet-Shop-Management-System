import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const { user, clearAuth, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <nav className="bg-primary-600 dark:bg-primary-800 text-white shadow-lg dark:shadow-gray-900/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-primary-100 transition-colors">
            🍬 Sweet Shop
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm hidden sm:inline dark:text-gray-200">
                  Welcome, {user.email.split('@')[0]}
                </span>
                {!isAdmin() && (
                  <Link
                    to="/purchases"
                    className="px-4 py-2 bg-primary-700 dark:bg-primary-900 rounded-lg hover:bg-primary-800 dark:hover:bg-primary-950 transition-colors font-medium"
                  >
                    My Purchases
                  </Link>
                )}

                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-primary-700 dark:bg-primary-900 rounded-lg hover:bg-primary-800 dark:hover:bg-primary-950 transition-colors font-medium"
                  >
                    Admin Panel
                  </Link>
                )}
                <ThemeToggle />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-primary-700 dark:bg-primary-900 rounded-lg hover:bg-primary-800 dark:hover:bg-primary-950 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Link
                  to="/login"
                  className="px-4 py-2 bg-primary-700 dark:bg-primary-900 rounded-lg hover:bg-primary-800 dark:hover:bg-primary-950 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-500 dark:bg-primary-600 rounded-lg hover:bg-primary-400 dark:hover:bg-primary-500 transition-colors font-medium"
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

