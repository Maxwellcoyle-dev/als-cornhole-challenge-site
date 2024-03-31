import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

const ProtectedRoute = ({ children }) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return authStatus === "authenticated" ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
