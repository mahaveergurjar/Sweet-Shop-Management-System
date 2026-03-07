import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const response = await authService.register(email, password);
      setAuth(response.user, response.token);
      toast.success("Registration successful, please login.");
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className:
        "min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-200",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className:
          "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "text-center mb-8",
        },
        /*#__PURE__*/ React.createElement(
          "h2",
          {
            className:
              "text-4xl font-bold mb-2 text-primary-600 dark:text-primary-400",
          },
          "Create Account",
        ),
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "text-gray-600 dark:text-gray-400",
          },
          "Join us and start shopping",
        ),
      ),
      error &&
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className:
              "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4 flex items-center gap-2",
          },
          /*#__PURE__*/ React.createElement(
            "svg",
            {
              className: "w-5 h-5",
              fill: "currentColor",
              viewBox: "0 0 20 20",
            },
            /*#__PURE__*/ React.createElement("path", {
              fillRule: "evenodd",
              d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
              clipRule: "evenodd",
            }),
          ),
          error,
        ),
      /*#__PURE__*/ React.createElement(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-6",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            "label",
            {
              htmlFor: "email",
              className:
                "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            },
            "Email Address",
          ),
          /*#__PURE__*/ React.createElement("input", {
            id: "email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            className:
              "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors",
            placeholder: "your@email.com",
          }),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            "label",
            {
              htmlFor: "password",
              className:
                "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            },
            "Password",
          ),
          /*#__PURE__*/ React.createElement("input", {
            id: "password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            minLength: 6,
            className:
              "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors",
            placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
          }),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "mt-1 text-xs text-gray-500 dark:text-gray-400",
            },
            "Minimum 6 characters",
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            "label",
            {
              htmlFor: "confirmPassword",
              className:
                "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            },
            "Confirm Password",
          ),
          /*#__PURE__*/ React.createElement("input", {
            id: "confirmPassword",
            type: "password",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            required: true,
            minLength: 6,
            className:
              "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors",
            placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
          }),
        ),
        /*#__PURE__*/ React.createElement(
          "button",
          {
            type: "submit",
            disabled: loading,
            className:
              "w-full bg-primary-600 dark:bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl",
          },
          loading
            ? /*#__PURE__*/ React.createElement(
                "span",
                {
                  className: "flex items-center justify-center gap-2",
                },
                /*#__PURE__*/ React.createElement(
                  "svg",
                  {
                    className: "animate-spin h-5 w-5",
                    viewBox: "0 0 24 24",
                  },
                  /*#__PURE__*/ React.createElement("circle", {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4",
                    fill: "none",
                  }),
                  /*#__PURE__*/ React.createElement("path", {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                  }),
                ),
                "Registering...",
              )
            : "Register",
        ),
      ),
      /*#__PURE__*/ React.createElement(
        "p",
        {
          className:
            "mt-6 text-center text-sm text-gray-600 dark:text-gray-400",
        },
        "Already have an account?",
        " ",
        /*#__PURE__*/ React.createElement(
          Link,
          {
            to: "/login",
            className:
              "text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors",
          },
          "Login here",
        ),
      ),
    ),
  );
};
