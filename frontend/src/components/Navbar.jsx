import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
  const { user, clearAuth, isAdmin } = useAuthStore();
  const { getItemCount } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const itemCount = getItemCount();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white py-5 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-300"
          >
            <div className="bg-primary-500 p-2 rounded-xl shadow-sm group-hover:bg-primary-600 transition-colors">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L4 5v14l8 3 8-3V5l-8-3zm0 2.18L18.15 6.5 12 8.82 5.85 6.5 12 4.18z" />
              </svg>
            </div>
            <span className="text-2xl font-serif font-black tracking-tight text-royal-chocolate">
              Royal <span className="text-primary-500">Sweets</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-black text-royal-chocolate/70 hover:text-primary-600 transition-colors border-b-2 border-transparent hover:border-primary-500 pb-1"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-sm font-black text-royal-chocolate/70 hover:text-primary-600 transition-colors border-b-2 border-transparent hover:border-primary-500 pb-1"
            >
              Sweets
            </Link>
            <Link
              to="/"
              className="text-sm font-black text-royal-chocolate/70 hover:text-primary-600 transition-colors border-b-2 border-transparent hover:border-primary-500 pb-1"
            >
              Categories
            </Link>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-4 sm:gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                {!isAdmin() && (
                  <>
                    <button
                      onClick={() => setIsCartOpen(true)}
                      className="group relative p-2 text-royal-chocolate hover:text-primary-500 transition-colors"
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
                        <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                          {itemCount}
                        </span>
                      )}
                    </button>
                    <Link
                      to="/purchases"
                      className="text-sm font-black text-royal-chocolate/70 hover:text-primary-500 transition-colors hidden sm:inline"
                    >
                      Orders
                    </Link>
                  </>
                )}

                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="text-sm font-black text-royal-chocolate/70 hover:text-primary-500 transition-colors"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-sm font-black text-royal-chocolate/70 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-black text-royal-chocolate/70 hover:text-primary-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-500 text-white px-6 py-2.5 rounded-full hover:bg-primary-600 transition-all font-bold text-sm shadow-sm hover:shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};
