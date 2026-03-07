import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { ThemeToggle } from "./ThemeToggle";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
  const { user, clearAuth, isAdmin } = useAuthStore();
  const { getItemCount } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const itemCount = getItemCount();

  return (
    <nav className="bg-primary-600 dark:bg-primary-800 text-white shadow-lg dark:shadow-gray-900/50 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-primary-100 transition-colors flex items-center gap-2"
          >
            🍬 <span className="hidden xs:inline">Sweet Shop</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            {user ? (
              <>
                <span className="text-sm hidden lg:inline-block dark:text-gray-200 bg-primary-700 dark:bg-primary-900/50 px-3 py-1 rounded-full">
                  👋 {user.email.split("@")[0]}
                </span>

                {!isAdmin() && (
                  <>
                    <button
                      onClick={() => setIsCartOpen(true)}
                      className="relative p-2 bg-primary-700 dark:bg-primary-900 rounded-lg hover:bg-primary-800 transition-all active:scale-95"
                      aria-label="Open Cart"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-primary-600 animate-bounce">
                          {itemCount}
                        </span>
                      )}
                    </button>
                    <Link
                      to="/purchases"
                      className="hidden sm:inline-block px-4 py-2 bg-primary-700 dark:bg-primary-900 rounded-lg hover:bg-primary-800 transition-colors font-medium"
                    >
                      Orders
                    </Link>
                  </>
                )}

                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-primary-700 dark:bg-primary-900 rounded-lg hover:bg-primary-800 transition-colors font-medium text-sm"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-primary-700 dark:bg-primary-900 rounded-lg hover:bg-primary-800 transition-colors font-medium text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-primary-700 dark:bg-primary-900 rounded-lg hover:bg-primary-800 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden xs:inline-block px-4 py-2 bg-primary-500 dark:bg-primary-600 rounded-lg hover:bg-primary-400 transition-colors font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};
