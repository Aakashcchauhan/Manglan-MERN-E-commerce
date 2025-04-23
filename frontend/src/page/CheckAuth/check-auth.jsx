// page/CheckAuth/check-auth.js
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const CheckAuth = ({ children, requireAdmin = false, allowIfAuthenticated = true }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const location = useLocation();
  
  // Case 1: Route requires admin access
  if (requireAdmin) {
    if (!isAuthenticated) {
      return <Navigate to="/account/login" state={{ from: location }} />;
    }
    
    if (user?.role !== "admin") {
      return <Navigate to="/unauthorized" />;
    }
  }
  
  // Case 2: Route requires authentication
  else if (allowIfAuthenticated) {
    if (!isAuthenticated) {
      return <Navigate to="/account/login" state={{ from: location }} />;
    }
  }
  
  // Case 3: Route should not be accessible if authenticated (like login page)
  else if (!allowIfAuthenticated && isAuthenticated) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  
  // All checks passed, render the children
  return children;
};

export default CheckAuth;