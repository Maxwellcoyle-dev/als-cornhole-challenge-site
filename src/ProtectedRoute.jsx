import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

// In ProtectedRoute.jsx
const ProtectedRoute = ({ children }) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const location = useLocation();

  if (authStatus !== "authenticated") {
    const saveLocation = {
      pathname: location.pathname,
      state: location.state,
    };
    console.log("saveLocation: ", saveLocation);
    sessionStorage.setItem("postSignInRedirect", JSON.stringify(saveLocation));
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
