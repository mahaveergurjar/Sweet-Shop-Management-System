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
  const { isAuthenticated } = useAuthStore();
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    // Ensure theme is applied on mount
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return /*#__PURE__*/ React.createElement(
    Router,
    null,
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className:
          "min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200",
      },
      /*#__PURE__*/ React.createElement(Toaster, {
        position: "bottom-right",
        toastOptions: { duration: 3000 },
      }),
      /*#__PURE__*/ React.createElement(Navbar, null),
      /*#__PURE__*/ React.createElement(
        Routes,
        null,
        /*#__PURE__*/ React.createElement(Route, {
          path: "/login",
          element: isAuthenticated()
            ? /*#__PURE__*/ React.createElement(Navigate, {
                to: "/",
                replace: true,
              })
            : /*#__PURE__*/ React.createElement(Login, null),
        }),
        /*#__PURE__*/ React.createElement(Route, {
          path: "/register",
          element: isAuthenticated()
            ? /*#__PURE__*/ React.createElement(Navigate, {
                to: "/",
                replace: true,
              })
            : /*#__PURE__*/ React.createElement(Register, null),
        }),
        /*#__PURE__*/ React.createElement(Route, {
          path: "/",
          element: /*#__PURE__*/ React.createElement(
            ProtectedRoute,
            null,
            user && user.isAdmin
              ? /*#__PURE__*/ React.createElement(Navigate, {
                  to: "/admin",
                  replace: true,
                })
              : /*#__PURE__*/ React.createElement(Dashboard, null),
          ),
        }),
        /*#__PURE__*/ React.createElement(Route, {
          path: "/admin",
          element: /*#__PURE__*/ React.createElement(
            ProtectedRoute,
            {
              requireAdmin: true,
            },
            /*#__PURE__*/ React.createElement(AdminPanel, null),
          ),
        }),
        /*#__PURE__*/ React.createElement(Route, {
          path: "/purchases",
          element: /*#__PURE__*/ React.createElement(
            ProtectedRoute,
            null,
            /*#__PURE__*/ React.createElement(PurchaseHistory, null),
          ),
        }),
        /*#__PURE__*/ React.createElement(Route, {
          path: "*",
          element: /*#__PURE__*/ React.createElement(Navigate, {
            to: "/",
            replace: true,
          }),
        }),
      ),
    ),
  );
}
export default App;
