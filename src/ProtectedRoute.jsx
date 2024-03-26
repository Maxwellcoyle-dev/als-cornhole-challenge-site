import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuthContext } from "./AuthProvider"; // Import your authentication context

const ProtectedRoute = () => {
  // const { isAuthenticated } = useAuthContext(); // Get the authentication state from your context
  const isAuthenticated = true; // Replace this line with the line above when you have your context set up

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
