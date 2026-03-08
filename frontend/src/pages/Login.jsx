import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      setAuth(response.user, response.token);
      toast.success("Shubh Aagman! Welcome back.");
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-50">
          <div className="flex flex-col items-center mb-10">
            <div className="bg-primary-500 p-3 rounded-2xl shadow-md mb-6">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L4 5v14l8 3 8-3V5l-8-3zm0 2.18L18.15 6.5 12 8.82 5.85 6.5 12 4.18z" />
              </svg>
            </div>
            <h2 className="text-4xl font-serif font-black text-royal-chocolate mb-2 text-center">
              Become a <span className="text-primary-500">Royal Member</span>
            </h2>
            <p className="text-gray-400 font-medium">
              Continue your sweet journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary-500 outline-none transition-all placeholder:text-gray-300 text-sm font-bold text-gray-700"
                placeholder="mukesh@royal.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary-500 outline-none transition-all placeholder:text-gray-300 text-sm font-bold text-gray-700"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 text-white py-4.5 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all active:scale-98 transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Proceed to Shop"
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-gray-50 text-center">
            <p className="text-sm font-medium text-gray-400">
              New here?{" "}
              <Link
                to="/register"
                className="text-primary-500 hover:text-primary-600 font-bold ml-1 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
