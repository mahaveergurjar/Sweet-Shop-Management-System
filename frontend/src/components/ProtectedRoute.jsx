import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
export const ProtectedRoute = ({
  children,
  requireAdmin = false
}) => {
  const {
    isAuthenticated,
    isAdmin
  } = useAuthStore();
  if (!isAuthenticated()) {
    return /*#__PURE__*/React.createElement(Navigate, {
      to: "/login",
      replace: true
    });
  }
  if (requireAdmin && !isAdmin()) {
    return /*#__PURE__*/React.createElement(Navigate, {
      to: "/",
      replace: true
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
};